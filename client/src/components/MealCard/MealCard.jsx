import React from 'react'
import {useNavigate} from 'react-router-dom'
import './MealCard.css'

function MealCard({meal}) {
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
      </div>
    </div>
  )
}

export default MealCard

