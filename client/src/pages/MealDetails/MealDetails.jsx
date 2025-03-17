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
  const [isStepByStep, setIsStepByStep] = useState(false);
  const [aiAssistantInstructions, setAiAssistantInstructions] = useState('No instructions available');
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);

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
      const result = await axios.get(`${config.BASE_URL}/api/meals/rating/user?mealId=${id}&userId=${userId}`);
      const rating = result.data;
      setRating(rating.rating);
    }
    catch (error){
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMealDetails(id);
  }, [id])

  useEffect(() => {
    const fetchAiAssistantInstructions = async () => {
      try{
        const response = await axios.post(`${config.BASE_URL}/api/ai/step-by-step`, {
          instructions: meal.instructions
        });
        setAiAssistantInstructions(response.data.summary);
      } catch (error){
        console.log('Error fetching AI assistant instructions');
      }
    }
    fetchAiAssistantInstructions();
  }, [meal])

  useEffect(() => {
    const steps = document.querySelectorAll('.step');
    if (steps[currentStep]){
      steps[currentStep].classList.add('active');
    }
    setTotalSteps(steps.length);
  }, [isStepByStep, aiAssistantInstructions])

  const showNextStep = () => {
    const steps = document.querySelectorAll('.step');
    if (currentStep < document.querySelectorAll('.step').length - 1) {
      steps[currentStep].classList.remove('active');
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      steps[newStep].classList.add('active');
      console.log(newStep);
    }
  };

  const showPrevStep = () => {
    const steps = document.querySelectorAll('.step');
    if (currentStep > 0) {
      steps[currentStep].classList.remove('active');
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      steps[newStep].classList.add('active');
      console.log(newStep);
    }
  };

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

        <div className='recipe-options'>
          <div className='fav-btn-container'>{loginUser 
            ? (!isFav 
              ? (<div className='add-to-fav-btn' onClick={handleAddToFavourites}>
                  Add to Favourites
                </div>) 
              : (<div className='remove-fav-btn' onClick={handleRemoveFromFavourites}>
                  Remove from Favourites
                </div>)) 
            : <></>}
          </div>
          <div className='rating-select'>
            {loginUser && <MealRate setRating={setRating} mealId={id} userId={loginUser.userId} rating={rating}/>}    
          </div>
          {/* {favMessage && <div className="fav-message">{favMessage}</div>} */}
          <div className='step-by-step-container'>
            {!isStepByStep ? 
            (
              <div className='step-by-step-btn-off' onClick={() => setIsStepByStep(true)}> Step-by-Step Mode </div>
            ) : (
              <div className='step-by-step-btn-on' onClick={() => setIsStepByStep(false)}> Step-by-Step Mode </div>
            )}
          </div>
        </div>

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
          {isStepByStep ? 
          (
            <div className='step-by-step-instructions'>
              <div className='step-nav'>
                {currentStep < totalSteps - 1 ? (
                  <button className='next-step-btn-available' onClick={showNextStep}>
                    Next Step
                  </button>
                ) : (
                  <button className='next-step-btn-unavailable' disabled>
                    Next Step
                  </button>
                )}
                {currentStep > 0 ? (
                  <button className='prev-step-btn-available' onClick={showPrevStep}>
                    Prev Step
                  </button>
                ) : (
                  <button className='prev-step-btn-unavailable' disabled>
                    Prev Step
                  </button>
                )}
              </div>
              <div dangerouslySetInnerHTML={{__html: aiAssistantInstructions}}></div>
            </div>
          ) : (
            meal.instructions ? 
            (
              <div dangerouslySetInnerHTML={{__html: meal.instructions}}></div>
            ) : (
              <div>No instructions available</div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default MealDetails
