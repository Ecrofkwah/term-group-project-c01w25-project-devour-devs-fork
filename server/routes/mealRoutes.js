import express from 'express';
import mealController from '../controllers/mealController.js';

const router = express.Router()

router.get('/search/firstletter', mealController.getMealByFirstLetter);
//router.get('/filter/area', mealController.filterMealByArea);
//router.get('/filter/category', mealController.filterMealByCategory);
// router.get('/search/name', mealController.searchMealByName);
router.get('/details', mealController.getMealDetails);

export { router as mealRouter }