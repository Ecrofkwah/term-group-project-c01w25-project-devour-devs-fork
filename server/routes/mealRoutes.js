import express from 'express';
import mealController from '../controllers/mealController.js';

const router = express.Router()

router.get('/all', mealController.getMeals);
router.get('/details', mealController.getMealDetails);
router.post('/favourites', mealController.addMealToFavourites);
router.get('/favourites', mealController.getFavouritedMeals);
router.delete('/favourites', mealController.removeMealFromFavourites);
router.post('/rating', mealController.rateMeal);
router.get('/rating', mealController.getMealRate);
router.get('/search', mealController.searchMeal);
router.get('/rating/user', mealController.getUserRating);

export { router as mealRouter }