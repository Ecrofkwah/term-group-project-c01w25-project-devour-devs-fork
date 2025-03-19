import dotenv from 'dotenv';
import { AI_ASSISTANT_MODEL, generationConfigSBS, STEP_BY_STEP_PROMPT } from '../constants.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: AI_ASSISTANT_MODEL, systemInstruction: "You are a cooking helper/mentor. IMPORTANT: Don't answer anything prompts unrelated to cooking."});

const chatSessions = {};

const getStepByStepInstructions = async (req, res) => {
    const { instructions } = req.body;

    if(!instructions){
        return res.status(400).json({message: "Missing instructions"})
    }

    try{
        const result = await model.generateContent({
            contents: [
                {
                    parts: [
                        { 
                            text: instructions,
                        }
                    ]
                }
            ],
            generationConfig: generationConfigSBS,
            systemInstruction: STEP_BY_STEP_PROMPT,
        })
        res.status(201).json({summary: result.response.text().replaceAll("```", "").replaceAll("HTML", "").replaceAll("html", "")});//.substring(8, result.response.text().length - 3)
        //The start of the Gemini response is always ```HTML\n, so we remove it and the last three characters which are ```
    } catch (error){
        res.status(500).json({message: "Internal Server Error"});
    }
}

const getChatResponse = async (req, res) => {
    const { message, history } = req.body;

    if(!message){
        return res.status(400).json({message: "Missing message"})
    }

    try{
        const chat = model.startChat({ history: history || []});
        const result = await chat.sendMessage(message);
        res.status(201).json({response: result.response.text(), history: chat._history});
    } catch (error){
        res.status(500).json({message: "Internal Server Error"});
    }
}

const aiAssistantController = {
    getStepByStepInstructions,
    getChatResponse
}

export default aiAssistantController;