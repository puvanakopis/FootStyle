const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post('/signup/request-otp', authController.requestOtp);
router.post('/signup/verify-otp', authController.verifyOtpAndSignup);
router.post('/login', authController.login);

module.exports = router;