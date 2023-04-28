const express = require('express');
const { route } = require('express/lib/application')

// Include other resource routers
const reservationRouter = require('./reservations');

// Controllers
const { createMassageShop, getMassageShops, getMassageShop, updateMassageShop, deleteMassageShop } = require("../controllers/massageShops.js");
// Auth
const { protect, verified, authorize } = require("../middleware/auth");
// Router
const router = express.Router();
// Re-route into other resource routers
router.use('/:massageShopId/reservations/', reservationRouter);


router.route('/').get(getMassageShops).post(protect, verified(), authorize('admin'), createMassageShop);
router.route('/:id').get(getMassageShop).put(protect, verified(), authorize('admin'), updateMassageShop).delete(protect, verified(), authorize('admin'), deleteMassageShop);

module.exports = router;
