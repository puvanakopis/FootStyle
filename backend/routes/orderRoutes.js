const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const orderController = require("../controller/orderController");

router.get("/", protect, authorize("admin"), orderController.getAllOrders);
router.get("/:orderId", protect, orderController.getOrderById);
router.post("/create", protect, orderController.createOrderWithoutPayment);
router.put("/:orderId/payment", protect, orderController.addPaymentToOrder);
router.put("/:orderId/status", protect, authorize('admin'), orderController.updateOrderStatus);
router.get("/user/all", protect, orderController.getOrdersByUser);

module.exports = router;