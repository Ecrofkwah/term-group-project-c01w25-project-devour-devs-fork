import jwt from 'jsonwebtoken'
import Recipe from '../models/recipeModel.js'
import authController from '../controllers/authController.js'

// Create a new recipe
const createRecipe = async (req, res) => {

    try {
        const {name, ingredients, instructions, category} = req.body;
        if (!name || !ingredients || !instructions || !category) {
            return res.status(400).json("Not all fields filled");
        }

        const newRecipe = new Recipe({
            name: name, 
            ingredients: ingredients,
            instructions: instructions,
            category: category, 
            userId: req.user.userId
        })

        newRecipe.save() 
        
        return res.status(201).json({
            sucess: true,
            message: "Recipe Sucssfully Created!",
            recipeId: newRecipe._id
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }

}

// Get all public recipes
// no authentication required
const getAllRecipes = async (req, res) => {
    // const result = await Recipe.find()
    const result = await Recipe.getAllRecipes() //needs await to get data, dont know why -> explore
    return res.status(201).json({ Response: result})
}

// Get details of a single recipes
const getSigRecipe = async (req, res) => {

}

// Edit a recipe
const editRecipe = async (req, res) => {

}

// Delete a recipe
const deleteRecipe = async (req, res) => {

}

// Get all recipes of a specific user 
const getUserRecipe = async (req, res) => {

}

const rerecipeController = {
    createRecipe,
    getAllRecipes
}

export default rerecipeController;



