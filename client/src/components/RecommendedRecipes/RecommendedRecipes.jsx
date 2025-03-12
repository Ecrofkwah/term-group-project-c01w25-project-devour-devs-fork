import React from 'react'
import MealCard from '../MealCard/MealCard'

function RecommendedRecipes({meals}) {
  return (
    <div>
      <h2>Recommended Recipes</h2>
      {meals.length === 0 
        ? (<p>No recipes found</p>)
        : (meals.map(meal => (
          <div>
            <MealCard key={meal.data.key} meal={meal.data}/>
            <div>Match Count: {meal.matchCount}</div>
            {meal.missedIngredients.length > 0 
              ? (<div>Missed Ingredients: {meal.missedIngredients.join(", ")}</div>)
              : (<p>No missed ingredients</p>)
            }
          </div>
          
        )))
      }
    </div>
  )
}

export default RecommendedRecipes
