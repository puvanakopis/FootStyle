const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup/request-otp', authController.requestOtp);
router.post('/signup/verify-otp', authController.verifyOtpAndSignup);

router.post('/login', authController.login);

router.post('/forgot-password/request-otp', authController.requestPasswordReset);
router.post('/forgot-password/verify-otp', authController.verifyPasswordResetOtp);
router.post('/forgot-password/reset', authController.resetPassword);

router.get('/me', protect, authController.getCurrentUser);
router.put('/me', protect, authController.updateCurrentUser);

module.exports = router;