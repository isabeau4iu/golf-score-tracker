const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getRounds, addRound, deleteRound } = require('../controllers/roundController');

router.get('/', auth, getRounds);
router.post('/', auth, addRound);
router.delete('/:id', auth, deleteRound);

module.exports = router;
