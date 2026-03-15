const mongoose = require('mongoose');

const roundSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  date: { type: Date, required: true },
  grossScore: { type: Number, required: true },
  putts: { type: Number, default: null },
  fairwaysInRegulation: { type: Number, default: null },
  greensInRegulation: { type: Number, default: null },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Round', roundSchema);
