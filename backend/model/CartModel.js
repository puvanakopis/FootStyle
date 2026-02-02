const mongoose = require("mongoose");

const ProductVariantSchema = new mongoose.Schema(
    {
        size: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        }
    },
    { _id: false }
);

const CartItemSchema = new mongoose.Schema(
    {
        product: {
            type: String,
            ref: "Product",
            required: true
        },
        variants: {
            type: [ProductVariantSchema],
            default: []
        }
    },
    { _id: false }
);

const CartSchema = new mongoose.Schema(
    {
        _id: {
            type: String
        },
        user: {
            type: String,
            ref: "User",
            required: true,
            unique: true
        },
        items: {
            type: [CartItemSchema],
            default: []
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

CartSchema.virtual("id").get(function () {
    return this._id;
});

CartSchema.pre("save", async function () {
    if (!this._id) {
        this._id = this.user;
    }
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;