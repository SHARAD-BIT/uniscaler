"use client";
import Link from "next/link";
import FaqItem from "../Utils/FaqItem";
import "./styles/referral.css";
import {
  FaWhatsapp,
  FaEnvelope,
  FaShareNodes,
  FaGraduationCap,
  FaArrowUpRightFromSquare,
  FaLink,
  FaUserPlus,
  FaWallet,
} from "react-icons/fa6";

/**
 * Rebuilt 2026-08-20 after easemytrip.com/refer, on the client's word, with
 * their supplied illustration as the hero-card image. Every figure and rule in
 * the copy is carried over from the page this replaced — ₹1000 per successful
 * referral, code from the student account, success = enrolment in an
 * affiliated college, credit on confirmed enrolment, program subject to change
 * — nothing here is invented, only re-arranged into the reference's sections.
 *
 * The reference's step/scene illustrations could not be sourced as usable
 * licensed files, so those spots use icon roundels instead; the structure is
 * the reference's throughout.
 */

/* Condensed from the old page's three long "How it Works" passages — the
   EMT-style card holds two lines, not four paragraphs. The three scenes are
   drawn in-house in the flat-indigo style of the client's own hero-art.svg
   (same #4b62e8/#8090ed/#050d3c family), so all four illustrations on this
   page read as one set — which no stock set pulled off the internet would. */
const STEPS = [
  {
    step: "Step 1",
    title: "Get your referral code",
    copy: "Every student enrolled at Uniscaler gets a unique referral code in their student account.",
    img: "/refer-earn/step-code.svg",
  },
  {
    step: "Step 2",
    title: "Share your code",
    copy: "Share it with friends via email, social media, or word of mouth, and have them use it when applying to affiliated colleges.",
    img: "/refer-earn/step-share.svg",
  },
  {
    step: "Step 3",
    title: "Earn referral money",
    copy: "When your friend enrolls in a college affiliated with Uniscaler, you earn ₹1000.",
    img: "/refer-earn/step-earn.svg",
  },
];

/* One reward type exists (₹1000 on enrolment), so unlike the reference's
   flight/hotel/bus rows these differ by how you share, not by what you earn. */
const INVITE_ROWS = [
  {
    title: "Share on WhatsApp",
    sub: "You will earn ₹1000 per enrolment",
    Icon: FaWhatsapp,
  },
  {
    title: "Share over Email",
    sub: "You will earn ₹1000 per enrolment",
    Icon: FaEnvelope,
  },
  {
    title: "Share on social media",
    sub: "You will earn ₹1000 per enrolment",
    Icon: FaShareNodes,
  },
];

const JOURNEY = [
  {
    title: "Log in",
    copy: "Sign in to your Uniscaler student account and grab your unique referral code.",
    Icon: FaLink,
  },
  {
    title: "Refer a friend",
    copy: "Your friend uses your code when applying to a college through Uniscaler.",
    Icon: FaUserPlus,
  },
  {
    title: "Friend enrolls",
    copy: "The referral counts once your friend enrolls in an affiliated college.",
    Icon: FaGraduationCap,
  },
  {
    title: "₹1000 credited",
    copy: "The reward is credited to your account once the enrolment is confirmed.",
    Icon: FaWallet,
  },
];

const FAQS = [
  {
    title: "How to participate in the Refer and Earn program?",
    des: "Log in to your Uniscaler student account. Navigate to the “Refer and Earn” section to get your unique referral code. Share your code with friends via email, social media, or word of mouth, and encourage them to use it when applying to colleges through Uniscaler’s website. Enjoy rewards for successful referrals!",
  },
  {
    title: "How much do I earn per referral?",
    des: "For every successful referral — when your friend enrolls in a college associated with Uniscaler through our platform — you earn ₹1000.",
  },
  {
    title: "When is a referral counted as successful?",
    des: "Referrals are considered successful only when the referred friend enrolls in a college affiliated with Uniscaler through our website.",
  },
  {
    title: "When are rewards credited?",
    des: "Rewards are credited to your account once the enrolment of your referred friend is confirmed.",
  },
  {
    title: "Can I share my referral code publicly?",
    des: "No. The referral code is unique to each student and should not be shared publicly or misused.",
  },
  {
    title: "Can the program change?",
    des: "The Refer and Earn program is subject to change or termination at the discretion of Uniscaler.",
  },
];

const Referral = () => {
  return (
    <main className="top referral">
      {/* ─── Hero: card left, pitch right, on the dotted blue panel ─── */}
      <section className="rf-hero">
        <div className="rf-hero-inner">
          <div className="rf-hero-card">
            <span className="rf-crown" aria-hidden="true">
              👑
            </span>
            <h2>UNISCALER</h2>
            <p>Refer a friend and earn &#8377;1000*</p>
            <a href="#rf-how" className="rf-explore">
              Explore now <FaArrowUpRightFromSquare />
            </a>
            <img
              src="/refer-earn/hero-art.svg"
              alt=""
              className="rf-hero-art"
            />
          </div>
          <div className="rf-hero-pitch">
            <h1>
              Refer &amp; Earn{" "}
              <span aria-hidden="true" className="rf-coin">
                <span className="rf-coin-inner">
                  <span className="rf-coin-face">&#8377;</span>
                  <span className="rf-coin-face rf-coin-face--back">
                    &#8377;
                  </span>
                </span>
              </span>
            </h1>
            <p>Invite your friends &amp; earn &#8377;1000 per enrolment</p>
            <Link href="/login" className="rf-login">
              Login
            </Link>
          </div>
        </div>

        {/* ─── How it works ─── */}
        <div className="rf-how" id="rf-how">
          <h2>
            How it <span>works?</span>
          </h2>
          <p className="rf-how-sub">
            Let&apos;s break down the referral program
          </p>
          <div className="rf-steps">
            {STEPS.map(({ step, title, copy, img }) => (
              <article className="rf-step" key={step}>
                <img src={img} alt="" className="rf-step-img" />
                <span className="rf-step-no">{step}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Invite more ─── */}
      <section className="rf-invite">
        <h2>
          Don&apos;t stop here, <em>invite</em> more to <em>earn</em> more.
        </h2>
        <div className="rf-invite-body">
          <div className="rf-invite-rows">
            {INVITE_ROWS.map(({ title, sub, Icon }) => (
              <div className="rf-invite-row" key={title}>
                <span className="rf-invite-icon" aria-hidden="true">
                  <Icon />
                </span>
                <div className="rf-invite-text">
                  <strong>{title}</strong>
                  <span>{sub}</span>
                </div>
                <Link href="/login" className="rf-invite-btn">
                  Invite
                </Link>
              </div>
            ))}
          </div>
          <div className="rf-invite-art" aria-hidden="true">
            <img src="/refer-earn/hero-art.svg" alt="" />
          </div>
        </div>
      </section>

      {/* ─── The journey, four stops on a line ─── */}
      <section className="rf-journey">
        <h2>
          Earn <strong>&#8377;1000 per referral</strong> with Uniscaler
        </h2>
        {/* The reference's wave: four near-semicircle arcs, each cradling a
            circle — down, up, down, up — with the copy on the opposite side of
            the wave from its circle. The arcs are one inline SVG sized by the
            same 1300×300 proportions the stops are positioned in, so the two
            stay locked together at any width; four separate paths rather than
            one, because the round-capped gaps between arcs are part of the
            reference's look. */}
        <div className="rf-journey-stage">
          <svg
            className="rf-wave"
            viewBox="0 0 1300 300"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <g
              fill="none"
              stroke="#ffffff"
              strokeWidth="16"
              strokeLinecap="round"
            >
              <path d="M17.5 150 A145 145 0 0 0 307.5 150" />
              <path d="M342.5 150 A145 145 0 0 1 632.5 150" />
              <path d="M667.5 150 A145 145 0 0 0 957.5 150" />
              <path d="M992.5 150 A145 145 0 0 1 1282.5 150" />
            </g>
            <circle cx="17.5" cy="150" r="20" fill="#eef1fb" />
            <circle cx="1282.5" cy="150" r="20" fill="#eef1fb" />
          </svg>
          {JOURNEY.map(({ title, copy, Icon }, i) => (
            <div
              className={`rf-stop ${i % 2 ? "rf-stop-up" : "rf-stop-down"}`}
              key={title}
            >
              <span className="rf-stop-circle" aria-hidden="true">
                <Icon />
              </span>
              <div className="rf-stop-copy">
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="rf-fineprint">
          *The Refer and Earn program is subject to change or termination at
          the discretion of Uniscaler.
        </p>
      </section>

      {/* ─── FAQ ─── */}
      <section className="rf-faq">
        <h2>FAQ</h2>
        <div className="rf-faq-items">
          {FAQS.map(({ title, des }) => (
            <FaqItem key={title} title={title} des={des} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Referral;
