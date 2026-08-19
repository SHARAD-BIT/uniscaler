"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FaArrowRight,
  FaPlaneUp,
  FaXmark,
  FaDownload,
} from "react-icons/fa6";
import {
  pathwayFacets,
  pathwayPrograms,
  filterPrograms,
} from "@/lib/pathwayPrograms";
import "../study-abroad.css";
import "./pathway-programs.css";

/** How many to render before "Load more" — 203 cards at once is a long page. */
const PAGE_SIZE = 24;

/**
 * Reads the initial selection off the query string.
 *
 * The pathway cards on /study-abroad link here with the card's own domain and
 * country, so the arrow lands on this page already narrowed to what was being
 * looked at rather than on all 203 programs. Repeated keys are how a facet
 * arrives with more than one value (`?country=Germany&country=France`).
 *
 * Values are checked against the facets rather than trusted: a hand-typed
 * `?domain=Astrology` would otherwise show a chip that filters everything away
 * with no way to tell why.
 */
function selectionFromQuery(params) {
  const selection = {};
  for (const facet of pathwayFacets) {
    const allowed = facet.options.map((o) => o.value);
    const chosen = params.getAll(facet.key).filter((v) => allowed.includes(v));
    if (chosen.length) selection[facet.key] = chosen;
  }
  return selection;
}

export default function PathwayProgramsClient() {
  const searchParams = useSearchParams();
  // Initial state only. Once the page is open the pills own the selection, so
  // reading the query string on every render would fight them.
  const [selection, setSelection] = useState(() =>
    selectionFromQuery(searchParams)
  );
  const [shown, setShown] = useState(PAGE_SIZE);

  const results = useMemo(() => filterPrograms(selection), [selection]);

  const chosenCount = Object.values(selection).reduce(
    (n, v) => n + v.length,
    0
  );

  const toggle = (key, value) => {
    setSelection((current) => {
      const chosen = current[key] || [];
      const next = chosen.includes(value)
        ? chosen.filter((v) => v !== value)
        : [...chosen, value];
      const updated = { ...current, [key]: next };
      if (!next.length) delete updated[key];
      return updated;
    });
    // A narrower list should start from the top rather than keep however many
    // pages the previous, wider one had been opened out to.
    setShown(PAGE_SIZE);
  };

  return (
    <main className="pp-page">
      <div className="pp-inner">
        {/* A div with the role, not a <nav>, and that is not a preference:
            navbar.css styles the bare element — `nav { position: fixed; top: 0;
            z-index: 100 }` and 55 more rules — so a <nav> anywhere on the site
            becomes a second site navbar. As one this breadcrumb pinned itself
            over the real bar at the top of the viewport. `role="navigation"` is
            what <nav> maps to anyway, so nothing is lost to a screen reader. */}
        <div className="pp-crumbs" role="navigation" aria-label="Breadcrumb">
          <Link href="/study-abroad">Study Abroad</Link>
          <span aria-hidden="true">/</span>
          <span>Pathway Programs</span>
        </div>

        <h1 className="pp-title">Accelerated Pathway Programs</h1>
        <p className="pp-sub">
          Every program in the catalog — {pathwayPrograms.length} degrees across{" "}
          {pathwayFacets[1].options.length} countries. Narrow it down below.
        </p>

        <section className="pp-prefs" aria-label="Change preferences">
          <div className="pp-prefs-head">
            <h2 className="pp-prefs-title">Change Preferences</h2>
            {chosenCount > 0 && (
              <button
                type="button"
                className="pp-clear"
                onClick={() => {
                  setSelection({});
                  setShown(PAGE_SIZE);
                }}
              >
                Clear {chosenCount} filter{chosenCount > 1 ? "s" : ""}{" "}
                <FaXmark />
              </button>
            )}
          </div>

          {pathwayFacets.map((facet) => (
            <div className="pp-facet" key={facet.key}>
              <h3 className="pp-facet-label">{facet.label}</h3>
              <div className="pp-pills">
                {facet.options.map((option) => {
                  const on = (selection[facet.key] || []).includes(
                    option.value
                  );
                  return (
                    <button
                      key={option.value}
                      type="button"
                      /* A toggle, so it carries its state rather than leaving a
                         sighted-only colour change to speak for it. */
                      aria-pressed={on}
                      className={`pp-pill${on ? " is-on" : ""}`}
                      onClick={() => toggle(facet.key, option.value)}
                    >
                      {option.value}
                      <span className="pp-pill-count">{option.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        <div className="pp-resultbar" aria-live="polite">
          <strong>{results.length}</strong>{" "}
          {results.length === 1 ? "program" : "programs"}
          {chosenCount > 0 && " match your preferences"}
        </div>

        {results.length > 0 ? (
          <>
            <div className="pp-grid">
              {results.slice(0, shown).map((program) => (
                <article className="sa-pathway-card" key={program.id}>
                  <div className="sa-pathway-card-head">
                    <span className="sa-pathway-where">
                      <FaPlaneUp />
                      Study in {program.country}
                    </span>
                  </div>
                  <div className="sa-pathway-card-body">
                    <span className="sa-pathway-logo">
                      <img
                        src={program.logo}
                        alt={program.university}
                        loading="lazy"
                      />
                    </span>
                    <span className="sa-pathway-uni">
                      <img src={program.flag} alt="" />
                      <span>{program.university}</span>
                    </span>
                    <h3 className="sa-pathway-name">{program.title}</h3>

                    {/* What the pills would have to be set to for this program
                        to come back — the same vocabulary, so the badges read
                        as an explanation of the filters rather than as a second
                        set of labels. */}
                    <div className="pp-tags">
                      <span className="pp-tag">{program.domain}</span>
                      {program.level && (
                        <span className="pp-tag">{program.level}</span>
                      )}
                      {program.stem && <span className="pp-tag">STEM</span>}
                      {program.internship && (
                        <span className="pp-tag">With Internship</span>
                      )}
                    </div>

                    {/* Same button as the study-abroad page's pathway cards,
                        and the same reasoning applies — see the long note there
                        for why this points at a competitor's host and why that
                        was the client's call rather than an oversight. */}
                    <div className="sa-pathway-actions">
                      {program.syllabusUrl ? (
                        <a
                          href={program.syllabusUrl}
                          className="sa-pathway-cta"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Download the brochure for ${program.title}`}
                        >
                          Download Brochure <FaDownload />
                        </a>
                      ) : (
                        <Link href="/contact" className="sa-pathway-cta">
                          Talk to a Counsellor
                        </Link>
                      )}
                      <Link
                        href={`/study-abroad/${program.countrySlug}`}
                        className="sa-pathway-go"
                        aria-label={`${program.title} — programs in ${program.country}`}
                      >
                        <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {shown < results.length && (
              <div className="pp-more">
                <button
                  type="button"
                  className="sa-pathway-viewall"
                  onClick={() => setShown((n) => n + PAGE_SIZE)}
                >
                  Load {Math.min(PAGE_SIZE, results.length - shown)} more of{" "}
                  {results.length} <FaArrowRight />
                </button>
              </div>
            )}
          </>
        ) : (
          /* Reachable — "Bachelors + Health & Science" is empty, for one — so it
             says what to do rather than only that there is nothing. */
          <div className="pp-empty">
            <p>No program matches all of those preferences.</p>
            <button
              type="button"
              className="sa-pathway-viewall"
              onClick={() => setSelection({})}
            >
              Clear the filters <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
