"use client";
import PropTypes from "prop-types";
import "./styles/program.css";
import { IoSchoolSharp } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa";
const Program = ({ exams, topColleges, tag }) => {
  return (
    <div className="program">
      <div className="exam">
        <h3>Exam Related to {tag}</h3>
        <div className="group">
          <ul>
            {exams.map((item) => {
              return <li key={item}>{item}</li>;
            })}
          </ul>
          <FaBookOpen size="3rem" />
        </div>
      </div>
      <div className="college">
        <h3>
          Top {topColleges.length} College for {tag}
        </h3>
        <div className="group">
          <ul>
            {topColleges.map((item) => {
              return <li key={item}>{item}</li>;
            })}
          </ul>
          <IoSchoolSharp size="3rem" />
        </div>
      </div>
    </div>
  );
};

export default Program;
Program.propTypes = {
  exams: PropTypes.array.isRequired,
  topColleges: PropTypes.array.isRequired,
  tag: PropTypes.string.isRequired,
};
