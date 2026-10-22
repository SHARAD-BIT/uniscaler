"use client";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import badgeSrc from "../assets/uniscaler-edu-society-badge.png";
import "./styles/trustBanner.css";

const badge = badgeSrc.src;

const socialMedia = [
  { id: 1, icon: <FaFacebookF />, url: "https://facebook.com" },
  { id: 2, icon: <FaYoutube />, url: "https://www.youtube.com/@Uniscaler/" },
  {
    id: 3,
    icon: <FaInstagram />,
    url: "https://www.instagram.com/uniscaler?utm_source=qr&igsh=aHplZTFpY3I5aTRp",
  },
  { id: 4, icon: <FaXTwitter />, url: "https://twitter.com/Uniscaler" },
];

const TrustBanner = () => {
  return (
    <section className="trust-banner">
      {/* The client's full logo (icon + wordmark), on their explicit ask
          (2026-08-26) to replace the lettering-only wordmark that was here —
          see the note on uniscalerFullLogo.svg's crop in trustBanner.css. */}
      <img
        className="full-logo"
        src="/uniscalerFullLogo.svg"
        alt="Uniscaler logo"
      />
      <h2>Har Sapne Ka Pehla Kadam</h2>
      <p className="contact-line">
        <a href="tel:+919667956655">9667956655</a>
        <span aria-hidden="true">/</span>
        <a href="mailto:hello@uniscaler.in">hello@uniscaler.in</a>
        <span aria-hidden="true">/</span>
        <a href="mailto:uniscalerx@gmail.com">uniscalerx@gmail.com</a>
      </p>
      <div className="social-media">
        {socialMedia.map((item) => (
          <a href={item.url} key={item.id} title={item.url} aria-label={item.url}>
            {item.icon}
          </a>
        ))}
      </div>
      <p className="associated-with">
        Under the auspices of Uniscaler Educational Society
      </p>
      <img className="badge" src={badge} alt="Uniscaler Educational Society" loading="lazy" />
    </section>
  );
};

export default TrustBanner;
