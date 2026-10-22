"use client";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import WhatsApp from "./WhatsApp";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import RegisterForm from "../Decorators/RegisterForm";
import { RiCloseCircleLine } from "react-icons/ri";
import "../Components/styles/Register.css";
import "./styles/pageFooterReveal.css";
import GoToTop from "./GoToTop";
import CallUs from "./CallUs";
import All from "./All";

// Ported from the react-router version: <Outlet /> becomes {children}, and
// useLocation().pathname becomes usePathname(). Everything else is unchanged,
// including the `!x === "y"` conditions below, which are kept as-is.
const RootLayOut = ({ children }) => {
  const [isPopUp, setIsPopUp] = useState(false);
  const pathname = usePathname();
  const [footer, setFooter] = useState(false);
  const popUpRef = useRef(null);
  // show popup after 30sec
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopUp(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const closePopUp = (e) => {
    if (popUpRef.current && !popUpRef.current.contains(e.target)) {
      setIsPopUp(false);
    }
  };
  useEffect(() => {
    isPopUp && !pathname.split("/")[1] === "direct-admission"
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isPopUp, pathname]);
  useEffect(() => {
    if (pathname.split("/")[1] === "ai") {
      setFooter(true);
    } else {
      setFooter(false);
    }
  }, [pathname]);

  /*
   * Anchors `.page-pin` above the top edge by exactly its own overflow, so it
   * scrolls through normally and only pins once its bottom edge reaches the
   * bottom of the viewport — see the comment in pageFooterReveal.css for why
   * a flat `top: 0` is wrong here. Same technique as Home.jsx's `--sheet-top`.
   *
   * Keyed on `pathname`, not `[]`: RootLayOut itself never remounts across
   * navigation, so an empty dependency array would only ever measure whatever
   * page happened to be first. Re-running per route re-measures the new
   * page's height and re-attaches the observer to `pinRef.current`, which is
   * `null` on routes that skip this wrapper entirely (home, "/ai").
   */
  const pinRef = useRef(null);
  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return undefined;

    const apply = () => {
      const overflow = pin.offsetHeight - window.innerHeight;
      pin.style.setProperty("--pin-top", `${Math.min(0, -overflow)}px`);
      // Applied here, not in pageFooterReveal.css — see the comment on
      // `.page-stack > .page-pin` there for why declaring it up front is
      // the actual bug.
      pin.style.position = "sticky";
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(pin);
    window.addEventListener("resize", apply);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, [pathname]);
  /*
   * The home page renders <Footer /> itself, as the top layer of its sticky
   * stack. A sticky reveal only works when the pinned element and the element
   * riding over it share a parent, and that parent lives inside Home — a footer
   * rendered out here could never cover it.
   *
   * Deliberately separate from the `footer` state above, which also gates
   * <WhatsApp />; home still wants the WhatsApp button.
   */
  const homeOwnsFooter = pathname === "/";

  return (
    <>
      <Navbar />
      {!footer && !homeOwnsFooter ? (
        // Same sticky-reveal technique as home's last section (see
        // pageFooterReveal.css), generalised to two layers: the page pins as
        // a backdrop, the footer rides up over it. Home is excluded because it
        // builds its own three-layer version; "/ai" routes are excluded because
        // `footer` already suppresses the footer there entirely.
        <div className="page-stack">
          <div className="page-pin" ref={pinRef}>
            {children}
          </div>
          <div className="footer-reveal">
            <Footer />
          </div>
        </div>
      ) : (
        children
      )}
      <GoToTop />
      <CallUs />
      <All />
      {!footer && <WhatsApp />}
      {isPopUp && !pathname.split("/")[1] === "direct-admission" && (
        <div className="popup" onClick={closePopUp}>
          <div
            className="register"
            style={{ backgroundColor: "white" }}
            ref={popUpRef}
          >
            {" "}
            <RiCloseCircleLine
              className="closeBtn"
              color="white"
              size={"2rem"}
              onClick={() => setIsPopUp(false)}
            />
            <RegisterForm isPopUp={isPopUp} />
          </div>
        </div>
      )}
    </>
  );
};

export default RootLayOut;
