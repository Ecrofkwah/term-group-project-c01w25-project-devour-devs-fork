import React, { useState, useEffect } from 'react';
import config from '../../config/config';
import axios from 'axios';
import MealCard from '../../components/MealCard/MealCard';
import './Home.css'

function Home() {
  const [letter, setLetter] = useState('A');
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState('');
  const lettersList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
                       'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                       'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
                      ]

  useEffect(() => {
    const fetchMealByFirstLetter = async () => {
      setError('');
      try{
        const response = await axios.get(`${config.BASE_URL}/api/meals/search/firstletter?letter=${letter}`)
        if(response.data.meals){
          setMeals(response.data.meals)
        } else {
          setMeals([])
        }
      } catch (error) {
        setError('Error fetching meals')
      }
    }

    fetchMealByFirstLetter();
  }, [letter])

  return (
    <div className='home-page'>
      <h1>Discover New Recipes Here</h1>
      <div className='dropdown-container'>
        <label htmlFor="letter-dropdown">Find Recipes by First Letter: </label>
        <select 
          onChange={(e) => setLetter(e.target.value)}
          value={letter}
        >
          {lettersList.map((letter) => (
            <option key={letter} value={letter}>{letter}</option>
          ))}
        </select>
      </div>
      

      {error && <div>{error}</div>}
      {meals.length === 0 && <div>{`No meals found starting with letter ${letter}`}</div>}
      <div className='meal-card-container'>
        {meals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal}/>
        ))}
      </div>
    </div>
  )
}

export default Home
