"use client";
import { useState } from "react";
import Link from "next/link";
import { studyAbroadCountries, studyAbroadStats } from "@/lib/studyAbroadData";
import { FaArrowRight, FaPhone, FaGlobe } from "react-icons/fa6";
import "./study-abroad.css";

export default function StudyAbroadPage() {
  const [activeSlug, setActiveSlug] = useState(studyAbroadCountries[0]?.slug || "united-states");
  const [activeCategory, setActiveCategory] = useState("All");

  const activeCountry =
    studyAbroadCountries.find((c) => c.slug === activeSlug) || studyAbroadCountries[0];

  const allCategories = ["All", ...new Set((activeCountry?.categories || []).map((c) => c.name))];

  const filteredCategories =
    activeCategory === "All"
      ? activeCountry?.categories || []
      : (activeCountry?.categories || []).filter((c) => c.name === activeCategory);

  return (
    <main className="sa-page">
      {/* ─── Hero ─── */}
      <section className="sa-hero">
        <div className="sa-hero-inner">
          <div className="sa-hero-text">
            <div className="sa-hero-badge">
              <FaGlobe /> Study Abroad Programs
            </div>
            <h1 className="sa-hero-title">
              Your Path, <span className="sa-hero-accent">Your Destination</span>
            </h1>
            <p className="sa-hero-subtitle">
              Trusted overseas education consultants guiding you to top study abroad
              programs & opportunities across 9 countries and 300+ universities.
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

          <div className="sa-hero-cards">
            {studyAbroadCountries.filter((c) => c.isPopular).slice(0, 4).map((country) => (
              <Link
                key={country.slug}
                href={`/study-abroad/${country.slug}`}
                className="sa-hero-country-card"
              >
                <img src={country.flag} alt={country.name} />
                <span>{country.name}</span>
                <span className="sa-hero-country-count">{country.totalPrograms} Programs</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="sa-stats">
        {studyAbroadStats.map((stat) => (
          <div key={stat.label} className="sa-stat-item">
            <span className="sa-stat-value">{stat.value}</span>
            <span className="sa-stat-label">{stat.label}</span>
            <span className="sa-stat-sub">{stat.subtitle}</span>
          </div>
        ))}
      </section>

      {/* ─── Country Selector + Program Cards ─── */}
      <section className="sa-explorer">
        <div className="sa-explorer-inner">
          <h2 className="sa-section-title">Explore Programs by Country</h2>

          {/* Country Tabs */}
          <div className="sa-country-tabs">
            {studyAbroadCountries.map((country) => (
              <button
                key={country.slug}
                className={`sa-country-tab ${activeSlug === country.slug ? "active" : ""}`}
                onClick={() => {
                  setActiveSlug(country.slug);
                  setActiveCategory("All");
                }}
              >
                <img src={country.flag} alt={country.name} className="sa-tab-flag" />
                {country.name}
                <span className="sa-tab-count">{country.totalPrograms}</span>
              </button>
            ))}
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
              </button>
            ))}
          </div>

          {/* Program Sections */}
          <div className="sa-programs-area">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <div key={cat.name} className="sa-cat-section">
                  <h3 className="sa-cat-title">{cat.name}</h3>
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
                        <Link
                          href={`/study-abroad/${activeSlug}`}
                          className="sa-program-cta"
                        >
                          View Program <FaArrowRight />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="sa-empty">No programs available for this selection.</div>
            )}

            <div className="sa-view-all-wrap">
              <Link href={`/study-abroad/${activeSlug}`} className="sa-btn-primary">
                View All {activeCountry.totalPrograms} Programs in {activeCountry.name}{" "}
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── All Countries Directory ─── */}
      <section className="sa-countries-dir">
        <div className="sa-explorer-inner">
          <h2 className="sa-section-title">All Destinations</h2>
          <div className="sa-countries-grid">
            {studyAbroadCountries.map((country) => (
              <Link
                key={country.slug}
                href={`/study-abroad/${country.slug}`}
                className="sa-country-card"
              >
                <img src={country.flag} alt={country.name} className="sa-country-card-flag" />
                <div className="sa-country-card-info">
                  <span className="sa-country-card-name">{country.name}</span>
                  <span className="sa-country-card-count">{country.totalPrograms} Programs</span>
                </div>
                <FaArrowRight className="sa-country-card-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="sa-cta-banner">
        <div className="sa-explorer-inner">
          <h2>Ready to Study Abroad?</h2>
          <p>Talk to our expert counselors and find the best program for you.</p>
          <Link href="/contact" className="sa-btn-primary">
            Book Free Counseling <FaArrowRight />
          </Link>
        </div>
      </section>
    </main>
  );
}
