const express = require('express');
const { route } = require('express/lib/application')

// Controllers
const { createMassageShop, getMassageShops } = require("../controllers/massageShops.js");
// Auth
const { protect, authorize } = require("../middleware/auth");
// Router
const router = express.Router();

router.route('/').get(getMassageShops).post(protect, authorize('admin'), createMassageShop);

module.exports = router;
