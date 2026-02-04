const Order = require("../model/orderModel");
const Product = require("../model/productModel");

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user")
            .populate("items.product")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "All orders retrieved successfully",
            orders
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error retrieving orders",
            error
        });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId).populate("user").populate("items.product");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({ order });

    } catch (error) {
        return res.status(500).json({ message: "Error retrieving order", error });
    }
};

exports.createOrderWithoutPayment = async (req, res) => {
    try {
        const userId = req.user.id;
        const { items, shippingAddress, subtotal, shippingFee, total } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Order items are required" });
        }

        const order = new Order({
            user: userId,
            items,
            shippingAddress,
            payment: {
                method: "COD",
                status: "Pending"
            },
            subtotal,
            shippingFee,
            total,
            status: "Pending"
        });

        await order.save();

        return res.status(201).json({
            message: "Order created successfully (without payment)",
            order
        });

    } catch (error) {
        return res.status(500).json({ message: "Error creating order", error });
    }
};

exports.addPaymentToOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { method, transactionId } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.payment.method = method;
        order.payment.status = "Paid";
        order.payment.transactionId = transactionId;

        order.status = "Processing";

        await order.save();

        return res.status(200).json({
            message: "Payment added successfully",
            order
        });

    } catch (error) {
        return res.status(500).json({ message: "Error adding payment", error });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const allowed = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"];
        if (!allowed.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await order.save();

        return res.status(200).json({
            message: "Order status updated successfully",
            order
        });

    } catch (error) {
        return res.status(500).json({ message: "Error updating status", error });
    }
};

exports.getOrdersByUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await Order.find({ user: userId })
            .populate("items.product")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "User orders retrieved successfully",
            orders
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error retrieving user orders",
            error
        });
    }
};