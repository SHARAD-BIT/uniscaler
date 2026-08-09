"use client";
import { useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaArrowLeft, FaPhone } from "react-icons/fa6";
import { studyAbroadCountries, studyAbroadStats } from "@/lib/studyAbroadData";
import "../study-abroad.css";
import "./country-page.css";

export default function CountryPageClient({ country }) {
  const allCategories = ["All", ...(country.categories || []).map((c) => c.name)];
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? country.categories || []
      : (country.categories || []).filter((c) => c.name === activeCategory);

  const totalCourses = (country.categories || []).reduce(
    (sum, c) => sum + c.courses.length,
    0
  );

  return (
    <main className="sa-page cp-page">
      {/* ─── Breadcrumb ─── */}
      <div className="cp-breadcrumb">
        <div className="sa-explorer-inner">
          <Link href="/study-abroad" className="cp-back-link">
            <FaArrowLeft /> All Countries
          </Link>
          <span className="cp-breadcrumb-sep">/</span>
          <span className="cp-breadcrumb-current">{country.name}</span>
        </div>
      </div>

      {/* ─── Country Hero ─── */}
      <section className="cp-hero">
        <div className="sa-explorer-inner">
          <div className="cp-hero-flag">
            <img src={country.flag} alt={`${country.name} flag`} />
          </div>
          <h1 className="cp-hero-title">
            Study in <span className="sa-hero-accent">{country.name}</span>
          </h1>
          <p className="cp-hero-sub">
            Explore {country.totalPrograms} internationally accredited degree programs at
            top universities in {country.name}. Expert counseling, 98% admit rate.
          </p>
          <div className="sa-hero-ctas">
            <Link href="/contact" className="sa-btn-primary">
              Book 1:1 Counseling <FaArrowRight />
            </Link>
            <a href="tel:+919667956655" className="sa-btn-secondary">
              <FaPhone /> +91 96679 56655
            </a>
          </div>
        </div>
      </section>

      {/* ─── Stats Row ─── */}
      <section className="sa-stats cp-stats">
        {studyAbroadStats.map((stat) => (
          <div key={stat.label} className="sa-stat-item">
            <span className="sa-stat-value">{stat.value}</span>
            <span className="sa-stat-label">{stat.label}</span>
            <span className="sa-stat-sub">{stat.subtitle}</span>
          </div>
        ))}
      </section>

      {/* ─── Programs ─── */}
      <section className="sa-explorer">
        <div className="sa-explorer-inner">
          <div className="cp-programs-header">
            <h2 className="sa-section-title">{country.name} Programs</h2>
            <span className="cp-program-count">{totalCourses} Programs Listed</span>
          </div>

          {/* Category Filter */}
          <div className="sa-category-filters">
            {allCategories.map((cat) => (
              <button
                key={cat}
                className={`sa-cat-filter ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
                {cat !== "All" && (
                  <span style={{ marginLeft: "4px", opacity: 0.7 }}>
                    ({(country.categories.find((c) => c.name === cat)?.courses || []).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Program Sections */}
          <div className="sa-programs-area">
            {filtered.map((cat) => (
              <div key={cat.name} className="sa-cat-section">
                <h3 className="sa-cat-title">
                  {cat.name}{" "}
                  <span className="cp-cat-count">— {cat.courses.length} Programs</span>
                </h3>
                <div className="sa-programs-grid">
                  {cat.courses.map((course) => (
                    <div key={course.id} className="sa-program-card">
                      <div className="sa-program-logo">
                        <img src={course.logo} alt={course.university} loading="lazy" />
                      </div>
                      <div className="sa-program-info">
                        <span className="sa-program-university">{course.university}</span>
                        <h4 className="sa-program-title">{course.title}</h4>
                      </div>
                      <Link href="/contact" className="sa-program-cta">
                        Apply <FaArrowRight />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="sa-empty">No programs found for this category.</div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Explore Other Countries ─── */}
      <section className="cp-other-countries">
        <div className="sa-explorer-inner">
          <h2 className="sa-section-title">Explore Other Destinations</h2>
          <div className="cp-other-grid">
            {studyAbroadCountries
              .filter((c) => c.slug !== country.slug)
              .map((c) => (
                <Link key={c.slug} href={`/study-abroad/${c.slug}`} className="sa-country-card">
                  <img src={c.flag} alt={c.name} className="sa-country-card-flag" />
                  <div className="sa-country-card-info">
                    <span className="sa-country-card-name">{c.name}</span>
                    <span className="sa-country-card-count">{c.totalPrograms} Programs</span>
                  </div>
                  <FaArrowRight className="sa-country-card-arrow" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="sa-cta-banner">
        <div className="sa-explorer-inner">
          <h2>Ready to Study in {country.name}?</h2>
          <p>Talk to our expert counselors and secure your admission today.</p>
          <Link href="/contact" className="sa-btn-primary">
            Book Free Counseling <FaArrowRight />
          </Link>
        </div>
      </section>
    </main>
  );
}
