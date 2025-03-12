import React, { useState, useEffect } from 'react'
import InputIngredients from '../../components/InputIngredients/InputIngredients'
import RecommendedRecipes from '../../components/RecommendedRecipes/RecommendedRecipes'

function FridgeToPlate() {
  const [recommended, setRecommended] = useState([]);

  return (
    <div>
      <h1>Find recipes by Ingredients</h1>
      <InputIngredients setRecommended={setRecommended}/>
      <RecommendedRecipes meals={recommended}/>
    </div>
  )
}

export default FridgeToPlate
