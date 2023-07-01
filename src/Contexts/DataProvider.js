import { createContext, useContext, useEffect, useReducer } from "react";
import { recipes } from "../Database/recipes";
import { v4 as uuid } from "uuid";
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const storeInLocalStorage = () => {
    try {
      localStorage.setItem("arrayOfRecipes", JSON.stringify(state.recipes));
    } catch (err) {
      console.log(err);
    }
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SEARCH_BY_NAME":
        return { ...state, category: "recipeName" };
      case "SEARCH_BY_INGREDIENTS":
        return { ...state, category: "ingredients" };
      case "SEARCH_BY_CUISINE":
        return { ...state, category: "cuisineType" };
      case "SEARCH_BY":
        return {
          ...state,
          filteredRecipes: state.recipes.filter((recipe) =>
            state.category === "ingredients"
              ? recipe[state.category]
                  .join("")
                  .toLowerCase()
                  .trim()
                  .includes(action.payload.toLowerCase())
              : recipe[state.category]
                  .toLowerCase()
                  .includes(action.payload.toLowerCase())
          ),
        };
      case "RECIPE_NAME":
        return {
          ...state,
          newRecipe: {
            ...state.newRecipe,
            id: uuid(),
            recipeName: action.payload,
          },
        };
      case "RECIPE_CUISINE":
        return {
          ...state,
          newRecipe: {
            ...state.newRecipe,
            cuisineType: action.payload,
          },
        };
      case "RECIPE_IMAGE":
        return {
          ...state,
          newRecipe: {
            ...state.newRecipe,
            imageUrl: action.payload,
          },
        };
      case "RECIPE_INGREDIENTS":
        return {
          ...state,
          newRecipe: {
            ...state.newRecipe,
            ingredients: [action.payload],
          },
        };
      case "RECIPE_INSTRUCTIONS":
        return {
          ...state,
          newRecipe: {
            ...state.newRecipe,
            cookingInstructions: [action.payload],
          },
        };
      case "ADD_RECIPE":
        state.newRecipe = { ...state.newRecipe, id: uuid() };
        const arrayInLocalstorage = JSON.parse(
          localStorage.getItem("arrayOfRecipes")
        );

        localStorage.setItem(
          "arrayOfRecipes",
          JSON.stringify([...arrayInLocalstorage, state.newRecipe])
        );
        return {
          ...state,
          recipes: [...state.recipes, state.newRecipe],
          filteredRecipes: [...state.filteredRecipes, state.newRecipe],
        };
      case "CLEAR_FORM":
        return {
          ...state,
          newRecipe: {
            id: "",
            recipeName: "",
            imageUrl: "",
            ingredients: [],
            cookingInstructions: [],
            cuisineType: "",
          },
        };
      case "DELETE":
        const arrayInLocalstorageNow = JSON.parse(
          localStorage.getItem("arrayOfRecipes")
        );

        localStorage.setItem(
          "arrayOfRecipes",
          JSON.stringify(
            arrayInLocalstorageNow.filter(
              (recipe) => recipe.id !== action.payload
            )
          )
        );
        return {
          ...state,
          filteredRecipes: state.filteredRecipes.filter(
            (recipe) => recipe.id !== action.payload
          ),
        };
      case "SHOW_EDIT":
        return {
          ...state,
          newRecipe: action.payload,
          idToBeEdited: action.idPayload,
        };
      case "EDIT":
        return {
          ...state,

          filteredRecipes: state.filteredRecipes.map((recipe) =>
            recipe.id === state.newRecipe.id ? state.newRecipe : recipe
          ),
        };
      default:
        return state;
    }
  };
  const initialState = {
    recipes: recipes,
    filteredRecipes: JSON.parse(localStorage.getItem("arrayOfRecipes")),
    category: "recipeName",
    idToBeEdited: "",
    newRecipe: {
      id: "",
      recipeName: "",
      imageUrl: "",
      ingredients: [],
      cookingInstructions: [],
      cuisineType: "",
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (localStorage.getItem("arrayOfRecipes")) {
      return;
    } else {
      storeInLocalStorage();
    }
  }, [state.recipes]);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
