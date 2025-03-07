import {React, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './MealCard.css'
import axios from 'axios'
import { config } from 'dotenv'
import { Rating } from '../MealRate/rating.jsx'
function MealCard({meal}) {
  const navigate = useNavigate()
  const [rating, setRating] = useState(null);

  const handleCardClick = () => {
    navigate(`/meals/meal/${meal.id}`);
  }

  useEffect(() => {
    const fetchRating = async () => {
      try{
        const result = await axios.get(`${config.BASE_URL}/api/meals/rating?mealId=${meal.id}`);
        setRating(result);
      }
      catch (error){
        console.log(error);
      }
    }
    fetchRating();
  }, []);
  
  return (
    <div className='meal-card' onClick={handleCardClick}>
      <img src={meal.image}/>
      <div className='meal-card-content'>
        <div className='title'>{meal.title}</div>
        <div>Cooking Time: {meal.readyInMinutes} min</div>
        <div>Servings: {meal.servings}</div>
      </div>
      <div className="ratingContainer"> <Rating rating={rating} /> </div>
    </div>
  )
}

export default MealCard

