import React from 'react'
import MealCard from '../MealCard/MealCard'
import './RecommendedRecipes.css'

function RecommendedRecipes({meals}) {
  return (
    <div>
      <h2>Recommended Recipes</h2>
      {meals.length === 0 
        ? (<p>No recipes found</p>)
        : (meals.map(meal => (
          <div className='rec-card'>
            <div className='rec-info'><b>Match Count: </b>{meal.matchCount}</div>
            {meal.matchedIngredients.length > 0 
              ? (<div className='rec-info'><b>Used Ingredients: </b>{meal.matchedIngredients.join(", ")}</div>)
              : (<div className='rec-info'><b>No matched ingredients</b></div>)
            }
            {meal.missedIngredients.length > 0 
              ? (<div className='rec-info'><b>Missed Ingredients: </b>{meal.missedIngredients.join(", ")}</div>)
              : (<div className='rec-info'><b>No missed ingredients</b></div>)
            }
            <MealCard className='m-card' key={meal.data.key} meal={meal.data}/>
          </div>
          
        )))
      }
    </div>
  )
}

export default RecommendedRecipes
