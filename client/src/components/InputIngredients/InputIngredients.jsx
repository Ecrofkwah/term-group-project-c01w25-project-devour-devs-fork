import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import config from '../../config/config'
import './InputIngredients.css'
import { FaTimes } from 'react-icons/fa';

function InputIngredients({setRecommended}) {
  const [ingredients, setIngredients] = useState([]);
  const [input, setInput] = useState("")
  const token = localStorage.getItem("jwt")
  const [mode, setMode] = useState("manual")
  const [file, setFile] = useState(null)
  const [imageURL, setImageURL] = useState("")
  const [detections, setDetections] = useState([])
  const canvasRef  = useRef(null)

  const ingredientNormalizeMap = [
    {keyword: "beef", replacement: "beef"},
    {keyword: "chicken", replacement: "chicken"},
    {keyword: "pork", replacement: "pork"},
    {keyword: "grape", replacement: "grape"}
  ]

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
    if(ingredients.length === 0){
      setRecommended([]);
    }
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

  const toggleMode = (mode) =>{
    setMode(mode === "manual" ? "manual" : "upload")
    setFile(null)
    setImageURL("")
    setDetections([])
    setIngredients([]) //
    setRecommended([]) //
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if(selectedFile){
      setFile(selectedFile)
      setImageURL(URL.createObjectURL(selectedFile))
      setIngredients([]) //
      setRecommended([]) //
      setDetections([])
      clearCanvas()
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleDetect = async () => {
    if (!file) return alert("Please select an image first")
    const formData = new FormData()
    formData.append("image", file)

    try{
      const response = await axios.post(`${config.BASE_URL}/api/image/detect`, formData, {
          headers: {"Content-Type": "multipart/form-data"},
      });

      setDetections(response.data.detections)
      const detectedIngredients = response.data.detections.map((det) => {
        let ing = det.class || "Unknown"
        ingredientNormalizeMap.forEach(({keyword, replacement}) => {
          if(ing.toLowerCase().includes(keyword.toLowerCase())) {
            ing = replacement;
          }
        })
        return ing
      })

      setIngredients((prev) => [... new Set([...prev, ...detectedIngredients])])
    } catch(error){
      console.error("Error detecting ingredients", error)
    } 
  }

  useEffect(() => {
    if(imageURL && detections.length > 0){
      drawBoundingBoxes();
    }
  }, [detections]);

  const drawBoundingBoxes = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = imageURL;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      detections.forEach((det) => {
        const {x, y, width, height, class: ingredient} = det;
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 5;
        ctx.strokeRect(x- width/2, y - height/2, width, height);
        
        ctx.font = "bold 30px Arial"
        ctx.lineWidth = 5; // text outline thickness
        ctx.strokeStyle = "blue";
        ctx.strokeText(ingredient, x - width / 2, y - height / 2 - 5);
        ctx.fillStyle = "white";
        ctx.fillText(ingredient || "Unknown", x-width/2, y-height/2 - 5)
      })
    }
  }

  return (
    <div className='input-ingredient'>
      {/* <h2>Enter Ingredients:</h2> */}
      <div className='toggle-wrapper'>
        <button className={mode==="manual" ? "toggle manual active" : " manual toggle"} onClick={(e) => toggleMode("manual")}>
          Enter ingredients
        </button>
        <button className={mode==="upload" ? "toggle upload active" : "upload toggle"} onClick={(e) => toggleMode("upload")}>
          Upload an image
        </button>
      </div>
      
      {mode === "manual" ? (<>
        <div className='input-container'>
        <input 
          type="text"
          value={input}
          placeholder='Enter an ingredient'
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddIngredient()}
        />
        <button className='add-btn' onClick={handleAddIngredient}>Add</button>
        </div>

        </>) : (<div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button className="detect-btn" onClick={handleDetect}>
            Detect
          </button>

          {imageURL && (
            <div style={{ position: "relative", maxWidth: "700px", margin: "20px"}}>
              {detections.length > 0 
                ? <canvas ref={canvasRef} style={{ border: "1px solid black", maxWidth: "100%" }} />
                : <img src={imageURL} style={{ maxWidth: "100%", display: "block" }} />
              }
            </div>
          )}
        </div>)}

        <ul className='ingredient-list'>
          {ingredients.map((ing, index) => (
              <li key={index}>
                <div className='ing-wrapper'>{ing}</div>
                <FaTimes className='remove-btn' onClick={() => handleRemoveIngredient(ing)}/>
                {/* <button className='remove-btn' onClick={() => handleRemoveIngredient(ing)}>Remove</button> */}
              </li>
          ))}
        </ul>
        <button className='rec-btn' onClick={handleRecommend}>Get Recipe Reccommendations</button>
    </div>
  )
}

export default InputIngredients
