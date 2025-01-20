import { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useAuth } from "../Auth/AuthContext";
import useAxios from "../Auth/AuthAxios";

function Rating({ post_id, avg }) {
  const [rating, setRating] = useState(0);
  const [rid, setRid] = useState(-1);
  const [ratings, setRatings] = useState([]);
  const { user } = useAuth();
  const [hover, setHover] = useState(0);

  const api = useAxios();

  // Set rating
  const SetAPIRating = async (index) => {
    if (rid > 0) {
      const response = await api.put(
        `${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/posts/rating/${rid}/edit/`,
        { score: index, user: user.id, post: post_id }
      );
      if (response.status === 200) {
        setRating(response.data.score);
      }
    } else {
      const response = await api.post(
        `${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/posts/${post_id}/rate/`,
        { score: index }
      );
      if (response.status === 201) {
        setRating(response.data.score);
      }
    }
    getRatings();
  };

  // Get rating
  const getRatings = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/posts/${post_id}/rating/view/`,
      { withCredentials: true }
    );

    if (response.status === 200) {
      setRating(response.data.score);
      setRid(response.data.id);
    }

    const res = await axios.get(
      `${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/posts/${post_id}/rating/view/all/`,
      { withCredentials: true }
    );
    if (res.data.results) {
      setRatings(res.data.results);
    }
  };

  // Get user's rating from the database
  useEffect(() => {
    if (user) {
      getRatings();
    }
  }, [user, post_id]);

  return (
    <div className="star-rating">
      <MDBContainer className="p-0">
        <MDBRow className="m-0">
          <MDBCol className="d-flex flex-row align-items-baseline ps-0">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={`ps-0 transparent-btn text-xl ${
                    index <= (hover || rating)
                      ? "text-yellow-500" // Active star color (yellow)
                      : "text-gray-400" // Inactive star color (gray)
                  }`}
                  onClick={() => {
                    SetAPIRating(index);
                  }}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <i className="fas fa-star"></i>
                </button>
              );
            })}{" "}
            <p className="fw-light">
              {" "}
              (
              {ratings.length &&
                ratings.reduce((partialSum, r) => partialSum + r.score, 0) /
                  ratings.length}
              )
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

Rating.defaultProps = {
  cur_rating: 0,
  avg: 0,
};

export default Rating;
