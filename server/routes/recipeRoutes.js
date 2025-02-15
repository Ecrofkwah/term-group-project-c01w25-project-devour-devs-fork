import express from 'express';
import recipeController from '../controllers/recipeController.js';
import {authenticateUser} from '../middlewares/authMiddleware.js';

const recipeRouter = express.Router()

recipeRouter.post("/", authenticateUser, recipeController.createRecipe);
recipeRouter.get("/", recipeController.getAllRecipes);
recipeRouter.get("/recipe/:id", recipeController.getRecipe);
recipeRouter.put("/recipe/:id", authenticateUser, recipeController.editRecipe);
recipeRouter.delete("/recipe/:id", authenticateUser, recipeController.deleteRecipe);
// changed to 'recipes/recipe/:id' and '/recipes/user' so that 'user' won't be recognized as ':id'
recipeRouter.get("/user", authenticateUser, recipeController.getUserRecipes);



export { recipeRouter }