"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FaArrowRight,
  FaXmark,
  FaHeart,
  FaRegHeart,
  FaMagnifyingGlass,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import {
  pathwayFacets,
  filterPrograms,
  searchPrograms,
  POST_STUDY_WORK,
} from "@/lib/pathwayPrograms";
import "../study-abroad.css";
import "./pathway-programs.css";

/** Cards per page — the reference paginates ten per page and so does this. */
const PAGE_SIZE = 10;

/**
 * The page-number row: first and last always, a window around the current
 * page, "…" where a run is skipped. 21 numbered buttons for the unfiltered
 * list would be a second toolbar; this stays at no more than seven cells.
 */
function pageCells(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const cells = [1];
  if (current > 3) cells.push("…");
  for (
    let p = Math.max(2, current - 1);
    p <= Math.min(total - 1, current + 1);
    p++
  )
    cells.push(p);
  if (current < total - 2) cells.push("…");
  cells.push(total);
  return cells;
}

/**
 * The card hearts, kept in this browser only. There are no accounts on this
 * page, so localStorage is the honest scope: the heart remembers, on this
 * machine, which programs caught the eye — it is not a synced wishlist.
 * Reads and writes are try/catch'd because the accessor itself can throw
 * (SSR, private windows, storage disabled), and an empty set is the correct
 * answer in every one of those cases.
 */
const SAVED_KEY = "uniscaler-pathway-saved";

const readSaved = () => {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
};

/** 11 → "11 Months", 18 → "1 Year 6 Months" — the reference's phrasing. */
const fmtMonths = (m) => {
  if (!m) return null;
  if (m < 12) return `${m} Months`;
  const years = Math.floor(m / 12);
  const rest = m % 12;
  return `${years} Year${years > 1 ? "s" : ""}${rest ? ` ${rest} Months` : ""}`;
};

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
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  // Starts empty and loads after mount, so the server and first client render
  // agree (localStorage exists on neither) and hydration stays clean.
  const [saved, setSaved] = useState(() => new Set());
  useEffect(() => {
    setSaved(readSaved());
  }, []);

  const toggleSaved = (id) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(SAVED_KEY, JSON.stringify([...next]));
      } catch {
        // Storage refused (private window, quota) — the heart still works
        // for this visit; it just won't be remembered.
      }
      return next;
    });
  };

  // Search runs on top of the facet selection: the pills narrow the pool,
  // the query ranks and prunes what is left. 203 items score in well under
  // a millisecond, so this runs on every keystroke with no debounce.
  const results = useMemo(
    () => searchPrograms(filterPrograms(selection), query),
    [selection, query]
  );
  const searching = query.trim().length > 0;

  // Clamped rather than trusted: hearts and re-renders never change it, but a
  // filter applied while deep in the list can leave `page` past the new end.
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageResults = results.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

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
    // A narrower list starts from its first page.
    setPage(1);
  };

  const goToPage = (next) => {
    setPage(next);
    // The new page's cards replace the old ones well below the fold —
    // return to the top of the results so the change is visible.
    document
      .getElementById("pp-results")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
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

        {/* Typo-tolerant search over title, university, country and domain —
            see searchPrograms in lib/pathwayPrograms.js. */}
        <div className="pp-search">
          <FaMagnifyingGlass aria-hidden="true" />
          <input
            type="search"
            value={query}
            placeholder="Search programs, universities, countries…"
            aria-label="Search programs"
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
          {searching && (
            <button
              type="button"
              className="pp-search-clear"
              aria-label="Clear search"
              onClick={() => {
                setQuery("");
                setPage(1);
              }}
            >
              <FaXmark />
            </button>
          )}
        </div>

        <section className="pp-prefs" aria-label="Change preferences">
          <div className="pp-prefs-head">
            <h2 className="pp-prefs-title">Change Preferences</h2>
            {chosenCount > 0 && (
              <button
                type="button"
                className="pp-clear"
                onClick={() => {
                  setSelection({});
                  setPage(1);
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
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Only while filtering or searching — then the number is feedback
            on the selection. Bare of either, "203 programs" was just a
            figure on the page, and the client asked for no numbers
            (2026-08-24). */}
        {(chosenCount > 0 || searching) && (
          <div className="pp-resultbar" aria-live="polite">
            <strong>{results.length}</strong>{" "}
            {results.length === 1 ? "program" : "programs"} match your{" "}
            {searching && chosenCount > 0
              ? "search and preferences"
              : searching
                ? "search"
                : "preferences"}
          </div>
        )}

        {results.length > 0 ? (
          <>
            {/* The reference's wide card, one per row: logo panel, red title
                and durations on the left; labelled fact columns (university,
                country, visa, the two fees) and the CTA pair on the right.
                Their cards lead with a campus photo — licensed stock we have
                no right to (see studyAbroadDestinations.js), so the
                university logo panel stands in. */}
            <div className="pp-list" id="pp-results">
              {pageResults.map((program) => {
                const visa = program.visaMonths
                  ? `Upto ${program.visaMonths} Months`
                  : POST_STUDY_WORK[program.country];
                return (
                  <article className="pp-card" key={program.id}>
                    <button
                      type="button"
                      className={`pp-save${
                        saved.has(program.id) ? " is-saved" : ""
                      }`}
                      aria-pressed={saved.has(program.id)}
                      aria-label={
                        saved.has(program.id)
                          ? `Remove ${program.title} from saved programs`
                          : `Save ${program.title}`
                      }
                      onClick={() => toggleSaved(program.id)}
                    >
                      {saved.has(program.id) ? <FaHeart /> : <FaRegHeart />}
                    </button>

                    <div className="pp-card-left">
                      <span className="pp-card-logo">
                        <img
                          src={program.logo}
                          alt={program.university}
                          loading="lazy"
                        />
                      </span>
                      <h3 className="pp-card-title">{program.title}</h3>
                      {program.onlineMonths && (
                        <p className="pp-card-dur">
                          Online duration - {fmtMonths(program.onlineMonths)}
                        </p>
                      )}
                      {program.campusMonths && (
                        <p className="pp-card-dur">
                          On-campus duration - {fmtMonths(program.campusMonths)}
                        </p>
                      )}
                    </div>

                    <div className="pp-card-right">
                      <div className="pp-card-facts">
                        <div className="pp-fact">
                          <span>University Name</span>
                          <strong>{program.university}</strong>
                        </div>
                        <div className="pp-fact">
                          <span>Destination Country</span>
                          <strong>{program.country}</strong>
                        </div>
                        {visa && (
                          <div className="pp-fact">
                            <span>Post Study Work Visa Eligibility</span>
                            <strong>{visa}</strong>
                          </div>
                        )}
                        {program.campusFee && (
                          <div className="pp-fact">
                            <span>On-campus Tuition Fee</span>
                            <strong>~ {program.campusFee}</strong>
                          </div>
                        )}
                        {program.onlineFee && (
                          <div className="pp-fact">
                            <span>Online Tuition Fee</span>
                            <strong>{program.onlineFee}</strong>
                          </div>
                        )}
                      </div>

                      {/* Both CTAs are the lead gate — /register — on the
                          client's word (2026-08-24), as the brochure button
                          they replace was (2026-08-19 decision). */}
                      <div className="pp-card-ctas">
                        <Link
                          href="/register"
                          className="pp-cta-outline"
                          aria-label={`Register to check eligibility for ${program.title}`}
                        >
                          Check Eligibility
                        </Link>
                        <Link
                          href="/register"
                          className="pp-cta-solid"
                          aria-label={`Register to know more about ${program.title}`}
                        >
                          Know More
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {totalPages > 1 && (
              /* A div with the role, not <nav> — navbar.css styles the bare
                 element into a second fixed site bar (see the breadcrumb
                 note at the top of this component). */
              <div
                className="pp-pagination"
                role="navigation"
                aria-label="Pagination"
              >
                <button
                  type="button"
                  className="pp-page-arrow"
                  disabled={safePage === 1}
                  aria-label="Previous page"
                  onClick={() => goToPage(safePage - 1)}
                >
                  <FaChevronLeft />
                </button>
                {pageCells(safePage, totalPages).map((cell, i) =>
                  cell === "…" ? (
                    <span
                      key={`gap-${i}`}
                      className="pp-page-gap"
                      aria-hidden="true"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={cell}
                      type="button"
                      className={`pp-page-btn${
                        cell === safePage ? " is-current" : ""
                      }`}
                      aria-current={cell === safePage ? "page" : undefined}
                      aria-label={`Page ${cell}`}
                      onClick={() => cell !== safePage && goToPage(cell)}
                    >
                      {cell}
                    </button>
                  )
                )}
                <button
                  type="button"
                  className="pp-page-arrow"
                  disabled={safePage === totalPages}
                  aria-label="Next page"
                  onClick={() => goToPage(safePage + 1)}
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </>
        ) : (
          /* Reachable — "Bachelors + Health & Science" is empty, for one — so it
             says what to do rather than only that there is nothing. */
          <div className="pp-empty">
            <p>
              No program matches{" "}
              {searching ? "that search" : "all of those preferences"}.
            </p>
            <button
              type="button"
              className="sa-pathway-viewall"
              onClick={() => {
                setSelection({});
                setQuery("");
                setPage(1);
              }}
            >
              Clear {searching ? "search & filters" : "the filters"}{" "}
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
