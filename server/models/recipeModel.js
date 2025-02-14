import mongoose from 'mongoose';


const RecipeSchema = new mongoose.Schema({
    authorId: {type: String, required: true},  //this is the user id of the user who created the recipe, Needs to be string else mongo
                                             // gives issue
    name: {type: String, required: true},
    ingredients: {type: Array, required: true},
    instructions: {type: Array, required: true},
    category: {type: Array, required: true},
});


RecipeSchema.statics.getAllRecipes = async function () {
    return await this.find({}) //returns all reciepes, however with large datasets, this can cause
                        // memory issues. TODO: use mongoose streaming to process documents one at a time
}

RecipeSchema.statics.getUserRecipes = async function (authorId) {
    return await this.find({authorId: authorId})
}

RecipeSchema.statics.getRecipe = async function (recipeId) {
    return await this.findOne({_id: recipeId})
}

RecipeSchema.statics.updateRecipe = async function (recipeId, update) {
    return await this.findByIdAndUpdate(
        recipeId,
        { $set: update },
        { new: true } // returns the updated document
    );
}

RecipeSchema.statics.deleteRecipe = async function (recipeId) {
    return await this.deleteOne({_id: recipeId})
}

const Recipe = mongoose.model('Recipe', RecipeSchema, 'recipes');

export default Recipe;
