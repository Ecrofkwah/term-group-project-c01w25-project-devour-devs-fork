import mongoose from 'mongoose';

const MealRatingSchema = new mongoose.Schema({
    mealId: {type: Number, required: true, unique: true},
    userRatings: {type: Object, required: true},
})

const MealRating = mongoose.model('MealRating', MealRatingSchema, 'mealRatings')
export default MealRating;