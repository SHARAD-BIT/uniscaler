"use client";
import PropTypes from "prop-types";
const CourseData = ({ data, state, func }) => {
  return (
    <section className="details">
      <div className="overview">
        <p>
          <strong>Top courses of {state.name} :-</strong>
        </p>
        {data[state.id].courseDetails.map((item) => {
          return (
            <div
              key={(Math.random() * 0xffffff).toString(16)}
              className="course"
            >
              <h3>{item.name}</h3>
              <ul>
                {item.list.map((item) => (
                  <li
                    key={(Math.random() * 0xffffff).toString(16)}
                    onClick={() => func(item, state.name)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CourseData;
CourseData.propTypes = {
  data: PropTypes.object,
  state: PropTypes.object,
  func: PropTypes.func,
};
