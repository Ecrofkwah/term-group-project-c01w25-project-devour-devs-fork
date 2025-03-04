import mongoose from 'mongoose';

const PlannerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    // Not sure if I want to include this yet
    weekStartDate: { type: Date, required: true }, 

    meals: {
        Monday: { breakfast: { type: Number, ref: 'Meal', default: null }, lunch: { type: Number, ref: 'Meal', default: null }, dinner: { type: Number, ref: 'Meal', default: null } },
        Tuesday: { breakfast: { type: Number, ref: 'Meal', default: null }, lunch: { type: Number, ref: 'Meal', default: null }, dinner: { type: Number, ref: 'Meal', default: null } },
        Wednesday: { breakfast: { type: Number, ref: 'Meal', default: null }, lunch: { type: Number, ref: 'Meal', default: null }, dinner: { type: Number, ref: 'Meal', default: null } },
        Thursday: { breakfast: { type: Number, ref: 'Meal', default: null }, lunch: { type: Number, ref: 'Meal', default: null }, dinner: { type: Number, ref: 'Meal', default: null } },
        Friday: { breakfast: { type: Number, ref: 'Meal', default: null }, lunch: { type: Number, ref: 'Meal', default: null }, dinner: { type: Number, ref: 'Meal', default: null } },
        Saturday: { breakfast: { type: Number, ref: 'Meal', default: null }, lunch: { type: Number, ref: 'Meal', default: null }, dinner: { type: Number, ref: 'Meal', default: null } },
        Sunday: { breakfast: { type: Number, ref: 'Meal', default: null }, lunch: { type: Number, ref: 'Meal', default: null }, dinner: { type: Number, ref: 'Meal', default: null } }
    },

    createdAt: { type: Date, default: Date.now, expires: '7d' } // Auto-delete after a week
});


const Planner = mongoose.model("Planner", PlannerSchema, 'planners');

export default Planner;