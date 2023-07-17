let shouldResetScreen = false;
let firstOperand = '';
let secondOperand = '';
let currentOperation = null;

const currentOperationScreen = document.querySelector('.current-operation');
const lastOperationScreen = document.querySelector('.last-operation');
const allClear = document.querySelector('.clear');
const number = document.querySelectorAll('.number');
const deleteNum = document.querySelector('.delete');
const operatorButton = document.querySelectorAll('.operator');

function clear() {
  currentOperationScreen.textContent = '0';
  lastOperationScreen.textContent = '';
  firstOperand = '';
  secondOperand = '';
  currentOperation = null;
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

function setOperator(operator) {
  if (currentOperation !== null) {
    evaluate();
  }
  firstOperand = currentOperationScreen.textContent;
  currentOperation = operator;
  lastOperationScreen.textContent = `${currentOperationScreen.textContent} ${operator}`;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
    alert('You Cant Divide by zero!');
    return;
  }
  secondOperand = currentOperationScreen.textContent;
  currentOperationScreen.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  );
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}

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
    case 'x':
      return num1 * num2;
    case '-':
      return num1 - num2;
    case '%':
      return num1 % num2;
  }
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

operatorButton.forEach(buttons => {
  buttons.addEventListener('click', () => setOperator(buttons.textContent));
});

number.forEach(number => {
  number.addEventListener('click', () => {
    if (currentOperationScreen.textContent == '0' || shouldResetScreen) {
      resetScreen();
    }
    currentOperationScreen.innerHTML += number.textContent;
  });
});

allClear.addEventListener('click', clear);
deleteNum.addEventListener('click', deleteNumber);
