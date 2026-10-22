"use client";
import React from "react";
import PropTypes from "prop-types";
import "./styles/textAnimation.css";

/*
 * Rotating slogan. This used to be `react-text-transition`, which is abandoned
 * at 3.1.0 and pins @react-spring/web v9 — a version that reads `element.ref`
 * and so logs a React 19 removal warning on every render. v10 fixes it upstream
 * but react-text-transition never picked it up, so the library (and @react-spring
 * with it) was dropped in favour of two CSS keyframes.
 *
 * Behaviour is unchanged: the outgoing line slides up and out while the incoming
 * line slides up from below, on a 3s cycle, cycling through the same four colours.
 */
const COLORS = ["#518c7b", "#c28b00", "#507a57", "#0076d3"];

const TextAnimation = ({ TEXTS }) => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((i) => i + 1),
      3000 // every 3 seconds
    );
    return () => clearInterval(intervalId);
  }, []);

  // `index` only ever grows, so the previous entry is always index - 1. No
  // second piece of state is needed to know what is leaving.
  const pick = (list, i) => list[((i % list.length) + list.length) % list.length];

  return (
    <div className="textAnimation">
      {/*
        The height reservation. Every phrase is rendered here, hidden, all in
        one grid cell — so the box is always as tall as the LONGEST phrase at
        this width, and swapping lines cannot change the height of whatever
        contains it. Client, 2026-09-04: on a phone the hero's slogans
        alternate between one and two lines, and the card grew and shrank by
        36px every three seconds, shoving the search bar and everything under
        it up and down while reading. Measuring the real phrases rather than
        reserving "2 lines" is what keeps it exact at every width and font
        size — the same component also runs at 0.9rem inside the online-course
        cards.
      */}
      <span className="textAnimation__sizer" aria-hidden="true">
        {TEXTS.map((text, i) => (
          <span key={i}>{text}</span>
        ))}
      </span>
      {index > 0 ? (
        <span
          key={`out-${index}`}
          className="textAnimation__out"
          style={{ color: pick(COLORS, index - 1) }}
          aria-hidden="true"
        >
          {pick(TEXTS, index - 1)}
        </span>
      ) : null}
      <span
        key={`in-${index}`}
        className="textAnimation__in"
        style={{ color: pick(COLORS, index) }}
      >
        {pick(TEXTS, index)}
      </span>
    </div>
  );
};

export default TextAnimation;
TextAnimation.propTypes = {
  TEXTS: PropTypes.array.isRequired,
};
