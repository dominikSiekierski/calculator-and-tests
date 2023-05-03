const current_number = document.querySelector(".calc_current_number")
const number = document.querySelectorAll('.number_btn')
const operation = document.querySelectorAll('.operation_btn')
const current_operation = document.querySelector('.calc_current_operation')
const fraction = document.querySelector('.fraction_btn')
const power = document.querySelector('.power_btn')
const sqrt = document.querySelector('.sqrt_btn')
const equals = document.querySelector('.equals_btn')
const oposite = document.querySelector('.oposite_btn')
const current_show = document.querySelector('.calc_current_number_show')
const clear_current = document.querySelector('.clear_current_btn')
const clear = document.querySelector('.clear_btn')
const dot = document.querySelector('.dot_btn')
const displayNumbers = document.querySelector('.calc_display_numbers')
const percent = document.querySelector('.percent_btn')
const undo = document.querySelector('.undo_btn')

let current_string = '0';
let operation_number = '';
let current_operation_number = '';
let current_sign = '';
let result = '';
let help_number = '';
let help_sign = '';
let block;
let blockCondition = false;
current_number.innerHTML = '0'

function infinity () {
    if(current_show.innerHTML === 'In fin ity') {
        current_show.innerHTML = 'Infinity';
    }
}

function switchDisplayFront () {
    current_show.style.zIndex = "2";
}

function switchDisplayBack () {
    current_show.style.zIndex = "0";
    current_show.style.fontSize = '100%'
}

function disableBtns () {
    if(percent.disabled === true) {
        current_show.style.removeProperty('font-size');
        percent.disabled = false;
        fraction.disabled = false;
        sqrt.disabled = false;
        power.disabled = false;
        operation.forEach((operation) => operation.disabled = false);
        oposite.disabled = false;
        dot.disabled = false;
    }else {
        current_show.style.fontSize = '2rem';
        percent.disabled = true;
        fraction.disabled = true;
        sqrt.disabled = true;
        power.disabled = true;
        operation.forEach((operation) => operation.disabled = true);
        oposite.disabled = true;
        dot.disabled = true;
    }
}

function calculate () {
    current_string = current_string.replace(/\s/g, "")
    switch (current_sign) {
        case '+':
            result = Number(current_operation_number) + Number(current_string)
        break;
        case '-':
            result = Number(current_operation_number) - Number(current_string)
        break;
        case '÷':
            result = Number(current_operation_number) / Number(current_string)
        break;
        case '\xD7':
            result = Number(current_operation_number) * Number(current_string)
        break;
    }
    if(result.length > 16) {
        displayNumbers.style.fontSize = '2rem'
    }
    current_number.innerHTML = result;
    result = result.toString();
} 

function dotAndZero () { //usuwanie zer z liczby zmiennoprzecinkowej
    if(current_string.includes('.') && current_string.charAt(current_string.length -1) === '0') {
        while(current_string.charAt(current_string.length-1) === '0')
        current_string = current_string.slice(0, current_string.length -1 )
    }
    if(current_string.charAt(current_string.length -1) === '.') {current_string = current_string.slice(0, -1)}
}

function displayNumberSize () {
    if(current_show.innerHTML.length >= 16) {
        current_show.style.fontSize = '80%'
    }
    if(current_show.innerHTML.length >= 20) {
        current_show.style.fontSize = '70%'
    }
}


function numberFormat () {
    
    let splitNumber = current_string.split('.')

    let a = splitNumber[0].split('');
    let b = splitNumber[1];
    let c = '';
     
    for(let i = a.length-1; i >=0; i--) {
        endIndex = (a.length - 1) -i;

        if(endIndex % 3 === 0 && endIndex != 0) {
            c = a[i] + ' ' + c;
        } else {
            c = a[i] + c;
            
        }
    }
    if(current_string.includes('.')) {
        c = c + '.' + b
    }
    current_number.innerHTML = c;
    current_show.innerHTML = c;
    current_string = current_string.replace(/\s/g, "")
    
}


function resultFormat () {
    let splitNumber = result.split('.')

    let a = splitNumber[0].split('');
    let b = splitNumber[1];
    let c = '';
    let t = '';
    if(current_number.innerHTML.includes('.')) {
        c = c + '.'+ b
    }
    for(let i = a.length-1; i >=0; i--) {
        endIndex = (a.length - 1) -i;

        if(endIndex % 3 === 0 && endIndex != 0) {
            c = a[i] + ' ' + c;
        } else {
            c = a[i] + c;
        }

    }
    result = c
    current_number.innerHTML = result;
    current_show.innerHTML = result;
    result = result.replace(/\s/g, "")
    }

function addNumber () {
    block = false;
    if(current_string.length < 14){ 
        displayNumbers.style.fontSize = '3rem';
    }
    if(percent.disabled === true) {
        disableBtns();
        clearAll(); 
    }
    if(current_operation.innerHTML.includes('/') && blockCondition === false || current_operation.innerHTML.includes('sqr') && blockCondition === false || current_operation.innerHTML.includes('√') && blockCondition === false ) {
        blockCondition = true;
        switchDisplayBack();
        current_string = '';
    }
    if(current_operation.innerHTML === current_show.innerHTML && current_sign === '') {
        current_string = ''
    }
    switchDisplayBack();
    if(current_string.length === 14){ 
        displayNumbers.style.fontSize = '2.5rem';
    }
    if(current_string.length === 16){ 
        displayNumbers.style.fontSize = '2rem';
    }
    if(current_string.length >= 19)return;
    if(current_string === '0' && this.textContent != '0') {
        current_string = '';
    }
    if(current_number.innerHTML === '0' && this.textContent === '0'){
        current_number.innerHTML = '0'; 
        current_string = '0'; 
        return;
    }
    if(current_number.innerHTML === "0.") {
        current_string = current_string + this.textContent;
        numberFormat();
        return;
    }
    if(current_operation.innerHTML.includes('=')){
        current_number.innerHTML = '';
        current_operation.innerHTML = '';
        current_operation_number = '';
        current_string = '';
    }
    
    current_string = current_string + this.textContent;
    numberFormat();
}

function addDot () { 
    block = false;
    if(current_string.length >= 19)return;
    if(this.textContent === '.' && current_number.innerHTML.includes('.')) return;
    if(current_operation.innerHTML.includes('=')) {
        switchDisplayBack();
        current_string = '0.';
        current_sign = '';
        current_operation.innerHTML = '';
        current_number.innerHTML = '0.'
        return;
    }
    if(current_number.innerHTML === '' && this.textContent === '.') {
        current_number.innerHTML += '0'
        current_string += '0.'
    }
    current_number.innerHTML += this.textContent;
    current_string = current_number.innerHTML;
    switchDisplayBack();
    
}

function addSign() {
    blockCondition = false;
    block = false;
    displayNumberSize();
    current_number.style.fontSize = '100%';
    if(current_string === '0' && current_sign === '÷') {
        switchDisplayFront ();
        current_operation.innerHTML = current_operation_number + ' ' + '÷' + ' ' + '0'
        current_show.innerHTML = 'division by zero is not allowed';
        return;
    }
    if(current_operation.innerHTML.includes('=')){
        current_operation_number = current_show.innerHTML.replace(/\s/g, "");
        current_sign = this.textContent;
        current_operation.innerHTML = current_operation_number + ' ' + current_sign;
        current_string = '';
        return;
    }
    if(current_string === '' && current_operation_number === '') {
        current_operation.innerHTML = '0' + ' ' +this.textContent
        current_operation_number = 0;
        current_sign = this.textContent
        console.log(current_operation_number)
        console.log(current_sign)
        console.log(current_string)
        return;
    } 
    if(current_operation_number != undefined && current_sign != ''  && current_string != '') {
        dotAndZero();
        calculate();
        if(current_sign != this.textContent) {
            current_sign = this.textContent
        } 
        resultFormat();
        current_operation_number = result;
        current_operation.innerHTML = result + ' ' + this.textContent;
        current_number.innerHTML = '';
        current_string = '';
        result = '';
        switchDisplayFront ();
        
        return;
    }
    if (current_sign != this.textContent){
        current_sign = this.textContent;
        current_operation.innerHTML = current_operation_number + ' ' + this.textContent;
        console.log(current_string)
    }
    if(current_string === '')return;
    switchDisplayFront();
    current_string = current_string.replace(/\s/g, "")
    dotAndZero();
    current_sign = this.textContent;
    current_operation.innerHTML = current_string + ' ' + this.textContent;
    current_operation_number = current_string;
    current_string = '';
    current_number.innerHTML = '';
    console.log(current_operation_number)
    infinity();
}

function doPercent () {
    block = false;
    if(current_operation_number === '' || current_operation_number === 0 ) {
        current_operation_number = 0;
        current_operation.innerHTML = '0'
        return;
    }
    if(current_string === '') {
        current_string = current_operation_number;
    }
    if(current_operation_number != '' && current_string != '' && current_operation.innerHTML.includes('=')) {
        current_operation.innerHTML = Number(current_show.innerHTML) *  Number(current_show.innerHTML) / 100;
        current_show.innerHTML = current_operation.innerHTML;
        return;
    }
    current_string = Number(current_operation_number) * Number(current_string) / 100;
    current_string = current_string.toString(); 
    current_operation.innerHTML = current_operation_number + ' ' + current_sign + ' ' + current_string
    current_show.innerHTML = current_string;
    switchDisplayFront();
    
}

function doFraction () {
    block = false;
    blockCondition = false;
    if(current_operation.innerHTML.includes('=')) {
        current_string = current_show.innerHTML;
        current_operation.innerHTML = '1/('+current_string+')';
        current_show.innerHTML = 1 / Number(current_string);
        displayNumberSize();
        return;
    }
    if(current_operation_number != '' && current_sign != '' && current_show.innerHTML != ''){
        current_string = current_show.innerHTML.replace(/\s/g, '');
    }
    if(current_string === '0' || current_string === '') {
        current_operation.innerHTML = current_operation_number + current_sign + '( 1' + '/' + '0 )'
        current_show.innerHTML = 'division by zero is not allowed';
        disableBtns();
        operation.disabled = true;
        switchDisplayFront ();
        return;
    }
    if(current_operation_number != '' && current_sign != '') {
        current_show.innerHTML = current_string;
        current_operation.innerHTML = current_operation_number + ' ' + current_sign + ' ' + '1/('+current_string+')';
        current_string = 1 / Number(current_string);
        current_string = current_string.toString();
        switchDisplayFront();
        current_show.innerHTML = current_string;
        displayNumberSize();
        return;
    }
    current_operation.innerHTML = '1/(' +current_string+ ')'
    current_string = 1 / Number(current_string);
    current_operation_number = current_string;
    current_string = current_string.toString(); 
    current_show.innerHTML = current_string;
    switchDisplayFront();
    displayNumberSize();
}

function doPower() {
    blockCondition = false;
    if(current_operation.innerHTML.includes('=')) {
        current_string = current_show.innerHTML.replace(/\s/g, "");
    }
    if(current_operation_number != '' && current_sign != '' && current_show.innerHTML != ''){
        current_string = current_show.innerHTML.replace(/\s/g, "");
    }
    if(current_string === '0' || current_string === '') {
        current_string = '0';
        current_operation.innerHTML = 'sqr( '+current_string+' )';
        return;
    }
    if(current_operation_number != '' && current_sign != '') {
        current_show.innerHTML = current_string;
        current_operation.innerHTML = current_operation_number + ' ' + current_sign + ' ' + 'sqr( '+current_string+' )';
        current_string = Number(current_string) * Number(current_string);
        current_string = current_string.toString();
        switchDisplayFront();
        current_show.innerHTML = current_string;
        numberFormat();
        return;
    }
    current_operation.innerHTML = 'sqr( '+current_string+' )'
    current_string = Number(current_string) * Number(current_string);
    current_operation_number = current_string;
    current_string = current_string.toString(); 
    current_show.innerHTML = current_string;
    numberFormat();
    switchDisplayFront();
    displayNumberSize();
    infinity();
}

function doSqrt() {
     blockCondition = false; 
    if(current_string < 0) {
        current_operation.innerHTML = current_operation_number + current_sign + '√( ' + current_string + ' )';
        current_show.innerHTML = 'invalid input data';
        disableBtns();
        operation.disabled = true;
        switchDisplayFront ();
        return;
    }
    if(current_operation.innerHTML.includes('=')) {
        current_string = current_show.innerHTML.replace(/\s/g, "");
    }
    if(current_operation_number != '' && current_sign != '' && current_show.innerHTML != ''){
        current_string = current_show.innerHTML.replace(/\s/g, "");
    }
    if(current_string === '0' || current_string === '') {
        current_string = '0';
        current_operation.innerHTML = '√( '+current_string+' )';
        return;
    }
    if(current_operation_number != '' && current_sign != '') {
        current_show.innerHTML = current_string;
        current_operation.innerHTML = current_operation_number + ' ' + current_sign + ' ' + '√( '+current_string+' )';
        current_string = Math.sqrt(current_string);
        switchDisplayFront();
        numberFormat();
        displayNumberSize();
        current_show.innerHTML = current_string;
        return;
    }
    current_operation.innerHTML = '√( '+current_string+' )'
    current_string = Math.sqrt(current_string);
    current_operation_number = current_string
    current_string = current_string.toString();
    current_number.innerHTML = '';
    numberFormat(); 
    switchDisplayFront();
    displayNumberSize();
}

function opositeNumber () {
    block = false;
    if(current_operation_number != '' && current_operation.innerHTML.includes('=') && current_show.innerHTML != '') {
        if(current_show.innerHTML.charAt(0) === '-') {
            current_show.innerHTML = current_show.innerHTML.replace(/\-/g, "");
            current_operation.innerHTML = current_show.innerHTML;
            current_operation_number = current_show.innerHTML;
            current_string = current_show.innerHTML;
            current_sign = '';
            numberFormat();
            console.log('a')
            return;
        } else {
            current_operation.innerHTML = '-' + current_show.innerHTML;
            current_show.innerHTML = current_operation.innerHTML;
            current_string = current_show.innerHTML;
            current_sign = '';
            numberFormat();
            console.log('b')
            return;
        }
    }
    if(current_operation.innerHTML != '' && current_show.innerHTML != '' && current_sign === '') {
        if(current_show.innerHTML.charAt(0) === '-') {
            current_show.innerHTML = current_show.innerHTML.replace(/\-/g, "");
            current_operation.innerHTML = current_show.innerHTML;
            current_operation_number = current_show.innerHTML;
            current_string = current_show.innerHTML;
            current_sign = '';
            current_string = '';
            numberFormat();
            console.log('c')
            return;
        } else {
            current_operation.innerHTML = '-' + current_show.innerHTML;
            current_show.innerHTML = current_operation.innerHTML;
            current_operation_number = current_show.innerHTML;
            current_string = current_show.innerHTML;
            current_sign = '';
            current_string = '';
            numberFormat();
            console.log('d')
            return;
        }
    }
    if(current_operation_number != '' && current_sign != '' && current_show.innerHTML != '') {
        if(current_show.innerHTML.charAt(0) === '-') {
            current_show.innerHTML = current_show.innerHTML.replace(/\-/g, "");
            current_number.innerHTML = current_string.replace(/\-/g, "");
            current_string = current_number.innerHTML;
            numberFormat();
            console.log('e')
            return;
        } else {
            current_show.innerHTML = '-' + current_show.innerHTML;
            current_number.innerHTML = '-' + current_string
            current_show.innerHTML =  current_number.innerHTML
            current_string = current_number.innerHTML
            numberFormat();
            console.log('f')
            return;
        }
    }
    if(current_number.innerHTML === '')return;
    if(!current_number.innerHTML.includes('-')) {
        current_number.innerHTML = '-' + current_string
        current_show.innerHTML =  current_number.innerHTML
        current_string = current_number.innerHTML
        numberFormat();
        console.log('g')
    }else {
        current_string = current_string.replace(/\-/g, "");
        current_number.innerHTML = current_string;
        current_show.innerHTML =  current_number.innerHTML;
        current_string = current_number.innerHTML
        current_operation_number = '';
        numberFormat();
        console.log('h')
    }   
}

function clearCurrent () {
    block = false;
    if(percent.disabled === true) {
        disableBtns();
    }
    displayNumbers.style.fontSize = '3rem'
    switchDisplayBack();
    current_show.innerHTML = '';
    current_number.innerHTML = '0';
    current_string = '';
}

function clearAll () {
    block = false;
    if(percent.disabled === true) {
        disableBtns();
    }
    displayNumbers.style.fontSize = '3rem';
    switchDisplayBack();
    current_number.innerHTML = '0';
    current_show.innerHTML = '0';
    current_operation.innerHTML = '';
    current_string = '';
    current_operation_number = '';
    help_number = '';
    current_sign = '';
    help_sign = '';
}

function unDo () {
    if(current_operation.innerHTML.includes('=')) {
        clearAll();
        return;
    }
    
    if(current_string.length === 14){ 
        displayNumbers.style.fontSize = '3rem';
    }
    if(current_string.length === 16){ 
        displayNumbers.style.fontSize = '2.5rem';
    }
    current_string = current_string.slice(0,current_string.length - 1);
    current_number.innerHTML = current_string;
    numberFormat();
}

function equal () {
    if(block=== true) {return;}
    if(percent.disabled === true) {
        clearAll();
        disableBtns();
    }
    if(current_operation.innerHTML === current_show.innerHTML && current_sign === '') {
        current_operation.innerHTML = current_show.innerHTML;
        current_operation_number = '';
        return;
    }
    if(current_number.style.fontSize != '100%') {
        current_number.style.fontSize = '100%'
    }
    displayNumberSize();
    if(current_operation.innerHTML.includes('/') && current_sign === '') {
        current_operation.innerHTML = current_string + ' ' + '=';
        current_show.innerHTML = current_string;
        numberFormat ()
        block = true;
        return;
    }
    if(current_operation.innerHTML.includes('sqr') && current_sign === '') {
        current_operation.innerHTML = current_string + ' ' + '=';
        current_show.innerHTML = current_string;
        numberFormat ()
        block = true;
        return;
    }
    if(current_string === '0' && current_sign === '÷' || current_string === '' && current_sign === '÷') {
        current_operation_number === ''
        current_operation.innerHTML = current_operation_number + '÷' + '0'
        current_show.innerHTML = 'division by zero is not allowed';
        disableBtns();
        operation.disabled = true;
        switchDisplayFront ();
        return;
    }
    if( current_operation_number === '' && current_number.innerHTML === '0') {
        current_operation.innerHTML = '0' + ' ' + '='
        current_show.innerHTML = 0;
        current_operation_number === ''
        switchDisplayFront ();
        return;
    }
    if(current_operation_number === current_show.innerHTML.replace(/\s/g, "") && current_string === '') {
        current_string = current_show.innerHTML
        current_operation.innerHTML = current_operation_number + ' ' + current_sign + ' ' + current_string.replace(/\s/g, "") + " =";
        dotAndZero();
        calculate(); 
        resultFormat();
        help_number = current_string;
        help_sign = current_sign;
        return;
    }
    if( current_operation_number === '' && current_string != '0' && !current_operation.innerHTML.includes('=')) {
        current_operation.innerHTML = current_string + ' =';
        current_string = '';
        current_number.innerHTML = '';
        switchDisplayFront ();
        block = true;
        return;
    }
    
    if(current_operation.innerHTML.includes('=') && help_number != '') {
        current_string = help_number;
        current_sign = help_sign;
        current_operation_number = current_show.innerHTML.replace(/\s/g, "");
        current_operation.innerHTML = current_operation_number + ' ' + current_sign + ' ' + current_string + " =";
    dotAndZero();
    calculate(); 
    resultFormat();
    switchDisplayFront ();
    current_number.innerHTML = '';
    infinity();
    return;
    }
    if(current_string != '' && current_operation_number === '' && current_show.innerHTML != '') {
        current_operation.innerHTML = current_show.innerHTML.replace(/\s/g, "") + ' ' + '=';
        numberFormat();
        return;
    }
    dotAndZero();
    calculate(); 
    current_operation.innerHTML = current_operation_number + ' ' + current_sign + ' ' + current_string + " =";
    resultFormat();
    help_number = current_string;
    help_sign = current_sign;
    current_string = '';
    result = '';
    current_sign = '';
    current_number.innerHTML = '';
    switchDisplayFront ();
    displayNumberSize();
    infinity();
}

number.forEach((number) => number.addEventListener('click', addNumber))
operation.forEach((sign) => sign.addEventListener('click', addSign))
clear_current.addEventListener('click', clearCurrent)
clear.addEventListener('click', clearAll)
equals.addEventListener('click', equal)
dot.addEventListener('click', addDot)
oposite.addEventListener('click', opositeNumber)
percent.addEventListener('click', doPercent)
fraction.addEventListener('click', doFraction)
power.addEventListener('click', doPower)
sqrt.addEventListener('click', doSqrt)
undo.addEventListener('click', unDo)