"use client";
import PropTypes from "prop-types";
import "./styles/courseList.css";
import Link from "next/link";

const CourseList = ({ courses,func }) => {
  return (
    <div className="course-list">
      {courses.map((course) => (
        <Link key={course} className="tag" href={`/course/${course}`} onClick={() => func(course)}>
          {course}
        </Link>
      ))}
    </div>
  );
};

export default CourseList;
CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  func: PropTypes.func.isRequired,
};
