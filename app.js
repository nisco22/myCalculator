//CALCULATOR CLASS
class Calculator{
    constructor(previousOperandElement, currentOperandElement){
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }
    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number){
        if(number == '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation){
        if(this.currentOperand == "") return
        if(this.previousOperand != ""){
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "÷":
                computation = prev / current;
                break;
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }
    updateDisplay(){
        this.currentOperandElement.innerText = this.currentOperand;
        this.previousOperandElement.innerText = this.previousOperand;
    }
}

//SELECTORS
const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const deleteBtn = document.querySelector('[data-delete]');
const equalsBtn = document.querySelector('[data-equals]');
const allClearBtn = document.querySelector('[data-all-clear]');
const previousOperandElement = document.querySelector('[data-operand-top]');
const currentOperandElement = document.querySelector('[data-operand-bottom]');

//CALCULATOR OBJECT
const calculator = new Calculator(previousOperandElement, currentOperandElement);


//EventListeners
numberBtn.forEach(number => {
    number.addEventListener('click', ()=>{
        calculator.appendNumber(number.innerText);
        calculator.updateDisplay();
    })
});

operationBtn.forEach(operation => {
    operation.addEventListener('click', ()=>{
        calculator.chooseOperation(operation.innerText);
        calculator.updateDisplay();
    })
});

equalsBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})