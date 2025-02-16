import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import config from '../../config/config';

function RecipeDetails() {
  // use useParams to get the recipe 'id' from the URL
  const { id } = useParams();
  const [recipe, setRecipe] = useState({}); // Recipe data stored in json object

  useEffect(() => {
   async function fetchRecipeDetails(id) {
      try {
        const response = await fetch(`${config.BASE_URL}/api/recipes/recipe/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        setRecipe(data.result) // This will give us a json object with the recipe details

      } catch (error) {
        console.log(error)
      }
    }

    fetchRecipeDetails(id)

  },[])

  return (
    <div style={{ width: '90%', margin: '0 auto', overflowX: 'auto', bottom: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>{recipe.name}</h1>

      <div style={{ marginBottom: '30px'}}>
        <p><b>Description:</b></p>
        <p style={{ paddingLeft: '30px' }}>{recipe.description}</p>
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <p><b>Ingredients:</b></p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '40px' }}>
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient.trim()}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <p><b>Instructions:</b></p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '40px' }}>
          {recipe.instructions?.map((instruction, index) => (
            <li key={index}>{instruction.trim()}</li>
          ))}
        </ul>
      </div>

      <div>
        <p><b>Category:</b></p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '40px' }}>
          {recipe.category?.map((instruction, index) => (
            <li key={index}>{instruction.trim()}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RecipeDetails
