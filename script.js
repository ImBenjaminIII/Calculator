let shouldResetScreen = false;
let currentOperation = null;
let negationResetScreen = false;
let negations = false;
let firstOperand = '';
let secondOperand = '';

const currentOperationScreen = document.querySelector('.current-operation');
const allClear = document.querySelector('.clear');
const number = document.querySelectorAll('.number');
const operatorButton = document.querySelectorAll('.operator');
const curTime = document.querySelector('.current-time');
const negation = document.querySelector('.negation');

negation.addEventListener('click', addNegation);

function addNegation() {
  if (negations) {
    currentOperationScreen.textContent =
      currentOperationScreen.textContent.slice(1);
    negations = false;
    negationResetScreen = false;
  } else {
    currentOperationScreen.textContent = `-${currentOperationScreen.textContent}`;
    negations = true;
    negationResetScreen = true;
  }
}

setInterval(() => {
  let time = new Date();
  curTime.innerHTML = time.toLocaleTimeString([], {timeStyle: 'short'});
});

function clear() {
  currentOperationScreen.textContent = '0';
  firstOperand = '';
  secondOperand = '';
  negations = false;
  currentOperation = null;
  allClear.textContent = 'AC';
  operatorButton.forEach(buttons => {
    buttons.classList.remove('select');
  });
}

function resetScreen() {
  currentOperationScreen.textContent = '';
  shouldResetScreen = false;
  operatorButton.forEach(buttons => {
    buttons.classList.remove('select');
  });
}

//Operator Button (-, +, ÷, x, =)
operatorButton.forEach(buttons => {
  buttons.addEventListener('click', () => {
    setOperator(buttons.textContent);
    if (buttons.textContent != '=') {
      buttons.classList.add('select');
    }
  });
});

// Number Button (., 1, 2, 3, 4, 5, 6, 7, 8, 9)
number.forEach(number => {
  number.addEventListener('click', () => {
    // Reset the screen for the next operand
    if (negationResetScreen) {
      currentOperationScreen.textContent =
        currentOperationScreen.textContent.charAt(0);
      negationResetScreen = false;
      return;
    }
    if (currentOperationScreen.textContent == '0' || shouldResetScreen) {
      resetScreen();
      allClear.textContent = 'C';
    }
    currentOperationScreen.textContent += number.textContent;
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
  negationResetScreen = false;
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
