import axios from 'axios'
import dotenv from 'dotenv'
import Meal from '../models/mealModel.js'
import Favourite from '../models/favouriteModel.js';
import MealRating from '../models/ratingModel.js';

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
    const { userId, mealId } = req.body;
    if (!userId || !mealId) {
        return res.status(400).json({ message: "Missing user or meal ID" });
    }

    try {
        // Check if the meal is already in the user's favourites
        const existingFavourite = await Favourite.findOne({ userId, mealId });
        if (existingFavourite) {
            return res.status(400).json({ message: "Meal already favourited" });
        }
        
        const favourite = new Favourite({ userId, mealId });
        await favourite.save();
        res.status(201).json({ message: "Meal added to favourites" });
    } catch (error) {
        console.error("Error adding favourite:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getFavouritedMeals = async (req, res) => {
    // extract userId and mealId from request query
    const {userId} = req.query;

    if(!userId){
        return res.status(400).json({message: "Missing user ID"});
    }
    
    try {
        // Retrieve favourite records for the given user
        const favourites = await Favourite.find({ userId });
        const mealIds = favourites.map(fav => fav.mealId);
        
        // Find the meals in the Meal collection by matching ids
        const meals = await Meal.find({ id: { $in: mealIds } });
        res.status(200).json({ meals: meals.map(meal => meal.data) });
    } catch (error) {
        console.error("Error getting favourited meals:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const removeMealFromFavourites = async (req, res) => {
    const { userId, mealId } = req.body;
    if (!userId || !mealId) {
        return res.status(400).json({ message: "Missing user or meal ID" });
    }
    try {
        const deletedFav = await Favourite.findOneAndDelete({ userId, mealId });
        if (deletedFav) {
            res.status(200).json({ message: "Favourite removed successfully" });
        } else {
            res.status(404).json({ message: "Favourite not found" });
        }
    } catch (error) {
        console.error("Error deleting favourite:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const rateMeal = async (req, res) => {
    const {userId, mealId, point} = req.body;
    if (!userId || !mealId || !point){
        return res.status(400).json({message: "Missing user or meal ID or rating point"})
    }

    try{
        //Check if rating object with meal Id exists:
        const updatedRating = await MealRating.findOneAndUpdate(
            { mealId: `${mealId}`},
            { $set: { [`userRatings.${userId}`]: point } },
            { upsert: true }
        );

        res.status(200).json({ message: "Rating updated successfully" });
    }
    catch (error){
        console.error("Error updating rating:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getMealRate = async (req, res) => {
    const {mealId} = req.query;
    if (!mealId){
        return res.status(400).json({message: "Missing meal ID"})
    }

    // TODO: return the rating of 'mealID'
    try{
      const mealRating = await MealRating.findOne({ mealId: mealId});
      if (!mealRating || !mealRating.userRatings){
        return res.status(200).json({avgRating: 0, numRatings: 0});
      }
      let sumRating = 0;
      let sumCount = 0;
      for (let rating of Object.values(mealRating.userRatings)){
        sumRating += Number(rating);
        sumCount++;
      }
      if (sumCount === 0){
        return res.status(200).json({avgRating: 0, numRatings: 0});
      }
      const avgRating = Math.round(sumRating/sumCount);
      return res.status(200).json({avgRating: avgRating, numRatings: sumCount});  
    } catch(error){
      console.error("Error getting meal rate", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
}

const getUserRating = async (req, res) => {
    const {mealId, userId} = req.query;
    if (!mealId){
        return res.status(400).json({message: "Missing meal ID"})
    }

    try{
        const mealRating = await MealRating.findOne({ mealId: mealId});
        if (!mealRating || !mealRating.userRatings){
            return res.status(200).json({rating: 0});
        }
        return res.status(200).json({rating: mealRating.userRatings[userId]});  
    } catch(error){
        console.error("Error getting meal rate", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    
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
        res.status(500).json({message: "Internal Server Error"})
    }
}

const recommendMealsByIngredients = async (req, res) =>{
    try{
        const {ingredients} = req.body; // user input 
        if(!ingredients || ingredients.length === 0){
            return res.status(400).json({message: "Require at least 1 ingredient"});
        }

        // normalize the ingredients
        const normalizedIngredients = ingredients.map(ingredient => ingredient.toLowerCase())

        // find matched meals
        const meals = await Meal.find({
            "data.extendedIngredients.name": {$in: normalizedIngredients.map(ing => new RegExp(ing, "i"))}
        })

        // rank meals by number of matches
        const rankedMeals = meals.map(meal => {
            const ingredientsList = Array.from(new Set(meal.data.extendedIngredients.map(ing => ing.name.toLowerCase())));
            const matchedIngredients = normalizedIngredients.filter(userIng => ingredientsList.some(ing => ing.includes(userIng) || userIng.includes(ing)));
            const missedIngredients = normalizedIngredients.filter(userIng => !ingredientsList.some(ing => ing.includes(userIng) || userIng.includes(ing)));
            return {
                matchCount: matchedIngredients.length,
                matchedIngredients,
                missedIngredients,
                data: meal.data
            }
        })

        // sort meals by highest count and return top 10
        rankedMeals.sort((a, b) => b.matchCount - a.matchCount);
        const topMeals = rankedMeals.slice(0,10);
        return res.status(201).json({topMeals})
    } catch (error) {
        return res.status(500).json({message: "Server error"})
    }
}

const mealController = {
    getMeals,
    getMealDetails,
    addMealToFavourites,
    getFavouritedMeals,
    removeMealFromFavourites,
    rateMeal,
    getMealRate,
    getUserRating,
    searchMeal,
    recommendMealsByIngredients,
}

export default mealController;
