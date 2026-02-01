const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const wishlistController = require("../controller/wishlistController");

router.get("/", protect, wishlistController.getWishlistProducts);
router.post("/", protect, wishlistController.addToWishlist);
router.delete("/:productId", protect, wishlistController.removeFromWishlist);

module.exports = router;