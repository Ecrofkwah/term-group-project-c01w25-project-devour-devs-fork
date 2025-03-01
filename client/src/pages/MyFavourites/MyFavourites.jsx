import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyFavourites.css';
import config from '../../config/config';

function MyFavourites() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    axios.get(`${config.BASE_URL}/api/meals/favourites`, { 
      params: { userId } 
    })
      .then(response => {
        setFavourites(response.data.meals);
        setLoading(false);
      })
      .catch(err => {
        setError("Error fetching favourite meals");
        setLoading(false);
      });
  }, [userId]);

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
