let currentOperand = "0";
let previousOperand = "";
let operation = undefined;
let resetCurrentOperand = false;


const currentOperandElement = document.querySelector(".current-operand");
const previousOperandElement = document.querySelector(".previous-operand");
const allClearButton = document.querySelector(".all-clear");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equals");
const decimalButton = document.querySelector(".decimal");
const percentageButton = document.querySelector(".percentage");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");


function updateDisplay() {
  currentOperandElement.textContent = currentOperand;
  if (operation != null) {
    previousOperandElement.textContent = `${previousOperand} ${getOperationSymbol(
      operation
    )}`;
  } else {
    previousOperandElement.textContent = previousOperand;
  }
}

function getOperationSymbol(op) {
  switch (op) {
    case "+":
      return "+";
    case "-":
      return "-";
    case "×":
      return "×";
    case "÷":
      return "÷";
    default:
      return op;
  }
}

function appendNumber(number) {
  if (resetCurrentOperand) {
    currentOperand = "";
    resetCurrentOperand = false;
  }

  if (number === "." && currentOperand.includes(".")) return;

  if (currentOperand === "0" && number !== ".") {
    currentOperand = number;
  } else {
    currentOperand += number;
  }

  updateDisplay();
}

function chooseOperation(op) {
  if (currentOperand === "" && previousOperand === "") return;

  if (currentOperand === "") {
    operation = op;
    updateDisplay();
    return;
  }

  if (previousOperand !== "") {
    compute();
  }

  operation = op;
  previousOperand = currentOperand;
  currentOperand = "";
  resetCurrentOperand = false;

  updateDisplay();
}

function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "×":
      computation = prev * current;
      break;
    case "÷":
      if (current === 0) {
        alert("Cannot divide by zero!");
        clearAll();
        return;
      }
      computation = prev / current;
      break;
    default:
      return;
  }

  currentOperand = formatResult(computation);
  operation = undefined;
  previousOperand = "";
  resetCurrentOperand = true;

  updateDisplay();
}

function formatResult(num) {
  if (num.toString().includes(".")) {
    return parseFloat(num.toFixed(10)).toString();
  }
  return num.toString();
}

function percentage() {
  if (currentOperand === "" || currentOperand === "0") return;

  const current = parseFloat(currentOperand);
  currentOperand = (current / 100).toString();
  updateDisplay();
}

function clearEntry() {
  currentOperand = "0";
  updateDisplay();
}

function clearAll() {
  currentOperand = "0";
  previousOperand = "";
  operation = undefined;
  resetCurrentOperand = false;
  updateDisplay();
}


function toggleOperatorActive(opButton) {
  operatorButtons.forEach((button) => button.classList.remove("active"));
  if (operation && opButton && opButton.dataset.operation === operation) {
    opButton.classList.add("active");
  }
}


numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.dataset.number);
    toggleOperatorActive();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperation(button.dataset.operation);
    toggleOperatorActive(button);
  });
});

equalsButton.addEventListener("click", () => {
  compute();
  toggleOperatorActive();
});

allClearButton.addEventListener("click", () => {
  clearAll();
  toggleOperatorActive();
});

clearButton.addEventListener("click", () => {
  clearEntry();
  toggleOperatorActive();
});

decimalButton.addEventListener("click", () => {
  appendNumber(".");
  toggleOperatorActive();
});

percentageButton.addEventListener("click", () => {
  percentage();
  toggleOperatorActive();
});


document.addEventListener("keydown", (event) => {
  const key = event.key;

  
  if ((key >= "0" && key <= "9") || key === ".") {
    appendNumber(key);
    toggleOperatorActive();
  }


  if (key === "+" || key === "-" || key === "*" || key === "/") {
    let op = key;
    if (key === "*") op = "×";
    if (key === "/") op = "÷";
    chooseOperation(op);

    operatorButtons.forEach((button) => {
      if (button.dataset.operation === op) {
        toggleOperatorActive(button);
      }
    });
  }

  
  if (key === "=" || key === "Enter") {
    compute();
    toggleOperatorActive();
  }

 
  if (key === "Escape") {
    clearAll();
    toggleOperatorActive();
  }

 
  if (key === "Delete") {
    clearEntry();
    toggleOperatorActive();
  }

  
  if (key === "Backspace") {
    clearEntry();
    toggleOperatorActive();
  }

  if (key === "%") {
    percentage();
    toggleOperatorActive();
  }
});

updateDisplay();
