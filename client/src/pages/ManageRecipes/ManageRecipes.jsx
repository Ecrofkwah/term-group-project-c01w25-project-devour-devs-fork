import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config/config';
import { RecipeCardManager } from '../../components/RecipeCard/RecipeCardManager.jsx'

function ManageRecipes({ loginUser, setLoginUser }) {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("jwt")

    // Check if user is logged in
    if (token) {
      axios.get(`${config.BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      }, { withCredentials: true })
        .then(response => {
          setLoginUser(response.data);
          console.log("logged in")
          // console.log("Returned: " + JSON.stringify(response.data));
        })
        .catch(error => {
          setLoginUser(null);
          console.log("none")
        })
    }

  }, [])

  async function fetchRecipes() {
    try {
      const response = await fetch(`${config.BASE_URL}/api/recipes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      // console.log("loginUser.id: " + loginUser.userId);
      setRecipes(data.Response.filter(recipe => recipe.authorId === loginUser.userId));
      console.log("Fetched recipes");
    }
    catch (err) {
      console.log("error fetching");
    }
  }

  useEffect(() => {
    // console.log("Here?");
    if (loginUser == null) return;
    fetchRecipes();
  }, [loginUser]);

  return (
    <div>
      this is recipe management page
      <div style={{
        width: '90%',
        margin: '0 auto',
        overflowX: 'auto',
        bottom: '20px'
      }}>
        <div className='recipes-container' style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          justifyContent: 'left',
          whiteSpace: 'nowrap',
          //width: '90%',
          position: 'relative',
          margin: '0 auto',
          //bottom: '20px',
          flexShrink: '0',
          minWidth: 'fit-content',
          //maxWidth: '90%'
          flexDirection: 'column',
          marginTop: '5%',
          paddingBottom: '5%'
        }}>
          {recipes.length === 0 ? (
            <p>No recipes found</p>  // Debugging line
          ) :
            recipes.map((recipe, index) => {
              return <RecipeCardManager
                recipe={recipe}
                fetchRecipes={fetchRecipes}
              />
            })
          }
        </div>
      </div>
    </div>

  )
}

export default ManageRecipes
