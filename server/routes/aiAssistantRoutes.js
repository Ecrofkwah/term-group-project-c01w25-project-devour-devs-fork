import express from 'express';
import aiAssistantController from '../controllers/aiAssistantController.js';

const router = express.Router()

router.post('/step-by-step', aiAssistantController.getStepByStepInstructions);

export { router as aiAssistantRouter }