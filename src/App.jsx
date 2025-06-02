import "./index.css";
import { useState } from "react";

export default function Calculator() {
  const [result, setResult] = useState("0");

  const clearInput = () => setResult("0");

  const deleteSymbol = () => {
    if (result.length == 1) {
      setResult("0");
    } else if (isMethodLast()) {
      setResult((previous) => previous.slice(0, -1));
    } else {
      setResult((previous) => previous.slice(0, -1));
    }
  };

  const addMethodSymbol = (operator) => {
    if (isMethodLast()) {
      setResult((previous) => previous.slice(0, -1) + operator);
    } else if (getLastSymbol() === ".") {
      setResult((previous) => previous.slice(0, -1) + operator);
    } else {
      setResult((previous) => previous + operator);
    }
  };

  const addDigit = (digit) => setResult(result === "0" ? digit : result + digit);

  const addPoint = () => (isMethodLast() ? setResult((previous) => previous + "0.") : setResult((previous) => previous + "."));

  const calculateResult = () => {
    if (isMethodLast()) setResult((previous) => previous.slice(0, -1));
    setResult((previous) => eval(previous).toString());
  };

  const isMethodLast = () => operators.includes(getLastSymbol());

  const getLastSymbol = () => result[result.length - 1];

  const operators = ["+", "-", "*", "/"];

  const buttons = [
    { label: "C", key: "C", method: clearInput, className: "clear" },
    { label: "⌫", key: "⌫", method: deleteSymbol, className: "delete" },
    { label: "7", key: "7", method: () => addDigit("7") },
    { label: "8", key: "8", method: () => addDigit("8") },
    { label: "9", key: "9", method: () => addDigit("9") },
    { label: "+", key: "+", method: () => addMethodSymbol("+"), className: "operator" },
    { label: "4", key: "4", method: () => addDigit("4") },
    { label: "5", key: "5", method: () => addDigit("5") },
    { label: "6", key: "6", method: () => addDigit("6") },
    { label: "-", key: "-", method: () => addMethodSymbol("-"), className: "operator" },
    { label: "1", key: "1", method: () => addDigit("1") },
    { label: "2", key: "2", method: () => addDigit("2") },
    { label: "3", key: "3", method: () => addDigit("3") },
    { label: "×", key: "*", method: () => addMethodSymbol("*"), className: "operator" },
    { label: "0", key: "0", method: () => addDigit("0") },
    { label: ".", key: ".", method: addPoint },
    { label: "=", key: "=", method: calculateResult, className: "equals" },
    { label: "÷", key: "/", method: () => addMethodSymbol("/"), className: "operator" },
  ];

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">{result}</div>
        <div className="buttons">
          {buttons.map((item) => (
            <button key={item.key} className={item.className} onClick={item.method}>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="technologies-used">
        <p>
          <strong>Technologies used:</strong> React, JSX, CSS Modules, JavaScript (useState, events handling)
        </p>
      </div>
    </div>
  );
}
