"use client";
import PropTypes from "prop-types";
import Link from "@/Utils/StateLink";

import "./styles/button.css";
const Button = ({ text, link, state }) => {
  return (
    <button className="C-btn">
      {link && (
        <Link href={link} state={state}>
          {text}
        </Link>
      )}
      {!link && <span>{text}</span>}
    </button>
  );
};

export default Button;
Button.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
  state: PropTypes.object,
};
