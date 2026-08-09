"use client";
import PropTypes from "prop-types";
import Image from "next/image";
import { isOptimizable } from "../lib/images";
import "./styles/header.css";
const Header = ({ image, title }) => {
  return (
    <header>
      {/*
        `fill` matches what header.css already does to this image — absolute,
        inset 0, object-fit cover inside the 300px-tall relative <header> — so
        nothing about the layout changes, but the banner is now served resized
        and as WebP.

        Several callers pass a hotlinked third-party URL, which isOptimizable
        rejects; those are passed through to the browser unchanged.
      */}
      <Image
        src={image}
        alt={title}
        fill
        loading="lazy"
        sizes="100vw"
        unoptimized={!isOptimizable(image)}
      />
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
Header.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
