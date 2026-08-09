"use client";
import { useEffect } from "react";
import MultiStepForm from "../Utils/MultiStepForm";
import "./styles/ai.css";

const Ai = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const title = document.title;
    document.title = "Your perfect college is just moments away !";
    return () => {
      document.title = title;
    };
  }, []);
  return (
    <main className="top ai">
      <h2>Your perfect college is just moments away !</h2>
      <MultiStepForm />
    </main>
  );
};

export default Ai;
