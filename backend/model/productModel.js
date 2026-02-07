const mongoose = require("mongoose");
const Counter = require("./counterModel");
const path = require("path");

const SizeSchema = new mongoose.Schema(
    {
        size: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        }
    },
    { _id: false }
);

const ReviewSchema = new mongoose.Schema(
    {
        _id: {
            type: String
        },
        user: {
            type: String,
            ref: "User",
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },
        comment: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const ProductSchema = new mongoose.Schema(
    {
        _id: {
            type: String
        },
        title: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true,
            enum: ["Men", "Women", "Kids"]
        },
        material: {
            type: String,
            required: true,
            enum: ["Mesh", "Leather", "Synthetic", "Other"]
        },
        description: {
            type: String
        },
        price: {
            type: Number,
            required: true
        },
        images: {
            type: [String],
            required: true
        },
        sizes: {
            type: [SizeSchema],
            default: []
        },
        reviews: {
            type: [ReviewSchema],
            default: []
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

ProductSchema.virtual("id").get(function () {
    return this._id;
});

ProductSchema.pre("save", async function () {
    if (this.isNew && !this._id) {
        const counter = await Counter.findByIdAndUpdate(
            "product",
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        const number = String(counter.seq).padStart(2, "0");
        this._id = `Product_${number}`;
    }
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;