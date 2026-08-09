"use client";
import Link from "next/link";

import "./styles/collegeCard.css";
import PropTypes from "prop-types";

/**
 * Vite resolved `import img from "./a.jpg"` to a URL string. Next resolves it
 * to a StaticImageData object ({ src, width, height, ... }), so the original
 * `typeof image === "string"` test never matched and `.map()` ran on an object.
 * Normalising here keeps every existing call site working untouched.
 */
const toSrc = (img) => (typeof img === "string" ? img : img?.src);

const CollegeCard = ({ title, link, image, slogan }) => {
  const images = Array.isArray(image) ? image : null;
  const single = images ? null : toSrc(image);
  return (
    <div className="college-card">
      <div className="image single">
        {single ? <img loading="lazy" src={single} alt="college image" /> : null}
      </div>
      <div className="image">
        {images
          ? images.map((img) => (
              <img
                loading="lazy"
                src={toSrc(img)}
                alt="college logo"
                key={toSrc(img)}
              />
            ))
          : null}
      </div>
      <div className="text">
        <p>{slogan}</p>
        <div className="link">
          <Link href={link}>{title}</Link>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
CollegeCard.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  image: PropTypes.any,
  slogan: PropTypes.string,
};
