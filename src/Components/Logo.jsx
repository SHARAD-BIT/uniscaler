"use client";
import Link from "next/link";

const logo = "/mainLogo.svg";
const logoMobile = "/mainLogoMobile.svg";
// Wordmark-only version — used in the navbar. Cut from the supplied
// 2429_150425_uniscaler_BS-SVG-01.svg, which carries the U mark and the
// lettering as fifteen sibling paths with no groups to separate them. The five
// paths whose subpath starts left of x=300 are the mark; the other ten are the
// letters, and only those were kept. The viewBox is the measured extent of that
// ink (265 432 632 115) rather than the original 0 0 1000 1000, so the file has
// no dead margin to centre around. Its two class names were renamed off
// .cls-1/.cls-2, which would otherwise collide with any other export on the
// same page.
const logoWord = "/uniscalerWordmark.svg";
import "./styles/logo.css";
/**
 * @param {boolean} [wordmark] Render just the "Uniscaler" wordmark, without the
 *   shield icon. Used in the navbar; the default (icon + wordmark) is kept for
 *   the footer, forms, and everywhere else Logo is reused.
 */
const Logo = ({ wordmark = false }) => {
  return (
    <div className={`logo ${wordmark ? "wordmark" : ""}`}>
      <Link href="/">
        <img
          src={wordmark ? logoWord : logo}
          alt="Uniscaler logo"
          className="desk"
        />
        <img
          src={wordmark ? logoWord : logoMobile}
          alt="Uniscaler logo"
          className="mobile"
        />
      </Link>
    </div>
  );
};

export default Logo;
