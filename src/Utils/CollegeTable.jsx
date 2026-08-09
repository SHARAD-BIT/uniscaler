"use client";
import PropTypes from "prop-types";
import "./styles/collegeTable.css"; // Import CSS file for styling
import Button from "./Button";
const logoOrg = "/mainLogo.svg";

const CollegeTable = ({ colleges, description, location }) => {
  return (
    <div className="table-responsive fadeIn">
      <div className="table">
        {" "}
        <table>
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Courses</th>
              <th>Description</th>
              <th>Location</th>
              <th>Get Details</th>
            </tr>
          </thead>
          <tbody>
            {colleges
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((college, index) => (
                <tr key={index}>
                  <th className="college-logo">
                    <img
                      src={college.logo || logoOrg}
                      alt="logo"
                      loading="lazy"
                    />
                  </th>
                  <th>{college.name}</th>
                  <td>
                    <ul>
                      {college.courses.map((course, index) => (
                        <li key={index}>{course.name}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{college.description}</td>
                  <th>{college.location}</th>
                  <td>
                    <Button
                      link="/admission"
                      state={{ name: college.name }}
                      text="Know More"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <h2>About:{location.toUpperCase()}</h2>
      <p>{description}</p>
    </div>
  );
};

export default CollegeTable;
CollegeTable.propTypes = {
  colleges: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};
