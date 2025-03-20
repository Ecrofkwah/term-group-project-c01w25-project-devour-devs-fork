import axios from 'axios'
import dotenv from 'dotenv'
import Meal from '../models/mealModel.js'

dotenv.config()

const SP_API_KEY = process.env.SPOONACULAR_API_KEY;

const getMeals = async (req, res) => {
    const existingMeals = await Meal.find();
    if(existingMeals.length >= 50){
        return res.status(201).json({meals: existingMeals.map((result) => result.data).slice(0,49)});
    }

    try{
        const response = await axios.get(`https://api.spoonacular.com/recipes/random`, {
            params: {number: 50, apiKey: SP_API_KEY, includeNutrition: true,}
        })

        if(response.data.recipes){
            await Meal.insertMany(response.data.recipes.map((recipe)=>({
                id: recipe.id,
                data: recipe
            })))

            res.status(201).json({meals: response.data.recipes})
        } else {
            res.status(201).json({message: "No meals to fetch"})
        }
    } catch (error){
        res.status(500).json({message: "Internal Server Error"})
    }
}

const getMealDetails = async(req, res) => {
    const { id } = req.query;

    if(!id){
        return res.status(400).json({message: "Missing meal ID"})
    }

    const existingMeal = await Meal.findOne({id})
    if(existingMeal){
        return res.status(201).json({meal: existingMeal.data})
    }

    try{
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
            params: {apiKey: SP_API_KEY}
        })
        if(response.data) {
            const newMeal = new Meal({
                id: response.data.id,
                data: response.data
            })

            await newMeal.save();

            res.status(201).json({meal: response.data})
        } else {
            res.status(201).json({message: `No meal details available for meal with id ${id}`})
        }
    } catch (error){
        res.status(500).json({message: "Internal Server Error"})
    }
}

const addMealToFavourites = async (req, res) => {
    // extract userId and mealId from request body
    const {userId, mealId} = req.body;
    if (!userId || !mealId){
        return res.status(400).json({message: "Missing user or meal ID"})
    }

    // TODO: add the meal with mealID to favourites list of user with userID
}

const getFavouritedMeals = async (req, res) => {
    // extract userId and mealId from request query
    const {userId} = req.query;

    if(!userId){
        return res.status(400).json({message: "Missing user ID"})
    }
    // TODO: return a list of meals favourited by user with userId.
}

const rateMeal = async (req, res) => {
    const {userId, mealId, point} = req.body;
    if (!userId || !mealId || !point){
        return res.status(400).json({message: "Missing user or meal ID or rating point"})
    }

    // TODO: update the rating of meal with 'mealID', using 'point' rated by user with 'userId'
}

const getMealRate = async (req, res) => {
    const {mealId} = req.query;
    if (!mealId){
        return res.status(400).json({message: "Missing meal ID"})
    }

    // TODO: return the rating of 'mealID'
}

const searchMeal = async (req, res) => {
    try{
        const { query } = req.query;
        if(!query) {
            return res.status(400).json({message: "Search query is missing"})
        }

        const meals = await Meal.find({
            $or: [
                {"data.title": {$regex: query, $options:"i"}},
                {"data.extendedIngredients.name": {$regex: query, $options:"i"}},
                {"data.cuisines": {$regex: query, $options:"i"}}
            ],
        })

        return res.status(201).json({meals: meals.map(meal => meal.data)})
    } catch(error){
        res.status(500).json({message: "Server error"})
    }
}

const mealController = {
    getMeals,
    getMealDetails,
    addMealToFavourites,
    getFavouritedMeals,
    rateMeal,
    getMealRate,
    searchMeal,
}

export default mealController;