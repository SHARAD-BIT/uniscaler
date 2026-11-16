"use client";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { IoSearch } from "react-icons/io5";
import { MAX_UNIVERSITIES } from "@/lib/commonApplicationCatalog";
import { ONLINE_UNIVERSITIES } from "@/lib/onlineUniversities";
import { UNIVERSITY_COURSES } from "@/lib/universityCourses";
import { fetchCollegesForSearch } from "@/lib/collegeSearchClient";
import { publicToken } from "@/lib/publicToken";
import "./styles/commonApplicationForm.css";

/**
 * Common Application Form — UI only.
 *
 * There is no endpoint behind this yet. Nothing in the backend accepts a lead:
 * the closest table is `consultation` (name, email, phone, message) and there is
 * no route for it. Submitting therefore validates and shows the success panel,
 * and says plainly that it has not been sent anywhere — a form that looked like
 * it captured leads while dropping them would be worse than one that is
 * obviously not wired.
 *
 * See COMMON-APPLICATION-FORM-PLAN.md for the schema and endpoints this is
 * shaped to talk to.
 *
 * The mock's "Select Lead Owner" field is deliberately absent: it is an internal
 * CRM field and an applicant should not be assigning ownership of their own
 * lead. The plan has the server stamping it instead.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// The mock offers a country picker. There is no column for a country code and
// every university on the list is Indian, so the prefix is fixed and the field
// takes ten digits.
const PHONE_RE = /^[6-9]\d{9}$/;

const PAGE_SIZE = 8;

// Collapse whitespace and trim — live rows hold values like " Greater Noida"
// and doubled spaces (see CLAUDE.md), and search or dedupe on the raw value
// splits one real thing into several.
const clean = (s) => String(s ?? "").replace(/\s+/g, " ").trim();

// Instant search-as-you-type: every typed word must appear somewhere in the
// name or location. No server round-trip.
const matchesQuery = (query, hay) => {
  const q = clean(query).toLowerCase();
  if (!q) return true;
  return q.split(" ").every((token) => hay.includes(token));
};

// `course` on a college row is a JSON string of {name, duration, content}
// objects, but rows written before the admin panel enforced that shape hold
// plain text — a throw here would take the whole list down.
const parseJsonList = (value) => {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

// Fallback for a university whose real course list is unknown. Same
// placeholder set (and same caveat) as the old bundled catalog: replace with
// real data before this goes in front of anyone.
const MANAGEMENT = [
  "Marketing",
  "Finance",
  "Human Resource Management",
  "Operations",
  "Business Analytics",
];
const COMPUTING = [
  "Data Science",
  "Cyber Security",
  "Cloud Computing",
  "Artificial Intelligence",
];
const GENERIC_COURSES = [
  { name: "MBA", specializations: MANAGEMENT },
  { name: "MCA", specializations: COMPUTING },
  { name: "BBA", specializations: MANAGEMENT },
  { name: "BCA", specializations: COMPUTING },
  {
    name: "M.Com",
    specializations: ["Accounting & Finance", "Banking & Insurance", "Taxation"],
  },
];

// Online mode: the 65 extracted universities, each with the courses it
// actually runs (universityCourses.js). Real course lists carry no
// specialisations, so that picker only appears for the generic fallback.
const ONLINE_LIST = ONLINE_UNIVERSITIES.map((u) => ({
  name: u.name,
  location: u.location,
  courses: (UNIVERSITY_COURSES[u.name] ?? []).map((name) => ({
    name,
    specializations: [],
  })),
  hay: `${u.name} ${u.location}`.toLowerCase(),
}));

const ageFrom = (iso) => {
  const dob = new Date(iso);
  if (Number.isNaN(dob.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age -= 1;
  return age;
};

const CommonApplicationForm = () => {
  const [details, setDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
  });
  // university name -> { course, specialization }
  const [picks, setPicks] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (showPaymentModal && submitted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPaymentModal, submitted]);

  const chosen = useMemo(() => Object.keys(picks), [picks]);
  const atLimit = chosen.length >= MAX_UNIVERSITIES;

  // Mode, search and pagination for the university browser. Regular mode's
  // college list comes from the backend's public fetchCollegeForSearch (blank
  // term = every college) and is fetched once, on first switch.
  const [mode, setMode] = useState("online");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [regular, setRegular] = useState([]);
  // idle -> not asked yet (or Retry pressed), loading, ready, error
  const [regStatus, setRegStatus] = useState("idle");

  // Kicked from the mode switch (and Retry), not from an effect — the fetch
  // is a response to a user action, and the lint setup rejects setState
  // straight inside an effect body.
  const loadRegular = () => {
    setRegStatus("loading");
    fetchCollegesForSearch("")
      .then((data) => {
        if (data.code === 200) {
          const rows = Array.isArray(data.data) ? data.data : [];
          const seen = new Set();
          const list = [];
          for (const item of rows) {
            const name = clean(item.collegeName);
            if (!name) continue;
            // Live rows are untrimmed and inconsistently cased; compare on a
            // normalised key so one real college does not appear twice.
            const key = name.toLowerCase();
            if (seen.has(key)) continue;
            seen.add(key);
            const location = clean(item.location);
            list.push({
              name,
              location,
              courses: parseJsonList(item.course)
                .map((c) => ({ name: clean(c?.name), specializations: [] }))
                .filter((c) => c.name),
              hay: `${name} ${location}`.toLowerCase(),
            });
          }
          setRegular(list);
          setRegStatus("ready");
          return;
        }
        // 401 means both "no rows" and "bad token"; only the latter is an
        // error worth a retry.
        if (data.message === "Invalid Token") {
          setRegular([]);
          setRegStatus("error");
          return;
        }
        setRegular([]);
        setRegStatus("ready");
      })
      .catch((err) => {
        console.error("fetchCollegeForSearch failed:", err);
        setRegular([]);
        setRegStatus("error");
      });
  };

  const switchMode = (next) => {
    setMode(next);
    setQuery("");
    setPage(1);
    // Fetched once; a repeat visit to Regular reuses what already arrived.
    if (next === "regular" && regStatus === "idle") loadRegular();
  };

  const activeList = mode === "online" ? ONLINE_LIST : regular;
  const filtered = useMemo(
    () => activeList.filter((u) => matchesQuery(query, u.hay)),
    [activeList, query]
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  // The filter can shrink the list under the current page number.
  const clampedPage = Math.min(page, pageCount);
  const pageItems = filtered.slice(
    (clampedPage - 1) * PAGE_SIZE,
    clampedPage * PAGE_SIZE
  );
  const listReady = mode === "online" || regStatus === "ready";

  const setField = (name, value) => {
    setDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const toggleUniversity = (university) => {
    setPicks((prev) => {
      const next = { ...prev };
      if (next[university]) {
        delete next[university];
      } else {
        // Guard here as well as on the checkbox: the disabled attribute stops
        // the pointer, not a keyboard or an autofill.
        if (Object.keys(next).length >= MAX_UNIVERSITIES) return prev;
        next[university] = { course: "", specialization: "" };
      }
      return next;
    });
    setErrors((prev) => ({ ...prev, universities: undefined, [university]: undefined }));
  };

  const setCourse = (university, course) => {
    // Specialisations belong to a course, so changing the course has to clear
    // the old one — otherwise a Marketing specialisation survives a switch to
    // MCA and gets submitted against a course that does not offer it.
    setPicks((prev) => ({
      ...prev,
      [university]: { course, specialization: "" },
    }));
    setErrors((prev) => ({ ...prev, [university]: undefined }));
  };

  const setSpecialization = (university, specialization) => {
    setPicks((prev) => ({
      ...prev,
      [university]: { ...prev[university], specialization },
    }));
    setErrors((prev) => ({ ...prev, [university]: undefined }));
  };

  const coursesFor = (university) => {
    const entry =
      ONLINE_LIST.find((u) => u.name === university) ||
      regular.find((u) => u.name === university);
    const list = entry?.courses ?? [];
    return list.length ? list : GENERIC_COURSES;
  };

  const specializationsFor = (university, course) =>
    coursesFor(university).find((c) => c.name === course)?.specializations ??
    [];

  const validate = () => {
    const next = {};
    if (!details.fullName.trim()) next.fullName = "Enter your full name";
    if (!EMAIL_RE.test(details.email.trim())) next.email = "Enter a valid email address";
    if (!PHONE_RE.test(details.phone.trim()))
      next.phone = "Enter a 10-digit mobile number";

    if (!details.dob) {
      next.dob = "Enter your date of birth";
    } else {
      const age = ageFrom(details.dob);
      if (age === null) next.dob = "Enter a valid date";
      else if (age < 15 || age > 70) next.dob = "Date of birth looks incorrect";
    }

    if (chosen.length === 0) {
      next.universities = "Select at least one university";
    } else {
      chosen.forEach((u) => {
        const p = picks[u];
        if (!p.course) next[u] = "Choose a course";
        // Real course lists carry no specialisations — only demand one where
        // there is genuinely something to pick.
        else if (
          specializationsFor(u, p.course).length > 0 &&
          !p.specialization
        )
          next[u] = "Choose a specialization";
      });
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      // Take the user to the first thing that is wrong rather than leaving them
      // to hunt for it in a form this long.
      const firstError = document.querySelector(".caf-field.has-error, .caf-uni.has-error");
      firstError?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    setSubmitted(true);
    setShowPaymentModal(true);
    setPaymentError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProceedPayment = async () => {
    setPaymentLoading(true);
    setPaymentError("");
    try {
      const payload = {
        studentName: details.fullName,
        email: details.email,
        phone: details.phone,
        universities: chosen,
        courses: chosen.map((u) => ({
          university: u,
          course: picks[u]?.course || "",
          specialization: picks[u]?.specialization || "",
        })),
        token: publicToken(),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_PAYMENT_URL}/caf-pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.code === 200 && data.url) {
        window.location.href = data.url;
      } else {
        setPaymentError(data.message || data.detail || "Unable to initiate payment gateway.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setPaymentError("Network error. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="top caf">
        <div className="caf-done">
          <h1>Thanks, {details.fullName.split(" ")[0]}.</h1>
          <p>
            You selected {chosen.length}{" "}
            {chosen.length === 1 ? "university" : "universities"}.
          </p>
          <div className="caf-done-actions">
            <button
              type="button"
              className="caf-submit caf-pay-now-btn"
              onClick={() => setShowPaymentModal(true)}
            >
              Pay Application Fee (INR 1,500)
            </button>
            <button
              type="button"
              className="caf-back-btn"
              onClick={() => setSubmitted(false)}
            >
              Back to the form
            </button>
          </div>
        </div>

        {showPaymentModal && mounted && createPortal(
          <div
            className="caf-modal-overlay"
            onClick={() => setShowPaymentModal(false)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="caf-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="caf-modal-close"
                onClick={() => setShowPaymentModal(false)}
                aria-label="Close modal"
              >
                &times;
              </button>

              <div className="caf-modal-header">
                <span className="caf-modal-badge">Application Summary</span>
                <h2>Complete Your Application</h2>
                <p>Verify your details and proceed to the secure payment window.</p>
              </div>

              <div className="caf-modal-amount-box">
                <div className="caf-amount-label">Total Payable Amount</div>
                <div className="caf-amount-display">
                  <span className="caf-currency-symbol">INR</span>
                  <span className="caf-amount-number">1,500</span>
                </div>
                <div className="caf-amount-note">
                  Application processing fee for {chosen.length} selected {chosen.length === 1 ? "university" : "universities"}
                </div>
              </div>

              <div className="caf-modal-details">
                <div className="caf-detail-row">
                  <span className="caf-detail-label">Applicant:</span>
                  <span className="caf-detail-value">{details.fullName}</span>
                </div>
                <div className="caf-detail-row">
                  <span className="caf-detail-label">Contact:</span>
                  <span className="caf-detail-value">{details.phone} • {details.email}</span>
                </div>
                <div className="caf-detail-row">
                  <span className="caf-detail-label">Universities:</span>
                  <span className="caf-detail-value">{chosen.length} Selected</span>
                </div>
              </div>

              <div className="caf-selected-chips">
                {chosen.map((u) => (
                  <span key={u} className="caf-chip">
                    <strong>{u}</strong>
                    {picks[u]?.course ? ` — ${picks[u].course}` : ""}
                  </span>
                ))}
              </div>

              {paymentError && (
                <div className="caf-modal-error">
                  {paymentError}
                </div>
              )}

              <div className="caf-modal-footer">
                <button
                  type="button"
                  className="caf-pay-action-btn"
                  onClick={handleProceedPayment}
                  disabled={paymentLoading}
                >
                  {paymentLoading ? (
                    <span className="caf-btn-loader">Connecting to Gateway...</span>
                  ) : (
                    <span>Proceed to Pay INR 1,500 &rarr;</span>
                  )}
                </button>
                <div className="caf-modal-trust">
                  <span>🔒 100% Safe & Secure Payment powered by PhonePe</span>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </main>
    );
  }

  return (
    <main className="top caf">
      {/* Full-bleed hero video (2026-08-26). One <video> element only, on the
          client's ask — a second, blurred copy of the same file was here as
          a background fill and got dropped for exactly that reason. The band
          is shorter than this 16:9 footage needs to show uncropped at full
          width, so the video is `contain`-fit (never crops, by definition)
          and the leftover space either side is filled by
          .caf-hero-band::before — a blurred, scaled-up copy of a single
          extracted frame (public/common-application-form-hero-poster.jpg),
          not a second video. Same "blurred background" look as before, one
          decode instead of two. See the CSS for the pseudo-element rule. */}
      <section className="caf-hero-band">
        <video
          className="caf-hero-fg"
          src="/common-application-form-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      </section>

      <header className="caf-head">
        <h1>Common Application Form</h1>
        <p>
          One form for every university on the list. Fill in your details, pick
          up to {MAX_UNIVERSITIES} universities, and choose a course under each.
        </p>
      </header>

      <form className="caf-form" onSubmit={handleSubmit} noValidate>
        <section className="caf-grid">
          <div className={`caf-field${errors.fullName ? " has-error" : ""}`}>
            <label htmlFor="caf-name">
              Full Name<span aria-hidden="true">*</span>
            </label>
            <input
              id="caf-name"
              type="text"
              autoComplete="name"
              placeholder="Full name"
              value={details.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
            />
            {errors.fullName && <span className="caf-error">{errors.fullName}</span>}
          </div>

          <div className={`caf-field${errors.email ? " has-error" : ""}`}>
            <label htmlFor="caf-email">
              Email<span aria-hidden="true">*</span>
            </label>
            <input
              id="caf-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={details.email}
              onChange={(e) => setField("email", e.target.value)}
            />
            {errors.email && <span className="caf-error">{errors.email}</span>}
          </div>

          <div className={`caf-field${errors.phone ? " has-error" : ""}`}>
            <label htmlFor="caf-phone">
              Mobile<span aria-hidden="true">*</span>
            </label>
            <div className="caf-phone">
              <span className="caf-prefix">+91</span>
              <input
                id="caf-phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                placeholder="99999 99999"
                value={details.phone}
                onChange={(e) =>
                  setField("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
                }
              />
            </div>
            {errors.phone && <span className="caf-error">{errors.phone}</span>}
          </div>

          <div className={`caf-field${errors.dob ? " has-error" : ""}`}>
            <label htmlFor="caf-dob">
              Date of Birth<span aria-hidden="true">*</span>
            </label>
            <input
              id="caf-dob"
              type="date"
              value={details.dob}
              onChange={(e) => setField("dob", e.target.value)}
            />
            {errors.dob && <span className="caf-error">{errors.dob}</span>}
          </div>
        </section>

        <section className="caf-unis">
          <div className="caf-unis-head">
            <h2>Select up to {MAX_UNIVERSITIES} universities</h2>
            <span className={`caf-count${atLimit ? " is-full" : ""}`}>
              {chosen.length} of {MAX_UNIVERSITIES} selected
            </span>
          </div>
          {errors.universities && (
            <span className="caf-error caf-error-block">{errors.universities}</span>
          )}

          <div className="caf-mode-row">
            <div className="caf-mode" role="radiogroup" aria-label="Mode">
              <label>
                <input
                  type="radio"
                  name="caf-mode"
                  checked={mode === "online"}
                  onChange={() => switchMode("online")}
                />
                Online
              </label>
              <label>
                <input
                  type="radio"
                  name="caf-mode"
                  checked={mode === "regular"}
                  onChange={() => switchMode("regular")}
                />
                Regular
              </label>
            </div>
            <div className="caf-search">
              <IoSearch aria-hidden="true" />
              <input
                type="search"
                placeholder={
                  mode === "online"
                    ? "Search online universities..."
                    : "Search colleges..."
                }
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          {/* Chosen universities live above the browser with their course
              pickers, so a selection stays visible and editable no matter
              which mode, page or search the list below is on. */}
          {chosen.length > 0 && (
            <div className="caf-picked">
              {chosen.map((name) => {
                const pick = picks[name];
                const specializations = specializationsFor(name, pick.course);
                return (
                  <div
                    key={name}
                    className={`caf-uni is-on${
                      errors[name] ? " has-error" : ""
                    }`}
                  >
                    <div className="caf-picked-head">
                      <span>{name}</span>
                      <button
                        type="button"
                        onClick={() => toggleUniversity(name)}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="caf-uni-selects">
                      <div className="caf-field">
                        <label htmlFor={`course-${name}`}>Course</label>
                        <select
                          id={`course-${name}`}
                          value={pick.course}
                          onChange={(e) => setCourse(name, e.target.value)}
                        >
                          <option value="">Choose</option>
                          {coursesFor(name).map((c) => (
                            <option key={c.name} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Only where there is genuinely something to pick —
                          real course lists carry no specialisations. */}
                      {specializations.length > 0 && (
                        <div className="caf-field">
                          <label htmlFor={`spec-${name}`}>Specialization</label>
                          <select
                            id={`spec-${name}`}
                            value={pick.specialization}
                            onChange={(e) =>
                              setSpecialization(name, e.target.value)
                            }
                          >
                            <option value="">Choose</option>
                            {specializations.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    {errors[name] && (
                      <span className="caf-error">{errors[name]}</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="caf-uni-list">
            {!listReady ? (
              regStatus === "error" ? (
                <p className="caf-list-state">
                  Could not load the college list right now.{" "}
                  <button type="button" onClick={loadRegular}>
                    Retry
                  </button>
                </p>
              ) : (
                <p className="caf-list-state">Loading colleges…</p>
              )
            ) : pageItems.length === 0 ? (
              <p className="caf-list-state">
                Nothing matches &ldquo;{query}&rdquo;.
              </p>
            ) : (
              pageItems.map((u) => {
                const isOn = Boolean(picks[u.name]);
                // Only the unticked ones lock at the limit — a chosen
                // university must always remain untickable, or the user
                // cannot swap one out.
                const locked = !isOn && atLimit;
                return (
                  <div
                    key={u.name}
                    className={`caf-uni${isOn ? " is-on" : ""}${
                      locked ? " is-locked" : ""
                    }`}
                  >
                    <label className="caf-check">
                      <input
                        type="checkbox"
                        checked={isOn}
                        disabled={locked}
                        onChange={() => toggleUniversity(u.name)}
                      />
                      <span>
                        {u.name}
                        {u.location && (
                          <em className="caf-uni-loc">{u.location}</em>
                        )}
                      </span>
                    </label>
                  </div>
                );
              })
            )}
          </div>

          {listReady && filtered.length > PAGE_SIZE && (
            <div className="caf-pages">
              <button
                type="button"
                disabled={clampedPage === 1}
                onClick={() => setPage(clampedPage - 1)}
              >
                ‹ Prev
              </button>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  className={n === clampedPage ? "is-current" : undefined}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                disabled={clampedPage === pageCount}
                onClick={() => setPage(clampedPage + 1)}
              >
                Next ›
              </button>
            </div>
          )}
        </section>

        <footer className="caf-foot">
          <p className="caf-warning">
            Not connected yet — submitting will not send or save anything.
          </p>
          <button type="submit" className="caf-submit">
            Submit
          </button>
        </footer>
      </form>
    </main>
  );
};

export default CommonApplicationForm;
