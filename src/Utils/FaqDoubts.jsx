"use client";
import { useState } from "react";
import { MdCheck } from "react-icons/md";
import "./styles/faqDoubts.css";

/**
 * The "FAQ's — Let's clear up some doubts" section from the client's
 * collegevidya reference, placed above the footer. Same card layout; the copy
 * is rewritten for Uniscaler (the reference's text is about College Vidya
 * itself, which cannot appear here), and the reference's video links are
 * dropped — there are no such videos to link. "View more" reveals the rest,
 * like the reference's button.
 */
const FAQS = [
  {
    q: "What is Uniscaler?",
    a: "Choosing an online university can feel like finding your way through a maze. Uniscaler is your map: an unbiased online university guidance platform where you get honest guidance, smart tools, and experienced advisors in one place — so you never feel lost while picking the right online university.",
  },
  {
    q: "How is Uniscaler different from others?",
    a: "We believe choosing the right online university is the first step to reaching your career goals, so we do things differently. We list only UGC-approved online universities, we cut the jargon and explain approvals and courses in plain, simple language, and our advisors share honest advice — they never push a university on you.",
  },
  {
    q: "Is Uniscaler an independent platform?",
    a: "Our guidance is built around one thing: what actually fits you. We compare universities on real fees, real reviews, and real outcomes, so the recommendation you get is based on your goal — not on what looks impressive or costs more.",
  },
  {
    q: "Why should I trust Uniscaler?",
    a: "Learners find real reasons to trust us, not just reasons to enrol:",
    bullets: [
      "Unbiased guidance on career and university choices.",
      "UGC-approved online universities only.",
      "Universities compared on dozens of real factors.",
      "Courses and specialisations across every stream.",
      "65+ Indian and international online universities covered.",
    ],
  },
  {
    q: "Why choose Uniscaler for online admission?",
    a: "We do not just show you your options — we help you actually choose the right one. Whether your question is about a course or a university, our advisors are there to answer it honestly, so you decide with clarity.",
  },
  {
    q: "Are online degrees from these universities valid?",
    a: "Yes. Every university listed on Uniscaler is UGC-approved, and their online degrees hold the same validity as regular ones for jobs and higher studies.",
  },
  {
    q: "Does Uniscaler charge students for guidance?",
    a: "No. Talking to our advisors and comparing universities on Uniscaler costs you nothing.",
  },
  {
    q: "How do I get started?",
    a: "Open any course or university page, tap Apply, and share your details — an advisor calls you back to take it from there.",
  },
];

// The first five show like the reference; the rest sit behind "View more".
const VISIBLE = 5;

const FaqDoubts = () => {
  const [showAll, setShowAll] = useState(false);
  const faqs = showAll ? FAQS : FAQS.slice(0, VISIBLE);

  return (
    <section className="fd-band">
      <div className="fd">
        <p className="fd-eyebrow">
          <span aria-hidden="true">📝</span> FAQ&apos;s
        </p>
        <h2 className="fd-title">
          <span>Let&apos;s clear up</span> some doubts
        </h2>

        {faqs.map((f) => (
          <article key={f.q} className="fd-card">
            <h3>{f.q}</h3>
            <p>{f.a}</p>
            {f.bullets && (
              <ul>
                {f.bullets.map((b) => (
                  <li key={b}>
                    <MdCheck aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}

        <div className="fd-more">
          <button type="button" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "View less" : "View more"} {showAll ? "↑" : "→"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FaqDoubts;
