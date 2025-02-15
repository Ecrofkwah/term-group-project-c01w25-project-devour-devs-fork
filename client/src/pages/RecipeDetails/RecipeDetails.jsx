import React from 'react'
import { useParams } from 'react-router-dom'

function RecipeDetails() {
  // use useParams to get the recipe 'id' from the URL
  const { id } = useParams();
  
  return (
    <div>
    
    </div>
  )
}

export default RecipeDetails
