const express = require("express");
const router = express.Router();
const { createProduct } = require("../controller/productController");
const { authorize, protect } = require("../middleware/authMiddleware");

router.post("/", protect, authorize('admin'), createProduct);

module.exports = router;