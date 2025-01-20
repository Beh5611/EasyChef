import { useEffect, useState } from "react";
import axios from "axios";
import Cart from './Cart';
import {MDBContainer, MDBRow } from 'mdb-react-ui-kit';

function CartList({update, onLoad}) {
    const [recipe, setRecipes] = useState([]);
    useEffect(() => {
        const getRecipes = async () => {
            await axios.get(`${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/ShoppingCart/get-cart/`, { withCredentials: true })
            .then((response) => {
                setRecipes(response.data.recipes)
            })
            .catch(function (error) {
                console.log(error);
                //Either not authenticated or shopping cart not found.
              });
            
            
        };
        getRecipes();

        // setTimeout(() => {
        //     onLoad();
        //   }, 500);
    }, []);
    

    const carts = recipe.map((i) => {
        return (
            <Cart onLoad ={onLoad} update={update} recipeID = {i}/>
        );
    });
    return ( 
        <div className="justify-content-center d-flex">
            
            
            <MDBContainer className="w-100 m-0 py-5 mt-5 square border rounded">
                <MDBRow className="gy-5 gx-0">
                    {carts}
                </MDBRow>
            </MDBContainer>
            
        
        </div>

    );
}

export default CartList;