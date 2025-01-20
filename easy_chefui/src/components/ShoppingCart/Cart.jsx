import { useEffect, useState } from "react";
import axios from "axios";
import useAxios from "../Auth/AuthAxios";
import {
  MDBListGroup,
  MDBListGroupItem,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBContainer,
} from "mdb-react-ui-kit";
import "./cart_style.css";
function Cart({ recipeID, onLoad, update }) {
  const api = useAxios();
  const [recipe, setRecipe] = useState({});
  const [serving, setServing] = useState(1);
  const [ingredients, setIngredients] = useState([]);
  const [render, setRender] = useState(true);
  useEffect(() => {
    const getRecipe = async () => {
      const response = await api.get(
        `${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/recipes/${recipeID}/`
      );
      console.log("getRecipe", response.data);
      setRecipe(response.data);
    };
    getRecipe();

    const getIngredients = async () => {
      const response = await api.get(
        `${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/recipes/${recipeID}/ingredients/`
      );
      setIngredients(response.data.results);
    };
    getIngredients();
  }, []);
  const deleteRecipe = async () => {
    await api
      .get(
        `${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/ShoppingCart/${recipeID}/remove/`,

        { withCredentials: true }
      )
      .then((response) => {
        setRender(false);
      })
      .catch(function (error) {
        console.log(error);
        //Either not authenticated or shopping cart not found.
      });
  };

  const strike_line = (event) => {
    if (event.target.parentNode.children[1].style.textDecoration) {
      event.target.parentNode.children[1].style.removeProperty(
        "text-decoration"
      );
    } else {
      event.target.parentNode.children[1].style.textDecoration = "line-through";
    }
  };

  const ingArray = ingredients.map((ingredient) => {
    return (
      <MDBListGroupItem className="hoverStuff" tag="label">
        <div className="innerUL">
          <MDBCheckbox
            onClick={strike_line}
            label={`${ingredient.name}: ${
              parseInt(ingredient.amount) * serving
            } ${ingredient.amount_type}(s)`}
          />
        </div>
      </MDBListGroupItem>
    );
  });
  if (render) {
    return (
      <>
        <MDBCol className="align-items-start d-flex" size="3">
          <img className='recimg' src={recipe.image} alt="RecipeImage" />
        </MDBCol>
        <MDBCol className="h-100" size="9">
          <div className="plus">
            <MDBBtn tag="a" color="none" className="m-1 trash">
              <MDBIcon
                fas
                icon="trash-alt"
                onClick={() => {
                  deleteRecipe();
                  update();
                }}
              />
            </MDBBtn>
            <li className="first"> {`${recipe.name} x${serving}`}</li>
            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              onClick={() => {
                setServing(serving + 1);
                update();
              }}
            >
              <MDBIcon fas icon="plus" />
            </MDBBtn>
            <MDBBtn
              tag="a"
              color="none"
              className="m-1 min"
              onClick={() => {
                if (serving > 1) {
                  setServing(serving - 1);
                  update();
                }
              }}
            >
              <MDBIcon fas icon="minus" />
            </MDBBtn>
          </div>
          <MDBListGroup className="container2" light>
            <div className="innerList">{ingArray}</div>
          </MDBListGroup>
        </MDBCol>
      </>
    );
  } else {
    return <></>;
  }
}

export default Cart;
