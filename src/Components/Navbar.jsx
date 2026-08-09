"use client";
import { FaArrowLeft, FaChevronDown } from "react-icons/fa6";
import Link from "@/Utils/StateLink";

import Logo from "./Logo";
import MenuBtn from "../Utils/MenuBtn";
import StudyAbroadMegaMenu from "./StudyAbroadMegaMenu";
import "./styles/navbar.css";
import { useEffect, useState } from "react";
import { getStoredUser } from "../Helper/Helper";
import { AllCourse, onlineCourseDetails } from "../Helper/Helper";
// App-switcher (top bar) icons
import {
  FaGift,
  FaLaptopCode,
  FaGlobe,
  FaWpforms,
  FaHeadset,
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import "./styles/aiass.css";

/**
 * Toggle glyph for the app-switcher bar: a full 3x3 grid of dots (the classic
 * square app-grid), filled out from the earlier "U" arrangement.
 */
const UDots = () => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
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
  const appShortcuts = [
    { name: "Refer & Earn", href: "/refer-and-earn", Icon: FaGift },
    { name: "AI Assistance", href: "/ai", Icon: BsStars },
    {
      name: "Online Courses",
      href: `/online-course/${onlineCourseDetails[0].name}`,
      state: { course: onlineCourseDetails[0] },
      Icon: FaLaptopCode,
    },
    { name: "Study Abroad", href: "/study-abroad", Icon: FaGlobe },
    {
      name: "Common Application Form",
      href: "/common-application-form",
      Icon: FaWpforms,
    },
    { name: "Contact", href: "/contact", Icon: FaHeadset },
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
  const [isMenuIcon, setIsMenuIcon] = useState(false);
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

  return (
    <nav
      className={`${appBarOpen ? "appbar-open" : ""} ${sticky ? "sticky" : ""}`}
    >
      {/* The dots toggle is a sibling of both bars rather than a child of the
          app bar: closing that bar collapses it to zero height with overflow
          hidden, which would clip the button away instead of letting it glide
          down into the main bar. Click-only — a hover-to-open would fight the
          toggle, since once the bar is shut the dots sit in the main bar and
          the pointer is very often passing over them on its way elsewhere. */}
      <button
        type="button"
        className="appGrid"
        onClick={() => setAppBarOpen((o) => !o)}
        aria-label="Toggle quick menu"
        aria-expanded={appBarOpen}
        aria-controls="app-switcher"
        title="Quick menu"
      >
        <UDots />
      </button>

      {/* Layer 1 — collapsible app-switcher bar */}
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
              {topNav.map((link) => (
                <li
                  key={link.name}
                  onMouseEnter={() => link.isStudyAbroad && setStudyAbroadOpen(true)}
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
};

export default Navbar;
