const express = require('express');

const { getAppointments, getAppointment, addAppointment, updateAppointment, deleteAppointment } = require('../controllers/appointments');

const router = express.Router({ mergeParams: true });

const { protect, verified, authorize } = require('../middleware/auth');

router.route('/')
    .get(protect, getAppointments)
    .post(protect, verified(), authorize('admin', 'user'), addAppointment);

router.route('/:id')
    .get(protect, getAppointment)
    .put(protect, verified(), authorize('admin', 'user'), updateAppointment)
    .delete(protect, verified(), authorize('admin', 'user'), deleteAppointment);

module.exports = router;