"use client";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./EnquiryForm.css"; // Import your CSS file for styling
import { useSnackbar } from "notistack";
const EnquiryForm = ({ data, state, enquiry }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmit, setisSubmit] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    collegeName: data[state.id].name,
    courseName: enquiry?.courseName || "",
  });
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/popularCollege`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) =>
        res.json().then((data) => {
          data.code === 201
            ? enqueueSnackbar("Enquiry sent successfully", {
                variant: "success",
                autoHideDuration: 3000,
              })
            : enqueueSnackbar(data.message, {
                variant: "error",
                autoHideDuration: 3000,
              });
          data.code === 201 && setisSubmit(true);
        })
      )
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      })
      .finally(() => {
        setFormData({
          name: "",
          email: "",
          message: "",
          collegeName: data[state.id].name,
          courseName: enquiry?.courseName || "",
        });
      });
  };
  return (
    <div className="enquiry-form-container">
      <h2>Enquiry Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="courseName">Course Name:</label>
          {enquiry?.courseName ? (
            <input
              type="text"
              value={enquiry?.courseName}
              readOnly
              name="courseName"
              id="courseName"
            />
          ) : (
            <select
              name="courseName"
              id="courseName"
              value={formData.course}
              onChange={handleInputChange}
              required
            >
              {data[state.id].courseDetails
                .map((item) => item.list)
                .flat()
                .map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit" disabled={isSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;
EnquiryForm.propTypes = {
  data: PropTypes.object,
  state: PropTypes.object,
  enquiry: PropTypes.object,
};
