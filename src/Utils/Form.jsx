"use client";
import PropTypes from "prop-types";
const Form = ({ name, course, image }) => {
  return <div className="form">
    <div className="grt">
        <div className="image">
            <img src={image} alt="name" />
        </div>
        <div className="text">
            <h3>{name}</h3>
        </div>
    </div>
  </div>;
};

export default Form;
Form.propTypes={
    name: PropTypes.string, 
    course: PropTypes.array,
    image: PropTypes.string
}
