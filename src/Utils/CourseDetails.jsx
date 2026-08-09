"use client";
import PropTypes from "prop-types";
import "./styles/courseDetails.css";
const CourseDetails = ({ course }) => {
  // The caller looks the course up by URL segment, so an unrecognised slug
  // (/course/btech, say) yields undefined. Render nothing rather than
  // dereferencing it — the course list above stays visible.
  if (!course) return null;
  return (
    <section className="courseDescription fadeIn">
      <h2>All {course.name} Courses Details : </h2>
      <div className="course-wrapper">
        {course.data.map((item) => (
          <article key={item.name}>
            <h3>
              Course Name : <span>{item.name}</span>
            </h3>
            <p>
              <strong>Description :</strong> <span>{item.description}</span>
            </p>
            <p>
              <strong> Type :</strong> <span>{item.type}</span>
            </p>
            <p>
              <strong> Duration :</strong> <span>{item.duration}</span>
            </p>
            <p>
              <strong> Fees :</strong> <span>{item.fees}</span>
            </p>
            <p>
              <strong>Average Salary :</strong>{" "}
              <span>{item.averageSalary}</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CourseDetails;
CourseDetails.propTypes = {
  course: PropTypes.object,
};
