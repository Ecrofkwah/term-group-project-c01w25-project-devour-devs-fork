import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import config from '../../config/config';
import MealCard from '../../components/MealCard/MealCard';
import './MyFavourites.css';

function MyFavourites() {
  const [favourites, setFavourites] = useState([]);
  const [error, setError] = useState('');

  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');

  // Dynamically decode the user ID from the token
  let userId;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.userId;
    } catch (error) {
      console.error('Failed to decode token:', error);
      // Optionally, set an error state to show a message to the user.
    }
  }

  useEffect(() => {
    const fetchFavourites = async () => {
      setError('');
      try {
        const response = await axios.post(`${config.BASE_URL}/api/meals/favourites`, { userId });
        if (response.data.meals) {
          setFavourites(response.data.meals);
        } else {
          setFavourites([]);
        }
      } catch (error) {
        setError('Error fetching favourites');
      }
    };

    if (userId) {
      fetchFavourites();
    } else {
      setError('User not authenticated');
    }
  }, [userId]);

  return (
    <div className="my-favourites">
      <h1>My Favourite Meals</h1>
      {error && <div className="error">{error}</div>}
      {favourites.length === 0 && <div className="empty-message">No favourites found</div>}
      <div className="meal-card-container">
        {favourites.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
}

export default MyFavourites;
