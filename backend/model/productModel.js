const mongoose = require("mongoose");
const Counter = require("./counterModel");

// Subschemas
const ColorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        colorClass: { type: String, required: true }
    },
    { _id: false }
);

const SizeSchema = new mongoose.Schema(
    {
        size: { type: String, required: true },
        available: { type: Boolean, default: true }
    },
    { _id: false }
);

const ReviewSchema = new mongoose.Schema(
    {
        user: { type: String, ref: "User", required: true },
        rating: { type: Number, required: true, min: 0, max: 5 },
        comment: { type: String, required: true }
    },
    { timestamps: true }
);

// Main Product Schema
const ProductSchema = new mongoose.Schema(
    {
        _id: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        images: {
            type: [String],
            validate: v => v.length > 0
        },
        colors: {
            type: [ColorSchema],
            default: []
        },
        sizes: {
            type: [SizeSchema],
            default: []
        },
        reviews: {
            type: [ReviewSchema],
            default: []
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        reviewsCount: {
            type: Number,
            default: 0
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