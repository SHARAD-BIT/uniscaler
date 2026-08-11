"use client";
import { useMemo, useState } from "react";
import {
  applicationCatalog,
  MAX_UNIVERSITIES,
} from "@/lib/commonApplicationCatalog";
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

  const chosen = useMemo(() => Object.keys(picks), [picks]);
  const atLimit = chosen.length >= MAX_UNIVERSITIES;

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

  const specializationsFor = (university, course) => {
    const entry = applicationCatalog.find((u) => u.university === university);
    const match = entry?.courses.find((c) => c.name === course);
    return match?.specializations ?? [];
  };

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
        else if (!p.specialization) next[u] = "Choose a specialization";
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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          <p className="caf-warning">
            This form is not connected to anything yet — nothing was sent and
            nothing was saved. It is here so the design can be reviewed.
          </p>
          <button type="button" className="caf-submit" onClick={() => setSubmitted(false)}>
            Back to the form
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="top caf">
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

          <div className="caf-uni-list">
            {applicationCatalog.map((entry) => {
              const pick = picks[entry.university];
              const isOn = Boolean(pick);
              // Only the unticked ones lock at the limit — a chosen university
              // must always remain untickable, or the user cannot swap one out.
              const locked = !isOn && atLimit;
              const specializations = isOn
                ? specializationsFor(entry.university, pick.course)
                : [];

              return (
                <div
                  key={entry.university}
                  className={`caf-uni${isOn ? " is-on" : ""}${
                    locked ? " is-locked" : ""
                  }${errors[entry.university] ? " has-error" : ""}`}
                >
                  <label className="caf-check">
                    <input
                      type="checkbox"
                      checked={isOn}
                      disabled={locked}
                      onChange={() => toggleUniversity(entry.university)}
                    />
                    <span>{entry.university}</span>
                  </label>

                  {isOn && (
                    <div className="caf-uni-selects">
                      <div className="caf-field">
                        <label htmlFor={`course-${entry.university}`}>Course</label>
                        <select
                          id={`course-${entry.university}`}
                          value={pick.course}
                          onChange={(e) => setCourse(entry.university, e.target.value)}
                        >
                          <option value="">Choose</option>
                          {entry.courses.map((c) => (
                            <option key={c.name} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="caf-field">
                        <label htmlFor={`spec-${entry.university}`}>Specialization</label>
                        <select
                          id={`spec-${entry.university}`}
                          value={pick.specialization}
                          disabled={!pick.course}
                          onChange={(e) =>
                            setSpecialization(entry.university, e.target.value)
                          }
                        >
                          <option value="">
                            {pick.course ? "Choose" : "Choose a course first"}
                          </option>
                          {specializations.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {errors[entry.university] && (
                    <span className="caf-error">{errors[entry.university]}</span>
                  )}
                </div>
              );
            })}
          </div>
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
