const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, homeClub, handicap } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, homeClub, handicap },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
