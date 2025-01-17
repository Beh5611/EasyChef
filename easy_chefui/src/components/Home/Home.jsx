import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoggedIn from '../Navbar/LoggedIn';
import LoggedOut from '../Navbar/LoggedOut';
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Auth/AuthContext";


function Home() {
  const images = ['assets/fruits.jpg', 'assets/steak.jpg'];

  const { user, logoutUser, authRedirect, unauthRedirect } =
  useContext(AuthContext);


  const settings = {
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: "linear",
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  return (
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
  );
}

export default Home;
