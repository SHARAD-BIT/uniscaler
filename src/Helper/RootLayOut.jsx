"use client";
import Navbar from "../Components/Navbar";
import Dot from "../Utils/Dot";
import Footer from "../Components/Footer";
import WhatsApp from "./WhatsApp";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import RegisterForm from "../Decorators/RegisterForm";
import { RiCloseCircleLine } from "react-icons/ri";
import "../Components/styles/Register.css";
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
      {children}
      <Dot />
      {!footer && !homeOwnsFooter && <Footer />}
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
