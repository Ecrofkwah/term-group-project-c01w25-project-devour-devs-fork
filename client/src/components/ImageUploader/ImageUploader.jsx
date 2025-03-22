import React, { useState } from 'react';
import config from '../../config/config.js';
import axios from 'axios';
import RecognitionResult from '../RecognitionResult/RecognitionResult.jsx';
import './ImageUploader.css'

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    setImage(file);
    setPredictions(null);
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

        setPredictions(response.data)
        setShowModal(true);

    } catch(error){
        console.error("Error recognizing ingredients", error)
    } 
  }

  const closeModal = () => {
    setShowModal(false); // close modal
  };

  return (
    <div className='image-uploader'>
      <h2>Upload an image of your meal, and get nutritional insights!</h2>
      <div className='input-upload-box'>
        <input type="file" onChange={handleImageUpload}/>
        <button className="analyze-btn" onClick={handlePredictions}>Analyze</button>
      </div>
      

      {/* display uploaded image */}
      {image && <img src={URL.createObjectURL(image)}/>}

      <RecognitionResult showModal={showModal} closeModal={closeModal} image={image} predictions={predictions}/>
    </div>
  )
}

export default ImageUploader
