const express = require('express');

const { makeReservation, getReservations, getReservation, updateReservation, deleteReservation } = require('../controllers/reservations');

const router = express.Router({ mergeParams: true });

const { protect, verified, authorize } = require('../middleware/auth');

router.route('/').get(protect, verified(), getReservations).post(protect, verified(), authorize('admin', 'user'), makeReservation);

router.route('/:id')
    .get(protect, verified(), getReservation).put(protect, verified(), authorize('admin', 'user'), updateReservation).delete(protect, verified(), authorize('admin', 'user'), deleteReservation);

module.exports = router;