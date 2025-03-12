import React, { useState } from 'react'
import axios from 'axios'
import config from '../../config/config'

function InputIngredients({setRecommended}) {
  const [ingredients, setIngredients] = useState([]);
  const [input, setInput] = useState("")
  const token = localStorage.getItem("jwt")

  const handleAddIngredient = () => {
    if(input.trim() && !ingredients.includes(input.trim().toLowerCase())){
        setIngredients([...ingredients, input.trim().toLowerCase()]);
    } else if (ingredients.includes(input.trim().toLowerCase())){
      alert("ingredients already added. Add a new one")
    }
    setInput("")
  }

  const handleRemoveIngredient = (ingToRemove) => {
    setIngredients(ingredients.filter(ing => ing !== ingToRemove))
  }

  const handleRecommend = async () => {
    if(ingredients.length === 0) return;
    try{
        const response = await axios.post(`${config.BASE_URL}/api/meals/recommend`, 
          {ingredients}, 
          {headers: { Authorization: `Bearer ${token}` }}
        );
        setRecommended(response.data.topMeals)
    } catch (error) {
        console.error("error fetching recommedations based on ingredients", error)
    }
  }
  return (
    <div>
      <h2>Enter Ingredients:</h2>
      <input 
        type="text"
        value={input}
        placeholder='Enter an ingredient'
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleAddIngredient()}
      />
      <button onClick={handleAddIngredient}>Add</button>
      <ul>
        {ingredients.map((ing, index) => (
            <li key={index}>
              {ing}
              <button onClick={() => handleRemoveIngredient(ing)}>Remove</button>
            </li>
        ))}
      </ul>
      <button onClick={handleRecommend}>Get Recipe Reccommendations</button>
    </div>
  )
}

export default InputIngredients
