"use client";
import { useState } from "react";
import Link from "next/link";

import imgRegSrc from "../assets/animation.gif";

const imgReg = imgRegSrc.src;
import PropTypes from "prop-types";
import PopMsg from "../Utils/PopMsg";
import Logo from "../Components/Logo";
import otpImgSrc from "../assets/otpImg.gif";

const otpImg = otpImgSrc.src;
const RegisterForm = ({ isPopUp }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPop, setIsPop] = useState(false);
  const [msg, setMsg] = useState("");
  const [data, setData] = useState({});
  const [userImage, setUserImage] = useState(null);
  const [otpBox, setOTPBox] = useState(false);
  const [email, setEmail] = useState(null);
  const [otp, setOTP] = useState("");
  const [isVerify, setIsVerify] = useState(false);
  // Sent exactly as typed - see the note in Components/Login.jsx. The allowlist
  // that used to sit here also mangled the address the verification OTP is
  // mailed to, so `rahul_sharma@gmail.com` had its mail sent to
  // `rahulsharma@gmail.com` and the account could never reach status = 1.
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          token: otp,
        }),
      })
        .then((res) =>
          res.json().then((data) => {
            data.code === 200 && setMsg(data.message);
            data.code === 200 && setIsVerify(true);
            data.code === 401 && setMsg(data.message);
          })
        )
        .catch((err) => {
          setMsg(err.message);
        });
  };
  const formInput = [
    {
      name: "fullName",
      type: "text",
      placeholder: "Full Name",
      pattern: "^[a-zA-Z\\s]{1,50}$",
      required: true,
      title:
        "Full name should only contain letters and spaces, and be up to 50 characters long.",
    },
    {
      name: "email",
      type: "email",
      pattren: "[a-zA-Z0-9\\._%+-]+@[a-zA-Z0-9\\.-]+\\.[a-zA-Z]{2,}",
      placeholder: "Email",
      required: true,
      maxL: 50,
      title: "Please enter a valid email address, up to 50 characters long.",
    },
    {
      name: "password",
      type: "password",
      maxL: 16,
      placeholder: "Password",
      pattern:
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
      required: true,
      title:
        "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
    },
    {
      name: "phone",
      type: "tel",
      pattern: "[6-9]\\d{9}",
      placeholder: "Phone",
      required: true,
      maxL: 10,
      title:
        "Phone number must be a 10-digit number starting with 6, 7, 8, or 9.",
    },
  ];
  const hidePopUp = () => {
    setIsPop(false);
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
        data.code === 200 && setIsPop(true);
        data.code === 200 && setOTPBox(true);
        data.code === 200 && setEmail(data?.email);
        data.code === 409 && setIsPop(true);
        data.code === 200 && setMsg(data?.message);
        // data.redirect && navigate.push(data.redirect);
        data.code === 409 && setMsg(data?.message);
        // reset form data
        data.code === 200 && setData({});
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
    <div className="form-wrapper">
      <div className="mockUp">
        <div className="text">
          <Logo />
          <h3>Start your journey with us.</h3>
          <p>Sign up today to get access to exclusive offers and discounts</p>
          <div className="img">
            <img src={imgReg} loading="lazy" alt="Uniscaler register" />
          </div>
          {!isPopUp && (
            <p className="link">
              Already have an account?{" "}
              <Link href="/login">
                <strong>Login</strong>
              </Link>
            </p>
          )}
        </div>
      </div>
      <form
        autoComplete="on"
        autoCorrect="on"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="form-element">
          {formInput.map((input) => {
            return (
              <div className="form-group" key={input.name}>
                <label htmlFor={input.name + "input"}>{input.name}</label>
                <input
                  autoComplete="off"
                  id={input.name + "input"}
                  type={input.type}
                  pattern={input.pattern}
                  title={input.title}
                  name={input.name}
                  placeholder={input.placeholder}
                  required={input.required}
                  onChange={handleInputChange}
                />
              </div>
            );
          })}
          <div className="form-group">
            <label htmlFor="userProfile">Profile photo</label>
            <input
              id="userProfile"
              required
              type="file"
              accept="image/*"
              name="userImage"
              onChange={handleFileChange}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitted}
            onClick={() => {
              navigator.vibrate(50);
            }}
          >
            Register
          </button>
        </div>
      </form>
      {isPop && msg.length > 0 && (
        <PopMsg
          msg={msg}
          title={"Verify Account"}
          func={hidePopUp}
          link={isVerify && { href: "/login", name: "Login" }}
          img={otpImg}
        >
          <div className="otpGroup">
            <input
              type="text"
              name="opt"
              id="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => {
                setOTP(e.target.value);
              }}
            />
            <button
              onClick={() => {
                verifyOTP();
                navigator.vibrate(50);
              }}
              disabled={isVerify}
            >
              Verify OTP
            </button>
          </div>
        </PopMsg>
      )}
    </div>
  );
};
export default RegisterForm;
RegisterForm.propTypes = {
  isPopUp: PropTypes.bool,
};
