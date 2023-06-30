import React, {useState} from "react";
import Step from '../Step';

const StepList = (props) => {
   
    const [rerender, setRerender] = useState(false);

    // onChange={() => setRerender(!rerender)}
    // setRerender(!rerender); 
    const aids  = () => {
        setRerender(!rerender);
    }

    return(<>
        {props.list.map((text, index) => 
            <Step render={aids} text={text} index={index} lst={props.list} stepimglst={props.stepimglst} setter={props.setter}/>
            )     
        }
    
    </>
        
    )



}
export default StepList;