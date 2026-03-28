const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Retrieve the profile of the currently authenticated user
exports.getProfile = async (req, res) => {
  try {
    // Find the user by their ID (injected by the auth middleware)
    // Exclude the password field from the response for security
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update the profile of the currently authenticated user
exports.updateProfile = async (req, res) => {
  try {
    const { name, homeClub, handicap } = req.body;

    // Find the user by ID and apply the updated fields
    // { new: true } returns the updated document instead of the original
    // Password is again excluded from the response for security
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