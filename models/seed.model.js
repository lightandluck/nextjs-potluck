const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const seedSchema = new Schema({
  prefix: String,
  counter: Number,
});

const Seed = mongoose.model.Seed || mongoose.model('Seed', seedSchema);

export default Seed;
