import express from 'express';
import mealController from '../controllers/mealController.js';

const router = express.Router()

router.get('/all', mealController.getMeals);
router.get('/details', mealController.getMealDetails);

export { router as mealRouter }