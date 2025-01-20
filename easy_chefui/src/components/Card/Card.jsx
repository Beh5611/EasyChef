import { useEffect, useState } from "react";
import moment from "moment";
import Rating from "./Rating";
import LikeBtn from "./Like";
import FavoriteBtn from "./Favorite";
import useAxios from "../Auth/AuthAxios";
import { useNavigate } from "react-router-dom";


function RecipeCard({ id, name, description, recipe_id, owner, last_date }) {
  const [username, setUsername] = useState();
  const [likes, setLikes] = useState(0);
  const [favorites, setFavorites] = useState(0);
  const [like, setLike] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [image, setImage] = useState();
  const api = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get(`${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/accounts/${owner}/user/`);
        setUsername(userRes.data.username);

        const imageRes = await api.get(`${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/recipes/${recipe_id}/`);
        setImage(imageRes.data.image);

        const likesRes = await api.get(`${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/posts/${id}/like/all/`);
        setLikes(likesRes.data.count);

        const favRes = await api.get(`${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/posts/${id}/favorites/all/`);
        setFavorites(favRes.data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id, owner, recipe_id, like, favorite]);

  const handleClickForMore =  ()=>{
    navigate(`/posts/${id}`)
  }
  return (
<div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
      {/* Image Section */}
    <div className="relative aspect-[16/9] sm:aspect-[4/3] md:aspect-[3/2] overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
       {/* Buttons */}
       <div className="flex justify-between px-5 pt-3">
        <LikeBtn post_id={id} likeState={{ like, setLike }} />
        <FavoriteBtn post_id={id} favState={{ favorite, setFavorite }} />
      </div>

      {/* Card Content */}
      <div className=" p-2 flex flex-col space-y-2">
      <div className="w-full h-12 line-clamp-2 font-bold text-lg text-gray-900 ">

          <h3 className="text-md font-semibold text-gray-800 ">{name}</h3>  
        </div>
        <div className="flex justify-between">
        <p className="text-gray-500 text-sm">By <span className="font-medium">{username}</span></p>
        <button onClick={handleClickForMore} className="px-2 bg-yellow-500 text-white text-sm  rounded-full shadow-md hover:bg-yellow-600">
          Click for More
        </button>

        </div>
        
        <p className="text-gray-700 text-sm line-clamp-2">{description}</p>
        <Rating post_id={id} />
      </div>

      {/* Card Footer */}
      <div className="grid grid-cols-2 bg-gray-50 text-gray-600 text-sm relative">
        <div className="w-full h-full py-3 flex items-center justify-center relative">
          <span>{likes} Likes</span>
        </div>
        
        {/* Blurred divider */}
        <div className="absolute inset-y-0 left-1/2 w-[2px] bg-gray-300/50 backdrop-blur-md"></div>

        <div className="w-full h-full py-3 flex items-center justify-center relative">
          <span>{favorites} Favorites</span>
        </div>
</div>
    </div>
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
