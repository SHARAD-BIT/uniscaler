"use client";
import { useEffect, useState, useRef } from "react";
import { FaUniversity } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { HiOutlineUserGroup } from "react-icons/hi";
import "./styles/numberAnimation.css";
import PropTypes from "prop-types";

const CountUpAnimation = ({
  iconComponent,
  initialValue,
  targetValue,
  text,
}) => {
  const [count, setCount] = useState(initialValue);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const duration = 6000; // 6 seconds

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    ); // Trigger when 50% of the element is visible

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let startValue = initialValue;
      const interval = Math.floor(duration / (targetValue - initialValue));

      const counter = setInterval(() => {
        startValue += 1;
        setCount(startValue);
        if (startValue >= targetValue) {
          clearInterval(counter);
        }
      }, interval);

      return () => clearInterval(counter);
    }
  }, [isVisible, initialValue, targetValue]);

  return (
    <div className="container" ref={containerRef}>
      <div className="icon">{iconComponent}</div>
      <span className="num">
        {count}
        <small>+</small>
      </span>
      <span className="text">{text}</span>
    </div>
  );
};

CountUpAnimation.propTypes = {
  iconComponent: PropTypes.node,
  initialValue: PropTypes.number,
  targetValue: PropTypes.number,
  text: PropTypes.string,
};
function NumberAnimation() {
  return (
    <section className="NumberCounter">
      <h2>We Are Here For Your Help </h2>
      <div className="wrapper">
        <CountUpAnimation
          iconComponent={<FaUniversity />}
          initialValue={4990}
          targetValue={5000}
          text="Colleges & Universities"
        />
        <CountUpAnimation
          iconComponent={<PiStudent />}
          initialValue={10000}
          targetValue={10050}
          text="Happy students"
        />
        <CountUpAnimation
          iconComponent={<HiOutlineUserGroup />}
          initialValue={230}
          targetValue={250}
          text="Our Teams"
        />
      </div>
    </section>
  );
}

export default NumberAnimation;
