import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../Card/Card";
import { MDBRow, MDBCol, MDBContainer } from "mdb-react-ui-kit";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CardList = ({ list }) => {
  // let results = useLoaderData();
  // const [displayResults, setDisplayResults] = useState(results);

  // const getPosts = async (sort) => {
  //   const response = await axios.get(
  //     `process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"/posts/${sort}/all/`
  //   );
  //   setDisplayResults(response.data.results);
  // };

  // useEffect(() => {
  //   if (sort) {
  //     console.log(sort);
  //     getPosts(sort);
  //   }
  // }, [sort]);
  const navigate = useNavigate();
  const handleMoreRecipes = () => {
    navigate(`/posts/search`);
  }

  const cardArray = list.map((post, index) => {
    return (index < 7 && 
<div  className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden hover:translate-y-[-0.75rem] transition-all duration-300">
        <RecipeCard
          name={post.title}
          recipe_id={post.recipe}
          description={post.description}
          owner={post.owner}
          last_date={post.date_modified}
          id={post.id}
        />
      </div>
    );
  });
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cardArray}
        <div className="col-span-full flex justify-center mt-6">
          <button onClick={handleMoreRecipes} className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-full shadow-md hover:bg-yellow-600 transition-all duration-200">
            See More Recipes
          </button>
        </div>
      </div>
    </div>
  );
  

};

export default CardList;
