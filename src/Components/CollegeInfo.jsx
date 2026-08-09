"use client";
import { useNavigationState } from "@/Helper/NavigationState";
import Link from "@/Utils/StateLink";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import CollegeHeader from "../Utils/CollegeHeader";
import { useEffect, useState } from "react";
import "./styles/collegeInfo.css";
import RatingForm from "../Utils/RatingForm";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import PaymentsIcon from "@mui/icons-material/Payments";
import {
  // FaGraduationCap,
  // FaMoneyBill,
  FaIndianRupeeSign,
} from "react-icons/fa6";
import ApplyForm from "../Decorators/ApplyForm";
// import HelpAndSupportPage from "./Help";
import FrequentAsk from "./FrequentAsk";
import Review from "./Review";

const CollegeInfo = () => {
  const { navState: state, setNavState } = useNavigationState();
  const navigate = useRouter();
  // const formRef=useRef(null)
  const [ratingBox, setRatingBox] = useState(false);

  useEffect(() => {
    if (!state) {
      navigate.replace("/college");
    }
    window.scrollTo(0, 0);
    const title = document.title;
    document.title = `${
      state?.college?.name ? state?.college?.name : "Search"
    } - Uniscaler`;
    return () => {
      document.title = title;
    };
  }, []);

  const ratingHandler = () => {
    setRatingBox(!ratingBox);
  };

  // tabs
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // No navigation state means this page was opened directly. The effect above
  // redirects; render nothing until it does, rather than dereferencing null.
  if (!state) return null;
  return (
    <main className="top infoCollege">
      <CollegeHeader
        image={state?.college?.gallery[1]}
        alt={state?.college?.name}
        location={state?.college?.location}
        college={state?.college}
      />
      <Box sx={{ overflow: "scroll", marginBottom: "none" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          className="tab-menu"
          sx={{
            position: "sticky",
            top: "150px",
          }}
        >
          <Tab value="1" label="Overview" />
          <Tab value="2" label="Courses & Fees" />
          {/* <Tab value="3" label="Admissions" /> */}
          <Tab value="4" label="Gallery" />
          <Tab value="5" label="Reviews" />
          <Tab value="6" label="FAQs" />
        </Tabs>
      </Box>

      <Box className="college-info">
        <Grid container spacing={2}>
          <Grid size={{ lg: 8, sm: 8, xs: 12, md: 12 }}>
            {value == "1" && (
              <div>
                <div>
                  <h2>Overview</h2>
                </div>

                {state?.college?.description && (
                  <p className="description">{state?.college.description}</p>
                )}
              </div>
            )}
            {value == "2" && (
              <>
                <div>
                  <h2>Courses & Fees</h2>
                  <div className="info">
                    <div className="courses">
                      {console.log(state?.college.courses, "knknkkkk")}
                      {state?.college.courses.map((course) => {
                        return (
                          <div className="course-box" key={course.name}>
                            <div>
                              <h4>
                                {/* <span>
                                  <FaGraduationCap />
                                </span> */}
                                {/* <strong>Course Name</strong> */}
                                <span className="course-name">
                                  {course.name}
                                </span>
                              </h4>
                            </div>
                            <div className="course">
                              <h4>
                                <span>
                                  <PaymentsIcon />
                                </span>
                                <strong>Fees</strong>
                                <span>
                                  <FaIndianRupeeSign />
                                  {course.fees}
                                </span>
                              </h4>
                              <h4>
                                <span>
                                  <UpdateOutlinedIcon />
                                </span>
                                <strong>Duration</strong>
                                <span>{course.duration}</span>
                              </h4>
                              <h4>
                                <span>
                                  <LocalLibraryOutlinedIcon />
                                </span>
                                <strong>InTake</strong>
                                <span>Mar - Nov</span>
                              </h4>
                              <h4>
                                <span>
                                  <AssignmentIndOutlinedIcon />
                                </span>
                                <strong>Seats</strong>
                                <span>60</span>
                              </h4>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
            {value == "3" && (
              <div>
                <h2>Admissions</h2>
                {state?.college?.description && (
                  <p className="description">{state?.college.description}</p>
                )}
              </div>
            )}
            {value == "4" && (
              <div>
                <h2>Gallery</h2>
                <div className="info-group">
                  <div className="info">
                    <div className="gallery">
                      {state?.college.gallery.map((image, index) => (
                        <div className="img-wrapper" key={index}>
                          <img
                            loading="lazy"
                            src={image}
                            alt={state.college.name}
                            rel="noreferrer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="info">
                    <h4>
                      Location : <span>{state?.college.location}</span>
                    </h4>
                  </div>
                </div>
              </div>
            )}
            {value == "5" && (
              <div>
                <h2>Reviews</h2>
                <Review />
              </div>
            )}

            {value == "6" && (
              <div>
                <h2>FAQs</h2>
                <div className="info">
                  <FrequentAsk />
                </div>
              </div>
            )}
          </Grid>
          <Grid size={{ lg: 4, xs: 12, md: 12 }}>
            <Box
              sx={{
                position: "sticky",
                top: "60px",
              }}
              px={2}
              py={4}
            >
              <ApplyForm />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <section className="rating">
        {ratingBox ? (
          <RatingForm
            cName={state?.college.name}
            location={state?.college.location}
            func={ratingHandler}
          />
        ) : (
          <div className="rating-btn">
            <button
              className=""
              onClick={() => {
                setNavState({ name: state?.college?.name });
                navigate.push(`/admission`);
              }}
            >
              Apply Now
            </button>
            <button className="btn" onClick={ratingHandler}>
              Write a review
            </button>
          </div>
        )}
      </section>
      <Link href="/admission"
        className="btn"
        state={{ name: state?.college.name }}
      >
        Request &nbsp;a Call{" "}
      </Link>
    </main>
  );
};

export default CollegeInfo;
