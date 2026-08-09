"use client";
import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa6";
import PropTypes from "prop-types";
import "./styles/ratingForm.css";

const RatingForm = ({ cName, location, func }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const ref = useRef(null);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        func();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend or display it)
    console.log({ cName, location, comment, rating });
  };

  return (
    <div className="rating-form" ref={ref}>
      <h2>Give Rating : {cName}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="comment">Review:</label>
          <textarea
            id="comment"
            value={comment}
            rows={3}
            required
            placeholder="Write your Review..."
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div className="input-group">
          <label>Rating:</label>
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              onClick={() => handleRatingChange(index + 1)}
              style={{
                cursor: "pointer",
                color: index < rating ? "#ffc107" : "#e4e5e9",
                fontSize: "24px",
                marginRight: "5px",
              }}
            />
          ))}
        </div>
        <button type="submit" className="btn">
          Submit Rating
        </button>
      </form>
    </div>
  );
};

export default RatingForm;
RatingForm.propTypes = {
  cName: PropTypes.string,
  location: PropTypes.string,
  func: PropTypes.func,
};
