import express from 'express';
import authController from '../controllers/authController.js';
import {authenticateUser} from '../middlewares/authMiddleware.js';

const router = express.Router()

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authenticateUser, authController.logout);
router.get("/me", authenticateUser, authController.me);

export { router as userRouter }