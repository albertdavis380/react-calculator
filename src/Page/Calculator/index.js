import React, { useEffect, useState } from "react";
import Button from "../../Components/Button";
import "./calculator.css";

var calculator = {
  display: "",
  displayFontSize: 50,
  keys: [7, 8, 9, "x", 4, 5, 6, "-", 1, 2, 3, "+", 0, "C", "=", "÷"],
  digits: [],
  operaton_history: [],
  op_values: [],
  operater: "",
  operater_array: [],
  is_operater_active: false,
  operation: function () {
    if (this.operaton_history.length === 0) {
      this.operaton_history.push(this.op_values[0].toString());
    }

    let current_operater = this.operater_array.reverse().pop();

    this.operaton_history.push(current_operater);

    if (this.op_values.length === 2) {
      this.operaton_history.push(this.op_values[1].toString());
    }

    return eval(
      this.op_values[0].toString() +
        current_operater +
        this.op_values[1].toString()
    );
  },
  isInt: function (n) {
    return n % 1 === 0;
  },
  number_filter: function (number) {
    if (this.isInt(number)) {
      return number;
    } else {
      return number.toFixed(2);
    }
  },
  clear: function () {
    this.displayFontSize = 50;
    this.op_values = [];
    this.digits = [];
    this.display = "";
    this.operater_array = [];
    this.is_operater_active = false;
    this.operaton_history = [];
    this.setDisplay_value("");
    this.setOperation_value("");
  },
  get_operater_by_symbol: function (symbol) {
    switch (symbol) {
      case "+":
        return "+";
        break;

      case "-":
        return "-";
        break;

      case "x":
        return "*";
        break;

      case "÷":
        return "/";
        break;

      default:
    }
  },
  operator_button_click: function (operater) {
    if (
      !this.is_operater_active &&
      (this.digits.length >= 1 || this.display_value !== "")
    ) {
      this.is_operater_active = true;
      this.operater_array.push(operater);
      this.op_values.push(this.display_value);
      this.display = this.display_value;
      this.digits = [];
      this.setOperation_value(operater);
      this.setDisplay_value("");
    } else if (calculator.is_operater_active && this.digits.length !== 0) {
      // calculator.operation_equalto();
      this.operater_array.push(operater);
      this.op_values.push(this.display_value);
      this.display = this.display_value;
      let cal = this.operation();
      this.op_values = [this.number_filter(cal)];
      this.digits = [];
      this.is_operater_active = true;
      this.display = this.number_filter(cal);
      this.setOperation_value(operater);
      this.setDisplay_value("");
    }
  },
  operation_equalto: function () {
    if (
      this.operater_array.length > 0 &&
      this.is_operater_active &&
      this.display_value !== ""
    ) {
      this.op_values.push(this.display_value);
      this.display = this.display_value;
      let cal = this.operation();
      this.op_values = [];
      this.digits = [];
      this.is_operater_active = false;
      this.display = this.number_filter(cal);
      this.setOperation_value("");
      this.setDisplay_value(this.number_filter(cal));
    }
  },
  numeric_button_click: function (clicked_value) {
    if (clicked_value === 0 && this.display_value === "") {
      return false;
    }

    if (this.digits.length === 0) {
      this.setOperation_value("");
    }

    if (!this.is_operater_active && this.operaton_history.length > 0) {
      this.op_values = [];
      this.operaton_history = [];
    }

    this.digits.push(clicked_value.toString());

    this.setDisplay_value(this.digits.join(""));

    this.display = this.digits.join("");
  },
  displayFontSizeUpdate: function () {
    if (this.displayFontSize >= 15) {
      if (this.display.length > 10) {
        this.displayFontSize -= 3;
      } else if (this.display.length > 20) {
        this.displayFontSize -= 2;
      } else {
        this.displayFontSize -= 1.5;
      }
    }
  },
};

function Calculator() {
  const resultsRender = [];
  const [display_value, setDisplay_value] = useState("");
  const [operation_value, setOperation_value] = useState("");

  calculator.setOperation_value = setOperation_value;
  calculator.setDisplay_value = setDisplay_value;
  calculator.display_value = display_value;
  calculator.operation_value = operation_value;

  const key_click = function () {
    switch (typeof this) {
      case "number":
        if (calculator.digits.length <= 35) {
          calculator.numeric_button_click(this);
          calculator.displayFontSizeUpdate();
        }

        break;

      case "string":
        switch (this) {
          case "C":
            calculator.clear();
            break;
          case "+":
            calculator.operator_button_click("+");
            break;
          case "-":
            calculator.operator_button_click("-");
            break;
          case "÷":
            calculator.operator_button_click("/");
            break;
          case "x":
            calculator.operator_button_click("*");
            break;
          case "=":
            calculator.operation_equalto();
            break;
        }

        break;
      default:
    }
  };

  const display_value_trigger = function (e) {
    setDisplay_value(e.target.value.toString());
  };

  for (var i = 0; i < calculator.keys.length; i += 4) {
    resultsRender.push(
      <div key={i} className="btn-wrapper">
        {calculator.keys.slice(i, i + 4).map((x) => (
          <Button
            key={x}
            button_cls={
              !isNaN(x)
                ? "btn-gray"
                : calculator.get_operater_by_symbol(x) === operation_value
                ? "btn-active"
                : "btn-yellow"
            }
            button_text={x}
            onClick={key_click}
          />
        ))}
      </div>
    );
  }

  useEffect(() => {
    return () => {};
  });

  return (
    <div className="container">
      <div className="cal-div">
        <div className="text-field-area">
          <div className="display-input-wrapper-history">
            <p>{calculator.operaton_history.join("")}</p>
          </div>
          <div className="display-input-wrapper">
            <input
              name="display"
              style={{ fontSize: calculator.displayFontSize }}
              className="display-input"
              placeholder="0"
              value={calculator.display}
              onChange={display_value_trigger}
            />
          </div>
        </div>

        <div className="key-pad">{resultsRender}</div>
      </div>
    </div>
  );
}

export default Calculator;
