//grab all the buttons and  and loop through tbutton and attcach attach the click events
// On button click get the text inside the display button 
// global variable to hold all the clicked data 
// use the same variable to show data in the display.

const allBtns = document.querySelectorAll('.btn');
const displayElm = document.querySelector('.display');
const operator = ["+", '-', '/', '%', '*'];

//load audio 
const audio = new Audio('aa.wav');


let strToDispaly = '';
console.log(allBtns);
let allowDot = true;
let lastOperator = '';

const btnArg = Array.from(allBtns);

btnArg.map((item, i) => {
    item.addEventListener('click', () => {


        //reset prank amnimation and backgrdoun 
        displayElm.style.background = '';
        displayElm.style.color = 'black';
        displayElm.classList.remove('prank')



        const val = item.innerText;
        if (val === 'AC') {
            strToDispaly = '';
            display(strToDispaly);
            return;
        }
        if (val === 'C') {
            if (strToDispaly.length) {
                strToDispaly = strToDispaly.slice(0, -1);
                display(strToDispaly)
            }
            return;
        }
        if (val === '=') {
            const lastChar = strToDispaly[strToDispaly.length - 1];
            if (operator.includes(lastChar)) {
                strToDispaly = strToDispaly.slice(0, -1);
            }
            total();
            return;
        }
        if (operator.includes(val)) {
            if (!strToDispaly) {
                return;
            }
            allowDot = true;
            const lastChar = strToDispaly[strToDispaly.length - 1];
            if (operator.includes(lastChar)) {
                strToDispaly = strToDispaly.slice(0, -1);
            }
        }
        if (val === '.') {
            if (!allowDot) {
                return;
            }
            allowDot = false

            //another approach

        }

        strToDispaly += val;
        display(strToDispaly);

    })
});

const display = (str) => {
    displayElm.innerText = str || '0.00';
}
function removeMultipleDots(str) {
    return str.replace(/\.*\.*/g, ".");
}
const total = () => {
    const extra = randomNumber();

    if (extra) {
        displayElm.style.background = 'red';
        displayElm.style.color = 'white';
        displayElm.classList.add('prank')
        audio.play();
    }
    const ttl = eval(strToDispaly) + extra;
    strToDispaly = ttl;
    display(strToDispaly);
}

const randomNumber = () => {
    const num = Math.round(Math.random() * 10);

    return num <= 3 ? num : 0;
}