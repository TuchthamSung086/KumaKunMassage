const express = require('express');

const { makeReservation, getReservations, getReservation, updateReservation } = require('../controllers/reservations');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router.route('/').get(protect, getReservations).post(protect, authorize('admin', 'user'), makeReservation);

router.route('/:id')
    .get(protect, getReservation).put(protect, authorize('admin', 'user'), updateReservation);

module.exports = router;