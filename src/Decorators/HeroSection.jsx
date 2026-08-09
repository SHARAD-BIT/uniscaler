"use client";
import Button from "../Utils/Button";
import SearchSet from "../Utils/SearchSet";
import TextAnimation from "../Utils/TextAnimation";
import Image from "next/image";
import "./styles/hero-section.css";
const heroImg = "/heroImg.webp";
const HeroSection = () => {
  const Text = [
    `Uniscaler, crafting success stories.
  `,
    `Uniscaler, igniting aspirations.`,
    `Uniscaler, where dreams take flight.`,
    `Uniscaler, sculpting destinies.`,
    `Uniscaler, the beacon of excellence.`,
  ];
  return (
    <section className={`top hero-section`}>
      <div className="wrapper">
        <div className="text-wrapper">
          <h1>
            <span className="year">10</span> years,{" "}
            <span className="year">10000+</span> journeys.
          </h1>
          <div className="slogan">
            <TextAnimation TEXTS={Text} />
          </div>
          <div className="tagline">
            <span>
              Expand your skillset and Transform your career With Uniscaler !
            </span>
          </div>
          <Button text="Explore College" link="/college" />
          <SearchSet placeholder="What are looking for ?" />
          <p className="bot-text">
            We cover all aspects of <span>education&apos;s development.</span>
          </p>
        </div>
        <div className="image-wrapper">
          {/*
            `fill` rather than width/height: .image-wrapper is already
            position:relative with overflow:hidden, and its height comes from
            the flex row stretching it to match the text card beside it — so
            the image must not contribute height of its own.

            This is the LCP element, hence preload. The matching
            <link rel="preload"> was removed from app/layout.js: it pointed at
            the raw /heroImg.webp, which next/image no longer requests, so it
            had become a second unused download.
          */}
          <Image
            src={heroImg}
            alt="India's top colleges List"
            fill
            preload
            sizes="(max-width: 1080px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
