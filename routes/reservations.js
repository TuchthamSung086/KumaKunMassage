const express = require('express');

const { makeReservation } = require('../controllers/reservations');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router.route('/').post(protect, authorize('admin', 'user'), makeReservation);

module.exports = router;