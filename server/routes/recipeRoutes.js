import express from 'express';
import recipeController from '../controllers/recipeController.js';
import {authenticateUser} from '../middlewares/authMiddleware.js';

const recipeRouter = express.Router()

recipeRouter.post("/", authenticateUser, recipeController.createRecipe);
recipeRouter.get("/", recipeController.getAllRecipes);
recipeRouter.get("/:id", recipeController.getRecipe);
recipeRouter.put("/:id", authenticateUser, recipeController.editRecipe);
recipeRouter.delete("/:id", authenticateUser, recipeController.deleteRecipe);
// Route needs to be "user/recipes/", doing "recipes/user/" will not work. Route will think "user" is a recipe id
recipeRouter.get("/user/recipes/", authenticateUser, recipeController.getUserRecipes);



export { recipeRouter }