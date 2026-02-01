const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { authorize, protect } = require("../middleware/authMiddleware");

router.get('/', protect, authorize('admin'), userController.getAllUsers);
router.get('/:id', protect, authorize('admin'), userController.getUserById);
router.delete('/:id', protect, authorize('admin'), userController.deleteUser);
router.patch('/toggle-active/:id', protect, authorize('admin'), userController.toggleUserActive);

module.exports = router;