"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaChevronLeft,
  FaGraduationCap,
  FaUserGraduate,
  FaPeopleRoof,
  FaHeart,
  FaUserGroup,
  FaHandshake,
  FaUser,
  FaPiggyBank,
  FaHouseChimney,
  FaMapLocationDot,
  FaBan,
} from "react-icons/fa6";
import { COST_COUNTRIES } from "@/lib/studyAbroadTools";
import "../tools.css";

/**
 * The education-loan eligibility form, after the reference's
 * /calculator/education-loan/<country> pages (checked against its shipped
 * bundle 2026-08-24). Unlike the cost wizard this is a single card, not a
 * stepper: back chevron + centred title, then the questions stacked —
 * education level, co-applicant, income and expense inputs, collateral,
 * collateral net worth — and a "Calculate my Loan" button. Question and
 * error texts match the reference verbatim (spelling normalised:
 * "Self- sponsored" → "Self-sponsored", "land" → "Land"); its option
 * images are lead-magnet PNGs, replaced with icons; its result comes from
 * a gated API behind a signup form, replaced with the open arithmetic
 * below.
 *
 * Our estimate, all indicative and said so on the result:
 * - Disposable income = co-applicant income − expenses; banks typically
 *   size EMIs to a share of that, taken here as 50%.
 * - Repayment capacity = the principal whose EMI at the assumed rate over
 *   10 years equals that budget (standard amortisation, inverted).
 * - With collateral: secured rate 9.5%, and lenders cap at a
 *   loan-to-value of ~75% of the asset's net worth — the headline is the
 *   lower of capacity and that cap. Without: unsecured rate 11.5%,
 *   headline is capacity alone.
 */

/** ₹12,34,567 — Indian digit grouping, no decimals. */
const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

const round10k = (n) => Math.round(n / 10000) * 10000;

const SECURED_RATE = 9.5;
const UNSECURED_RATE = 11.5;
const TENURE_YEARS = 10;
const EMI_SHARE = 0.5;
const LTV = 0.75;

/** EMI = P·r·(1+r)ⁿ / ((1+r)ⁿ − 1); zero rate degrades to division. */
function emiFor(principal, annualRate, years) {
  const n = years * 12;
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / n;
  const growth = Math.pow(1 + r, n);
  return (principal * r * growth) / (growth - 1);
}

/** The same formula solved for P: the principal a given EMI can carry. */
function principalFor(emiBudget, annualRate, years) {
  const n = years * 12;
  const r = annualRate / 12 / 100;
  if (r === 0) return emiBudget * n;
  const growth = Math.pow(1 + r, n);
  return (emiBudget * (growth - 1)) / (r * growth);
}

const LEVELS = [
  { id: "ug", name: "Undergraduate", Icon: FaUserGraduate },
  { id: "pg", name: "Postgraduate", Icon: FaGraduationCap },
];

const APPLICANTS = [
  { id: "parents", name: "Parents", Icon: FaPeopleRoof },
  { id: "spouse", name: "Spouse", Icon: FaHeart },
  { id: "siblings", name: "Siblings", Icon: FaUserGroup },
  { id: "other", name: "Other (Blood relation)", Icon: FaHandshake },
  { id: "self", name: "Self-sponsored", Icon: FaUser },
];

const COLLATERALS = [
  { id: "fd", name: "Fixed Deposit", Icon: FaPiggyBank },
  { id: "property", name: "Property", Icon: FaHouseChimney },
  { id: "land", name: "Land", Icon: FaMapLocationDot },
  { id: "none", name: "No collateral available", Icon: FaBan },
];

function OptionGroup({ q, options, value, onPick }) {
  return (
    <div className="tl-loan-q">
      <p className="tl-loan-qhead">{q}</p>
      <div className="tl-loan-opts">
        {options.map(({ id, name, Icon }) => (
          <button
            key={id}
            type="button"
            className={`tl-loan-opt${value === id ? " is-active" : ""}`}
            aria-pressed={value === id}
            onClick={() => onPick(id)}
          >
            <Icon aria-hidden="true" />
            <span>{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function LoanWizardClient({ slug }) {
  const router = useRouter();
  const country = COST_COUNTRIES.find((c) => c.slug === slug);

  const [level, setLevel] = useState(null);
  const [applicant, setApplicant] = useState(null);
  const [collateral, setCollateral] = useState(null);
  const [income, setIncome] = useState(20000);
  const [expense, setExpense] = useState(0);
  const [netWorth, setNetWorth] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const incomeOk = income >= 20000;
  const expenseOk = expense < income;
  const secured = collateral && collateral !== "none";
  const worthOk = !secured || netWorth > 0;
  const ready =
    Boolean(level && applicant && collateral) && incomeOk && expenseOk && worthOk;

  const rate = secured ? SECURED_RATE : UNSECURED_RATE;
  const emiBudget = Math.max(0, (income - expense) * EMI_SHARE);
  const capacity = principalFor(emiBudget, rate, TENURE_YEARS);
  const collateralCap = secured ? netWorth * LTV : null;
  const eligible = round10k(
    secured ? Math.min(capacity, collateralCap) : capacity
  );

  const levelName = LEVELS.find((l) => l.id === level)?.name;
  const applicantName = APPLICANTS.find((a) => a.id === applicant)?.name;
  const collateralName = COLLATERALS.find((c) => c.id === collateral)?.name;

  const num = (setter) => (e) =>
    setter(Math.max(0, Number(e.target.value) || 0));

  return (
    <main className="tl-page tl-page-full">
      <section className="tl-hero">
        <div className="tl-inner tl-hero-grid">
          <div className="tl-hero-copy">
            <Link
              href="/study-abroad/tools/education-loan"
              className="tl-back tl-back-light"
            >
              <FaArrowLeft /> Education Loan
            </Link>
            <h1 className="tl-hero-title">
              {country.card} Education Loan Calculator
            </h1>
            <p className="tl-hero-sub">
              Tell us about your co-applicant and collateral, and get an
              indicative loan amount and EMI for studying in {country.key} —
              before you talk to a bank.
            </p>
          </div>
          <img
            className="tl-hero-art"
            src="/study-abroad/tools/cgpa-hero.svg"
            alt=""
          />
        </div>
      </section>

      <div className="tl-loan-wrap">
        {!showResult ? (
          <div className="tl-card tl-loan-card">
            <div className="tl-loan-top">
              <button
                type="button"
                className="tl-exp-back"
                onClick={() => router.push("/study-abroad/tools/education-loan")}
                aria-label="Back to country selection"
              >
                <FaChevronLeft />
              </button>
              <h2 className="tl-loan-title">Education Loan Calculator</h2>
            </div>

            <OptionGroup
              q="Select your Education level"
              options={LEVELS}
              value={level}
              onPick={setLevel}
            />

            <OptionGroup
              q="Who will be your co-applicant"
              options={APPLICANTS}
              value={applicant}
              onPick={setApplicant}
            />

            <div className="tl-loan-input-row">
              <label htmlFor="loan-income">Co-applicant monthly income</label>
              <div className={`tl-loan-input${!incomeOk ? " has-error" : ""}`}>
                <span>₹</span>
                <input
                  id="loan-income"
                  type="number"
                  min="0"
                  step="1000"
                  value={income}
                  onChange={num(setIncome)}
                />
              </div>
            </div>
            {!incomeOk && (
              <p className="tl-loan-err">Minimum value allowed is ₹20,000</p>
            )}

            <div className="tl-loan-input-row">
              <label htmlFor="loan-expense">Co-applicant monthly expense</label>
              <div className={`tl-loan-input${!expenseOk ? " has-error" : ""}`}>
                <span>₹</span>
                <input
                  id="loan-expense"
                  type="number"
                  min="0"
                  step="1000"
                  value={expense}
                  onChange={num(setExpense)}
                />
              </div>
            </div>
            {!expenseOk && (
              <p className="tl-loan-err">
                Value should be less than monthly income
              </p>
            )}

            <OptionGroup
              q="What will be your preferred collateral"
              options={COLLATERALS}
              value={collateral}
              onPick={setCollateral}
            />

            <div className="tl-loan-input-row">
              <label htmlFor="loan-worth">Net worth of collateral asset</label>
              <div
                className={`tl-loan-input${
                  secured && netWorth <= 0 ? " has-error" : ""
                }`}
              >
                {collateral !== "none" && <span>₹</span>}
                {collateral === "none" ? (
                  <input type="text" value="N/A" disabled readOnly />
                ) : (
                  <input
                    id="loan-worth"
                    type="number"
                    min="0"
                    step="100000"
                    value={netWorth}
                    onChange={num(setNetWorth)}
                  />
                )}
              </div>
            </div>
            {secured && netWorth <= 0 && (
              <p className="tl-loan-err">Collateral asset Required</p>
            )}

            <div className="tl-loan-cta">
              <button
                type="button"
                className="tl-wnext-red"
                disabled={!ready}
                onClick={() => setShowResult(true)}
              >
                Calculate my Loan
              </button>
            </div>
          </div>
        ) : (
          <div className="tl-card tl-loan-card">
            <div className="tl-loan-top">
              <button
                type="button"
                className="tl-exp-back"
                onClick={() => setShowResult(false)}
                aria-label="Back to the form"
              >
                <FaChevronLeft />
              </button>
              <h2 className="tl-loan-title">
                Your indicative loan estimate
              </h2>
            </div>

            <div className="tl-result tl-result-wide">
              <div className="tl-result-hero">
                <span className="tl-result-label">
                  Loan amount you could be eligible for
                </span>
                <span className="tl-result-big">{inr(eligible)}</span>
              </div>
              <div className="tl-result-row">
                <span className="tl-result-label">Monthly EMI on that amount</span>
                <span className="tl-result-value">
                  {inr(emiFor(eligible, rate, TENURE_YEARS))}
                </span>
              </div>
              <div className="tl-result-row">
                <span className="tl-result-label">Assumed rate & tenure</span>
                <span className="tl-result-value">
                  {rate}% · {TENURE_YEARS} years
                </span>
              </div>
              <div className="tl-result-row">
                <span className="tl-result-label">
                  EMI budget (50% of disposable income)
                </span>
                <span className="tl-result-value">{inr(emiBudget)}</span>
              </div>
              {secured && (
                <div className="tl-result-row">
                  <span className="tl-result-label">
                    Collateral cap (75% of net worth)
                  </span>
                  <span className="tl-result-value">{inr(collateralCap)}</span>
                </div>
              )}
              <div className="tl-result-row tl-result-minor">
                <span className="tl-result-label">
                  {[levelName, applicantName, collateralName]
                    .filter(Boolean)
                    .join(" · ")}{" "}
                  · {country.key}
                </span>
              </div>
            </div>

            <p className="tl-note tl-loan-note">
              An indicative estimate from your inputs, not an offer — lenders
              apply their own credit rules, margins and moratorium terms. See
              the <Link href="/education-loan">education loan page</Link> for
              the partner-bank route.
            </p>

            <div className="tl-exp-actions">
              <button
                type="button"
                className="tl-wnext-red"
                onClick={() => setShowResult(false)}
              >
                Adjust inputs
              </button>
              <Link
                href="/study-abroad/tools/education-loan"
                className="tl-exp-change"
              >
                Change country
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
