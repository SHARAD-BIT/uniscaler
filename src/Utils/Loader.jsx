"use client";
import { DNA } from "react-loader-spinner";
import "./styles/loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Loader;
