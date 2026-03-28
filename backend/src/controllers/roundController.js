const Round = require('../models/Round');

// Retrieve all golf rounds belonging to the currently authenticated user
exports.getRounds = async (req, res) => {
  try {
    // Filter rounds by the authenticated user's ID to enforce access control
    // populate() replaces the course ObjectId with the actual course name and location
    // sort({ date: -1 }) returns the most recent rounds first
    const rounds = await Round.find({ user: req.userId })
      .populate('course', 'name location')
      .sort({ date: -1 });
    res.json(rounds);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Log a new golf round for the currently authenticated user
exports.addRound = async (req, res) => {
  try {
    const { course, date, grossScore, putts, fairwaysInRegulation, greensInRegulation, notes } = req.body;

    // Create and retain the round, associate it with the authenticated user
    const round = await Round.create({
      user: req.userId, course, date, grossScore, putts, fairwaysInRegulation, greensInRegulation, notes
    });

    // Populate the course details on the newly created round before returning it
    // so the frontend receives the course name immediately without a second request
    const populated = await round.populate('course', 'name location');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// delete a specific round belonging to the currently authenticated user
exports.deleteRound = async (req, res) => {
  try {
    // Match both the round ID and the user ID to prevent users from deleting each other's rounds
    await Round.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ message: 'Round deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};