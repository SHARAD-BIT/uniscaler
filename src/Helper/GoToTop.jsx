"use client";
import { useState, useEffect } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import "./styles/goToTop.css";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.scrollY > 1000) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    // Initial scroll to top
    window.scrollTo(0, 0);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div
      className={`goToTop ${isVisible ? "active" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <FaAngleDoubleUp />
    </div>
  );
};

export default GoToTop;
