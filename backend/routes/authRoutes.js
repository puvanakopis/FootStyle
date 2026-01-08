const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post('/signup/request-otp', authController.requestOtp);
router.post('/signup/verify-otp', authController.verifyOtpAndSignup);

module.exports = router;