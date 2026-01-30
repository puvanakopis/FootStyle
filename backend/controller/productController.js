const Product = require("../model/productModel");
const fs = require("fs");
const path = require("path");


// Create products
exports.createProduct = async (req, res) => {
    try {
        const { title, name, category, description, price, sizes, isActive } = req.body;

        // Required fields
        if (!name || !category || price === undefined) {
            return res.status(400).json({
                success: false,
                message: "Name, category, and price are required"
            });
        }

        if (!["Men", "Women", "Kids"].includes(category)) {
            return res.status(400).json({
                success: false,
                message: `${category} is not a valid category`
            });
        }

        if (!req.files || req.files.length !== 4) {
            return res.status(400).json({
                success: false,
                message: "Product must contain exactly 4 images"
            });
        }

        // Format size array
        const formattedSizes = Array.isArray(sizes)
            ? JSON.parse(sizes).map(s => ({
                size: s.size,
                stock: s.stock || 0
            }))
            : [];

        // Create product
        const product = new Product({
            title: title || "",
            name,
            category,
            description: description || "",
            price,
            SizeSchema: formattedSizes,
            isActive: isActive !== undefined ? isActive : true
        });

        await product.save();

        // Rename uploaded images
        const uploadDir = path.join(__dirname, "../uploads/product");
        const newImageNames = req.files.map((file, i) => {
            const ext = path.extname(file.originalname);
            const num = String(i + 1).padStart(2, "0");
            const newName = `${product._id}_${num}${ext}`;
            const oldPath = file.path;
            const newPath = path.join(uploadDir, newName);
            fs.renameSync(oldPath, newPath);
            return newName;
        });

        product.images = newImageNames;
        await product.save();

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// Get Product By Id
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};