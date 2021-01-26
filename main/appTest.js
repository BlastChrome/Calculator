class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement; 
        this.currentOperandTextElement = currentOperandTextElement; 
        this.clear();
    } 
    clear(){
        this.currentOperand = '';  
        this.previousOperand = '';   
        this.operation = undefined;   
        this.previousOperandTextElement.innerText = '';
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    } 
    appendNum(number){ 
        if(number == "." && this.currentOperand.includes(".")) return;
        this.currentOperand =  this.currentOperand.toString() + number.toString();

    } 
    chooseOperation(operation){
        if(this.currentOperand === "") return 
        if(this.previousOperand !== ""){
            this.compute();
        }

        this.operation = operation; 
        this.previousOperand = this.currentOperand; 
        this.currentOperand = '';
    }  
    compute(){
        let computation; 
        const prev = parseFloat(this.previousOperand); 
        const curr = parseFloat(this.currentOperand); 
        if(isNaN(prev) || isNaN(curr)) return;  
        switch (this.operation){
            case '+': 
            computation = prev + curr 
            break;

            case '-': 
            computation = prev - curr 
            break;

            case '*': 
            computation = prev * curr 
            break;

            case '/': 
            computation = prev / curr 
            break;

            case '%': 
            computation = prev % curr 
            break; 

            default: 
            return
        } 
        this.currentOperand = computation; 
        this.operation = undefined; 
        this.previousOperand = '';
    } 
    
    getDisplayNumber(number){
        const stringNumber = number.toString(); 
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split('.')[1]; 

        let integerDisplay; 
        if(isNaN(integerDigits)) {
            integerDisplay = ''; 
        } else {
            integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0});
        } 
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else{
            return integerDisplay;
        }

    }

    updateDisplay(){ 
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);  
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } 
    }

}



const previousOperandTextElement = document.querySelector(".top-display"); 
const currentOperandTextElement = document.querySelector(".bot-display");


const num_btns = document.querySelectorAll(".number"); 
const operator_btns = document.querySelectorAll(".operator"); 
const submit_btn = document.querySelector(".submit");
const all_clear_btn = document.querySelector(".all-clear");  
const back_btn = document.querySelector(".c-btn"); 


const calc = new Calculator(previousOperandTextElement, currentOperandTextElement); 

num_btns.forEach(btn => {
    btn.addEventListener('click', () =>{
        calc.appendNum(btn.innerText); 
        calc.updateDisplay();
    })
})
operator_btns.forEach(btn => {
    btn.addEventListener('click', () =>{
        calc.chooseOperation(btn.innerText); 
        calc.updateDisplay();
    })
}) 

submit_btn.addEventListener('click', btn =>{
    calc.compute(); 
    calc.updateDisplay();
})

all_clear_btn.addEventListener('click', btn =>{
    calc.clear(); 
    calc.updateDisplay();
})
back_btn.addEventListener('click', btn =>{
    calc.delete(); 
    calc.updateDisplay();
})
     

 












