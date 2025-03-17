import dotenv from 'dotenv';
import { AI_ASSISTANT_MODEL, STEP_BY_STEP_PROMPT } from '../constants.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: AI_ASSISTANT_MODEL });

const getStepByStepInstructions = async (req, res) => {
    const { instructions } = req.body;

    if(!instructions){
        return res.status(400).json({message: "Missing instructions"})
    }

    try{
        const result = await model.generateContent(STEP_BY_STEP_PROMPT + instructions);
        res.status(201).json({summary: result.response.text().substring(8, result.response.text().length - 3)});
        //The start of the Gemini response is always ```HTML\n, so we remove it and the last three characters which are ```
    } catch (error){
        res.status(500).json({message: "Internal Server Error"});
    }
}

const aiAssistantController = {
    getStepByStepInstructions
}

export default aiAssistantController;