"use client";
import { useEffect } from "react";
import "./styles/Copyright.css";
import Header from "../Utils/Header";

const CopyrightContent = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="copyright-container top">
      <Header
        title="Copyright"
        image="https://www.forbes.com/advisor/wp-content/uploads/2022/06/Image_-_Copyright_.jpeg.jpg"
      />
      <div className="wrapper">
        <h1>Copyright Information</h1>
        <p>
          All content on this website is protected by copyright law and may not
          be reproduced, distributed, transmitted, displayed, or otherwise used
          without the prior written permission of the copyright owner.
        </p>
        <p>
          The Government of India provides guidelines and regulations for
          copyright protection under the Indian Copyright Act, 1957. This Act,
          along with its subsequent amendments, serves as the primary legal
          framework governing copyright in India. It covers various aspects of
          copyright, including ownership rights, duration of protection, and
          enforcement mechanisms.
        </p>
        <p>Some of the key provisions of the Indian Copyright Act include:</p>
        <ul>
          <li>
            Definition of copyrightable works, such as literary, artistic,
            musical, and dramatic works
          </li>
          <li>
            Duration of copyright protection, typically the lifetime of the
            author plus 60 years
          </li>
          <li>
            Exclusive rights granted to copyright owners, including
            reproduction, distribution, and public performance rights
          </li>
          <li>
            Exceptions and limitations to copyright, such as fair use for
            research, criticism, and review
          </li>
          <li>Procedures for copyright registration and assignment</li>
          <li>
            Remedies and penalties for copyright infringement, including civil
            and criminal liabilities
          </li>
        </ul>
        <p>
          For detailed information on copyright law in India, individuals and
          organizations can refer to legal textbooks and resources authored by
          experts in intellectual property law. Some recommended books on Indian
          copyright law include:
        </p>
        <ul>
          <li>
            <b>&quot;Copyright Law in India&quot;</b> by Justice Prabha Sridevan
          </li>
          <li>
            <b>&quot;Indian Copyright Law and Practice&quot;</b> by Sudhir
            Mittal
          </li>
          <li>
            <b>&quot;Copinger and Skone James on Copyright&quot;</b> by Nicholas
            Coppel QC and Gillian Davies
          </li>
        </ul>
        <p>
          It is important for creators, publishers, and users of copyrighted
          works to understand their rights and obligations under the law.
          Consulting legal experts and reference materials can help ensure
          compliance with copyright regulations and protect intellectual
          property rights.
        </p>
        <p>
          Please note that this information is provided for informational
          purposes only and should not be construed as legal advice. For
          specific legal questions or concerns regarding copyright, it is
          recommended to consult a qualified attorney or legal expert.
        </p>
      </div>
    </main>
  );
};

export default CopyrightContent;
