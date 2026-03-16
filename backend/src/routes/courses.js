const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getCourses, addCourse } = require('../controllers/courseController');

router.get('/', auth, getCourses);
router.post('/', auth, addCourse);

module.exports = router;
