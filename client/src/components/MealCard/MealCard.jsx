import React from 'react'
import {useNavigate} from 'react-router-dom'
import './MealCard.css'

function MealCard({meal}) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/meals/meal/${meal.idMeal}`);
  }
  return (
    <div className='meal-card' onClick={handleCardClick}>
      <img src={meal.strMealThumb}/>
      <div className='meal-card-content'>
        <div className='title'>{meal.strMeal}</div>
        <div>Category: {meal.strCategory}</div>
        <div>Area: {meal.strArea}</div>
      </div>
    </div>
  )
}

export default MealCard

