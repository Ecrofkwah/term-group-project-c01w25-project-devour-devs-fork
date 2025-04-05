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
    let textResponse;

    try {
        textResponse = await axios.post(`${transcriptionServiceUrl}/audio`, form, {
            headers: form.getHeaders()
        });
        //console.log(`text response: ${textResponse}`);
        if (!textResponse.data["transcription"]) {
            textResponse.data["transcription"] = ". . .";
        }
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }

    const { chatResponse, chatHistory } = await aiAssistantController.modelConvesation(textResponse.data["transcription"], history);
    const response = { "text": chatResponse.response.text() };
    let audioResponse;  
    try {
        audioResponse = await axios.post(`${transcriptionServiceUrl}/text`, response, { responseType: 'arraybuffer' });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }



    const encodedAudio = (Buffer.from(audioResponse.data)).toString("base64")
    res.json({
        history: chatHistory,
        audio: encodedAudio
    })
};

// add logic to call the AI assistant controller

const voiceController = {
    trancribe
}

export default voiceController;