"use client";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ExamData from "../Utils/ExamData";
import "./styles/examDetails.css";
const ExamDetails = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);
  const examListName = data.exams.map((item) => {
    return item.examName;
  });
  const [examName, setExamName] = useState(examListName[0]);
  const currentExamData = data.exams.filter(
    (item) => item.examName === examName
  );
  return (
    <section className="exam-details">
      <div className="wrapper">
        <div className="group">
          <h2>Exam Details of {data.name.toUpperCase()}</h2>
          <p>Here we List all the Exams Available for {data.name}</p>
          <ul className="exam-list">
            {examListName.map((item) => {
              return (
                <li key={item} className={item === examName ? "active" : ""} onClick={() => setExamName(item)}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        {currentExamData.length > 0 && <ExamData data={currentExamData[0]} />}
      </div>
    </section>
  );
};

export default ExamDetails;
ExamDetails.propTypes = {
  data: PropTypes.object.isRequired,
};
