import {React, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './MealCard.css'
import axios from 'axios'
import config from '../../config/config';
import { Rating } from '../MealRate/rating.jsx'
import Card from 'react-bootstrap/Card';
import { CardBody } from 'react-bootstrap';

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
        console.log("Read the rating");
        setRating(ratings);
      }
      catch (error){
        console.log(error);
      }
    }
    console.log("REACHED HERE");
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
     border='dark'
     className='mb-2'
     text="dark"
     >
      <Card.Img variant="top" src={meal.image} alt={meal.title} />
        <Card.Body>
          <Card.Title style ={{fontFamily: 'Roboto'}}>
            <b>{meal.title}</b>
          </Card.Title>
          <Card.Text>
            Cooking Time: {meal.readyInMinutes} min
          </Card.Text>
          <Card.Text>
            Servings: {meal.servings}
          </Card.Text>
          <Card.Footer>
            {rating ? <div className="ratings"> 
              <Rating rating={rating.avgRating} /> 
               <div className="ratingCount"> ({rating.numRatings}) </div> 
          </div>: <p>Loading...</p>}
          </Card.Footer>
        </Card.Body>
    </Card>
  )
}

export default MealCard

