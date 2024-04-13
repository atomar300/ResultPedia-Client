import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loading">
      <span className="loader"></span>
      <div>Loading may take up to one minute.</div>
    </div>
  );
};

export default Loader;