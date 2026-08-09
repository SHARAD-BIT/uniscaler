"use client";
import { useState } from "react";
import "./styles/consultForm.css";
import { useSnackbar } from "notistack";
const ConsultForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const filterInputStringToPreventSQLInjection = (input) => {
    return input.replace(/[^a-zA-Z0-9\s.@]/g, "");
  };
  const inputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: filterInputStringToPreventSQLInjection(e.target.value),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(process.env.NEXT_PUBLIC_API_URL + "/consultation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        enqueueSnackbar(data.message, {
          variant: "success",
          autoHideDuration: 3000,
        });
        data.code === 200 && setIsSuccess(true);
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };
  return (
    <div className={`consult-form ${isSuccess && "submit"}`}>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={inputChange}
            required
            pattern="^[a-zA-Z\s]+$"
          />
        </div>
        <div className="input-box">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={inputChange}
            required
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          />
        </div>
        <div className="input-box">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Your Number"
            value={formData.phone}
            onChange={inputChange}
            required
            pattern="[0-9]{10}"
            maxLength={10}
          />
        </div>
        <div className="input-box">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={inputChange}
            required
            pattern="^[a-zA-Z\s]+$"
          ></textarea>
        </div>
        <button type="submit" onClick={()=>{
          navigator.vibrate(50)
        }}>Get a Consultation</button>
      </form>
    </div>
  );
};

export default ConsultForm;
