import express from "express";
import plannerController from '../controllers/plannerController.js'
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();



// Protect all planner routes with authentication
router.get("/", authenticateUser, plannerController.getMealPlan);
router.post("/create", authenticateUser, plannerController.createMealPlan);
router.get("/MPMeals", plannerController.getMealsMP);
router.put("/update/:plannerId", authenticateUser, plannerController.updateMealPlan);
router.delete("/delete/:plannerId", authenticateUser, plannerController.deleteMealPlan);

export { router as plannerRouter }
