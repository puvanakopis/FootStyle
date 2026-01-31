const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { authorize, protect } = require("../middleware/authMiddleware");

router.get('/', protect, authorize('admin'), userController.getAllUsers);

module.exports = router;