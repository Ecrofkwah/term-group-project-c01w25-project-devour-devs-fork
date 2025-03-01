import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config/config';
import './MyFavourites.css';

function MyFavourites() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");

  const fetchFavourites = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/meals/favourites`, { 
          params: { userId } 
      });
      setFavourites(response.data.meals);
      setLoading(false);
    } catch (err) {
      setError("Error fetching favourite meals");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
    } else {
      fetchFavourites();
    }
  }, [userId]);

  const handleDeleteFavourite = async (mealId) => {
    try {
      await axios.delete(`${config.BASE_URL}/api/meals/favourites`, {
        data: { userId, mealId }
      });
      // Update favourites state to remove the deleted meal
      setFavourites(favourites.filter(meal => meal.id !== mealId));
    } catch (err) {
      console.error(err);
      setError("Error deleting favourite");
    }
  };

  if (loading) {
    return <div>Loading favourites...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="favourites-container">
      <h2>My Favourite Meals</h2>
      <div className="favourites-list">
        {favourites.length > 0 ? (
          favourites.map((meal, index) => (
            <div key={index} className="meal-card">
              <h3>{meal.title}</h3>
              {meal.image && <img src={meal.image} alt={meal.title} />}
              <button onClick={() => handleDeleteFavourite(meal.id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No favourite meals yet!</p>
        )}
      </div>
    </div>
  );
}

export default MyFavourites;
