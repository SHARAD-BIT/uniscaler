"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FaChevronRight,
  FaChevronDown,
  FaArrowLeft,
  FaMinus,
  FaPlus,
} from "react-icons/fa6";
import { studyAbroadTools } from "@/lib/studyAbroadTools";
import "./tools.css";

/**
 * The four calculators behind the /study-abroad tools band. One client
 * component switching on the route's slug rather than four route folders:
 * they share the whole page shell, the result-panel layout and the CSS, and
 * differ only in the middle.
 *
 * All maths is standard, public formula work — see each calculator's
 * comment. Every figure that isn't computed (the cost-of-living lines) is
 * labelled indicative and editable, so the tool never presents an estimate
 * as a promise.
 */

/** ₹12,34,567 — Indian digit grouping, no decimals. */
const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

/* ── CGPA to GPA ──────────────────────────────────────────────────── */

/**
 * Two standard conversions off one CGPA:
 *
 * - US 4.0 GPA, linear: (cgpa / scale) × 4. The common quick conversion;
 *   universities that use WES-style course-by-course tables will differ,
 *   which is what the note under the result says.
 * - German grade via the Modified Bavarian formula:
 *   1 + 3 × (max − cgpa) / (max − minPass), where minPass is the lowest
 *   passing grade on the home scale. 1.0 is best, 4.0 the pass floor;
 *   below the pass threshold there is no equivalent grade.
 *
 * The reference runs this tool as a four-step wizard, and on the client's
 * word (2026-08-21) so does this — the earlier single-form calculator is
 * gone. Steps: the degree (level, duration, university, grading scale) →
 * a score per year of it → contact details → the result. `mode`
 * ("us" | "de") comes from the country cards above and decides which
 * conversion leads step 4; the other still shows as a secondary row.
 *
 * The maths is unchanged from the single-form version: linear onto 4.0 for
 * the US, Modified Bavarian for Germany, run on the *average* of the
 * per-year scores. The pass mark the Bavarian formula needs defaults to
 * half the scale maximum (5 on 10, 50 on 100, 2 on 4 — the common setup)
 * and is editable on the scores step in Germany mode.
 */
const WIZARD_STEPS = ["Step 1", "Step 2", "Step 3", "Step 4"];

const DURATION_OPTIONS = [1, 2, 3, 4, 5, 6];

const GRADING_SCALES = [
  { key: "100-33", label: "0 - 100 % ( 33% passing marks )", max: 100, passMark: 33 },
  { key: "100-50", label: "0 - 100 % ( 50% passing marks )", max: 100, passMark: 50 },
  { key: "100-40", label: "0 - 100 % ( 40% passing marks )", max: 100, passMark: 40 },
  { key: "10-4", label: "0 - 10 (4 Passing CGPA)", max: 10, passMark: 4 },
  { key: "10-5", label: "0 - 10 (5 Passing CGPA)", max: 10, passMark: 5 },
  { key: "7-2", label: "0 - 7 (2 Passing CGPA)", max: 7, passMark: 2 },
];

function CgpaWizard({ mode }) {
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState("Master's");
  const [years, setYears] = useState(2);
  const [university, setUniversity] = useState("");
  const [college, setCollege] = useState("");
  const [scaleKey, setScaleKey] = useState("10-5");
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });
  const [leadStatus, setLeadStatus] = useState("idle");

  const [entryMode, setEntryMode] = useState("semester");
  const [semesters, setSemesters] = useState([
    { name: "Semester 1", backlog: 0, score: 8 },
    { name: "Semester 2", backlog: 0, score: 8 },
  ]);
  const [subjects, setSubjects] = useState([
    { name: "Subject 1", credits: 4, score: 8 },
    { name: "Subject 2", credits: 3, score: 8 },
  ]);

  const scale = GRADING_SCALES.find((s) => s.key === scaleKey) || GRADING_SCALES[4];
  const passMark = scale.passMark;

  const pickLevel = (l) => {
    setLevel(l);
    const defaultY = l === "Bachelor's" ? 4 : 2;
    setYears(defaultY);
    setSemesters(
      Array.from({ length: defaultY * 2 }, (_, i) => ({
        name: `Semester ${i + 1}`,
        backlog: 0,
        score: scale.max * 0.8,
      }))
    );
  };

  const pickYears = (n) => {
    setYears(n);
    setSemesters(
      Array.from({ length: n * 2 }, (_, i) => ({
        name: `Semester ${i + 1}`,
        backlog: 0,
        score: scale.max * 0.8,
      }))
    );
  };

  const pickScale = (key) => {
    const next = GRADING_SCALES.find((s) => s.key === key) || GRADING_SCALES[4];
    setScaleKey(key);
    setSemesters((prev) => prev.map((s) => ({ ...s, score: next.max * 0.8 })));
    setSubjects((prev) => prev.map((s) => ({ ...s, score: next.max * 0.8 })));
  };

  const addSem = () => {
    setSemesters((prev) => [
      ...prev,
      { name: `Semester ${prev.length + 1}`, backlog: 0, score: scale.max * 0.8 },
    ]);
  };

  const removeSem = (idx) => {
    if (semesters.length > 1) {
      setSemesters((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const updateSem = (idx, field, val) => {
    setSemesters((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: val };
      return next;
    });
  };

  const addSub = () => {
    setSubjects((prev) => [
      ...prev,
      { name: `Subject ${prev.length + 1}`, credits: 3, score: scale.max * 0.8 },
    ]);
  };

  const removeSub = (idx) => {
    if (subjects.length > 1) {
      setSubjects((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const updateSub = (idx, field, val) => {
    setSubjects((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: val };
      return next;
    });
  };

  let avg = 0;
  if (entryMode === "semester") {
    const validScores = semesters.map((s) => Number(s.score) || 0);
    avg = validScores.length ? validScores.reduce((a, b) => a + b, 0) / validScores.length : 0;
  } else {
    const totalWeighted = subjects.reduce((sum, s) => sum + (Number(s.score || 0) * Number(s.credits || 1)), 0);
    const totalCreds = subjects.reduce((sum, s) => sum + Number(s.credits || 1), 0);
    avg = totalCreds > 0 ? totalWeighted / totalCreds : 0;
  }

  const scoresValid = avg >= 0 && avg <= scale.max;

  const usGpa = (avg / scale.max) * 4;
  const percent = (avg / scale.max) * 100;
  const german =
    avg >= passMark
      ? Math.min(
          4,
          Math.max(1, 1 + (3 * (scale.max - avg)) / (scale.max - passMark))
        )
      : null;

  const restart = () => {
    setStep(0);
    setLeadStatus("idle");
  };

  const leadResult =
    mode === "de"
      ? {
          label: "German grade (1.0 is best)",
          value: german !== null ? german.toFixed(1) : "Below pass mark",
        }
      : { label: "US GPA (4.0 scale)", value: usGpa.toFixed(2) };
  const trailResult =
    mode === "de"
      ? { label: "US GPA (4.0 scale)", value: usGpa.toFixed(2) }
      : {
          label: "German grade (1.0 is best)",
          value: german !== null ? german.toFixed(1) : "Below pass mark",
        };

  return (
    <div className="tl-wizard">
      <h3 className="tl-upgrad-card-title">Calculate your GPA</h3>

      <div className="tl-steps" role="list">
        {WIZARD_STEPS.map((name, i) => (
          <div
            key={name}
            role="listitem"
            className={`tl-step${i === step ? " is-active" : ""}${
              i < step ? " is-done" : ""
            }`}
          >
            {i < step ? (
              <button type="button" onClick={() => setStep(i)}>
                {i + 1}
              </button>
            ) : (
              <span>{i + 1}</span>
            )}
            <em>{name}</em>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="tl-wstep">
          <p className="tl-wlead tl-center">
            Select degree level for which you are converting Indian marks to{" "}
            {mode === "de" ? "Germany GPA" : "USA GPA"}
          </p>
          <div className="tl-chiprow tl-center-row">
            {["Master's", "Bachelor's"].map((l) => (
              <button
                key={l}
                type="button"
                className={`tl-chip${level === l ? " is-active" : ""}`}
                onClick={() => pickLevel(l)}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="tl-fields">


            <div className="tl-float-group">
              <label>University Name (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Delhi University"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
            </div>

            <div className="tl-float-group">
              <label>College / Institution Name (Optional)</label>
              <input
                type="text"
                placeholder="e.g. St. Stephen's College"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              />
            </div>
          </div>

          <div className="tl-scale-section">
            <h3 className="tl-scale-title">Select Appropriate Grading Scale</h3>
            <div className="tl-scale-radio-list">
              {GRADING_SCALES.map((s) => (
                <label
                  key={s.key}
                  className={`tl-radio-option${scaleKey === s.key ? " is-selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="gradingScale"
                    value={s.key}
                    checked={scaleKey === s.key}
                    onChange={() => pickScale(s.key)}
                  />
                  <span className="tl-radio-custom" />
                  <span className="tl-radio-label">{s.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="tl-wnav">
            <button type="button" className="tl-wnext-red" onClick={() => setStep(1)}>
              Next &gt;
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="tl-wstep">
          <div className="tl-tab-header">
            <button
              type="button"
              className={`tl-tab-btn${entryMode === "semester" ? " is-active" : ""}`}
              onClick={() => setEntryMode("semester")}
            >
              Semester Wise
            </button>
            <button
              type="button"
              className={`tl-tab-btn${entryMode === "subject" ? " is-active" : ""}`}
              onClick={() => setEntryMode("subject")}
            >
              Subject Wise
            </button>
          </div>

          <p className="tl-step2-desc">
            {entryMode === "semester"
              ? "Calculate & enter the aggregate percentage/ cgpa and backlogs from your marksheet for a semester"
              : "Calculate & enter subject credits and marks/cgpa from your marksheet"}
          </p>
          <p className="tl-step2-subdesc">
            {entryMode === "semester"
              ? 'Click the "Add Semester" button to enter another Semester. Please make sure to include the grades/marks listed on your marksheet to get an accurate GPA estimate.'
              : 'Click the "Add Subject" button to enter another Subject. Please make sure to include the grades/marks listed on your marksheet to get an accurate GPA estimate.'}
          </p>

          {entryMode === "semester" ? (
            <div className="tl-table-wrap-upgrad">
              <div className="tl-table-head-black">
                <span>Semesters</span>
                <span>Number of Backlog</span>
                <span>Aggregate Percentage / CGPA</span>
                <span />
              </div>
              <div className="tl-table-rows">
                {semesters.map((sem, idx) => (
                  <div className="tl-table-row-item" key={idx}>
                    <div className="tl-row-field">
                      <input
                        type="text"
                        value={sem.name}
                        onChange={(e) => updateSem(idx, "name", e.target.value)}
                      />
                    </div>
                    <div className="tl-row-field">
                      <input
                        type="number"
                        min="0"
                        value={sem.backlog}
                        onChange={(e) => updateSem(idx, "backlog", Number(e.target.value))}
                      />
                    </div>
                    <div className="tl-row-field">
                      <input
                        type="number"
                        min="0"
                        max={scale.max}
                        step="0.01"
                        placeholder={`0 - ${scale.max}`}
                        value={sem.score}
                        onChange={(e) => updateSem(idx, "score", Number(e.target.value))}
                      />
                    </div>
                    {semesters.length > 1 ? (
                      <button
                        type="button"
                        className="tl-row-remove-btn"
                        onClick={() => removeSem(idx)}
                        title="Remove Semester"
                      >
                        &times;
                      </button>
                    ) : (
                      <span />
                    )}
                  </div>
                ))}
              </div>
              <div className="tl-table-action-row">
                <button
                  type="button"
                  className="tl-add-row-btn"
                  onClick={addSem}
                >
                  ADD SEMESTER
                </button>
              </div>
            </div>
          ) : (
            <div className="tl-table-wrap-upgrad">
              <div className="tl-table-head-black">
                <span>Subject Name</span>
                <span>Credits / Weight</span>
                <span>Marks / CGPA Obtained</span>
                <span />
              </div>
              <div className="tl-table-rows">
                {subjects.map((sub, idx) => (
                  <div className="tl-table-row-item" key={idx}>
                    <div className="tl-row-field">
                      <input
                        type="text"
                        placeholder={`Subject ${idx + 1}`}
                        value={sub.name}
                        onChange={(e) => updateSub(idx, "name", e.target.value)}
                      />
                    </div>
                    <div className="tl-row-field">
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={sub.credits}
                        onChange={(e) => updateSub(idx, "credits", Number(e.target.value))}
                      />
                    </div>
                    <div className="tl-row-field">
                      <input
                        type="number"
                        min="0"
                        max={scale.max}
                        step="0.01"
                        placeholder={`0 - ${scale.max}`}
                        value={sub.score}
                        onChange={(e) => updateSub(idx, "score", Number(e.target.value))}
                      />
                    </div>
                    {subjects.length > 1 ? (
                      <button
                        type="button"
                        className="tl-row-remove-btn"
                        onClick={() => removeSub(idx)}
                        title="Remove Subject"
                      >
                        &times;
                      </button>
                    ) : (
                      <span />
                    )}
                  </div>
                ))}
              </div>
              <div className="tl-table-action-row">
                <button
                  type="button"
                  className="tl-add-row-btn"
                  onClick={addSub}
                >
                  ADD SUBJECT
                </button>
              </div>
            </div>
          )}

          <div className="tl-wnav">
            <button
              type="button"
              className="tl-wback-text"
              onClick={() => setStep(0)}
            >
              &lt; Back
            </button>
            <button
              type="button"
              className="tl-wnext-red"
              disabled={!scoresValid}
              onClick={() => setStep(2)}
            >
              Next &gt;
            </button>
          </div>

          <p className="tl-step-footer-note">
            <strong>Note:</strong> Please follow the instructions carefully in each step. The accuracy of this calculation depends on the information you provide.
          </p>
        </div>
      )}

      {step === 2 && (
        <div className="tl-wstep">
          <div className="tl-consolidated-box">
            <p className="tl-consolidated-text">
              Your consolidated {scale.max === 100 ? "percentage" : "CGPA"} (Combining all subjects/semesters) is{" "}
              <strong>{avg.toFixed(2)}</strong>
            </p>
          </div>

          <div className="tl-wnav">
            <button
              type="button"
              className="tl-wback-text"
              onClick={() => setStep(1)}
            >
              &lt; Back
            </button>
            <button
              type="button"
              className="tl-wnext-red"
              onClick={() => setStep(3)}
            >
              Calculate GPA &gt;
            </button>
          </div>

          <p className="tl-step-footer-note">
            <strong>Note:</strong> Please follow the instructions carefully in each step. The accuracy of this calculation depends on the information you provide.
          </p>
        </div>
      )}

      {step === 3 && (
        <div className="tl-wstep">
          <div className="tl-result tl-result-wide">
            <div className="tl-result-hero">
              <span className="tl-result-label">{leadResult.label}</span>
              <span className="tl-result-big">{leadResult.value}</span>
            </div>
            <div className="tl-result-row">
              <span className="tl-result-label">{trailResult.label}</span>
              <span className="tl-result-value">{trailResult.value}</span>
            </div>
            <div className="tl-result-row">
              <span className="tl-result-label">Consolidated score</span>
              <span className="tl-result-value">
                {avg.toFixed(2)} / {scale.max}
              </span>
            </div>
            <div className="tl-result-row">
              <span className="tl-result-label">Percentage (linear)</span>
              <span className="tl-result-value">{percent.toFixed(1)}%</span>
            </div>
            <div className="tl-result-row tl-result-minor">
              <span className="tl-result-label">
                {level}, {years} years
                {university ? ` — ${university}` : ""}
              </span>
            </div>
          </div>
          <div className="tl-wnav">
            <button type="button" className="tl-wback-text" onClick={() => setStep(2)}>
              &lt; Back
            </button>
            <button type="button" className="tl-wnext-red" onClick={restart}>
              Recalculate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── IELTS band score ─────────────────────────────────────────────── */

/** 9.0, 8.5, … 0.0 — every half band a section can score. */
const IELTS_BANDS = Array.from({ length: 19 }, (_, i) => (18 - i) / 2);

/**
 * The overall band is the mean of the four sections rounded to the nearest
 * half band, with IELTS's published quarter rule: a fraction of .25 rounds
 * up to the half, .75 rounds up to the next whole. 6.125 → 6.0, 6.25 → 6.5,
 * 6.75 → 7.0.
 */
function ieltsOverall(l, r, w, s) {
  const avg = (l + r + w + s) / 4;
  const whole = Math.floor(avg);
  const frac = avg - whole;
  if (frac < 0.25) return whole;
  if (frac < 0.75) return whole + 0.5;
  return whole + 1;
}

function IeltsCalculator() {
  const [bands, setBands] = useState({
    listening: 6.5,
    reading: 6.5,
    writing: 6,
    speaking: 6.5,
  });
  const overall = ieltsOverall(
    bands.listening,
    bands.reading,
    bands.writing,
    bands.speaking
  );
  const set = (k) => (e) =>
    setBands({ ...bands, [k]: Number(e.target.value) });

  return (
    <div className="tl-grid">
      <div className="tl-fields">
        {["listening", "reading", "writing", "speaking"].map((k) => (
          <label key={k} className="tl-cap">
            {k}
            <select value={bands[k]} onChange={set(k)}>
              {IELTS_BANDS.map((b) => (
                <option key={b} value={b}>
                  {b.toFixed(1)}
                </option>
              ))}
            </select>
          </label>
        ))}
        <p className="tl-note">
          The overall band is the average of the four sections, rounded to
          the nearest half band — .25 rounds up to the half, .75 up to the
          next whole. That is the rule the test itself applies.
        </p>
      </div>

      <div className="tl-result">
        <div className="tl-result-hero">
          <span className="tl-result-label">Overall band score</span>
          <span className="tl-result-big">{overall.toFixed(1)}</span>
        </div>
        <div className="tl-result-row">
          <span className="tl-result-label">Section average, unrounded</span>
          <span className="tl-result-value">
            {(
              (bands.listening +
                bands.reading +
                bands.writing +
                bands.speaking) /
              4
            ).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Cost of living ───────────────────────────────────────────────── */

/**
 * Indicative monthly budgets for a single student, in rupees, excluding
 * tuition. Round figures by design: they are starting points the user is
 * expected to edit — every line is an input — not survey data, and the copy
 * under the result says exactly that. Countries match the catalog's nine
 * destinations plus Ireland, which is offered as a destination without
 * catalog programs.
 */
const LIVING_COSTS = {
  "United States": { rent: 60000, food: 25000, transport: 8000, utilities: 12000, other: 15000 },
  "United Kingdom": { rent: 55000, food: 22000, transport: 10000, utilities: 12000, other: 14000 },
  Canada: { rent: 45000, food: 20000, transport: 8000, utilities: 10000, other: 12000 },
  Australia: { rent: 50000, food: 20000, transport: 8000, utilities: 10000, other: 12000 },
  Germany: { rent: 40000, food: 18000, transport: 6000, utilities: 10000, other: 12000 },
  France: { rent: 38000, food: 18000, transport: 6000, utilities: 9000, other: 12000 },
  Ireland: { rent: 48000, food: 18000, transport: 7000, utilities: 10000, other: 12000 },
  Finland: { rent: 35000, food: 17000, transport: 5000, utilities: 9000, other: 11000 },
  UAE: { rent: 40000, food: 16000, transport: 7000, utilities: 8000, other: 10000 },
  Hungary: { rent: 25000, food: 13000, transport: 4000, utilities: 7000, other: 8000 },
};

const COST_LINES = [
  ["rent", "Rent & accommodation"],
  ["food", "Food & groceries"],
  ["transport", "Transport"],
  ["utilities", "Utilities & internet"],
  ["other", "Everything else"],
];

function CostCalculator() {
  const [country, setCountry] = useState("United States");
  const [costs, setCosts] = useState(LIVING_COSTS["United States"]);

  // Switching country resets every line to that country's baseline — edits
  // are per-country tinkering, not a budget to carry between countries.
  const pick = (e) => {
    setCountry(e.target.value);
    setCosts(LIVING_COSTS[e.target.value]);
  };
  const set = (k) => (e) =>
    setCosts({ ...costs, [k]: Math.max(0, Number(e.target.value)) });

  const total = Object.values(costs).reduce((a, b) => a + b, 0);

  return (
    <div className="tl-grid">
      <div className="tl-fields">
        <label>
          Country
          <select value={country} onChange={pick}>
            {Object.keys(LIVING_COSTS).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        {COST_LINES.map(([k, name]) => (
          <label key={k}>
            {name} (₹ / month)
            <input
              type="number"
              min="0"
              step="1000"
              value={costs[k]}
              onChange={set(k)}
            />
          </label>
        ))}
        <p className="tl-note">
          Indicative starting figures for one student, excluding tuition —
          edit any line to match your own plans and the total follows.
        </p>
      </div>

      <div className="tl-result">
        <div className="tl-result-hero">
          <span className="tl-result-label">Estimated monthly total</span>
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
      </div>
    </div>
  );
}

/* ── Education loan EMI ───────────────────────────────────────────── */

/**
 * Standard EMI amortisation: with monthly rate r = annual/12/100 over
 * n months, EMI = P·r·(1+r)ⁿ / ((1+r)ⁿ − 1). Zero interest degrades to
 * simple division rather than 0/0.
 */
function emi(principal, annualRate, years) {
  const n = years * 12;
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / n;
  const growth = Math.pow(1 + r, n);
  return (principal * r * growth) / (growth - 1);
}

function LoanCalculator() {
  const [amount, setAmount] = useState(2000000);
  const [rate, setRate] = useState(10.5);
  const [years, setYears] = useState(7);

  const monthly = emi(amount, rate, years);
  const totalPaid = monthly * years * 12;
  const interest = totalPaid - amount;
  const interestShare = totalPaid > 0 ? (interest / totalPaid) * 100 : 0;

  // Slider and number input share state per field, so either can drive it.
  const field = (label, value, setter, min, max, step, unit) => (
    <label key={label}>
      {label} {unit && <em>({unit})</em>}
      <div className="tl-pair">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setter(Number(e.target.value))}
        />
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setter(Number(e.target.value))}
        />
      </div>
    </label>
  );

  return (
    <div className="tl-grid">
      <div className="tl-fields">
        {field("Loan amount", amount, setAmount, 100000, 20000000, 50000, "₹")}
        {field("Interest rate", rate, setRate, 5, 18, 0.1, "% per year")}
        {field("Tenure", years, setYears, 1, 15, 1, "years")}
        <p className="tl-note">
          Standard EMI arithmetic on a fixed rate. Lenders quote their own
          rates, processing fees and moratorium terms — see the education
          loan page for the partner-bank route.
        </p>
      </div>

      <div className="tl-result">
        <div className="tl-result-hero">
          <span className="tl-result-label">Monthly EMI</span>
          <span className="tl-result-big">{inr(monthly)}</span>
        </div>
        <div className="tl-result-row">
          <span className="tl-result-label">Total interest</span>
          <span className="tl-result-value">{inr(interest)}</span>
        </div>
        <div className="tl-result-row">
          <span className="tl-result-label">Total repaid</span>
          <span className="tl-result-value">{inr(totalPaid)}</span>
        </div>
        {/* Principal vs interest, as one bar: the red stretch is interest. */}
        <div
          className="tl-split"
          role="img"
          aria-label={`Interest is ${interestShare.toFixed(0)}% of the total repaid`}
        >
          <span style={{ width: `${100 - interestShare}%` }} />
          <span className="tl-split-interest" style={{ width: `${interestShare}%` }} />
        </div>
        <div className="tl-split-legend">
          <span>Principal {(100 - interestShare).toFixed(0)}%</span>
          <span>Interest {interestShare.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
}

/* ── CGPA page extras ─────────────────────────────────────────────── */

/**
 * The conversion table is generated from the same two formulas the
 * calculator runs (10-point scale, pass mark 5), so the table and the tool
 * can never disagree. A hand-written table here would be a second copy of
 * the maths waiting to drift.
 */
const CGPA_TABLE = [10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5].map((c) => ({
  cgpa: c.toFixed(1),
  us: ((c / 10) * 4).toFixed(2),
  de: (1 + (3 * (10 - c)) / 5).toFixed(1),
}));

/**
 * The "More about" and FAQ content, ours throughout — the reference has
 * sections on these same well-known topics, but every sentence here is
 * written for this site, and where it names a method it names the one this
 * calculator actually uses.
 */
const CGPA_SECTIONS = [
  {
    title: "CGPA to GPA conversion table",
    body: (
      <>
        <p>
          On a 10-point CGPA scale with a pass mark of 5, the two conversions
          this calculator runs land here:
        </p>
        <div className="tl-table-wrap">
          <table className="tl-table">
            <thead>
              <tr>
                <th>CGPA (10-point)</th>
                <th>US GPA (4.0)</th>
                <th>German grade</th>
              </tr>
            </thead>
            <tbody>
              {CGPA_TABLE.map((r) => (
                <tr key={r.cgpa}>
                  <td>{r.cgpa}</td>
                  <td>{r.us}</td>
                  <td>{r.de}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Remember the German column reads the other way: 1.0 is the best
          grade and 4.0 the last passing one.
        </p>
      </>
    ),
  },
  {
    title: "The formulas this calculator uses",
    body: (
      <>
        <p>
          <strong>US GPA</strong> — a linear map onto the 4.0 scale:
          GPA = (your CGPA ÷ scale maximum) × 4. An 8.2 on a 10-point scale
          becomes (8.2 ÷ 10) × 4 = 3.28.
        </p>
        <p>
          <strong>German grade</strong> — the Modified Bavarian formula:
          grade = 1 + 3 × (maximum − yours) ÷ (maximum − pass mark). An 8 on
          a 10-point scale with a pass mark of 5 becomes 1 + 3 × (2 ÷ 5) =
          2.2. Lower is better, and below the pass mark there is no
          equivalent grade.
        </p>
      </>
    ),
  },
  {
    title: "How grades differ by country",
    body: (
      <ul>
        <li>
          <strong>USA</strong> — 4.0 scale, higher is better; most
          universities also weigh individual courses.
        </li>
        <li>
          <strong>Germany</strong> — 1.0 to 4.0 passing range, and the scale
          runs in reverse: 1.0 is the top grade.
        </li>
        <li>
          <strong>UK</strong> — degree classifications (First, Upper Second
          and so on) rather than a GPA; universities publish their own CGPA
          expectations.
        </li>
        <li>
          <strong>Canada</strong> — mostly 4.0 or 4.33 scales, varying by
          province and university.
        </li>
        <li>
          <strong>Australia</strong> — many universities grade on a 7-point
          scale or a weighted average mark (WAM).
        </li>
      </ul>
    ),
  },
  {
    title: "What is CGPA?",
    body: (
      <p>
        CGPA — cumulative grade point average — is the single number your
        transcript carries for your whole programme so far: the average of
        your semester grade points, in India usually on a 10-point scale.
        It is the figure admissions teams start from when they compare
        applicants from Indian universities.
      </p>
    ),
  },
  {
    title: "What is GPA?",
    body: (
      <p>
        GPA — grade point average — is the same idea on the scale US
        universities use: each course grade maps to points (an A is 4.0),
        and the average, usually weighted by credits, is your GPA. It can
        describe one term or your whole degree, which is why applications
        often ask for both.
      </p>
    ),
  },
  {
    title: "CGPA vs GPA at a glance",
    body: (
      <div className="tl-table-wrap">
        <table className="tl-table">
          <thead>
            <tr>
              <th></th>
              <th>CGPA</th>
              <th>GPA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Scale</td>
              <td>Usually 10-point</td>
              <td>Usually 4.0</td>
            </tr>
            <tr>
              <td>Scope</td>
              <td>Cumulative, whole programme</td>
              <td>Per term or cumulative</td>
            </tr>
            <tr>
              <td>Common in</td>
              <td>India and other 10-point systems</td>
              <td>USA and Canada</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    title: "How to use this calculator",
    body: (
      <ol>
        <li>Pick the country you are applying to above.</li>
        <li>Enter your CGPA.</li>
        <li>
          If your university does not grade out of 10, change the scale
          maximum — and for Germany, the pass mark — to match your
          transcript.
        </li>
        <li>
          Read the result as a first estimate, and confirm against the
          target university&apos;s own conversion guidance before it goes on
          an application.
        </li>
      </ol>
    ),
  },
];

const CGPA_FAQS = [
  {
    q: "Why do universities ask for a GPA conversion?",
    a: "Because applications from dozens of grading systems land on one desk. Converting everything to the scale the university itself grades on lets it compare applicants on one footing.",
  },
  {
    q: "Is one conversion valid for every university?",
    a: "No. Some accept a straight linear conversion, others require a credential evaluation or publish their own tables. The formulas here give you a solid first estimate — the university's own guidance is what counts on the application.",
  },
  {
    q: "Can I do the conversion by hand?",
    a: "Yes — the formulas are in the section above and take a minute with a calculator. The risk isn't the arithmetic, it's using a method the target university doesn't accept, so check theirs first.",
  },
  {
    q: "Does the conversion affect scholarship eligibility?",
    a: "It can. Scholarships often set GPA cutoffs, and a conversion done with the wrong method can put you on the wrong side of one. Where money depends on the number, use the university's or evaluator's official method.",
  },
  {
    q: "Who provides official conversions?",
    a: "Credential evaluation services — WES, ECE and IQAS are the ones universities most often name — issue reports that admissions offices accept as official. Many US and Canadian universities ask for one from international applicants.",
  },
  {
    q: "My transcript shows percentages, not CGPA — what do I enter?",
    a: "Enter the percentage as a score out of 100 and set the scale maximum to 100 — the linear conversion works the same. If your board publishes its own CGPA↔percentage relation (CBSE's ×9.5, for instance), convert with that first for a closer estimate.",
  },
];

/**
 * The CGPA page is fuller than the other three, after the reference's:
 * hero band, a choose-your-country step wired into the calculator's lead
 * result, the explainer accordion (one open at a time, all shut to start)
 * and an FAQ (independently collapsible, all open to start — it is the
 * page's readable content, so it starts readable).
 */
function CgpaPage({ tool }) {
  const searchParams = useSearchParams();
  const countryParam = searchParams?.get("country");

  // Derive mode from URL query param: ?country=USA → "us", ?country=DE → "de"
  const initialMode = countryParam === "DE" ? "de" : countryParam === "USA" ? "us" : null;
  const [mode, setMode] = useState(initialMode || "us");
  const [openSection, setOpenSection] = useState(-1);
  const [closedFaqs, setClosedFaqs] = useState(() => new Set());

  // When a country param is present in the URL, auto-scroll to the calculator
  useEffect(() => {
    if (initialMode) {
      setMode(initialMode);
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        document
          .getElementById("tl-calc")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryParam]);

  // Open country calculator in a NEW TAB when country card is clicked
  const pickCountry = (countryCode) => {
    const urlCode = countryCode === "us" ? "USA" : "DE";
    window.open(`/study-abroad/tools/cgpa-to-gpa?country=${urlCode}`, "_blank");
  };

  const toggleFaq = (i) =>
    setClosedFaqs((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  // Title suffix based on selected country
  const countryTitle = mode === "de" ? "Germany GPA Calculator" : "USA GPA Calculator";
  const countrySubtitle = mode === "de"
    ? "Easy & Quick Conversion of Indian CGPA/Percentage to German Grade"
    : "Easy & Quick Conversion of Indian CGPA/Percentage to USA GPA";

  return (
    <main className="tl-page tl-page-full">
      <section className="tl-hero">
        <div className="tl-inner">
          <Link href="/study-abroad" className="tl-back tl-back-light">
            <FaArrowLeft /> Study Abroad
          </Link>
          <h1 className="tl-hero-title">CGPA to GPA Calculator</h1>
          <p className="tl-hero-sub">
            Turn the CGPA on your transcript into a US 4.0 GPA or a German
            grade in seconds. Pick the country you are applying to, enter
            your score, and take away a clear first estimate for your
            applications.
          </p>
        </div>
      </section>

      <div className="tl-inner tl-body">

        {/* Country-specific title shown at top when ?country= param is in URL */}
        {initialMode && (
          <div className="tl-country-selected-header">
            <h2 className="tl-section-title tl-center">{countryTitle}</h2>
            <p className="tl-country-subtitle tl-center">{countrySubtitle}</p>
          </div>
        )}

        <h2 className="tl-section-title">Select the country</h2>
        <div className="tl-country-grid">
          <button
            type="button"
            className={`tl-country-card tl-country-us${mode === "us" && initialMode === "us" ? " is-active" : ""
              }`}
            onClick={() => pickCountry("us")}
            aria-pressed={mode === "us" && initialMode === "us"}
          >
            <span className="tl-country-name">
              USA
              <img src="/study-abroad/flags/united-states.svg" alt="" />
            </span>
            <span className="tl-country-cta">Calculate now</span>
          </button>
          <button
            type="button"
            className={`tl-country-card tl-country-de${mode === "de" && initialMode === "de" ? " is-active" : ""
              }`}
            onClick={() => pickCountry("de")}
            aria-pressed={mode === "de" && initialMode === "de"}
          >
            <span className="tl-country-name">
              Germany
              <img src="/study-abroad/flags/germany.svg" alt="" />
            </span>
            <span className="tl-country-cta">Calculate now</span>
          </button>
        </div>

        <div className="tl-card" id="tl-calc">
          <CgpaWizard mode={mode} />
        </div>

        <h2 className="tl-section-title">More about CGPA to GPA</h2>
        <div className="tl-acc">
          {CGPA_SECTIONS.map((s, i) => (
            <div
              key={s.title}
              className={`tl-acc-item${openSection === i ? " is-open" : ""}`}
            >
              <h3 className="tl-acc-head">
                <button
                  type="button"
                  aria-expanded={openSection === i}
                  onClick={() => setOpenSection(openSection === i ? -1 : i)}
                >
                  {s.title} <FaChevronDown />
                </button>
              </h3>
              {openSection === i && <div className="tl-acc-body">{s.body}</div>}
            </div>
          ))}
        </div>

        <h2 className="tl-section-title tl-center">
          Frequently Asked Questions
        </h2>
        <div className="tl-faq">
          {CGPA_FAQS.map((f, i) => (
            <div
              key={f.q}
              className={`tl-faq-item${closedFaqs.has(i) ? "" : " is-open"}`}
            >
              <h3 className="tl-faq-q">
                <button
                  type="button"
                  aria-expanded={!closedFaqs.has(i)}
                  onClick={() => toggleFaq(i)}
                >
                  <span aria-hidden="true">Q.</span> {f.q}{" "}
                  {closedFaqs.has(i) ? <FaPlus /> : <FaMinus />}
                </button>
              </h3>
              {!closedFaqs.has(i) && <p className="tl-faq-a">{f.a}</p>}
            </div>
          ))}
        </div>

        <MoreTools current={tool.slug} />
      </div>
    </main>
  );
}

/* ── Page shell ───────────────────────────────────────────────────── */

function MoreTools({ current }) {
  return (
    <div className="tl-more">
      <h2>More free tools</h2>
      <div className="tl-more-row">
        {studyAbroadTools
          .filter((t) => t.slug !== current)
          .map((t) => (
            <Link
              key={t.slug}
              href={`/study-abroad/tools/${t.slug}`}
              className="tl-more-link"
            >
              {t.name} Calculator <FaChevronRight />
            </Link>
          ))}
      </div>
    </div>
  );
}

const CALCULATORS = {
  "cgpa-to-gpa": CgpaPage,
  "ielts-band-score": IeltsCalculator,
  "cost-of-living": CostCalculator,
  "education-loan": LoanCalculator,
};

export default function ToolsClient({ slug }) {
  const tool = studyAbroadTools.find((t) => t.slug === slug);

  // The CGPA page carries the reference's full structure — hero, country
  // step, explainers, FAQ — so it has a layout of its own. The other three
  // keep the plain shell.
  if (slug === "cgpa-to-gpa") return <CgpaPage tool={tool} />;

  const Calculator = CALCULATORS[slug];

  return (
    <main className="tl-page">
      <div className="tl-inner">
        <Link href="/study-abroad" className="tl-back">
          <FaArrowLeft /> Study Abroad
        </Link>

        <h1 className="tl-title">
          {tool.name} <span className="tl-accent">Calculator</span>
        </h1>
        <p className="tl-sub">{tool.description}</p>

        <div className="tl-card">
          <Calculator />
        </div>

        <MoreTools current={slug} />
      </div>
    </main>
  );
}
