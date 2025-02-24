import React, { useState, useEffect } from 'react';
import config from '../../config/config';
import axios from 'axios';
import MealCard from '../../components/MealCard/MealCard';
import './Home.css'

function Home() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMeals = async () => {
      setError('');
      try{
        const response = await axios.get(`${config.BASE_URL}/api/meals/all`)
        if(response.data.meals){
          setMeals(response.data.meals)
        } else {
          setMeals([])
        }
      } catch (error) {
        setError('Error fetching meals')
      }
    }
    fetchMeals();
  }, [])

  return (
    <div className='home-page'>
      <h1>Discover New Recipes Here</h1>
      
      {error && <div>{error}</div>}
      {meals.length === 0 && <div>{`No meals found`}</div>}
      <div className='meal-card-container'>
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal}/>
        ))}
      </div>
    </div>
  )
}

export default Home
