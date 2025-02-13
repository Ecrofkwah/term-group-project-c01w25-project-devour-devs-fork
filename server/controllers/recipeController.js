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
    // const result = await Recipe.find()
    const result = await Recipe.getAllRecipes() //needs await to get data, dont know why -> explore
    return res.status(201).json({ Response: result})
}

// Get details of a single recipes
const getSigRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);

        if (!recipe) {
            return res.status(404).json({ success: false, message: "Recipe not found" });
        }

        return res.status(200).json({ success: true, recipe });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// Edit a recipe
const editRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, ingredients, instructions, category } = req.body;

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            { name, ingredients, instructions, category },
            { new: true, runValidators: true }
        );

        if (!updatedRecipe) {
            return res.status(404).json({ success: false, message: "Recipe not found" });
        }

        return res.status(200).json({ success: true, message: "Recipe updated successfully", updatedRecipe });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRecipe = await Recipe.findByIdAndDelete(id);

        if (!deletedRecipe) {
            return res.status(404).json({ success: false, message: "Recipe not found" });
        }

        return res.status(200).json({ success: true, message: "Recipe deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// Get all recipes of a specific user 
const getUserRecipe = async (req, res) => {
    try {
        const { userId } = req.user;

        const userRecipes = await Recipe.find({ userId });

        return res.status(200).json({ success: true, recipes: userRecipes });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const rerecipeController = {
    createRecipe,
    getAllRecipes,
    getSigRecipe,
    editRecipe,
    deleteRecipe,
    getUserRecipe
}

export default rerecipeController;



