const express = require('express');
const { route } = require('express/lib/application')

// Controllers
const { createMassageShop, getMassageShops, getMassageShop } = require("../controllers/massageShops.js");
// Auth
const { protect, authorize } = require("../middleware/auth");
// Router
const router = express.Router();

router.route('/').get(getMassageShops).post(protect, authorize('admin'), createMassageShop);
router.route('/:id').get(getMassageShop)

module.exports = router;
