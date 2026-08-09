"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useNavigationState } from "@/Helper/NavigationState";

import { useCallback, useEffect, useMemo, useState } from "react";
import SearchSet from "../Utils/SearchSet";
import "./styles/collegeSearch.css";
const logo = "/mainLogo.svg";
const logoMobile = "/mainLogoMobile.svg";
import CryptoJS from "crypto-js";
import { FaArrowRight } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { FcRating } from "react-icons/fc";
import { MdLocationOn } from "react-icons/md";

const hashOf = (str = "") => {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
};

// There is no rating column in the database yet, so these stay placeholders as
// before — but derived from the name, so a card no longer reshuffles its own
// rating on every re-render.
const ratingFor = (name) => (4 + (hashOf(name) % 9) / 10).toFixed(1);
const reviewsFor = (name) => 60 + (hashOf(`${name}#reviews`) % 240);

// Fees arrive in mixed shapes: "155,700", "1,20,025/-", "60000 ₹" with the
// symbol trailing, and occasionally double-encoded ("â‚¹1.29 Lakhs") when the
// row was saved as latin1. Strip whatever currency marker is present at either
// end, then put one back in a fixed position.
const formatFee = (fee) => {
  const amount = String(fee ?? "")
    .replace(/â‚¹/g, "₹")
    .replace(/\/-\s*$/, "")
    .replace(/^[₹\s]+|[₹\s]+$/g, "")
    .replace(/^rs\.?\s*/i, "")
    .trim();
  return amount ? `₹${amount}` : "";
};

// `course.content` and `course.fees` are frequently absent, and the old version
// called .replace() straight on the value, so one such row threw during render.
const sanitizeString = (str) => String(str ?? "").replace(/[^\w\s]/g, "");

// Real rows carry leading spaces (" Greater Noida"), doubled spaces
// ("Gujarat  Vadodara") and inconsistent case ("Noida, india" vs "Noida,
// India"). Matching those literally would split one place into several filter
// options, none of which selects all of its colleges. So values are compared by
// a normalised key and displayed in their tidied form.
const normalize = (value) => String(value ?? "").trim().replace(/\s+/g, " ");
const keyOf = (value) => normalize(value).toLowerCase();
const sameValue = (a, b) => keyOf(a) === keyOf(b);

const collect = (found, value) => {
  const key = keyOf(value);
  if (key && !found.has(key)) found.set(key, normalize(value));
};
const sortedValues = (found) =>
  [...found.values()].sort((a, b) => a.localeCompare(b));

const matchesText = (college, regex) =>
  regex.test(sanitizeString(college.location)) ||
  regex.test(sanitizeString(college.name)) ||
  regex.test(sanitizeString(college.website)) ||
  (college.courses || []).some(
    (course) =>
      regex.test(sanitizeString(course.name)) ||
      regex.test(sanitizeString(course.content)) ||
      regex.test(sanitizeString(course.fees)) ||
      regex.test(sanitizeString(course.duration))
  );

const CollegeSearch = () => {
  const [collegeData, setCollegeData] = useState([]);
  const [l, setL] = useState(false);
  const [c, setC] = useState(false);
  const [d, setD] = useState(false);
  const location = { pathname: usePathname() };
  const param = location.pathname.split("/")[2];
  const [filterParam, setFilterParam] = useState(param || "");
  const [fetchData, setFetchData] = useState([]);

  // The three dropdowns used to write into filterParam, so they overwrote each
  // other and only ever behaved as shortcuts for the search box. They now hold
  // their own state and combine with AND.
  const [locationFilter, setLocationFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");

  // Colleges matching the text search alone. Both the result list and the
  // dropdown options narrow this down, so it is computed once.
  const textMatched = useMemo(() => {
    const regex = new RegExp(sanitizeString(filterParam), "i");
    return collegeData.filter((college) => matchesText(college, regex));
  }, [collegeData, filterParam]);

  // Course name and duration are matched against the *same* course, so
  // "B.Tech" + "4 Years" means a four-year B.Tech, not a college that happens
  // to offer a B.Tech and, separately, some other four-year course.
  const courseMatches = useCallback(
    (course) =>
      (!courseFilter || sameValue(course.name, courseFilter)) &&
      (!durationFilter || sameValue(course.duration, durationFilter)),
    [courseFilter, durationFilter]
  );

  const filteredColleges = useMemo(() => {
    const byCourse = Boolean(courseFilter || durationFilter);
    return textMatched.filter(
      (college) =>
        (!locationFilter || sameValue(college.location, locationFilter)) &&
        (!byCourse || (college.courses || []).some(courseMatches))
    );
  }, [textMatched, locationFilter, courseFilter, durationFilter, courseMatches]);

  // Each dropdown offers only what is still reachable given the other two, so
  // no combination in the UI can lead to an empty result set.
  const uniqueLocations = useMemo(() => {
    const byCourse = Boolean(courseFilter || durationFilter);
    const found = new Map();
    textMatched.forEach((college) => {
      if (byCourse && !(college.courses || []).some(courseMatches)) return;
      collect(found, college.location);
    });
    return sortedValues(found);
  }, [textMatched, courseFilter, durationFilter, courseMatches]);

  const uniqueCourses = useMemo(() => {
    const found = new Map();
    textMatched.forEach((college) => {
      if (locationFilter && !sameValue(college.location, locationFilter)) return;
      // Every course counts, not just courses[0] — a college offering seven
      // programmes used to contribute exactly one option.
      (college.courses || []).forEach((course) => {
        if (durationFilter && !sameValue(course.duration, durationFilter)) return;
        collect(found, course.name);
      });
    });
    return sortedValues(found);
  }, [textMatched, locationFilter, durationFilter]);

  const uniqueDurations = useMemo(() => {
    const found = new Map();
    textMatched.forEach((college) => {
      if (locationFilter && !sameValue(college.location, locationFilter)) return;
      (college.courses || []).forEach((course) => {
        if (courseFilter && !sameValue(course.name, courseFilter)) return;
        collect(found, course.duration);
      });
    });
    return sortedValues(found);
  }, [textMatched, locationFilter, courseFilter]);

  const closeMenus = () => {
    setL(false);
    setC(false);
    setD(false);
  };

  const clearFilters = () => {
    setLocationFilter("");
    setCourseFilter("");
    setDurationFilter("");
  };

  const pickFilter = (setter, value) => {
    setter(value);
    closeMenus();
  };

  const activeFilters = [
    locationFilter && { key: "location", value: locationFilter, clear: () => setLocationFilter("") },
    courseFilter && { key: "course", value: courseFilter, clear: () => setCourseFilter("") },
    durationFilter && { key: "duration", value: durationFilter, clear: () => setDurationFilter("") },
  ].filter(Boolean);

  // A new search term produces a new result set, so the old filters — which may
  // not even exist in it — are dropped rather than silently zeroing the page.
  const handleFilterChange = (event) => {
    setFilterParam(event.target.value);
    fetchDataFromServer(event.target.value);
    clearFilters();
    closeMenus();
  };

  const fetchDataFromServer = (searchTerm) => {
    const Data = new Date().getDate();
    const encryptedToken = CryptoJS.AES.encrypt(
      JSON.stringify(process.env.NEXT_PUBLIC_FETCH_BLOG + Data),
      process.env.NEXT_PUBLIC_PUBLIC_ENC
    ).toString();

    fetch(`${process.env.NEXT_PUBLIC_WEBSITE_API}/fetchCollegeForSearch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: encryptedToken,
        searchTerm,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          setFetchData(data.data);
        }
      })
      .catch((err) => console.error(err));
  };

  const keyHandler = (e) => {
    if (e.code === "Enter") {
      fetchDataFromServer(filterParam);
    }
  };

  useEffect(() => {
    fetchData.forEach((item) => {
      if (
        !collegeData.some(
          (data) => data.name.toLowerCase() === item.collegeName.toLowerCase()
        )
      ) {
        const newCollegeItem = {
          name: item.collegeName,
          location: item.location,
          description: item.description,
          logo: item.logo
            ? `${process.env.NEXT_PUBLIC_SERVER_URL}collegeGallery/${item.logo}`
            : logo,
          gallery: JSON.parse(item.images || "[]").map(
            (image) =>
              `${process.env.NEXT_PUBLIC_SERVER_URL}collegeGallery/${image}`
          ),
          courses: JSON.parse(item.course || "[]"),
          website: item.website || "N/A",
        };
        setCollegeData((prevData) => [...prevData, newCollegeItem]);
      }
    });
  }, [fetchData]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setFilterParam(param);
    fetchDataFromServer(param);
    setLocationFilter("");
    setCourseFilter("");
    setDurationFilter("");
  }, [param]);

  const navigate = useRouter();
  // router.push() ignores a second argument, so React Router's
  // navigate(path, { state }) has to become an explicit write to the store
  // followed by a plain push.
  const { setNavState } = useNavigationState();

  return (
    <main className="top college-search">
      <div className="group">
        <h1>Find Your College</h1>
        <div className="right">
          <h3>Colleges Are Seeking Students Like You</h3>
          <p>Find Your Fit with our Featured Schools!</p>
        </div>
      </div>

      <SearchSet
        func={handleFilterChange}
        func2={keyHandler}
        className="search"
      />
      <h2>
        Search Result For:{" "}
        <span style={{ color: "var(--accent)", textTransform: "uppercase" }}>
          {filterParam}
        </span>
      </h2>
      <div className="grid-view">
        <div className="filter">
          <div className="filter-btn">
            <div className="grp">
              <label
                className={`${l ? "active" : ""}${
                  locationFilter ? " has-value" : ""
                }`}
                htmlFor="location"
                onClick={() => {
                  setL(!l);
                  setD(false);
                  setC(false);
                }}
              >
                <span>Location</span>
                <span>{locationFilter || "Search..."}</span>
              </label>
              <div className="select">
                {locationFilter && (
                  <input
                    readOnly
                    className="reset"
                    value="All locations"
                    onClick={() => pickFilter(setLocationFilter, "")}
                  />
                )}
                {uniqueLocations.map((btn) => (
                  <input
                    readOnly
                    key={btn}
                    value={btn}
                    className={sameValue(btn, locationFilter) ? "chosen" : ""}
                    onClick={() => pickFilter(setLocationFilter, btn)}
                  />
                ))}
                {uniqueLocations.length === 0 && (
                  <p className="empty">Nothing left to choose</p>
                )}
              </div>
            </div>
            <div className="grp">
              <label
                htmlFor="course"
                className={`${c ? "active" : ""}${
                  courseFilter ? " has-value" : ""
                }`}
                onClick={() => {
                  setC(!c);
                  setL(false);
                  setD(false);
                }}
              >
                <span>Course</span>
                <span>{courseFilter || "Search"}</span>
              </label>
              <div className="select">
                {courseFilter && (
                  <input
                    readOnly
                    className="reset"
                    value="All courses"
                    onClick={() => pickFilter(setCourseFilter, "")}
                  />
                )}
                {uniqueCourses.map((btn) => (
                  <input
                    readOnly
                    key={btn}
                    value={btn}
                    className={sameValue(btn, courseFilter) ? "chosen" : ""}
                    onClick={() => pickFilter(setCourseFilter, btn)}
                  />
                ))}
                {uniqueCourses.length === 0 && (
                  <p className="empty">Nothing left to choose</p>
                )}
              </div>
            </div>
            <div className="grp">
              <label
                htmlFor="duration"
                className={`${d ? "active" : ""}${
                  durationFilter ? " has-value" : ""
                }`}
                onClick={() => {
                  setD(!d);
                  setL(false);
                  setC(false);
                }}
              >
                <span>Duration</span>
                <span>{durationFilter || "Search"}</span>
              </label>
              <div className="select">
                {durationFilter && (
                  <input
                    readOnly
                    className="reset"
                    value="Any duration"
                    onClick={() => pickFilter(setDurationFilter, "")}
                  />
                )}
                {uniqueDurations.map((btn) => (
                  <input
                    readOnly
                    key={btn}
                    value={btn}
                    className={sameValue(btn, durationFilter) ? "chosen" : ""}
                    onClick={() => pickFilter(setDurationFilter, btn)}
                  />
                ))}
                {uniqueDurations.length === 0 && (
                  <p className="empty">Nothing left to choose</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="filter-summary">
          <span className="count">
            {filteredColleges.length}{" "}
            {filteredColleges.length === 1 ? "college" : "colleges"}
          </span>
          {activeFilters.map((filter) => (
            <button
              key={filter.key}
              className="filter-chip"
              onClick={filter.clear}
              title={`Remove ${filter.key} filter`}
            >
              {filter.value} <span aria-hidden="true">×</span>
            </button>
          ))}
          {activeFilters.length > 0 && (
            <button className="clear-all" onClick={clearFilters}>
              Clear all
            </button>
          )}
        </div>
        {filteredColleges.length > 0 ? (
          <ul className="college-list">
            {filteredColleges.map((college, index) => {
              const courses = college.courses || [];
              const topCourse = courses[0] || {};
              const hasCover = college?.gallery?.length > 0;
              const canOpen = college?.gallery?.length > 1;
              const openCollege = () => {
                if (!canOpen) return;
                setNavState({ college });
                navigate.push(
                  `/college-info/${college.name.replace(/\s+/g, "-")}`
                );
              };

              return (
                <li key={index} className="college-card">
                  <div
                    className={`cover${hasCover ? "" : " is-logo"}`}
                    onClick={openCollege}
                  >
                    <img
                      src={hasCover ? college.gallery[0] : college.logo || logo}
                      alt={college.name}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = logoMobile;
                        e.target.parentElement.classList.add("is-logo");
                      }}
                    />
                    {courses.length > 0 && (
                      <span className="chip courses-count">
                        {courses.length} Course{courses.length > 1 ? "s" : ""}
                      </span>
                    )}
                    <span className="chip rating">
                      <FcRating /> {ratingFor(college.name)}
                      <small>({reviewsFor(college.name)})</small>
                    </span>
                    {college.location && (
                      <span className="chip place">
                        <MdLocationOn /> {college.location}
                      </span>
                    )}
                    <span className="chip tag">
                      <TiTick /> Best in Placement
                    </span>
                  </div>

                  <div className="card-body">
                    <h3
                      className={canOpen ? "linkable" : ""}
                      title={college.name}
                      onClick={openCollege}
                    >
                      {college.name}
                    </h3>

                    <div className="stats">
                      <div>
                        <span className="k">Avg. Fee</span>
                        <span className="v">
                          {formatFee(topCourse.fees) || "On request"}
                        </span>
                      </div>
                      <div>
                        <span className="k">Duration</span>
                        <span className="v green">
                          {topCourse.duration || "—"}
                        </span>
                      </div>
                    </div>

                    {courses.length > 0 && (
                      <div className="course-tags">
                        {courses.slice(0, 3).map((course, i) => (
                          <span key={i}>{course.name}</span>
                        ))}
                        {courses.length > 3 && (
                          <span className="more">+{courses.length - 3}</span>
                        )}
                      </div>
                    )}

                    <div className="actions">
                      <button
                        className="ghost"
                        onClick={() => navigate.push(`/register`)}
                      >
                        <FaDownload /> Brochure
                      </button>
                      <button
                        className="solid"
                        onClick={() => {
                          setNavState({ name: college.name });
                          navigate.push(`/admission`);
                        }}
                      >
                        Apply Now <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : activeFilters.length > 0 ? (
          <p className="no-result">
            No college matches these filters.{" "}
            <button onClick={clearFilters}>Clear them</button>
          </p>
        ) : (
          <p className="no-result">No result found</p>
        )}
      </div>
    </main>
  );
};

export default CollegeSearch;
