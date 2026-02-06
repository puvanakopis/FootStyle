const Cart = require("../model/CartModel");
const Product = require("../model/productModel");

exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        return res.status(200).json({
            message: "Cart retrieved successfully",
            cart: cart || { items: [] },
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, size, quantity } = req.body;

        if (!productId || !size || !quantity) {
            return res.status(400).json({
                message: "productId, size, and quantity are required",
            });
        }

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const sizeObj = product.sizes.find((s) => s.size === size);
        if (!sizeObj) return res.status(400).json({ message: `Size '${size}' not available` });

        if (quantity > sizeObj.stock) {
            return res.status(400).json({ message: `Only ${sizeObj.stock} items available for size '${size}'` });
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = await Cart.create({ user: userId, items: [] });
        }

        const existingItem = cart.items.find(
            (i) => i.product === productId
        );

        if (existingItem) {
            const existingVariant = existingItem.variants.find(v => v.size === size);

            if (existingVariant) {
                if (existingVariant.quantity + quantity > sizeObj.stock) {
                    return res.status(400).json({
                        message: `Cannot add ${quantity} more. Only ${sizeObj.stock - existingVariant.quantity} left in stock for size '${size}'`
                    });
                }
                existingVariant.quantity += quantity;
            } else {
                existingItem.variants.push({ size, quantity });
            }
        } else {
            cart.items.push({ product: productId, variants: [{ size, quantity }] });
        }

        await cart.save();

        return res.status(200).json({
            message: "Product added to cart successfully",
            cart,
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, size } = req.body;

        if (!productId || !size) {
            return res.status(400).json({ message: "productId and size are required" });
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.items.find(i => i.product === productId);
        if (!item) return res.status(404).json({ message: "Product not in cart" });

        item.variants = item.variants.filter(v => v.size !== size);

        if (item.variants.length === 0) {
            cart.items = cart.items.filter(i => i.product !== productId);
        }

        await cart.save();

        return res.status(200).json({
            message: "Product removed from cart successfully",
            cart,
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.updateCartItemQuantity = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, size, action } = req.body;

        if (!productId || !size || !action) {
            return res.status(400).json({ message: "productId, size, and action are required" });
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.items.find(i => i.product === productId);
        if (!item) return res.status(404).json({ message: "Product not in cart" });

        const variant = item.variants.find(v => v.size === size);
        if (!variant) return res.status(404).json({ message: "Product size not in cart" });

        const product = await Product.findById(productId);
        const sizeObj = product.sizes.find(s => s.size === size);

        if (action === "increment") {
            if (variant.quantity + 1 > sizeObj.stock) {
                return res.status(400).json({ message: `Only ${sizeObj.stock} items available for size '${size}'` });
            }
            variant.quantity += 1;
        } else if (action === "decrement") {
            variant.quantity -= 1;
            if (variant.quantity <= 0) {
                item.variants = item.variants.filter(v => v.size !== size);
            }
        } else {
            return res.status(400).json({ message: "Invalid action, must be 'increment' or 'decrement'" });
        }

        if (item.variants.length === 0) {
            cart.items = cart.items.filter(i => i.product !== productId);
        }

        await cart.save();

        return res.status(200).json({
            message: "Cart updated successfully",
            cart,
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = [];

        await cart.save();

        return res.status(200).json({
            message: "Cart cleared successfully",
            cart,
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};