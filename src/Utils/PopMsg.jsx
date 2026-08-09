"use client";
import PropTypes from "prop-types";
import "./styles/popMsg.css";
import Link from "next/link";

import { useEffect } from "react";
const PopMsg = ({ msg, title, func, link, children, img }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="popupBox">
      <div className="wrapper">
        {img && (
          <div className="img">
            <img src={img} alt="img" />
          </div>
        )}
        <div className="popupHeader">
          <h3>{title}</h3>
        </div>
        {children && <div className="popupContent">{children}</div>}
        <div className="popupContent">
          <p>{msg}</p>
        </div>
        {link && (
          <div className="link">
            <Link href={link?.href}>{link?.name}</Link>
          </div>
        )}
        <button
          onClick={() => {
            func();
            navigator.vibrate(50);
          }}
        >
          {" "}
          close{" "}
        </button>
      </div>
    </div>
  );
};

export default PopMsg;
PopMsg.propTypes = {
  msg: PropTypes.string,
  title: PropTypes.string,
  func: PropTypes.func,
  link: PropTypes.object,
  children: PropTypes.node,
  img: PropTypes.string,
};
