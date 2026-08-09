"use client";
import Link from "next/link";
import Image from "next/image";
import { MdLocationOn, MdSearch } from "react-icons/md";
import PropTypes from "prop-types";
import "./styles/cityDeckCard.css";

/**
 * One card in the fanned city deck.
 *
 * `index`, `tilt`, `dy` and `frame` are handed down by CollegeLocation rather
 * than derived here: the values must be stable between the server render and
 * hydration, so nothing random may be generated inside the component.
 *
 * Kept separate from CollegeCard on purpose — that one is still rendered by
 * TopCollege.jsx in the old grid layout and must not change shape.
 */
const CityDeckCard = ({ index, title, slogan, link, image, tilt, dy, frame }) => {
  const src = typeof image === "string" ? image : image?.src;

  return (
    <div
      className="city-card"
      style={{ "--i": index, "--tilt": `${tilt}deg`, "--dy": `${dy}px` }}
    >
      <div className="city-card__rot">
        <Link href={link} className="city-card__face" style={{ "--frame": frame }}>
          <div className="city-card__media">
            {src ? (
              // `fill` rather than width/height: .city-card__media is already
              // position:absolute with overflow:hidden, and the CSS sizes the
              // image to 100%/100% with object-fit:cover. The deck is sized in
              // --card-w units, so `sizes` tracks that rather than the viewport.
              <Image
                src={src}
                alt={`Colleges in ${title}`}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 60vw, 320px"
              />
            ) : null}
            <span className="city-card__scrim" />
          </div>
          {/* Hover affordance. Sits above the photo but below the badge and the
              city name, so both stay readable through the wash. */}
          <span className="city-card__hover" aria-hidden="true">
            <span className="city-card__zoom">
              <MdSearch />
            </span>
          </span>
          <span className="city-card__badge">
            <MdLocationOn aria-hidden="true" />
            {slogan}
          </span>
          <h3 className="city-card__name">{title}</h3>
        </Link>
      </div>
    </div>
  );
};

export default CityDeckCard;
CityDeckCard.propTypes = {
  index: PropTypes.number,
  title: PropTypes.string,
  slogan: PropTypes.string,
  link: PropTypes.string,
  image: PropTypes.any,
  tilt: PropTypes.number,
  dy: PropTypes.number,
  frame: PropTypes.string,
};
