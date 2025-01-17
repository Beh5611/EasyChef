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
  MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBValidation, MDBSwitch, MDBValidationItem, MDBContainer 
} from 'mdb-react-ui-kit';
import { useAuth } from "../Auth/AuthContext";


const RecipeForm = () => {
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

  //  useEffect(() => {
  //     const getData = async () => {
     
  //         await axios.post(
  //             `http://127.0.0.1:8000/recipes/auto-complete/`, 
  //             {
  //               ingredient: ingval,

  //             }
  //         ).then(response => {
  //           const results = response.data["response"];
  //           setResults(results);
  //           console.log(results);
  //           console.log(response.status);
  //         })
  //         .catch(error => {
  //           console.error(error);
  //         });
  //     }
  //     getData();

  //   lst_component = <IngredientList inglst={inglst} amountlst = {amountLst} quantitylst={quantitylst}/>;
        
  // }, [ingval, inglst, amountLst, quantitylst]);

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


const api = useAxios();
const handleSubmit = async () => {
  const sendRecipe = async () => {
    const formData = new FormData();

    formData.append("name", rname);
    formData.append("cuisine", cuisineName);
    formData.append("serving", serving);
    formData.append("image", imageval);
    formData.append("prep_time", preptime);
    formData.append("cook_time", cooktime);
    formData.append("owner", user.id);
   
    await api.post(
        `http://127.0.0.1:8000/recipes/create/`, formData
    ).then(async response => {
      const recipe_id = response.data["id"];
      console.log(lst[0]);
      
  
      lst.forEach(async (item, index) => {
        const formData = new FormData();
        console.log("image", stepimagelst[index], index);
        formData.append("number", index.toString());
        formData.append("recipe_ID", recipe_id)
   
      formData.append("description", item);
      // formData.append("image", stepimagelst[index]);
        await api.post(
          `http://127.0.0.1:8000/recipes/${recipe_id}/create-step/`, 
          formData
        )
        .catch(error => {
          console.error(error);
        });


      })
      
      
      const get_diet_lst = [];
      if(diet.Halal === true){
        get_diet_lst.push("Halal");
      }
      if(diet.Vegan === true){
        get_diet_lst.push("Vegan");
      }
      if(diet.Kosher === true){
        get_diet_lst.push("Kosher");
      }
      if(diet.Keto === true){
        get_diet_lst.push("Keto");
      }
      if(diet.Vegetarian === true){
        get_diet_lst.push("Vegetarian");
      }
      if(diet["Gluten-Free"] === true){
        get_diet_lst.push("Gluten-Free");
      }
    
      // console.log(get_diet_lst);

   

      
      get_diet_lst.forEach(async (item) => {
      
        const response =   await api.post(
          `http://127.0.0.1:8000/recipes/${item}/add-diet/`, 
          {
        
            recipe_ID: recipe_id
          }
        )
        .catch(async (error) => {
          console.error(error);
          const response2 =   await api.post(
            `http://127.0.0.1:8000/recipes/create-diet/`, 
            {
              name: item,
              recipe_ID: [recipe_id] 
            }
          )
          .catch(error => {
            console.error(error);
          });
          if(response2.status === 200){
            console.log("created new diet");
          }
        });


      })
      

      inglst.forEach(async (item, index) => {

        await api.post(
          `http://127.0.0.1:8000/recipes/${recipe_id}/add-ingredient/`, 
          {
            name: item, 
            amount: parseInt(quantitylst[index]),
            amount_type: amountLst[index],
            
          }
        )
        .catch(error => {
          console.error(error);
        });
        
      })


     await api.post(
        `http://127.0.0.1:8000/posts/create/`, 
        {
          title: rname, 
          recipe: recipe_id, 
          description: description,
          owner: user.id
          
        }
      )
      .catch(error => {
        console.error("post not created");
      });
      
      


      
    })
    .catch(error => {
      console.error(error);
    });


    
}
sendRecipe();

  // Set a timeout for 2 seconds before redirecting
  setTimeout(() => {
     window.location.href = 'http://localhost:3000/profile/myrecipes';
   }, 2000);
}

    
    return(

        <>
        
        <MDBContainer className="create-form-css">

       
        <MDBValidation>
            <h2 className="CreateRecipeHeader">Create a New Recipe</h2>
            <MDBRow className="mb-4">
                <MDBCol>
                    <MDBRow>
                      <label className="CreateRecipeLabel" htmlFor="name">Recipe Name</label>
                      <MDBInput type="text" id="recipe-name" name="name" className="inputSpaceSize" onChange={(e) => setRName(e.target.value)}/>

                    </MDBRow>
                    <MDBRow>
                      <label className="CreateRecipeLabel">Description Details</label>
                      <MDBTextArea label="Write specific steps to create recipe" rows={4} id="description-input" onChange= {(e) => setDescription(e.target.value)}/>
                    </MDBRow>
                </MDBCol>

                <MDBCol>
                    {/* <label className="CreateRecipeLabel" htmlFor="recipe-ingredients">Ingredients</label>
                      <div className="ingredient-input">
                            <MDBInput type="text" className="inputSpaceSize" value = {ingval} onChange={(e) => {SetIngVal(e.target.value); setShowSuggestions(true)}} required/>
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
                          <MDBInput type="text" placeholder="quantity"  className="inputSpaceSize" value={quantity} onChange={(e) => setQuantity(e.target.value)} required/>
                      </MDBCol>
                    

                      

                    </MDBRow>
                          

                      </div> 
                    
                   
                    <MDBBtn color="warning" onClick={(e) => addIngAndAmount()}>Add</MDBBtn>
                    {lst_component}

                    */}
                    
                <label className="CreateRecipeLabel" htmlFor="recipe-directions">Steps</label>
                <MDBTextArea label="Write specific steps to create recipe" rows={4} className="stepsBox" id="instructions-input" value={val} onChange={(e) => SetVal(e.target.value)}/>
                <MDBBtn color="warning" onClick={addToLst}>Add</MDBBtn>
                <br/>
                <StepList list={lst} stepimglst={stepimagelst} setter={setStepImageLst} />  
                    
          
                


                </MDBCol>

            </MDBRow>

            <MDBRow>
       
                <MDBCol> 
                  <label className="CreateRecipeLabel">Diets</label>
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
                          <label htmlFor="avatar" className="form-label CreateRecipeLabel">
                            Recipe Image
                          </label>
                          <MDBInput
                            className="inputSpaceSize"
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
                        <MDBInput type="text" className="inputSpaceSize" label="preptime" onChange={(e) => setPrepTime(e.target.value)}/>
                        <MDBInput type="text" className="inputSpaceSize" label="cooktime" onChange={(e) => setCookTime(e.target.value)}/>
                
                    </MDBCol>
                    <MDBCol>
                       
                        <MDBInput type="text" className="inputSpaceSize" label="cuisine" onChange={(e) => setCuisineName(e.target.value)}/>
                        <MDBInput type="text" className="inputSpaceSize" label="serving size" onChange={(e) => setServing(e.target.value)}/>
                    </MDBCol>
                    
          

                  </MDBRow>

                </MDBCol>


               
             
                
            </MDBRow>

            
              
            <MDBBtn color="warning" type="submit" onClick={(e) =>{handleSubmit();}}>Create Recipe</MDBBtn>
        
        </MDBValidation>
        </MDBContainer>

        </>
    )



}
export default RecipeForm;


