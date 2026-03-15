const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  homeClub: { type: String, default: '' },
  handicap: { type: Number, default: null },
  profilePicture: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
