"use client";
import FaqItem from "../Utils/FaqItem";
import PropTypes from "prop-types";
import { useState } from "react";
import "./styles/faq.css";

const Faq = ({ items, title, description }) => {
  // Which single item is open, or null for all closed. Held here so opening
  // one still closes the rest, while clicking the open one collapses it.
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

export default Faq;
Faq.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};
