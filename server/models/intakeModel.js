import mongoose from 'mongoose';

const intakeSchema = new mongoose.Schema({
    category: {type: String, required: true},
    portion: {type: Number, required: true},
    calories: {type: Number, required: true},
    protein: {type: Number, required: true},
    carbs: {type: Number, required: true},
    fat: {type: Number, required: true},
    date: {type: Date, default: Date.now},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

const Intake = mongoose.model("Intake", intakeSchema);

export default Intake;