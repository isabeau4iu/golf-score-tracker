const Course = require('../models/Course');

// Retrieve all golf courses from the database
exports.getCourses = async (req, res) => {
  try {
    // sort({ name: 1 }) to ensure the course list is presented in A–Z order in the frontend dropdown menu
    const courses = await Course.find().sort({ name: 1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// add a new golf course to the database
exports.addCourse = async (req, res) => {
  try {
    const { name, location, holes, par } = req.body;

    // Create the new course with the provided details
    const course = await Course.create({ name, location, holes, par });

    // Return 201 Created with the newly created course document
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};