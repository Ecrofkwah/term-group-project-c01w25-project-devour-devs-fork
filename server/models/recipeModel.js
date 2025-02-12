import mongoose from 'mongoose';


const RecipeSchema = new mongoose.Schema({
    userId: {type: Number, required: true},  //this is the user id of the user who created the recipe
    name: {type: String, required: true},
    ingredients: {type: Array, required: true},
    instructions: {type: Array, required: true},
    category: String,
});


const Recipe = mongoose.model('Recipe', RecipeSchema, 'recipes');
export default Recipe;
