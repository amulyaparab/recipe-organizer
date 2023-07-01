import { useNavigate } from "react-router-dom";
import { recipes } from "../Database/recipes";
import { useData } from "../Contexts/DataProvider";
import { useState } from "react";

export const AllRecipes = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useData();
  const [showNewRecipeForm, setShowNewRecipeForm] = useState(false);
  //    {
  //     id: 1,
  //     recipeName: "Spaghetti Bolognese",
  //     imageUrl:
  //       "https://images.pexels.com/photos/2433979/pexels-photo-2433979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     ingredients: [
  //       "250g spaghetti",
  //       "400g ground beef",
  //       "1 onion, chopped",
  //       "2 garlic cloves, minced",
  //       "400g canned diced tomatoes",
  //       "1 tablespoon tomato paste",
  //       "1 teaspoon dried oregano",
  //       "1 teaspoon dried basil",
  //       "Salt and pepper to taste",
  //       "Parmesan cheese, grated (for garnish)",
  //     ],
  //     cookingInstructions: [
  //       "Cook the spaghetti according to package instructions until al dente.",
  //       "In a large pan, brown the ground beef over medium heat.",
  //       "Add the chopped onion and minced garlic to the pan, and sauté until the onion is translucent.",
  //       "Stir in the diced tomatoes, tomato paste, dried oregano, dried basil, salt, and pepper.",
  //       "Simmer the sauce for 15-20 minutes, allowing the flavors to meld together.",
  //       "Serve the sauce over the cooked spaghetti, and garnish with grated Parmesan cheese.",
  //     ],
  //     cuisineType: "Italian",
  //   },
  return (
    <>
      <h1>All Recipes</h1>
      <input
        onChange={(event) =>
          dispatch({ type: "SEARCH_BY", payload: event.target.value })
        }
      />
      <h2>Filters</h2>
      <label>
        <input
          name="category"
          checked={state.category === "recipeName"}
          type="radio"
          onChange={() => dispatch({ type: "SEARCH_BY_NAME" })}
        />
        Name
      </label>
      <label>
        <input
          name="category"
          type="radio"
          checked={state.category === "ingredients"}
          onChange={() => dispatch({ type: "SEARCH_BY_INGREDIENTS" })}
        />
        Ingredients
      </label>
      <label>
        <input
          name="category"
          type="radio"
          checked={state.category === "cuisineType"}
          onChange={() => dispatch({ type: "SEARCH_BY_CUISINE" })}
        />
        Cuisine
      </label>
      <div className="posts">
        {state.filteredRecipes.map(
          ({
            id,
            recipeName,
            imageUrl,
            ingredients,
            cookingInstructions,
            cuisineType,
          }) => (
            <div className="post" key={id}>
              <img
                src={imageUrl}
                alt={recipeName}
                onClick={() => navigate(`/recipe/${id}`)}
              />
              <i class="fa-solid fa-pen "></i>
              <i class="fa-solid fa-trash trash"></i>
              <h3>{recipeName}</h3>
              <p>Cuisine Type: {cuisineType}</p>
              <p>
                Ingredients: <button>See recipe</button>
              </p>
              <p>
                Instructions: <button>See recipe </button>
              </p>
            </div>
          )
        )}
        <i
          class="fa-solid fa-circle-plus plus"
          onClick={() => setShowNewRecipeForm(!showNewRecipeForm)}
        ></i>
        {showNewRecipeForm && (
          <div>
            <label>
              <input />
            </label>
          </div>
        )}
      </div>
    </>
  );
};
