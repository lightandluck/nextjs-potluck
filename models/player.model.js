const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

let Player = mongoose.models.Player || mongoose.model('Player', playerSchema);

export default Player;
