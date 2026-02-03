const Order = require("../model/orderModel");
const Product = require("../model/productModel");


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