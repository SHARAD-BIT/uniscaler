"use client";
import { useState } from "react";
import Link from "next/link";
import StateLink from "@/Utils/StateLink";
import { ONLINE_COURSES } from "@/lib/catalog";
import { MdLocationOn, MdStar, MdStarHalf, MdStarBorder } from "react-icons/md";

/**
 * The whole university page below the route shell. Client component because
 * the section bar works like the collegevidya reference: clicking a topic
 * shows only that topic's panel (no long scroll page) — that switch is local
 * state. `detail` is the university's generated JSON, `uni` its grid row.
 */

const formatFee = (fee) =>
  typeof fee === "number" && fee > 0
    ? `₹${fee.toLocaleString("en-IN")}`
    : null;

// 4.5 -> four full stars, one half. Ratings arrive as one decimal place.
function Stars({ rating }) {
  const value = Number(rating) || 0;
  return (
    <span className="uv-stars" aria-label={`Rated ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) =>
        value >= i - 0.25 ? (
          <MdStar key={i} />
        ) : value >= i - 0.75 ? (
          <MdStarHalf key={i} />
        ) : (
          <MdStarBorder key={i} />
        )
      )}
    </span>
  );
}

/**
 * Where a table cell can lead somewhere real on Uniscaler, it becomes a link
 * — like the reference's course tables. An exact course-name match goes to
 * its /online-course page ("MBA Course Online" -> /online-course/MBA,
 * dots-vs-no-dots tolerated); known degree labels without their own page
 * land on the closest /course category; and any leftover course/program-
 * shaped cell falls back to the course explorer, so no cell in a course
 * table is dead text.
 */
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "");
const CELL_ALIASES = {
  mtech: "/course/engineering",
  btech: "/course/engineering",
  bcom: "/course/commerce",
  ba: "/course/arts",
  ma: "/course/arts",
  bsc: "/course",
  msc: "/course",
  "1yearmba": "/online-course/MBA",
  globalmba: "/online-course/MBA",
};
function cellTarget(text) {
  if (/universities in india/i.test(text)) return "/goal";
  if (/courses in india/i.test(text)) return "/course";
  const label = String(text)
    .replace(/course(s)?|online|[?!]/gi, " ")
    .trim();
  const key = norm(label);
  const course = ONLINE_COURSES.find((n) => norm(n) === key);
  if (course) return `/online-course/${course.replace(/\s/g, "-")}`;
  if (CELL_ALIASES[key]) return CELL_ALIASES[key];
  if (/\bcourses?\b|\bprograms?\b/i.test(text)) return "/course";
  return null;
}

// about blocks arrive typed from the extraction: h = subheading, li = bullet,
// p = paragraph, table = rows of cells. Consecutive li's render as one list.
function Blocks({ blocks }) {
  const out = [];
  let list = [];
  const flush = () => {
    if (list.length) {
      out.push(
        <ul key={`ul-${out.length}`}>
          {list.map((text, i) => (
            <li key={i}>{text}</li>
          ))}
        </ul>
      );
      list = [];
    }
  };
  blocks.forEach((b, i) => {
    if (b.t === "li") {
      list.push(b.text);
      return;
    }
    flush();
    if (b.t === "table") {
      const maxCols = Math.max(...b.rows.map((r) => r.cells.length));
      out.push(
        <div key={i} className="uv-table-wrap">
          <table className="uv-content-table">
            <tbody>
              {b.rows.map((row, ri) => {
                const Cell = row.header ? "th" : "td";
                // A lone cell in a wider table is a section header row —
                // span it across, like the source table does.
                const span =
                  row.cells.length === 1 && maxCols > 1 ? maxCols : undefined;
                return (
                  <tr key={ri}>
                    {row.cells.map((cell, ci) => {
                      const href = row.header ? null : cellTarget(cell);
                      return (
                        <Cell key={ci} colSpan={span}>
                          {href ? <Link href={href}>{cell}</Link> : cell}
                        </Cell>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      return;
    }
    if (b.t === "h") out.push(<h3 key={i}>{b.text}</h3>);
    else out.push(<p key={i}>{b.text}</p>);
  });
  flush();
  return out;
}

export default function UniversityView({ uni, detail }) {
  const { stars, total } = detail.reviewStats;
  const maxStar = Math.max(1, ...stars);

  // Each entry renders only when its data survived extraction, so a
  // university missing a tab on the source simply has no tab here either.
  const hasFees = detail.courses.some((c) => c.feeDetails?.length);
  const sections = [
    detail.about.length && ["about", "About"],
    detail.courses.length && ["courses", "Courses"],
    detail.emi?.length && ["emi", "Education Loan/EMI"],
    (detail.admission?.length || detail.importantDates?.length) && [
      "admission",
      "Admission Open 2026",
    ],
    detail.examination?.length && ["examination", "Examination Pattern"],
    (detail.placementText?.length || detail.placementPartners?.length) && [
      "placements",
      "Placement Partners",
    ],
    hasFees && ["fees", "Course Fees"],
    detail.facts.length && ["facts", "Key Facts"],
    total && ["reviews", "Reviews"],
    detail.faculty?.length && ["faculty", "Faculty"],
    detail.faqs.length && ["faqs", "FAQs"],
  ].filter(Boolean);

  const [active, setActive] = useState(sections[0]?.[0] ?? null);
  const hasReviewsTab = sections.some(([id]) => id === "reviews");

  return (
    <>
      {detail.banner && (
        <div className="uv-banner">
          <img src={detail.banner} alt={`${detail.name} campus`} />
        </div>
      )}

      <header className="uv-head">
        {uni.logo && (
          <span className="uv-logo-tile">
            <img src={uni.logo} alt={`${detail.name} logo`} />
          </span>
        )}
        <div className="uv-head-main">
          <h1>{detail.name}</h1>
          <div className="uv-meta">
            {detail.approvals.length > 0 && (
              <span className="uv-approvals">
                {detail.approvals.map((a) => (
                  <img
                    key={a.logo}
                    src={a.logo}
                    alt={a.title}
                    title={a.title}
                  />
                ))}
              </span>
            )}
            {detail.rating != null && (
              <span className="uv-rating">
                <Stars rating={detail.rating} />
                {total > 0 &&
                  (hasReviewsTab ? (
                    <button
                      type="button"
                      onClick={() => setActive("reviews")}
                    >
                      {total} Reviews
                    </button>
                  ) : (
                    <span>{total} Reviews</span>
                  ))}
              </span>
            )}
          </div>
          <p className="uv-sub">
            {detail.location && (
              <span>
                <MdLocationOn aria-hidden="true" />
                {detail.location}
              </span>
            )}
            {detail.establishedYear && (
              <span>Estd. {detail.establishedYear}</span>
            )}
          </p>
        </div>
        <div className="uv-actions">
          <StateLink
            className="uv-apply"
            href="/admission/"
            state={{ name: detail.name }}
          >
            Apply to University
          </StateLink>
          <Link className="uv-talk" href="/contact">
            Talk to Us
          </Link>
        </div>
      </header>

      {/* A div, NOT a <nav>: navbar.css styles the bare nav element (fixed,
          top, full-width glass, z-index 100), so an in-page <nav> renders as
          a second glass navbar over the hero. */}
      {sections.length > 0 && (
        <div className="uv-tabs" role="tablist" aria-label="Page sections">
          {sections.map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active === id}
              className={active === id ? "is-active" : undefined}
              onClick={() => setActive(id)}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="uv-body">
        {active === "about" && (
          <section className="uv-section" role="tabpanel">
            <h2>About {detail.name}</h2>
            {detail.aboutBoxes.length > 0 && (
              <div className="uv-boxes">
                {detail.aboutBoxes.map((b) => (
                  <div key={b.title} className="uv-box">
                    <h3>{b.title}</h3>
                    <p>{b.content}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="uv-prose">
              <Blocks blocks={detail.about} />
            </div>
          </section>
        )}

        {active === "courses" && (
          <section className="uv-section" role="tabpanel">
            <h2>Online Courses</h2>
            <div className="uv-courses">
              {detail.courses.map((c, i) => (
                <div key={`${c.name}-${i}`} className="uv-course">
                  <h3>{c.name}</h3>
                  <p className="uv-course-meta">
                    {c.duration && <span>{c.duration}</span>}
                    {formatFee(c.fee) && (
                      <span>
                        {formatFee(c.fee)} <em>total fees</em>
                      </span>
                    )}
                  </p>
                  <StateLink
                    href="/admission/"
                    state={{ name: `${c.name} at ${detail.name}` }}
                  >
                    Apply Now
                  </StateLink>
                </div>
              ))}
            </div>
          </section>
        )}

        {active === "emi" && (
          <section className="uv-section" role="tabpanel">
            <h2>Education Loan / EMI</h2>
            <div className="uv-prose">
              <Blocks blocks={detail.emi} />
            </div>
          </section>
        )}

        {active === "admission" && (
          <section className="uv-section" role="tabpanel">
            <h2>Admission Open 2026</h2>
            {detail.admission?.length > 0 && (
              <div className="uv-prose">
                <Blocks blocks={detail.admission} />
              </div>
            )}
            {detail.importantDates?.length > 0 && (
              <>
                <h3 className="uv-subhead">Important Dates</h3>
                <div className="uv-prose">
                  <Blocks blocks={detail.importantDates} />
                </div>
              </>
            )}
          </section>
        )}

        {active === "examination" && (
          <section className="uv-section" role="tabpanel">
            <h2>Examination Pattern</h2>
            <div className="uv-prose">
              <Blocks blocks={detail.examination} />
            </div>
          </section>
        )}

        {active === "placements" && (
          <section className="uv-section" role="tabpanel">
            <h2>Placement Partners</h2>
            {detail.placementPartners?.length > 0 && (
              <div className="uv-partners">
                {detail.placementPartners.map((p) => (
                  <span key={p.logo} className="uv-partner" title={p.title}>
                    <img src={p.logo} alt={p.title} />
                  </span>
                ))}
              </div>
            )}
            {detail.placementText?.length > 0 && (
              <div className="uv-prose">
                <Blocks blocks={detail.placementText} />
              </div>
            )}
          </section>
        )}

        {active === "fees" && (
          <section className="uv-section" role="tabpanel">
            <h2>Course Fees</h2>
            <div className="uv-fee-wrap">
              <table className="uv-fee-table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Duration</th>
                    <th>Total Fees</th>
                    <th>Breakdown</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.courses.map((c, i) => (
                    <tr key={`${c.name}-${i}`}>
                      <td>{c.name}</td>
                      <td>{c.duration || "—"}</td>
                      <td>{formatFee(c.fee) || "—"}</td>
                      <td>
                        {c.feeDetails?.length
                          ? c.feeDetails
                              .map(
                                (fd) =>
                                  `${fd.type}: ${
                                    formatFee(Number(fd.fee)) || fd.fee
                                  }`
                              )
                              .join(" · ")
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {active === "facts" && (
          <section className="uv-section" role="tabpanel">
            <h2>Key Facts</h2>
            <ul className="uv-facts">
              {detail.facts.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </section>
        )}

        {active === "reviews" && (
          <section className="uv-section" role="tabpanel">
            <h2>Learner Reviews</h2>
            <div className="uv-review-summary">
              <div className="uv-review-score">
                <strong>{detail.rating ?? "-"}</strong>
                <Stars rating={detail.rating} />
                <span>{total} reviews</span>
              </div>
              <div className="uv-review-bars">
                {[5, 4, 3, 2, 1].map((s) => (
                  <div key={s} className="uv-review-bar">
                    <span>{s}★</span>
                    <div>
                      <i
                        style={{
                          width: `${(stars[s - 1] / maxStar) * 100}%`,
                        }}
                      />
                    </div>
                    <span>{stars[s - 1]}</span>
                  </div>
                ))}
              </div>
            </div>
            {detail.reviews.length > 0 && (
              <div className="uv-reviews">
                {detail.reviews.map((r, i) => (
                  <blockquote key={i} className="uv-review">
                    <Stars rating={r.rating} />
                    <p>{r.content}</p>
                    <footer>
                      {r.name}
                      {r.date && <time> · {r.date}</time>}
                    </footer>
                  </blockquote>
                ))}
              </div>
            )}
          </section>
        )}

        {active === "faculty" && (
          <section className="uv-section" role="tabpanel">
            <h2>Faculty</h2>
            <div className="uv-faculty">
              {detail.faculty.map((f, i) => (
                <div key={`${f.name}-${i}`} className="uv-fac">
                  {f.photo ? (
                    <img src={f.photo} alt={f.name} />
                  ) : (
                    <span className="uv-fac-ph" aria-hidden="true">
                      {f.name.charAt(0)}
                    </span>
                  )}
                  <h3>{f.name}</h3>
                  {f.title && <p className="uv-fac-title">{f.title}</p>}
                  {f.description && (
                    <p className="uv-fac-desc">{f.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {active === "faqs" && (
          <section className="uv-section" role="tabpanel">
            <h2>Frequently Asked Questions</h2>
            <div className="uv-faqs">
              {detail.faqs.map((f, i) => (
                <details key={i}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
