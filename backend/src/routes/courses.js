const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getCourses, addCourse } = require('../controllers/courseController');

router.get('/', auth, getCourses);
router.post('/', auth, addCourse);

module.exports = router;

// Delete a course
router.delete('/:id', auth, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
