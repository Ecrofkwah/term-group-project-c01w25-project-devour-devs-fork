import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const MealSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    data: {type: Object, required: true},
    createdAt: {type: Date, default: Date.now, expires: 3600} //delete after 1 hour
})

const Meal = mongoose.model('Meal', MealSchema, 'meals')
export default Meal;
