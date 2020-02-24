function showText() {
    let backspaceFlag = false;
    let showResult = false;
    let calArr = [];
    let opArr = [];
    let strNumber = '';
    let display = document.querySelector('#display');
    let buttons = Array.from(document.querySelectorAll('button'))
    buttons.forEach(button => button.addEventListener('click', function() {
        if (display.value.length === 0 && isOperator(button.value))
            return;
        if (display.value.length === 20 && button.value !== 'ac' && button.value !== 'ce' && button.value !== 'enter')
            return;
        if (button.value === 'hi')
            return;
        if (button.value === '0' && display.value[display.value.length - 1] === '/') {
            alert('Nah, hooman');
            return;
        }
        if (showResult) {
            calArr = [];
            opArr = [];
            strNumber = '';
            display.value = '';
            showResult = false;
        }
        if ((isOperator(display.value[display.value.length - 1]) && isOperator(button.value))
                || isDots(display.value + button.value))
            return;
        if (isOperator(button.value) || button.value === 'enter') {
            if (strNumber !== '')
                calArr.push(strNumber);
            strNumber = '';
            if (button.value !== 'enter')
                opArr.push(button.value);
        }
        if (button.value !== 'ac' && button.value !== 'enter' && button.value !== 'ce') {
            display.value += button.value;
            if (!(isOperator(button.value)))
                strNumber += button.value;
        }
        else if (button.value === 'ac') {
            calArr = [];
            opArr = [];
            strNumber = '';
            display.value = '';
        }
        else if (button.value === 'enter') {
            if (opArr.length === 0 || calArr.length === 0)
                return;
            if (calArr.length === opArr.length)
                opArr.pop();
            let index = 0;
            let result = 0;
            while (opArr.length !== 0) {
                index = isPrecedence(opArr);
                result = operate(calArr[index], opArr[index], calArr[index + 1]);
                calArr.splice(index, 2, result);
                opArr.splice(index, 1);
            }
            display.value = calArr;
            showResult = true;
        }
        else if (button.value === 'ce') {
            if (display.value.length === 0)
                return;
            if (isOperator(display.value[display.value.length - 1])) {
                backspaceFlag = false;
                opArr.pop();
            }
            else if (calArr.length !== opArr.length) {
                backspaceFlag = true;
                calArr.pop();
            }
            display.value = display.value.slice(0, display.value.length - 1);
            strNumber = getLastNumber(display.value);
        }
    }));
}

function isOperator(op) {
    if (op === '+' || op === '-' || op === '*' || op === '/')
        return true;
    else
        return false;
}

function isDots(str) {
    let countDots = 0;
    for (let i = 0; i < str.length; ++i) {
        if (isOperator(str[i]))
            countDots = 0;
        else if (str[i] === '.')
            countDots += 1;
        if (countDots > 1)
            return true;
    }
    return false;
}

function isPrecedence(arr) {
    for (let i = 0; i < arr.length; ++i) {
        if (arr[i] === '*' || arr[i] === '/')
            return i;
    }
    return 0;
}

function operate(n1, op, n2) {
    n1 = Number(n1);
    n2 = Number(n2);
    if (op === '+')
        return n1 + n2;
    else if (op === '-')
        return n1 - n2;
    else if (op === '*')
        return n1 * n2;
    else
        return n1 / n2;
}

function getLastNumber(str) {
    let index = 0;
    for (let i = str.length - 1; i >= 0; --i) {
        if (isOperator(str[i])) {
            index = i;
            break;
        }
    }
    if (index !== 0)
        return str.slice(index + 1, str.length);
    else 
        return str;
}

showText();