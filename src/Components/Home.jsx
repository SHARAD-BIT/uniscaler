"use client";
import { useEffect, useRef } from "react";
import Faq from "../Decorators/Faq";
import HeroSection from "../Decorators/HeroSection";
import NewsLetter from "../Decorators/NewsLetter";
import CollegeLocation from "../Decorators/CollegeLocation";
import PopularCollege from "../Decorators/PopularCollege";
import CollegeSlider from "../Decorators/CollegeSlider";
import ExploreByCollege from "../Decorators/ExploreByCollege";
import ExploreOnlineCourse from "../Decorators/ExploreOnlineCourse";
import CommunityBand from "../Utils/NumAnimation";
import OurSuccess from "../Decorators/OurSuccess";
import Footer from "./Footer";
import Link from "next/link";
import "./styles/home.css";

const Home = () => {
  const faqItems = [
    {
      title: "What majors does your college offer?",
      description:
        "Find out about the range of academic programs available at our college, including popular majors, specialized fields of study, and opportunities for interdisciplinary studies.",
    },
    {
      title: "What is the campus life like?",
      description:
        "Learn about the student experience beyond the classroom, including housing options, extracurricular activities, clubs and organizations, sports teams, and campus events.",
    },
    {
      title: "What financial aid options are available?",
      description:
        "Discover the various financial aid programs, scholarships, grants, and work-study opportunities offered by our college to help make higher education more affordable for students.",
    },
    {
      title: "Are there opportunities for internships and career placement?",
      description:
        "Explore the resources and support available for career development, including internship programs, job placement services, networking events, and alumni connections.",
    },
    {
      title: "What is the application process?",
      description:
        "Get information on how to apply to our college, including deadlines, required documents, standardized testing requirements, and tips for writing a strong application.",
    },
  ];
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /*
   * The sheet layer is taller than the viewport, and a sticky box in that state
   * pins the moment its top edge reaches its anchor — hiding everything below its
   * own fold, in this case the whole newsletter, which the footer then covers.
   *
   * Anchoring it above the top edge by exactly its overflow makes it scroll all
   * the way through and pin with its bottom flush to the bottom of the viewport
   * instead. `bottom: 0` is the declarative way to ask for that and simply does
   * not engage here — measured in the browser, the box kept scrolling 1:1 — so
   * the offset is computed instead.
   *
   * A ResizeObserver rather than a one-off measurement because the height is not
   * fixed: opening a FAQ item grows the sheet.
   */
  const sheetRef = useRef(null);
  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return undefined;

    const apply = () => {
      const overflow = sheet.offsetHeight - window.innerHeight;
      sheet.style.setProperty("--sheet-top", `${Math.min(0, -overflow)}px`);
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(sheet);
    window.addEventListener("resize", apply);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);
  return (
    <main className="home">
      <HeroSection />
      <CollegeSlider />
      <ExploreByCollege />
      <ExploreOnlineCourse />
      <CollegeLocation />
      <CommunityBand />
      <PopularCollege />
      {/*
        Three stacked layers, each pinning while the next rides up over it:
        success stories -> FAQ and newsletter -> footer. The footer is rendered
        here rather than in RootLayOut because a sticky reveal needs the pinned
        element and its cover to share a parent.
      */}
      <div className="sheet-stack">
        <div className="pin">
          <OurSuccess />
          <div className="cta">
            <Link href="tel:+919667956655">Talk to a Career Expert</Link>
          </div>
        </div>
        <div className="sheet-hold">
          <div className="sheet" ref={sheetRef}>
            <Faq items={faqItems} />
            <NewsLetter />
          </div>
          <div className="sheet-footer">
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
