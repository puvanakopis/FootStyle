const Product = require("../model/productModel");
const fs = require("fs");
const path = require("path");

// ------------- CREATE PRODUCT -------------
exports.createProduct = async (req, res) => {
    try {
        const { title, name, category, description, price, sizes, isActive } = req.body;

        // Validate required fields
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

        // Format sizes array
        let formattedSizes = [];
        if (sizes) {
            if (typeof sizes === "string") {
                formattedSizes = JSON.parse(sizes).map(s => ({
                    size: s.size,
                    stock: s.stock || 0
                }));
            } else if (Array.isArray(sizes)) {
                formattedSizes = sizes.map(s => ({
                    size: s.size,
                    stock: s.stock || 0
                }));
            }
        }

        // Create product
        const product = new Product({
            title: title || "",
            name,
            category,
            description: description || "",
            price,
            sizes: formattedSizes,
            isActive: isActive !== undefined ? isActive : true
        });

        await product.save();

        // Handle image uploads
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

// ------------- GET ALL PRODUCTS -------------
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

// ------------- GET PRODUCT BY ID -------------
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

// ------------- UPDATE PRODUCT -------------
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, name, category, description, price, sizes, isActive } = req.body;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Update fields if provided
        if (title !== undefined) product.title = title;
        if (name !== undefined) product.name = name;
        if (category !== undefined) {
            if (!["Men", "Women", "Kids"].includes(category)) {
                return res.status(400).json({
                    success: false,
                    message: `${category} is not a valid category`
                });
            }
            product.category = category;
        }
        if (description !== undefined) product.description = description;
        if (price !== undefined) product.price = price;
        if (isActive !== undefined) product.isActive = isActive;

        // Update sizes
        if (sizes !== undefined) {
            let formattedSizes = [];
            if (typeof sizes === "string") {
                formattedSizes = JSON.parse(sizes).map(s => ({
                    size: s.size,
                    stock: s.stock || 0
                }));
            } else if (Array.isArray(sizes)) {
                formattedSizes = sizes.map(s => ({
                    size: s.size,
                    stock: s.stock || 0
                }));
            }
            product.sizes = formattedSizes;
        }

        // Update images if new files uploaded
        if (req.files && req.files.length > 0) {
            const uploadDir = path.join(__dirname, "../uploads/product");

            // Delete old images
            if (product.images && product.images.length > 0) {
                product.images.forEach(img => {
                    const oldPath = path.join(uploadDir, img);
                    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                });
            }

            // Save new images
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
        }

        await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
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

// ------------- DELETE PRODUCT -------------
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const uploadDir = path.join(__dirname, "../uploads/product");
        if (product.images && product.images.length > 0) {
            product.images.forEach(img => {
                const imgPath = path.join(uploadDir, img);
                if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
            });
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
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