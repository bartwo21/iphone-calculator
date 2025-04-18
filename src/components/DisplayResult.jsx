import React from "react";
import "../styles/base.css";

const DisplayResult = ({ expression, result }) => {
  return (
    <div className="display">
      <div className="expression-container">
        <div className="expression">{expression}</div>
      </div>
      <div className="result">
        <span>=</span>
        {result}
      </div>
    </div>
  );
};

export default DisplayResult;
