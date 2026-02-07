"use client";

import React, { useState, useEffect, useRef } from "react";
import { MdOutlineEdit, MdOutlineAdd, MdDeleteOutline, MdClose, MdOutlineVisibility } from "react-icons/md";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { Size, Product } from "@/interfaces/productInterface";
import { useProduct } from "@/context/ProductContext";
import { showToast } from "@/utils/toast";

type ProductFormData = {
    name: string;
    title: string;
    gender: "Men" | "Women" | "Kids" | "";
    material: "Mesh" | "Leather" | "Synthetic" | "Other" | "";
    description: string;
    price: number | "";
    sizes: Size[];
    isActive: boolean;
};

type ImageFile = {
    file: File | null;
    preview: string;
    isExisting?: boolean;
    existingUrl?: string;
};

const AdminProductManagement = () => {
    const { products, fetchProducts, createProduct, updateProduct, deleteProduct, isLoading, } = useProduct();

    // State for filters
    const [searchQuery, setSearchQuery] = useState("");
    const [genderFilter, setGenderFilter] = useState("All");
    const [materialFilter, setMaterialFilter] = useState("All");
    const [stockFilter, setStockFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    // State for modals
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    // State for image files
    const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Other states
    const [editingProductId, setEditingProductId] = useState<string | null>(null);
    const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
    const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    // State for form data
    const [formData, setFormData] = useState<ProductFormData>({
        name: "",
        title: "",
        gender: "",
        material: "",
        description: "",
        price: "",
        sizes: [{ size: "S", stock: 0 }],
        isActive: true,
    });

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    // Calculate total stock and get stock status
    const getStockStatus = (product: Product) => {
        const totalStock = product.sizes.reduce((sum, size) => sum + size.stock, 0);
        if (totalStock === 0) return "Out of Stock";
        if (totalStock <= 5) return "Low Stock";
        if (totalStock <= 15) return "Medium Stock";
        return "High Stock";
    };

    // Get stock status color
    const getStockStatusColor = (status: string) => {
        switch (status) {
            case "High Stock": return "bg-green-100 text-green-800 border-green-200";
            case "Medium Stock": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Low Stock": return "bg-orange-100 text-orange-800 border-orange-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    // Helper function to get image URL
    const getImageUrl = (imageName: string) => {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
        return `${API_BASE_URL}/uploads/product/${imageName}`;
    };

    // Format date for display
    const formatDateForDisplay = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
    };

    // Filter products based on search and filters
    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.material?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product._id?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesGender =
            genderFilter === "All" ||
            product.gender === genderFilter;

        const matchesMaterial =
            materialFilter === "All" ||
            product.material === materialFilter;

        const matchesStock =
            stockFilter === "All" ||
            getStockStatus(product) === stockFilter;

        const matchesStatus =
            statusFilter === "All" ||
            (statusFilter === "Active" && product.isActive) ||
            (statusFilter === "Inactive" && !product.isActive);

        return matchesSearch && matchesGender && matchesMaterial && matchesStock && matchesStatus;
    });

    // Calculate pagination values
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Handle file selection with 4 image limit
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newImageFiles: ImageFile[] = [];

        Array.from(files).forEach(file => {
            // Check if we already have 4 images
            const totalImages = imageFiles.filter(img => !img.isExisting).length + newImageFiles.length;
            if (totalImages >= 4) {
                showToast('error', "Maximum 4 images allowed");
                return;
            }

            // Check file type
            if (!file.type.match('image.*')) {
                showToast('error', `File ${file.name} is not an image`);
                return;
            }

            // Check file size 
            if (file.size > 10 * 1024 * 1024) {
                showToast('error', `File ${file.name} is too large. Max size is 10MB`);
                return;
            }

            // Create object URL for preview
            const objectUrl = URL.createObjectURL(file);
            newImageFiles.push({
                file,
                preview: objectUrl,
                isExisting: false
            });
        });

        // Add new files to existing ones
        setImageFiles(prev => [...prev, ...newImageFiles]);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Remove image
    const removeImage = (index: number) => {
        const imageToRemove = imageFiles[index];

        // Revoke object URL to prevent memory leaks
        if (imageToRemove.preview.startsWith('blob:')) {
            URL.revokeObjectURL(imageToRemove.preview);
        }

        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    // Initialize form for adding new product
    const handleAddNewProduct = () => {
        setFormData({
            name: "",
            title: "",
            gender: "",
            material: "",
            description: "",
            price: "",
            sizes: [{ size: "S", stock: 0 }],
            isActive: true,
        });
        setImageFiles([]);
        setCurrentPage(1);
        setShowAddModal(true);
    };

    // Initialize form for editing product
    const handleEditProduct = (product: Product) => {
        setFormData({
            name: product.name,
            title: product.title || "",
            gender: product.gender as "Men" | "Women" | "Kids",
            material: product.material as "Mesh" | "Leather" | "Synthetic" | "Other",
            description: product.description || "",
            price: product.price,
            sizes: [...product.sizes],
            isActive: product.isActive,
        });

        // Load existing product images
        const existingImages: ImageFile[] = product.images.map((imageName, index) => ({
            file: null,
            preview: getImageUrl(imageName),
            isExisting: true,
            existingUrl: getImageUrl(imageName)
        }));

        setImageFiles(existingImages);
        setEditingProductId(product.id || product._id || "");
        setShowEditModal(true);
    };

    // Handle view product details
    const handleViewProduct = (product: Product) => {
        setViewingProduct(product);
        setShowViewModal(true);
    };

    // Handle delete click
    const handleDeleteClick = (productId: string) => {
        setDeletingProductId(productId);
        setShowDeleteModal(true);
    };

    // Confirm delete
    const handleConfirmDelete = async () => {
        if (deletingProductId) {
            try {
                setIsSubmitting(true);
                await deleteProduct(deletingProductId);
                showToast('success', "Product deleted successfully");
                setShowDeleteModal(false);
                setDeletingProductId(null);

                // Reset to first page if current page becomes empty
                if (currentProducts.length === 1 && currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                }
            } catch (error) {
                console.error("Error deleting product:", error);
                showToast('error', "Failed to delete product");
            } finally {
                setIsSubmitting(false);
            }
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
        if (!formData.name || !formData.gender || !formData.material || formData.price === "") {
            showToast('error', "Please fill in all required fields (Name, Gender, Material, Price)");
            return;
        }

        // Validate images - ensure exactly 4 images
        const totalImages = imageFiles.length;
        if (totalImages !== 4) {
            showToast('error', `Please upload exactly 4 images. Currently: ${totalImages}/4`);
            return;
        }

        setIsSubmitting(true);

        try {
            if (showEditModal && editingProductId) {
                // Update existing product
                const updateData = {
                    name: formData.name,
                    title: formData.title,
                    gender: formData.gender as "Men" | "Women" | "Kids",
                    material: formData.material as "Mesh" | "Leather" | "Synthetic" | "Other",
                    description: formData.description,
                    price: formData.price as number,
                    sizes: formData.sizes,
                    isActive: formData.isActive,
                };

                // Get only newly uploaded files 
                const imagesToUpload = imageFiles
                    .filter(img => !img.isExisting && img.file)
                    .map(img => img.file as File);

                await updateProduct(
                    editingProductId,
                    updateData,
                    imagesToUpload.length > 0 ? imagesToUpload : undefined
                );

                showToast('success', "Product updated successfully");
                setShowEditModal(false);
            } else {
                // Add new product
                const createData = {
                    name: formData.name,
                    title: formData.title,
                    gender: formData.gender as "Men" | "Women" | "Kids",
                    material: formData.material as "Mesh" | "Leather" | "Synthetic" | "Other",
                    description: formData.description,
                    price: formData.price as number,
                    sizes: formData.sizes,
                    isActive: formData.isActive,
                };

                const images = imageFiles
                    .filter(img => img.file)
                    .map(img => img.file as File);

                await createProduct(createData, images);

                showToast('success', "Product created successfully");
                setShowAddModal(false);
            }

            // Clean up and reset form
            imageFiles.forEach(imageFile => {
                if (imageFile.preview.startsWith('blob:')) {
                    URL.revokeObjectURL(imageFile.preview);
                }
            });

            setFormData({
                name: "",
                title: "",
                gender: "",
                material: "",
                description: "",
                price: "",
                sizes: [{ size: "S", stock: 0 }],
                isActive: true,
            });
            setImageFiles([]);

            // Refresh product list
            fetchProducts();

        } catch (error) {
            console.error("Error processing product:", error);
            showToast('error', "Error processing product. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Clean up object URLs when component unmounts
    useEffect(() => {
        return () => {
            imageFiles.forEach(imageFile => {
                if (imageFile.preview.startsWith('blob:')) {
                    URL.revokeObjectURL(imageFile.preview);
                }
            });
        };
    }, [imageFiles]);

    // Clean up object URLs when modal closes
    const handleCloseModal = () => {
        imageFiles.forEach(imageFile => {
            if (imageFile.preview.startsWith('blob:')) {
                URL.revokeObjectURL(imageFile.preview);
            }
        });

        setShowAddModal(false);
        setShowEditModal(false);
        setFormData({
            name: "",
            title: "",
            gender: "",
            material: "",
            description: "",
            price: "",
            sizes: [{ size: "S", stock: 0 }],
            isActive: true,
        });
        setImageFiles([]);
    };

    // Calculate remaining slots for new images
    const getRemainingImageSlots = () => {
        const existingImagesCount = imageFiles.filter(img => img.isExisting).length;
        const newImagesCount = imageFiles.filter(img => !img.isExisting).length;
        return 4 - existingImagesCount - newImagesCount;
    };

    // Handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Handle next page
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Handle previous page
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPageButtons = 5;

        if (totalPages <= maxPageButtons) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);

            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 2) {
                end = 4;
            }

            if (currentPage >= totalPages - 1) {
                start = totalPages - 3;
            }

            if (start > 2) {
                pageNumbers.push('...');
            }

            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }

            if (end < totalPages - 1) {
                pageNumbers.push('...');
            }

            if (totalPages > 1) {
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

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
                    <div className="flex gap-2">
                        <button
                            onClick={handleAddNewProduct}
                            className="flex items-center gap-2 px-5 py-2.5 text-white rounded-xl font-bold shadow-sm transition-all active:scale-95 bg-red-600 hover:bg-red-700"
                        >
                            <MdOutlineAdd className="text-xl" />
                            <span>Add New Product</span>
                        </button>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-4 bg-white p-1 rounded-2xl border border-[#f3e7e9] shadow-sm flex flex-col md:flex-row items-center justify-between gap-2">
                        <div className="flex-1 flex items-center w-full p-2 gap-2">
                            {/* Gender Filter */}
                            <div>
                                <select
                                    className="pl-4 pr-10 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm text-text-main focus:ring-2 focus:ring-[#ee2b4b]/20"
                                    value={genderFilter}
                                    onChange={(e) => setGenderFilter(e.target.value)}
                                >
                                    <option value="All">All Gender</option>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Kids">Kids</option>
                                </select>
                            </div>

                            {/* Material Filter */}
                            <div>
                                <select
                                    className="pl-4 pr-10 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm text-text-main focus:ring-2 focus:ring-[#ee2b4b]/20"
                                    value={materialFilter}
                                    onChange={(e) => setMaterialFilter(e.target.value)}
                                >
                                    <option value="All">All Materials</option>
                                    <option value="Mesh">Mesh</option>
                                    <option value="Leather">Leather</option>
                                    <option value="Synthetic">Synthetic</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* Stock Filter */}
                            <div>
                                <select
                                    className="pl-4 pr-10 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm text-text-main focus:ring-2 focus:ring-[#ee2b4b]/20"
                                    value={stockFilter}
                                    onChange={(e) => setStockFilter(e.target.value)}
                                >
                                    <option value="All">All Stock</option>
                                    <option value="High Stock">High Stock</option>
                                    <option value="Medium Stock">Medium Stock</option>
                                    <option value="Low Stock">Low Stock</option>
                                    <option value="Out of Stock">Out of Stock</option>
                                </select>
                            </div>

                            {/* Status Filter */}
                            <div>
                                <select
                                    className="pl-4 pr-10 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm text-text-main focus:ring-2 focus:ring-[#ee2b4b]/20"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="All">All Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-full md:w-auto p-2">
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary material-symbols-outlined text-lg">
                                    <IoSearch />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search by name, title, material, or ID..."
                                    className="w-full md:w-64 pl-9 pr-4 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#ee2b4b]/20 focus:outline-none placeholder-text-secondary/70"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="bg-white rounded-2xl border border-[#f3e7e9] shadow-sm p-8 text-center">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ee2b4b]"></div>
                            <p className="text-text-main">Loading products...</p>
                        </div>
                    </div>
                )}

                {/* Products Table */}
                {!isLoading && (
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
                                        <th className="px-6 py-4 font-semibold">Product ID</th>
                                        <th className="px-6 py-4 font-semibold">Gender</th>
                                        <th className="px-6 py-4 font-semibold">Material</th>
                                        <th className="px-6 py-4 font-semibold">Price</th>
                                        <th className="px-6 py-4 font-semibold">Stock</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#f3e7e9]">
                                    {currentProducts.length === 0 ? (
                                        <tr>
                                            <td colSpan={9} className="px-6 py-8 text-center text-text-secondary">
                                                {products.length === 0 ? "No products found" : "No products match your filters"}
                                            </td>
                                        </tr>
                                    ) : (
                                        currentProducts.map((product) => {
                                            const stockStatus = getStockStatus(product);
                                            const totalStock = product.sizes.reduce((sum, size) => sum + size.stock, 0);
                                            const productId = product.id || product._id;
                                            
                                            return (
                                                <tr
                                                    key={productId}
                                                    className="hover:bg-gray-50 transition-colors group"
                                                >
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="checkbox"
                                                            className="rounded border-gray-300 text-[#ee2b4b] focus:ring-[#ee2b4b]/20 bg-white"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className="w-12 h-12 rounded-xl bg-cover bg-center border border-gray-200"
                                                                style={{
                                                                    backgroundImage: product.images && product.images.length > 0 
                                                                        ? `url(${getImageUrl(product.images[0])})`
                                                                        : 'none',
                                                                    backgroundColor: product.images && product.images.length > 0 
                                                                        ? 'transparent' 
                                                                        : '#f8f6f6'
                                                                }}
                                                            />
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-bold text-text-main">
                                                                    {product.name}
                                                                </span>
                                                                <span className="text-xs text-text-secondary">
                                                                    {product.title || "No title"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-bold text-[#ee2b4b]">
                                                        {productId}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${product.gender === "Men"
                                                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                                                : product.gender === "Women"
                                                                ? "bg-pink-100 text-pink-800 border-pink-200"
                                                                : "bg-green-100 text-green-800 border-green-200"
                                                                }`}
                                                        >
                                                            {product.gender}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${product.material === "Leather"
                                                                ? "bg-amber-100 text-amber-800 border-amber-200"
                                                                : product.material === "Mesh"
                                                                ? "bg-gray-100 text-gray-800 border-gray-200"
                                                                : product.material === "Synthetic"
                                                                ? "bg-purple-100 text-purple-800 border-purple-200"
                                                                : "bg-gray-100 text-gray-800 border-gray-200"
                                                                }`}
                                                        >
                                                            {product.material}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-bold text-text-main">
                                                        Rs. {product.price.toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStockStatusColor(stockStatus)}`}
                                                        >
                                                            <span
                                                                className={`w-2 h-2 rounded-full mr-1 ${stockStatus === "High Stock"
                                                                    ? "bg-green-500"
                                                                    : stockStatus === "Medium Stock"
                                                                    ? "bg-yellow-500"
                                                                    : stockStatus === "Low Stock"
                                                                    ? "bg-orange-500"
                                                                    : "bg-gray-500"
                                                                    }`}
                                                            ></span>
                                                            {totalStock} units
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${product.isActive
                                                                ? "bg-green-100 text-green-800 border-green-200"
                                                                : "bg-gray-100 text-gray-800 border-gray-200"
                                                                }`}
                                                        >
                                                            <span
                                                                className={`w-2 h-2 rounded-full mr-1 ${product.isActive
                                                                    ? "bg-green-500"
                                                                    : "bg-gray-500"
                                                                    }`}
                                                            ></span>
                                                            {product.isActive ? "Active" : "Inactive"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => handleViewProduct(product)}
                                                                className="size-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                                title="View Details"
                                                            >
                                                                <MdOutlineVisibility size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleEditProduct(product)}
                                                                className="size-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-[#ee2b4b] hover:bg-[#ee2b4b]/5 transition-colors"
                                                                title="Edit Product"
                                                            >
                                                                <MdOutlineEdit size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteClick(productId || "")}
                                                                className="size-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-red-600 hover:bg-red-50 transition-colors"
                                                                title="Delete Product"
                                                            >
                                                                <MdDeleteOutline size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {filteredProducts.length > 0 && (
                            <div className="px-6 py-4 border-t border-[#f3e7e9] flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-sm text-text-secondary">
                                    Showing <span className="font-bold text-text-main">{indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)}</span> of{" "}
                                    <span className="font-bold text-text-main">{filteredProducts.length}</span> products
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1}
                                        className="size-8 flex items-center justify-center rounded-lg border border-[#f3e7e9] text-text-secondary hover:bg-gray-50 hover:text-text-main disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <LuChevronLeft />
                                    </button>

                                    {getPageNumbers().map((pageNumber, index) => (
                                        <button
                                            key={index}
                                            onClick={() => pageNumber !== '...' && handlePageChange(pageNumber as number)}
                                            className={`size-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${pageNumber === currentPage
                                                ? "bg-[#ee2b4b] text-white"
                                                : pageNumber === '...'
                                                    ? "text-text-secondary cursor-default"
                                                    : "border border-[#f3e7e9] text-text-secondary hover:bg-gray-50 hover:text-text-main"
                                                }`}
                                            disabled={pageNumber === '...'}
                                        >
                                            {pageNumber}
                                        </button>
                                    ))}

                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                        className="size-8 flex items-center justify-center rounded-lg border border-[#f3e7e9] text-text-secondary hover:bg-gray-50 hover:text-text-main disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <LuChevronRight />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
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
                                        Gender *
                                    </label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 bg-[#f8f6f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#ee2b4b]/20"
                                        required
                                    >
                                        <option value="">Select gender</option>
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                        <option value="Kids">Kids</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-main block">
                                        Material *
                                    </label>
                                    <select
                                        name="material"
                                        value={formData.material}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 bg-[#f8f6f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#ee2b4b]/20"
                                        required
                                    >
                                        <option value="">Select Material</option>
                                        <option value="Mesh">Mesh</option>
                                        <option value="Leather">Leather</option>
                                        <option value="Synthetic">Synthetic</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-main block">
                                        Price (Rs.) *
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 bg-[#f8f6f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#ee2b4b]/20"
                                        placeholder="Enter price in rupees"
                                        min="0"
                                        step="1"
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
                                        Images * (Exactly 4 images required)
                                    </label>
                                    <div className="space-y-4">
                                        {/* Image upload area */}
                                        <div
                                            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors ${getRemainingImageSlots() === 0
                                                ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                                                : 'border-gray-300 hover:border-[#ee2b4b] cursor-pointer'
                                                }`}
                                            onClick={() => {
                                                if (getRemainingImageSlots() > 0) {
                                                    fileInputRef.current?.click();
                                                }
                                            }}
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
                                                        {getRemainingImageSlots() === 0
                                                            ? 'Maximum 4 images reached'
                                                            : 'Click to upload images'}
                                                    </p>
                                                    <p className="text-text-secondary text-sm">
                                                        PNG, JPG, GIF up to 10MB each ({imageFiles.length}/4)
                                                        {showEditModal && imageFiles.some(img => img.isExisting) && (
                                                            <span className="text-blue-600 ml-2">
                                                                ({imageFiles.filter(img => img.isExisting).length} existing)
                                                            </span>
                                                        )}
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
                                                        {imageFile.isExisting && (
                                                            <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs rounded-md">
                                                                Existing
                                                            </div>
                                                        )}
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(index)}
                                                            className="absolute -top-2 -right-2 size-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                                        >
                                                            <MdClose className="text-sm" />
                                                        </button>
                                                        <div className="mt-1 text-xs text-text-secondary truncate">
                                                            {imageFile.isExisting
                                                                ? `Image ${index + 1}`
                                                                : imageFile.file?.name || `Image ${index + 1}`}
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
                                    onClick={handleCloseModal}
                                    className="px-5 py-2.5 text-text-main hover:bg-gray-50 rounded-xl font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-5 py-2.5 bg-red-600 text-white rounded-xl font-medium shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700"
                                >
                                    {isSubmitting ? "Processing..." : showEditModal ? "Update Product" : "Add Product"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Product Details Modal */}
            {showViewModal && viewingProduct && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-[#f3e7e9] flex justify-between items-center">
                            <h3 className="text-xl font-bold text-text-main">Product Details</h3>
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="text-text-secondary hover:text-text-main"
                            >
                                <MdClose size={24} />
                            </button>
                        </div>
                        <div className="p-6">
                            {/* Product Header with Main Image */}
                            <div className="flex flex-col md:flex-row gap-6 mb-6">
                                <div className="flex flex-col items-center">
                                    {viewingProduct.images && viewingProduct.images.length > 0 ? (
                                        <div className="w-32 h-32 rounded-xl bg-gray-100 overflow-hidden mb-4">
                                            <img
                                                src={getImageUrl(viewingProduct.images[0])}
                                                alt={viewingProduct.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-32 h-32 rounded-xl bg-[#f8f6f6] flex items-center justify-center mb-4">
                                            <span className="text-4xl font-bold text-text-secondary">P</span>
                                        </div>
                                    )}
                                    <div className="text-center">
                                        <h4 className="text-lg font-bold text-text-main">
                                            {viewingProduct.name}
                                        </h4>
                                        <p className="text-text-secondary">{viewingProduct.title || "No title"}</p>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-sm text-text-secondary">Product ID</p>
                                            <p className="font-medium text-[#ee2b4b]">{viewingProduct.id || viewingProduct._id || 'N/A'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-text-secondary">Gender</p>
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${viewingProduct.gender === "Men"
                                                    ? "bg-blue-100 text-blue-800 border-blue-200"
                                                    : viewingProduct.gender === "Women"
                                                    ? "bg-pink-100 text-pink-800 border-pink-200"
                                                    : "bg-green-100 text-green-800 border-green-200"
                                                    }`}
                                            >
                                                {viewingProduct.gender}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-text-secondary">Material</p>
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${viewingProduct.material === "Leather"
                                                    ? "bg-amber-100 text-amber-800 border-amber-200"
                                                    : viewingProduct.material === "Mesh"
                                                    ? "bg-gray-100 text-gray-800 border-gray-200"
                                                    : viewingProduct.material === "Synthetic"
                                                    ? "bg-purple-100 text-purple-800 border-purple-200"
                                                    : "bg-gray-100 text-gray-800 border-gray-200"
                                                    }`}
                                            >
                                                {viewingProduct.material}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-text-secondary">Status</p>
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${viewingProduct.isActive
                                                    ? "bg-green-100 text-green-800 border-green-200"
                                                    : "bg-gray-100 text-gray-800 border-gray-200"
                                                    }`}
                                            >
                                                <span
                                                    className={`w-2 h-2 rounded-full mr-1 ${viewingProduct.isActive
                                                        ? "bg-green-500"
                                                        : "bg-gray-500"
                                                        }`}
                                                ></span>
                                                {viewingProduct.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-text-secondary">Price</p>
                                            <p className="font-bold text-text-main">Rs. {viewingProduct.price.toLocaleString()}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-text-secondary">Total Stock</p>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStockStatusColor(getStockStatus(viewingProduct))}`}>
                                                <span
                                                    className={`w-2 h-2 rounded-full mr-1 ${getStockStatus(viewingProduct) === "High Stock"
                                                        ? "bg-green-500"
                                                        : getStockStatus(viewingProduct) === "Medium Stock"
                                                        ? "bg-yellow-500"
                                                        : getStockStatus(viewingProduct) === "Low Stock"
                                                        ? "bg-orange-500"
                                                        : "bg-gray-500"
                                                        }`}
                                                ></span>
                                                {viewingProduct.sizes.reduce((sum, size) => sum + size.stock, 0)} units
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description Section */}
                            {viewingProduct.description && (
                                <div className="border-t border-[#f3e7e9] pt-6">
                                    <h4 className="font-bold text-text-main mb-4">Description</h4>
                                    <p className="text-text-secondary">{viewingProduct.description}</p>
                                </div>
                            )}

                            {/* Images Section */}
                            {viewingProduct.images && viewingProduct.images.length > 0 && (
                                <div className="border-t border-[#f3e7e9] pt-6">
                                    <h4 className="font-bold text-text-main mb-4">Product Images ({viewingProduct.images.length})</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {viewingProduct.images.map((imageName, index) => (
                                            <div key={index} className="relative group">
                                                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                                                    <img
                                                        src={getImageUrl(imageName)}
                                                        alt={`Product Image ${index + 1}`}
                                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="mt-1 text-xs text-text-secondary text-center">
                                                    Image {index + 1}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Sizes & Stock Section */}
                            <div className="border-t border-[#f3e7e9] pt-6">
                                <h4 className="font-bold text-text-main mb-4">Size & Stock Details</h4>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                                        {viewingProduct.sizes.map((size, index) => (
                                            <div key={index} className="text-center">
                                                <div className="font-bold text-lg text-text-main mb-1">{size.size}</div>
                                                <div className={`px-3 py-1 rounded-full text-sm font-bold ${size.stock === 0
                                                    ? "bg-red-100 text-red-800"
                                                    : size.stock <= 5
                                                    ? "bg-orange-100 text-orange-800"
                                                    : size.stock <= 15
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-green-100 text-green-800"
                                                    }`}>
                                                    {size.stock} units
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Product Dates */}
                            <div className="border-t border-[#f3e7e9] pt-6 mt-6">
                                <h4 className="font-bold text-text-main mb-4">Product Dates</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-text-secondary">Created At</p>
                                        <p className="font-medium">
                                            {viewingProduct.createdAt ? formatDateForDisplay(viewingProduct.createdAt).date : 'N/A'}
                                            <br />
                                            <span className="text-xs opacity-70">
                                                {viewingProduct.createdAt ? formatDateForDisplay(viewingProduct.createdAt).time : ''}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-text-secondary">Last Updated</p>
                                        <p className="font-medium">
                                            {viewingProduct.updatedAt ? formatDateForDisplay(viewingProduct.updatedAt).date : 'N/A'}
                                            <br />
                                            <span className="text-xs opacity-70">
                                                {viewingProduct.updatedAt ? formatDateForDisplay(viewingProduct.updatedAt).time : ''}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-[#f3e7e9] flex justify-end">
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="px-5 py-2.5 bg-[#ee2b4b] text-white rounded-xl font-medium shadow-sm transition-all active:scale-95"
                            >
                                Close
                            </button>
                        </div>
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
                                    disabled={isSubmitting}
                                    className="px-5 py-2.5 bg-red-600 text-white rounded-xl font-medium shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700"
                                >
                                    {isSubmitting ? "Deleting..." : "Delete Product"}
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