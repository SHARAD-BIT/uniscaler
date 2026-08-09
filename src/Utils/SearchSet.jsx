"use client";
import PropTypes from "prop-types";
import "./styles/searchSet.css";
import { useRouter } from "next/navigation";

import { useRef } from "react";
import { IoSearch } from "react-icons/io5";
const SearchSet = ({ placeholder, func, func2, className }) => {
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  const ref = useRef(null);
  const navigate = useRouter();
  return (
    <div className={`searchSet ${className}`}>
      <input
        list="dataList"
        type="text"
        ref={ref}
        name="Search"
        id="Search"
        autoComplete="on"
        onChange={debounce(func, 1000)}
        onKeyUp={func2}
        placeholder={placeholder}
      />
      <datalist id="dataList">
        <option value="btech">btech</option>
        <option value="mtech">mtech</option>
        <option value="mca">mca</option>
        <option value="mba">mba</option>
        <option value="bca">bca</option>
      </datalist>
      <button onClick={() => navigate.push(`/college/${ref.current.value}`)}>
        <IoSearch />
      </button>
    </div>
  );
};

export default SearchSet;
SearchSet.defaultProps = {
  placeholder: "Search here...",
  func: () => {},
  className: "",
  func2: () => {},
};
SearchSet.propTypes = {
  placeholder: PropTypes.string.isRequired,
  func: PropTypes.func,
  className: PropTypes.string,
  func2: PropTypes.func,
};
