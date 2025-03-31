import React, { useState } from 'react'
import './RecognitionResult.css'
import config from '../../config/config.js'
import axios from 'axios'

function RecognitionResult({showModal, closeModal, predictions, image}) {
  const [portion, setPortion] = useState(100);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("jwt");
  const userId = localStorage.getItem("userId");

  if(!showModal){
    return;
  }

  const scaleNutrients = (value, portion) => {
    return value * portion;
  }

  const handlePortionChange = (e) => {
    setPortion(Number(e.target.value))
    setMessage("")
  }

  const handleAcceptIntake = async () => {
    const intakeData = {
      category: predictions.category,
      portion: portion,
      calories: predictions.calories * portion,
      protein: predictions.protein * portion,
      carbs: predictions.carbs * portion,
      fat: predictions.fat * portion,
      userId: userId,
    }

    try{
      const response = await axios.post(`${config.BASE_URL}/api/intake/save`, intakeData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if(response.data.success){
        setMessage("Intake saved successfully!")
        closeModal()
        alert("Intake saved successfully!")
      }
    } catch (error){
      console.error("error saving intake")
    }
  }

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <div className='modal-content'>
          {predictions
            ? (<div className="info">
                <h3><b>Nutritional Insights</b></h3>
                <div><b>Category: </b>{predictions.category.replace(/_/g, " ")}</div>

                {/* portion size input */}
                <div className="portion-input-container">
                    <label htmlFor="portion"><b>Select Portion Size (grams):</b></label>
                    <input
                        type="number"
                        id="portion"
                        value={portion}
                        onChange={handlePortionChange}
                        min="50"
                        max="2000"
                        step="50"
                    />
                </div>

                <div><b>Ingredients: </b>{predictions.ingredients.join(", ")}</div>
                <div><b>Calories: </b>{scaleNutrients(predictions.calories, portion).toFixed(2)} kcal</div>
                <div><b>Protein: </b>{scaleNutrients(predictions.protein, portion).toFixed(2)} g</div>
                <div><b>Carbs: </b>{scaleNutrients(predictions.carbs, portion).toFixed(2)} g</div>
                <div><b>Fat: </b>{scaleNutrients(predictions.fat, portion).toFixed(2)} g</div>
                
              </div>)
            : (<li>No predictions available. Please choose another image</li>)
          }  

          {/* display uploaded image */}
          {image && <img src={URL.createObjectURL(image)} width="224"/>}
        </div>

        <div className='modal-menu'>
          <button onClick={handleAcceptIntake}>Accept Intake</button>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default RecognitionResult
