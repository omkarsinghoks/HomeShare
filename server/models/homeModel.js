const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true },
  availableFrom: { type: Date, required: true },
  availableTo: { type: Date, required: true },
  description: { type: String },
  requirements: { type: String },
  pricePerNight: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Home', homeSchema);