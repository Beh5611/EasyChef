import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import useAxios from "../Auth/AuthAxios";
import moment from "moment";
import { async } from "q";
import { MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBSpinner, MDBTextArea } from "mdb-react-ui-kit";
import Details from "./Details";
import AuthContext from "../Auth/AuthContext";

import './style.css';
import SocialInfo from "./SocialsInfo";
import { render } from "@testing-library/react";



function RecipeDetails() {
    const { user, logoutUser, authRedirect, unauthRedirect } =
    useContext(AuthContext);
    const [recipe, setRecipe] = useState();
    const [reRender, setReRender] = useState(false);
    const [owner, setOwner] = useState();
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const[liked, setLiked] = useState(false);
    const[favorited, setFavorited] = useState(false);
    const[inCart, setInCart] = useState(false);
    const [likes, setLikes] = useState(0);
    const [favorites, setFavorites] = useState(0);
    const data = useLoaderData();
    const api = useAxios();
    console.log("loader data", data);
    
    const updateLikes = async () => {
        const response = await api.get(
          `http://127.0.0.1:8000/posts/${data.id}/like/all/`
        );
        if (response.status === 200) {
          setLikes(response.data.count);
        }
      };
    
      const updateFavorites = async () => {
        const response = await api.get(
          `http://127.0.0.1:8000/posts/${data.id}/favorites/all/`
        );
        console.log("favorites", response.data)
        if (response.status === 200) {
          setFavorites(response.data.count);
        }
      };

    const fetchRecipe = () => {
        api.get(`http://127.0.0.1:8000/recipes/${data.recipe}/`)
        .then((response) => {
            setRecipe(response.data);

            return api.get(`http://127.0.0.1:8000/accounts/${response.data.owner}/user/`);
        })
        .then((res) => {
            setOwner(res.data);
            setLoading(false);
            })
        .catch((error) => {
            console.log("fetchRecipe Error: ", error);
            setLoading(false);
        });
    }          
        
    const fetchSocials = () => {
        api.get(`http://127.0.0.1:8000/posts/${user.id}/likes/`)
        .then((response) => {
            let arr = response.data.results;
            
            arr.forEach((res) =>{
                if (res.post === data.id){
                    setLiked(true);
                }
            })
              
            return api.get(`http://127.0.0.1:8000/posts/${data.id}/favorites/all/`)
        })
        .then((r) => {
            let arr = r.data.results;
            arr.forEach((r) =>{
                if (r.post === data.id){
                    setFavorited(true);
                }
            })
            return api.get(`http://127.0.0.1:8000/ShoppingCart/get-cart/`)
        })
        .then((r2) => {
            if(Array.isArray(r2.data.recipes)){
                setLoading2(false);
            }
            if(r2.data.recipes.includes(recipe.id)){

                setInCart(true);

            }
            
        })
        .catch((err)=>{
            console.log("SocialsFetchErr", err);
            setLoading2(false);
        })
    }
    
    useEffect(()=>{
        updateFavorites();
        updateLikes();
        fetchRecipe();
        fetchSocials();
        setReRender(!reRender);
        
        
    }, [inCart, loading, loading2]);

    const handleLikes = (bln) => {
        if(bln){
            api.delete(`http://127.0.0.1:8000/posts/${data.id}/unlike/`)
            .then((response) => {
                setLikes(likes - 1);
            })
        } else{
            api.post(`http://127.0.0.1:8000/posts/${data.id}/like/`)
            .then((response) => {
                setLikes(likes + 1);
            })
        }
        setLiked(!bln);
        setReRender(!reRender);
    }
    const handleFavorites = (bln) => {
        if(bln){ 
            api.delete(`http://127.0.0.1:8000/posts/${data.id}/unfavorite/`)
            .then((response) => {
                setFavorites(favorites - 1);
            })
        } else{
            api.post(`http://127.0.0.1:8000/posts/${data.id}/favorite/`)
            .then((response) => {
                setFavorites(favorites + 1);
            })
        }
        setFavorited(!bln);
        
        setReRender(!reRender);
    }
    const handleCart = (bln) => {
        if(bln){
            api.get(`http://127.0.0.1:8000/ShoppingCart/${recipe.id}/remove/`)
            .then((response) => {
            })
        } else{
            api.get(`http://127.0.0.1:8000/ShoppingCart/${recipe.id}/add/`)
            .then((response) => {
            })
        }
        setInCart(!bln);
    }
    
     
    if (!loading && !loading2 &&recipe && owner.username) { 
        console.log("img", recipe.image);
        return (
            <MDBContainer center className="mt-5 p-0 w-100" style={{minWidth:'1300px'}}>
                
                    <MDBRow className="">
                        <MDBCol className="square border-end" style={{height: '80vh', minWidth: '300px'}} size='4'  lg='3'>
                            <MDBRow>
                                <label className="px-2 small">Description:</label>
                                <p 
                                className="square rounded border"
                                style={{height:'22vh', width:'90%'}}
                                >
                                {data.description}</p>
                            </MDBRow>
                            <MDBRow className="pt-3 mt-2">
                                <label className="px-2 small">Details:</label>
                                <Details recipe={recipe}></Details>
                            </MDBRow>
                        
                            
                        </MDBCol>


                        <MDBCol size='6' lg='8' className="">
                            <MDBCol className="text-center">
                                <h1 className="cursive">{recipe.name}</h1>
                                <MDBCol className="text-center">
                                    <div className="mx-5"
                                    style={{paddingLeft:'20%'}}>
                                        <SocialInfo post_id={data.id} likes={likes} favorites={favorites}/>
                                    </div>
                                    
                                    <div className="d-flex" >
                                        <img className="border rounded" width={600} height={300} src={recipe.image}
                                            style={{objectFit:'cover'}}
                                        />
                                        <br></br>
                                        <div className=" mx-3 py-5 my-5">
                                            <MDBBtn onClick={() => handleCart(inCart)}  className="mb-3 px-5" color="warning"
                                            style={{minWidth:'233px'}}>
                                                {inCart ?
                                                (
                                                    <>
                                                        Remove From Cart 
                                                        <MDBIcon fas icon="trash-alt" />
                                                    </>
                                                )
                                                :
                                                (
                                                    <>
                                                        Add To Cart
                                                        <MDBIcon fas icon="cart-plus" />
                                                    </>
                                                )}
                                            </MDBBtn>
                                            <br></br>
                                            {liked ? 
                                                (
                                                    <MDBBtn 
                                                    onClick={() => handleLikes(liked)} color='danger' tag='a' floating>
                                                        <MDBIcon fas icon="thumbs-up" />
                                                    </MDBBtn>
                                                ) 
                                                : 
                                                (
                                                    <MDBBtn onClick={() => handleLikes(liked)} color='light' tag='a' floating>
                                                        <MDBIcon fas icon="thumbs-up" />
                                                    </MDBBtn>
                                                )
                                            }

                                            <MDBBtn onClick={() => handleFavorites(favorited)} className='ms-2' tag='a' color='dark' floating>
                                                {favorited ? 
                                                (<MDBIcon fas icon="bookmark" />)
                                                : 
                                                (<MDBIcon far icon="bookmark" />)}
                                                
                                                
                                            </MDBBtn>
                                        </div>
                                    </div>
                                </MDBCol>
                                <MDBCol size={2} className="d-flex">
                                <small className="text-center text-muted text-nowrap fw-lighter small-text p-0 m-0">
                                        Last updated {moment(data.date_modified).startOf("hour").fromNow()}
                                        </small>
                                    
                                </MDBCol>
                                
                            </MDBCol>

                           
                        </MDBCol>
                    </MDBRow>
            </MDBContainer>
        );
    }
    
    return (
        <div className='d-flex justify-content-center align-items-center'
        style={{paddingTop:'30%'}}>
            Loading
            <MDBSpinner role='status'>
                <span className='visually-hidden'>Loading...</span>
            </MDBSpinner>
        </div>
    ) ;
}

export default RecipeDetails;