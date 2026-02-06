const mongoose = require("mongoose");
const Counter = require("./counterModel");

const AddressSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    { _id: false }
);

const OrderItemSchema = new mongoose.Schema(
    {
        product: {
            type: String,
            ref: "Product",
            required: true
        },
        size: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
    },
    { _id: false }
);

const PaymentSchema = new mongoose.Schema(
    {
        method: {
            type: String,
            enum: ["Card", "PayPal", "GooglePay", "Wallet", "COD"],
            required: true
        },
        status: {
            type: String,
            enum: ["Pending", "Paid", "Failed", "Refunded"],
            default: "Pending"
        },
        transactionId: {
            type: String,
            default: null
        }
    },
    { _id: false }
);

const OrderSchema = new mongoose.Schema(
    {
        _id: {
            type: String
        },

        user: {
            type: String,
            ref: "User",
            required: true
        },

        items: {
            type: [OrderItemSchema],
            default: []
        },

        shippingAddress: {
            type: AddressSchema,
            required: true
        },

        payment: {
            type: PaymentSchema,
            required: true
        },

        subtotal: {
            type: Number,
            required: true
        },

        shippingFee: {
            type: Number,
            default: 0
        },

        total: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"],
            default: "Pending"
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

OrderSchema.pre("save", async function () {
    if (this.isNew && !this._id) {
        const counter = await Counter.findByIdAndUpdate(
            "order",
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const number = String(counter.seq).padStart(2, "0");
        this._id = `Order_${number}`;
    }
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;