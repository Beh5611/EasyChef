import React, {useState} from "react";
// import Step from '../Ingredient';
import Ingredient from "../Ingredient";

const IngredientList = (props) => {
    const [rerender, setRerender] = useState(false);
    console.log("hi from inglst")
    // onChange={() => setRerender(!rerender)}
    // setRerender(!rerender); 
    const aids  = () => {
        setRerender(!rerender);
    }
    return(
    
    
    <>
        {props.inglst.map((text, index) =>
            
            <Ingredient render={aids} text={text} key={index} index={index} inglst={props.inglst} amountlst= {props.amountlst} quantitylst={props.quantitylst}/>
        )     
        }
    
    </>
        
    )



}
export default IngredientList;