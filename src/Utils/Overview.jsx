"use client";
import PropTypes from "prop-types";
const Overview = ({ state, data }) => {
  return (
    <section className="details">
      <div className="overview">
        <p>
          <strong>Overview:</strong>
          <br />
          {data[state.id].paragraph[0]}
        </p>
      </div>
      <p>
        <strong>Other key points about {state.name}:</strong>
      </p>
      <ul>
        {data[state.id].paragraph
          .slice(1, data[state.id].paragraph.length)
          .map((item) => (
            <li key={item}>{item}</li>
          ))}
      </ul>
    </section>
  );
};

export default Overview;
Overview.propTypes = {
  state: PropTypes.object,
  data: PropTypes.object,
};
