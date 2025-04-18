import React from "react";
import Button from "./Button";

const CalculatorButtons = ({
  handleButtonClick,
  functionButtons,
  operatorButtons,
  numberButtons,
  lastOperator,
  lastNumber,
}) => {
  return (
    <div className="calculator-grid">
      <div className="calculator-layout">
        <div className="function-buttons-container">
          {functionButtons.map((button) => (
            <Button
              key={button.id}
              label={button.label}
              type={button.type}
              onClick={() => handleButtonClick(button)}
            />
          ))}
        </div>

        <div className="operator-buttons-container">
          {operatorButtons.map((button) => (
            <Button
              key={button.id}
              label={button.label}
              type={button.type}
              className={`operator-button ${
                lastOperator === button.label && lastNumber === ""
                  ? "active"
                  : ""
              }`}
              onClick={() => handleButtonClick(button)}
            />
          ))}
        </div>

        <div className="number-buttons-container">
          {numberButtons.map((button) => (
            <Button
              key={button.id}
              label={button.label}
              type={button.type}
              onClick={() => handleButtonClick(button)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorButtons;
