import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './AddRecipe.css'
import cameraImage from '../../assets/images/placeholder-camera.png'
import config from '../../config/config'

function AddRecipe() {

  // hardcode categories list for now
  const categories = [
    "Vegan",
    "Dessert",
    "Sweet",
    "Appetizer",
    "Snack",
    "Gluten-free"
  ]

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const addIngredient = () => {
    setIngredients([...ingredients, ''])
  }

  const updateIngredient = (index, value) => {
    const updated = ingredients.map((ingredient, i) => (
      i === index ? value : ingredient
    ));
    setIngredients(updated)
  }

  const removeIngredient = (index) => {
    const updated = ingredients.filter((_, i) => i !== index)
    setIngredients(updated)
  }

  const addInstruction = () => {
    setInstructions([...instructions, ''])
  }

  const updateInstruction = (index, value) => {
    const updated = instructions.map((instruction, i) => (
      i === index ? value : instruction
    ));
    setInstructions(updated)
  }

  const removeInstruction = (index) => {
    const updated = instructions.filter((_, i) => i !== index)
    setInstructions(updated)
  }

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories(prev => [...prev, value]);
    } else{
      setSelectedCategories(prev => prev.filter(category => category !== value))
    }
  }

  const addRecipe = (e) => {
    e.preventDefault()
    setError("")

    if(!name || !description || ingredients.length===0 || instructions.length===0 || selectedCategories.length===0){
      setError("All fields are required")
      return
    }

    const recipe = {
      name, description, ingredients, instructions, category: selectedCategories
    }

    const token = localStorage.getItem("jwt");
    axios.post(`${config.BASE_URL}/api/recipes/`, recipe, {
      headers:{
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      setName("")
      setDescription("")
      setIngredients([])
      setInstructions([])
      setSelectedCategories([])
      navigate('/managerecipe')
    })
    .catch((error) => {
      setError(error.response.data.message || "Failed to create recipe")
    })
    


  }

  return (
  <div className='recipe-creation-page'>
    <h2>Add New Recipe</h2>
    <div className='upload-image-box'>
      <img src={cameraImage} alt="" />
      <div className='upload-image'>
        Upload Image: Choose File
      </div>
    </div>

    <div className='recipe-info-container'>
      <div className='title'>
        <label><b>Title:</b></label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter your recipe title'/>
      </div>
      <div className='description'>
        <label><b>Descriptions:</b></label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="6"
          placeholder="Enter a description for your recipe"
        />
      </div>

      <div className='ingredients'>
        <label><b>Ingredients:</b></label>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text" 
              value={ingredient}
              onChange={(e) => updateIngredient(index, e.target.value)}
              placeholder="Enter an ingredient"
            />
            <button className='remove-btn' onClick={() => removeIngredient(index)}>Remove</button>
          </div>
        ))}
        <button className='add-btn' onClick={addIngredient}>Add Ingredient</button>
      </div>

      <div className='instructions'>
        <label><b>Instructions:</b></label>
        {instructions.map((instruction, index) => (
          <div key={index}>
            <div>Step {index + 1}:</div>
            <div className='step-container'>
              <textarea
                rows='3'
                value={instruction}
                onChange={(e) => updateInstruction(index, e.target.value)}
                placeholder="Enter an instruction for this step"
              />
              <button className='remove-btn' onClick={() => removeInstruction(index)}>Remove</button>
            </div>
          </div>
        ))}
        <button className='add-btn' onClick={addInstruction}>Add New Step</button>
      </div>

      <div>
        <label><b>Choose categories:</b></label>
        <div style={{margin: '10px 0'}}>
          {categories.map((category, index) => (
            <div key={index} style={{}}>
              <input 
                type="checkbox" 
                id={category}
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={handleCategoryChange}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>
      </div>

      <button className='create-btn' onClick={addRecipe}>Create Recipe</button>

      {error && <div>{error}</div>}

    </div>
  </div>
  )
}

export default AddRecipe
