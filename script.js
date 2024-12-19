const add = (a,b) => +a + +b;
const subtract = (a,b) => +a - +b;
const multiply = (a,b) => +a* +b;
const divide = (a,b) => +a/+b;

let num1, num2, operator;

function operate(operator, num1, num2){
    let message;
    switch(operator){
        case '+': return add(num1,num2);
        break;

        case '-': return subtract(num1,num2);
        break;

        case '*': return multiply(num1,num2);
        break;

        case '/': num2==='0' ? message = `Really -_-`: message = (divide(num1,num2));
        return message;
        break;
    }
}


const screen = document.querySelector("#screen p")
const displayScreen = document.querySelector("#screen span")

const digit = document.querySelectorAll(".digit");
const operation = document.querySelectorAll(".operator")

const equalTo = document.querySelector("#equalTo")
const erase  = document.querySelector("#clearE")
const clear = document.querySelector("#clear")
const minus = document.querySelector("#minus")
const percent = document.querySelector('#percent')
const point = document.querySelector("#point")

let final;


document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('mousedown', ()=>{
        btn.setAttribute('style','opacity:0.5;')
    })
    btn.addEventListener('mouseup', ()=> {
        btn.setAttribute('style','opacity:1;')
    })
})

erase.addEventListener('click',  ()=>{
    screen.innerHTML = screen.innerHTML.slice(0,-1);
    if(!screen.innerHTML.includes('.')){
        point.disabled = false;
    }
})

clear.addEventListener('click', ()=> {
    point.disabled = false;
    screen.setAttribute('style','')
    displayScreen.setAttribute('style','')
    screen.innerHTML = ""
    displayScreen.innerHTML="";
    num1=""; num2=""; operator="";
})

point.addEventListener('click', ()=> {
    point.disabled = true;
})

let check = false; //true when an operator or the = has been clicked 
digit.forEach(btn => {
    btn.addEventListener('click', ()=> {
        switch(check){
            case true: screen.innerHTML= "";
                        check=false;
                        screen.innerHTML += btn.value;
                        break;
            default: screen.innerHTML += btn.value;
        }
    })
})

operation.forEach(btn => {
    btn.addEventListener('click', ()=> {

        console.log(num1,operator,num2)
        if(num1 && operator && !num2){
            if(check){
                point.disabled=false;
                operator = btn.value;
                displayScreen.innerHTML = `${displayScreen.innerHTML.slice(0,-1)} ${btn.value}`;
            }
            else{
                num2 = screen.innerHTML;
                point.disabled = false;
                screen.innerHTML = operate(operator,num1,num2);
                checkNum(screen.innerHTML);
                displayScreen.innerHTML = `${screen.innerHTML} ${btn.value}`;
                num1 = screen.innerHTML;
                operator = btn.value;
                num2 = 0;
                check = true;
            }
        }
        else{
            point.disabled = false;
            num1 = screen.innerHTML;
            num2 = 0;
            operator = btn.value;
            displayScreen.innerHTML = `${screen.innerHTML} ${btn.value}`;
            check=true;
        }
    })
})

equalTo.addEventListener('click', ()=> {
    if(check === true){
        screen.innerHTML = 'invalid format'
        displayScreen.innerHTML = 'invalid format'
        screen.setAttribute('style','font-size: 1.5em; line-height: 36px; color: #d7b5b5;')
        displayScreen.setAttribute('style','font-size: 0.8em; color: #d7b5b5;')
    }

    else{
        if(!num1){
            console.log("chai")
            operator = "+"; num1 = screen.innerHTML; num2 = 0;
            displayScreen.innerHTML += ` ${screen.innerHTML} ${equalTo.value}`;
            screen.innerHTML = operate(operator,num1,num2);
        }
        else{
            num2 = screen.innerHTML;
            if (num2==="0"){
                screen.setAttribute('style','font-size: 1.3em; line-height: 36px; color: #d7b5b5;')
            }
            displayScreen.innerHTML += ` ${screen.innerHTML} ${equalTo.value}`
            screen.innerHTML = operate(operator,num1,num2);
            checkNum(screen.innerHTML);
            check = true;
        }
    }
})


percent.addEventListener('click', ()=>{
    displayScreen.innerHTML += screen.innerHTML + percent.value
    screen.innerHTML = +(screen.innerHTML)/100;
    num1 = screen.innerHTML;
    console.log(screen.innerHTML, num1)
})

function checkNum(number){
    if(number.length > 15){
        let x = Number(number);
        Number.isInteger(x)? screen.innerHTML= x.toExponential(8):screen.innerHTML = x.toPrecision(14);
        return screen.innerHTML;
    }
}
