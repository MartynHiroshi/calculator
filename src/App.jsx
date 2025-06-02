import { useState } from "react";
import "./index.css";

export default function Calculator() {
  const [result, setResult] = useState("0");

  function clearInput() {
    setResult("0");
  }

  function deleteSymbol() {
    if (result.length == 1) {
      setResult("0");
    } else if (isMethodLast()) {
      setResult((previous) => previous.slice(0, -3));
    } else {
      setResult((previous) => previous.slice(0, -1));
    }
  }

  function addMethodSymbol(method) {
    if (isMethodLast()) {
      setResult((previous) => previous.slice(0, -3) + method);
    } else if (getLastSymbol() === ".") {
      setResult((previous) => previous.slice(0, -1) + method);
    } else {
      setResult((previous) => previous + method);
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
    if (getLastSymbol() === " ") {
      setResult((previous) => previous + "0.");
    } else if (getLastSymbol() !== ".") {
      setResult((previous) => previous + ".");
    }
  }

  function calculateResult() {
    if (getLastSymbol() === " ") {
      setResult((previous) => previous.slice(0, -3));
    }
    setResult((previous) => eval(previous).toString());
  }

  function isMethodLast() {
    return getLastSymbol() === " ";
  }

  function getLastSymbol() {
    return result[result.length - 1];
  }

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
          <button onClick={() => addDigit("7")}>7</button>
          <button onClick={() => addDigit("8")}>8</button>
          <button onClick={() => addDigit("9")}>9</button>
          <button className="operator" onClick={() => addMethodSymbol(" + ")}>
            +
          </button>
          <button onClick={() => addDigit("4")}>4</button>
          <button onClick={() => addDigit("5")}>5</button>
          <button onClick={() => addDigit("6")}>6</button>
          <button className="operator" onClick={() => addMethodSymbol(" - ")}>
            -
          </button>
          <button onClick={() => addDigit("1")}>1</button>
          <button onClick={() => addDigit("2")}>2</button>
          <button onClick={() => addDigit("3")}>3</button>
          <button className="operator" onClick={() => addMethodSymbol(" * ")}>
            ×
          </button>
          <button onClick={() => addDigit("0")}>0</button>
          <button onClick={() => addPoint()}>.</button>
          <button className="equals" onClick={() => calculateResult()}>
            =
          </button>
          <button className="operator" onClick={() => addMethodSymbol(" / ")}>
            ÷
          </button>
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
