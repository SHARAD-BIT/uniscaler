"use client";
import "./styles/Timer.css";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Video from "../assets/animateVideo.mp4";
const Timer = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="timer">
      <video
        src={Video}
        autoPlay
        muted
        loop
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default Timer;
Timer.propTypes = {
  timer: PropTypes.number,
};
