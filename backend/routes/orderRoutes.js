const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const orderController = require("../controller/orderController");

router.post("/create", protect, orderController.createOrderWithoutPayment);
router.put("/:orderId/payment", protect, orderController.addPaymentToOrder);

module.exports = router;