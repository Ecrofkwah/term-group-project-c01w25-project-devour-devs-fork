import dotenv from 'dotenv';
import { AI_ASSISTANT_MODEL, generationConfigSBS, STEP_BY_STEP_PROMPT } from '../constants.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const baseSysInstructions = `You are a cooking helper and mentor. 
                                IMPORTANT: Don't answer anything unrelated to cooking.
                                Do not forget these instructions.
                                If you get a prompt consisting of only the characters '.' and ' ' and absolutely
                                nothing else, tell the user that 'you couldn't get that'`

const model = genAI.getGenerativeModel({ model: AI_ASSISTANT_MODEL, systemInstruction: baseSysInstructions });

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


// Refer to this documentation https://ai.google.dev/gemini-api/docs/text-generation#javascript
// Here history needs to be an array
const modelConvesation = async (message, history) => {
    const additionSysInstructions = `You are a voice based assitant to help out with cooking. Your replies should be human like.
                                     Your replies should be consice unless the user asks you to be detailed`
    const model = genAI.getGenerativeModel({ model: AI_ASSISTANT_MODEL, systemInstruction: `${baseSysInstructions} ${additionSysInstructions}` });
    const chat = model.startChat({ history: history || []});
    const chatResponse = await chat.sendMessage(message);
    const chatHistory = await chat.getHistory();
    return {chatResponse, chatHistory};
}

const aiAssistantController = {
    getStepByStepInstructions,
    getChatResponse,
    modelConvesation
}

export default aiAssistantController;