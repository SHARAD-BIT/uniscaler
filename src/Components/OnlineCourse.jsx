"use client";
import { useNavigationState } from "@/Helper/NavigationState";
import { useParams, useRouter } from "next/navigation";
import { onlineCourseDetails } from "@/Helper/Helper";

import "./styles/onlineCourse.css";
import { useEffect, useState } from "react";
import Link from "@/Utils/StateLink";
import OnlineUniversities from "@/Utils/OnlineUniversities";
import LearnerWall from "@/Utils/LearnerWall";
import FaqDoubts from "@/Utils/FaqDoubts";
import {
  MdOutlineDashboard,
  MdSearch,
  MdShare,
  MdArticle,
  MdMailOutline,
  MdAutoAwesome,
  MdWorkOutline,
  MdMemory,
  MdTrendingUp,
  MdGroups,
  MdMenuBook,
  MdCheckCircleOutline,
  MdOutlineSchool,
  MdSchedule,
  MdArrowForward,
} from "react-icons/md";

// Each curriculum module takes its own accent so the grid reads as a set of
// distinct cards rather than one wall of text. Cycled by position — the data
// carries no category to key a colour off.
const MODULE_TONES = ["blue", "green", "purple", "amber", "rose"];
const MODULE_ICONS = [
  MdOutlineDashboard,
  MdSearch,
  MdShare,
  MdArticle,
  MdMailOutline,
];
const BENEFIT_ICONS = [MdWorkOutline, MdMemory, MdTrendingUp, MdGroups];

/**
 * The rotating headline over the hero video, one line every 2s — the same
 * construction (and beat) as the study-abroad hero's rotator. The client
 * supplied these five lines and where each breaks into lead/tail.
 */
const HERO_LINES = [
  { lead: "Learn Online", tail: "Scale Online" },
  { lead: "Your Classroom Anywhere", tail: "Your Success Everywhere" },
  { lead: "Master In Demand Skills", tail: "On Your Own Time" },
  { lead: "One Platform", tail: "Every Online Course You Need" },
  { lead: "Click Learn Conquer", tail: "Only at Uniscaler" },
];

// Benefits arrive as one string carrying both parts: "Career Opportunities:
// Prepares you for roles such as…". Split on the first colon only, so a colon
// later in the sentence does not tear the body apart.
const splitBenefit = (text) => {
  const value = String(text ?? "").trim();
  const at = value.indexOf(":");
  if (at === -1) return { title: "", body: value };
  return { title: value.slice(0, at).trim(), body: value.slice(at + 1).trim() };
};

// The layout closes the module grid on a dark card of short chips. That only
// works when the entries really are labels ("Pay-Per-Click (PPC) Advertising"),
// so anything sentence-length falls back to the ordinary bulleted card.
const isChipList = (details) =>
  Array.isArray(details) &&
  details.length > 0 &&
  details.every((item) => String(item).trim().length <= 45);

const OnlineCourse = () => {
  const { navState: state } = useNavigationState();
  const navigate = useRouter();
  const params = useParams();

  // Deep links and refreshes arrive without navigation state; the URL segment
  // is enough, because the catalog in Helper.js holds the same course objects
  // the links carry, keyed the way the hrefs are built (spaces -> dashes).
  // Before this fallback, refreshing /online-course/BBA bounced to the home
  // page.
  const course =
    state?.course ??
    onlineCourseDetails.find(
      (c) =>
        c.name.replace(/\s/g, "-").toLowerCase() ===
        decodeURIComponent(String(params?.name ?? "")).toLowerCase()
    );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!course) navigate.replace("/");
    document.title = `${course?.name} - Uniscaler`;
    return () => {
      document.title = "Uniscaler";
    };
  }, []);

  /**
   * The headline advances every 2s, unconditionally — reduced-motion visitors
   * get the same words on the same beat with the crossfade turned off in CSS,
   * matching the study-abroad rotator's reasoning.
   */
  const [heroLine, setHeroLine] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setHeroLine((i) => (i + 1) % HERO_LINES.length),
      2000
    );
    return () => clearInterval(id);
  }, []);

  // Unknown segment and no state: the effect above redirects; render nothing
  // until it does, rather than dereferencing null.
  if (!course) return null;

  return (
    <main className="onlineCourse">
      {/* The client's programme video, full-bleed like the study-abroad hero:
          edge to edge and flush under the fixed navbar, and like that one it
          is ambience, not a player — no controls, muted (the only autoplay
          browsers allow), looping. No `top` class on this main — the page
          reserves its own navbar room (see the padding note in
          onlineCourse.css). */}
      <section className="oc-hero-band">
        <video
          className="oc-hero-video"
          src="/online-course-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-label={`${course?.name} course program video`}
        />
        <h1 className="oc-hero-headline">
          {/* Read once, in full, instead of the visible copy — which a screen
              reader would otherwise re-announce every two seconds. */}
          <span className="oc-sr-only">
            Uniscaler online courses — learn online, scale online. Your
            classroom anywhere, your success everywhere. Master in-demand
            skills on your own time. One platform, every online course you
            need. Click, learn, conquer — only at Uniscaler.
          </span>
          {/* A changing key remounts the span so the entrance animation
              replays — re-applying a class never restarts a running
              animation. Same reasoning as the study-abroad rotator. */}
          <span key={heroLine} className="oc-hero-rotator" aria-hidden="true">
            <span className="oc-hero-lead">{HERO_LINES[heroLine].lead}</span>
            <span className="oc-hero-tail">{HERO_LINES[heroLine].tail}</span>
          </span>
        </h1>
      </section>

      {/* The universities grid saved from the client's collegevidya
          reference — asked for right after the hero video here too. */}
      <OnlineUniversities />

      {/* The "1.25 Lakh+ learners" band from the same reference, below the
          universities grid as asked. */}
      <LearnerWall />

      <header className="oc-head">
        <span className="oc-badge">
          <i aria-hidden="true" />
          Dual Degree Program
        </span>
      </header>

      <div className="ddpWrapper">
        {course?.ddp?.map((item, index) => (
          <article key={item?.name} className="ddpItem">
            <div className="oc-card-head">
              <div>
                <span className="oc-eyebrow">
                  <MdOutlineSchool />
                  Program Module {String(index + 1).padStart(2, "0")}
                </span>
                <h2>
                  {index + 1}. {item?.name}
                </h2>
              </div>
              {/* Eligibility used to sit here as a pill as well as in the
                  footer bar. One card, one place — it stays in the footer,
                  beside the Apply button where it is actually needed. The
                  container renders only when something is left to put in it. */}
              {item?.duration && (
                <div className="oc-pills">
                  <span className="oc-pill">
                    <MdSchedule />
                    {item.duration}
                  </span>
                </div>
              )}
            </div>

            <div className="oc-card-body">
              {item?.details && (
                <div className="oc-overview">
                  <p>{item.details}</p>
                </div>
              )}

              {item?.keyPoints?.length > 0 && (
                <section>
                  <div className="oc-section-head">
                    <span className="oc-section-icon indigo">
                      <MdMenuBook />
                    </span>
                    <div>
                      <h3>Key Curriculum Modules</h3>
                      <p>Core skills and topics covered in this programme</p>
                    </div>
                  </div>

                  <div className="oc-modules">
                    {item.keyPoints.map((point, i) => {
                      const isLast = i === item.keyPoints.length - 1;
                      const asChips = isLast && isChipList(point?.details);
                      const Icon = asChips
                        ? MdAutoAwesome
                        : MODULE_ICONS[i % MODULE_ICONS.length];
                      const tone = MODULE_TONES[i % MODULE_TONES.length];

                      return (
                        <div
                          key={i}
                          className={`oc-module${asChips ? " is-dark" : ""}`}
                        >
                          <div className="oc-module-head">
                            <span
                              className={`oc-module-icon ${
                                asChips ? "dark" : tone
                              }`}
                            >
                              <Icon />
                            </span>
                            <h4>{point?.key}</h4>
                          </div>

                          {asChips ? (
                            <div className="oc-chips">
                              {point.details.map((detail, j) => (
                                <span key={j}>{String(detail).trim()}</span>
                              ))}
                            </div>
                          ) : (
                            <ul className={`oc-bullets ${tone}`}>
                              {point?.details?.map((detail, j) => (
                                <li key={j}>{String(detail).trim()}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {item?.benefit?.length > 0 && (
                <section className="oc-benefits">
                  <div className="oc-section-head">
                    <span className="oc-section-icon green">
                      <MdCheckCircleOutline />
                    </span>
                    <div>
                      <h3>Program Benefits</h3>
                      <p>What this programme sets you up for</p>
                    </div>
                  </div>

                  <div className="oc-benefit-grid">
                    {item.benefit.map((entry, i) => {
                      const { title, body } = splitBenefit(entry);
                      const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
                      return (
                        <div key={i} className="oc-benefit">
                          <span className="oc-benefit-icon">
                            <Icon />
                          </span>
                          <div>
                            {title && <h5>{title}</h5>}
                            <p>{body}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              <div className="oc-footer">
                {item?.eligibility && (
                  <div className="oc-elig">
                    {/* Short values ("10+2") fit in the badge, so repeating them
                        underneath just said the same thing twice. Long ones do
                        not fit — the badge falls back to an icon and the value
                        is spelled out instead, so it is never lost. */}
                    <span className="oc-elig-badge">
                      {String(item.eligibility).length <= 5 ? (
                        item.eligibility
                      ) : (
                        <MdOutlineSchool />
                      )}
                    </span>
                    <div>
                      <span className="oc-elig-label">Eligibility Criteria</span>
                      {String(item.eligibility).length > 5 && (
                        <p>{item.eligibility}</p>
                      )}
                    </div>
                  </div>
                )}
                <Link
                  className="oc-apply"
                  href="/admission/"
                  state={{ name: `${course?.name} in ${item?.name}` }}
                >
                  Apply Now
                  <MdArrowForward />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* The FAQ band from the same reference — last thing on the page, so it
          sits directly above the footer as asked. */}
      <FaqDoubts />
    </main>
  );
};

export default OnlineCourse;
