import React, { useState, useEffect } from "react";
import "../styles/base.css";
import { BUTTONS } from "../constants/buttonTypes";
import DisplayResult from "./DisplayResult";
import HistoryModal from "./HistoryModal";
import TopButtons from "./TopButtons";
import CalculatorButtons from "./CalculatorButtons";
import { useTheme } from "../context/ThemeContext";
import useCalculator from "../hooks/useCalculator";

const Calculator = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const {
    expression,
    result,
    history,
    lastNumber,
    lastOperator,
    handleButtonClick,
    clearHistory,
    setLastNumber,
    setExpression,
  } = useCalculator();

  const functionButtons = BUTTONS.filter(
    (button) => button.type === "function"
  );
  const operatorButtons = BUTTONS.filter(
    (button) => button.type === "operator"
  );
  const numberButtons = BUTTONS.filter(
    (button) => button.type !== "function" && button.type !== "operator"
  );
  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      if (/[0-9.]/.test(key)) {
        const button = BUTTONS.find(
          (b) => b.label === key && b.type === "number"
        );
        if (button) handleButtonClick(button);
      } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        const operatorMap = {
          "*": "×",
          "/": "÷",
        };
        const operator = operatorMap[key] || key;
        const button = BUTTONS.find(
          (b) => b.label === operator && b.type === "operator"
        );
        if (button) handleButtonClick(button);
      } else if (key === "Enter") {
        const button = BUTTONS.find(
          (b) => b.label === "=" && b.type === "operator"
        );
        if (button) handleButtonClick(button);
      } else if (key === "%") {
        const button = BUTTONS.find(
          (b) => b.label === "%" && b.type === "function"
        );
        if (button) handleButtonClick(button);
      } else if (key === "Escape") {
        const button = BUTTONS.find(
          (b) => b.label === "AC" && b.type === "function"
        );
        if (button) handleButtonClick(button);
      } else if (key === "Backspace") {
        if (lastNumber) {
          setLastNumber(lastNumber.slice(0, -1));
          setExpression(expression.slice(0, -1));
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [expression, lastNumber, handleButtonClick, setLastNumber, setExpression]);

  return (
    <div className={`calculator ${isDarkMode ? "dark" : ""}`}>
      <TopButtons
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        setIsHistoryOpen={setIsHistoryOpen}
      />

      <DisplayResult expression={expression} result={result} />

      <CalculatorButtons
        handleButtonClick={handleButtonClick}
        functionButtons={functionButtons}
        operatorButtons={operatorButtons}
        numberButtons={numberButtons}
        lastOperator={lastOperator}
        lastNumber={lastNumber}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={clearHistory}
      />
    </div>
  );
};

export default Calculator;
