"use client";
import { useNavigationState } from "@/Helper/NavigationState";
import { useRouter } from "next/navigation";

import "./styles/onlineCourse.css";
import { useEffect } from "react";
import Link from "@/Utils/StateLink";
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
  const course = state?.course;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!state) navigate.replace("/");
    document.title = `${state?.course?.name} - Uniscaler`;
    return () => {
      document.title = "Uniscaler";
    };
  }, []);

  // No navigation state means this page was opened directly. The effect above
  // redirects; render nothing until it does, rather than dereferencing null.
  if (!state) return null;

  return (
    <main className="top onlineCourse">
      <header className="oc-head">
        <span className="oc-badge">
          <i aria-hidden="true" />
          Dual Degree Program
        </span>
        <h1>
          Welcome to our <span>{course?.name}</span> course program
        </h1>
        <p className="oc-sub">
          Our dual Degree Programs of <strong>{course?.name}</strong>
        </p>
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
    </main>
  );
};

export default OnlineCourse;
