import logo from "./logo.svg";
import "./App.css";
import { AllRecipes } from "./Pages/AllRecipes";
import { Route, Routes } from "react-router-dom";
import { SingleRecipe } from "./Pages/SingleRecipe";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AllRecipes />} />
        <Route path="/recipe/:recipeId" element={<SingleRecipe />} />
      </Routes>
    </div>
  );
}

export default App;
