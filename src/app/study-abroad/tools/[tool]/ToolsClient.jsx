"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FaChevronRight,
  FaChevronDown,
  FaArrowLeft,
  FaMinus,
  FaPlus,
} from "react-icons/fa6";
import {
  studyAbroadTools,
  LIVING_COSTS,
  COST_LINES,
  COST_COUNTRIES,
} from "@/lib/studyAbroadTools";
import "./tools.css";

/**
 * The four calculators behind the /study-abroad tools band. One client
 * component switching on the route's slug rather than four route folders:
 * they share the result-panel layout and the CSS. All four pages carry
 * the reference's page structure (purple hero, then the tool); cost and
 * loan send their country cards on to per-country pages under
 * [tool]/[country].
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
 * gone. Steps, matching the reference's exactly (checked against its
 * shipped bundle 2026-08-24 — it has no contact/OTP gate in this tool):
 * the degree (level, duration, university, grading scale) → semester- or
 * subject-wise scores → the consolidated score → the scorecard. `mode`
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
      <h3 className="tl-calc-card-title">Calculate your GPA</h3>

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
              <label>Duration of Degree</label>
              <select
                value={years}
                onChange={(e) => pickYears(Number(e.target.value))}
              >
                {DURATION_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Year" : "Years"}
                  </option>
                ))}
              </select>
            </div>

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
            <div className="tl-table-wrap-wizard">
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
            <div className="tl-table-wrap-wizard">
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

/**
 * Raw-score → band conversion for the two machine-marked sections, after the
 * published IELTS indicative tables (Listening, and Academic Reading — the
 * two diverge below band 8). Each row is [minimum raw score, band]; first
 * match on the way down wins. Speaking and Writing have no raw scores —
 * examiners award the band directly — which is why the form asks for those
 * two as bands, exactly as the reference's calculator does.
 */
const LISTENING_TO_BAND = [
  [39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6],
  [18, 5.5], [16, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [0, 2],
];
const READING_TO_BAND = [
  [39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6],
  [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [0, 2],
];
const rawToBand = (table, raw) => table.find(([min]) => raw >= min)[1];

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
  const [fields, setFields] = useState({
    listening: "",
    reading: "",
    speaking: "",
    writing: "",
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const set = (k) => (e) => {
    setFields((prev) => ({ ...prev, [k]: e.target.value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
    // A shown result no longer matches the inputs the moment one changes.
    setResult(null);
  };

  const submit = () => {
    const next = {};
    const listening = Number(fields.listening);
    const reading = Number(fields.reading);
    const speaking = Number(fields.speaking);
    const writing = Number(fields.writing);

    const rawOk = (v, s) =>
      s.trim() !== "" && Number.isInteger(v) && v >= 0 && v <= 40;
    // Bands only come in halves; 6.3 is a typo, not a score.
    const bandOk = (v, s) =>
      s.trim() !== "" && v >= 0 && v <= 9 && v * 2 === Math.round(v * 2);

    if (!rawOk(listening, fields.listening))
      next.listening = "Enter a whole score from 0 to 40";
    if (!rawOk(reading, fields.reading))
      next.reading = "Enter a whole score from 0 to 40";
    if (!bandOk(speaking, fields.speaking))
      next.speaking = "Enter a band from 0 to 9, in half bands";
    if (!bandOk(writing, fields.writing))
      next.writing = "Enter a band from 0 to 9, in half bands";

    setErrors(next);
    if (Object.keys(next).length) return;

    const l = rawToBand(LISTENING_TO_BAND, listening);
    const r = rawToBand(READING_TO_BAND, reading);
    setResult({
      sections: {
        Listening: l,
        Reading: r,
        Speaking: speaking,
        Writing: writing,
      },
      average: (l + r + speaking + writing) / 4,
      overall: ieltsOverall(l, r, writing, speaking),
    });
  };

  return (
    <div className="tl-ielts">
      <div className="tl-ielts-panels">
        <section className="tl-ielts-panel">
          <h2 className="tl-ielts-panel-title">Exam Score</h2>
          <div className="tl-ielts-panel-fields">
            <div
              className={`tl-ielts-field${errors.listening ? " has-error" : ""}`}
            >
              <label htmlFor="ielts-listening">Listening Score (Out of 40)</label>
              <input
                id="ielts-listening"
                type="number"
                inputMode="numeric"
                min="0"
                max="40"
                step="1"
                placeholder="Enter your score (E.g: 34)"
                value={fields.listening}
                onChange={set("listening")}
              />
              {errors.listening && (
                <span className="tl-ielts-error">{errors.listening}</span>
              )}
            </div>
            <div
              className={`tl-ielts-field${errors.reading ? " has-error" : ""}`}
            >
              <label htmlFor="ielts-reading">Reading Score (Out of 40)</label>
              <input
                id="ielts-reading"
                type="number"
                inputMode="numeric"
                min="0"
                max="40"
                step="1"
                placeholder="Enter your score (E.g: 34)"
                value={fields.reading}
                onChange={set("reading")}
              />
              {errors.reading && (
                <span className="tl-ielts-error">{errors.reading}</span>
              )}
            </div>
          </div>
        </section>

        <section className="tl-ielts-panel">
          <h2 className="tl-ielts-panel-title">Band Score</h2>
          <div className="tl-ielts-panel-fields">
            <div
              className={`tl-ielts-field${errors.speaking ? " has-error" : ""}`}
            >
              <label htmlFor="ielts-speaking">Speaking Band (Out of 9)</label>
              <input
                id="ielts-speaking"
                type="number"
                inputMode="decimal"
                min="0"
                max="9"
                step="0.5"
                placeholder="Enter your band (E.g: 6.5)"
                value={fields.speaking}
                onChange={set("speaking")}
              />
              {errors.speaking && (
                <span className="tl-ielts-error">{errors.speaking}</span>
              )}
            </div>
            <div
              className={`tl-ielts-field${errors.writing ? " has-error" : ""}`}
            >
              <label htmlFor="ielts-writing">Writing Band (Out of 9)</label>
              <input
                id="ielts-writing"
                type="number"
                inputMode="decimal"
                min="0"
                max="9"
                step="0.5"
                placeholder="Enter your band (E.g: 6.5)"
                value={fields.writing}
                onChange={set("writing")}
              />
              {errors.writing && (
                <span className="tl-ielts-error">{errors.writing}</span>
              )}
            </div>
          </div>
        </section>
      </div>

      <div className="tl-ielts-submit">
        <button type="button" className="tl-wnext-red" onClick={submit}>
          Submit
        </button>
      </div>

      {result && (
        <div className="tl-ielts-result">
          <span className="tl-ielts-result-label">Overall Band Score</span>
          <span className="tl-ielts-result-big">
            {result.overall.toFixed(1)}
          </span>
          <div className="tl-ielts-result-rows">
            {Object.entries(result.sections).map(([name, band]) => (
              <div key={name} className="tl-ielts-result-row">
                <span>{name}</span>
                <strong>{band.toFixed(1)}</strong>
              </div>
            ))}
            <div className="tl-ielts-result-row">
              <span>Average, unrounded</span>
              <strong>{result.average.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      )}

      <p className="tl-note">
        Listening and Reading are converted from your raw score to a band
        using the published indicative tables (Academic Reading); Speaking
        and Writing are already bands. The overall band is the average of
        the four sections, rounded to the nearest half band — .25 rounds up
        to the half, .75 up to the next whole. That is the rule the test
        itself applies.
      </p>
    </div>
  );
}

/**
 * The IELTS page mirrors the reference's structure the same way the CGPA
 * page does: purple hero with the stationery illustration (the CGPA hero
 * art is the same drawing the reference uses on this page too), then the
 * calculator card on white.
 */
function IeltsPage() {
  return (
    <main className="tl-page tl-page-full">
      <section className="tl-hero">
        <div className="tl-inner tl-hero-grid">
          <div className="tl-hero-copy">
            <Link href="/study-abroad" className="tl-back tl-back-light">
              <FaArrowLeft /> Study Abroad
            </Link>
            <h1 className="tl-hero-title">IELTS Band Score Calculator</h1>
            <p className="tl-hero-sub">
              Our IELTS Band Score Calculator tool is designed with the
              objective of providing you with a close estimation of your
              overall band score.
            </p>
          </div>
          <img
            className="tl-hero-art"
            src="/study-abroad/tools/cgpa-hero.svg"
            alt=""
          />
        </div>
      </section>

      <div className="tl-inner tl-body">
        <div className="tl-card">
          <IeltsCalculator />
        </div>
        <MoreTools current="ielts-band-score" />
      </div>
    </main>
  );
}

/* ── Cost of living ───────────────────────────────────────────────── */

/*
 * The data (LIVING_COSTS, COST_LINES, COST_COUNTRIES) lives in
 * lib/studyAbroadTools.js, shared with the per-country wizard pages at
 * /study-abroad/tools/cost-of-living/[country] — the chooser below only
 * links there; the calculator itself runs inside the wizard.
 */

/**
 * The by-country table is summed from the same LIVING_COSTS rows the
 * calculator runs on, so the table and the tool can never disagree —
 * same principle as CGPA_TABLE below.
 */
const COST_TABLE = COST_COUNTRIES.map(({ key }) => ({
  name: key,
  total: Object.values(LIVING_COSTS[key]).reduce((a, b) => a + b, 0),
}));

/**
 * "More about" content, ours throughout — the reference has sections on
 * the same well-known topics, but every sentence here is written for this
 * site and describes what this calculator actually does.
 */
const COST_SECTIONS = [
  {
    title: "What is a Cost of Living Calculator?",
    body: (
      <p>
        A cost of living calculator estimates what everyday life — rent,
        food, transport, utilities and the rest — costs in a destination,
        before tuition. Comparing those budgets side by side is often what
        settles a shortlist: two countries with similar programmes can
        differ by lakhs a year in living costs alone.
      </p>
    ),
  },
  {
    title: "What the Estimate Covers",
    body: (
      <>
        <p>
          Each country starts from an indicative monthly budget for one
          student, split into five lines:
        </p>
        <ul>
          <li>Rent &amp; accommodation</li>
          <li>Food &amp; groceries</li>
          <li>Transport</li>
          <li>Utilities &amp; internet</li>
          <li>Everything else — phone, books, leisure, toiletries</li>
        </ul>
        <p>
          Tuition is deliberately excluded: it varies by university and
          programme, not by country. Every line is an input — the figures
          are starting points to edit, not survey data.
        </p>
      </>
    ),
  },
  {
    title: "Monthly Living Costs by Country",
    body: (
      <>
        <div className="tl-table-wrap">
          <table className="tl-table">
            <thead>
              <tr>
                <th>Country</th>
                <th>Indicative monthly total</th>
                <th>Per year</th>
              </tr>
            </thead>
            <tbody>
              {COST_TABLE.map((r) => (
                <tr key={r.name}>
                  <td>{r.name}</td>
                  <td>{inr(r.total)}</td>
                  <td>{inr(r.total * 12)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Starting figures in rupees for one student, excluding tuition —
          your city, accommodation style and the exchange rate all move
          them, which is why the calculator lets you edit every line.
        </p>
      </>
    ),
  },
  {
    title: "How to Use This Calculator",
    body: (
      <ol>
        <li>Pick your destination country above and press Calculate now.</li>
        <li>
          Answer a few quick questions about how you plan to live —
          accommodation, food, transport, activities.
        </li>
        <li>
          Your answers shape an indicative monthly budget; edit any line of
          it and the monthly and yearly totals follow as you type.
        </li>
        <li>
          Treat the result as a planning estimate: your city, accommodation
          and lifestyle set the real number.
        </li>
      </ol>
    ),
  },
];

/**
 * The cost page carries the reference's structure the way the CGPA page
 * does: purple hero, then the choose-your-country card grid. Unlike the
 * CGPA page's same-page ?country= reveal, "Calculate now" here opens the
 * country's own wizard page at /study-abroad/tools/cost-of-living/<slug>
 * — a whole new page, on the client's word (2026-08-24), matching the
 * reference's /expense-calculator/AUS/ flow. The explainer accordion
 * rides the grey band at the end.
 */
function CostPage({ tool }) {
  const [openSection, setOpenSection] = useState(-1);

  return (
    <main className="tl-page tl-page-full">
      <section className="tl-hero">
        <div className="tl-inner tl-hero-grid">
          <div className="tl-hero-copy">
            <Link href="/study-abroad" className="tl-back tl-back-light">
              <FaArrowLeft /> Study Abroad
            </Link>
            <h1 className="tl-hero-title">Cost of Living Calculator</h1>
            <p className="tl-hero-sub">
              Choosing between study destinations often comes down to what
              each one costs to live in. Pick a country below, answer a few
              quick questions about how you plan to live, and get an
              indicative monthly budget for one student, in rupees.
            </p>
          </div>
          <img
            className="tl-hero-art"
            src="/study-abroad/tools/cgpa-hero.svg"
            alt=""
          />
        </div>
      </section>

      <div className="tl-inner tl-body">
        <h2 className="tl-section-title">
          Select your preferred country to study abroad
        </h2>
        <div className="tl-country-grid tl-country-grid-flags">
          {COST_COUNTRIES.map((c) => (
            <Link
              key={c.slug}
              href={`/study-abroad/tools/cost-of-living/${c.slug}`}
              className="tl-country-card"
            >
              <span className="tl-country-body">
                <span className="tl-country-name">{c.card}</span>
                <span className="tl-country-cta">Calculate now</span>
              </span>
              <img
                className="tl-country-flag"
                src={`/study-abroad/flags/${c.slug}.svg`}
                alt=""
              />
            </Link>
          ))}
        </div>
      </div>

      <section className="tl-about">
        <div className="tl-inner">
          <h2 className="tl-about-title">
            More About the Cost of Living Calculator
          </h2>
          <div className="tl-acc">
            {COST_SECTIONS.map((s, i) => (
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
                {openSection === i && (
                  <div className="tl-acc-body">{s.body}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="tl-inner tl-body">
        <MoreTools current={tool.slug} />
      </div>
    </main>
  );
}

/* ── Education loan ───────────────────────────────────────────────── */

/**
 * The loan chooser mirrors the cost-of-living one — purple hero, then the
 * choose-your-country cards, each opening the country's eligibility form
 * at /study-abroad/tools/education-loan/<slug> (client's word,
 * 2026-08-24, matching the reference's /calculator/education-loan/AUS/
 * flow). This replaced the earlier single-page EMI slider calculator; the
 * EMI arithmetic now lives in the wizard's result.
 */
function LoanPage({ tool }) {
  return (
    <main className="tl-page tl-page-full">
      <section className="tl-hero">
        <div className="tl-inner tl-hero-grid">
          <div className="tl-hero-copy">
            <Link href="/study-abroad" className="tl-back tl-back-light">
              <FaArrowLeft /> Study Abroad
            </Link>
            <h1 className="tl-hero-title">Education Loan Calculator</h1>
            <p className="tl-hero-sub">
              Planning to fund your studies with a loan? Pick a country, tell
              us about your co-applicant and collateral, and get an
              indicative loan amount and EMI — before you talk to a bank.
            </p>
          </div>
          <img
            className="tl-hero-art"
            src="/study-abroad/tools/cgpa-hero.svg"
            alt=""
          />
        </div>
      </section>

      <div className="tl-inner tl-body">
        <h2 className="tl-section-title">
          Select your preferred country to study abroad
        </h2>
        <div className="tl-country-grid tl-country-grid-flags">
          {COST_COUNTRIES.map((c) => (
            <Link
              key={c.slug}
              href={`/study-abroad/tools/education-loan/${c.slug}`}
              className="tl-country-card"
            >
              <span className="tl-country-body">
                <span className="tl-country-name">{c.card}</span>
                <span className="tl-country-cta">Calculate now</span>
              </span>
              <img
                className="tl-country-flag"
                src={`/study-abroad/flags/${c.slug}.svg`}
                alt=""
              />
            </Link>
          ))}
        </div>

        <MoreTools current={tool.slug} />
      </div>
    </main>
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
    title: "CGPA to GPA Conversion Table",
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
    title: "CGPA to GPA Formula",
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
    title: "CGPA to GPA Conversion: Country wise",
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
    title: "CGPA vs GPA at a Glance",
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
    title: "How to Use This Calculator",
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

  // "Calculate now" navigates to the country's calculator in the same tab,
  // as the reference does — the ?country= URL carries the choice, the
  // effect above then reveals the wizard and scrolls to it. (This replaced
  // a window.open new-tab on the client's word, 2026-08-24.)
  const router = useRouter();
  const pickCountry = (countryCode) => {
    const urlCode = countryCode === "us" ? "USA" : "DE";
    router.push(`/study-abroad/tools/cgpa-to-gpa?country=${urlCode}`);
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
        <div className="tl-inner tl-hero-grid">
          <div className="tl-hero-copy">
            <Link href="/study-abroad" className="tl-back tl-back-light">
              <FaArrowLeft /> Study Abroad
            </Link>
            <h1 className="tl-hero-title">CGPA to GPA Calculator</h1>
            <p className="tl-hero-sub">
              Calculate your CGPA to GPA instantly! Generate your US or German
              GPA with our user-friendly GPA calculator. Get your estimated
              global academic score in just minutes. Easily convert your
              CGPA/percentage to GPA and streamline your college application
              process.
            </p>
          </div>
          <img
            className="tl-hero-art"
            src="/study-abroad/tools/cgpa-hero.svg"
            alt=""
          />
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
            <span className="tl-country-body">
              <span className="tl-country-name">USA</span>
              <span className="tl-country-cta">Calculate now</span>
            </span>
            <img
              className="tl-country-art"
              src="/study-abroad/tools/usa-liberty.svg"
              alt=""
            />
          </button>
          <button
            type="button"
            className={`tl-country-card tl-country-de${mode === "de" && initialMode === "de" ? " is-active" : ""
              }`}
            onClick={() => pickCountry("de")}
            aria-pressed={mode === "de" && initialMode === "de"}
          >
            <span className="tl-country-body">
              <span className="tl-country-name">Germany</span>
              <span className="tl-country-cta">Calculate now</span>
            </span>
            <img
              className="tl-country-art"
              src="/study-abroad/tools/germany-tower.svg"
              alt=""
            />
          </button>
        </div>

        {/* As in the reference, the wizard appears only once a country is
            chosen — the base page is the chooser, and "Calculate now" opens
            the ?country= variant where this renders (and is scrolled to). */}
        {initialMode && (
          <div className="tl-card" id="tl-calc">
            <CgpaWizard mode={mode} />
          </div>
        )}
      </div>

      {/* Full-bleed grey band, as in the reference: the accordion rides in
          its own section so the tint can run edge to edge while everything
          else keeps the .tl-body gutter. */}
      <section className="tl-about">
        <div className="tl-inner">
          <h2 className="tl-about-title">More About CGPA to GPA Calculator</h2>
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
                {openSection === i && (
                  <div className="tl-acc-body">{s.body}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="tl-inner tl-body">
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

export default function ToolsClient({ slug }) {
  const tool = studyAbroadTools.find((t) => t.slug === slug);

  // All four pages carry the reference's structure — purple hero, then
  // the tool — so each has a layout of its own.
  if (slug === "cgpa-to-gpa") return <CgpaPage tool={tool} />;
  if (slug === "ielts-band-score") return <IeltsPage />;
  if (slug === "cost-of-living") return <CostPage tool={tool} />;
  return <LoanPage tool={tool} />;
}
