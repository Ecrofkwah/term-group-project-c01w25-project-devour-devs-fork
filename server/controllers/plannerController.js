import Planner from "../models/plannerModel.js";
import axios from 'axios'
import dotenv from 'dotenv'
import Meal from '../models/mealModel.js'


dotenv.config()

const SP_API_KEY = process.env.SPOONACULAR_API_KEY;

const getMealsMP = async (req, res) => {
    const existingMeals = await Meal.find();
    if (existingMeals.length >= 10) {
        return res.status(201).json({ meals: existingMeals.map((result) => result.data).slice(0, 9) });
    }

    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/random`, {
            params: { number: 10, apiKey: SP_API_KEY }
        })

        if (response.data.recipes) {
            await Meal.insertMany(response.data.recipes.map((recipe) => ({
                id: recipe.id,
                data: recipe
            })))

            res.status(201).json({ meals: response.data.recipes })
        } else {
            res.status(201).json({ message: "No meals to fetch" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}



// GET: Fetch meal plan for authenticated user
const getMealPlan = async (req, res) => {
    try {
        const { date } = req.query;
        const userId = req.user.userId;

        if (!userId) {
            return res.status(400).json({ message: "Missing userId" });
        }


        const planner = await Planner.findOne({ userId, date });

        if (!planner) {
            return res.status(404).json({ message: "Meal Plan not found" });
        }

        res.status(200).json({ planner });

    } catch (error) {
        console.error("Error fetching meal plan:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


// POST: Create a new meal plan for the authenticated user
const createMealPlan = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { date, breakfast, lunch, dinner } = req.body;

        if (!breakfast || !lunch || !dinner) {
            return res.status(400).json({ message: "All meals required" });
        }

        const newPlanner = new Planner({
            userId,
            date,
            meals: { breakfast, lunch, dinner },
        });

        await newPlanner.save();
        res.status(201).json({ message: "Meal planner successfully created", planner: newPlanner });

    } catch (error) {
        console.error("Error creating meal plan:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// PUT: Update an existing meal plan (only if the user is the owner)
// const updateMealPlan = async (req, res) => {
//     try {
//         const { plannerId } = req.params; // Extract plannerId from URL
//         const { breakfast, lunch, dinner } = req.body;
//         const userId = req.user.userId; // Ensure userId is correctly retrieved

//         //  Ensure user owns the meal plan before updating
//         const planner = await Planner.findById(plannerId);
//         if (!planner || planner.userId.toString() !== userId) {
//             return res.status(403).json({ message: "Unauthorized to update this meal plan" });
//         }

//         //  Update meal plan
//         const updatedPlanner = await Planner.findByIdAndUpdate(
//             plannerId,
//             { meals: { breakfast, lunch, dinner } },
//             { new: true } //  Return updated meal plan
//         );

//         if (!updatedPlanner) {
//             return res.status(404).json({ message: "Meal plan not found" });
//         }

//         res.status(200).json({ message: "Meal plan updated successfully", planner: updatedPlanner });

//     } catch (error) {
//         console.error("Error updating meal plan:", error);
//         res.status(500).json({ message: "Internal Server Error", error });
//     }
// };

// DELETE: Delete a meal plan (only if the user is the owner)
const deleteMealPlan = async (req, res) => {
    try {
        const { id } = req.params; //  Fix: Use `id` instead of `plannerId`
        const userId = req.user.userId; //  Ensure only the owner can delete

        //  Check if the meal plan exists
        const planner = await Planner.findById(id);
        if (!planner) {
            return res.status(404).json({ message: "Meal Plan not found" });
        }

        //  Ensure the user is the owner before deleting
        if (planner.userId.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized to delete this meal plan" });
        }

        //  Delete the meal plan
        await Planner.findByIdAndDelete(id);

        res.status(200).json({ message: "Meal Plan successfully deleted" });

    } catch (error) {
        console.error("Error deleting meal plan:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
// Export controller functions
const plannerController = {
    getMealPlan,
    createMealPlan,
    getMealsMP,
    deleteMealPlan
};

export default plannerController;
