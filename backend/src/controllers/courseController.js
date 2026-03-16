const Course = require('../models/Course');

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ name: 1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Add course
exports.addCourse = async (req, res) => {
  try {
    const { name, location, holes, par } = req.body;
    const course = await Course.create({ name, location, holes, par });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
