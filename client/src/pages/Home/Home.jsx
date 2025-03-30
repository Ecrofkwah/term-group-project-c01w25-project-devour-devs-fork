import React, { useState, useEffect } from 'react';
import config from '../../config/config';
import axios from 'axios';
import MealCard from '../../components/MealCard/MealCard';
import './Home.css'
import SearchBar from '../../components/SearchBar/SearchBar';
import { Container, Form, Stack } from 'react-bootstrap';

function Home() {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [dietaryFilter, setDietaryFilter] = useState('');
  const [dishTypeFilter, setDisTypeFilter] = useState('');
  const [cookingTimeFilter, setCookingTimeFilter] = useState('');
  const [error, setError] = useState('');

  // define list of filter options
  const dietaryOptions = ['vegan', 'gluten free', 'lacto ovo vegetarian', 'dairy free'];
  const dishTypeOptions = ['main course', 'dessert', 'snack', 'appetizer', 'side dish', 'antipasti',
    'soup', 'starter', 'antipasto', 'lunch', 'dinner'
  ];
  const cookingTimeOptions = [
    {label: 'Less than 30 minutes', value: '0-30'},
    {label: '30-60 minutes', value: '30-60'},
    {label: 'More than 60 minutes', value: '60-2000'}
  ];


  useEffect(() => {
    const fetchMeals = async () => {
      setError('');
      try{
        const response = await axios.get(`${config.BASE_URL}/api/meals/all`)
        if(response.data.meals){
          setMeals(response.data.meals)
          setFilteredMeals(response.data.meals)
        } else {
          setMeals([])
          setFilteredMeals([])
        }
      } catch (error) {
        setError('Error fetching meals')
      }
    }
    fetchMeals();
  }, []);

  const filterMeals = () => {
    let filtered = meals;
    if(dietaryFilter) {
      filtered = filtered.filter(meal => meal.diets && meal.diets.includes(dietaryFilter));
    }
    if(dishTypeFilter){
      filtered = filtered.filter(meal => meal.dishTypes && meal.dishTypes.includes(dishTypeFilter));
    }
    if(cookingTimeFilter){
      const [minTime, maxTime] = cookingTimeFilter.split('-').map(time => parseInt(time, 10))
      filtered = filtered.filter(meal => meal.readyInMinutes && meal.readyInMinutes >= minTime && meal.readyInMinutes <= maxTime);
    }

    setFilteredMeals(filtered);
  }

  useEffect(() => {
    filterMeals();
  }, [dietaryFilter, dishTypeFilter, cookingTimeFilter])

  return (
    <div className='home-page'>
      <h1>Discover New Recipes Here</h1>
      <div className='search-bar-wrapper'>
        <SearchBar/>
      </div>

      <Container fluid className="my-2">
        <Stack direction="horizontal" gap={5}>
          {/* Dietary Filter */}
            <Form.Label><b>Dietary Info:</b></Form.Label>
            <Form.Select
              value={dietaryFilter}
              onChange={(e) => setDietaryFilter(e.target.value)}
            >
              <option value="">All</option>
              {dietaryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          {/* <div className='filter'>
            <div><b>Select Dietary Info:</b></div>
            <select onChange={(e) => setDietaryFilter(e.target.value)} value={dietaryFilter}>
              <option value="">All</option>
              {dietaryOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div> */}

          {/* Dish Type Filter */}
          {/* <div className='filter'>
            <div><b>Select Dish Type:</b></div>
            <select onChange={(e) => setDisTypeFilter(e.target.value)} value={dishTypeFilter}>
              <option value="">All</option>
              {dishTypeOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div> */}
            <Form.Label className="mb-0 mr-2"><b>Dish Type:</b></Form.Label>
            <Form.Select
              value={dishTypeFilter}
              onChange={(e) => setDisTypeFilter(e.target.value)}
            >
              <option value="">All</option>
              {dishTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>

          {/* Cooking Time Filter */}
          {/* <div className='filter'>
            <div><b>Select Cooking Time:</b></div>
            <select onChange={(e) => setCookingTimeFilter(e.target.value)} value={cookingTimeFilter}>
              <option value="">All</option>
              {cookingTimeOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div> */}
            <Form.Label className="mb-0 mr-2"><b>Cooking Time:</b></Form.Label>
            <Form.Select
              value={cookingTimeFilter}
              onChange={(e) => setCookingTimeFilter(e.target.value)}
            >
              <option value="">All</option>
              {cookingTimeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>

        </Stack>
      </Container>

      {error && <div>{error}</div>}
      {meals.length === 0 && <div>{`No meals found`}</div>}
      {filteredMeals.length === 0 && <div>{`No meals matched the filter`}</div>}
      <div className='meal-card-container'>
        {filteredMeals.map((meal) => (
          <MealCard key={meal.id} meal={meal}/>
        ))}
      </div>
    </div>
  )
}

export default Home
