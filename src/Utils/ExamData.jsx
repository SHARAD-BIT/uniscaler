"use client";
import PropTypes from "prop-types";
import "./styles/examData.css";
const ExamData = ({ data }) => {
  function camelCaseToCapitalize(camelCaseString) {
    const words = camelCaseString.match(/[A-Z][a-z]+/g);
    const capitalizeWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    const capitalizeString = capitalizeWords.join(" ");
    return capitalizeString;
  }
  return (
    <section className="exam-data">
      <div className="data">
        <h3>Description : {data?.examName}</h3>
        <p>{data?.description || "N/A"}</p>
      </div>
      <div className="data">
        <h3>Age Limit : {data?.examName}</h3>
        <p>
          {data?.eligibilityCriteria.ageLimit.description} <br />
          other age related info :{" "}
          {data?.eligibilityCriteria.ageLimit.note || "N/A"}
        </p>
      </div>
      <div className="data">
        <h3>Education qualifications : {data?.examName}</h3>
        <p>{data?.eligibilityCriteria.educationalQualification || "N/A"}</p>
      </div>
      <div className="data">
        <h3>Other Requirements</h3>
        <div className="other-requirements">
          {typeof data?.eligibilityCriteria.additionalCriteria === "object" ? (
            Object.keys(data?.eligibilityCriteria.additionalCriteria).map(
              (key) => {
                return (
                  <p key={key}>
                    {camelCaseToCapitalize(key)} :{" "}
                    {data?.eligibilityCriteria.additionalCriteria[key]}
                  </p>
                );
              }
            )
          ) : (
            <p>{data?.eligibilityCriteria.additionalCriteria}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExamData;
ExamData.propTypes = {
  data: PropTypes.object.isRequired,
};
