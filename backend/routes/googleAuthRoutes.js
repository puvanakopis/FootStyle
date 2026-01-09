const express = require('express');
const passport = require('passport');
require('../config/passport');

const router = express.Router();

router.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    res.json({
      message: 'Login successful - Google',
      token: req.user.token,
      user: req.user.user,
    });
  }
);

module.exports = router;