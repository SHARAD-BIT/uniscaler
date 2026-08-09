"use client";
import { useEffect, useState } from "react";
import SearchSet from "../Utils/SearchSet";
import "./styles/ExploreColleges.css";
import CryptoJS from "crypto-js";
import Link from "@/Utils/StateLink";

import { IoSearch } from "react-icons/io5";

// `images` and `course` are stored as JSON strings, but rows written before the
// admin panel enforced that shape hold plain text. A throw here would take the
// whole list down, so fall back to an empty array instead.
const parseJsonList = (value) => {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const ExploreByCollege = () => {
  const list = [
    {
      id: 1,
      name: "Engineering",
      path: "/engineering",
    },
    {
      id: 2,
      name: "Medical",
      path: "/medical",
    },
    {
      id: 3,
      name: "Law",
      path: "/law",
    },
    {
      id: 4,
      name: "Architecture",
      path: "/architecture",
    },
    {
      id: 5,
      name: "Commerce",
      path: "/commerce",
    },
    {
      id: 6,
      name: "Science",
      path: "/science",
    },
    {
      id: 7,
      name: "Management",
      path: "/management",
    },
    {
      id: 8,
      name: "Pharmacy",
      path: "/pharmacy",
    },
    {
      id: 9,
      name: "IT",
      path: "/it",
    },
    {
      id: 10,
      name: "Other",
      path: "/other",
    },
  ];
  // "loading" -> request in flight, "ready" -> fetchData is authoritative
  // (possibly empty), "error" -> the request never produced usable data.
  const [status, setStatus] = useState("loading");
  const [selectedItem, setSelectedItem] = useState(list[0].name);
  const [fetchData, setFetchData] = useState([]);
  const [reloadKey, setReloadKey] = useState(0);
  const hapticFeedBack = () => {
    setActive(!active);
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
  };
  useEffect(() => {
    // Guards against a slow response for a previously selected stream landing
    // after a newer one and overwriting the list.
    const controller = new AbortController();
    const Data = new Date().getDate();
    const encryptedToken = CryptoJS.AES.encrypt(
      JSON.stringify(process.env.NEXT_PUBLIC_FETCH_BLOG + Data),
      process.env.NEXT_PUBLIC_PUBLIC_ENC
    ).toString();
    setStatus("loading");
    fetch(`${process.env.NEXT_PUBLIC_WEBSITE_API}/fetchCollegeForSearch`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        token: encryptedToken,
        searchTerm: selectedItem.toLocaleLowerCase(),
      }),
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          setFetchData(Array.isArray(data.data) ? data.data : []);
          setStatus("ready");
          return;
        }
        // The endpoint answers 401 both for "no rows matched" and for a bad
        // token. Only the latter is an error worth retrying.
        if (data.message === "Invalid Token") {
          setFetchData([]);
          setStatus("error");
          return;
        }
        setFetchData([]);
        setStatus("ready");
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.error("fetchCollegeForSearch failed:", err);
        setFetchData([]);
        setStatus("error");
      });
    return () => controller.abort();
  }, [selectedItem, reloadKey]);
  const [active, setActive] = useState(false);
  return (
    <section className="ExploreColleges">
      <div className="headSection">
        <h2 onClick={() => hapticFeedBack()}>
          <div className="div">
            College{" "}
            <span style={{ color: "var(--accent)" }}>Neural Search</span>
          </div>
          <div className="sIcon">
            <IoSearch />
          </div>
        </h2>
        {active && <SearchSet placeholder="Search by streams..." />}
      </div>
      <div className="gridPreview">
        <div className="CList">
          {list.map((item) => (
            <div
              className="CItem"
              key={item.id}
              onClick={() => setSelectedItem(item.name)}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className="CcontentBox">
          <div className="headCBox">
            <h3>
              Top Colleges & Universities of{" "}
              <span className="accentColor">{selectedItem}</span>
            </h3>
            <Link href={"/college/" + selectedItem.toLocaleLowerCase()}>
              View All
            </Link>
          </div>
          <div className="CollegesListBox">
            {status === "ready" ? (
              fetchData.length > 0 ? (
                fetchData.map((item) => {
                  const images = parseJsonList(item.images);
                  const logo = item?.logo || images[0];
                  return (
                    <Link className="cBox"
                      key={item.id}
                      href={`/college-info/${item.collegeName.replace(/\s+/g, "-")}`}
                      state={{
                        college: {
                          name: item.collegeName,
                          location: item?.location,
                          description: item?.description,
                          gallery: images.map(
                            (image) =>
                              `${process.env.NEXT_PUBLIC_SERVER_URL}collegeGallery/${image}`
                          ),
                          courses: parseJsonList(item?.course),
                          website: item?.website || "N/A",
                        },
                      }}
                    >
                      <div className="vLogo">
                        <img
                          style={
                            item?.logo
                              ? { objectFit: "contain" }
                              : { objectFit: "cover" }
                          }
                          src={
                            logo
                              ? `${process.env.NEXT_PUBLIC_SERVER_URL}collegeGallery/${logo}`
                              : undefined
                          }
                          alt={item.collegeName}
                        />
                      </div>
                      <p>{item.collegeName}</p>
                    </Link>
                  );
                })
              ) : (
                <p className="listStateMsg">
                  No colleges listed under {selectedItem} yet.
                </p>
              )
            ) : status === "error" ? (
              <p className="listStateMsg">
                Could not load colleges right now.{" "}
                <button
                  type="button"
                  className="retryBtn"
                  onClick={() => setReloadKey((k) => k + 1)}
                >
                  Retry
                </button>
              </p>
            ) : (
              <p className="listStateMsg">Loading...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreByCollege;
