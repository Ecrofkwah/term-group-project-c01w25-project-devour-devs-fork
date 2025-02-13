import express from 'express';
import recipeController from '../controllers/recipeController.js';
import {authenticateUser} from '../middlewares/authMiddleware.js';

const recipeRouter = express.Router()

recipeRouter.post("/recipes", authenticateUser, recipeController.createRecipe);
recipeRouter.get("/recipes", recipeController.getAllRecipes);
// recipeRouter.get("/recipes/:id", recipeController);
// recipeRouter.put("/recipes/:id", authenticateUser, recipeController);
// recipeRouter.delete("/recipes/:id", authenticateUser, recipeController);
// recipeRouter.get("/recipes/user/:userId", authenticateUser, recipeController);



export { recipeRouter }