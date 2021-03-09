const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const seedSchema = new Schema({
  prefix: String,
  counter: Number,
});

let Seed = mongoose.models.Seed || mongoose.model('Seed', seedSchema);

export default Seed;
