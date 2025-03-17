import express from 'express';
import multer from 'multer';
import {authenticateUser} from '../middlewares/authMiddleware.js';
import imageController from '../controllers/imageController.js'

const upload = multer({dest: 'uploads/'});
const router = express.Router()

router.post('/recognize', upload.single('image'), imageController.imageRecognizer);
router.post('/detect', upload.single('image'), imageController.ingredientsDetector);

export { router as imageRouter }