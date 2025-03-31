import {React, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './MealCard.css'
import axios from 'axios'
import config from '../../config/config';
import { Rating } from '../MealRate/rating.jsx'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'

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
        const ratings = result.data;
        setRating(ratings);
      }
      catch (error){
        console.log(error);
      }
    }
    fetchRating();
  }, []);
  
  return (
    // <div className='meal-card' onClick={handleCardClick}>
    //   <img src={meal.image}/>
    //   <div className='meal-card-content'>
    //     <div className='title'>{meal.title}</div>
    //     <div>Cooking Time: {meal.readyInMinutes} min</div>
    //     <div>Servings: {meal.servings}</div>
    //   </div>
    //   <div className="ratingContainer"> 
    //        {rating ? <div className="ratings"> 
    //           <Rating rating={rating.avgRating} /> 
    //           <div className="ratingCount"> ({rating.numRatings}) </div> 
    //    </div>: <p>Loading...</p>} </div>
    // </div>

   
    <Card 
        className="h-100 shadow-sm meal-card" 
        style={{ borderRadius: '0.8rem', overflow: 'hidden', cursor: 'pointer' }}
        onClick={handleCardClick}
      >
        <Card.Img 
          variant="top" 
          src={meal.image} 
          alt={meal.title}
          style={{ objectFit: 'cover', height: '180px' }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="fs-5 fw-bold text-dark">
            {meal.title}
          </Card.Title>
          <Card.Text className="text-muted mb-1">
            Cooking Time: {meal.readyInMinutes} min
          </Card.Text>
          <Card.Text className="text-muted mb-3">
            Servings: {meal.servings}
          </Card.Text>

          {/* Rating at the bottom of the card body */}
          <div className="mt-auto">
            {rating ? (
              <div className="d-flex align-items-center">
                <Rating rating={rating.avgRating} />
                <span className="ms-2 text-muted">({rating.numRatings})</span>
              </div>
            ) : (
              <p className="text-muted">Loading...</p>
            )}
          </div>
        </Card.Body>
      </Card>
  )
}

export default MealCard

