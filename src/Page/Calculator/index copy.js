import React, { useEffect,useState } from 'react';
import Button from "../../Components/Button";
import "./calculator.css";


var calculator = {
    display:"",
    op_values:[],
    operater:"",
    operation:function(){
       return eval(this.op_values[0].toString() +  this.op_values[0].toString());
    }
}

function Calculator(){
    
    var test = 1;
    const keys = [7,8,9,"x",4,5,6,"-",1,2,3,"+",0,"C","=","÷"];
    const resultsRender = [];
    const [display_value, setDisplay_value] = useState("");
    const [temp, setTemp] = useState("");
    const [operation, setOperation] = useState(false);
    const [operation_value, setOperation_value] = useState("");
    const [operation_temp_value, setOperation_temp_value] = useState("");

   const key_click = function(){

       let clicked_value = this;

       console.log(calculator.operation.call({op_values:[1,12],operater:"+"}));
       console.log(calculator);

      
       switch(typeof clicked_value) {
        case "number":

             if(clicked_value === 0 && display_value === ""){
                 return false;
             }
       
            if( operation_value === "" ){
                setDisplay_value( (prev) => prev.toString() + this.toString());
                calculator.display = display_value;
            }else{
                setDisplay_value("");
                setOperation_temp_value(operation_value);
                setOperation_value("");
                setDisplay_value( (prev) => prev.toString() + this.toString());
            }


          break;
        case "string":

               switch (clicked_value) {
                case "C":
                    setDisplay_value("");
                    setTemp("");
                    setOperation(false);
                    setOperation_temp_value("");
                    break;
                case "+":
                    if(!operation){
                        setTemp(display_value);
                        setOperation(true);
                        setOperation_value("+");
                    }
                    break;
                case "-":
                    if(!operation){
                        setTemp(display_value);
                        setOperation(true);
                        setOperation_value("-");
                    }
                    break;
                case "÷":
                    if(!operation){
                        setTemp(display_value);
                        setOperation(true);
                        setOperation_value("/");
                    }
                    break;
                case "x":
                    if(!operation){
                        setTemp(display_value);
                        setOperation(true);
                        setOperation_value("*");
                    }
                    break;
                case "=":
                    if(temp !=="" && operation_temp_value!==""){
                        let cal = eval( `${temp}` + `${operation_temp_value}` +  `${display_value}`);
                        setDisplay_value(cal);
                        setTemp("");
                        setOperation(false);
                    }
   
                break;
                }

          break;
        default:
           
      }


   }

   const display_value_trigger = function(e){
    setDisplay_value(e.target.value.toString());
   }

  
    for (var i = 0; i < keys.length; i += 4) {
        resultsRender.push(
          <div key={i}  className="btn-wrapper">
          {
            keys.slice(i, i + 4)
              .map(x => (
                <Button key={x} button_cls={!isNaN(x) ? "btn-gray" : "btn-yellow" } button_text={x} onClick={key_click}/>
              ))
          }
          </div>
        );
      }

      useEffect(() => {
       console.log("load");
        return () => {
            console.log("remove"); 
        }
      });

    return (

       <div className="container">
              
              <div className="cal-div">
                  <div className="text-field-area">
                      <div className="display-input-wrapper">
                         <input name="display" className="display-input" placeholder='0' value={display_value} onChange={display_value_trigger}  /> 
                      </div>
                  </div>

                   <div className="key-pad">
         
                       {
                         resultsRender     
                       }

                   </div>
                   
              </div>
              
                
       </div>

       )
}

export default Calculator;

