import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./App.css"
import Home from './pages/Home/Home'
import LogIn from './pages/LogIn/LogIn'
import Register from './pages/Register/Register'
import AppNavbar from './components/AppNavbar/AppNavbar'
import MealDetails from './pages/MealDetails/MealDetails'
// import ManageRecipes from './pages/ManageRecipes/ManageRecipes'
// import AddRecipe from './pages/AddRecipe/AddRecipe'
// import RecipeDetails from './pages/RecipeDetails/RecipeDetails'
import axios from 'axios'
import config from './config/config'
import MyFavourites from './pages/MyFavourites/MyFavourites'
import FridgeToPlate from './pages/FridgeToPlate/FridgeToPlate'
import MealPlanner from './pages/MealPlanner/MealPlanner'
import SearchResult from './pages/SearchResult/SearchResult'
import ImageUploader from './components/ImageUploader/ImageUploader'
import MyIntake from './pages/MyIntake/MyIntake'

function App() {
  const [loginUser, setLoginUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("jwt")

    // Check if user is logged in
    if(token){
      axios.get(`${config.BASE_URL}/api/auth/me`, {
        headers: {Authorization: `Bearer ${token}`}
      }, {withCredentials: true})
      .then(response => {
        setLoginUser(response.data);
        console.log("logged in")
      })
      .catch(error => {
        setLoginUser(null);
        console.log("none")
      })
    }
    
  }, [])

  return (
    <BrowserRouter>
      <AppNavbar loginUser={loginUser} setLoginUser={setLoginUser}/>
      <div className='pages'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path='/meals/meal/:id' element={<MealDetails loginUser={loginUser}/>}/>
          <Route path='/recipe/favourite' element={<MyFavourites/>}/>
          <Route path='/mealplanner' element={<MealPlanner/>}/>
          <Route path='/recommend' element={<FridgeToPlate/>}/>
          <Route path='/search' element={<SearchResult/>}/>
          <Route path='/myintake' element={<MyIntake/>}/>
          <Route path='/newintake' element={<ImageUploader/>}/>

          {/* <Route path='/managerecipe/myrecipe' element={<ManageRecipes loginUser={loginUser} setLoginUser={setLoginUser}/>}/>
          <Route path='/managerecipe/addrecipe' element={<AddRecipe/>}/>
          <Route path='/managerecipe/recipe/:id' element={<RecipeDetails/>}/>
          <Route path='/managerecipe/editrecipe/:id' element={<></>}/> */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
