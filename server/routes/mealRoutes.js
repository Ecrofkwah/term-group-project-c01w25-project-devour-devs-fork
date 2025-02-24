import express from 'express';
import mealController from '../controllers/mealController.js';

const router = express.Router()

router.get('/all', mealController.getMeals);
router.get('/details', mealController.getMealDetails);
router.post('/favourites', mealController.addMealToFavourites);
router.get('/favourites', mealController.getFavouritedMeals);
router.post('/rating', mealController.rateMeal);
router.get('/rating', mealController.getMealRate);

export { router as mealRouter }