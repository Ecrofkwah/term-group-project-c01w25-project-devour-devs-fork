import express from 'express';
import intakeController from '../controllers/intakeController.js';
import {authenticateUser} from '../middlewares/authMiddleware.js';

const router = express.Router()

router.post('/save', authenticateUser, intakeController.saveIntake);
router.get('/get', authenticateUser, intakeController.getIntakes);
router.delete('/delete', authenticateUser, intakeController.deleteIntake);
router.get('/totalbydate', authenticateUser, intakeController.totalIntakesByDate);
router.get('/lastndays', authenticateUser, intakeController.lastNDaysIntake);
export { router as intakeRouter }