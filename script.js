// DOM elements
const display = document.getElementById('display');
const operators = document.querySelectorAll('.operator');

// variables for operation of calculator
let currentInput = '';
let previousInput = '';
let operator = null;

// function to update value of display
function updateDisplay(value) {
  display.textContent = value || '0';
}

// Event Listener for all buttons
document.querySelectorAll('.button').forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.value; // get data-value attribute

    if (value === 'AC') {
      // clear all inputs and reset display
      currentInput = '';
      previousInput = '';
      operator = null;
      updateDisplay('0');
    } else if (value === 'DEL') {
      // delete the last character in the current input
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput);
    } else if (['+', '-', '*', '/'].includes(value)) {
      // handle operators
      if (currentInput) {
        previousInput = currentInput;
        currentInput = '';
        operator = value;
        // updateDisplay(operator);
      }
    } else if (value === '=') {
      // perform calculation
      const result = calculate(Number(previousInput), Number(currentInput), operator);
      currentInput = result.toString();
      previousInput = '';
      operator = null;
      updateDisplay(result);
    } else {
      // prevent multiple decimals
      if (value === '.' && currentInput.includes('.')) return;
      // handle number and decimal inputs
      currentInput += value;
      updateDisplay(currentInput);
    }
  });
});

// Event Listener for operator buttons
operators.forEach((button) => {
  button.addEventListener('click', () => {
    // add pressed class
    button.classList.add('pressed');

    // remove after short pause
    setTimeout(() => {
      button.classList.remove('pressed');
    }, 300); // 500 miliseconds or .3 second
  });
});

// function to perform calculations
function calculate(num1, num2, operator) {
  if (operator === '+') return num1 + num2;
  else if (operator === '-') return num1 - num2;
  else if (operator === '*') return num1 * num2;
  else if (operator === '/') return num2 !== 0 ? num1 / num2 : 'Error'; // prevent division by zero
  else return '0';
}

// initial display value
updateDisplay('0');
