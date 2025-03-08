import React from 'react'
import './MealRate.css'
import { SelectRating } from './SelectRating'

function MealRate({setRating, mealId, userId, rating}) {
  return (
    <div className="MealRate">
      <SelectRating setRating={setRating} mealId={mealId} userId={userId} rating={rating}/>
    </div>
  )
}

export default MealRate
