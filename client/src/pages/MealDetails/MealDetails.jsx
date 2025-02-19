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
      try{
        const response = await axios.get(`${config.BASE_URL}/api/meals/details?id=${id}`)
        if(response.data.meal){
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

  const getIngredients = (meal) => {
    const ingredients = [];
    for(let i=1; i<20; i++){
      const ingredient = meal[`strIngredient${i}`]
      const measure = meal[`strMeasure${i}`]

      if(ingredient) {
        ingredients.push({ingredient, measure})
      }
    }
    return ingredients
  }

  if(error){
    return <div>{error}</div>
  }

  if(!meal) {
    return <div>No meal details available</div>
  }

  const ingredients = getIngredients(meal);

  return (
    <div className='meal-details-container'>
      <div className='meal-details'>
        <div className='title'>{meal.strMeal}</div>
        <div className='image'>
          <img src={meal.strMealThumb}/>
        </div>

        <div className='meal-info'><b>Category:</b> {meal.strCategory}</div>
        <div className='meal-info'><b>Area:</b> {meal.strArea}</div>
        <div className='meal-info'>
          <div><b>Ingredients:</b></div>
          <div>
            <ul>
              {ingredients.map((item, index) => (
                <li key={index}>
                  {item.ingredient}: {item.measure}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className='meal-info'>
          <div><b>Instructions:</b></div>
          <div>{meal.strInstructions}</div>
        </div>
        
        {meal.strYoutube && (<div className='meal-info'>
          <div><b>Youtube video:</b></div>
          <a href={meal.strYoutube}>
            Click to watch video
          </a>
        </div>)}
      </div>
    </div>
  )
}

export default MealDetails
