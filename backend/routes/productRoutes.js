const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const uploadProductImages = require("../middleware/uploadProductImages");

router.post("/", uploadProductImages, productController.createProduct);

module.exports = router;