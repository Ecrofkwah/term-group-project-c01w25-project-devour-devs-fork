import express from 'express';
import upload from '../middlewares/multerMiddleware.js';
import voiceController from '../controllers/voiceController.js';

const router = express.Router()
// Using Multer as middleware to add audio file into memory, see multerMiddleware.js for more details
router.post('/transcribe', upload.single('audio'), voiceController.trancribe);

export { router as voiceRouter }