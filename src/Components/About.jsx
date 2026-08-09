"use client";
import { useEffect } from "react";
import Faq from "../Decorators/Faq";
import NewsLetter from "../Decorators/NewsLetter";
import aboutImgSrc from "../assets/about.jpg";
import Image from "next/image";

import "./styles/about.css";
import Button from "../Utils/Button";
import siteImgSrc from "../assets/laptop.png";

import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const aboutUsItems = [
    {
      title: "Our Mission",
      description:
        "Learn about our college's mission to provide exceptional education, foster a diverse and inclusive community, and prepare students for success in their chosen fields.",
    },
    {
      title: "History",
      description:
        "Discover the rich history of our college, from its founding to its growth and development over the years, shaping the lives of generations of students.",
    },
    {
      title: "Campus Facilities",
      description:
        "Explore our state-of-the-art facilities, including classrooms, laboratories, libraries, student centers, and recreational areas, designed to support learning and student life.",
    },
    {
      title: "Faculty and Staff",
      description:
        "Meet our dedicated faculty and staff members who are committed to providing an enriching educational experience and supporting students' academic and personal growth.",
    },
    {
      title: "Accreditation",
      description:
        "Learn about our college's accreditation status, ensuring that our programs meet high standards of quality and that our degrees are recognized and respected.",
    },
    {
      title: "Community Engagement",
      description:
        "Discover how our college engages with the local community through service projects, partnerships with organizations, and initiatives that address societal challenges.",
    },
  ];
  const socialMedia = [
    {
      id: 1,
      icon: <FaFacebookF />,
      url: "https://facebook.com",
    },
    {
      id: 2,
      icon: <FaYoutube />,
      url: "https://www.youtube.com/@Uniscaler/",
    },
    {
      id: 3,
      icon: <FaInstagram />,
      url: "https://www.instagram.com/uniscaler?utm_source=qr&igsh=aHplZTFpY3I5aTRp",
    },
    {
      id: 4,
      icon: <FaXTwitter />,
      url: "https://twitter.com/Uniscaler",
    },
  ];
  return (
    <main className="top about-us">
      <section className="about">
        <div className="text">
          <h1>
            <div className="box">
              <span>The</span>
              <span>Uniscaler</span>
              <span>Story</span>
            </div>
            <div className="image">
              <Image
                loading="lazy"
                src={aboutImgSrc}
                alt="Uniscaler student image"
                sizes="(max-width: 768px) 90vw, 550px"
              />
            </div>
          </h1>
          <p>
            <strong>
              The Uniscaler is India&apos;s leading platform designed to
              guide students in choosing the best colleges and universities
              tailored to their needs and aspirations.
            </strong>{" "}
            As a leading platform in higher education guidance, Uniscaler
            leverages advanced algorithms and comprehensive data to offer
            personalized recommendations. Our mission is to simplify the college
            selection process and empower students to make informed decisions
            about their academic futures.
          </p>
        </div>
        <div className="image">
          <Image
            loading="lazy"
            src={aboutImgSrc}
            alt="Uniscaler student image"
            sizes="(max-width: 768px) 90vw, 550px"
          />
        </div>
      </section>
      <section className="site">
        <div className="text">
          <div className="siteBox">
            {" "}
            <h2>Here we stand.</h2>
            <div className="image">
              <Image
                loading="lazy"
                src={siteImgSrc}
                alt="Uniscaler site image"
                sizes="(max-width: 768px) 90vw, 550px"
              />
            </div>
          </div>
          <p>
            Uniscaler stands out by providing in-depth insights into a wide
            range of college and universities, ensuring students can explore
            options that align with their academic interests, career goals, and
            personal preferences. Our platform features detailed profiles,
            student reviews, and expert advice on various colleges and
            universities, making it easier for students to navigate the complex
            landscape of higher education.
          </p>
          <Button text="Enroll Now" link="/register" />
        </div>
        <div className="image">
          <Image
            loading="lazy"
            src={siteImgSrc}
            alt="Uniscaler site image"
            sizes="(max-width: 768px) 90vw, 550px"
          />
        </div>
      </section>
      <div className="social-media">
        {socialMedia.map((item) => {
          return (
            <a
              href={item.url}
              key={item.id}
              title={item.url}
              aria-label={item.url}
            >
              {item.icon}
            </a>
          );
        })}
      </div>
      <Faq items={aboutUsItems} />
      <NewsLetter />
    </main>
  );
};

export default About;
