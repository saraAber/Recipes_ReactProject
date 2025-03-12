// //import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
// import HomePage from "./components/HomePage"; 
// // import Recipy from "./components/Recipes";
// // import AddRecipe from "./components/addRecipe";
// // import EditRecipe from "./components/editRecipe";


// // קומפוננטת App
// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         {/* <Route path="/recipes" element={<Recipy />} />
//         <Route path="/addRecipe" element={<AddRecipe />} />
//         <Route path="/editRecipe" element={<EditRecipe recipeId={1} onRecipeUpdated={(updatedRecipe) => console.log(updatedRecipe)} />} /> */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import Recipes from "./components/Recipes";
import AddRecipe from "./components/addRecipe";
import EditRecipe from "./components/editRecipe";
import { AuthProvider } from "./contexts/AuthUserContext";

function App() {
  console.log("App Loaded!");

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/editRecipe" element={<EditRecipe recipeId={1} onRecipeUpdated={(updatedRecipe) => console.log(updatedRecipe)} />} />
          <Route path="/addRecipe" element={<AddRecipe />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;