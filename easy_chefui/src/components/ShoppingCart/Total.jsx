import { useEffect } from "react";
import all_ingredients from "./GetIngredients";
import { MDBContainer, MDBListGroup, MDBListGroupItem, MDBRow } from "mdb-react-ui-kit";

function Total() {
    let total = all_ingredients();
    console.log("ingredients", total);
    

    
    const totalList = Object.entries(total).map(([key, value]) => {
        
        return (<MDBListGroupItem>{`${key}: ${value.amount} ${value.amount_type}`}</MDBListGroupItem>);
    });
    return (  
    <>  
        
        <h2 className="total pt-5 mb-3">Total</h2>
    
        <MDBListGroup className="square border rounded mb-5" style={{ minWidthL: '22rem' }} light>
            {totalList}
        </MDBListGroup>
        
    

    </>
    );
}

export default Total;