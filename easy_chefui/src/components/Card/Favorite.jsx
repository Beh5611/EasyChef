import { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";
import axios from "axios";
import { redirect } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import useAxios from "../Auth/AuthAxios";

function FavoriteBtn({ post_id, favState: { favorite, setFavorite } }) {
  const { user } = useAuth();

  const api = useAxios();

  // update the like
  const updateFavorite = async () => {
    if (favorite) {
      const response = await api.delete(
        `http://127.0.0.1:8000/posts/${post_id}/unfavorite/`
      );
      if (response.status === 204) {
        setFavorite(false);
      }
    } else {
      const response = await api.post(
        `http://127.0.0.1:8000/posts/${post_id}/favorite/`
      );
      if (response.status === 201) {
        setFavorite(true);
      }
    }
  };

  // get users like from database
  const getFavorite = async () => {
    const response = await api.get(
      `http://127.0.0.1:8000/posts/${user.id}/favorites/`
    );
    if (response.status === 200) {
      response.data.results.map((fav) => {
        if (fav.post === post_id) {
          setFavorite(true);
        }
      });
    }
  };

  useEffect(() => {
    if (user) {
      getFavorite();
    }
  }, []);

  return (
    <button
      className="transparent-btn"
      onClick={() => {
        updateFavorite();
      }}
    >
      <i
        className={
          "fas fa-bookmark " + (favorite ? "favorited" : "unfavorited")
        }
      ></i>
    </button>
  );
}

export default FavoriteBtn;
