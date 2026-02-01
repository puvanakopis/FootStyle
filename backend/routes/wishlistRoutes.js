const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const wishlistController = require("../controller/wishlistController");

router.post("/add", protect, wishlistController.addToWishlist);
router.delete("/remove/:productId", protect, wishlistController.removeFromWishlist);

module.exports = router;