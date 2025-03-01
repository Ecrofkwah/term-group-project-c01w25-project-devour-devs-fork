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
  const token = localStorage.getItem('jwt');

  // Decode token to get userId
  let userId;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.userId;
    } catch (error) {
      console.error('Token decoding error:', error);
    }
  }

  useEffect(() => {
    const fetchFavourites = async () => {
      setError('');
      try {
        // Pass userId as query parameter
        const response = await axios.get(
          `${config.BASE_URL}/api/meals/favourites?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.meals) {
          setFavourites(response.data.meals);
        } else {
          setFavourites([]);
        }
      } catch (error) {
        console.error('Error fetching favourites:', error);
        setError('Error fetching favourites');
      }
    };

    if (userId) {
      fetchFavourites();
    } else {
      setError('User not authenticated');
    }
  }, [userId, token]);

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