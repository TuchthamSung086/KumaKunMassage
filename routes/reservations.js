const express = require('express');

const { makeReservation, getReservations, getReservation } = require('../controllers/reservations');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router.route('/').get(protect, getReservations).post(protect, authorize('admin', 'user'), makeReservation);

router.route('/:id')
    .get(protect, getReservation);

module.exports = router;