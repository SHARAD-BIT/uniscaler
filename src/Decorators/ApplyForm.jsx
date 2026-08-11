"use client";
import { useState } from "react";
import PropTypes from "prop-types";
import PopMsg from "../Utils/PopMsg";
import otpImgSrc from "../assets/otpImg.gif";

const otpImg = otpImgSrc.src;
import { FaCheck } from "react-icons/fa6";
import "./styles/apply.css";


const ApplyForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPop, setIsPop] = useState(false);
  const [msg, setMsg] = useState("");
  const [data, setData] = useState({});
  const [userImage, setUserImage] = useState(null);
  const [otpBox, setOTPBox] = useState(false);
  const [email, setEmail] = useState(null);
  const [otp, setOTP] = useState("");
  const [isVerify, setIsVerify] = useState(false);

  // Sent exactly as typed. This form registers an account, so the allowlist
  // here mangled the address the verification OTP is mailed to - same defect
  // as Decorators/RegisterForm.jsx.
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const verifyOTP = () => {
    otpBox &&
      fetch(`${process.env.NEXT_PUBLIC_VERIFY_URL}/verifyUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, token: otp }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code === 200) {
            setMsg(data.message);
            setIsVerify(true);
          } else if (data.code === 401) {
            setMsg(data.message);
          }
        })
        .catch((err) => setMsg(err.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const newData = new FormData();
    newData.append("data", JSON.stringify(data));
    newData.append("userImage", userImage);
    fetch(process.env.NEXT_PUBLIC_API_URL + "/register", {
      method: "POST",
      body: newData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          setIsPop(true);
          setOTPBox(true);
          setEmail(data?.email);
          setMsg(data?.message);
          setData({});
        } else if (data.code === 409) {
          setIsPop(true);
          setMsg(data?.message);
        }
      })
      .catch((err) => {
        setMsg(err.message);
        setIsPop(true);
      })
      .finally(() => {
        setIsSubmitted(false);
      });
  };

  const handleFileChange = (e) => {
    setUserImage(e.target.files[0]);
  };

  return (
    <div className="apply-form-wrapper">
      <div className="expert-banner">
        <div className="banner-content">
          <h2 className="banner-title">
            Book a 1-on-1 chat with our Experts!
          </h2>
          <div className="banner-subtext">
            <p>
              <FaCheck className="icon" />
              Free Experts Assistance
            </p>
            <p>
              {" "}
              <FaCheck className="icon" />
              Experienced Counsellors
            </p>
          </div>
        </div>
      </div>
      <form
        autoComplete="on"
        autoCorrect="on"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="apply-form-element">
          {[
            {
              name: "fullName",
              type: "text",
              placeholder: "Full Name",
              pattern: "^[a-zA-Z\\s]{1,50}$",
              required: true,
            },
            {
              name: "email",
              type: "email",
              placeholder: "Email",
              required: true,
            },
            {
              name: "password",
              type: "password",
              placeholder: "Password",
              required: true,
            },
            {
              name: "phone",
              type: "tel",
              placeholder: "Phone",
              required: true,
            },
          ].map((input) => (
            <div className="apply-form-group" key={input.name}>
              <label htmlFor={input.name + "input"}>{input.name}</label>
              <input
                autoComplete="off"
                id={input.name + "input"}
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                required={input.required}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <div className="apply-form-group">
            <label htmlFor="userProfile">Profile photo</label>
            <input
              id="userProfile"
              // required
              type="file"
              accept="image/*"
              name="userImage"
              onChange={handleFileChange}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitted}
            onClick={() => navigator.vibrate(50)}
          >
            Register
          </button>
        </div>
      </form>
      {isPop && msg.length > 0 && (
        <PopMsg
          msg={msg}
          title="Verify Account"
          func={() => setIsPop(false)}
          link={isVerify && { href: "/login", name: "Login" }}
          img={otpImg}
        >
          <div className="apply-otpGroup">
            <input
              type="text"
              name="otp"
              id="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
            <button onClick={verifyOTP} disabled={isVerify}>
              Verify OTP
            </button>
          </div>
        </PopMsg>
      )}
    </div>
  );
};

export default ApplyForm;

ApplyForm.propTypes = {
  isPopUp: PropTypes.bool,
};
