const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, default: '' },
  holes: { type: Number, default: 18 },
  par: { type: Number, default: 72 }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
