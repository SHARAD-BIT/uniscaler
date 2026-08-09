"use client";
import { useEffect, useRef } from "react";
import CityDeckCard from "../Utils/CityDeckCard";
import "./styles/collegeLocation.css";
import faridabadSrc from "../assets/ctk-faridabad.jpg";

const faridabad = faridabadSrc.src;
import gurugramSrc from "../assets/ctk-guru.jpg";

const gurugram = gurugramSrc.src;
import noidaSrc from "../assets/ctk-noida.jpg";

const noida = noidaSrc.src;
import delhiSrc from "../assets/ctk-delhi.webp";

const delhi = delhiSrc.src;
import dehradunSrc from "../assets/ctk-ddehradun.jpg";

const dehradun = dehradunSrc.src;
import jodhpurSrc from "../assets/ctk-jodhpur.jpeg";

const jodhpur = jodhpurSrc.src;
import puneSrc from "../assets/ctk-pune.jpg";

const pune = puneSrc.src;
import ahemdabadSrc from "../assets/ctk-ahmedabad.avif";

const ahemdabad = ahemdabadSrc.src;
import gMapSrc from "../assets/gMap.svg";

const gMap = gMapSrc.src;

/*
 * Fan geometry. These are fixed tables rather than Math.random() because the
 * markup is server-rendered first — a random tilt would differ between the
 * server HTML and the client render and blow up hydration.
 *
 * The tilt/offset ranges are taken from Shopify's own deck, which alternates
 * small positive and negative rotations and staggers Y by ~4-18px.
 */
const TILTS = [-4.5, -0.1, -3.2, 1.8, -2.4, 3.1, -1.2, 2.6];
const OFFSETS = [10, 16, 6, 14, 18, 8, 12, 4];

/*
 * Fraction of the viewport still holding cards once the deck has finished its
 * sweep. 0.2 means the right 80% of the screen has emptied out by the time the
 * section scrolls away.
 *
 * Travelling only the strip's overflow (strip width minus viewport) gave 454px
 * on a 1440px screen, which read as a drift rather than as movement. Measuring
 * against this fraction instead makes the travel a function of the whole strip
 * width — 1606px on the same screen — so the deck visibly walks across.
 *
 * Raise it toward 1 for a shorter, calmer sweep; drop it toward 0 to have the
 * deck exit the screen completely.
 */
const END_FILL = 0.2;

/*
 * Height of the scroll window the sweep is spread over, as a fraction of the
 * viewport, measured against the deck's centre.
 *
 * The first attempt spread it over the deck's whole visibility range
 * (height + viewport), which meant the finished state only arrived once the
 * section had scrolled off the top — the travel was real but nobody was looking
 * at it. Anchoring on the centre instead keeps the entire sweep inside the
 * stretch where the deck is actually on screen.
 *
 * Lower for a faster, more dramatic sweep; higher for a gentler one.
 */
const SWEEP_WINDOW = 0.9;

const CollegeLocation = () => {
  const dataForCollege = [
    {
      name: "Faridabad",
      slogan: "The City of Harmony",
      img: [faridabad],
      frame: "#003980",
    },
    {
      name: "Gurugram",
      slogan: "The City of Light",
      img: [gurugram],
      frame: "#b34700",
    },
    {
      name: "Noida",
      slogan: "The City of Creativity",
      img: [noida],
      frame: "#00695c",
    },
    {
      name: "Jaipur",
      slogan: "Top Education Hub",
      img: [jodhpur],
      frame: "#8c4d00",
    },
    {
      name: "Delhi",
      slogan: "The Heart of All",
      img: [delhi],
      frame: "#1b5e20",
    },
    {
      name: "Pune",
      slogan: "The City that Never Sleeps",
      img: [pune],
      frame: "#0277bd",
    },
    {
      name: "Dehradun",
      slogan: "Feels like Second Home",
      img: [dehradun],
      frame: "#4527a0",
    },

    {
      name: "Ahmedabad",
      slogan: "Producing the Best Talents",
      img: [ahemdabad],
      frame: "#c2185b",
    },
  ];

  const viewportRef = useRef(null);
  const stripRef = useRef(null);

  /*
   * Scroll-linked horizontal travel, the way Shopify's merchant strip works:
   * the deck is not a carousel with its own scrollbar, it is translated as a
   * function of how far the section has moved through the viewport. Scrolling
   * down walks the cards forward, scrolling up walks them back, and both ends
   * clamp so the first and last card never drift into empty space.
   */
  useEffect(() => {
    const viewport = viewportRef.current;
    const strip = stripRef.current;
    if (!viewport || !strip) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let travel = 0;
    let current = 0;
    let target = 0;

    // 100vw includes the scrollbar, which would push the page sideways. The
    // documentElement's clientWidth does not, so the full-bleed width comes
    // from JS and CSS only falls back to 100% before this runs.
    const measure = () => {
      viewport.style.setProperty(
        "--vw",
        `${document.documentElement.clientWidth}px`
      );
      travel = Math.max(
        0,
        strip.offsetWidth - viewport.clientWidth * END_FILL
      );
    };

    const progress = () => {
      const vh = window.innerHeight;
      if (vh <= 0) return 0;
      const rect = viewport.getBoundingClientRect();
      const centre = rect.top + rect.height / 2;
      // Sweep starts as the deck's centre rises past the lower band and is
      // finished by the time it reaches the upper one, so both ends land while
      // the deck is still in view.
      const from = (0.5 + SWEEP_WINDOW / 2) * vh;
      const p = (from - centre) / (SWEEP_WINDOW * vh);
      return Math.min(1, Math.max(0, p));
    };

    const tick = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.15) current = target;
      strip.style.transform = `translate3d(${-current}px, 0, 0)`;
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = progress() * travel;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const apply = () => {
      if (reduced.matches) {
        // No scroll hijacking for anyone who asked for less motion — the CSS
        // turns the deck into a plain swipeable row instead.
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        strip.style.transform = "";
        viewport.dataset.static = "true";
        window.removeEventListener("scroll", onScroll);
        return;
      }
      delete viewport.dataset.static;
      measure();
      current = target = progress() * travel;
      strip.style.transform = `translate3d(${-current}px, 0, 0)`;
      window.addEventListener("scroll", onScroll, { passive: true });
    };

    const onResize = () => {
      if (reduced.matches) return;
      measure();
      onScroll();
    };

    apply();
    window.addEventListener("resize", onResize);
    reduced.addEventListener("change", apply);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      reduced.removeEventListener("change", apply);
    };
  }, []);

  return (
    <section className="college-location">
      <div className="headP">
        <img src={gMap} alt="location" />
        <h2>Search by location</h2>
        <p>Find your Dream College in your city</p>
      </div>

      <div className="city-deck" ref={viewportRef}>
        <div
          className="city-deck__strip"
          ref={stripRef}
          style={{ "--count": dataForCollege.length }}
        >
          {dataForCollege.map((item, i) => (
            <CityDeckCard
              key={item.name}
              index={i}
              title={item.name}
              slogan={item.slogan}
              link={`/college/${item.name.toLocaleLowerCase()}`}
              image={item.img[0]}
              tilt={TILTS[i % TILTS.length]}
              dy={OFFSETS[i % OFFSETS.length]}
              frame={item.frame}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollegeLocation;
