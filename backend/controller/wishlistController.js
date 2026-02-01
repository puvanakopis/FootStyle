const Product = require("../model/productModel");
const Wishlist = require("../model/wishlistModel");

exports.getWishlistProducts = async (req, res) => {
    try {
        const userId = req.user._id;

        const wishlist = await Wishlist.findOne({ user: userId }).populate("products");

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        res.json({
            message: "Wishlist retrieved successfully",
            products: wishlist.products
        });

    } catch (error) {
        console.error("Get Wishlist Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.addToWishlist = async (req, res) => {
    try {
        const userId = req.user._id;         
        const { productId } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = new Wishlist({
                _id: `wishlist_${userId}`,
                user: userId,
                products: []
            });
        }

        if (!wishlist.products.includes(productId)) {
            wishlist.products.push(productId);
            await wishlist.save();
        }

        res.json({
            message: "Product added to wishlist successfully",
            wishlist
        });

    } catch (error) {
        console.error("Add Wishlist Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user._id;      
        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        wishlist.products = wishlist.products.filter(
            (id) => id !== productId
        );

        await wishlist.save();

        res.json({
            message: "Product removed from wishlist successfully",
            wishlist
        });

    } catch (error) {
        console.error("Remove Wishlist Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};