"use client";
// Filename is historical. This used to be a digit-by-digit counter animation;
// the figures are static text now, so there is no animation left in here.
import { useState, useEffect, useRef } from "react";
import "./styles/NumAnimation.css";
import BookAConsult from "../Decorators/BookAConsult";
import { MdArrowForward, MdCheckCircle, MdGroups } from "react-icons/md";

const START_COUNT = 10000;
const MAX_COUNT = 10999;

const CommunityBand = () => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (isShowing) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isShowing]);

  const handler = () => {
    setIsShowing(!isShowing);
  };

  // Live student counter. As in the original, it starts at 10,000 and ticks up
  // one per second, but only while the counter is actually on screen, and it
  // stops at 10,999. Each digit rolls to its new value like a calendar flip.
  const [count, setCount] = useState(START_COUNT);
  const counterRef = useRef(null);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;
    let timer = null;
    const start = () => {
      if (timer) return;
      timer = setInterval(() => {
        setCount((c) => (c >= MAX_COUNT ? c : c + 1));
      }, 1000);
    };
    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => {
      stop();
      observer.disconnect();
    };
  }, []);

  const digits = String(count).split("");

  return (
    <section className="container community-band">
      <div className="cb-frame">
        <div className="cb-hero">
          {/* Left: headline, subtitle, and the call to action. */}
          <div className="cb-left">
            <h2>
              Join the <span className="cb-mark">uniscaler</span>{" "}
              community of students selecting &amp; choosing the right college
              everyday.
            </h2>
            <p>
              Connect with thousands of peer applicants, compare official
              cutoffs, and get guided mentorship for your dream campus.
            </p>
            <div className="cb-actions">
              <button type="button" className="cb-cta" onClick={handler}>
                Sign Up Now
                <MdArrowForward />
              </button>
              <span className="cb-trust">
                <MdCheckCircle /> Free Access
              </span>
            </div>
          </div>

          {/* Right: the slanted glass live "active students" counter. */}
          <div className="cb-right">
            <div className="cb-counter" ref={counterRef}>
              <span className="cb-counter-label">
                <MdGroups /> Active Students
              </span>
              <div className="cb-digits">
                {digits.map((d, i) => (
                  <span className="cb-digit" key={i}>
                    <span
                      className="cb-digit-track"
                      style={{ transform: `translateY(-${Number(d) * 100}%)` }}
                    >
                      {Array.from({ length: 10 }, (_, n) => (
                        <span className="cb-digit-cell" key={n}>
                          {n}
                        </span>
                      ))}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isShowing && <BookAConsult func={handler} />}
    </section>
  );
};

export default CommunityBand;
