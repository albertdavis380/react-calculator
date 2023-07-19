import React from 'react';
import './Button.css';
function Button(prop) {
    return (
       <div onClick={prop.onClick.bind(prop.button_text)} className={"Button " + prop.button_cls}>
           {prop.button_text}
      </div>
    );
  }
  
  export default Button;