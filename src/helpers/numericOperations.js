const formatNumber = (num) => {
  let str = num.toString();

  if (str.length > 14) {
    if (str.includes(".")) {
      const [integer] = str.split(".");
      if (integer.length > 14) {
        return parseFloat(num).toExponential(6);
      }
      const maxDecimalLength = 14 - integer.length - 1;
      return parseFloat(num).toFixed(maxDecimalLength);
    } else {
      return parseFloat(num).toExponential(6);
    }
  }

  const parts = str.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.length > 1 ? parts.join(".") : parts[0];
};

const parseFormattedNumber = (str) => {
  return parseFloat(str.replace(/,/g, ""));
};

const precedence = {
  "×": 2,
  "÷": 2,
  "+": 1,
  "-": 1,
};

const calculate = (a, b, operator) => {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return b !== 0 ? a / b : "Error";
    default:
      return b;
  }
};

const calculatePercentage = (number, lastOperator, currentResult) => {
  if (lastOperator === "+" || lastOperator === "-") {
    return (currentResult * number) / 100;
  } else {
    return number / 100;
  }
};

const toggleSign = (number) => {
  return -number;
};

const evaluateExpression = (expression) => {
  if (!expression) return "0";

  const tokens = expression.split(" ");
  const numbers = [];
  const operators = [];

  let lastOperator = null;
  let currentResult = null;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (!isNaN(parseFormattedNumber(token))) {
      numbers.push(parseFormattedNumber(token));
    } else if (token in precedence) {
      lastOperator = token;
      while (
        operators.length > 0 &&
        precedence[operators[operators.length - 1]] >= precedence[token]
      ) {
        const b = numbers.pop();
        const a = numbers.pop();
        const op = operators.pop();
        const result = calculate(a, b, op);
        if (result === "Error" || isNaN(result)) return "Hatalı Sayı";
        numbers.push(result);
        currentResult = result;
      }
      operators.push(token);
    } else if (token === "%") {
      const number = numbers.pop();
      const percentValue = calculatePercentage(
        number,
        lastOperator,
        currentResult || numbers[0]
      );
      if (percentValue === "Error" || isNaN(percentValue)) return "Hatalı Sayı";
      numbers.push(percentValue);
    }
  }

  while (operators.length > 0) {
    const b = numbers.pop();
    const a = numbers.pop();
    const op = operators.pop();
    const result = calculate(a, b, op);
    if (result === "Error" || isNaN(result)) return "Hatalı Sayı";
    numbers.push(result);
  }

  if (numbers.length === 0 || isNaN(numbers[0])) return "Hatalı Sayı";
  return formatNumber(numbers[0]);
};

export {
  formatNumber,
  parseFormattedNumber,
  evaluateExpression,
  calculatePercentage,
  toggleSign,
};
