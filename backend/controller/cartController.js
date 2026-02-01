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