"use client";
import { FiPhoneCall } from "react-icons/fi";
import "./styles/callUs.css";
import { useState } from "react";
const CallUs = () => {
  const [isopen, setIsopen] = useState(false);
  const clickHanlder = (e) => {
    e.preventDefault();
    setIsopen(!isopen);
  };
  return (
    <a href="tel:+919667956655" className={`call-us ${isopen && "active"}`}>
      <div className="desk">+91-9667956655</div>
      <div className="mob"> Call us <FiPhoneCall /></div>
      <div className="toggler">
      <FiPhoneCall onClick={clickHanlder} />
      </div>
    </a>
  );
};

export default CallUs;
