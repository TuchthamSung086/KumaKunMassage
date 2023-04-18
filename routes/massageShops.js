const express = require('express');
const { route } = require('express/lib/application')

// Controllers
const { createMassageShop, getMassageShops, getMassageShop, updateMassageShop } = require("../controllers/massageShops.js");
// Auth
const { protect, authorize } = require("../middleware/auth");
// Router
const router = express.Router();

router.route('/').get(getMassageShops).post(protect, authorize('admin'), createMassageShop);
router.route('/:id').get(getMassageShop).put(protect, authorize('admin'), updateMassageShop);

module.exports = router;
