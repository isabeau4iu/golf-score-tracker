const Round = require('../models/Round');

// Get all rounds for user
exports.getRounds = async (req, res) => {
  try {
    const rounds = await Round.find({ user: req.userId })
      .populate('course', 'name location')
      .sort({ date: -1 });
    res.json(rounds);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Add round
exports.addRound = async (req, res) => {
  try {
    const { course, date, grossScore, putts, fairwaysInRegulation, greensInRegulation, notes } = req.body;
    const round = await Round.create({
      user: req.userId, course, date, grossScore, putts, fairwaysInRegulation, greensInRegulation, notes
    });
    const populated = await round.populate('course', 'name location');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete round
exports.deleteRound = async (req, res) => {
  try {
    await Round.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ message: 'Round deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
