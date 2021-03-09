const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const offeringSchema = new Schema({
  playerName: { type: String, required: true },
  playerId: { type: Schema.Types.ObjectId, ref: 'Player', required: true},
  officialName: { type: String, required: true },
  title: { type: String, required: true }, 
  description: { type: String, required: true }
}, {
  timestamps: true,
})

const Offering = mongoose.models.Offering || mongoose.model('Offering', offeringSchema);

export default Offering;