const express = require('express');
const { register, verify, login, getMe, logout, resendToken } = require('../controllers/auth');

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post('/register', register);
router.get('/verify/:token', verify);
router.post('/verify/resend', protect, resendToken);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', protect, logout);


module.exports = router;
