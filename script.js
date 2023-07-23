let shouldResetScreen = false;
let currentOperation = null;
let firstOperand = '';
let secondOperand = '';

const currentOperationScreen = document.querySelector('.current-operation');
const allClear = document.querySelector('.clear');
const number = document.querySelectorAll('.number');
const deleteNum = document.querySelector('.delete');
const operatorButton = document.querySelectorAll('.operator');

function clear() {
  currentOperationScreen.textContent = '0';
  firstOperand = '';
  secondOperand = '';
  currentOperation = null;
  allClear.textContent = 'AC';
}

function resetScreen() {
  currentOperationScreen.textContent = '';
  shouldResetScreen = false;
}

function deleteNumber() {
  currentOperationScreen.textContent = currentOperationScreen.textContent.slice(
    0,
    -1
  );
}

//Operator Button (-, +, ÷, x, =)
operatorButton.forEach(buttons => {
  buttons.addEventListener('click', () => setOperator(buttons.textContent));
});

// Number Button (., 1, 2, 3, 4, 5, 6, 7, 8, 9)
number.forEach(number => {
  number.addEventListener('click', () => {
    // Reset the screen for the next operand
    if (currentOperationScreen.textContent == '0' || shouldResetScreen) {
      resetScreen();
      allClear.textContent = 'C';
    }
    currentOperationScreen.innerHTML += number.textContent;
  });
});

// Set operator to the operand
function setOperator(operator) {
  if (currentOperation !== null) {
    evaluate();
  }
  firstOperand = currentOperationScreen.textContent;
  currentOperation = operator;
  shouldResetScreen = true;
}

// Evaluate the expression
function evaluate() {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperation === '=') return;
  if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
    alert('You Cant Divide by zero!');
    return;
  }
  secondOperand = currentOperationScreen.textContent;
  currentOperationScreen.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  );
  currentOperation = null;
}

// operate the result
function operate(operator, number1, number2) {
  let num1 = Number(number1);
  let num2 = Number(number2);

  console.log(num1);
  console.log(num2);

  switch (operator) {
    case '+':
      return num1 + num2;
    case '÷':
      return num1 / num2;
    case '×':
      return num1 * num2;
    case '-':
      return num1 - num2;
    case '%':
      return num1 % num2;
  }
}

// Round the result to eliminate some numbers in decimal point
function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

allClear.addEventListener('click', clear);
deleteNum.addEventListener('click', deleteNumber);
