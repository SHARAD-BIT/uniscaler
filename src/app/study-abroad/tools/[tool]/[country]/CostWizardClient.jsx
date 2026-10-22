"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaChevronLeft } from "react-icons/fa6";
import {
  LIVING_COSTS,
  COST_LINES,
  COST_COUNTRIES,
} from "@/lib/studyAbroadTools";
import "../tools.css";

/**
 * The cost-of-living wizard, after the reference's expense calculator
 * country pages (checked against its shipped bundle 2026-08-24): progress
 * bar with a back chevron, one centred question per step, option cards
 * that advance on click. The question texts and the flow — nine steps,
 * with the off-campus step skipped when on-campus is chosen, activities
 * as the one multi-select with a Continue button, then a "Cost has been
 * calculated" screen — match the reference exactly. The course step's
 * six options follow the reference's visible list (client's word,
 * 2026-08-24); the remaining option lists and every number are ours —
 * the reference loads its options from a gated API, and its figures are
 * its own.
 *
 * How answers shape the estimate (our indicative assumptions, applied to
 * the country's LIVING_COSTS baseline; the result stays editable line by
 * line, so none of this is binding):
 * - accommodation/campus scale rent, food choice scales food, transport
 *   mode scales transport (multipliers on each option below);
 * - activities add flat amounts to "everything else";
 * - mobile usage adds to utilities;
 * - level, course and intake don't move living costs — the reference
 *   asks them and so do we, and they label the result instead.
 */

/** ₹12,34,567 — Indian digit grouping, no decimals. */
const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

/** Estimates only deal in round figures. */
const round500 = (n) => Math.round(n / 500) * 500;

const STEPS = {
  level: {
    q: "What level of education you wish to pursue?",
    layout: "row",
    options: [
      { id: "ug", name: "Undergraduate" },
      { id: "pg", name: "Postgraduate" },
    ],
  },
  course: {
    q: "Which course you want to pursue abroad?",
    layout: "list",
    // The reference's six, verbatim set on the client's word (2026-08-24)
    // — spelling corrected ("Commuication & Journalisms" is its typo).
    options: [
      { id: "management", name: "Management" },
      { id: "cs", name: "Computer Science" },
      { id: "engineering", name: "Engineering & Technology" },
      { id: "communication", name: "Communication & Journalism" },
      { id: "arts", name: "Arts and Humanities" },
      { id: "law", name: "Law" },
    ],
  },
  session: {
    q: "Which intake session are you planning to enrol in?",
    layout: "list",
    options: [
      { id: "sep-2026", name: "Sep – Dec 2026" },
      { id: "jan-2027", name: "Jan – Apr 2027" },
      { id: "may-2027", name: "May – Aug 2027" },
      { id: "undecided", name: "Not decided yet" },
    ],
  },
  accommodation: {
    q: "Select your preferred Accommodation type",
    layout: "row",
    options: [
      { id: "on-campus", name: "On-campus" },
      { id: "off-campus", name: "Off-campus" },
    ],
  },
  campus: {
    q: "Off-campus accommodation you wish to opt for?",
    layout: "row",
    options: [
      { id: "shared", name: "Shared apartment", mult: 0.85 },
      { id: "private", name: "Private apartment", mult: 1.35 },
      { id: "homestay", name: "Homestay / PG", mult: 0.75 },
    ],
  },
  food: {
    q: "How will you manage your food?",
    layout: "row",
    options: [
      { id: "mess", name: "University mess / meal plan", mult: 1 },
      { id: "cook", name: "Cook for yourself", mult: 0.85 },
      { id: "eat-out", name: "Mostly eat out", mult: 1.5 },
    ],
  },
  transportation: {
    q: "Select your preferred mode of transport?",
    layout: "row",
    options: [
      { id: "public", name: "Public transport", mult: 1 },
      { id: "walk", name: "Walk / cycle", mult: 0.4 },
      { id: "cabs", name: "Cabs / own vehicle", mult: 1.8 },
    ],
  },
  activities: {
    q: "Select the activities you wish to follow.",
    layout: "list",
    multi: true,
    options: [
      { id: "gym", name: "Gym & fitness", add: 2000 },
      { id: "events", name: "Movies & events", add: 1500 },
      { id: "travel", name: "Weekend travel", add: 5000 },
      { id: "dining", name: "Dining out with friends", add: 3000 },
    ],
  },
  usage: {
    q: "What is your mobile usage?",
    layout: "row",
    options: [
      { id: "light", name: "Light", add: 0 },
      { id: "moderate", name: "Moderate", add: 1000 },
      { id: "heavy", name: "Heavy", add: 2500 },
    ],
  },
};

const FULL_ORDER = [
  "level",
  "course",
  "session",
  "accommodation",
  "campus",
  "food",
  "transportation",
  "activities",
  "usage",
];

const EMPTY_ANSWERS = {
  level: null,
  course: null,
  session: null,
  accommodation: null,
  campus: null,
  food: null,
  transportation: null,
  activities: [],
  usage: null,
};

export default function CostWizardClient({ slug }) {
  const router = useRouter();
  const country = COST_COUNTRIES.find((c) => c.slug === slug);

  const [answers, setAnswers] = useState(EMPTY_ANSWERS);
  const [stepIdx, setStepIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [costs, setCosts] = useState(null);

  // On-campus skips the off-campus step, exactly as the reference does —
  // dropping it from the order keeps next/back arithmetic trivial, and the
  // progress total reads 8 instead of 9 from that answer on.
  const onCampus = answers.accommodation?.id === "on-campus";
  const order = onCampus
    ? FULL_ORDER.filter((k) => k !== "campus")
    : FULL_ORDER;
  const stepKey = order[stepIdx];
  const step = STEPS[stepKey];

  const computeCosts = (a) => {
    const base = LIVING_COSTS[country.key];
    const rentMult =
      a.accommodation?.id === "on-campus" ? 0.9 : a.campus?.mult ?? 1;
    return {
      rent: round500(base.rent * rentMult),
      food: round500(base.food * (a.food?.mult ?? 1)),
      transport: round500(base.transport * (a.transportation?.mult ?? 1)),
      utilities: base.utilities + (a.usage?.add ?? 0),
      other: base.other + a.activities.reduce((s, x) => s + x.add, 0),
    };
  };

  const advance = (nextAnswers) => {
    if (stepIdx + 1 >= order.length) {
      setCosts(computeCosts(nextAnswers));
      setDone(true);
    } else {
      setStepIdx(stepIdx + 1);
    }
  };

  const pick = (option) => {
    const next = { ...answers, [stepKey]: option };
    // Switching back to on-campus makes a stale off-campus choice
    // meaningless — drop it, as the reference does.
    if (stepKey === "accommodation" && option.id === "on-campus")
      next.campus = null;
    setAnswers(next);
    advance(next);
  };

  const toggleActivity = (option) => {
    setAnswers((prev) => {
      const has = prev.activities.some((a) => a.id === option.id);
      return {
        ...prev,
        activities: has
          ? prev.activities.filter((a) => a.id !== option.id)
          : [...prev.activities, option],
      };
    });
  };

  const goBack = () => {
    if (stepIdx === 0) router.push("/study-abroad/tools/cost-of-living");
    else setStepIdx(stepIdx - 1);
  };

  const restart = () => {
    setAnswers(EMPTY_ANSWERS);
    setStepIdx(0);
    setDone(false);
    setCosts(null);
  };

  const setCost = (k) => (e) =>
    setCosts({ ...costs, [k]: Math.max(0, Number(e.target.value)) });

  const total = costs ? Object.values(costs).reduce((a, b) => a + b, 0) : 0;

  const isSelected = (option) =>
    step.multi
      ? answers.activities.some((a) => a.id === option.id)
      : answers[stepKey]?.id === option.id;

  return (
    <main className="tl-page tl-page-full">
      <section className="tl-hero">
        <div className="tl-inner tl-hero-grid">
          <div className="tl-hero-copy">
            <Link
              href="/study-abroad/tools/cost-of-living"
              className="tl-back tl-back-light"
            >
              <FaArrowLeft /> Cost of Living
            </Link>
            <h1 className="tl-hero-title">
              {country.card} Cost of Living Calculator
            </h1>
            <p className="tl-hero-sub">
              Answer a few quick questions about how you plan to live in{" "}
              {country.key} and get an indicative monthly budget for one
              student, in rupees — every line editable at the end.
            </p>
          </div>
          <img
            className="tl-hero-art"
            src="/study-abroad/tools/cgpa-hero.svg"
            alt=""
          />
        </div>
      </section>

      {!done && (
        <div className="tl-exp-wrap">
          <div className="tl-exp-progress">
            <button
              type="button"
              className="tl-exp-back"
              onClick={goBack}
              aria-label="Go back"
            >
              <FaChevronLeft />
            </button>
            <div className="tl-exp-bar-box">
              <span className="tl-exp-count">
                {stepIdx + 1}/{order.length}
              </span>
              <div className="tl-exp-track">
                <span
                  className="tl-exp-fill"
                  style={{ width: `${((stepIdx + 1) / order.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="tl-exp-step" key={stepKey}>
            <p className="tl-exp-q">{step.q}</p>
            {step.multi && (
              <p className="tl-exp-multi-note">Can select multiple options</p>
            )}

            <div
              className={
                step.layout === "row" ? "tl-exp-row" : "tl-exp-list"
              }
            >
              {step.options.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={`tl-exp-opt${isSelected(o) ? " is-selected" : ""}`}
                  aria-pressed={isSelected(o)}
                  onClick={() => (step.multi ? toggleActivity(o) : pick(o))}
                >
                  {o.name}
                </button>
              ))}
            </div>

            {step.multi && (
              <div className="tl-exp-continue">
                <button
                  type="button"
                  className="tl-wnext-red"
                  onClick={() => advance(answers)}
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {done && costs && (
        <div className="tl-exp-wrap tl-exp-wrap-result">
          <div className="tl-exp-done-head">
            <button
              type="button"
              className="tl-exp-back"
              onClick={() => setDone(false)}
              aria-label="Go back"
            >
              <FaChevronLeft />
            </button>
            <p className="tl-exp-q tl-exp-q-tight">
              Cost has been calculated based on the inputs provided
            </p>
          </div>

          <div className="tl-card">
            <div className="tl-grid">
              <div className="tl-fields">
                {COST_LINES.map(([k, name]) => (
                  <label key={k}>
                    {name} (₹ / month)
                    <input
                      type="number"
                      min="0"
                      step="500"
                      value={costs[k]}
                      onChange={setCost(k)}
                    />
                  </label>
                ))}
                <p className="tl-note">
                  Indicative figures for one student in {country.key},
                  excluding tuition, shaped by your answers — edit any line
                  and the totals follow.
                </p>
              </div>

              <div className="tl-result">
                <div className="tl-result-hero">
                  <span className="tl-result-label">
                    Estimated monthly total
                  </span>
                  <span className="tl-result-big">{inr(total)}</span>
                </div>
                <div className="tl-result-row">
                  <span className="tl-result-label">Per year</span>
                  <span className="tl-result-value">{inr(total * 12)}</span>
                </div>
                {COST_LINES.map(([k, name]) => (
                  <div className="tl-result-row tl-result-minor" key={k}>
                    <span className="tl-result-label">{name}</span>
                    <span className="tl-result-value">{inr(costs[k])}</span>
                  </div>
                ))}
                <div className="tl-result-row tl-result-minor">
                  <span className="tl-result-label">
                    {[
                      answers.level?.name,
                      answers.course?.name,
                      answers.session?.name,
                      onCampus ? "On-campus" : answers.campus?.name,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="tl-exp-actions">
            <button type="button" className="tl-wnext-red" onClick={restart}>
              Recalculate
            </button>
            <Link
              href="/study-abroad/tools/cost-of-living"
              className="tl-exp-change"
            >
              Change country
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
