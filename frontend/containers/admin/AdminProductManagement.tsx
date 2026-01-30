"use client";

import React, { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { MdOutlineFileDownload, MdOutlineEdit, MdOutlineAdd, MdDeleteOutline, MdClose } from "react-icons/md";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { MdCategory, MdInventory, MdAttachMoney } from "react-icons/md";

type Size = {
    size: string;
    stock: number;
};

type Review = {
    user: string;
    rating: number;
    comment: string;
    createdAt?: Date;
    updatedAt?: Date;
};

type Product = {
    _id: string;
    id: string;
    title: string;
    name: string;
    category: "Men" | "Women" | "Kids";
    description: string;
    price: number;
    images: string[];
    sizes: Size[];
    reviews: Review[];
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

// Extended type for form data
type ProductFormData = {
    name: string;
    title: string;
    category: "Men" | "Women" | "Kids" | "";
    description: string;
    price: number | "";
    images: string[]; 
    sizes: Size[];
    isActive: boolean;
};

// Type for image files with preview
type ImageFile = {
    file: File;
    preview: string;
};

const sampleProducts: Product[] = [
    {
        _id: "Product_01",
        id: "Product_01",
        title: "Premium Running Shoes",
        name: "Nike Air Max 270",
        category: "Men",
        description: "Comfortable running shoes with air cushioning",
        price: 150,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuC8nutm2JDkOOAyiY_GBY4PdfQPqA9L6hIer-JXCvWfOFz5TY4CcjpNFylQQQAI54jGD2WA7HM0z5yYh1gJJQlqEhOYia4q4rGUFzel8usfjxSZq0Xe98UoeTRf4NILpWzT8gzntCS4nnBYufhTYttxLNokOlTxc-3GvYtrEOE0C7jbHFP7-n0fD0mZzO5abz-6DRnOYfsLY-4nS_GC4dNcav258cvSqTJqODb8UwdetldoJTCvoKvgPpbmDYacperkYkhOYhsHWpxX",
        ],
        sizes: [
            { size: "S", stock: 10 },
            { size: "M", stock: 15 },
            { size: "L", stock: 8 },
        ],
        reviews: [],
        isActive: true,
    },
    {
        _id: "Product_02",
        id: "Product_02",
        title: "Sports Performance Shoes",
        name: "Adidas Ultraboost 22",
        category: "Men",
        description: "High-performance sports shoes with boost technology",
        price: 190,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBqzGpfPxe0XUK_7q3m7gUxpsinido-lSciLBe2EhYwRTvf9Jl22BChLHGsO-7d2wMeK0rVNN2xRu1oT5Nm3NtuBXiAbSp2JEmgrNVJifjvJom2jsjR158gAM3AB0Rd7CvTtcxgegXYuOHa4jdRECo7IjvCw7YQRtwfTyn2Drpzq-OETvDVVk3F93ASuaqZIOBbuNVndwQaENo6TB1xxFpDTO_3kvrxRPbXxcP120xoQTxSwDDvrEr1aZX8RpvjMO9STTO5SlVoL6vy",
        ],
        sizes: [
            { size: "S", stock: 5 },
            { size: "M", stock: 12 },
            { size: "L", stock: 7 },
        ],
        reviews: [],
        isActive: true,
    },
];

const AdminProductManagement: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(sampleProducts);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [stockFilter, setStockFilter] = useState("All");
    const [priceFilter, setPriceFilter] = useState("All");

    // State for modals
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // State for form data
    const [formData, setFormData] = useState<ProductFormData>({
        name: "",
        title: "",
        category: "",
        description: "",
        price: "",
        images: [],
        sizes: [{ size: "S", stock: 0 }],
        isActive: true,
    });

    // State for image files
    const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [editingProductId, setEditingProductId] = useState<string | null>(null);
    const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    // Filter products based on search and filters
    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.id.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
            categoryFilter === "All" ||
            product.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    // Calculate total stock for stock status
    const getStockStatus = (product: Product) => {
        const totalStock = product.sizes.reduce((sum, size) => sum + size.stock, 0);
        if (totalStock === 0) return "Out";
        if (totalStock <= 5) return "Low";
        if (totalStock <= 15) return "Med";
        return "High";
    };

    // Handle file selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newImageFiles: ImageFile[] = [];

        Array.from(files).forEach(file => {
            // Check file type
            if (!file.type.match('image.*')) {
                alert(`File ${file.name} is not an image`);
                return;
            }

            // Check file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert(`File ${file.name} is too large. Max size is 10MB`);
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                newImageFiles.push({
                    file,
                    preview: result
                });

                // When all files are processed
                if (newImageFiles.length === Array.from(files).length) {
                    setImageFiles(prev => [...prev, ...newImageFiles]);
                }
            };
            reader.readAsDataURL(file);
        });

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Remove image
    const removeImage = (index: number) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    // Convert image files to base64 strings
    const getImageBase64Strings = async (): Promise<string[]> => {
        const base64Strings: string[] = [];

        for (const imageFile of imageFiles) {
            base64Strings.push(imageFile.preview);
        }

        return base64Strings;
    };

    // Initialize form for adding new product
    const handleAddNewProduct = () => {
        setFormData({
            name: "",
            title: "",
            category: "",
            description: "",
            price: "",
            images: [],
            sizes: [{ size: "S", stock: 0 }],
            isActive: true,
        });
        setImageFiles([]);
        setShowAddModal(true);
    };

    // Initialize form for editing product
    const handleEditProduct = (product: Product) => {
        setFormData({
            name: product.name,
            title: product.title || "",
            category: product.category,
            description: product.description || "",
            price: product.price,
            images: product.images,
            sizes: [...product.sizes],
            isActive: product.isActive,
        });

        // Convert existing base64 images to ImageFile objects
        const existingImageFiles: ImageFile[] = product.images.map((img, index) => ({
            file: new File([], `image_${index}.jpg`),
            preview: img
        }));
        setImageFiles(existingImageFiles);

        setEditingProductId(product._id);
        setShowEditModal(true);
    };

    // Handle delete click
    const handleDeleteClick = (productId: string) => {
        setDeletingProductId(productId);
        setShowDeleteModal(true);
    };

    // Confirm delete
    const handleConfirmDelete = () => {
        if (deletingProductId) {
            setProducts(products.filter(product => product._id !== deletingProductId));
            setShowDeleteModal(false);
            setDeletingProductId(null);
        }
    };

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (name === "price") {
            setFormData(prev => ({ ...prev, [name]: value === "" ? "" : Number(value) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Handle size changes
    const handleSizeChange = (index: number, field: keyof Size, value: string | number) => {
        const newSizes = [...formData.sizes];
        newSizes[index] = { ...newSizes[index], [field]: value };
        setFormData(prev => ({ ...prev, sizes: newSizes }));
    };

    // Add new size
    const addNewSize = () => {
        setFormData(prev => ({
            ...prev,
            sizes: [...prev.sizes, { size: "S", stock: 0 }]
        }));
    };

    // Remove size
    const removeSize = (index: number) => {
        if (formData.sizes.length > 1) {
            const newSizes = formData.sizes.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, sizes: newSizes }));
        }
    };

    // Handle form submission for adding/editing
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.name || !formData.category || formData.price === "") {
            alert("Please fill in all required fields (Name, Category, Price)");
            return;
        }

        if (imageFiles.length === 0) {
            alert("Please upload at least one image");
            return;
        }

        setIsUploading(true);

        try {
            // Convert image files to base64 strings
            const imageBase64Strings = await getImageBase64Strings();

            if (showEditModal && editingProductId) {
                // Update existing product
                setProducts(prev => prev.map(product =>
                    product._id === editingProductId
                        ? {
                            ...product,
                            ...formData,
                            price: formData.price as number,
                            images: imageBase64Strings,
                            _id: product._id,
                            id: product.id,
                            createdAt: product.createdAt,
                            updatedAt: new Date()
                        }
                        : product
                ));
                setShowEditModal(false);
            } else {
                // Add new product
                const newProduct: Product = {
                    _id: `Product_${String(products.length + 1).padStart(2, "0")}`,
                    id: `Product_${String(products.length + 1).padStart(2, "0")}`,
                    name: formData.name,
                    title: formData.title,
                    category: formData.category as "Men" | "Women" | "Kids",
                    description: formData.description,
                    price: formData.price as number,
                    images: imageBase64Strings,
                    sizes: formData.sizes,
                    reviews: [],
                    isActive: formData.isActive,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };

                setProducts(prev => [...prev, newProduct]);
                setShowAddModal(false);
            }

            // Reset form
            setFormData({
                name: "",
                title: "",
                category: "",
                description: "",
                price: "",
                images: [],
                sizes: [{ size: "S", stock: 0 }],
                isActive: true,
            });
            setImageFiles([]);
        } catch (error) {
            console.error("Error processing images:", error);
            alert("Error processing images. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        return () => {
            imageFiles.forEach(imageFile => {
                if (imageFile.preview.startsWith('blob:')) {
                    URL.revokeObjectURL(imageFile.preview);
                }
            });
        };
    }, []);

    return (
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-black text-text-main tracking-tight">
                            Product Management
                        </h2>
                        <p className="text-text-secondary">
                            Manage your store&apos;s products, stock levels, and pricing.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-text-main px-4 py-2.5 rounded-xl border border-[#f3e7e9] font-bold transition-all shadow-sm">
                            <MdOutlineFileDownload className="text-xl" />
                            <span>Export CSV</span>
                        </button>
                        <button
                            onClick={handleAddNewProduct}
                            className="flex items-center gap-2 bg-[#ee2b4b] text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all active:scale-95"
                        >
                            <MdOutlineAdd className="text-xl" />
                            <span>Add New Product</span>
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-4 bg-white p-1 rounded-2xl border border-[#f3e7e9] shadow-sm flex flex-col md:flex-row items-center justify-between gap-2">
                        <div className="flex-1 flex items-center w-full p-2 gap-2">
                            {/* Category Filter */}
                            <div className="relative">
                                <MdCategory className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-lg pointer-events-none" />
                                <select
                                    className="pl-10 pr-4 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm text-text-main focus:ring-2 focus:ring-[#ee2b4b]/20"
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                >
                                    <option value="All">All Categories</option>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Kids">Kids</option>
                                </select>
                            </div>

                            {/* Stock Filter */}
                            <div className="relative">
                                <MdInventory className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-lg pointer-events-none" />
                                <select
                                    className="pl-10 pr-4 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm text-text-main focus:ring-2 focus:ring-[#ee2b4b]/20"
                                    value={stockFilter}
                                    onChange={(e) => setStockFilter(e.target.value)}
                                >
                                    <option value="All">Stock Status</option>
                                    <option value="Low">Low</option>
                                    <option value="Med">Med</option>
                                    <option value="High">High</option>
                                    <option value="Out">Out</option>
                                </select>
                            </div>

                            {/* Price Filter */}
                            <div className="relative">
                                <MdAttachMoney className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-lg pointer-events-none" />
                                <select
                                    className="pl-10 pr-4 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm text-text-main focus:ring-2 focus:ring-[#ee2b4b]/20"
                                    value={priceFilter}
                                    onChange={(e) => setPriceFilter(e.target.value)}
                                >
                                    <option value="All">Price Range</option>
                                    <option value="0-50">$0 - $50</option>
                                    <option value="50-100">$50 - $100</option>
                                    <option value="100-200">$100 - $200</option>
                                    <option value="200+">$200+</option>
                                </select>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="w-full md:w-auto p-2 flex items-center gap-2">
                            <div className="relative flex-1">
                                <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-lg" />
                                <input
                                    type="text"
                                    placeholder="Search by name, title or ID..."
                                    className="w-full pl-9 pr-4 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#ee2b4b]/20 placeholder-text-secondary/70"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Table */}
                <div className="bg-white rounded-2xl border border-[#f3e7e9] shadow-sm overflow-hidden flex flex-col">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f8f6f6] text-text-secondary text-xs uppercase tracking-wider border-b border-[#f3e7e9]">
                                    <th className="px-6 py-4 font-semibold w-10">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-[#ee2b4b] focus:ring-[#ee2b4b]/20 bg-white"
                                        />
                                    </th>
                                    <th className="px-6 py-4 font-semibold">Product</th>
                                    <th className="px-6 py-4 font-semibold">Category</th>
                                    <th className="px-6 py-4 font-semibold">Price</th>
                                    <th className="px-6 py-4 font-semibold">Stock</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f3e7e9]">
                                {filteredProducts.map((product) => {
                                    const stockStatus = getStockStatus(product);
                                    return (
                                        <tr key={product._id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300 text-[#ee2b4b] focus:ring-[#ee2b4b]/20 bg-white"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-12 h-12 rounded-xl bg-gray-100 bg-cover bg-center border border-gray-200"
                                                        style={{ backgroundImage: `url(${product.images[0]})` }}
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-text-main">{product.name}</span>
                                                        <span className="text-xs text-text-secondary">{product.id}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-text-main font-medium bg-[#f8f6f6] px-2.5 py-1 rounded-lg">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-text-main">
                                                ${product.price}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded-full border ${stockStatus === "Low"
                                                        ? "bg-red-100 text-red-800 border-red-200"
                                                        : stockStatus === "Med"
                                                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                                            : stockStatus === "High"
                                                                ? "bg-green-100 text-green-800 border-green-200"
                                                                : "bg-gray-100 text-gray-800 border-gray-200"
                                                        }`}
                                                >
                                                    {product.sizes.reduce((sum, size) => sum + size.stock, 0)} left
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded-full border ${product.isActive
                                                        ? "bg-green-100 text-green-800 border-green-200"
                                                        : "bg-gray-100 text-gray-800 border-gray-200"
                                                        }`}
                                                >
                                                    {product.isActive ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 transition-opacity">
                                                    <button
                                                        onClick={() => handleEditProduct(product)}
                                                        className="size-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-[#ee2b4b] hover:bg-[#ee2b4b]/5 transition-colors"
                                                        title="Edit Product"
                                                    >
                                                        <MdOutlineEdit className="text-lg" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(product._id)}
                                                        className="size-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-red-600 hover:bg-red-50 transition-colors"
                                                        title="Delete Product"
                                                    >
                                                        <MdDeleteOutline className="text-lg" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-[#f3e7e9] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-text-secondary">
                            Showing <span className="font-bold text-text-main">1-{filteredProducts.length}</span> of{" "}
                            <span className="font-bold text-text-main">{filteredProducts.length}</span> products
                        </p>
                        <div className="flex items-center gap-2">
                            <button className="size-8 flex items-center justify-center rounded-lg border border-[#f3e7e9] text-text-secondary hover:bg-gray-50 hover:text-text-main disabled:opacity-50">
                                <LuChevronLeft className="text-lg" />
                            </button>
                            <button className="size-8 flex items-center justify-center rounded-lg bg-[#ee2b4b] text-white font-bold text-sm">
                                1
                            </button>
                            <button className="size-8 flex items-center justify-center rounded-lg border border-[#f3e7e9] text-text-secondary hover:bg-gray-50 hover:text-text-main text-sm font-medium">
                                2
                            </button>
                            <span className="text-text-secondary">...</span>
                            <button className="size-8 flex items-center justify-center rounded-lg border border-[#f3e7e9] text-text-secondary hover:bg-gray-50 hover:text-text-main text-sm font-medium">
                                12
                            </button>
                            <button className="size-8 flex items-center justify-center rounded-lg border border-[#f3e7e9] text-text-secondary hover:bg-gray-50 hover:text-text-main">
                                <LuChevronRight className="text-lg" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add/Edit Product Modal */}
            {(showAddModal || showEditModal) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-[#f3e7e9]">
                            <h3 className="text-xl font-bold text-text-main">
                                {showEditModal ? "Edit Product" : "Add New Product"}
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-main block">
                                        Product Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 bg-[#f8f6f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#ee2b4b]/20"
                                        placeholder="Enter product name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-main block">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 bg-[#f8f6f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#ee2b4b]/20"
                                        placeholder="Enter product title"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-main block">
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 bg-[#f8f6f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#ee2b4b]/20"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                        <option value="Kids">Kids</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-main block">
                                        Price ($) *
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 bg-[#f8f6f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#ee2b4b]/20"
                                        placeholder="Enter price"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-medium text-text-main block">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-4 py-2.5 bg-[#f8f6f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#ee2b4b]/20"
                                        placeholder="Enter product description"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-medium text-text-main block">
                                        Images *
                                    </label>
                                    <div className="space-y-4">
                                        {/* Image upload area */}
                                        <div
                                            className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#ee2b4b] transition-colors cursor-pointer"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handleFileSelect}
                                                className="hidden"
                                            />
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <div className="w-12 h-12 rounded-full bg-[#f8f6f6] flex items-center justify-center">
                                                    <MdOutlineAdd className="text-2xl text-text-secondary" />
                                                </div>
                                                <div>
                                                    <p className="text-text-main font-medium">
                                                        Click to upload images
                                                    </p>
                                                    <p className="text-text-secondary text-sm">
                                                        PNG, JPG, GIF up to 10MB each
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Image previews */}
                                        {imageFiles.length > 0 && (
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                                {imageFiles.map((imageFile, index) => (
                                                    <div key={index} className="relative group">
                                                        <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                                                            <img
                                                                src={imageFile.preview}
                                                                alt={`Preview ${index + 1}`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(index)}
                                                            className="absolute -top-2 -right-2 size-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                                        >
                                                            <MdClose className="text-sm" />
                                                        </button>
                                                        <div className="mt-1 text-xs text-text-secondary truncate">
                                                            {imageFile.file.name || `Image ${index + 1}`}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-medium text-text-main block">
                                        Sizes & Stock
                                    </label>
                                    <div className="space-y-2">
                                        {formData.sizes.map((size, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <select
                                                    value={size.size}
                                                    onChange={(e) => handleSizeChange(index, "size", e.target.value)}
                                                    className="w-20 px-3 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#ee2b4b]/20"
                                                >
                                                    {["S", "M", "L", "XL", "XXL"].map(s => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                                <input
                                                    type="number"
                                                    value={size.stock}
                                                    onChange={(e) => handleSizeChange(index, "stock", parseInt(e.target.value) || 0)}
                                                    className="w-32 px-3 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#ee2b4b]/20"
                                                    placeholder="Stock"
                                                    min="0"
                                                />
                                                {formData.sizes.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSize(index)}
                                                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={addNewSize}
                                            className="px-4 py-2 text-[#ee2b4b] hover:bg-[#ee2b4b]/5 rounded-xl font-medium border border-[#ee2b4b]"
                                        >
                                            + Add Size
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleInputChange}
                                        className="rounded border-gray-300 text-[#ee2b4b] focus:ring-[#ee2b4b]/20"
                                    />
                                    <label htmlFor="isActive" className="text-sm font-medium text-text-main">
                                        Active Product
                                    </label>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setShowEditModal(false);
                                        setFormData({
                                            name: "",
                                            title: "",
                                            category: "",
                                            description: "",
                                            price: "",
                                            images: [],
                                            sizes: [{ size: "S", stock: 0 }],
                                            isActive: true,
                                        });
                                        setImageFiles([]);
                                    }}
                                    className="px-5 py-2.5 text-text-main hover:bg-gray-50 rounded-xl font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUploading}
                                    className="px-5 py-2.5 bg-[#ee2b4b] text-white rounded-xl font-medium shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isUploading ? "Processing..." : showEditModal ? "Update Product" : "Add Product"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md">
                        <div className="p-6 border-b border-[#f3e7e9]">
                            <h3 className="text-xl font-bold text-text-main">Delete Product</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-text-secondary mb-6">
                                Are you sure you want to delete this product? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setDeletingProductId(null);
                                    }}
                                    className="px-5 py-2.5 text-text-main hover:bg-gray-50 rounded-xl font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    className="px-5 py-2.5 bg-red-600 text-white rounded-xl font-medium shadow-sm transition-all active:scale-95"
                                >
                                    Delete Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProductManagement;