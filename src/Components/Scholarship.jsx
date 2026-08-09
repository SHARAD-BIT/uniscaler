"use client";
import { useEffect } from "react";
import "./styles/Scholarship.css";
import scholarImgSrc from "../assets/scholarship.avif";
import Image from "next/image";
const Scholarship = () => {
  const offer = [
    {
      title: "Merit-Based Scholarships",
      des: "These scholarships are awarded to students who demonstrate outstanding academic achievement, leadership potential, and extracurricular involvement. Students with exceptional GPAs, SAT/ACT scores, and a strong record of community service are encouraged to apply.",
    },
    {
      title: "Need-Based Scholarships",
      des: "We believe that every student deserves a chance to succeed, regardless of their financial circumstances. Our need-based scholarships are designed to assist students with demonstrated financial need. Applicants will be required to provide detailed information about their financial situation to be considered for these awards.",
    },
    {
      title: "Diversity Scholarships",
      des: "Uniscaler values diversity and believes in creating an inclusive learning environment. Our diversity scholarships are awarded to students from underrepresented backgrounds who have demonstrated a commitment to promoting diversity, equity, and inclusion.",
    },
    {
      title: "Specialized Scholarships",
      des: "In addition to our general scholarship offerings, we also provide specialized scholarships for students pursuing specific fields of study or career paths. These scholarships may be available for students majoring in STEM fields, the arts, business, education, and more.",
    },
  ];
  const howToApply = [
    {
      title: "Review Eligibility Criteria",
      des: " Before applying, carefully review the eligibility criteria for each scholarship to determine which ones you qualify for.",
    },
    {
      title: "Prepare Required Documents",
      des: "Gather all necessary documents, including transcripts, letters of recommendation, personal statements, and financial information (if applying for need-based scholarships).",
    },
    {
      title: "Submit Your Application",
      des: " Complete the online scholarship application form, ensuring that all required fields are filled out accurately. Be sure to submit all supporting documents by the specified deadline.",
    },
    {
      title: "Stay Informed",
      des: "After submitting your application, stay informed about the selection process and any additional steps required. We will notify you of the outcome via email or mail.",
    },
  ];
  const whyChooseUs = [
    {
      title: "Financial Assistance",
      des: "Our scholarships provide financial assistance to deserving students, helping to alleviate the burden of tuition costs and other educational expenses.",
    },
    {
      title: "Recognition of Achievement",
      des: "By awarding scholarships based on merit, need, and diversity, we recognize and celebrate the achievements and potential of our students.",
    },
    {
      title: "Investment in Future Leaders",
      des: " Investing in education is investing in the future. Through our scholarship program, we aim to empower the next generation of leaders and innovators.",
    },
    {
      title: "Community Support",
      des: "Uniscaler is committed to supporting our community and ensuring that all students have access to quality education, regardless of their background or financial status.",
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
    const title = document.title;
    document.title = "Scholarship - Uniscaler";
    return () => {
      document.title = title;
    };
  }, []);
  return (
    <main className="top scholarship">
      <section className="group">
        <div className="text">
          <h1>
            Welcome to Uniscaler&apos;s{" "}
            <span style={{ color: "var(--accent)" }}>Scholarship Program!</span>
          </h1>
          <p>
            At Uniscaler, we are committed to fostering academic excellence
            and supporting students in their pursuit of higher education. We
            understand that financial barriers should never hinder deserving
            students from realizing their dreams. That&apos;s why we are proud
            to offer a range of scholarships to help make quality education more
            accessible.
          </p>
        </div>
        <div className="image">
          <Image
            src={scholarImgSrc}
            alt="scholarship"
            loading="lazy"
            sizes="(max-width: 768px) 90vw, 600px"
          />
        </div>
      </section>
      <section>
        <h2>Our Scholarship Offerings Include</h2>
        <ul>
          {offer.map((item, index) => (
            <li key={index}>
              <h3>{item.title}</h3>
              <p>{item.des}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>How To Apply</h2>
        <ul>
          {howToApply.map((item, index) => (
            <li key={index}>
              <h3>{item.title}</h3>
              <p>{item.des}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Why Choose Us?</h2>
        <ul>
          {whyChooseUs.map((item, index) => (
            <li key={index}>
              <h3>{item.title}</h3>
              <p>{item.des}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="disclaimer">
        <h2>Disclaimer:</h2>
        <p>
          Please note: The scholarship program is not a financial aid program.
        </p>
        <p>
          At Uniscaler, we believe that education has the power to transform
          lives. We are proud to offer scholarships that make this
          transformative experience accessible to all students. Apply today and
          take the first step toward a brighter future!
        </p>
      </section>
    </main>
  );
};

export default Scholarship;
