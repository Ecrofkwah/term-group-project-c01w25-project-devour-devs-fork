import axios from 'axios'
import dotenv from 'dotenv'
import Meal from '../models/mealModel.js'

dotenv.config()

const SP_API_KEY = process.env.SPOONACULAR_API_KEY;

const getMeals = async (req, res) => {
    const cachedMeals = await Meal.find();
    if(cachedMeals.length >= 50){
        return res.status(201).json({meals: cachedMeals.map((result) => result.data).slice(0,49)});
    }

    try{
        const response = await axios.get(`https://api.spoonacular.com/recipes/random`, {
            params: {number: 50, apiKey: SP_API_KEY}
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

    const cachedMeal = await Meal.findOne({id})
    if(cachedMeal){
        return res.status(201).json({meal: cachedMeal.data})
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

const mealController = {
    getMeals,
    getMealDetails
}

export default mealController;