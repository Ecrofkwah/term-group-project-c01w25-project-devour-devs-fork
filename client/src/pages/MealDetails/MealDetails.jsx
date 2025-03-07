import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import './MealDetails.css'
import config from '../../config/config';
import MealRate from '../../components/MealRate/MealRate';

function MealDetails({loginUser}) {
  const {id} = useParams();
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState('');
  const [favMessage, setFavMessage] = useState('');
  const [isFav, setIsFav] = useState(false);
  const [rating, setRating] = useState(0);

  const userId = localStorage.getItem("userId");

  async function fetchMealDetails (id){
    setError('');

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

    // checking if the meal is in favorite or not
    try {
      const response = await axios.get(`${config.BASE_URL}/api/meals/favourites`, { 
          params: { userId } 
      });
      if(response.data.meals && response.data.meals.find(meal => Number(meal.id) === Number(id))){
        setIsFav(true)
      }
      else {
        setIsFav(false)
      }
    } catch (err) {
      setError("Error checking favourite meals");
    }

    // Getting rating
    try{
      const result = await axios.get(`${config.BASE_URL}/api/meals/rating?mealId=${meal.id}`);
      setRating(result);
    }
    catch (error){
      Console.log(error);
    }
  }

  useEffect(() => {
    fetchMealDetails(id);
  }, [id])

  const handleAddToFavourites = async () => {
    // setFavMessage('');
    try {
      const response = await axios.post(`${config.BASE_URL}/api/meals/favourites`, {
        userId: loginUser.userId,
        mealId: meal.id
      });
      //setFavMessage(response.data.message || "Meal added to favourites");
      setIsFav(true)
    } catch (err) {
      //setFavMessage("Error adding to favourites");
      console.log("Error adding to fav");
    }
  };

  const handleRemoveFromFavourites = async () => {
    try {
      const response = await axios.delete(`${config.BASE_URL}/api/meals/favourites`, {
        data: { userId: loginUser.userId, mealId: meal.id }
      });
      setIsFav(false)
    } catch (err) {
      console.log("Error remove from fav")
    }
  };

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

        {loginUser 
        ? (!isFav 
          ? (<div className='add-to-fav-btn' onClick={handleAddToFavourites}>
              Add to Favourites
            </div>) 
          : (<div className='remove-fav-btn' onClick={handleRemoveFromFavourites}>
              Remove from Favourites
            </div>)) 
        : <></>}
        {/* {favMessage && <div className="fav-message">{favMessage}</div>} */}

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

      {loginUser && <MealRate setRating={setRating} mealId={id} userId={loginUser.userId} rating={rating}/>}
    </div>
  )
}

export default MealDetails
