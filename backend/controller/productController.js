const Product = require("../model/productModel");
const fs = require("fs");
const path = require("path");

// ------------- CREATE PRODUCT -------------
exports.createProduct = async (req, res) => {
    try {
        const { title, name, gender, material, description, price, sizes, isActive } = req.body;

        // Validate required fields
        if (!name || !gender || !material || !price === undefined) {
            return res.status(400).json({
                success: false,
                message: "Name, gender , material, and price are required"
            });
        }

        if (!["Men", "Women", "Kids"].includes(gender)) {
            return res.status(400).json({
                success: false,
                message: `${gender} is not a valid gender `
            });
        }

        if (!["Mesh", "Leather", "Synthetic", "Other"].includes(material)) {
            return res.status(400).json({
                success: false,
                message: `${material} is not a valid material`
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
            gender,
            material,
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
        const { title, name, gender, material, description, price, sizes, isActive } = req.body;

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
        if (gender !== undefined) {
            if (!["Men", "Women", "Kids"].includes(gender)) {
                return res.status(400).json({
                    success: false,
                    message: `${gender} is not a valid gender `
                });
            }
            product.gender = gender;
        }
        if (material !== undefined) {
            if (!["Mesh", "Leather", "Synthetic", "Other"].includes(material)) {
                return res.status(400).json({
                    success: false,
                    message: `${material} is not a valid material`
                });
            }
            product.material = material;
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

// ------------- ADD REVIEW -------------
exports.addReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        // Validate rating and comment
        if (rating === undefined || comment === undefined) {
            return res.status(400).json({
                success: false,
                message: "Rating and comment are required"
            });
        }

        if (rating < 0 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 0 and 5"
            });
        }

        // Find product
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Check if user already reviewed
        const alreadyReviewed = product.reviews.find(
            r => r.user === req.user._id.toString()
        );

        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this product"
            });
        }

        // Add new review
        const review = {
            user: req.user._id.toString(),
            rating,
            comment
        };

        product.reviews.push(review);

        product.rating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;

        await product.save();

        res.status(201).json({
            success: true,
            message: "Review added successfully",
            data: review
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