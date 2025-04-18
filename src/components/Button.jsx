import React from "react";
import "../styles/base.css";

const CalcButton = ({ label, onClick, type, className = "" }) => {
  const getButtonClass = () => {
    let baseClass = "calc-button";
    if (type === "operator") {
      baseClass += " operator";
    } else if (type === "function") {
      baseClass += " function";
    } else if (label === "=") {
      baseClass += " equals";
    }

    return `${baseClass} ${className}`.trim();
  };

  return (
    <button className={getButtonClass()} onClick={onClick}>
      {label}
    </button>
  );
};

export default CalcButton;
