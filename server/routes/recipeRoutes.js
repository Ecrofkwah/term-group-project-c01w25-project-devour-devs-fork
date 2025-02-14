import express from 'express';
import recipeController from '../controllers/recipeController.js';
import {authenticateUser} from '../middlewares/authMiddleware.js';

const recipeRouter = express.Router()

recipeRouter.post("/recipes", authenticateUser, recipeController.createRecipe);
recipeRouter.get("/recipes", recipeController.getAllRecipes);
recipeRouter.get("/recipes/:id", recipeController.getRecipe);
recipeRouter.put("/recipes/:id", authenticateUser, recipeController.editRecipe);
recipeRouter.delete("/recipes/:id", authenticateUser, recipeController.deleteRecipe);
// Route needs to be "user/recipes/", doing "recipes/user/" will not work. Route will think "user" is a recipe id
recipeRouter.get("/user/recipes/", authenticateUser, recipeController.getUserRecipes);



export { recipeRouter }