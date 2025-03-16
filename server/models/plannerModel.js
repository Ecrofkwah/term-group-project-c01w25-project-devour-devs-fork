import mongoose from 'mongoose';

const PlannerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 

    date: { type: Date, required: true }, 

    meals: {
        breakfast: { type: Number, ref: 'Meal', required: true}, lunch: { type: Number, ref: 'Meal', required: true}, dinner: { type: Number, ref: 'Meal', required: true}
    }
});


const Planner = mongoose.model("Planner", PlannerSchema, 'planners');

export default Planner;