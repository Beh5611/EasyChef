import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../Card/Card";
import { MDBRow, MDBCol, MDBContainer } from "mdb-react-ui-kit";
import { useLoaderData } from "react-router-dom";

const CardList = ({ col_size, sort, list }) => {
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
    console.log("post: " + post);
    return (
      <MDBCol key={index} style={{ width: "19rem" }}>
        <RecipeCard
          name={post.title}
          recipe_id={post.recipe}
          description={post.description}
          owner={post.owner}
          last_date={post.date_modified}
          id={post.id}
        />
      </MDBCol>
    );
  });
  return (
    <MDBContainer>
      <MDBRow
        className={`gx-3 gy-3 row-cols-${col_size} justify-content-center`}
      >
        {cardArray}
      </MDBRow>
    </MDBContainer>
  );
};

export default CardList;
