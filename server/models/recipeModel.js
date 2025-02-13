import mongoose from 'mongoose';


const RecipeSchema = new mongoose.Schema({
    userId: {type: String, required: true},  //this is the user id of the user who created the recipe, Needs to be string else mongo
                                             // gives issue
    name: {type: String, required: true},
    ingredients: {type: Array, required: true},
    instructions: {type: Array, required: true},
    category: {type: Array, required: true},
});


RecipeSchema.statics.getAllRecipes = async function () {
    return new Promise((resolve, reject) => {
        const recipes = [];
        const stream = this.find({}).cursor(); // Create a cursor to stream documents

        stream.on('data', (doc) => {
            recipes.push(doc); // Process each document
        });

        stream.on('end', () => {
            resolve(recipes); // Resolve with the collected recipes when the stream ends
        });

        stream.on('error', (err) => {
            reject(err); // Reject the promise if an error occurs
        });
    });
};

const Recipe = mongoose.model('Recipe', RecipeSchema, 'recipes');

export default Recipe;
