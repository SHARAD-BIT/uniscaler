"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import { studyAbroadCountries } from "@/lib/studyAbroadData";
import "./styles/studyAbroadMegaMenu.css";

const StudyAbroadMegaMenu = ({ onClose }) => {
  const [activeSlug, setActiveSlug] = useState(
    studyAbroadCountries[0]?.slug || "united-states"
  );

  const activeCountry =
    studyAbroadCountries.find((c) => c.slug === activeSlug) ||
    studyAbroadCountries[0];

  return (
    <div
      className="study-abroad-mega-menu"
      onMouseLeave={onClose}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Left Sidebar - Countries */}
      <div className="study-abroad-sidebar">
        <div>
          <div className="study-abroad-sidebar-header">Countries</div>
          <ul className="study-abroad-country-list">
            {studyAbroadCountries.map((country) => (
              <li
                key={country.slug}
                className={`study-abroad-country-item ${
                  activeSlug === country.slug ? "active" : ""
                }`}
                onMouseEnter={() => setActiveSlug(country.slug)}
                onClick={() => setActiveSlug(country.slug)}
              >
                <img
                  src={country.flag}
                  alt={country.name}
                  className="study-abroad-country-flag"
                  loading="lazy"
                />
                <span>{country.name}</span>
                <FaChevronRight
                  style={{
                    fontSize: "0.75rem",
                    marginLeft: "auto",
                    opacity: activeSlug === country.slug ? 1 : 0.4,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/study-abroad"
          className="study-abroad-view-all-btn"
          onClick={onClose}
        >
          View all countries
        </Link>
      </div>

      {/* Right Content Panel - Categories & Program Cards */}
      <div className="study-abroad-content">
        <div className="study-abroad-header-row">
          <div className="study-abroad-country-title">
            <img src={activeCountry.flag} alt="" />
            <span>{activeCountry.name}</span>
          </div>
          <Link
            href={`/study-abroad/${activeCountry.slug}`}
            className="study-abroad-header-link"
            onClick={onClose}
          >
            View all ({activeCountry.totalPrograms} Programs){" "}
            <FaChevronRight style={{ fontSize: "0.8rem" }} />
          </Link>
        </div>

        {activeCountry.categories && activeCountry.categories.length > 0 ? (
          activeCountry.categories.map((cat) => (
            <div key={cat.name} className="study-abroad-category-group">
              <h4 className="study-abroad-category-title">{cat.name}</h4>
              <div className="study-abroad-courses-grid">
                {cat.courses.slice(0, 4).map((course) => (
                  <Link
                    key={course.id}
                    href={`/study-abroad/${activeCountry.slug}`}
                    className="study-abroad-course-card"
                    onClick={onClose}
                  >
                    <div className="study-abroad-logo-wrapper">
                      <img
                        src={course.logo}
                        alt={course.university}
                        loading="lazy"
                      />
                    </div>
                    <div className="study-abroad-course-info">
                      <span className="study-abroad-university-name">
                        {course.university}
                      </span>
                      <span className="study-abroad-degree-title">
                        {course.title}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>
            No programs listed for this region.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyAbroadMegaMenu;
