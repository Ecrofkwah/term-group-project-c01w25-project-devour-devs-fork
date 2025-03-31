import * as tf from '@tensorflow/tfjs-node';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const ROBOFLOW_API_KEY = process.env.ROBOFLOW_API_KEY;

let model;

const loadModel = async () => {
    // Skip loading the model when running tests
    if (process.env.NODE_ENV === 'test') {
        console.log("Skipping model load in test mode");
        return;
    }
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

// Only load the model if not in test mode
if (process.env.NODE_ENV !== 'test') {
    loadModel();
}
const {categories, ingredients} = loadMappings();

const imageRecognizer = async (req, res) => {
    const imagePath = req.file.path;
    try{
        if(!model){
            return res.status(500).send("Model is still loaded. Please try again")
        }

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
        
        // send prediction
        console.log(ingredientsPrediction)
        res.status(201).json({
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
    } finally {
        // delete image after processing
        await deleteImage(imagePath);
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

const ingredientsDetector = async (req, res) => {
    const imagePath = req.file.path;
    try{
    const image = fs.readFileSync(imagePath, {encoding: 'base64'});
    const response = await axios({
        method: 'POST',
        url: `https://detect.roboflow.com/food-bxkvw/3`,
        params: {
            api_key: ROBOFLOW_API_KEY,
        },
        data: image,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    const detections = response.data.predictions;
    res.json({success: true, detections})
  } catch(error){
    console.error(error)
    res.status(500).json({success: false, error: "ingredients detection failed"})
  } finally {
    // delete image after processing
    await deleteImage(imagePath);
  }
}

const imageController = {
    imageRecognizer,
    ingredientsDetector,
}

export default imageController;
