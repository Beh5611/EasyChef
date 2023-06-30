import React, {useState} from "react";
import "./style.css"

const Ingredient = (props) => {
    

    const del = (e) => {
        console.log("del", e.target);
        // setRender(false);
        // e.preventDefault();

        props.inglst.splice(props.index, 1);
        props.amountlst.splice(props.index, 1);
        props.quantitylst.splice(props.index, 1);
        console.log(props.index);
        console.log(props.inglst);


    
        
        // props.updateIngLst(props.inglst, props.amountLst);

        props.render();
        
        

        
    
      };


        return(
            <>
           
            <div className="task" id={props.index + props.text}>
                        <span className="step-text">{props.text} {props.quantitylst[props.index]} {props.amountlst[props.index]}</span>
                    <button className="delete" onClick={del}>
                        <i className="far fa-trash-alt"></i>
                    </button>
            </div>
      
    
            </>
        )

      }

export default Ingredient;
