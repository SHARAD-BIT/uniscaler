"use client";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import DOMPurify from "dompurify";
import "./styles/directAdmission.css";
import Link from "next/link";

const DirectAdmission = () => {
  const [college, setCollege] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [formValues, setFormValues] = useState({
    studentName: "",
    fatherName: "",
    email: "",
    phone: "",
    collegeName: "",
    courseName: "",
  });

  const inputForm = [
    {
      name: "Name of Student",
      type: "text",
      required: true,
      key: "studentName",
      title:"Please Enter Your Name"
    },
    {
      name: "Father's Name",
      type: "text",
      required: true,
      key: "fatherName",

    },
    {
      name: "Email",
      type: "email",
      required: true,
      key: "email",
    },
    {
      name: "Phone",
      type: "tel",
      required: true,
      key: "phone",
    },
    // The "Amount" field used to sit here, as a required number the student
    // typed in with no price shown anywhere on the page. The backend billed
    // exactly that figure, so the fee was the payer's choice. The booking fee is
    // now fixed server-side in `pricing.js` and this form does not send one.
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    const currentDate = new Date().getDate();
    const encryptedToken = CryptoJS.AES.encrypt(
      JSON.stringify(`${process.env.NEXT_PUBLIC_FETCH_BLOG}${currentDate}`),
      process.env.NEXT_PUBLIC_PUBLIC_ENC
    ).toString();

    fetch(`${process.env.NEXT_PUBLIC_WEBSITE_API}/fetchCollegeForSearch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: encryptedToken }),
    })
      .then((res) => res.json())
      .then((data) => setCollege(data.data))
      .catch((error) => console.error("Error fetching college data:", error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Sanitize inputs to prevent XSS
    const sanitizedFormValues = {
      studentName: DOMPurify.sanitize(formValues.studentName),
      email: DOMPurify.sanitize(formValues.email),
      phone: DOMPurify.sanitize(formValues.phone),
      collegeName: DOMPurify.sanitize(formValues.collegeName),
      courseName: DOMPurify.sanitize(formValues.courseName),
      fatherName: DOMPurify.sanitize(formValues.fatherName),
    };
    setLoader(true);
    // /direct-pay accepted a bare POST from anyone until now. It checks the same
    // daily handshake as the rest of the public API, so the form has to send it
    // — the same token this component already builds to fetch the college list.
    const currentDate = new Date().getDate();
    const encryptedToken = CryptoJS.AES.encrypt(
      JSON.stringify(`${process.env.NEXT_PUBLIC_FETCH_BLOG}${currentDate}`),
      process.env.NEXT_PUBLIC_PUBLIC_ENC
    ).toString();
    fetch(`${process.env.NEXT_PUBLIC_PAYMENT_URL}/direct-pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...sanitizedFormValues, token: encryptedToken }),
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.code === 200) {
            window.location.href = data.url;
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <main className="top direct-admission">
      <div className="registration-form">
        <p>Secure your spot! Just fill out the form below.</p>
        <form onSubmit={handleSubmit}>
          {inputForm.map((item) => (
            <div className="input-field" key={item.key}>
              <label htmlFor={item.key}>{item.name}</label>
              <input
                type={item.type}
                id={item.key}
                name={item.key}
                min={item.type === "number" ? 0 : undefined}
                value={formValues[item.key]}
                onChange={handleInputChange}
                required={item.required}
              />
            </div>
          ))}
          <div className="input-field">
            <label htmlFor="collegeName">College Name</label>
            <select
              id="collegeName"
              name="collegeName"
              value={formValues.collegeName}
              onChange={(e) => {
                setSelectedCollege(e.target.value);
                handleInputChange(e);
              }}
              required
            >
              <option value="">Select College</option>
              {college.map((col) => (
                <option key={col.id} value={col.collegeName}>
                  {col.collegeName}
                </option>
              ))}
            </select>
          </div>
          <div className="input-field">
            <label htmlFor="courseName">Course Name</label>
            <select
              id="courseName"
              name="courseName"
              value={formValues.courseName}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Course</option>
              {selectedCollege &&
                JSON.parse(
                  college.find((col) => col.collegeName === selectedCollege)
                    ?.course
                ).map((course, index) => (
                  <option key={index} value={course.name}>
                    {course.name}
                  </option>
                ))}
            </select>
          </div>
          <p className="terms">
            <input type="checkbox" name="terms" id="terms" required />
            <label htmlFor="terms">
              {" "}
              I accept to the <Link href="/privacy-policy">
                Privacy Policy
              </Link> &{" "}
              <Link href={"/terms-and-conditions"}> Terms and Conditions </Link>{" "}
            </label>
            .
          </p>
          <button type="submit" disabled={loader}>
            Pay Fee
          </button>
        </form>
        <p style={{ textAlign: "left", marginTop: "1rem" }}>
          <strong>Notes: </strong>
          <span style={{ color: "var(--dark)" }}>
            This receipt has been magically generated by our digital wizards! A
            confirmation from the Uniscaler Team will be with you shortly.
            Thanks for embarking on this educational journey with us!{" "}
          </span>
        </p>
      </div>
    </main>
  );
};

export default DirectAdmission;
