import { useState, useEffect } from "react";
import {
  formatNumber,
  parseFormattedNumber,
  evaluateExpression,
  calculatePercentage,
  toggleSign,
} from "../helpers/numericOperations";

const STORAGE_KEY = "calculator_history";

const useCalculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [lastNumber, setLastNumber] = useState("");
  const [lastOperator, setLastOperator] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const handleNumberClick = (value) => {
    if (lastOperator === "=" || lastOperator === "%") {
      setExpression(value);
      setLastNumber(value);
      setLastOperator("");
      return;
    }

    if (lastOperator) {
      if (value === "." && lastNumber.includes(".")) {
        return;
      }

      const newNumber = lastNumber + value;
      setLastNumber(newNumber);

      const parts = expression.split(" ");
      parts[parts.length - 1] = newNumber;
      setExpression(parts.join(" "));
      return;
    }

    if (value === "." && lastNumber.includes(".")) {
      return;
    }

    const newNumber = lastNumber + value;
    setLastNumber(newNumber);
    setExpression(newNumber);
  };

  const handleOperatorClick = (operator) => {
    if (lastOperator === "=") {
      setExpression(result + " " + operator + " ");
      setLastOperator(operator);
      setLastNumber("");
    } else if (lastNumber) {
      setExpression(expression + " " + operator + " ");
      setLastOperator(operator);
      setLastNumber("");
    } else if (result !== "0" && !expression) {
      setExpression(result + " " + operator + " ");
      setLastOperator(operator);
    }
  };

  const handleFunctionClick = (func) => {
    switch (func) {
      case "AC":
        clearAll();
        break;
      case "%":
        if (lastNumber) {
          handlePercentage();
        }
        break;
      case "+/-":
        if (lastNumber) {
          handleToggleSign();
        }
        break;
      default:
        break;
    }
  };

  const handleEquals = () => {
    if (
      expression.endsWith("+") ||
      expression.endsWith("-") ||
      expression.endsWith("×") ||
      expression.endsWith("÷") ||
      expression.endsWith(" ")
    ) {
      return;
    }

    if (expression) {
      const calculatedResult = evaluateExpression(expression);
      if (calculatedResult === "Hatalı Sayı") {
        setResult("Hatalı Sayı");
        setExpression("");
        setLastNumber("");
        setLastOperator("");
        return;
      }
      const newHistory = [{ expression, result: calculatedResult }, ...history];
      setHistory(newHistory);
      setResult(calculatedResult);
      setLastNumber("");
      setLastOperator("=");
    }
  };

  const clearAll = () => {
    setExpression("");
    setResult("0");
    setLastNumber("");
    setLastOperator("");
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handlePercentage = () => {
    if (lastNumber) {
      const tokens = expression.split(" ");
      const lastOperator = tokens[tokens.length - 2];

      let currentResult = parseFormattedNumber(tokens[0]);
      for (let i = 1; i < tokens.length - 2; i += 2) {
        const operator = tokens[i];
        const number = parseFormattedNumber(tokens[i + 1]);
        switch (operator) {
          case "+":
            currentResult += number;
            break;
          case "-":
            currentResult -= number;
            break;
          case "×":
            currentResult *= number;
            break;
          case "÷":
            currentResult /= number;
            break;
        }
      }

      const percentValue = calculatePercentage(
        parseFormattedNumber(lastNumber),
        lastOperator,
        currentResult
      );
      const formattedPercent = formatNumber(percentValue);
      setLastNumber(formattedPercent);
      setExpression(
        expression.slice(0, expression.length - lastNumber.length) +
          formattedPercent
      );
    }
  };

  const handleToggleSign = () => {
    if (lastNumber) {
      const toggledNumber = toggleSign(parseFormattedNumber(lastNumber));
      const formattedNumber = formatNumber(toggledNumber);
      setLastNumber(formattedNumber);
      setExpression(
        expression.slice(0, expression.length - lastNumber.length) +
          formattedNumber
      );
    }
  };

  const handleButtonClick = (button) => {
    switch (button.type) {
      case "number":
        handleNumberClick(button.label);
        break;
      case "operator":
        if (button.label === "=") {
          handleEquals();
        } else {
          handleOperatorClick(button.label);
        }
        break;
      case "function":
        handleFunctionClick(button.label);
        break;
      default:
        break;
    }
  };

  return {
    expression,
    result,
    history,
    lastNumber,
    lastOperator,
    handleButtonClick,
    clearHistory,
  };
};

export default useCalculator;
