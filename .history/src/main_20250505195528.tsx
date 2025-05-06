// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./components/HomePage.tsx";
// import Recipes from './components/Recipes.tsx'
// import AddRecipe from './components/addRecipe.tsx';
// import EditRecipe from './components/editRecipe.tsx';
// import { AuthProvider } from "./contexts/AuthUserContext.tsx";
// import { Outlet } from 'react-router-dom';

// function App() {

//   return (
//     <>
//       <AuthProvider>
//         <Router>
//           <Routes>
//             <Route path="/" element={<Outlet />} />
//             <Route path='*' element={<HomePage />} />
//             <Route path='/recipes' element={<Recipes />} />
//             <Route path="/editRecipe" element={<EditRecipe recipeId={1} onRecipeUpdated={(updatedRecipe) => console.log(updatedRecipe)} />} />
//             <Route path='/addRecipe' element={<AddRecipe />} />

//           </Routes>
//           <Outlet />
//         </Router>
//       </AuthProvider>

//     </>
//   )
// }
// export default App


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './components/SignIn.tsx'
import Login from './components/Login.tsx'
import GetRecipes from './components/GetRecipes.tsx'
import AddRecipe from './components/addRecipe.tsx'
import EditRecipe from './components/editRecipe.tsx'

const routes = createBrowserRouter([

  {
    path: '*', // דף הבית הראשי

    element:
      <App />,
  }

);