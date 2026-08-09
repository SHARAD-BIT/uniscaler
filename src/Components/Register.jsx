"use client";
import { useEffect } from "react";
import NewsLetter from "../Decorators/NewsLetter";
import RegisterForm from "../Decorators/RegisterForm";
import "./styles/Register.css";
const Register = () => {
  useEffect(() => {
    const title = document.title;
    document.title = `Register at - "Uniscaler"`;
    window.scrollTo(0, 0);
    return () => {
      document.title = title;
    };
  }, []);
  return (
    <main className="register top">
      <h1>Register</h1>
      <p>Welcome! Please fill in the following details to create an account:</p>
      <RegisterForm />
      <NewsLetter />
    </main>
  );
};

export default Register;
