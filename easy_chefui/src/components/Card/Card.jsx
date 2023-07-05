import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardTitle,
  MDBCardSubTitle,
  MDBCardText,
  MDBCardImage,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";
import Rating from "./Rating";
import LikeBtn from "./Like";
import FavoriteBtn from "./Favorite";
import { redirect } from "react-router-dom";
import moment from "moment";
import { useAuth } from "../Auth/AuthContext";
import useAxios from "../Auth/AuthAxios";
import { useEffect, useState } from "react";

function RecipeCard({ id, name, description, recipe_id, owner, last_date }) {
  const [username, setUsername] = useState();
  const [likes, setLikes] = useState(0);
  const [favorites, setFavorites] = useState(0);
  const [like, setLike] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [image, setImage] = useState()
  const api = useAxios();

  const getLike = async () => {
    const response = await api.get(
      `http://127.0.0.1:8000/posts/${owner}/likes/`
    );
    if (response.status === 200) {
      let changed = false;
      response.data.results.map((like) => {
        if (like.post === id) {
          changed = true;
          setLike(true);
          return;
        }
      });
      if (!changed) {
        setLike(false);
      }
    }
  };

  const getLikes = async () => {
    const response = await api.get(
      `http://127.0.0.1:8000/posts/${id}/like/all/`
    );
    if (response.status === 200) {
      setLikes(response.data.count);
    }
  };

  const getFavorite = async () => {
    const response = await api.get(
      `http://127.0.0.1:8000/posts/${owner}/favorites/`
    );
    if (response.status === 200) {
      let changed = false;
      response.data.results.map((like) => {
        if (like.post === id) {
          changed = true;
          setFavorite(true);
          return;
        }
      });
      if (!changed) {
        setFavorite(false);
      }
    }
  };

  const getFavorites = async () => {
    const response = await api.get(
      `http://127.0.0.1:8000/posts/${id}/favorites/all/`
    );
    if (response.status === 200) {
      setFavorites(response.data.count);
    }
  };

  const getImage = async () => {
    const response = await api.get(
      `http://127.0.0.1:8000/recipes/${recipe_id}/`
    );
    if (response.status === 200) {
      setImage(response.data.image);
    }
  };

  const getUser = async (id) => {
    const response = await api.get(
      `http://127.0.0.1:8000/accounts/${id}/user/`
    );
    if (response.status === 200) {
      setUsername(response.data.username);
    }
    return null;
  };

  useEffect(() => {
    getUser(owner);
    getLike();
    getFavorite();
    getImage();
  }, [id, owner, image]);

  useEffect(() => {
    getLikes();
    getFavorites();
  }, [like, favorite]);

  return (
    <MDBCard className={`card_${id}`}>
      <MDBRipple
        rippleColor="light"
        rippleTag="div"
        className="bg-image hover-overlay"
      >
        <MDBCardImage
          src={image}
          fluid
          alt="..."
          className="p-0"
        />
        <a href={`http://localhost:3000/posts/${id}`}>
          <div
            className="mask"
            style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
          ></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle className="fs-4 d-flex justify-content-between">
          {name}{" "}
          <div>
            <LikeBtn post_id={id} likeState={{ like, setLike }} />{" "}
            <FavoriteBtn post_id={id} favState={{ favorite, setFavorite }} />
          </div>
        </MDBCardTitle>
        <Rating post_id={id}></Rating>
        <MDBCardSubTitle className="mb-2 text-muted">
          Created by {username}
        </MDBCardSubTitle>
        <MDBCardText className="text-wrap">{description}</MDBCardText>
      </MDBCardBody>
      <MDBCardFooter>
        <MDBContainer>
          <MDBRow className="justify-content-between fw-lighter">
            <MDBCol className="text-center px-0"> {likes} likes </MDBCol>
            <div className="vr vr-blurry p-0"> </div>
            <MDBCol className="text-center px-0"> {favorites} favorite </MDBCol>
          </MDBRow>
          <MDBRow center className="py-2">
            <hr className="hr hr-blurry my-0 w-100" />
          </MDBRow>
          <MDBRow center>
            <small className="text-center text-muted text-nowrap fw-lighter small-text">
              Last updated {moment(last_date).startOf("hour").fromNow()}
            </small>
          </MDBRow>
        </MDBContainer>
      </MDBCardFooter>
    </MDBCard>
  );
}

RecipeCard.defaultProps = {
  name: "Sample Recipe",
  description: "Sample description",
  owner: "Bob",
  last_date: "1970-01-01",
  likes: 0,
  views: 0,
};

export default RecipeCard;
