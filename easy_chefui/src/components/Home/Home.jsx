import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoggedIn from '../Navbar/LoggedIn';
import LoggedOut from '../Navbar/LoggedOut';
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../Auth/AuthContext";
import useAxios from "../Auth/AuthAxios";
import CardList from "../CardList/CardList";


function Home() {
  const images = ['assets/fruits.jpg', 'assets/steak.jpg'];
  const [recipes , setRecipes] = useState([])
  const { user, logoutUser, authRedirect, unauthRedirect } =
  useContext(AuthContext);
  const api = useAxios();

  

  const settings = {
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: "linear",
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };

 
  const getRecipes = async () => {
    const sort = "ratings"; // Use "filter" as default if params.sort is undefined
    const response = await api
      .get(
        `http://127.0.0.1:8000/posts/all/`

      )
      return response.data.results
  
  }

  useEffect(async ()=> {
    const recipes = await getRecipes();

    setRecipes(recipes);
    console.log( "trash", recipes);

  }, [])

  return (
    <>
    <div className="w-full flex justify-center py-10">
      <div className="w-2/5 p-5">
        <h1 className="text-4xl font-bold text-gray-900">
          <span className="text-yellow-500">Access & Create</span> Millions of Mouth Watering <span className="text-yellow-500">Recipes</span>
        </h1>
        <h3 className="text-lg text-gray-700 pt-4 my-3">
          EasyChef has created the perfect app for you to experiment with fun and new recipes as well as bless the world with your own creativity!
        </h3>
        <div className="flex justify-center py-4">
          <Link to='/create'>
            <button className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-full shadow-md hover:bg-yellow-600">
              Create a Recipe!
            </button>
          </Link>
          
        </div>
      </div>
      <div className="w-3/5 flex justify-center items-center">
        <Slider {...settings} className="w-full">
          {images.map((img, index) => (
            <div key={index} className="flex justify-center">
              <img src={img} alt={img} className="h-[60vh] w-auto mx-auto" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
    <div className="">

       <CardList col_size={3} sort={"filter"} list={recipes} />

    </div>
    </>
  );
}

export default Home;
