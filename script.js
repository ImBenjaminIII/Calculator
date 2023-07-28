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

window.addEventListener('keydown', handleKeyboardInput);
allClear.addEventListener('click', clear);
negation.addEventListener('click', addNegation);

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) {
    // CHECK - Reset the number for the next operand if it have a negation.
    if (negationResetScreen) {
      currentOperationScreen.textContent =
        currentOperationScreen.textContent.charAt(0);
      negationResetScreen = false;
      currentOperationScreen.textContent += e.key;
      return;
    }
    // CHECK - Reset if the current operand on screen have a 0 and reset if passed the condition (remove the 0 for the first operand)
    if (currentOperationScreen.textContent == '0' || shouldResetScreen) {
      resetScreen();
      allClear.textContent = 'C';
    }
    currentOperationScreen.textContent += e.key;
  }
  if (e.key === 'Enter') evaluate();
  if (e.key === 'Backspace') clear();
  if (e.key === 'Escape') clear();
  if (e.key === '.') {
    currentOperationScreen.textContent += '.';
  }
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    setOperator(e.key);
    console.log(e.key);
    if (e.key != '=') {
      operatorButton.forEach(buttons => {
        buttons.classList.remove('select');
      });
    }
  }
}

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
  currentOperationScreen.style.fontSize = '80px';
  currentOperationScreen.textContent = '0';
  firstOperand = '';
  secondOperand = '';
  negations = false;
  negationResetScreen = false;
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
      operatorButton.forEach(buttons => {
        buttons.classList.remove('select');
      });
      buttons.classList.add('select');
    }
  });
});

// Number Button (., 1, 2, 3, 4, 5, 6, 7, 8, 9)
number.forEach(number => {
  number.addEventListener('click', () => {
    currentOperationScreen.textContent.length == 6
      ? (currentOperationScreen.style.fontSize = '55px')
      : currentOperationScreen.textContent.length >= 9
      ? (currentOperationScreen.style.fontSize = '45px')
      : console.log('hello');
    // CHECK - Reset the number for the next operand if it have a negation.
    if (negationResetScreen) {
      currentOperationScreen.textContent =
        currentOperationScreen.textContent.charAt(0);
      negationResetScreen = false;
    }
    // CHECK - Reset if the current operand on screen have a 0 and reset if passed the condition (remove the 0 for the first operand)
    if (currentOperationScreen.textContent == '0' || shouldResetScreen) {
      resetScreen();
      allClear.textContent = 'C';
    }
    currentOperationScreen.textContent += number.textContent;
  });
});

// Set the operator for the operand and evaluate if it passed to the condition of the if statement
function setOperator(operator) {
  // CHECK - the operator if it have then evaluate
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
  if (currentOperation === '=') return;
  if (currentOperation === null || shouldResetScreen) return;

  // BUG CATCHER - for NAN result in the division operator!
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

// Operate the Result!
function operate(operator, number1, number2) {
  let num1 = Number(number1);
  let num2 = Number(number2);

  console.log(num1);
  console.log(num2);

  switch (operator) {
    case '+':
      return num1 + num2;
    case '÷':
    case '/':
      return num1 / num2;
    case '×':
    case '*':
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
