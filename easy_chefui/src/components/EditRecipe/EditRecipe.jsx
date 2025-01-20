import StepList from "../StepList";
import IngredientList from "../IngredientList";
import LoggedIn from "../Navbar/LoggedIn";
import React, {useState, useEffect} from "react";
import './style.css';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import { Thumb } from "../Auth/FormUtils";
import useAxios from "../Auth/AuthAxios.js"
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBTextArea,
  MDBCheckbox,
  MDBBtn,
  MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBValidation, MDBSwitch, MDBValidationItem 
} from 'mdb-react-ui-kit';
import { useAuth } from "../Auth/AuthContext";
import { useLoaderData } from "react-router-dom";


const EditRecipe= () => {
  const { user, logoutUser, authRedirect, unauthRedirect } =
  useAuth();

    const [lst, SetLst] = useState([]);
    const [val, SetVal] = useState("");
    const [ingval, SetIngVal] = useState("");
    const [inglst, SetIngLst] = useState([]);
    const [results, setResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [amountType, setAmountType] = useState("");
    const [amountLst, setAmountLst] = useState([]);
    const [quantity, setQuantity] = useState("");
    const [quantitylst, setQuantityLst] = useState([]);
    const [stepimagelst, setStepImageLst] = useState([])
    const [imageval, setImageVal] = useState()
    const [description, setDescription] = useState("");
    const [rname, setRName] = useState("");
    const [dummystate, setDummyState] = useState(false);
    const [cuisineName, setCuisineName] = useState("");
    const [serving, setServing] = useState("");
    const [preptime, setPrepTime] = useState("");
    const [cooktime, setCookTime] = useState("");
    const [diet, setDiet] = useState({"Halal": false, "Vegetarian": false, 
    "Kosher": false, "Keto":false, "Gluten-Free":false, "Vegan": false});

    const data = useLoaderData();
    const api = useAxios();
    // const updateSetLst = (someval) => {
    //     SetLst(someval);
    //     console.log(lst);
    // }

    // const updateIngLst = (lst1, lst2) => {
    //   SetIngLst(lst1);
    //   // setAmountLst(lst2);
    //   console.log(inglst);


    // }



    const addToLst = () => {

      if(val !== ""){
        let arr = lst;
        arr.push(val);
        SetLst(arr);
        SetVal("");
      }
    
        // console.log("addlst", arr);
    }
    let lst_component = <IngredientList inglst={inglst} amountlst = {amountLst} quantitylst={quantitylst}/>;

   useEffect(() => {
      const getData = async () => {
     
          await api.post(
              `${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/recipes/auto-complete/`, 
              {
                ingredient: ingval,

              }
          ).then(response => {
            const results = response.data["response"];
            setResults(results);
            console.log(results);
            console.log(response.status);
          })
          .catch(error => {
            console.error(error);
          });
      }
      getData();

    lst_component = <IngredientList inglst={inglst} amountlst = {amountLst} quantitylst={quantitylst}/>;
        
  }, [ingval, inglst, amountLst, quantitylst]);

  const handleSuggestionClick = (suggestion) => {
    SetIngVal(suggestion);
    setShowSuggestions(false);
}
const handleSelect = (e) => {
  setAmountType(e.target.value);
}


const addIngAndAmount = () => {
  console.log("checking", ingval, quantity, amountType)
  if(ingval && quantity && amountType){
    let arr1 = amountLst;

    arr1.push(amountType);
    setAmountLst(arr1);
    // setAmountType("");
    // setDummyState(true);
    console.log(amountLst);
    let arr = inglst;
  
    arr.push(ingval);
    SetIngLst(arr);
    // SetIngVal("");
    // setDummyState(true);
  
  
    let arr2 = quantitylst;
    arr2.push(quantity);
    setQuantityLst(arr2);
    
    // setQuantity("");
  
    setDummyState(!dummystate);
 
    console.log(inglst)

  }
 
 
}

console.log("post data", data);



  const getRecipe = async () => {
//    setDescription(data["description"]);
//    setRName(data["title"]);
    await api.get(
        `${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/recipes/${data["recipe"]}`
    ).then(async response => {
      const recipe_id = response.data["id"];
      const recipe_name = response.data["name"];
      const recipe_cuisine = response.data["cuisine"];
      const prep_time = response.data["prep_time"];
      const cook_time = response.data["cook_time"];


      console.log("response for recipe", response);
      // get Recipe data and prefill the form
        setRName(recipe_name);
        setPrepTime(prep_time);
        setCookTime(cook_time);
      
      
    //   const get_diet_lst = [];
    //   if(diet.Halal === true){
    //     get_diet_lst.push("Halal");
    //   }
    //   if(diet.Vegan === true){
    //     get_diet_lst.push("Vegan");
    //   }
    //   if(diet.Kosher === true){
    //     get_diet_lst.push("Kosher");
    //   }
    //   if(diet.Keto === true){
    //     get_diet_lst.push("Keto");
    //   }
    //   if(diet.Vegetarian === true){
    //     get_diet_lst.push("Vegetarian");
    //   }
    //   if(diet["Gluten-Free"] === true){
    //     get_diet_lst.push("Gluten-Free");
    //   }
    
    //   console.log(get_diet_lst);

   

      
    //   get_diet_lst.forEach(async (item) => {
      
    //     const response =   await api.post(
    //       `${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/recipes/${item}/add-diet/`, 
    //       {
        
    //         recipe_ID: recipe_id
    //       }
    //     )
    //     .catch(async (error) => {
    //       console.error(error);
    //       const response2 =   await api.post(
    //         `${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/recipes/create-diet/`, 
    //         {
    //           name: item,
    //           recipe_ID: [recipe_id] 
    //         }
    //       )
    //       .catch(error => {
    //         console.error(error);
    //       });
    //       if(response2.status === 200){
    //         console.log("created new diet");
    //       }
    //     });


    //   })
      

    //   inglst.forEach(async (item, index) => {

    //     await api.post(
    //       `${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/recipes/${recipe_id}/add-ingredient/`, 
    //       {
    //         name: item, 
    //         amount: parseInt(quantitylst[index]),
    //         amount_type: amountLst[index],
            
    //       }
    //     )
    //     .catch(error => {
    //       console.error(error);
    //     });
        
    //   })


    //  await api.post(
    //     `${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/posts/create/`, 
    //     {
    //       title: rname, 
    //       recipe: recipe_id, 
    //       description: description,
    //       owner: user.id
          
    //     }
    //   )
    //   .catch(error => {
    //     console.error("post not created");
    //   });
      
      


      
    })
    .catch(error => {
      console.error(error);
    });
}
getRecipe();

    
    return(

        <>
        <LoggedIn/>
        
        <MDBValidation>
            <h2>Create a New Recipe</h2>
            <MDBRow className="mb-4">
                <MDBCol>
                    <MDBRow>
                      <label htmlFor="name">Recipe Name</label>
                      <MDBInput type="text" id="recipe-name" name="name" value={rname} onChange={(e) => setRName(e.target.value)}/>

                    </MDBRow>
                    <MDBRow>
                      <label>Description Details</label>
                      <MDBTextArea label="Write specific steps to create recipe" rows={4} id="description-input" onChange= {(e) => setDescription(e.target.value)}/>
                    </MDBRow>
                </MDBCol>

                <MDBCol>
                    <label htmlFor="recipe-ingredients">Ingredients</label>
                      <div className="ingredient-input">
                            <MDBInput type="text"  value = {ingval} onChange={(e) => {SetIngVal(e.target.value); setShowSuggestions(true)}} required/>
                            { showSuggestions && (<ul className='suggestions'>
                            {results?.map((result, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(result)}>{result}</li>
                            ))}
                        </ul>)
                    }     
                    <MDBRow>

                      <MDBCol>
                      <Form.Select aria-label="Default select example" id="amount-type" onChange={handleSelect} required>
                            <option>amount type</option>
                            <option value="Tablespoon">tsp</option>
                            <option value="Teaspoon">ts</option>
                            <option value="Ounces">oz</option>
                            <option value="Milliliter">ml</option>
                            <option value="Milligram">mg</option>
                            <option value="Gram">g</option>
                            <option value="Cup">c</option>
                          </Form.Select>

                      </MDBCol>

                      <MDBCol>
                          <MDBInput type="text" placeholder="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required/>
                      </MDBCol>
                    

                      

                    </MDBRow>
                          

                      </div>
                    
                   
                    <MDBBtn color="warning" onClick={(e) => addIngAndAmount()}>Add</MDBBtn>
                    {lst_component}


                </MDBCol>

            </MDBRow>

            <MDBRow>
       
                <MDBCol> 
                  <label>Diets</label>
                  <MDBRow>
                    <MDBRow>
                      <MDBCol>
                        <MDBSwitch id='flexSwitchCheckDefault' label='Halal' onChange={() => setDiet(prevState => ({...prevState, Halal: !prevState.Halal}))} />

                      </MDBCol>
                      <MDBCol>
                        <MDBSwitch id='flexSwitchCheckDefault' label='Vegan'  onChange={() => setDiet(prevState => ({...prevState, Vegan: !prevState.Vegan}))} />

                      </MDBCol>
                      <MDBCol>
                        <MDBSwitch id='flexSwitchCheckDefault' label='Vegetarian' onChange={() => setDiet(prevState => ({...prevState, Vegetarian: !prevState.Vegetarian}))}/>

                      </MDBCol>
                  
                    </MDBRow>

                    <MDBRow>
                      <MDBCol>
                        <MDBSwitch id='flexSwitchCheckDefault' label='Keto' onChange={() => setDiet(prevState => ({...prevState, Keto: !prevState.Keto}))}/>
                      </MDBCol>
                      <MDBCol>
                        <MDBSwitch id='flexSwitchCheckDefault' label='Gluten-Free' onChange={() => setDiet(prevState => ({...prevState, "Gluten-Free": !prevState["Gluten-Free"]}))}/>
                      </MDBCol>
                      <MDBCol>
                        <MDBSwitch id='flexSwitchCheckDefault' label='Kosher'  onChange={() => setDiet(prevState => ({...prevState, Kosher: !prevState.Kosher}))}/>
                      </MDBCol>
                    </MDBRow>


                  </MDBRow>



                  <MDBRow>
                    <MDBValidationItem className="col-12">
                          <label htmlFor="avatar" className="form-label">
                            Recipe Image
                          </label>
                          <MDBInput
                            onChange={ (event) => {
                              // console.log(event.currentTarget.files[0]);
                              setImageVal(event.currentTarget.files[0]);
                            }}
                            id="avatar"
                            type="file"
                          />
                          {imageval && <Thumb file={imageval} />}
                    </MDBValidationItem>
                  </MDBRow>
                  <br/>
                  <MDBRow>

                    <MDBCol>
                        <MDBInput type="text" label="preptime" onChange={(e) => setPrepTime(e.target.value)}/>
                        <MDBInput type="text" label="cooktime" onChange={(e) => setCookTime(e.target.value)}/>
                        <MDBInput type="text" label="cuisine" onChange={(e) => setCuisineName(e.target.value)}/>
                        <MDBInput type="text" label="serving size" onChange={(e) => setServing(e.target.value)}/>
                    </MDBCol>
                    

                  </MDBRow>


                </MDBCol>


                <MDBCol>
                <label htmlFor="recipe-directions">Steps</label>
                <MDBTextArea label="Write specific steps to create recipe" rows={4} id="instructions-input" value={val} onChange={(e) => SetVal(e.target.value)}/>
                <MDBBtn color="warning" onClick={addToLst}>Add</MDBBtn>
                <br/>
                <StepList list={lst} stepimglst={stepimagelst} setter={setStepImageLst} />  
                    
          
                </MDBCol>
             
                
            </MDBRow>

            
              
            <MDBBtn color="warning" type="submit" >Update Recipe</MDBBtn>
        
        </MDBValidation>


        </>
    )



}
export default EditRecipe;