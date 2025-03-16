import React, { useState } from 'react';
import config from '../../config/config.js';
import axios from 'axios';

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    setImage(file);
  }

  const handlePredictions = async () =>{
    if(!image){
        alert("Please upload an image.");
        return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try{
        const response = await axios.post(`${config.BASE_URL}/api/image/recognize`, formData, {
            headers: {"Content-Type": "multipart/form-data"},
        });

        setPredictions(response.data.predictions)
    } catch(error){
        console.error("Error recognizing ingredients", error)
    } 
  }
  return (
    <div>
      <h2>Upload an image for ingredient recognition</h2>
      <input type="file" onChange={handleImageUpload}/>
      <button onClick={handlePredictions}>Recognize</button>

      {/* display uploaded image */}
      {image && <img src={URL.createObjectURL(image)} width="224"/>}

      <h3>Predictions:</h3>
      <ul>
        {predictions.length > 0
            ? (predictions.map((prediction, index) => (
                <li key={index}>Ingredient {index + 1}: {prediction}</li>
            )))
            : (<li>No predictions yet</li>)
        }
      </ul>
    </div>
  )
}

export default ImageUploader
