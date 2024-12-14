

function add(a,b){
    return +a + +b;
}

function subtract(a,b){
    return +a - +b;
}
function multiply(a,b){
    return +a* +b;
}
function divide(a,b){
    return +a/+b;
}

let num1, num2, operator;

function operate(operator, num1, num2){

    switch(operator){
        case '+': return add(num1,num2);
        break;

        case '-': return subtract(num1,num2);
        break;

        case '*': return multiply(num1,num2);
        break;

        case '/': return divide(num1,num2);
        break;
    }
}

const screen = document.querySelector("#screen p")
const innerScreen = document.querySelector("#screen span")

const digit = document.querySelectorAll(".digit");
const operation = document.querySelectorAll(".operator")

const equalTo = document.querySelector("#equalTo")
const erase  = document.querySelector("#clearE")
const clear = document.querySelector("#clear")
const minus = document.querySelector("#minus")
const percent = document.querySelector('#percent')


document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('mousedown', ()=>{
        btn.setAttribute('style','opacity:0.5;')
    })
    btn.addEventListener('mouseup', ()=> {
        btn.setAttribute('style','opacity:1;')
    })
})

let check;
digit.forEach(btn => {
    btn.addEventListener('click', ()=> {
        if(check){
            screen.innerHTML= "";
            check=false;
            screen.innerHTML += btn.value;
        }
        else{
            screen.innerHTML += btn.value;
        }  
    })
})

operation.forEach(btn => {
    btn.addEventListener('click', ()=> {
        num1 = screen.innerHTML;
        operator = btn.value;
        innerScreen.innerHTML = screen.innerHTML + btn.value;
        check=true;
        ;
    })
})

equalTo.addEventListener('click', ()=> {
    if(check === true){
        screen.innerHTML = 'invalid format'
        innerScreen.innerHTML = 'invalid format'
        screen.setAttribute('style','font-size: 1.5em; line-height: 36px; color: #d7b5b5;')
        innerScreen.setAttribute('style','font-size: 0.8em; color: #d7b5b5;')
    }
    else{
        num2 = screen.innerHTML;
        innerScreen.innerHTML += screen.innerHTML + equalTo.value
        screen.innerHTML = operate(operator,num1,num2)
    }
})
clear.addEventListener('click', ()=> {
    screen.setAttribute('style','font-size; line-height; color')
    innerScreen.setAttribute('style','font-size; color;')
    screen.innerHTML = ""
    innerScreen.innerHTML=""
    num1=""; num2=""; operator="";
})

percent.addEventListener('click', ()=>{

    
    innerScreen.innerHTML += screen.innerHTML + percent.value
    screen.innerHTML = +(screen.innerHTML)/100;
    num1 = screen.innerHTML;
    console.log(screen.innerHTML, num1)

})

