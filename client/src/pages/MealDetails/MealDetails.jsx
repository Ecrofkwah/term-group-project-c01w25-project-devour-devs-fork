import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import './MealDetails.css'
import config from '../../config/config';

function MealDetails() {
  const {id} = useParams();
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMealDetails = async () => {
      setError('');

      const cachedMeal = localStorage.getItem(`meal-${id}`);
      if(cachedMeal){
        setMeal(JSON.parse(cachedMeal))
        return
      }

      try{
        const response = await axios.get(`${config.BASE_URL}/api/meals/details?id=${id}`)
        if(response.data.meal){
          localStorage.setItem(`meal-${id}`, JSON.stringify(response.data.meal))
          setMeal(response.data.meal)
        } else {
          setError("Meal details not available")
          setMeal(null)
        }
      } catch (error) {
        setError('Error fetching meal details')
      }
    }

    fetchMealDetails();
  }, [id])

  if(error){
    return <div>{error}</div>
  }

  if(!meal) {
    return <div>No meal details available</div>
  }

  return (
    <div className='meal-details-container'>
      <div className='meal-details'>
        <div className='title'>{meal.title}</div>

        <div className='image'>
          <img src={meal.image}/>
        </div>

        <div className='meal-info'>
          <div><b>Summary:</b></div>
          <div dangerouslySetInnerHTML={{__html: meal.summary}}></div>
        </div>

        <div className='meal-info'><b>Cooking Time:</b> {meal.readyInMinutes}</div>
        <div className='meal-info'><b>Servings:</b> {meal.servings}</div>
        {meal.cuisines && meal.cuisines.length > 0 && <div className='meal-info'><b>Cuisine: </b> {meal.cuisines.join(", ")}</div>}
        {meal.dishTypes && meal.dishTypes.length > 0 && <div className='meal-info'><b>Dish Types: </b> {meal.dishTypes.join(", ")}</div>}
        {meal.diets && meal.diets.length > 0 && <div className='meal-info'><b>Dietary Info: </b> {meal.diets.join(", ")}</div>}
        <div className='meal-info'>
          <div><b>Ingredients:</b></div>
          <div>
            <ul>
              {meal.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>
                  {ingredient.original} {ingredient.measures.metric.amount && ingredient.measures.metric.unitShort &&
                  `(${ingredient.measures.metric.amount} ${ingredient.measures.metric.unitShort})`}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className='meal-info'>
          <div><b>Instructions:</b></div>
          <div dangerouslySetInnerHTML={{__html: meal.instructions}}></div>
        </div>
      </div>
    </div>
  )
}

export default MealDetails
