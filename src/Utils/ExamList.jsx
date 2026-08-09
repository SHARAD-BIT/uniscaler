"use client";
import PropTypes from "prop-types";
import Button from "./Button";
import "./styles/examList.css";
const ExamList = ({ list }) => {
  // Defensive: this used to be wired as a standalone route with no `list`
  // prop, which threw on .map before it was pointed back at Exam.
  if (!Array.isArray(list)) return null;
  return (
    <div className="exam-list">
      {list.map((item, index) => {
        return <Button key={index} text={item} link={`/exam/${item}`} />;
      })}
    </div>
  );
};

export default ExamList;
ExamList.propTypes = {
  list: PropTypes.array,
};
