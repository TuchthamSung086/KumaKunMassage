const express = require('express');

const { getRow, getCSV } = require('../controllers/calendar');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(protect, getCSV);

router.route('/:id')
    .get(protect, getRow);

module.exports = router;