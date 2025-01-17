import { useContext, useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";
import axios from "axios";
import { redirect } from "react-router-dom";
import AuthContext, { useAuth } from "../Auth/AuthContext";
import useAxios from "../Auth/AuthAxios";
import { useNavigate } from "react-router-dom";

function LikeBtn({ post_id, likeState: { like, setLike } }) {
  const { authTokens, setAuthTokens, logoutUser } = useContext(AuthContext);

  const { user } = useAuth();
  const navigate = useNavigate();
  const api = useAxios();

  // update the like
  const updateLike = async () => {
    try{
      if (like) {
        const response = await api.delete(
          `http://127.0.0.1:8000/posts/${post_id}/unlike/`
        );
        if (response.status === 204) {
          setLike(false);
        }
      } 
      else {
        const response = await api.post(
          `http://127.0.0.1:8000/posts/${post_id}/like/`
        );
        if (response.status === 201) {
          setLike(true);
        }  
      }

    }
    catch(error){

      navigate("/login");
      
    }
    
    console.log("hello im here")
   
  };

  // get users like from database
  const getLike = async () => {
    const response = await api.get(
      `http://127.0.0.1:8000/posts/${user.id}/likes/`
    );
    if (response.status === 200) {
      response.data.results.map((like) => {
        if (like.post === post_id) {
          setLike(true);
        }
      });
    }
  };

  useEffect(() => {
    if (user) {
      getLike();
    }
  }, []);

  return (
    <button
      className="transparent-btn"
      onClick={() => {
        updateLike();
      }}
    >
      <i className={"fas fa-thumbs-up " + (like ? "liked" : "unliked")}></i>
    </button>
  );
}

export default LikeBtn;
