import mongoose from 'mongoose';

const FavouriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mealId: { type: Number, ref: 'Meal', required: true }
});

const Favourite = mongoose.model('Favourite', FavouriteSchema, 'favourites');

export default Favourite;