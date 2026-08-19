"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { studyAbroadCountries, studyAbroadStats } from "@/lib/studyAbroadData";
import { studyAbroadDestinations } from "@/lib/studyAbroadDestinations";
import { domainPhotoCredits } from "@/lib/domainPhotoCredits";
import { brochureUrl } from "@/lib/brochure";
import {
  FaArrowRight,
  FaChevronRight,
  FaChevronLeft,
  FaChartLine,
  FaMicroscope,
  FaBookOpen,
  FaBriefcase,
  FaXmark,
  FaPlaneUp,
  FaDownload,
} from "react-icons/fa6";
import "./study-abroad.css";

/** India — where the journey starts. Not a destination, so not in the data. */
const HOME_PIN = { x: 68.96, y: 36.14 };

const pinAt = ({ x, y }) => ({ left: `${x}%`, top: `${y}%` });

const photoCredit = (key) => domainPhotoCredits.find((c) => c.key === key);

/**
 * A quadratic curve from India to a destination, bowed towards the top of the
 * map. The control point is lifted by a fraction of the span rather than a fixed
 * amount, so a short hop (India → Finland) stays a gentle arc while a long one
 * (India → Canada) bows proportionally more, the way a great-circle route drawn
 * on a flat map does.
 */
function arcFromHome({ x, y }) {
  const midX = (HOME_PIN.x + x) / 2;
  const midY = (HOME_PIN.y + y) / 2;
  const span = Math.hypot(x - HOME_PIN.x, y - HOME_PIN.y);
  return `M${HOME_PIN.x} ${HOME_PIN.y} Q${midX} ${midY - span * 0.28} ${x} ${y}`;
}

/**
 * Destinations and catalog countries are two different lists: Ireland is offered
 * as a destination but has no programs, so `/study-abroad/ireland` would 404.
 */
const hasCountryPage = (slug) =>
  studyAbroadCountries.some((c) => c.slug === slug);

/**
 * The four split cards in the "smartest way" band. `tone` selects a colour from
 * the four defined on `[data-tone]` in study-abroad.css — a name rather than a
 * hex here so the palette stays in the stylesheet with the rest of the design.
 *
 * The figures are marketing claims, not derived from `studyAbroadData`. The
 * asterisk on ₹50 Lac is deliberate and belongs with whatever disclaimer the
 * client uses elsewhere for it.
 */
const SMART_HIGHLIGHTS = [
  {
    stat: "1:18",
    tone: "green",
    copy: "Term 1 credits accepted at 18 global universities.",
  },
  {
    stat: "No",
    tone: "gold",
    copy: "GRE/GMAT not required. EPT waivers are available.",
  },
  {
    stat: "12/12",
    tone: "amber",
    copy: "Intakes every month. Start your journey anytime.",
  },
  {
    stat: "₹50 Lac*",
    tone: "coral",
    copy: "Savings on tuition and living expenses.",
  },
];

/**
 * The hero collage, right column. Hardcoded rather than derived from
 * `studyAbroadCountries`: the shapes are placed to compose as a picture, so both
 * the order and the shape each flag gets are layout decisions, not data.
 *
 * Exactly six cells, filling a 3x2 grid with nothing left over. Seven items
 * wrapped the arrow onto a third row on its own, which read as a stray graphic
 * rather than part of the block. The arrow sits third so it lands top-right,
 * where the reference design puts it.
 */
/**
 * The four cards in "Globally acclaimed domains". Titles and taglines are read
 * from upgrad.com/study-abroad; where each one *points* is ours, because their
 * cards link into their own filtered listing with a base64 filter payload that
 * means nothing here.
 *
 * Each card therefore maps onto real categories in `studyAbroadData.js` —
 * checked against the catalog, which holds Management(76), MBA(30),
 * Data Science(25), ENGINEERING(25), AI & ML(19), Bachelors(17),
 * Finance & Commerce(9) and Health & Science(4).
 *
 * "With Internships" is the odd one out: there is no such category, so it
 * matches on the course title instead — 19 of the 205 courses say so.
 */
/**
 * The rotating hero headline, one line every 2s, styled after
 * upgrad.com's "For Your Every Next / Opportunity".
 *
 * Each of the client's four lines is split in two because that split *is* the
 * reference's style: a red roman line with an italic near-black one beneath it.
 * Rendered as one line each, they would be the same words in none of the look.
 * The break points are the natural ones in each sentence — change them here,
 * they are not derived from anything.
 */
const HERO_LINES = [
  { lead: "Scale Without", tail: "Limits." },
  { lead: "One Platform.", tail: "Infinite Scale." },
  { lead: "Smart Scaling for", tail: "Growing Businesses." },
  { lead: "Uniscaler:", tail: "Seamless Growth, Simplified." },
];

const GOAL_DOMAINS = [
  {
    key: "management",
    Icon: FaChartLine,
    title: "Management Courses",
    tagline: "A-Z of Business, Hospitality, Fashion",
    categories: ["Management", "MBA", "Finance & Commerce"],
  },
  {
    key: "stem",
    Icon: FaMicroscope,
    title: "STEM Courses",
    tagline: "Science, Technology, Engg & Math",
    categories: ["ENGINEERING", "Data Science", "AI & ML", "Health & Science"],
  },
  {
    key: "undergraduate",
    Icon: FaBookOpen,
    title: "Undergraduate Courses",
    tagline: "Bachelor's in Arts, Business & STEM",
    categories: ["Bachelors"],
  },
  {
    key: "internships",
    Icon: FaBriefcase,
    title: "With Internships",
    tagline: "Co-ops & Curricular Internships",
    match: /\b(intern|co-?op)/i,
  },
];

/**
 * Every distinct university in the catalog that has a logo, split into the two
 * rows of the partner wall.
 *
 * Derived rather than hand-listed: the same 62 institutions are already named
 * and logo'd on the program cards further down this page, so a fixed list here
 * would be a second copy to keep in step, and would quietly go stale the moment
 * a program is added. `Map` keyed on the trimmed name does the de-duplication —
 * a university appears once however many of its programs are in the catalog.
 *
 * Split by index parity rather than down the middle: the rows then differ by at
 * most one logo whatever the total is, so the fixed scroll duration in the CSS
 * gives them near-enough the same speed — 3% apart at 31 logos against 30 —
 * instead of one visibly outrunning the other. It also interleaves them, so two
 * lockups sharing an Indian partner institute do not end up stacked.
 */
const PARTNER_ROWS = (() => {
  const seen = new Map();
  for (const country of studyAbroadCountries)
    for (const category of country.categories || [])
      for (const course of category.courses || []) {
        const name = course.university?.trim();
        // Two "Youth Leadership Program" entries name upGrad itself as the
        // university, and their logo file is upGrad's own square mark. The
        // catalog was extracted from that platform (see the header of
        // studyAbroadData.js), so this is the source showing through — and a
        // wall of partner logos is the one place it cannot be left in, because
        // it would put a competitor's mark among Uniscaler's partners.
        if (!name || !course.logo || /upgrad/i.test(name)) continue;
        if (!seen.has(name)) seen.set(name, { name, logo: course.logo });
      }
  const all = [...seen.values()];
  return [
    all.filter((_, i) => i % 2 === 0),
    all.filter((_, i) => i % 2 === 1),
  ];
})();

/**
 * The catalog regrouped by field of study instead of by country.
 *
 * The data nests country → category → courses, so the same category exists nine
 * times over with a slice of its courses in each. The pathway band is a tab per
 * field showing programs from everywhere, which is the opposite axis — hence
 * this flattening, with the country carried down onto each course because the
 * card still names where it is studied.
 *
 * Ordered by how many programs each field holds rather than by a hand-written
 * list, so the busiest tab opens first and a new category appears on its own.
 * Currently: Management(76), MBA(30), Data Science(25), ENGINEERING(25),
 * AI & ML(19), Bachelors(17), Finance & Commerce(9), Health & Science(4).
 */
const PATHWAY_FIELDS = (() => {
  const byField = new Map();
  for (const country of studyAbroadCountries)
    for (const category of country.categories || [])
      for (const course of category.courses || []) {
        if (!byField.has(category.name)) byField.set(category.name, []);
        byField.get(category.name).push({
          ...course,
          country: country.name,
          countrySlug: country.slug,
          flag: country.flag,
          // After the spread, so it replaces the raw catalog value rather than
          // sitting beside it. Cleaned here for the same reason as in
          // `pathwayPrograms.js` — a card should never hold a brochure URL it
          // cannot open.
          syllabusUrl: brochureUrl(course.syllabusUrl),
        });
      }
  return [...byField]
    .map(([name, courses]) => ({ name, courses }))
    .sort((a, b) => b.courses.length - a.courses.length);
})();

const PATHWAY_TOTAL = PATHWAY_FIELDS.reduce((n, f) => n + f.courses.length, 0);

export default function StudyAbroadPage() {
  // Null rather than a category name: it means "not chosen yet", and the
  // resolution below then falls to whichever field is largest. Setting a name
  // here would break the moment a domain card filtered that field away.
  const [activeField, setActiveField] = useState(null);
  const [activeDest, setActiveDest] = useState(0);
  const [focus, setFocus] = useState(null);
  // The pathway band shows four cards; this opens it out into the full list
  // for the current field. Reset whenever the field changes.
  const [showAllPathways, setShowAllPathways] = useState(false);

  /**
   * The hero video mounts only where it is worth its 3.7MB — 901px and up — and
   * never for a visitor who has asked for reduced motion. Everyone else gets
   * `hero-poster.webp` instead, painted as the section's background in CSS, so
   * the band looks the same either way; only the motion is missing.
   *
   * Gated in JS rather than with a CSS media query because `display: none` on a
   * <video> does not stop the download; the file would still be fetched on
   * every phone. Starts false so the server-rendered markup and the first
   * client paint agree — the poster shows for that frame either way.
   */
  const [heroVideo, setHeroVideo] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 901px) and (prefers-reduced-motion: no-preference)"
    );
    const sync = () => setHeroVideo(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /**
   * The hero headline advances every 2s, as asked. Unconditional — it runs for
   * reduced-motion visitors too, who get the same words on the same beat with
   * the crossfade turned off in CSS. Reduced motion is a request about
   * movement, not about being shown less of the copy.
   */
  const [heroLine, setHeroLine] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setHeroLine((i) => (i + 1) % HERO_LINES.length),
      2000
    );
    return () => clearInterval(id);
  }, []);

  /**
   * A domain card filters the catalog below and scrolls to it. Deliberately not
   * a link with a query string: the band is on this same page, so routing would
   * reload it to change a filter — and `useSearchParams` in a client page needs
   * a Suspense boundary to build, which is a lot of machinery for a value that
   * never has to survive a navigation.
   */
  const focusOnDomain = (key) => {
    setFocus(key);
    setActiveField(null);
    setShowAllPathways(false);
    document
      .getElementById("sa-explorer")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const destinations = studyAbroadDestinations;
  const active = destinations[activeDest];
  // Wraps in both directions, so neither arrow is ever a dead control.
  const stepDestination = (by) =>
    setActiveDest(
      (i) => (i + by + destinations.length) % destinations.length
    );

  // A domain card narrows the catalog before the field tabs do, so the tabs
  // show only what is left rather than offering filters that would empty the
  // row. `focus` is null until one of the cards is clicked.
  const focused = GOAL_DOMAINS.find((d) => d.key === focus) || null;

  const pathwayFields = (() => {
    if (!focused) return PATHWAY_FIELDS;
    if (focused.categories)
      return PATHWAY_FIELDS.filter((f) => focused.categories.includes(f.name));
    // "With Internships" has no category of its own — it is a property of the
    // course title, so the fields survive but their course lists are cut down,
    // and any field left with nothing drops out.
    return PATHWAY_FIELDS.map((f) => ({
      ...f,
      courses: f.courses.filter((c) => focused.match.test(c.title || "")),
    })).filter((f) => f.courses.length > 0);
  })();

  /**
   * Resolved rather than stored, so a field that disappears under a domain
   * filter cannot leave the band pointing at nothing. An effect syncing state
   * would render the empty frame first and correct it after.
   */
  const activePathway =
    pathwayFields.find((f) => f.name === activeField) || pathwayFields[0] || null;

  const chooseField = (name) => {
    setActiveField(name);
    setShowAllPathways(false);
  };

  return (
    <main className="sa-page">
      {/* ─── Hero ─── */}
      {/* The band is the footage plus the rotating headline over it, nothing
          else — the old heading, its paragraph, the Book 1:1 Counseling button
          and the flag collage are all gone. The poster still paints underneath
          from CSS, which is what phones and reduced-motion visitors get in
          place of the video.

          No longer `aria-hidden`: it was, correctly, while the band held only
          decorative footage. It now carries the page's only <h1>, which the
          page has been without since that heading was removed.

          The full-band white scrim was taken off earlier today at the client's
          instruction. The halo behind this headline is not that scrim coming
          back — see the note on `.sa-hero-headline` in study-abroad.css for
          what the footage measures at and why text needs something. */}
      <section className="sa-hero">
        {heroVideo && (
          <video
            className="sa-hero-video"
            src="/study-abroad/hero.mp4"
            poster="/study-abroad/hero-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            tabIndex={-1}
            aria-hidden="true"
          />
        )}
        <h1 className="sa-hero-headline">
          {/* Read once, in full, instead of the visible copy — which a screen
              reader would otherwise re-announce every two seconds. */}
          <span className="sa-sr-only">
            Uniscaler — scale without limits. One platform, infinite scale.
            Smart scaling for growing businesses: seamless growth, simplified.
          </span>
          {/* `key` is what replays the crossfade. Re-applying an animation
              class to the same element does not restart a running animation;
              a changing key remounts the span, and a fresh element always
              starts from zero — the same reasoning as `dotsSwap` in
              navbar.css. */}
          <span key={heroLine} className="sa-hero-rotator" aria-hidden="true">
            <span className="sa-hero-lead">{HERO_LINES[heroLine].lead}</span>
            <span className="sa-hero-tail">{HERO_LINES[heroLine].tail}</span>
          </span>
        </h1>
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

      {/* ─── "The smartest way" — dark highlight band ─── */}
      <section className="sa-smart">
        <div className="sa-smart-inner">
          <div className="sa-smart-text">
            <h2 className="sa-smart-title">
              The <span className="sa-smart-accent">smartest</span> way to study
              abroad
            </h2>
            <p className="sa-smart-sub">
              Most students take a traditional path but what if you can earn the
              same degree, only faster &amp; more flexibly?
            </p>
            <div className="sa-smart-ctas">
              <Link href="/contact" className="sa-smart-btn">
                Talk to our counselor <FaChevronRight />
              </Link>
              {/* Same-page anchor rather than a route. It jumps to the explorer,
                  which is no longer the next section — the map sits between them
                  since this band moved above it — so the anchor is now doing
                  real work rather than scrolling one screen. */}
              <a href="#sa-explorer" className="sa-smart-link">
                Explore courses <FaChevronRight />
              </a>
            </div>
          </div>

          <div className="sa-smart-grid">
            {SMART_HIGHLIGHTS.map(({ stat, copy, tone }) => (
              <div key={stat} className="sa-smart-card" data-tone={tone}>
                <div className="sa-smart-card-stat">{stat}</div>
                <div className="sa-smart-card-copy">{copy}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── One path, multiple destinations ─── */}
      <section className="sa-dest">
        <div className="sa-dest-inner">
          <h2 className="sa-dest-title">
            One path, <span className="sa-dest-accent">multiple destinations</span>
          </h2>
          <p className="sa-dest-sub">
            Start online in India and flexibly choose your university or switch
            your country for on-campus graduation.
          </p>

          <div className="sa-dest-body">
            <div className="sa-dest-map">
              <img
                src="/study-abroad/world-map.svg"
                alt=""
                loading="lazy"
                aria-hidden="true"
              />
              {/* The arcs are what make the heading literal — one origin, eight
                  destinations. `preserveAspectRatio="none"` with a 0-100 box
                  means the coordinates are the same percentages the pins use, so
                  the two overlays can never drift apart; the cost is that the
                  curves stretch with the container, which for a dotted
                  decoration is not a cost at all. */}
              <svg
                className="sa-dest-arcs"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {destinations.map((d) =>
                  d.pin ? <path key={d.slug} d={arcFromHome(d.pin)} /> : null
                )}
              </svg>

              {/* Pins are absolutely placed over the map by percentage, so they
                  stay put at any width — see scripts/map-pins.json. India is
                  marked differently: it is where the journey starts, not a
                  destination. */}
              <span className="sa-dest-pin sa-dest-pin-home" style={pinAt(HOME_PIN)} />
              {destinations.map((d) =>
                d.pin ? (
                  <span
                    key={d.slug}
                    className={`sa-dest-pin${
                      d.slug === active.slug ? " is-active" : ""
                    }`}
                    style={pinAt(d.pin)}
                    title={d.name}
                  />
                ) : null
              )}
            </div>

            <div className="sa-dest-card">
              <div className="sa-dest-card-top" data-iso={active.iso}>
                {active.photo ? (
                  <img src={active.photo} alt="" loading="lazy" />
                ) : (
                  <img
                    className="sa-dest-card-flag"
                    src={`/study-abroad/flags/${active.slug}.svg`}
                    alt=""
                    loading="lazy"
                  />
                )}
                {active.topChoice && (
                  <span className="sa-dest-badge">★ Top Choice</span>
                )}
              </div>

              <div className="sa-dest-card-body">
                <h3 className="sa-dest-card-name">
                  {active.name}
                  <img src={`/study-abroad/flags/${active.slug}.svg`} alt="" />
                </h3>
                <p className="sa-dest-card-line">{active.courses}</p>
                <p className="sa-dest-card-line">{active.highlight}</p>

                <div className="sa-dest-card-ctas">
                  <Link href="/contact" className="sa-dest-card-btn">
                    Country guide
                  </Link>
                  {/* Ireland is a destination but has no programs in the
                      catalog, so it has no country page to send anyone to. */}
                  <Link
                    href={
                      hasCountryPage(active.slug)
                        ? `/study-abroad/${active.slug}`
                        : "/contact"
                    }
                    className="sa-dest-card-link"
                  >
                    Explore <FaChevronRight />
                  </Link>
                </div>
              </div>

              <div className="sa-dest-nav">
                <button
                  type="button"
                  onClick={() => stepDestination(-1)}
                  aria-label="Previous destination"
                >
                  <FaChevronLeft />
                </button>
                <div className="sa-dest-track" role="presentation">
                  <span
                    style={{
                      width: `${100 / destinations.length}%`,
                      marginLeft: `${(activeDest * 100) / destinations.length}%`,
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => stepDestination(1)}
                  aria-label="Next destination"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Globally acclaimed domains ─── */}
      <section className="sa-goal">
        <div className="sa-goal-inner">
          <h2 className="sa-goal-title">
            <span className="sa-goal-accent">Globally acclaimed</span> domains for
            a thriving career
          </h2>
          <p className="sa-goal-sub">
            Take charge of your future — find the study abroad course that brings
            you closer to your career goals.
          </p>

          <div className="sa-goal-grid">
            {GOAL_DOMAINS.map(({ key, Icon, title, tagline }) => (
              /* A button, not a link: this filters the catalog further down the
                 same page rather than navigating anywhere. */
              <button
                key={key}
                type="button"
                className={`sa-goal-card${focus === key ? " is-active" : ""}`}
                onClick={() => focusOnDomain(key)}
              >
                <span className="sa-goal-card-art">
                  <img
                    src={`/study-abroad/domains/${key}.webp`}
                    alt={photoCredit(key)?.alt || ""}
                    /* Per-photo, because none of these were shot for a 16:11
                       crop — see `focal` in scripts/fetch-domain-photos.mjs. */
                    style={{ objectPosition: photoCredit(key)?.focal }}
                    loading="lazy"
                  />
                </span>
                <span className="sa-goal-card-body">
                  <span className="sa-goal-card-icon">
                    <Icon />
                  </span>
                  <span className="sa-goal-card-title">{title}</span>
                  <span className="sa-goal-card-tagline">{tagline}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Not optional. All four photos are CC BY, which permits the
              commercial use and the crop but requires the credit — removing
              this line means removing the images. Generated alongside them by
              scripts/fetch-domain-photos.mjs. */}
          <p className="sa-goal-credits">
            Photos:{" "}
            {domainPhotoCredits.map((c, i) => (
              <span key={c.key}>
                {i > 0 && " · "}
                <a href={c.source} target="_blank" rel="noopener noreferrer">
                  {c.title}
                </a>{" "}
                by {c.creator} (
                <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer">
                  {c.license}
                </a>
                )
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ─── University partners ─── */}
      <section className="sa-partners">
        <div className="sa-partners-inner">
          {/* Copy first in the DOM, wall second, and grid-template-areas puts
              the wall on the left at desktop widths. The headline is what the
              section is saying and the logos are the evidence for it, so that
              is the order to read them in — and the only focusable thing here
              is the button, so the visual swap costs nothing in tab order. */}
          <div className="sa-partners-copy">
            <h2 className="sa-partners-title">
              <span className="sa-goal-accent">300+ global university</span>{" "}
              partners for your study abroad journey
            </h2>
            {/* Same destination as the domain cards above: the courses are on
                this page, so this scrolls rather than navigates. */}
            <button
              type="button"
              className="sa-btn-primary"
              onClick={() =>
                document
                  .getElementById("sa-explorer")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              Explore courses <FaChevronRight />
            </button>
          </div>

          <div className="sa-partners-wall">
            {PARTNER_ROWS.map((row, i) => (
              <div className="sa-partners-row" key={i}>
                {/* Two copies of the row. The track slides exactly one copy
                    left and restarts, which is what makes the loop seamless —
                    see the 50% in `saPartnerScroll`. The second copy is the
                    same logos again, so it is hidden from screen readers and
                    every name is still announced exactly once. */}
                <div className="sa-partners-track">
                  {row.map((u) => (
                    <span className="sa-partner-logo" key={u.name}>
                      <img src={u.logo} alt={u.name} loading="lazy" />
                    </span>
                  ))}
                  {row.map((u) => (
                    <span
                      className="sa-partner-logo"
                      key={`${u.name}-copy`}
                      aria-hidden="true"
                    >
                      <img src={u.logo} alt="" loading="lazy" />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Top Pathway Programs ───
          Replaces "Explore Programs by Country", which sliced the catalog by
          destination and made the field of study a secondary filter. Countries
          have not gone anywhere — "All Destinations" below is the directory,
          and every card here still says where it is studied and links to that
          country's page. Keeps the id: three other places on this page scroll
          to it. */}
      <section className="sa-pathways" id="sa-explorer">
        <div className="sa-explorer-inner">
          <h2 className="sa-pathways-title">
            <span className="sa-goal-accent">Top Pathway Programs</span> designed
            for your success
          </h2>
          <p className="sa-pathways-sub">
            Explore globally coveted programs built around the career you want —{" "}
            {PATHWAY_TOTAL} across {studyAbroadCountries.length} countries.
          </p>

          {/* Says why the list is shorter than it was, and gives back the way
              out. Without it a domain card silently hides most of the catalog
              and the field counts stop matching what is shown. */}
          {focused && (
            <button
              type="button"
              className="sa-goal-chip"
              onClick={() => {
                setFocus(null);
                setActiveField(null);
                setShowAllPathways(false);
              }}
            >
              Showing {focused.title} <FaXmark />
            </button>
          )}

          {activePathway ? (
            <>
              {/* Tabs and arrows share a row. The arrows were floated off the
                  deck's left and right edges first, which only works while the
                  window is wider than the 1300px content column plus room for
                  them — at 1440 they already sat 19px over the first and last
                  card. Up here they cannot collide with anything. */}
              <div className="sa-pathway-head">
                <div className="sa-pathway-tabs" role="tablist">
                  {pathwayFields.map((field) => (
                    <button
                      key={field.name}
                      type="button"
                      role="tab"
                      aria-selected={field.name === activePathway.name}
                      className={`sa-pathway-tab${
                        field.name === activePathway.name ? " is-active" : ""
                      }`}
                      onClick={() => chooseField(field.name)}
                    >
                      {field.name}
                    </button>
                  ))}
                </div>

              </div>

              <div className="sa-pathway-deck">
                {/* Collapsed, only the first four render — the row used to be a
                    scroll-snapping track through all of them, and the scroller
                    went on the client's word. Slicing rather than hiding: with
                    Management at 76 programs, rendering everything to show four
                    would be 72 cards of hidden work on every tab change. The
                    same grid holds in both states; expanding just renders the
                    rest into it, so the first four never remount. */}
                <div className="sa-pathway-track">
                  {(showAllPathways
                    ? activePathway.courses
                    : activePathway.courses.slice(0, 4)
                  ).map((course) => (
                    <article className="sa-pathway-card" key={course.id}>
                      {/* Its own row above the rule, as in the reference. The
                          plane rather than the flag here, because the flag has
                          a job of its own beside the university name below and
                          the same one twice in a 400px card reads as a mistake. */}
                      <div className="sa-pathway-card-head">
                        <span className="sa-pathway-where">
                          <FaPlaneUp />
                          Study in {course.country}
                        </span>
                      </div>

                      <div className="sa-pathway-card-body">
                        <span className="sa-pathway-logo">
                          <img
                            src={course.logo}
                            alt={course.university}
                            loading="lazy"
                          />
                        </span>

                        <span className="sa-pathway-uni">
                          <img src={course.flag} alt="" />
                          <span>{course.university}</span>
                        </span>
                        <h3 className="sa-pathway-name">{course.title}</h3>

                        {/* "Download Brochure", matching the reference, on the
                            client's decision of 2026-08-18 after the trade-off
                            was put to them. It was "Talk to a Counsellor"
                            before, because every one of the 203 `syllabusUrl`s
                            in the catalog is on upGrad's own S3 bucket or CDN —
                            so this hands a visitor a competitor-branded PDF
                            from a host we do not control, leaks the referrer
                            there, and breaks whenever that bucket is rotated.
                            The client weighed that and chose the exact upGrad
                            behaviour. Do not "fix" it back without asking.

                            A plain <a>, not next/link: the target is external,
                            so there is no route to prefetch. No `download`
                            attribute either — browsers ignore it cross-origin,
                            so it would promise a save and deliver a tab. The
                            PDF opens in a new tab instead, which is what
                            actually happens.

                            Two of the 205 programs carry no brochure at all
                            (DePaul's MBA, Northeastern's MS in Data Analytics
                            Engineering). They keep the counselling link rather
                            than showing a button that downloads nothing.

                            The arrow opens the full pathway listing, carrying
                            this card's own domain and country as the starting
                            filters — so it lands on the twenty-odd programs
                            around the one being looked at rather than on all
                            203, or on a country page that drops the field. */}
                        <div className="sa-pathway-actions">
                          {course.syllabusUrl ? (
                            <a
                              href={course.syllabusUrl}
                              className="sa-pathway-cta"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Download the brochure for ${course.title}`}
                            >
                              Download Brochure <FaDownload />
                            </a>
                          ) : (
                            <Link href="/contact" className="sa-pathway-cta">
                              Talk to a Counsellor
                            </Link>
                          )}
                          <Link
                            href={`/study-abroad/pathway-programs?domain=${encodeURIComponent(
                              activePathway.name
                            )}&country=${encodeURIComponent(course.country)}`}
                            className="sa-pathway-go"
                            aria-label={`See ${activePathway.name} programs in ${course.country}`}
                          >
                            <FaArrowRight />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* > 4, not > 3: four now show, and Health & Science holds
                  exactly four — a "View all 4" button under all four would
                  expand into nothing. */}
              {activePathway.courses.length > 4 && (
                <div className="sa-pathway-more">
                  <button
                    type="button"
                    className="sa-pathway-viewall"
                    onClick={() => setShowAllPathways((v) => !v)}
                  >
                    {showAllPathways
                      ? "Show fewer"
                      : `View all ${activePathway.courses.length} ${activePathway.name} programs`}{" "}
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="sa-empty">No programs available for this selection.</div>
          )}
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
