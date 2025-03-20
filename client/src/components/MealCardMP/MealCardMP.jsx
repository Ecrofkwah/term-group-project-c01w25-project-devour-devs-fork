import React from 'react'
import {useNavigate} from 'react-router-dom'
import './MealCardMP.css'

function MealCardMP({meal}) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/meals/meal/${meal.id}`);
  }
  return (
    <div className='meal-card' onClick={handleCardClick}>
      <img src={meal.image}/>
      <div className='meal-card-content'>
        <div className='title'>{meal.title}</div>
        <div>Cooking Time: {meal.readyInMinutes} min</div>
        <div>Servings: {meal.servings}</div>
        <div>{meal.nutrition.nutrients[0].name}: {meal.nutrition.nutrients[0].amount} {meal.nutrition.nutrients[0].unit}</div> {/*Calories*/}
        <div>{meal.nutrition.nutrients[1].name}: {meal.nutrition.nutrients[1].amount} {meal.nutrition.nutrients[1].unit}</div> {/*Fat*/}
        <div>{meal.nutrition.nutrients[3].name}: {meal.nutrition.nutrients[3].amount} {meal.nutrition.nutrients[3].unit}</div> {/* Carbs*/}
        <div>{meal.nutrition.nutrients[10].name}: {meal.nutrition.nutrients[10].amount} {meal.nutrition.nutrients[10].unit}</div> {/*Protien*/}
        {/*meal.nutrition.nutrients.map(nutrient => ( <div> {nutrient.name} </div>))*/}
      </div>
    </div>
  )
}

export default MealCardMP

