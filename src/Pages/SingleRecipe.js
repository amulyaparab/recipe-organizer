import { useParams } from "react-router-dom";
import { recipes } from "../Database/recipes";

export const SingleRecipe = () => {
  const { recipeId } = useParams();
  const findRecipe = recipes.find((recipe) => recipe.id === Number(recipeId));
  //    id,
  //             recipeName,
  //             imageUrl,
  //             ingredients,
  //             cookingInstructions,
  //             cuisineType,
  return (
    <>
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
