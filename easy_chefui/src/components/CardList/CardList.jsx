import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../Card/Card";
import { MDBRow, MDBCol, MDBContainer } from "mdb-react-ui-kit";
import { useLoaderData } from "react-router-dom";

const CardList = ({ list }) => {
  // let results = useLoaderData();
  // const [displayResults, setDisplayResults] = useState(results);

  // const getPosts = async (sort) => {
  //   const response = await axios.get(
  //     `http://127.0.0.1:8000/posts/${sort}/all/`
  //   );
  //   setDisplayResults(response.data.results);
  // };

  // useEffect(() => {
  //   if (sort) {
  //     console.log(sort);
  //     getPosts(sort);
  //   }
  // }, [sort]);
  


  const cardArray = list.map((post, index) => {
    return (
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
      </div>
  </div>
  );
};

export default CardList;
