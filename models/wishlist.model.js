const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const offeringInListSchema = new Schema({
  offeringId: {
    type: Schema.Types.ObjectId,
    ref: 'Offering',
    required: true,
  },
  isSteward: {
    type: Boolean,
    default: false,
  },
});

// TODO: Change schema 'offerings' -> 'wishlist' so it's less confusing with regular offerings
const wishlistSchema = new Schema(
  {
    playerId: {
      type: Schema.Types.ObjectId,
      ref: 'Player',
      required: true,
      unique: true,
    },
    offerings: [offeringInListSchema],
  },
  { timestamps: true }
);

const Wishlist =
  mongoose.model.Wishlist || mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
