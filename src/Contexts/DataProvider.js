import { createContext, useContext, useReducer } from "react";
import { recipes } from "../Database/recipes";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
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
          filteredRecipes: recipes.filter((recipe) =>
            state.category === "ingredients"
              ? recipe[state.category].map((ingredient) =>
                  ingredient
                    .toLowerCase()
                    .trim()
                    .includes(action.payload.toLowerCase())
                )
              : recipe[state.category]
                  .toLowerCase()
                  .includes(action.payload.toLowerCase())
          ),
        };
      default:
        return state;
    }
  };
  const initialState = {
    recipes: recipes,
    filteredRecipes: recipes,
    category: "recipeName",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
