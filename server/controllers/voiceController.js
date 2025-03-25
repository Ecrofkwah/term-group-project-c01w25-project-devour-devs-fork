import aiAssistantController from './aiAssistantController.js';
import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config()
// Post request to handle audio transcription using Multer middleware check out voiceRoutes.js 
const trancribe = async (req, res) => {
    // get chat histroy using req.body
    const fileBuffer = req.file.buffer; 
    const form = new FormData();
    form.append('audio', fileBuffer, req.file.originalname);

    const transcriptionServiceUrl = `${process.env.TRANSCRIPTION_URI}:${process.env.TRANSCRIPTION_PORT}`;

    const textResponse = await axios.post(`${transcriptionServiceUrl}/audio`, form, {
       headers: form.getHeaders()
    });

    const chatResponse = await aiAssistantController.modelConvesation(textResponse.data["transcription"], []);
    const response = {"text": chatResponse.response.text()};
    const audioResponse = await axios.post(`${transcriptionServiceUrl}/text`, response, { responseType: 'stream' });

    // Set headers so the client knows it's receiving audio
    res.set('Content-Type', 'audio/mpeg');
    res.set('Content-Disposition', 'inline; filename=speech.mp3'); // needed to play audio in browser
    

    audioResponse.data.pipe(res); // streams audio to client

};

// add logic to call the AI assistant controller

const voiceController = {
    trancribe
}

export default voiceController;