"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { MdLocationOn, MdSearch, MdSchool } from "react-icons/md";
import StateLink from "@/Utils/StateLink";
import "./styles/collegeTable.css";
import "./styles/collegeCourseDropdown.css";

const CollegeTable = ({ colleges, description, location }) => {
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("all");
  const [courseMenuOpen, setCourseMenuOpen] = useState(false);
  const courseMenuRef = useRef(null);
  const city = location.replace(/-/g, " ");
  const courseOptions = useMemo(
    () => [...new Set(colleges.flatMap((c) => c.courses.map((x) => x.name)))].sort(),
    [colleges]
  );
  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    return [...colleges].sort((a, b) => a.name.localeCompare(b.name)).filter((c) => {
      const textMatch = !query || c.name.toLowerCase().includes(query) ||
        c.location.toLowerCase().includes(query) ||
        c.courses.some((x) => x.name.toLowerCase().includes(query));
      const courseMatch = course === "all" || c.courses.some((x) => x.name === course);
      return textMatch && courseMatch;
    });
  }, [colleges, course, search]);
  useEffect(() => {
    const closeMenu = (event) => {
      if (!courseMenuRef.current?.contains(event.target)) setCourseMenuOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setCourseMenuOpen(false);
    };
    document.addEventListener("pointerdown", closeMenu);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <section className="college-directory fadeIn">
      <div className="college-directory-toolbar">
        <div className="college-directory-count">
          <strong>Colleges Listing in {city}</strong>
          <span>{results.length} {results.length === 1 ? "college" : "colleges"} found</span>
        </div>
        <label className="college-directory-search">
          <MdSearch aria-hidden="true" />
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search institute, course or location" aria-label="Search colleges" />
        </label>
        <div className="college-directory-filter" ref={courseMenuRef}>
          <button type="button" className="college-course-trigger"
            aria-haspopup="listbox" aria-expanded={courseMenuOpen}
            onClick={() => setCourseMenuOpen((open) => !open)}>
            <span>{course === "all" ? "All Courses" : course}</span>
            <span className={`college-course-chevron${courseMenuOpen ? " is-open" : ""}`} aria-hidden="true">⌄</span>
          </button>
          {courseMenuOpen && (
            <div className="college-course-menu" role="listbox" aria-label="Filter by course">
              {[{ value: "all", label: "All Courses" }, ...courseOptions.map((x) => ({ value: x, label: x }))].map((option) => (
                <button type="button" role="option" aria-selected={course === option.value}
                  className={course === option.value ? "is-selected" : ""} key={option.value}
                  onClick={() => { setCourse(option.value); setCourseMenuOpen(false); }}>
                  <span>{option.label}</span>
                  {course === option.value && <span aria-hidden="true">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {results.length ? (
        <div className="college-card-grid">
          {results.map((college) => {
            const courses = college.courses.slice(0, 3);
            const fee = courses.find((x) => x.fees)?.fees;
            return (
              <article className="college-listing-card" key={college.name}>
                <div className="college-card-ribbon"><MdSchool /> Top college in {city}</div>
                <div className="college-card-heading">
                  <div className="college-card-logo">
                    <Image src={college.logo || "/mainLogo.svg"} alt={`${college.name} logo`}
                      width={48} height={48} unoptimized />
                  </div>
                  <h3>{college.name}</h3>
                </div>
                <p className="college-card-location"><MdLocationOn /> {college.location}</p>
                <div className="college-card-courses">
                  <span>Popular programmes</span>
                  <div>{courses.map((x) => <span className="college-course-tag" key={x.name}>{x.name}</span>)}</div>
                </div>
                <p className="college-card-description">{college.description}</p>
                <div className="college-card-meta"><span>Indicative fee</span><strong>{fee || "Contact for fee details"}</strong></div>
                <StateLink className="college-card-action" href="/admission" state={{ name: college.name }}>
                  Know More <span aria-hidden="true">→</span>
                </StateLink>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="college-directory-empty"><MdSearch /><h3>No colleges found</h3><p>Try another search or course.</p></div>
      )}

      <div className="college-location-about">
        <span>Explore the city</span><h2>About {city}</h2><p>{description}</p>
      </div>
    </section>
  );
};

export default CollegeTable;
CollegeTable.propTypes = { colleges: PropTypes.array.isRequired, description: PropTypes.string.isRequired, location: PropTypes.string.isRequired };
