"use client";
import Link from "next/link";

const logo = "/mainLogo.svg";
const logoMobile = "/mainLogoMobile.svg";
// Wordmark-only version (the shield mark cropped out) — used in the navbar.
const logoWord = "/mainLogoWord.svg";
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
