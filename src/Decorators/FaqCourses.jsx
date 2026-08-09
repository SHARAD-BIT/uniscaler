"use client";
import FaqItem from "../Utils/FaqItem";
import PropTypes from "prop-types";
import { useState } from "react";
import "./styles/faq.css";

const FaqCourse = ({ items, title, description }) => {
  // Same single-open behaviour as Faq: opening one closes the rest, and
  // clicking the open one collapses it.
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="faq">
      <h2>{title || `Frequently Asked Questions`}</h2>
      {description && <p>{description}</p>}
      <div className="faq-items">
        {items.map((item, index) => (
          <FaqItem
            title={item.title}
            des={item.description}
            key={item.title}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FaqCourse;
FaqCourse.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};
