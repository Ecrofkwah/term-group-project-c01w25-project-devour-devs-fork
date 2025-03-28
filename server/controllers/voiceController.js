import aiAssistantController from './aiAssistantController.js';
import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config()
// Post request to handle audio transcription using Multer middleware check out voiceRoutes.js 
const trancribe = async (req, res) => {
    const history = JSON.parse(req.body.history);
    const fileBuffer = req.file.buffer; 
    const form = new FormData();
    form.append('audio', fileBuffer, req.file.originalname);

    const transcriptionServiceUrl = `${process.env.TRANSCRIPTION_URI}:${process.env.TRANSCRIPTION_PORT}`;
    const textResponse = await axios.post(`${transcriptionServiceUrl}/audio`, form, {
       headers: form.getHeaders()
    });

    const { chatResponse, chatHistory } = await aiAssistantController.modelConvesation(textResponse.data["transcription"], history);
    const response = {"text": chatResponse.response.text()};
    const audioResponse = await axios.post(`${transcriptionServiceUrl}/text`, response, { responseType: 'arraybuffer' });



    const encodedAudio = (Buffer.from(audioResponse.data)).toString("base64")
    res.json({
        history : chatHistory,
        audio: encodedAudio
    })
};

// add logic to call the AI assistant controller

const voiceController = {
    trancribe
}

export default voiceController;