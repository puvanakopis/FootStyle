const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const cartController = require("../controller/cartController");

router.get("/", protect, cartController.getCart);
router.post("/add", protect, cartController.addToCart);
router.post("/remove", protect, cartController.removeFromCart);
router.post("/update-quantity", protect, cartController.updateCartItemQuantity);
router.post("/clear", protect, cartController.clearCart);

module.exports = router