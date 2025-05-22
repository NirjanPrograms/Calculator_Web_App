
let buttonList = document.querySelectorAll("button");
let screen = document.querySelector(".screen");
let display = "", operator = "", opr2_String = "";
let opr1, opr2, result;
let opr_sts = false, result_status = false;

const Number = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '00', '.'];
const Operators = ['+', '-', '*', '/', '%'];

// Update the screen after every inputs and update the operands also
function updateScreen(val) {
    display = display + "" + val;
    if (operator === "")
        opr1 = parseFloat(display);
    else {
        opr2_String += val;
        opr2 = parseFloat(opr2_String);
    }
    screen.innerText = display;
}

// Update the screen after click on the delete button
function delUpdateScreen(val) {
    let lastElem = display.charAt(display.length-1);
    if(Operators.includes(lastElem)){
        if(!opr_sts){
            opr1 = Math.floor(opr1 / 10);
        }
        else{
            opr2 = Math.floor(opr2/10);
        }
    }
    else{
        opr_sts = false;
    }
    display = display.slice(0, -1);
    screen.innerText = display;
}

// Clean up the whole screen
function cleanScreen(){
    display = "";
    operator = "";
    opr1 = "";
    opr2 = "";
    opr_sts = false;
    screen.innerText = "";
}

// Calculate the each operations
function calculate() {
    if (operator == '+') {
        result = opr1 + opr2;
    }
    else if (operator == '-') {
        result = opr1 - opr2;
    }
    else if (operator == '*') {
        result = opr1 * opr2;
    }
    else if (operator == '/') {
        let res = opr1 / opr2;
        result = (res % 1 !== 0) && (res.toString().split('.')[1].length > 3) ? res.toFixed(3) : res;
        // Used to take upto 3 decimal point for those value which have decimal points
    }
    else {
        result = opr1 % opr2;
    }
}

buttonList.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;
        if(result_status)
            cleanScreen();
        if (value == "AC") {
            cleanScreen();
        }
        else if(value == 'DEL'){
            delUpdateScreen();
        }
        else if (Number.includes(value)) {
            updateScreen(value);
        }
        else if (Operators.includes(value) && !opr_sts) {
            if (opr1 != "")
                operator = value;
            opr_sts = true;
            display += value;
            screen.innerText = display;
        }
        else if (value == "=") {
            calculate();
            result_status = true;
            screen.innerHTML = `<div style="text-align: right;">${display}</div>
                    <div style="text-align: right; font-weight: bold; margin-top: -5px;">${result}</div>`;
            // update the screen with bold ans
        }
    })
})