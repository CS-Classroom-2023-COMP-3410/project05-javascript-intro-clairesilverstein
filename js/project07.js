/*******************************************************************
 * Virtual Calculator
 * Requirements:
 *  - Basic arithmetic: +, -, ×, ÷
 *  - Advanced: square root, percentage, memory recall (M+, M-, MR, MC)
 *  - Handle division by zero (error display)
 *  - Clear button to reset
 *******************************************************************/

// Variables to manage calculator state
let currentValue = "0";     // String for display
let storedValue = null;     // Stores the first operand
let currentOperator = null; // +, -, *, /, etc.
let memoryValue = 0;        // For M+, M-, MR, MC
let resultJustCalculated = false; // To handle fresh result state

const display = document.getElementById("calculatorDisplay");

// ---------- Utility Functions ----------
function updateDisplay(value) {
  display.textContent = value;
}

function resetCalculator() {
  currentValue = "0";
  storedValue = null;
  currentOperator = null;
  resultJustCalculated = false;
  updateDisplay(currentValue);
}

// Safely convert currentValue to a number
function getCurrentValueAsNumber() {
  return parseFloat(currentValue);
}

// Display an error and reset
function handleError(message = "Error") {
  updateDisplay(message);
  // Give user a moment to see error, then reset
  setTimeout(() => {
    resetCalculator();
  }, 1000);
}

// ---------- Core Calculation ----------
function performCalculation() {
  if (storedValue === null || currentOperator === null) return;

  const firstNum = parseFloat(storedValue);
  const secondNum = parseFloat(currentValue);
  let calcResult = 0;

  switch (currentOperator) {
    case "+":
      calcResult = firstNum + secondNum;
      break;
    case "-":
      calcResult = firstNum - secondNum;
      break;
    case "*":
      calcResult = firstNum * secondNum;
      break;
    case "/":
      if (secondNum === 0) {
        handleError("Divide by 0");
        return;
      }
      calcResult = firstNum / secondNum;
      break;
    default:
      return;
  }
  
  // Display result
  currentValue = calcResult.toString();
  updateDisplay(currentValue);
  // Reset operator, store the result
  storedValue = null;
  currentOperator = null;
  resultJustCalculated = true;
}

// ---------- Button Click Handlers ----------
// Digit buttons
function handleDigit(digit) {
  if (resultJustCalculated) {
    // Start fresh if user types a digit after having pressed "="
    currentValue = digit;
    resultJustCalculated = false;
  } else {
    // If currentValue is "0", replace it, else append
    if (currentValue === "0") {
      currentValue = digit;
    } else {
      currentValue += digit;
    }
  }
  updateDisplay(currentValue);
}

// Decimal button
function handleDecimal() {
  if (resultJustCalculated) {
    // Start new number if a result was just calculated
    currentValue = "0.";
    resultJustCalculated = false;
  } else if (!currentValue.includes(".")) {
    currentValue += ".";
  }
  updateDisplay(currentValue);
}

// Operator buttons (+, -, ×, ÷)
function handleOperator(operatorSymbol) {
  // If there's already a storedValue and an operator, do the calculation first
  if (storedValue !== null && !resultJustCalculated) {
    performCalculation();
  }
  // After performing a calculation, or if none done yet:
  storedValue = currentValue;
  currentOperator = operatorSymbol;
  resultJustCalculated = false;
  currentValue = "0";
}

// Equals button
function handleEquals() {
  performCalculation();
}

// Clear button
function handleClear() {
  resetCalculator();
}

// Sign button (±)
function handleSignToggle() {
  if (currentValue === "0") return;
  if (currentValue.startsWith("-")) {
    currentValue = currentValue.substring(1);
  } else {
    currentValue = "-" + currentValue;
  }
  updateDisplay(currentValue);
}

// Square root (√)
function handleSquareRoot() {
  const val = getCurrentValueAsNumber();
  if (val < 0) {
    handleError("Invalid √");
    return;
  }
  const result = Math.sqrt(val);
  currentValue = result.toString();
  updateDisplay(currentValue);
  resultJustCalculated = true;
}

// Percentage (%)
function handlePercentage() {
  const val = getCurrentValueAsNumber();
  // Turn the current value into a fraction of 100
  const result = val / 100;
  currentValue = result.toString();
  updateDisplay(currentValue);
  resultJustCalculated = true;
}

// ---------- Memory Functions ----------
function handleMemoryClear() {
  memoryValue = 0;
}

function handleMemoryRecall() {
  currentValue = memoryValue.toString();
  updateDisplay(currentValue);
  resultJustCalculated = false;
}

function handleMemoryAdd() {
  memoryValue += getCurrentValueAsNumber();
}

function handleMemorySubtract() {
  memoryValue -= getCurrentValueAsNumber();
}

// ---------- Wiring Up the Buttons ----------

// Digits 0-9
for (let i = 0; i <= 9; i++) {
  const btn = document.getElementById(`num${i}`);
  if (btn) {
    btn.addEventListener("click", () => handleDigit(i.toString()));
  }
}

// Decimal
document.getElementById("decimalBtn").addEventListener("click", handleDecimal);

// Operators
document.getElementById("plusBtn").addEventListener("click", () => handleOperator("+"));
document.getElementById("minusBtn").addEventListener("click", () => handleOperator("-"));
document.getElementById("multiplyBtn").addEventListener("click", () => handleOperator("*"));
document.getElementById("divideBtn").addEventListener("click", () => handleOperator("/"));

// Equals
document.getElementById("equalsBtn").addEventListener("click", handleEquals);

// Clear
document.getElementById("clearBtn").addEventListener("click", handleClear);

// Sign toggle (±)
document.getElementById("signBtn").addEventListener("click", handleSignToggle);

// Square root (√)
document.getElementById("sqrtBtn").addEventListener("click", handleSquareRoot);

// Percentage (%)
document.getElementById("percentBtn").addEventListener("click", handlePercentage);

// Memory buttons
document.getElementById("mcBtn").addEventListener("click", handleMemoryClear);
document.getElementById("mrBtn").addEventListener("click", handleMemoryRecall);
document.getElementById("mPlusBtn").addEventListener("click", handleMemoryAdd);
document.getElementById("mMinusBtn").addEventListener("click", handleMemorySubtract);
