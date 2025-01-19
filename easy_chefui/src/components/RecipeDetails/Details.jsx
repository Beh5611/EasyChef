// Details.js
import { useEffect, useState } from "react";
import useAxios from "../Auth/AuthAxios";

function Details({ recipe }) {
  const api = useAxios();
  const [diets, setDiets] = useState([]);
  const fetchDiets = async () => {
    try {
      const response = await api.get(`http://127.0.0.1:8000/recipes/${recipe.id}/diets/`);
      setDiets(response.data.results);
    } catch (error) {
      console.error("Error fetching diets:", error);
    }
  };
  useEffect(() => {
    fetchDiets();
  }, []);

  return (
    <div className="mt-4">
      <h5 className="text-black-500">Details</h5>

      <div className="d-flex flex-wrap">
        <span className="badge bg-danger me-2">{recipe.cuisine}</span>
        {diets.map((diet) => (
          <span key={diet.id} className="badge bg-info text-dark me-2">
            {diet.name}
          </span>
        ))}
      </div>

      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>Prep Time</th>
            <th>Cook Time</th>
            <th>Servings</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{recipe.prep_time}</td>
            <td>{recipe.cook_time}</td>
            <td>{recipe.serving}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Details;
