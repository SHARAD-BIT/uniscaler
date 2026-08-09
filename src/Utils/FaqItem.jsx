"use client";
import PropTypes from "prop-types";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

/**
 * Open/closed is React state rather than direct classList manipulation.
 *
 * The previous handler cleared `active` from every item and then re-added it to
 * the clicked one, so clicking an already-open item closed and immediately
 * reopened it — it could never be collapsed. It also resolved the target with
 * `e.target.parentElement.parentElement`, which lands on the right element only
 * when the click hits the title span; clicking the arrow's <path> walked to the
 * <h3> instead and did nothing at all.
 *
 * `isOpen`/`onToggle` are optional: when a parent supplies them it controls
 * which single item is open, otherwise the item manages itself.
 */
const FaqItem = ({ title, des, isOpen, onToggle }) => {
  const [selfOpen, setSelfOpen] = useState(false);
  const controlled = typeof isOpen === "boolean";
  const open = controlled ? isOpen : selfOpen;

  const toggle = () => {
    if (controlled) onToggle();
    else setSelfOpen((prev) => !prev);
  };

  return (
    <div className={`faq-item${open ? " active" : ""}`}>
      <h3
        onClick={toggle}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
      >
        <span>{title}</span>
        <IoIosArrowUp />
      </h3>
      <p>{des}</p>
    </div>
  );
};

export default FaqItem;
FaqItem.propTypes = {
  title: PropTypes.string.isRequired,
  des: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
};
