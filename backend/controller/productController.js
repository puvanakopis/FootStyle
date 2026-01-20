const Product = require("../model/productModel");


exports.createProduct = async (req, res) => {
    try {
        const {
            name,
            category,
            description,
            price,
            stock,
            images,
            colors,
            sizes,
            isActive
        } = req.body;

        // Basic validation
        if (!name || !category || price === undefined || stock === undefined) {
            return res.status(400).json({
                success: false,
                message: "Name, category, price, and stock are required"
            });
        }

        if (!images || !Array.isArray(images) || images.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one product image is required"
            });
        }

        // Create product
        const product = await Product.create({
            name,
            category,
            description,
            price,
            stock,
            images,
            colors: colors || [],
            sizes: sizes || [],
            isActive: isActive !== undefined ? isActive : true,
            rating: 0,
            reviewsCount: 0
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });

    } catch (error) {
        console.error("Create Product Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while creating product",
            error: error.message
        });
    }
};