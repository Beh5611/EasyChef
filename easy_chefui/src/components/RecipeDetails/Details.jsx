import { useEffect, useState } from "react";
import useAxios from "../Auth/AuthAxios";
import { MDBBtn, MDBContainer, MDBRow, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { all } from "q";

function Details({recipe}) {
    console.log("details recipe", recipe);
    const api = useAxios();
    const [diets, setDiets] = useState([]);
    const [next, setNext] = useState(false);
    const fetchRecipe = () => {
        console.log("undefined bruh", recipe.id)
        api.get(`http://127.0.0.1:8000/recipes/${recipe.id}/diets/`)
        .then((response) => {
            setDiets(response.data.results);
            if(response.data.next){
                setNext(true);
            }

            
        })
        
        .catch((error) => {
            console.log("fetchRecipe Error: ", error); 
        });
    }    

    useEffect(()=>{
        fetchRecipe();
    
    }, []);
    console.log(diets);
    const all_diets = diets.map((diet)=>{
        return(
            <MDBBtn rounded className=' py-2 my-1 mx-1 w-50' color='info'
            style={{maxWidth: "90px", padding: "0px"}}
            disabled
            >
                {diet.name}
            </MDBBtn>
        )});
    const cuisine = <MDBBtn rounded className=' py-2 my-1 mx-1 w-50' color='danger'
                            style={{maxWidth: "90px", padding: "0px"}} disabled>
                        {recipe.cuisine}
                    </MDBBtn>
    return (
        <>
            <MDBContainer className="p-0 m-0 pe-4"
            style={{minWidth:'300px'}}>
                {cuisine}
                
                {all_diets} 
                <MDBRow className="pt-5 d-flex justify-content-center">
                    <MDBTable className="p-5 m-0 w-50">
                        <MDBTableHead>
                            <tr>
                            <th scope='col'>Prepare Time:</th>
                            <th scope='col'>Cook Time:</th>
                            <th scope='col'>Serving(s)</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody className="text-center">
                            <tr>
                            <td>{recipe.prep_time}</td>
                            <td>{recipe.cook_time}</td>
                            <td>{recipe.serving}</td>
                            </tr>
                            
                        </MDBTableBody>
                    </MDBTable>
                </MDBRow>
            </MDBContainer>
        </>
    );
}

export default Details;