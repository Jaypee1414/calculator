class Calculator{
    constructor(previous_operand, current_operand){
        this.previous_operand = previous_operand;
        this.current_operand = current_operand;
        this.clear();
    }

    clear(){
        this.currentOperand='';
        this.previousOperand='';
        this.operation =undefined;
    };

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    };

    appendNumber(number){
        if(number==='.' && this.currentOperand.includes('.')) return // condition for decimal button 
        this.currentOperand = this.currentOperand.toString() + number.toString(); // convert number to string
    };

    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    };

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break;

            case '-':
                computation = prev - current
                break;

            case '*':
                computation = prev * current
                break;

            case '/':
                computation = prev / current
                break;

            default:
                return
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = ''
    };

    updateDisplay(){
        this.current_operand.textContent = this.currentOperand;
        if(this.operation !=null){
            this.previous_operand.textContent = `${this.previousOperand} ${this.operation}`;
        }
       
    };

}






const numberButtons = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const percentButton = document.querySelector('[data-percent]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-all-clear]');
const equalButton = document.querySelector('[data-equal]');
const previous_operand = document.querySelector('[data-previous-operand]');
const current_operand = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previous_operand,current_operand);


numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    }
    )
})

operationButton.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.textContent);
        calculator.updateDisplay();
    }
    )
})

equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})


clearButton.addEventListener('click' , button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click' , button => {
    calculator.delete();
    calculator.updateDisplay();
})