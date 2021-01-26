class Calculator{

    constructor(currentInput,previousInput){
        this.currentInput = currentInput; 
        this.previousInput = previousInput;  
        this.clear();
    } 

    clear(){ 
        let dis = displays; 
        this.currentInput = '';
        this.previousInput = '';
        dis.forEach(display =>{
            display.innerHTML = '';
        })
    } 

    appendNum(btn){
       let currNum = btn.innerHTML;  
       if(this.currentInput.includes(".") && currNum == ".") return; 
        this.currentInput += currNum; 

    } 

    operator(oper){
        let prevDisplay = displays[0]; 

        this.currentInput += oper.innerHTML;  

        this.previousInput += this.currentInput;  
        prevDisplay.innerHTML = this.previousInput; 

        this.currentInput = '';   
        
    } 

    updateDisplay(){ 
    
        let currentDisplay = displays[1];
        let prevDisplay = displays[0]; 
        
        currentDisplay.innerHTML = this.currentInput; 
    }  

     calculate(){
        let currentDisplay = displays[1]
        let prevDisplay = displays[0]

         let prevInput = this.previousInput; 
         let currInput = this.currentInput;
         let combinedInput = (prevInput += currInput);    
        
         prevDisplay.innerHTML = combinedInput;

         console.log(eval(combinedInput));   
         currentDisplay.innerHTML = eval(combinedInput); 

     }

}



// Node Lists
const number_btns = document.querySelectorAll(".number"); 
const clear_btns = document.querySelectorAll(".clr-btn"); 
const operator_btns = document.querySelectorAll(".operator"); 
const displays = document.querySelectorAll(".displays")

// Single element
const submit_btn = document.querySelector(".submit");  

// Virtual calcuator
let calculator = new Calculator("",""); 


clear_btns.forEach(btn =>{
    btn.addEventListener('click',()=>{
        calculator.clear();
    })
}) 

number_btns.forEach(btn =>{
    btn.addEventListener('click', () =>{
        calculator.appendNum(btn); 
        calculator.updateDisplay();
    })
})

operator_btns.forEach(btn =>{
    btn.addEventListener('click', () => {
        calculator.operator(btn); 
        calculator.updateDisplay();
    })
})

submit_btn.addEventListener('click', () => {
    calculator.calculate();
})























