const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const uploadProductImages = require("../middleware/uploadProductImages");
const { authorize, protect } = require("../middleware/authMiddleware");

router.post("/", uploadProductImages, protect, authorize('admin'), productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

module.exports = router;