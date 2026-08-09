"use client";
import Footer from "../Components/Footer";
import Logo from "../Components/Logo";
import Button from "../Utils/Button";
import ConsultForm from "../Utils/ConsultForm";
import "./styles/BookAConsult.css";
import PropTypes from "prop-types";
import { BiSolidLeftArrowCircle } from "react-icons/bi";

const BookAConsult = ({ func }) => {
  return (
    <section className="book-a-consult">
      <div className="headRisk">
        <Logo />
        <Button text="Student Login" link={"/login"} />
      </div>
      <div className="wrapper">
        <button
          onClick={() => {
            func();
            navigator.vibrate(50);
          }}
          className="closeCtk"
        >
          <BiSolidLeftArrowCircle size={35} />
        </button>
        <ConsultForm />
      </div>
      <Footer />
    </section>
  );
};

export default BookAConsult;
BookAConsult.propTypes = {
  func: PropTypes.func,
};
