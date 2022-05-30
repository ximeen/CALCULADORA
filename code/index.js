import './main.scss'

const app = document.querySelector("#app");
    app.innerHTML = 
    `
        <main class="main">
            <h3 class="main__Title"> Calculadora </h3>

            <div class="main__ContainerOperations">
                <div class="main__LastOperationText"></div>
                <div class="main__CurrentOperationText"></div>

            </div>    
            <div class="main__ContainerButtons">
                <button class="main__buttons"> CE </button>
                <button class="main__buttons"> C </button>
                <button class="main__buttons"> DEL </button>
                <button class="main__buttons"> / </button>
                <button class="main__buttons main__number"> 7 </button>
                <button class="main__buttons main__number"> 8 </button>
                <button class="main__buttons main__number"> 9 </button>
                <button class="main__buttons"> * </button>
                <button class="main__buttons main__number"> 4 </button>
                <button class="main__buttons main__number"> 5 </button>
                <button class="main__buttons main__number"> 6 </button>
                <button class="main__buttons"> - </button>
                <button class="main__buttons main__number"> 1 </button>
                <button class="main__buttons main__number"> 2 </button>
                <button class="main__buttons main__number"> 3 </button>
                <button class="main__buttons"> + </button>
                <button class="main__buttons main__number"> 0 </button>
                <button class="main__buttons main__number"> . </button>
                <button class="main__ButtonEqual" >  = </button>


            </div>
        </main>
    `

const LAST_OPERATION_TEXT = document.querySelector(".main__LastOperationText");
const CURRENT_OPERATION_TEXT = document.querySelector(".main__CurrentOperationText");
const BUTTONS = document.querySelectorAll(".main__ContainerButtons button");


class CALCULATOR{
    constructor(LAST_OPERATION_TEXT, CURRENT_OPERATION_TEXT){
        this.LAST_OPERATION_TEXT = LAST_OPERATION_TEXT;
        this.CURRENT_OPERATION_TEXT = CURRENT_OPERATION_TEXT;
        this.CURRENT_OPERATION = "";
    }
    
    // ADD DIGITS TO CALCULATOR SCREEN
    ADD_DIGITS(digit){

        // CHECK IF CURRENT OPERATION ALREADY HAS A DOT
        if(digit === "." && this.CURRENT_OPERATION_TEXT.innerText.includes(".")){
            return;
        }
        this.CURRENT_OPERATION = digit;
        this.UPDATE_SCREEN();
    }

    // ADD OPERATIONS TO CALCULATOR

    ADD_OPERATION(operation){

        // CHECK IF CURRENT IS EMPTY
        if(this.CURRENT_OPERATION_TEXT.innerText === "" && operation !== "C"){
            
            // CHANGE OPERATION
            if(this.LAST_OPERATION_TEXT.innerText !== ""){
                this.CHANGE_OPERATION(operation);
            }
            return;
        }


        // GET CUURENT VALUE AND PREVIOUS VALUE
            let OPERATION_VALUE;
            const PREVIOUS = +this.LAST_OPERATION_TEXT.innerText.split(" ")[0];
            const CURRENT = +this.CURRENT_OPERATION_TEXT.innerText;

            switch(operation){
                case "+":
                    OPERATION_VALUE = PREVIOUS + CURRENT;
                    this.UPDATE_SCREEN(OPERATION_VALUE,operation, CURRENT, PREVIOUS )
                        break;

                case "-":
                    OPERATION_VALUE = PREVIOUS - CURRENT;
                    this.UPDATE_SCREEN(OPERATION_VALUE,operation, CURRENT, PREVIOUS )
                        break;

                case "/":
                    OPERATION_VALUE = PREVIOUS / CURRENT;
                    this.UPDATE_SCREEN(OPERATION_VALUE,operation, CURRENT, PREVIOUS )
                        break;

                case "*":
                    OPERATION_VALUE = PREVIOUS * CURRENT;
                    this.UPDATE_SCREEN(OPERATION_VALUE,operation, CURRENT, PREVIOUS )
                        break;

                case "DEL":
                    this.DEL();
                    break;

                case "CE":
                    this.CLEAR_OPERATION();
                        break;

                case "C":
                    this.CLEAR_ALL_OPERATIONS();
                        break;
                        
                case "=":
                    this.EQUAL();
                        break;
                default:
                    return;
            }
    }

    // CHANGE VALUES TO SCREEN CALCULATOR!
    UPDATE_SCREEN(OPERAION_VALUE=null, operation=null, PREVIOUS=null, CURRENT=null){
        console.log(OPERAION_VALUE, operation, CURRENT, PREVIOUS )
        if(OPERAION_VALUE === null){
            this.CURRENT_OPERATION_TEXT.innerText += this.CURRENT_OPERATION;

        }else{
            // CHECK IF VALUE IS ZERO, IF IT IS JUST A CURRENT VALUE
            if(PREVIOUS === 0){
                OPERAION_VALUE = CURRENT;
            }
            // ADD CURRENT VALUE TO PREVIUS 
            this.LAST_OPERATION_TEXT.innerText = `${OPERAION_VALUE} ${operation}`
            this.CURRENT_OPERATION_TEXT.innerText = "";
        }
    }
    
    CHANGE_OPERATION(operation){
        const MATH_OPERATIONS = ["+", "/", "*", "-"];

        if(!MATH_OPERATIONS.includes(operation)){
            return;
        }

        this.LAST_OPERATION_TEXT.innerText = this.LAST_OPERATION_TEXT.innerText.slice(0, -1) + operation;

    }

    // DELETE THE LAST DIGIT
    DEL(){
        this.CURRENT_OPERATION_TEXT.innerText = this.CURRENT_OPERATION_TEXT.innerText.slice(0, -1);
    }

    CLEAR_OPERATION(){
        this.CURRENT_OPERATION_TEXT.innerText = "";
    }

    CLEAR_ALL_OPERATIONS(){
        this.CURRENT_OPERATION_TEXT.innerText = "";
        this.LAST_OPERATION_TEXT.innerText = "";
    }

    EQUAL(){
        const OPERATION = this.LAST_OPERATION_TEXT.innerText.split(" ")[1];
        this.ADD_OPERATION(OPERATION);
    }
}

    // CALL DE CLASS AND PASSING PARAMS! 
const CALC = new CALCULATOR(LAST_OPERATION_TEXT, CURRENT_OPERATION_TEXT);


BUTTONS.forEach((Button)=>{
   Button.addEventListener('click', (event)=>{
       const VALUE = event.target.innerText;

        // CHECK IF DE VALUE HAS A NUMBER OR A DOT ELSE IS A OPERATION!
       if(+VALUE >= 0 || VALUE === "."){
           CALC.ADD_DIGITS(VALUE);
       }else{
           CALC.ADD_OPERATION(VALUE);
       }
   })
})