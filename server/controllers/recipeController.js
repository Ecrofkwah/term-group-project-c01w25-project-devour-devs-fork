import jwt from 'jsonwebtoken'
import Recipe from '../models/recipeModel.js'
import authController from '../controllers/authController.js'

// Create a new recipe
const createRecipe = async (req, res) => {
    try {
        const {name, description, ingredients, instructions, category} = req.body;
        if (!name || !ingredients || !instructions || !category) {
            return res.status(400).json("Not all fields filled");
        }

        const newRecipe = new Recipe({
            name: name, 
            description: description,
            ingredients: ingredients,
            instructions: instructions,
            category: category, 
            authorId: req.user.userId
        })

        await newRecipe.save() 
        
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
    const result = await Recipe.getAllRecipes()
    return res.status(201).json({ Response: result})
}

// Get details of a single recipes
// Recipe ID should be a URL parameter, if user wants to share recipe we can reference exact recipe
const getRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;
    
        const result = await Recipe.getRecipe(recipeId)
    
        if (!result) {
            return res
                .status(404)
                .json({ success: false, message: "Recipe not found" })
        }
    
        return res.status(201).json({result})

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

// Edit a recipe
const editRecipe = async (req, res) => {
    try {
        // Get request body
        const recipeId = req.params.id;
        // Check which fields are present (present fields are being updated)
        const updateFields = {};
        if (req.body.name) updateFields.name = req.body.name;
        if (req.body.ingredients) updateFields.ingredients = req.body.ingredients;
        if (req.body.instructions) updateFields.instructions = req.body.instructions;
        if (req.body.category) updateFields.category = req.body.category;

        const result = await Recipe.updateRecipe(recipeId, updateFields)

        if (!result) {
            return res.status(404).json({ success: false, message: "Recipe not found" });
        }

        return res.status(200).json({ success: true, message: result });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

// Delete a recipe
const deleteRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const result = await Recipe.deleteRecipe(recipeId)
        
        if (!result) {
            return res
                .status(404)
                .json({ success: false, message: "Recipe not found" })
        }
    
        return res.status(204).json({success: true})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

// Get all recipes of a specific user 
const getUserRecipes = async (req, res) => {
    try {
        const userId = req.user.userId 
        console.log(userId)
        const result = await Recipe.getUserRecipes(userId)
        return res.status(200).json({ results: result})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

const rerecipeController = {
    createRecipe,
    getAllRecipes,
    getUserRecipes,
    getRecipe,
    editRecipe,
    deleteRecipe
}

export default rerecipeController;



