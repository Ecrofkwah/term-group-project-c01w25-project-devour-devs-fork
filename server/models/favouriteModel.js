import mongoose from 'mongoose';

const favouriteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  mealId: { type: Number, required: true }
});

const Favourite = mongoose.model('Favourite', favouriteSchema);

export default Favourite;
