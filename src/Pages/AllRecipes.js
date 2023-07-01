import { useNavigate } from "react-router-dom";

import { useData } from "../Contexts/DataProvider";
import { useState } from "react";

export const AllRecipes = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useData();
  const [showNewRecipeForm, setShowNewRecipeForm] = useState(false);

  const isRecipeInArray = state?.newRecipe?.id === state?.idToBeEdited;
  console.log(isRecipeInArray);
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
        {state?.filteredRecipes?.map(
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
              <i
                class="fa-solid fa-pen"
                onClick={() => {
                  setShowNewRecipeForm(true);
                  dispatch({
                    type: "SHOW_EDIT",
                    payload: {
                      id,
                      recipeName,
                      imageUrl,
                      ingredients,
                      cookingInstructions,
                      cuisineType,
                    },
                    idPayload: id,
                  });
                }}
              ></i>
              <i
                class="fa-solid fa-trash trash"
                onClick={() => dispatch({ type: "DELETE", payload: id })}
              ></i>
              <h3>{recipeName}</h3>
              <p>Cuisine Type: {cuisineType}</p>
              <p>
                Ingredients:{" "}
                <button onClick={() => navigate(`/recipe/${id}`)}>
                  See recipe
                </button>
              </p>
              <p>
                Instructions:{" "}
                <button onClick={() => navigate(`/recipe/${id}`)}>
                  See recipe{" "}
                </button>
              </p>
            </div>
          )
        )}
        <i
          class="fa-solid fa-circle-plus plus"
          onClick={() => setShowNewRecipeForm(!showNewRecipeForm)}
        ></i>
      </div>

      {showNewRecipeForm && (
        <div className="overlay">
          <div className="form">
            <i
              class="fa-solid fa-circle-xmark cross"
              value={state?.newRecipe?.recipeName}
              onClick={() => {
                setShowNewRecipeForm(false);
                dispatch({ type: "CLEAR_FORM" });
              }}
            ></i>
            <label>
              Recipe Name
              <input
                value={state?.newRecipe?.recipeName}
                onChange={(event) =>
                  dispatch({ type: "RECIPE_NAME", payload: event.target.value })
                }
              />
            </label>
            <label>
              Cuisine
              <input
                value={state?.newRecipe?.cuisineType}
                onChange={(event) =>
                  dispatch({
                    type: "RECIPE_CUISINE",
                    payload: event.target.value,
                  })
                }
              />
            </label>
            <label>
              Image
              <input
                value={state?.newRecipe?.imageUrl}
                onChange={(event) =>
                  dispatch({
                    type: "RECIPE_IMAGE",
                    payload: event.target.value,
                  })
                }
              />
            </label>
            <label>
              Ingredients
              <input
                value={state?.newRecipe?.ingredients}
                onChange={(event) =>
                  dispatch({
                    type: "RECIPE_INGREDIENTS",
                    payload: event.target.value,
                  })
                }
              />
            </label>
            <label>
              Instructions
              <textarea
                value={state?.newRecipe?.instructions}
                onChange={(event) =>
                  dispatch({
                    type: "RECIPE_INSTRUCTIONS",
                    payload: event.target.value,
                  })
                }
              ></textarea>
            </label>
            <button
              onClick={() => {
                isRecipeInArray
                  ? dispatch({ type: "EDIT" })
                  : dispatch({ type: "ADD_RECIPE" });
                setShowNewRecipeForm(false);
                dispatch({ type: "CLEAR_FORM" });
              }}
            >
              Post
            </button>
          </div>
        </div>
      )}
    </>
  );
};
