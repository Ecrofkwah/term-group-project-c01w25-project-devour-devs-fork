import React, { useState, useEffect } from 'react'
import InputIngredients from '../../components/InputIngredients/InputIngredients'
import RecommendedRecipes from '../../components/RecommendedRecipes/RecommendedRecipes'
import './FridgeToPlate.css'

function FridgeToPlate() {
  const [recommended, setRecommended] = useState([]);

  return (
    <div className='fridge-plate-page'>
      <h1>Find recipes by Ingredients</h1>
      <InputIngredients setRecommended={setRecommended}/>
      <RecommendedRecipes meals={recommended}/>
    </div>
  )
}

export default FridgeToPlate
