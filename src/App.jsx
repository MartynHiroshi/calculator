import "./index.css";
import { useState } from "react";

export default function Calculator() {
  const [result, setResult] = useState("0");
  const operators = ["/", "*", "-", "+"];
  const operatorsRegEx = new RegExp(`[${operators.map((op) => "\\" + op).join("")}]`);

  function clearInput() {
    setResult("0");
  }

  function deleteSymbol() {
    if (result.length == 1) {
      setResult("0");
    } else {
      setResult((previous) => previous.slice(0, -1));
    }
  }

  function addMethodSymbol(operator) {
    if (isOperatorLast() || getLastSymbol() === ".") {
      setResult((previous) => previous.slice(0, -1) + operator);
    } else {
      setResult((previous) => previous + operator);
    }
  }

  function addDigit(digit) {
    if (result.length == 1 && result[0] === "0") {
      setResult(digit);
    } else {
      setResult((previous) => previous + digit);
    }
  }

  function addPoint() {
    if (isOperatorLast()) {
      setResult((previous) => previous + "0.");
    } else if (!isResultHasPoints()) {
      setResult((previous) => previous + ".");
    }
  }

  function isResultHasPoints() {
    const numbersArr = result.split(operatorsRegEx);
    return numbersArr[numbersArr.length - 1].includes(".");
  }

  function calculateResult() {
    if (isOperatorLast()) {
      setResult((previous) => previous.slice(0, -1));
    }
    setResult((previous) => eval(previous).toString());
  }

  function isOperatorLast() {
    return operators.includes(getLastSymbol());
  }

  function getLastSymbol() {
    return result[result.length - 1];
  }

  const buttons = [
    { label: "7", method: () => addDigit("7") },
    { label: "8", method: () => addDigit("8") },
    { label: "9", method: () => addDigit("9") },
    { label: "+", method: () => addMethodSymbol("+"), className: "operator" },
    { label: "4", method: () => addDigit("4") },
    { label: "5", method: () => addDigit("5") },
    { label: "6", method: () => addDigit("6") },
    { label: "-", method: () => addMethodSymbol("-"), className: "operator" },
    { label: "1", method: () => addDigit("1") },
    { label: "2", method: () => addDigit("2") },
    { label: "3", method: () => addDigit("3") },
    { label: "×", method: () => addMethodSymbol("*"), className: "operator" },
    { label: "0", method: () => addDigit("0") },
    { label: ".", method: addPoint },
    { label: "=", method: calculateResult, className: "equals" },
    { label: "÷", method: () => addMethodSymbol("/"), className: "operator" },
  ];

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">{result}</div>
        <div className="purification-buttons">
          <button className="clear" onClick={() => clearInput()}>
            C
          </button>
          <button className="delete" onClick={() => deleteSymbol()}>
            ⌫
          </button>
        </div>
        <div className="buttons">
          {buttons.map((item, index) => (
            <button key={index} className={item.className} onClick={item.method}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
