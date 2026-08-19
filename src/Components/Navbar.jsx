"use client";
import { FaArrowLeft, FaChevronDown } from "react-icons/fa6";
import Link from "@/Utils/StateLink";

import Logo from "./Logo";
import MenuBtn from "../Utils/MenuBtn";
import StudyAbroadMegaMenu from "./StudyAbroadMegaMenu";
import "./styles/navbar.css";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getStoredUser } from "../Helper/Helper";
import { AllCourse, onlineCourseDetails } from "../Helper/Helper";
// The app-switcher's six react-icons glyphs (FaGift, BsStars, FaLaptopCode,
// FaGlobe, FaWpforms, FaHeadset) are gone — the bar now uses the supplied
// artwork in `public/nav-icons/`. Both react-icons packages went with them;
// nothing else in this file imported from `react-icons/fa` or `/bs`.
import "./styles/aiass.css";

/**
 * Toggle glyph for the app-switcher bar: a full 3x3 grid of dots (the classic
 * square app-grid), filled out from the earlier "U" arrangement.
 */
const UDots = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    {[4.5, 12, 19.5]
      .flatMap((cy) => [4.5, 12, 19.5].map((cx) => [cx, cy]))
      .map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.3" />
      ))}
  </svg>
);

const Navbar = () => {
  // Read from an effect, not in the initial state: this component is
  // server-rendered too, where localStorage does not exist.
  const [username, setUsername] = useState(null);
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(false);
  const [studyAbroadOpen, setStudyAbroadOpen] = useState(false);
  const [linkData, setLinkData] = useState(AllCourse[0].name);
  useEffect(() => {
    setUsername(getStoredUser()?.name || null);
  }, []);

  // Layer 1 — the collapsible Adobe-style app switcher. Its items are simple
  // shortcuts. "Online Courses" carries a default nav-state so the destination
  // page renders instead of bouncing to "/" (it redirects when opened cold).
  // Every item now carries `img` rather than `Icon`: the client-supplied
  // artwork in `public/nav-icons/` replaced the react-icons glyphs. All six are
  // PNGs — the badge SVGs that arrived first were swapped out one at a time and
  // none is left. Each was delivered on a solid white square and had its
  // background flood-filled out from the border, which is what keeps the
  // enclosed whites (a letter counter, a face, a radio ring) intact.
  //
  // Two of them — Refer & Earn and Study Abroad — are outline art with no
  // container, so they read much fainter on the strip than the four badges do.
  // That is the artwork, not the processing; see CHANGELOG 2026-08-19.
  //
  // The `Icon` branch is kept in the markup below, not deleted — it is what
  // renders if an item is ever added without artwork.
  const appShortcuts = [
    {
      name: "Refer & Earn",
      href: "/refer-and-earn",
      img: "/nav-icons/refer-and-earn.png",
    },
    { name: "AI Assistance", href: "/ai", img: "/nav-icons/ai-assistance.png" },
    {
      name: "Online Courses",
      href: `/online-course/${onlineCourseDetails[0].name}`,
      state: { course: onlineCourseDetails[0] },
      img: "/nav-icons/online-courses.png",
    },
    {
      name: "Study Abroad",
      href: "/study-abroad",
      img: "/nav-icons/study-abroad.png",
    },
    {
      name: "Common Application Form",
      href: "/common-application-form",
      img: "/nav-icons/common-application-form.png",
    },
    { name: "Contact", href: "/contact", img: "/nav-icons/contact.png" },
  ];

  // Layer 2 — the main-bar links that sit beside the logo.
  const topNav = [
    { name: "Study Abroad", href: "/study-abroad", isStudyAbroad: true },
    { name: "Explore City", href: "/college-search-by-location/delhi" },
    { name: "Top University", href: "/college" },
    { name: "Top MBA", href: "/college/management" },
    { name: "Top Engineering", href: "/college/engineering" },
    { name: "Top Design", href: "/college/design" },
  ];
  const moreItems = [
    { name: "About", href: "/about" },
    { name: "Blogs", href: "/blogs" },
    { name: "Videos", href: "/videos" },
    { name: "Help", href: "/help" },
    { name: "Education Loan", href: "/education-loan" },
    { name: "Scholarship", href: "/scholarship" },
    { name: "Register", href: "/register" },
  ];

  // Top app-switcher bar open/closed, toggled by the dots-grid button.
  const [appBarOpen, setAppBarOpen] = useState(true);
  // Bumped on every swap of the strip. The dots button changes bar, size and
  // colour in one step now instead of gliding across, and this drives the
  // flicker that covers the cut — see `dotsSwap` in navbar.css.
  //
  // A counter feeding the glyph's `key`, rather than a boolean class: an
  // already-running CSS animation does not restart when its class is re-applied
  // to the same element, so a second click inside the 0.45s would have snapped
  // the button in plain sight. A changing key remounts the <svg>, and a fresh
  // element always starts its animation from zero. Only the decorative glyph is
  // replaced — the <button> around it keeps its focus and its ARIA state.
  //
  // Starts at 0 and the class is withheld at 0, so the flicker cannot fire on
  // first paint; it belongs to the click, not to the initial render.
  const [dotsSwaps, setDotsSwaps] = useState(0);
  // On a phone the same shortcuts open as a bottom sheet instead. Six of them
  // never fit across a phone, so the strip became a horizontal scroller with
  // everything past "Online Courses" off-screen and nothing to say so.
  //
  // Deliberately a second flag rather than a reused one: `appBarOpen` starts
  // open, and sharing it would have the sheet up on first paint before any
  // effect could close it.
  const [sheetOpen, setSheetOpen] = useState(false);
  // Only ever read to decide which panel the dots drive — never to choose what
  // to render, so the server's guess of `false` cannot mismatch or flash.
  // Tracked with a media-query listener rather than a resize handler so it is
  // still right on the first tap after a rotation.
  const [isPhone, setIsPhone] = useState(false);
  const [isMenuIcon, setIsMenuIcon] = useState(false);
  useEffect(() => {
    const phoneQuery = window.matchMedia("(max-width: 768px)");
    const syncIsPhone = () => setIsPhone(phoneQuery.matches);
    syncIsPhone();
    phoneQuery.addEventListener("change", syncIsPhone);
    return () => phoneQuery.removeEventListener("change", syncIsPhone);
  }, []);
  const linkClickHanlder = (e) => {
    e.target.classList.toggle("active");
  };
  // Sticky is React state rather than a classList.add on a ref: the ref version
  // wrote straight onto className, so the very next render (toggling the app
  // bar, opening the mega menu, …) blew the class away and the bar silently
  // un-stuck until the user scrolled again.
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const navBarHanlder = () => {
      setSticky(window.scrollY > 20);
    };
    navBarHanlder(); // page may already be scrolled on mount (reload, anchor)
    window.addEventListener("scroll", navBarHanlder);
    const overflowHandler = () => {
      if (window.innerWidth > 768) {
        setActiveMenu(false);
        setActiveSubmenu(false);
        // The sheet only exists below this width; left open across the
        // breakpoint it would keep the scrim over an otherwise normal page.
        setSheetOpen(false);
      }
    };
    window.addEventListener("resize", overflowHandler);
    return () => {
      window.removeEventListener("scroll", navBarHanlder);
      window.removeEventListener("resize", overflowHandler);
    };
  }, []);
  useEffect(() => {
    isMenuIcon
      ? document.body.classList.add("active")
      : document.body.classList.remove("active");
  }, [isMenuIcon]);

  // <nav> is fixed, so collapsing the app-switcher strip takes 63px off the bar
  // without moving anything below it — and `.top`, the offset every page uses
  // to clear the navbar, is a flat 100px in globals.css. Flagging the collapsed
  // state on <body> lets that offset shrink by the same amount; without it the
  // gap under the bar grew from flush to 56px the moment the strip was shut.
  //
  // A class rather than a style property so the breakpoints stay in the
  // stylesheet, and its own class rather than the `active` one above, which the
  // burger menu owns — sharing it would have either one unlock both.
  useEffect(() => {
    document.body.classList.toggle("appbar-collapsed", !appBarOpen);
    return () => document.body.classList.remove("appbar-collapsed");
  }, [appBarOpen]);

  // Esc closes the sheet, and the page behind it is frozen: without the lock a
  // drag that starts on the scrim scrolls the page under the sheet.
  // An inline style rather than the `active` class the burger menu uses —
  // sharing it would let whichever closed first unlock for both.
  useEffect(() => {
    if (!sheetOpen) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSheetOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  const navBar = (
    <nav className={`${appBarOpen ? "appbar-open" : ""} ${sticky ? "sticky" : ""}`}>
      {/* The dots toggle is a sibling of both bars rather than a child of the
          app bar: closing that bar collapses it to zero height with overflow
          hidden, which would clip the button away instead of letting it glide
          down into the main bar. Click-only — a hover-to-open would fight the
          toggle, since once the bar is shut the dots sit in the main bar and
          the pointer is very often passing over them on its way elsewhere. */}
      <button
        type="button"
        className="appGrid"
        onClick={() => {
          // The phone path opens the bottom sheet and leaves the strip alone,
          // so there is no swap to cover and nothing to flicker.
          if (isPhone) {
            setSheetOpen((o) => !o);
            return;
          }
          setAppBarOpen((o) => !o);
          setDotsSwaps((n) => n + 1);
        }}
        aria-label="Toggle quick menu"
        aria-expanded={isPhone ? sheetOpen : appBarOpen}
        aria-controls={isPhone ? "app-switcher-sheet" : "app-switcher"}
        title="Quick menu"
      >
        <UDots key={dotsSwaps} className={dotsSwaps ? "dotsSwap" : undefined} />
      </button>

      {/* Layer 1 — collapsible app-switcher bar (desktop only; phones get the
          bottom sheet portalled to <body> at the end of this component) */}
      <div id="app-switcher" className={`appBar ${appBarOpen ? "open" : ""}`}>
        {/* visibility:hidden when collapsed keeps these out of the tab order */}
        <div className="appBarInner">
          {appShortcuts.map(({ name, href, state, Icon, img }) => (
            <Link
              key={name}
              href={href}
              state={state}
              className="appItem"
              title={name}
            >
              {img ? (
                <img src={img} alt="" className="appItemImg" />
              ) : (
                <Icon className="appItemIcon" />
              )}
              <span className="appItemLabel">{name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Layer 2 — main bar */}
      <div className="wrapperBox">
        <div className="linkGrc">
          <Logo wordmark />

          {/* All Courses — reuses the existing mega menu */}
          <div
            className="courseBtn"
            onClick={() => {
              setActiveMenu((pre) => !pre);
              setIsMenuIcon(false);
            }}
            onMouseLeave={() => setActiveMenu(false)}
          >
            <button>
              All Courses{" "}
              <span className={"icon"}>
                <FaChevronDown
                  style={
                    activeMenu
                      ? { transform: "rotate(180deg)" }
                      : { transform: "rotate(0deg)" }
                  }
                />
              </span>
            </button>
            <div className={`courseController ${!activeMenu ? "active" : ""}`}>
              <ul>
                {AllCourse.map((course, index) => (
                  <li
                    key={index}
                    onMouseOver={(e) => setLinkData(e.target.textContent)}
                    onClick={() => setActiveSubmenu(true)}
                  >
                    {course.name}
                  </li>
                ))}
              </ul>
              <div className={`courseOverlay ${activeSubmenu ? "active" : ""}`}>
                <span
                  className="iconBack"
                  onClick={() => {
                    setActiveSubmenu(false);
                  }}
                >
                  <FaArrowLeft />
                </span>
                <span>Find Top {linkData} Courses </span>
                {linkData &&
                  AllCourse.find((course) => course.name === linkData).data.map(
                    (data, index) => (
                      <Link
                        href={`/college/${linkData}`}
                        key={index}
                        onClick={() => {
                          setActiveSubmenu(false);
                          setActiveMenu(true);
                        }}
                      >
                        {" "}
                        {data.name}{" "}
                      </Link>
                    )
                  )}
              </div>
            </div>
          </div>

          {/* Remaining Layer-2 links + More */}
          <div className={`menu-links ${isMenuIcon ? "active" : ""}`}>
            <ul className="links">
              {/* onMouseEnter is on every item, not just Study Abroad: hovering
                  any other link in the row now closes the mega menu. Leaving
                  that to the panel's own onMouseLeave was survivable while the
                  panel hung off the left edge of the screen, but it opens
                  centred over the page now, and sliding along the row to
                  "Explore City" would leave it sitting there. Safe on the whole
                  <li> — mouseenter does not re-fire for descendants, so the
                  panel, a child of the Study Abroad <li>, never trips a
                  sibling's handler. */}
              {topNav.map((link) => (
                <li
                  key={link.name}
                  onMouseEnter={() => setStudyAbroadOpen(!!link.isStudyAbroad)}
                >
                  <Link
                    href={link.href}
                    onClick={() => {
                      setIsMenuIcon(false);
                      setStudyAbroadOpen(false);
                    }}
                  >
                    {link.name}
                    {link.isStudyAbroad && (
                      <span className="icon" style={{ marginLeft: "4px" }}>
                        <FaChevronDown style={{ fontSize: "0.75rem" }} />
                      </span>
                    )}
                  </Link>
                  {link.isStudyAbroad && studyAbroadOpen && (
                    <StudyAbroadMegaMenu onClose={() => setStudyAbroadOpen(false)} />
                  )}
                </li>
              ))}
              <li>
                <div className="link" onClick={linkClickHanlder}>
                  More
                </div>
                <ul className="sub-menu">
                  {moreItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuIcon(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="menu-icons">
          <Link
            href={username ? "/user-dashboard" : "/login"}
            className="login-circle"
            title={username ? username : "Student Login"}
            aria-label={username ? username : "Student Login"}
          >
            <img src="/uniscaler-mark.svg" alt="" />
          </Link>
          <div
            className="menu"
            onClick={() => {
              setIsMenuIcon(!isMenuIcon);
            }}
          >
            <MenuBtn open={isMenuIcon} />
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {navBar}

      {/* The phone sheet is portalled to <body> rather than rendered inside
          <nav>, and that is not a style preference — <nav> carries both a
          `backdrop-filter` and a `z-index`. The filter makes it the containing
          block for any fixed-position descendant, so a sheet inside it anchors
          to the bar instead of the viewport however it is written; the z-index
          traps it in a stacking context that the floating Call Us / Chat Now
          bar (fixed, z-index 888) sits above. Out here neither applies.

          Rendered only on phones, so the markup does not exist at all on
          desktop. `isPhone` is false during SSR and the first paint, which is
          also what keeps `document` out of the server render. */}
      {isPhone &&
        createPortal(
          <div className={`appSheetRoot ${sheetOpen ? "open" : ""}`}>
            {/* Dims the page and closes on a tap outside. A <button> rather
                than a <div> so the same dismissal works from the keyboard. */}
            <button
              type="button"
              className="appSheetScrim"
              aria-label="Close quick menu"
              tabIndex={sheetOpen ? 0 : -1}
              onClick={() => setSheetOpen(false)}
            />
            <div
              id="app-switcher-sheet"
              className="appSheet"
              role="dialog"
              aria-modal="true"
              aria-label="Quick menu"
            >
              <span className="appSheetHandle" aria-hidden="true" />
              <div className="appSheetGrid">
                {appShortcuts.map(({ name, href, state, Icon, img }) => (
                  <Link
                    key={name}
                    href={href}
                    state={state}
                    className="appSheetItem"
                    // Client navigation keeps this mounted, so without this the
                    // sheet stays sitting over the page it just opened.
                    onClick={() => setSheetOpen(false)}
                    tabIndex={sheetOpen ? 0 : -1}
                  >
                    {img ? (
                      <img src={img} alt="" className="appSheetItemImg" />
                    ) : (
                      <Icon className="appSheetItemIcon" />
                    )}
                    <span className="appSheetItemLabel">{name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Navbar;
