const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },
        user: {
            type: String,
            ref: "User",
            required: true,
            unique: true
        },

        products: [
            {
                type: String,
                ref: "Product"
            }
        ]
    },
    {
        timestamps: true
    }
);

WishlistSchema.virtual('id').get(function () {
    return this._id;
});

WishlistSchema.methods.addProduct = function (productId) {
    if (!this.products.includes(productId)) {
        this.products.push(productId);
    }
    return this.save();
};

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = Wishlist;