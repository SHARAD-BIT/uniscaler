"use client";
import Button from "../Utils/Button";
import "./styles/takeAdmission.css";

const TakeAdmission = () => {
  return (
    <section className="banner">
      <h2>Start Your Career Now With Admission assistance from Uniscaler</h2>
      <Button link={"/register"} text={"Take Admission"} />
    </section>
  );
};

export default TakeAdmission;
