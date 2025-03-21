import express from 'express';
import authController from '../controllers/authController.js';
import {authenticateUser} from '../middlewares/authMiddleware.js';
import { validateRegisterInput, validateLoginInput, validate } from '../middlewares/authMiddleware.js';

const router = express.Router()

router.post("/register", validateRegisterInput, validate, authController.register);
router.post("/login", validateLoginInput, validate, authController.login);
router.get("/me", authenticateUser, authController.me);

export { router as userRouter }