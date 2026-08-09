"use client";
import Link from "next/link";

import Header from "../Utils/Header";
import "./styles/terms.css";
import { useEffect } from "react";

const Term = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="top terms">
      <Header
        title="Terms & Conditions"
        image="https://www.uni-lovers.com/wp-content/uploads/2020/01/terms-of-service-720-1.png"
      />
      <div className="wrapper">
        <h1>Introduction</h1>
        <p>
          Welcome to the Uniscaler website. By accessing or using our
          website, you agree to be bound by the terms and conditions set forth
          below. If you do not agree to all of these terms, please do not use
          this website.
        </p>
        <section>
          <div className="text">
            <h3>Use of the Site</h3>
            <p>
              The Uniscaler website is intended for use by individuals who
              are at least 18 years old. By accessing or using the Uniscaler
              website, you represent and warrant that you are of legal age to
              enter into these terms.
            </p>
          </div>
          <ul>
            <li>
              <strong>Eligibility:</strong>
              You must be at least 18 years old to use this website or have
              permission from a legal guardian.
            </li>
            <li>
              <strong>Content:</strong>
              The content on this website is for informational purposes only and
              is not intended to replace professional advice.
            </li>
            <li>
              <strong>User Conduct:</strong>
              Users are expected to use the website responsibly and not to
              upload, share, or distribute content that is unlawful, harmful, or
              violates the rights of others.
            </li>
          </ul>
          <div className="text">
            <h3>Intellectual Property Rights</h3>
            <p>
              All content on this website, including texts, graphics, logos,
              icons, images, audio clips, and software, is the property of Uniscaler
              College or its content suppliers and protected by Indian and
              international copyright laws.
            </p>
          </div>
          <div className="text">
            <h3>User-Generated Content</h3>
            <p>
              Users may submit content to certain parts of the website. By
              submitting content, you grant Uniscaler a non-exclusive,
              royalty-free, perpetual, and worldwide license to use, reproduce,
              modify, adapt, publish, translate, create derivative works from,
              distribute, and display such content.
            </p>
          </div>
          <div className="text">
            <h3>Links to Other Websites</h3>
            <p>
              Our website may contain links to third-party websites. Uniscaler
              College is not responsible for the content or privacy practices of
              these external sites.
            </p>
          </div>
          <div className="text">
            <h3>Disclaimers</h3>
            <p>
              Uniscaler does not guarantee that the website will be
              uninterrupted or error-free, nor does it make any warranty as to
              the results that may be obtained from the use of the website.
            </p>
          </div>
          <div className="text">
            <h3>Limitation of Liability</h3>
            <p>
              In no event will Uniscaler be liable for any direct, indirect,
              incidental, special, or consequential damages arising out of the
              use of or inability to use the website.
            </p>
          </div>
          <div className="text">
            <h3>Indemnification</h3>
            <p>
              You agree to indemnify and hold Uniscaler, its officers,
              directors, employees, and agents harmless from any claim or demand
              made by any third party due to or arising out of your use of the
              website.
            </p>
          </div>
          <div className="text">
            <h3>Changes to Terms and Conditions</h3>
            <p>
              Uniscaler reserves the right to change these terms and
              conditions at any time. Your continued use of the website after
              any changes indicates your acceptance of the new terms.
            </p>
          </div>
          <div className="text">
            <h3>Governing Law</h3>
            <p>
              These terms and conditions are governed by the laws of India. Any
              disputes arising under or in connection with these terms shall be
              subject to the exclusive jurisdiction of the Indian courts.
            </p>
          </div>
          <div className="text">
            <h3>Contact Us</h3>
            <p>
              If you have any questions about these terms and conditions, please
              contact us at <Link href={"/contact"}>Contact</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Term;
