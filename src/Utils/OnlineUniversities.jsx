import Link from "next/link";
import StateLink from "@/Utils/StateLink";
import {
  MdLocationOn,
  MdStar,
  MdCheck,
  MdArrowForward,
} from "react-icons/md";
import { UNIVERSITY_CARDS } from "@/lib/universityCards";
import "./styles/onlineUniversities.css";

/**
 * The online-universities grid, shared by /goal (as the whole page) and the
 * online-course page (as a band under the hero video).
 *
 * Restyled 2026-08-25 to the client's college-search card UI: a banner cover
 * with overlay chips (course count, rating, location, a UGC badge), the name,
 * an avg-fee/duration stat band, course tags, and View Details / Apply
 * buttons. Data comes pre-merged from src/lib/universityCards.js.
 *
 * `heading` picks the title tag — /goal passes "h1" since the section is that
 * page's only content; embedded uses the h2 default.
 */
const formatFee = (fee) =>
  typeof fee === "number" && fee > 0
    ? `₹${fee.toLocaleString("en-IN")}`
    : null;

const OnlineUniversities = ({ heading: Heading = "h2" }) => (
  <section className="gp-universities">
    <p className="gp-eyebrow">
      <span aria-hidden="true">🏦</span> 100+ Online Universities
    </p>
    <Heading className="gp-title">
      <span>UGC-approved universities,</span> verified by us and reviewed by
      learners, on 30+ factors
    </Heading>

    <div className="gp-grid">
      {/* Keyed by position: the list is static, and the source data has held
          duplicate names before, so the name alone is not trusted as unique. */}
      {UNIVERSITY_CARDS.map((u, i) => (
        <article key={`${u.name}-${i}`} className="gp-card">
          <Link className="gp-cover" href={`/university/${u.slug}`}>
            {u.banner ? (
              <img src={u.banner} alt={`${u.name} campus`} loading="lazy" />
            ) : (
              <span className="gp-cover-fallback">
                {u.logo && <img src={u.logo} alt="" loading="lazy" />}
              </span>
            )}
            <span className="gp-chip gp-chip-courses">
              {u.courses} {u.courses === 1 ? "Course" : "Courses"}
            </span>
            {u.rating != null && (
              <span className="gp-chip gp-chip-rating">
                <MdStar aria-hidden="true" />
                {u.rating}
                {u.reviews > 0 && <em>({u.reviews})</em>}
              </span>
            )}
            {u.location && (
              <span className="gp-chip gp-chip-loc">
                <MdLocationOn aria-hidden="true" />
                {/* City and state split into spans so the phone styles can
                    drop the state ("Pune, Maharashtra" → "Pune" — client ask,
                    2026-09-02: one is enough on a half-width tile). One outer
                    span, because the chip is inline-flex with a 3px gap: as
                    separate flex items the gap landed before the comma
                    ("Bengaluru , Karnataka"); inside a single item it is
                    plain inline text and desktop renders exactly what it
                    always did. */}
                <span>
                  {u.location.split(",")[0]}
                  {u.location.includes(",") && (
                    <span className="gp-loc-state">
                      {u.location.slice(u.location.indexOf(","))}
                    </span>
                  )}
                </span>
              </span>
            )}
            <span className="gp-chip gp-chip-badge">
              <MdCheck aria-hidden="true" />
              UGC Approved
            </span>
          </Link>

          <div className="gp-body">
            <Link className="gp-name" href={`/university/${u.slug}`}>
              {u.name}
            </Link>

            <div className="gp-stats">
              <div>
                <span>Avg. Fee</span>
                <strong>{formatFee(u.avgFee) ?? "—"}</strong>
              </div>
              <div>
                <span>Duration</span>
                <strong>{u.duration ?? "—"}</strong>
              </div>
            </div>

            {u.courseNames.length > 0 && (
              <div className="gp-tags">
                {u.courseNames.map((c) => (
                  <span key={c} className="gp-tag" title={c}>
                    {c}
                  </span>
                ))}
                {u.courses > u.courseNames.length && (
                  <span className="gp-tag gp-tag-more">
                    +{u.courses - u.courseNames.length}
                  </span>
                )}
              </div>
            )}

            <div className="gp-actions">
              <Link className="gp-view" href={`/university/${u.slug}`}>
                View Details
              </Link>
              <StateLink
                className="gp-apply"
                href="/admission/"
                state={{ name: u.name }}
              >
                Apply Now
                <MdArrowForward aria-hidden="true" />
              </StateLink>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default OnlineUniversities;
