import * as tf from '@tensorflow/tfjs-node';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

let model;

const loadModel = async () => {
    try {
        model = await tf.loadGraphModel('https://github.com/Cheng-K/FoodNet-Model/releases/latest/download/model.json');
        console.log("Model loaded successfully");
    } catch (error) {
        console.error("Error loading model: ", error)
    }
}

const loadMappings = () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const categories = Object.keys(JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/encoded_food_categories.json'), 'utf-8')));
    const ingredients = Object.keys(JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/encoded_ingredients.json'), 'utf-8')));
    return {categories, ingredients}
}

loadModel();
const {categories, ingredients} = loadMappings();
console.log(categories);
console.log(ingredients);

const imageRecognizer = async (req, res) => {
    try{
        if(!model){
            return res.status(500).send("Model is still loaded. Please try again")
        }

        const imagePath = req.file.path;
        const imageBuffer = fs.readFileSync(imagePath);
        
        // decode and process image
        const tensor = tf.node.decodeImage(imageBuffer)
          .resizeNearestNeighbor([224, 224])
          .toFloat()
          .expandDims(0)

        // make predictions
        const predictions = await model.predict(tensor);
        const predictionArrays = await Promise.all(predictions.map(tensor => tensor.array().then(array => array.flat())));
        const [fatArray, proteinArray, categoryArray, calorieArray, ingredientArray, carbsArray] = predictionArrays;

        // decode predictions
        const categoryPrediction = decodeCategoryPrediction(categoryArray);
        const ingredientsPrediction = decodeIngredientsPrediction(ingredientArray);
        const fatPrediction = decodeNutrientsPrediction(fatArray);
        const proteinPrediction = decodeNutrientsPrediction(proteinArray);
        const carbsPrediction = decodeNutrientsPrediction(carbsArray);
        const caloriePrediction = decodeNutrientsPrediction(calorieArray);
    

        // delete image after processing
        await deleteImage(imagePath);
        
        // send prediction
        console.log(ingredientsPrediction)
        return res.status(201).json({
            category: categoryPrediction,
            ingredients: ingredientsPrediction,
            calories: caloriePrediction,
            fat: fatPrediction,
            protein: proteinPrediction,
            carbs: carbsPrediction,
            calorie: caloriePrediction
        })
    } catch(error) {
        console.error("Error image recognition", error)
        res.status(500).send("Error processing image");
    }
}

const decodeCategoryPrediction = (categoryArray) => {
    const index = categoryArray.indexOf(Math.max(...categoryArray));
    return categories[index];
}

const decodeIngredientsPrediction = (ingredientArray) => {
    const result = []
    const top = ingredientArray.map((value, index) =>(
        {value, index}
    )).sort((a, b) => b.value - a.value).slice(0,10);

    for(let i = 0; i < top.length; i++){
        if(top[i].value >= 0.6){
            console.log('index:', top[i].index)
            result.push(ingredients[top[i].index]);
        } else {
            break;
        }
    }

    return result;
}

const decodeNutrientsPrediction = (nutrientArray) => {
    const value = nutrientArray[0];
    return Math.abs(value);
}

const deleteImage = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) =>{
            if(err){
                console.error("error deleting image:", err);
                reject(err) // if error deleting file
            } else {
                resolve();
            }
        })
    })
}

const imageController = {
    imageRecognizer,
}

export default imageController;