import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import './MealDetails.css'
import config from '../../config/config';

function MealDetails({loginUser}) {
  const {id} = useParams();
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMealDetails = async () => {
      setError('');

      // let storedMeals = JSON.parse(localStorage.getItem('meals')) || []
      // if(storedMeals.length >= 150){
      //   localStorage.removeItem('meals')
      //   storedMeals = []
      // }

      // const cachedMeal = storedMeals.find((meal) => Number(meal.id) === Number(id));
      // if(cachedMeal){
      //   setMeal(cachedMeal)
      //   return
      // }

      try{
        const response = await axios.get(`${config.BASE_URL}/api/meals/details?id=${id}`)
        if(response.data.meal){
          // storedMeals = [... storedMeals, response.data.meal]
          // localStorage.setItem('meals', JSON.stringify(storedMeals))

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

        {loginUser && <div className='add-to-fav-btn'>Add to Favourites</div>}

        <div className='meal-info'>
          <div><b>Summary:</b></div>
          {/* <div dangerouslySetInnerHTML={{__html: meal.summary}}></div> */}
          <div>{meal.summary.replace(/<[^>]*>/g, '')}</div>
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
              {meal.extendedIngredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.original} {ingredient.measures.metric.amount && ingredient.measures.metric.unitShort &&
                  `(${ingredient.measures.metric.amount} ${ingredient.measures.metric.unitShort})`}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className='meal-info'>
          <div><b>Instructions:</b></div>
          {meal.instructions ? <div dangerouslySetInnerHTML={{__html: meal.instructions}}></div> : <div>No instructions available</div>}
        </div>
      </div>
    </div>
  )
}

export default MealDetails
