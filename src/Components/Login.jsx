"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import imgRegSrc from "../assets/loginImg.gif";

const imgReg = imgRegSrc.src;
import "./styles/Register.css";
import { setCookie } from "../Helper/Helper";
import PopMsg from "../Utils/PopMsg";
import NewsLetter from "../Decorators/NewsLetter";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [forgotPassEmail, setForgetPassEmail] = useState("");
  const [pt, setpt] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useRouter();
  const [link, setLink] = useState({});
  useEffect(() => {
    // check cookie is exist or not
    const cookie = document.cookie;
    if (cookie.includes("token") && cookie.includes("email")) {
      navigate.push("/user-dashboard");
    }
    const title = document.title;
    document.title = "Login - Uniscaler";
    window.scrollTo(0, 0);
    return () => {
      document.title = title;
    };
  }, []);
  const [formData, setFormData] = useState({});
  const hidePopUp = () => {
    setIsPopUp(false);
  };
  const [isForgetPass, setForgetPass] = useState(false);
  const loginHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    !isForgetPass &&
      fetch(process.env.NEXT_PUBLIC_API_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) =>
          res.json().then((data) => {
            if (data.code === 200) {
              setFormData({});
              setIsPopUp(true);
              setMsg(data.message);
              setCookie("token", data.cookie.token, data.cookie.expires);
              setCookie("email", data.cookie.email, data.cookie.expires);
              setLink({ href: "/user-dashboard", name: "Go to Dashboard" });
            } else if (data.code === 201) {
              setMsg(
                data.message + ". Check your mailbox to verify your account"
              );
              setIsPopUp(true);
              setLink({});
            } else if (data.code === 500) {
              setMsg(data.msg);
              setIsPopUp(true);
              setLink({});
            } else {
              setMsg(data.message);
              setIsPopUp(true);
              setLink({});
            }
          })
        )
        .catch((err) => {
          setMsg(err.message);
          setIsPopUp(true);
          setLink({});
        })
        .finally(() => {
          setLoading(false);
        });
  };
  // The value is sent exactly as typed. There used to be a character allowlist
  // here (`[^a-zA-Z0-9\s.@#$]` deleted) applied to the password as well as the
  // email, which silently dropped `_ + -` out of addresses and `! & * ( ) ,`
  // out of passwords. Because these inputs are uncontrolled the box still
  // showed the original text, so the student saw a correct address while a
  // different one was submitted. It never prevented SQL injection either - the
  // backend now uses query placeholders, which is where that belongs.
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const loginData = [
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
  ];
  const ForgetPasswordHandler = () => {
    setForgetPass(true);
  };
  const forgetPassLink = (e) => {
    e.preventDefault();
    setpt(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/forgot-password`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: forgotPassEmail,
      }),
    }).then((res) =>
      res
        .json()
        .then((data) => {
          data.code === 200 && setMsg(data.message);
          data.code === 200 && setIsPopUp(true);
        })
        .catch((err) => {
          setMsg(err.message);
          setIsPopUp(true);
        })
        .finally(() => setpt(false))
    );
  };
  return (
    <main className="register top login">
      <h1>Login</h1>
      <p>Welcome! Please login to your account.</p>
      <div className="form-wrapper">
        <div className="mockUp">
          <div className="text">
            <div className="img">
              <img
                src={imgReg}
                alt="Uniscaler register"
                style={{ marginTop: "-25px" }}
                loading="lazy"
              />
            </div>
            <p className="link">
              Don&apos;t have an account?{" "}
              <Link href="/register">
                <strong>Register</strong>
              </Link>
            </p>
          </div>
        </div>
        <form autoComplete="on" autoCorrect="on" onSubmit={loginHandler}>
          <div className="form-element">
            {loginData.map((input) => {
              return (
                <div className="form-group" key={input.name}>
                  <label>{input.name}</label>
                  <input
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    required={input.required}
                    onChange={handleInputChange}
                  />
                </div>
              );
            })}
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
          <div
            onClick={ForgetPasswordHandler}
            style={{
              textAlign: "center",
              cursor: "pointer",
              marginBlock: "1rem",
            }}
          >
            Forget Password?
          </div>
          {isForgetPass && (
            <div className="form-group" style={{ margin: "1rem" }}>
              <label htmlFor="forgotPassEmail">Enter Your Email:</label>
              <input
                type="email"
                id="forgotPassEmail"
                placeholder="Enter Email"
                value={forgotPassEmail}
                onChange={(e) => setForgetPassEmail(e.target.value)}
                name="email"
                required
              />
              <button onClick={forgetPassLink} type="submit" disabled={pt}>
                {" "}
                Get Link
              </button>
            </div>
          )}
        </form>
        {isPopUp && msg.length > 0 && (
          <PopMsg
            title={"Login"}
            msg={msg}
            link={link?.href && link}
            func={hidePopUp}
          />
        )}
      </div>
      <NewsLetter />
    </main>
  );
};

export default Login;
