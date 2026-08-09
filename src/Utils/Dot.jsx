"use client";
import { useState, useRef, useEffect } from "react";

function Dot() {
  const [dotX, setDotX] = useState(0);
  const [dotY, setDotY] = useState(0);
  const dotRef = useRef(null);

  const handleMouseMove = (event) => {
    setDotX(event.clientX + 10);
    setDotY(event.clientY + 10);
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div
      ref={dotRef}
      className="dot"
      style={{
        transform: `translate(${dotX}px, ${dotY}px)`,
      }}
    />
  );
}
export default Dot;
