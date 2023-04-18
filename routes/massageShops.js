const express = require('express');
const { route } = require('express/lib/application')
const { getHospitals, getHospital, createHospital, updateHospital, deleteHospital, getVacCenters } = require("../controllers/hospitals.js");

// Include other resource routers
const appointmentRouter = require('./appointments');

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

// Re-route into other resource routers
router.use('/:hospitalId/appointments/', appointmentRouter);

router.route('/vacCenters').get(getVacCenters);
router.route('/').get(getHospitals).post(protect, authorize('admin'), createHospital);
router.route('/:id').get(getHospital).put(protect, authorize('admin'), updateHospital).delete(protect, authorize('admin'), deleteHospital);

module.exports = router;
