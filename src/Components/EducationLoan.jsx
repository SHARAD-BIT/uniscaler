"use client";
import CreditSrc from "../assets/credit.jpg";
import Image from "next/image";
import HdfcSrc from "../assets/HDFC-Bank.png";

import IdfcSrc from "../assets/idfc-bank.avif";

import KotakSrc from "../assets/kotak-bank.png";

import AxixSrc from "../assets/Axis_Bank.png";

import "./styles/educationLoan.css";
import Button from "../Utils/Button";
const EducationLoan = () => {
  const whyChooseUs = [
    {
      title: "Tailored Solutions",
      des: `We offer customized education loan solutions to suit your specific needs, whether you're pursuing undergraduate, postgraduate, or professional courses.`,
    },
    {
      title: "Competitive Interest Rates",
      des: "Benefit from competitive interest rates offered by our banking partners, ensuring affordability throughout your repayment journey.",
    },
    {
      title: "Quick Approval Process",
      des: "Say goodbye to long wait times. Our streamlined approval process ensures that you receive your loan swiftly, allowing you to commence your academic journey without delay.",
    },
    {
      title: "Flexible Repayment Options",
      des: "Enjoy flexible repayment options that align with your financial capabilities. Choose from various repayment tenures to ease the burden of loan repayment post-graduation.",
    },
    {
      title: "No Collateral Required",
      des: "Some of our loan options come with no requirement for collateral, making it easier for you to access funds without additional financial burdens.",
    },
    {
      title: "Online Application",
      des: "Apply for your education loan conveniently through our online platform, saving you time and effort. Our user-friendly interface makes the application process smooth and hassle-free.",
    },
  ];
  const ourParteners = [
    {
      name: "HDFC Bank",
      img: HdfcSrc,
      des: "With HDFC Bank's education loans, you can fund your educational expenses with ease. Benefit from attractive interest rates and flexible repayment options tailored to your needs.",
    },
    {
      name: "IDFC Bank",
      img: IdfcSrc,
      des: "DFC Bank offers hassle-free education loans with minimal documentation and quick approval. Empower your dreams of higher education with their convenient loan offerings.",
    },
    {
      name: "Kotak Bank",
      img: KotakSrc,
      des: "Kotak Bank provides comprehensive education loan solutions designed to support your academic aspirations. Avail of competitive interest rates and flexible repayment plans to fulfill your educational goals.",
    },
    {
      name: "Axis Bank",
      img: AxixSrc,
      des: "Axis Bank's education loans ensure that financial constraints do not hinder your pursuit of education. Enjoy low-interest rates and easy repayment options, making your academic journey stress-free.",
    },
  ];
  return (
    <main className="top educationLoan">
      <section className="group">
        <div className="text">
          <h1>
            <strong style={{ color: "var(--primary)" }}>
              Explore Education Loan
            </strong>{" "}
            Options for Your Future with{" "}
            <span style={{ color: "var(--accent)" }}>Uniscaler</span>
          </h1>
          <p>
            Planning for higher education? Don&apos;t let financial constraints
            hold you back. At Uniscaler, we understand the importance of
            pursuing your dreams without worrying about funding. That&apos;s why
            we&apos;ve partnered with leading banks like HDFC Bank, IDFC Bank,
            Kotak Bank, Axis Bank, and others to provide you with flexible and
            hassle-free education loan options. With our trusted banking
            partners, you can now focus on your studies while we take care of
            your financial needs.
          </p>
          <Button text="Apply Now" link={"tel:+919667956655"}>
            Apply Now
          </Button>
        </div>
        <div className="image">
          <Image
            src={CreditSrc}
            alt="check Your Credit Score"
            loading="lazy"
            sizes="(max-width: 768px) 90vw, 550px"
          />
        </div>
      </section>
      <section>
        <h2>Why Choose Uniscaler Education Loans?</h2>
        <div className="card-group">
          {whyChooseUs.map((item, index) => (
            <div className="cards" key={index}>
              <h3>{item.title}</h3>
              <p>{item.des}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>Our Trusted Banking Partners</h2>
        <div className="partners">
          {ourParteners.map((item, index) => (
            <div className="partner" key={index}>
              <div className="text">
                <h3>{item.name}</h3>
                <p>{item.des}</p>
                <Button text="Apply Now" link={"tel:+919667956655"} />
              </div>
              <div className="image">
                {/* Bank logos are static imports, so width/height come from the
                    files themselves. The object-fit:contain and
                    mix-blend-mode:color-burn in educationLoan.css still apply. */}
                <Image
                  src={item.img}
                  alt={`Get education loan from ${item.name}`}
                  sizes="(max-width: 768px) 40vw, 200px"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="disclaimer">
        <p style={{ textAlign: "center", color: "red" }}>
          Disclaimer: Loan approval is subject to the discretion of the
          respective bank and meeting their eligibility criteria. Terms and
          conditions apply.
        </p>
      </section>
    </main>
  );
};

export default EducationLoan;
