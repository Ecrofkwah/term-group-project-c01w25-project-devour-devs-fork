import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const SP_API_KEY = process.env.SPOONACULAR_API_KEY;

const getMeals = async (req, res) => {
    try{
        const response = await axios.get(`https://api.spoonacular.com/recipes/random`, {
            params: {number: 20, apiKey: SP_API_KEY}
        })

        if(response.data.recipes){
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

    try{
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
            params: {apiKey: SP_API_KEY}
        })
        if(response.data) {
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