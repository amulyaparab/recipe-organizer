import { useNavigate, useParams } from "react-router-dom";
import { recipes } from "../Database/recipes";
import { useData } from "../Contexts/DataProvider";

export const SingleRecipe = () => {
  const { recipeId } = useParams();
  const { state } = useData();
  const findRecipe = state.filteredRecipes.find(
    (recipe) => recipe.id == recipeId
  );
  const navigate = useNavigate();
  console.log(findRecipe);
  return (
    <>
      <i class="fa-solid fa-backward plus" onClick={() => navigate("/")}></i>
      <h1>{findRecipe?.recipeName}</h1>
      <div className="singlePost">
        <h3>{findRecipe?.recipeName}</h3>
        <div className="flex-post">
          <img src={findRecipe?.imageUrl} alt={findRecipe?.recipeName} />
          <div>
            <p>
              Ingredients:{" "}
              {findRecipe?.ingredients?.map((ingredient) => `${ingredient}, `)}
            </p>
            <ol>
              {findRecipe?.cookingInstructions?.map((instruction) => (
                <li>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};
