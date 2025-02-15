import React, { useState, useEffect } from 'react';
import config from '../../config/config';
import { Recipe } from '../../components/recipe.jsx'

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    let ignore = false;
    async function fetchRecipes(){
      try{
        const response = await fetch(`${config.BASE_URL}/api/recipes`, {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (ignore) return;
        setRecipes(data.Response);
      }
      catch (err){
        console.log("error fetching");
      }
    }
    fetchRecipes();

    return () => {
      ignore = true;
    }
  }, []);
  return (
    <div style={{display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'space-between',
                 minHeight: '100vh',
                 width: '100%',
                 overflowX: 'hidden'}}>
      This is home/landing page.
      <div style={{
        width: '90%',
        margin: '0 auto',
        overflowX: 'auto',
        bottom: '20px'
      }}>
      <div className = 'recipes-container' style = {{display: 'flex',
                                                     gap: '10px',
                                                     overflowX: 'auto',
                                                     justifyContent: 'center',
                                                     whiteSpace: 'nowrap',
                                                     //width: '90%',
                                                     position: 'relative',
                                                     margin: '0 auto',
                                                     //bottom: '20px',
                                                     flexShrink: '0',
                                                     minWidth: 'fit-content',
                                                     //maxWidth: '90%'
                                                     }}>
        {recipes.length === 0 ? (
        <p>No recipes found</p>  // Debugging line
        ) : 
          recipes.map((recipe, index) => {
              return <Recipe
                        recipe={recipe}
              />
          })
        }
      </div>
      /</div>
    </div>
  )
}

export default Home
