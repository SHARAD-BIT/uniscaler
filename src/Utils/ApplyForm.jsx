"use client";
import { useRef, useState } from "react";
import "./styles/applyForm.css";
import { getCookie } from "../Helper/Helper";
import PropTypes from "prop-types";
import PopMsg from "./PopMsg";
const ApplyForm = ({ name }) => {
  const Form = useRef(null);
  const [formData, setFormData] = useState();
  const [popUp, setPopUp] = useState(false);
  const [msg, setMsg] = useState("");
  const [link,setLink]=useState({});

  const inputHandler = (e) => {
    const filterInputStringToPreventSQLInjection = (input) => {
      return input.replace(/[^a-zA-Z0-9\s.*#$%]/g, "").trim();
    };
    setFormData({
      ...formData,
      [e.target.name]: filterInputStringToPreventSQLInjection(e.target.value),
    });
  };
  const handlePopUp=()=>{
    setPopUp(false);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (getCookie("email") && getCookie("token")) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-colleges`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collegeName: name,
          ...formData,
          token: getCookie("token"),
          email: getCookie("email"),
        }),
      })
        .then((res) => {
          res.json().then((data) => {
            data.code === 200 && setMsg("Applied successfully");
            data.code === 200 && setPopUp(true);
          });
        })
        .catch((err) => {
          setMsg(err.message);
          setPopUp(true);
        })
        .finally(() => {
          Form.current.reset();
        });
    }else{
      setMsg("Please login first");
      setPopUp(true);
      setLink({href:"/login",name:"Login"});
    }
  };

  return (
    <section className="applyForm">
      <form onSubmit={handleSubmit} autoComplete="on" ref={Form}>
        <h2>Apply now for admission</h2>
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name..."
            autoComplete="on"
            required
            onChange={inputHandler}
          />
        </div>
        <div className="input-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            autoComplete="on"
            placeholder="Phone..."
            required
            onChange={inputHandler}
          />
        </div>
        <div className="input-group">
          <label htmlFor="message">Message:</label>
          <textarea
            type="text"
            id="message"
            name="message"
            autoComplete="on"
            required
            placeholder="Message..."
            onChange={inputHandler}
          />
        </div>
        <button type="submit"> Apply Now</button>
      </form>
      {
        popUp && msg.length > 0 && <PopMsg  link={link?.href && link} title={"Admission Form"} msg={msg} func={handlePopUp} />
      }
    </section>
  );
};

export default ApplyForm;
ApplyForm.propTypes = {
  name: PropTypes.string.isRequired,
};
