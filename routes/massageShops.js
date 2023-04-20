const express = require('express');
const { route } = require('express/lib/application')

// Include other resource routers
const reservationRouter = require('./reservations');

// Controllers
const { createMassageShop, getMassageShops, getMassageShop, updateMassageShop, deleteMassageShop } = require("../controllers/massageShops.js");
// Auth
const { protect, authorize } = require("../middleware/auth");
// Router
const router = express.Router();
// Re-route into other resource routers
router.use('/:massageShopId/reservations/', reservationRouter);


router.route('/').get(getMassageShops).post(protect, authorize('admin'), createMassageShop);
router.route('/:id').get(getMassageShop).put(protect, authorize('admin'), updateMassageShop).delete(protect, authorize('admin'), deleteMassageShop);

module.exports = router;
