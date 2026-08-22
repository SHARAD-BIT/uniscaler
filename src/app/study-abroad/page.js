"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { studyAbroadCountries, studyAbroadStats } from "@/lib/studyAbroadData";
import { studyAbroadDestinations } from "@/lib/studyAbroadDestinations";
import { domainPhotoCredits } from "@/lib/domainPhotoCredits";
import { supportPhotoCredits } from "@/lib/supportPhotoCredits";
import { studyAbroadTools } from "@/lib/studyAbroadTools";
import { brochureUrl } from "@/lib/brochure";
import StudyAbroadGuide from "./StudyAbroadGuide";
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
  FaCircleCheck,
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
 * checked against the catalog, which holds Management(75), MBA(30),
 * Data Science(25), ENGINEERING(25), AI & ML(18), Bachelors(17),
 * Finance & Commerce(9) and Health & Science(4).
 *
 * "With Internships" is the odd one out: there is no such category, so it
 * matches on the course title instead — 19 of the 203 courses say so.
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

/**
 * The 360° support accordion, after upgrad.com/study-abroad's. Items map onto
 * what Uniscaler actually has pages for — loans and scholarships link to their
 * own pages, the rest to counselling — and the copy makes no numeric claims:
 * the reference's "scholarships of up to 40%" is upGrad's figure, not ours.
 *
 * `key` names each item's photo: `/study-abroad/support/{key}.webp`, fetched
 * and credited by scripts/fetch-support-photos.mjs. All five are CC BY, so
 * attribution is a licence condition; it renders in the combined credits
 * line under "Globally acclaimed domains" — neither goes without the other.
 */
const SUPPORT_ITEMS = [
  {
    key: "counseling",
    title: "1:1 profile evaluation & counseling",
    copy: "Sit down with our counselors for a one-on-one evaluation of your profile, goals and budget.",
    cta: "Talk to us",
    href: "/contact",
  },
  {
    key: "scholarship",
    title: "Scholarship support",
    copy: "Guidance on scholarships offered by partner universities, to make your global education more accessible.",
    cta: "Learn more",
    href: "/scholarship",
  },
  {
    key: "ielts",
    title: "IELTS preparation",
    copy: "Get exam-ready with guidance and preparation support for IELTS and other admission tests.",
    cta: "Get guidance",
    href: "/contact",
  },
  {
    key: "loan",
    title: "Educational loan assistance",
    copy: "Hassle-free education loan options through our trusted banking partners.",
    cta: "Explore loans",
    href: "/education-loan",
  },
  {
    key: "visa",
    title: "Visa support",
    copy: "End-to-end help with your student visa application and documentation.",
    cta: "Talk to us",
    href: "/contact",
  },
];

const supportCredit = (key) => supportPhotoCredits.find((c) => c.key === key);

/**
 * The checklist in the "Meet Uniscaler experts" band, after the reference's.
 * Reworded where the reference states things that are upGrad's, not ours:
 * their "upGrad-exclusive scholarships" became the partner-university
 * scholarship guidance SUPPORT_ITEMS already claims, and their Google rating
 * (4.6, 802 reviews) and opening hours are left out entirely rather than
 * invented — the band shows the real phone number in that slot instead.
 */
const CITY_POINTS = [
  "Personalized study abroad counseling",
  "Real-time answers to your queries",
  "Guidance on partner-university scholarships",
  "One-stop support for application, loan & visa",
];

/**
 * The same embed the contact page renders — Uniscaler, Faridabad. Copied
 * rather than imported because ContactUs.jsx does not export it; an office
 * move is a change in both files.
 */
const CITY_MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1036.780674783372!2d77.3209610054497!3d28.342003822200684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1709790690975!5m2!1sen!2sin";

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
        // A guard now, not a fix: the two "Youth Leadership Program" entries
        // that named upGrad itself as the university were removed from the
        // catalog on 2026-08-21 (see the header of studyAbroadData.js — the
        // client's rule is that the name never appears anywhere). Kept
        // because the catalog came from that platform, and a re-extraction
        // could bring such entries back.
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
 * Currently: Management(75), MBA(30), Data Science(25), ENGINEERING(25),
 * AI & ML(18), Bachelors(17), Finance & Commerce(9), Health & Science(4).
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

  /**
   * Which SUPPORT_ITEMS entry is open. One is always open, as in the
   * reference — clicking a header moves the selection rather than toggling it
   * shut, so the band never collapses to a bare list of titles.
   */
  const [supportOpen, setSupportOpen] = useState(0);

  /**
   * The plan band's lead form. Same endpoint and shape as ConsultForm's
   * consultation leads; the message says which page produced it, so the two
   * kinds of lead stay tellable-apart in the same table.
   */
  const [plan, setPlan] = useState({ name: "", email: "", phone: "" });
  const [planStatus, setPlanStatus] = useState("idle");
  const submitPlan = (e) => {
    e.preventDefault();
    setPlanStatus("sending");
    fetch(process.env.NEXT_PUBLIC_API_URL + "/consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...plan,
        message: "Personalized study abroad plan request (/study-abroad)",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          setPlan({ name: "", email: "", phone: "" });
          setPlanStatus("ok");
        } else {
          setPlanStatus("error");
        }
      })
      .catch(() => setPlanStatus("error"));
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

          {/* Not optional. All nine photos — the four cards above and the
              support band's five — are CC BY, which permits the commercial
              use and the crop but requires the credit: removing this line
              means removing the images. The support five are credited here rather
              than under their own figure on the client's word (2026-08-21);
              one combined line on the page satisfies BY's "reasonable to the
              medium" attribution. Generated by scripts/fetch-domain-photos.mjs
              and scripts/fetch-support-photos.mjs respectively. */}
          <p className="sa-goal-credits">
            Photos:{" "}
            {[...domainPhotoCredits, ...supportPhotoCredits].map((c, i) => (
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

                        {/* "Download Brochure" is a lead gate, the third
                            behaviour this button has had, each on the client's
                            word: counselling → the upGrad PDF directly
                            (2026-08-18) → registration (2026-08-19). It
                            downloads nothing and routes every card to
                            /register — including the two programmes that have
                            no brochure in the catalog; the counselling
                            fallback they kept at first was removed on the
                            client's word the same day. Nothing on /register
                            knows about brochures, so do not wire syllabusUrl
                            back in here without asking.

                            The arrow opens the full pathway listing, carrying
                            this card's own domain and country as the starting
                            filters — so it lands on the twenty-odd programs
                            around the one being looked at rather than on all
                            203, or on a country page that drops the field. */}
                        <div className="sa-pathway-actions">
                          <Link
                            href="/register"
                            className="sa-pathway-cta"
                            aria-label={`Register to get the brochure for ${course.title}`}
                          >
                            Download Brochure <FaDownload />
                          </Link>
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
                      : `View all ${activePathway.name} programs`}{" "}
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

      {/* ─── Personalized plan lead band ───
          Replaced the "All Destinations" country directory on the client's
          word, after upgrad.com/study-abroad's "Secure your personalized study
          abroad plan" band: dark copy panel left, lead form right. Worth
          remembering that the directory this displaced was the page's only
          set of links to the nine country pages — the destinations map at the
          top still reaches them, so they are not orphaned, but this is now
          the only route.

          The form posts to `/consultation` — the same public endpoint, with
          the same {name, email, phone, message} shape, that ConsultForm
          already uses — so no backend change and no new wiring; the message
          field says where the lead came from. Inline status text rather than
          a snackbar so the outcome reads next to the button that caused it. */}
      <section className="sa-plan">
        <div className="sa-plan-inner">
          <div className="sa-plan-copy">
            <h2>Secure your personalized study abroad plan</h2>
            <p>
              Get comprehensive guidance on destinations, universities,
              scholarships, and funding — tailored to your career goals.
            </p>
          </div>
          <form className="sa-plan-form" onSubmit={submitPlan}>
            <p className="sa-plan-lead">
              Enter your details, and our experts will connect with you to
              guide you through the process.
            </p>
            <label htmlFor="sa-plan-name">Full Name</label>
            <input
              id="sa-plan-name"
              type="text"
              required
              value={plan.name}
              onChange={(e) => setPlan({ ...plan, name: e.target.value })}
            />
            <label htmlFor="sa-plan-email">Email Address</label>
            <input
              id="sa-plan-email"
              type="email"
              required
              value={plan.email}
              onChange={(e) => setPlan({ ...plan, email: e.target.value })}
            />
            <label htmlFor="sa-plan-phone">Phone number</label>
            <div className="sa-plan-phone">
              <span aria-hidden="true">🇮🇳 +91</span>
              <input
                id="sa-plan-phone"
                type="tel"
                required
                inputMode="numeric"
                pattern="[0-9]{10}"
                title="10-digit mobile number"
                value={plan.phone}
                onChange={(e) => setPlan({ ...plan, phone: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="sa-plan-submit"
              disabled={planStatus === "sending"}
            >
              {planStatus === "sending" ? "Sending…" : "Continue"}{" "}
              <FaChevronRight />
            </button>
            {planStatus === "ok" && (
              <p className="sa-plan-note" role="status">
                Thank you! Our experts will connect with you shortly.
              </p>
            )}
            {planStatus === "error" && (
              <p className="sa-plan-note sa-plan-err" role="status">
                Something went wrong — please try again.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* ─── 360° support system ───
          After the reference's "360° support system for upGrad learners"
          band, added below the plan band on the client's word (2026-08-21).
          SUPPORT_ITEMS at the top of this file has carried the content since
          the band was drafted. Hover moves the selection as well as click —
          also the client's word — so the handler sits on mouseEnter, where a
          touch screen never fires it and a tap still lands on onClick.

          Every item's photo renders stacked in the figure with only the
          active one visible, rather than one <img> whose src changes: a src
          swap refetches on first hover and the band flashes white for the
          round trip, where a stack has every layer already painted and the
          crossfade is just opacity. Five 27-46KB WebPs, so the whole stack
          costs less than the single JPEG it replaced. All five are CC BY —
          credited in the combined line under "Globally acclaimed domains",
          not here, on the client's word. */}
      <section className="sa-support">
        <div className="sa-support-inner">
          <h2 className="sa-support-title">
            <span className="sa-goal-accent">360° support system</span> for
            Uniscaler learners
          </h2>
          <p className="sa-support-sub">
            Applications, visas, counselling, and planning — everything in one
            place.
          </p>

          <div className="sa-support-body">
            <div className="sa-support-list">
              {SUPPORT_ITEMS.map((item, i) => (
                <div
                  key={item.title}
                  className={`sa-support-item${
                    supportOpen === i ? " is-open" : ""
                  }`}
                >
                  <h3 className="sa-support-item-title">
                    <button
                      type="button"
                      aria-expanded={supportOpen === i}
                      onClick={() => setSupportOpen(i)}
                      onMouseEnter={() => setSupportOpen(i)}
                    >
                      {item.title}
                    </button>
                  </h3>
                  {supportOpen === i && (
                    <div className="sa-support-panel">
                      <p>{item.copy}</p>
                      <Link href={item.href} className="sa-support-cta">
                        {item.cta} <FaChevronRight />
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* No caption: the credit line that sat here went, on the
                client's word (2026-08-21), into the combined credits line
                under "Globally acclaimed domains" — moved, not deleted,
                because CC BY makes attribution a licence condition. Do not
                remove these photos from that line while they render here. */}
            <figure className="sa-support-photo">
              <div className="sa-support-frame">
                {SUPPORT_ITEMS.map((item, i) => (
                  <img
                    key={item.key}
                    src={`/study-abroad/support/${item.key}.webp`}
                    alt={supportCredit(item.key)?.alt || ""}
                    style={{ objectPosition: supportCredit(item.key)?.focal }}
                    className={supportOpen === i ? "is-active" : undefined}
                    loading="lazy"
                  />
                ))}
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* ─── Meet Uniscaler experts in your city ───
          After the reference's "Meet upGrad experts in your city" band, added
          below the support band on the client's word (2026-08-21). Checklist
          and CTA left, map right with a meta row underneath. The map is the
          contact page's own embed — Uniscaler, Faridabad — and the meta row
          carries the address and phone number from that same page. What the
          reference shows there that this deliberately does not: upGrad's
          Google rating and their opening hours. See CITY_POINTS' comment. */}
      <section className="sa-city">
        <div className="sa-city-inner">
          <div className="sa-city-copy">
            <h2 className="sa-city-title">
              Meet Uniscaler Pro experts{" "}
              <span className="sa-goal-accent">in your city</span>
            </h2>
            <ul className="sa-city-list">
              {CITY_POINTS.map((point) => (
                <li key={point}>
                  <FaCircleCheck /> {point}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="sa-city-btn">
              Talk to our expert <FaChevronRight />
            </Link>
          </div>

          <div className="sa-city-map">
            <iframe
              src={CITY_MAP_EMBED}
              title="Uniscaler on Google Maps — Faridabad, Haryana"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="sa-city-meta">
              <div>
                <span className="sa-city-meta-label">
                  Your nearest Uniscaler centre
                </span>
                <span className="sa-city-meta-place">Faridabad, Haryana</span>
              </div>
              <div className="sa-city-meta-right">
                <a className="sa-city-meta-phone" href="tel:+919667956655">
                  +91 96679 56655
                </a>
                <Link href="/contact" className="sa-support-cta">
                  Book a free visit <FaChevronRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Free tools band ───
          After the reference's tools band, added below the experts band on
          the client's word (2026-08-21). Four dark cards linking to
          /study-abroad/tools/[tool], where the calculators live — the list
          and the routes come from src/lib/studyAbroadTools.js, so a fifth
          tool is one entry there plus its calculator. The reference's
          per-card usage counts are its own platform's figures, so each card
          carries a factual line about the tool instead. */}
      <section className="sa-tools">
        <div className="sa-tools-inner">
          <h2 className="sa-tools-title">
            Plan your journey with{" "}
            <span className="sa-goal-accent">free tools</span>
          </h2>
          <p className="sa-tools-sub">
            Estimate living costs, test scores and loan EMIs in minutes —
            before you apply.
          </p>

          <div className="sa-tools-grid">
            {studyAbroadTools.map((t) => (
              <Link
                key={t.slug}
                href={`/study-abroad/tools/${t.slug}`}
                className="sa-tool-card"
              >
                <span className="sa-tool-name">
                  {t.name}
                  <small>Calculator</small>
                </span>
                <FaArrowRight className="sa-tool-arrow" aria-hidden="true" />
                <span className="sa-tool-tag">{t.tag}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      {/* Learner trust band — placed directly after the free tools section. */}
      <section className="sa-learner-trust">
        <div className="sa-learner-trust-image">
          <img
            src="/study-abroad/learner-trust.webp"
            alt="Graduates celebrating at their graduation ceremony"
            loading="lazy"
          />
        </div>
        <div className="sa-learner-trust-copy">
          <h2>
            <span>3,00,000+ learners</span> have trusted us
          </h2>
          <p>Advance your career with our expert guidance &amp; global programs.</p>
          <Link href="/contact" className="sa-learner-trust-btn">
            Start your journey today <FaChevronRight />
          </Link>
        </div>
      </section>

      <StudyAbroadGuide />

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
