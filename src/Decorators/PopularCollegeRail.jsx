"use client";
import { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import Link from "@/Utils/StateLink";
import "./styles/popularCollegeRail.css";

/*
 * Popular Colleges as a pinned, scroll-driven card rail (client ask,
 * 2026-09-03, after rothfinder.com's "Benefits" section): a copy column on
 * the left — eyebrow, headline, lead, a short paragraph and the list of
 * colleges with the current one in a pill — and, beside it, the college
 * cards in a row. The section pins while you scroll and the row slides
 * left, each card passing UNDER the copy column and out; the list on the
 * left follows, and a name in the list scrolls you to its card.
 *
 * Mechanics: the section is as tall as the pinned panel plus the row's
 * travel (the last card's offset from the row's start), so one pixel of
 * scroll is one pixel of slide — the row simply moves as the page would.
 * The sticky panel's `top` is the navbar's height (CSS var, see the
 * stylesheet); the panel's progress is read from the section's position
 * on scroll (rAF-throttled) and written as a translate on the row. The
 * travel is re-measured on resize and whenever the row's size changes,
 * which covers the extra cards the parent appends after its fetch.
 *
 * Phones pin exactly like desktop (client, 2026-09-04: the page's scroll
 * must slide the cards there too), just stacked — copy and the list of
 * names above, the row below. Only prefers-reduced-motion does not pin:
 * there the panel is a plain block and the row a native horizontal
 * scroller with snap points (stylesheet), and the active card follows
 * the row's own scroll instead.
 */

// The card bodies and number badges cycle through these, the way the
// reference alternates its green and maroon panels: the site's hero navy,
// a deep green, a maroon and the strip's brighter blue.
const TONES = ["#002d66", "#0f5a3f", "#5a2532", "#1259c4"];

const collegeHref = (name) => `/college-details/${name.replace(/\s/g, "-")}`;

const PopularCollegeRail = ({ data }) => {
  const railRef = useRef(null);
  const stickyRef = useRef(null);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const stepRef = useRef(1);
  const [travel, setTravel] = useState(0);
  const [active, setActive] = useState(0);

  // Measure: how far the row must slide (last card parked at the row's
  // start) and the card pitch for the active-index maths; size the section
  // to the panel plus that travel.
  useEffect(() => {
    const rail = railRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!rail || !sticky || !track) return undefined;
    const measure = () => {
      const cards = track.querySelectorAll(".pc-card");
      if (!cards.length) {
        setTravel(0);
        rail.style.height = "";
        return;
      }
      const last = cards[cards.length - 1];
      const step =
        cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : last.offsetWidth;
      stepRef.current = step || 1;
      // Reduced motion only: no pinning — the row is a native horizontal
      // scroller (stylesheet) and the swipe effect below drives the active
      // card. `travel` 0 is what switches the two modes. Phones pin like
      // desktop: a swipe-rail pass for them (2026-09-04, morning) was
      // reverted the same day on the client's word — scrolling the page
      // has to slide the cards there too, "same as the laptop".
      const swipe = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (swipe) {
        setTravel(0);
        rail.style.height = "";
        track.style.transform = "";
        return;
      }
      const t = last.offsetLeft;
      setTravel(t);
      rail.style.height = `${sticky.offsetHeight + t}px`;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(sticky);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [data.length]);

  // Scroll → slide. Progress is 0 when the section's top reaches the
  // panel's sticky `top` (the moment it pins) and 1 when the section's
  // bottom reaches the panel's bottom (the moment it releases).
  useEffect(() => {
    const rail = railRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!rail || !sticky || !track) return undefined;
    if (!travel) {
      track.style.transform = "";
      return undefined;
    }
    let raf = 0;
    const apply = () => {
      raf = 0;
      const railTop = rail.getBoundingClientRect().top + window.scrollY;
      const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
      const p = Math.min(Math.max((window.scrollY + stickyTop - railTop) / travel, 0), 1);
      const shift = p * travel;
      track.style.transform = `translate3d(${-shift}px, 0, 0)`;
      // ceil, not round: the active card is the one still fully in view —
      // approaching the row's start, or exactly on it — and the next takes
      // over the moment it passes the start and begins sliding under the
      // copy. With round, each card stayed active for half a pitch after
      // passing the start, so its open drawer was half hidden (client's
      // frame, 2026-09-03). The small epsilon keeps a card that a list
      // click parked exactly on the start from flipping to the next on
      // floating-point noise.
      // …on a wide stage. A phone shows barely more than one card, so the
      // "approaching" card is the one cut off at the right edge; there the
      // card showing MOST of itself is the active one. Card k+1 overtakes
      // card k in visible width when the row has slid
      //   k·step + (cardW − stageW + 2·pad + step) / 2
      // (pad = the row's left padding), so the crossover sits at fraction
      // f of a pitch rather than at the half — measured live, since the
      // card, stage and padding all change with the viewport.
      const stage = stageRef.current;
      const step = stepRef.current;
      const first = track.querySelector(".pc-card");
      const wide = stage && stage.clientWidth >= 2 * step;
      let idx;
      if (wide || !stage || !first) {
        idx = Math.ceil(shift / step - 0.02);
      } else {
        const f = (first.offsetWidth - stage.clientWidth + 2 * first.offsetLeft + step) / (2 * step);
        idx = Math.round(shift / step + 0.5 - f);
      }
      setActive(Math.max(0, Math.min(idx, data.length - 1)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [travel, data.length]);

  // Swipe mode (phones, reduced motion): the row scrolls itself, so the
  // active card — the one whose drawer is open — follows the row's own
  // scroll position, snapped card by card, instead of the page's.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || travel) return undefined;
    let raf = 0;
    const apply = () => {
      raf = 0;
      setActive(
        Math.max(0, Math.min(Math.round(stage.scrollLeft / stepRef.current), data.length - 1))
      );
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    stage.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      stage.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [travel, data.length]);

  const jump = (i) => {
    const rail = railRef.current;
    const sticky = stickyRef.current;
    if (!rail || !sticky) return;
    if (!travel) {
      stageRef.current?.scrollTo({ left: i * stepRef.current, behavior: "smooth" });
      return;
    }
    const railTop = rail.getBoundingClientRect().top + window.scrollY;
    const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
    window.scrollTo({ top: railTop - stickyTop + i * stepRef.current, behavior: "smooth" });
  };

  return (
    <section className="pc-rail" ref={railRef} aria-labelledby="pc-title">
      <div className="pc-sticky" ref={stickyRef}>
        <div className="pc-copy">
          <span className="pc-eyebrow">Popular Colleges</span>
          <h2 className="pc-title" id="pc-title">
            Colleges students explore first.
          </h2>
          {/* The rotating line the section had before the rail, kept as its
              lead. */}
          <TypeAnimation
            sequence={[
              "Where Tradition Meets Innovation",
              500,
              "Discover Your Potential",
              500,
              "Empowering Future Leaders",
              500,
              "Building Brighter Futures Together",
              500,
              "Explore, Learn, Grow",
              500,
              "Transforming Lives, Impacting Communities",
              500,
            ]}
            wrapper="p"
            className="pc-lead"
            speed={50}
            repeat={Infinity}
          />
          <p className="pc-body">
            Each card opens the college&apos;s full profile — courses, fees and
            admission details. Scroll to move through the list, or pick a name.
          </p>
          <ol className="pc-list">
            {data.map((item, i) => (
              <li key={item.id || item.name} className={i === active ? "is-active" : ""}>
                <button type="button" onClick={() => jump(i)}>
                  {item.label || item.name}
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="pc-stage" ref={stageRef}>
          <div className="pc-track" ref={trackRef}>
            {data.map((item, i) => (
              <Link
                href={collegeHref(item.name)}
                state={item}
                key={item.id || item.name}
                className={`pc-card${i === active ? " is-active" : ""}`}
                style={{ "--pc-tone": TONES[i % TONES.length] }}
              >
                <div className="pc-card-media">
                  <span className="pc-card-no">{String(i + 1).padStart(2, "0")}.</span>
                  <img src={item.img} alt={item.label || item.name} loading="lazy" />
                </div>
                <div className="pc-card-body">
                  {/* `label` is the display name where the database name (which
                      the college page is matched on, and the link is built
                      from) is not fit to show — see PopularCollege.jsx. */}
                  <h3>{item.label || item.name}</h3>
                  <p>{item.location}</p>
                  {/* The drawer: a line or two about the college, open only on
                      the card in view — the reference's active card is the
                      one with its description showing. The open/closed
                      height is a CSS grid-row transition (stylesheet). */}
                  {item.blurb ? (
                    <div className="pc-card-drawer" aria-hidden={i !== active}>
                      <div>
                        <p className="pc-card-blurb">{item.blurb}</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularCollegeRail;
