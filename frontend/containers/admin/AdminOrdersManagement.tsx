"use client";

import React, { useState, useEffect } from "react";
import { MdOutlineEdit, MdOutlineVisibility, MdClose, MdDeleteOutline, MdPayment } from "react-icons/md";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { useOrder } from "@/context/OrderContext";
import { showToast } from "@/utils/toast";
import { Order, Address, UpdateOrderStatusRequest, AddPaymentRequest } from "@/interfaces/orderInterface";

type OrderFormData = {
    status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Returned";
    shippingAddress: Address;
    paymentStatus: "Pending" | "Paid" | "Failed" | "Refunded";
};

type PaymentFormData = {
    method: "Card" | "PayPal" | "GooglePay" | "Wallet" | "COD";
    status: "Pending" | "Paid" | "Failed" | "Refunded";
    transactionId?: string;
};

const AdminOrdersManagement = () => {
    const {
        getAllOrders,
        getOrderById,
        updateOrderStatus,
        addPaymentToOrder,
        allOrders,
        allOrdersLoading,
        allOrdersError,
        currentOrder,
        orderLoading,
        addPaymentLoading
    } = useOrder();

    // State for filters
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [paymentFilter, setPaymentFilter] = useState("All");
    const [dateFilter, setDateFilter] = useState("Last 30 Days");

    // State for modals
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false); // New payment modal

    // State for form data
    const [formData, setFormData] = useState<OrderFormData>({
        status: "Pending",
        shippingAddress: {
            fullName: "",
            phoneNumber: "",
            email: "",
            street: "",
            city: "",
            province: "",
            postalCode: "",
            country: "",
        },
        paymentStatus: "Pending",
    });

    // State for payment form data
    const [paymentFormData, setPaymentFormData] = useState<PaymentFormData>({
        method: "COD",
        status: "Pending",
        transactionId: ""
    });

    // Other states
    const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
    const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
    const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
    const [updatingPaymentOrderId, setUpdatingPaymentOrderId] = useState<string | null>(null); // New state
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    // Fetch orders on component mount
    useEffect(() => {
        getAllOrders();
    }, []);

    // Update form data when currentOrder changes (for edit modal)
    useEffect(() => {
        if (currentOrder && editingOrderId) {
            setFormData({
                status: currentOrder.status,
                shippingAddress: currentOrder.shippingAddress,
                paymentStatus: currentOrder.payment.status,
            });
        }
    }, [currentOrder, editingOrderId]);

    // Update payment form data when currentOrder changes (for payment modal)
    useEffect(() => {
        if (currentOrder && updatingPaymentOrderId) {
            setPaymentFormData({
                method: currentOrder.payment.method,
                status: currentOrder.payment.status,
                transactionId: currentOrder.payment.transactionId || ""
            });
        }
    }, [currentOrder, updatingPaymentOrderId]);

    // Show error toast if there's an error
    useEffect(() => {
        if (allOrdersError) {
            showToast("error", allOrdersError);
        }
    }, [allOrdersError]);

    // Get user initials and color
    const getUserInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const getRandomColor = (seed: string) => {
        const colors = [
            "bg-[#ee2b4b]/10",
            "bg-blue-100",
            "bg-orange-100",
            "bg-purple-100",
            "bg-teal-100",
            "bg-green-100",
            "bg-yellow-100",
            "bg-pink-100",
        ];
        const index = Math.abs(seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;
        return colors[index];
    };

    // Format date for display
    const formatDateForDisplay = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
    };

    // Get payment status color
    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case "Paid": return "bg-green-100 text-green-800 border-green-200";
            case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Failed": return "bg-red-100 text-red-800 border-red-200";
            case "Refunded": return "bg-purple-100 text-purple-800 border-purple-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    // Get order status color
    const getOrderStatusColor = (status: string) => {
        switch (status) {
            case "Delivered": return "bg-green-100 text-green-800 border-green-200";
            case "Processing": return "bg-blue-100 text-blue-800 border-blue-200";
            case "Shipped": return "bg-indigo-100 text-indigo-800 border-indigo-200";
            case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Cancelled": return "bg-red-100 text-red-800 border-red-200";
            case "Returned": return "bg-purple-100 text-purple-800 border-purple-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    // Filter orders based on search and filters
    const filteredOrders = allOrders.filter((order) => {
        const matchesSearch =
            order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (typeof order.user !== 'string' && order.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (typeof order.user !== 'string' && order.user?.email?.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesStatus =
            statusFilter === "All" ||
            order.status === statusFilter;

        const matchesPayment =
            paymentFilter === "All" ||
            order.payment.status === paymentFilter;

        return matchesSearch && matchesStatus && matchesPayment;
    });

    // Calculate pagination values
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Handle edit order
    const handleEditOrder = async (orderId: string) => {
        try {
            await getOrderById(orderId);
            setEditingOrderId(orderId);
            setShowEditModal(true);
        } catch (error) {
            console.error("Error fetching order details:", error);
            showToast('error', "Failed to load order details");
        }
    };

    // Handle view order details
    const handleViewOrder = async (orderId: string) => {
        try {
            await getOrderById(orderId);
            const orderToView = allOrders.find(o => o._id === orderId) || null;
            setViewingOrder(orderToView);
            setShowViewModal(true);
        } catch (error) {
            console.error("Error fetching order details:", error);
            showToast('error', "Failed to load order details");
        }
    };

    // Handle cancel order
    const handleCancelOrder = (orderId: string) => {
        setCancellingOrderId(orderId);
        setShowCancelModal(true);
    };

    // Handle update payment
    const handleUpdatePayment = async (orderId: string) => {
        try {
            await getOrderById(orderId);
            setUpdatingPaymentOrderId(orderId);
            setShowPaymentModal(true);
        } catch (error) {
            console.error("Error fetching order details:", error);
            showToast('error', "Failed to load order details");
        }
    };

    // Confirm cancel
    const handleConfirmCancel = async () => {
        if (cancellingOrderId) {
            try {
                setIsSubmitting(true);
                const updateData: UpdateOrderStatusRequest = { status: "Cancelled" };
                await updateOrderStatus(cancellingOrderId, updateData);
                showToast('success', "Order cancelled successfully");
                setShowCancelModal(false);
                setCancellingOrderId(null);
            } catch (error) {
                console.error("Error cancelling order:", error);
                showToast('error', "Failed to cancel order");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    // Handle payment form input changes
    const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPaymentFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle payment update
    const handlePaymentUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (updatingPaymentOrderId) {
            try {
                setIsSubmitting(true);

                // Prepare payment data
                const paymentData: AddPaymentRequest = {
                    method: paymentFormData.method,
                    ...(paymentFormData.transactionId && { transactionId: paymentFormData.transactionId })
                };

                // Update payment
                await addPaymentToOrder(updatingPaymentOrderId, paymentData);

                // If status is also changed, update it separately
                if (currentOrder && currentOrder.payment.status !== paymentFormData.status) {
                    showToast('info', 'Payment method updated. Note: Payment status changes may require separate processing.');
                }

                showToast('success', "Payment information updated successfully");
                setShowPaymentModal(false);
                setUpdatingPaymentOrderId(null);
            } catch (error) {
                console.error("Error updating payment:", error);
                showToast('error', "Failed to update payment information");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name.startsWith("shippingAddress.")) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                shippingAddress: {
                    ...prev.shippingAddress,
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Handle status update
    const handleStatusUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingOrderId) {
            try {
                setIsSubmitting(true);
                const updateData: UpdateOrderStatusRequest = { status: formData.status };
                await updateOrderStatus(editingOrderId, updateData);
                showToast('success', "Order status updated successfully");
                setShowEditModal(false);
                setEditingOrderId(null);
            } catch (error) {
                console.error("Error updating order:", error);
                showToast('error', "Failed to update order status");
            } finally {
                setIsSubmitting(false);
            }
        }
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

    // Payment methods options
    const paymentMethods = [
        { value: "COD", label: "Cash on Delivery" },
        { value: "Card", label: "Credit/Debit Card" },
        { value: "PayPal", label: "PayPal" },
        { value: "GooglePay", label: "Google Pay" },
        { value: "Wallet", label: "Digital Wallet" }
    ];

    return (
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-black text-text-main tracking-tight">
                            Orders Management
                        </h2>
                        <p className="text-text-secondary">
                            View and manage all customer orders and their status.
                        </p>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-4 bg-white p-1 rounded-2xl border border-[#f3e7e9] shadow-sm flex flex-col md:flex-row items-center justify-between gap-2">
                        <div className="flex-1 flex items-center w-full p-2 gap-2">
                            {/* Status Filter */}
                            <div>
                                <select
                                    className="pl-4 pr-10 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm text-text-main focus:ring-2 focus:ring-[#ee2b4b]/20"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="All">All Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Returned">Returned</option>
                                </select>
                            </div>

                            {/* Payment Filter */}
                            <div>
                                <select
                                    className="pl-4 pr-10 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm text-text-main focus:ring-2 focus:ring-[#ee2b4b]/20"
                                    value={paymentFilter}
                                    onChange={(e) => setPaymentFilter(e.target.value)}
                                >
                                    <option value="All">All Payments</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Refunded">Refunded</option>
                                </select>
                            </div>

                            {/* Date Filter */}
                            <div>
                                <select
                                    className="pl-4 pr-10 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm text-text-main focus:ring-2 focus:ring-[#ee2b4b]/20"
                                    value={dateFilter}
                                    onChange={(e) => setDateFilter(e.target.value)}
                                >
                                    <option value="Last 30 Days">Last 30 Days</option>
                                    <option value="Last 7 Days">Last 7 Days</option>
                                    <option value="Today">Today</option>
                                    <option value="This Month">This Month</option>
                                    <option value="Last Month">Last Month</option>
                                    <option value="All Time">All Time</option>
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
                                    placeholder="Search by order ID, customer name, or email..."
                                    className="w-full md:w-64 pl-9 pr-4 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#ee2b4b]/20 focus:outline-none placeholder-text-secondary/70"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {allOrdersLoading && (
                    <div className="bg-white rounded-2xl border border-[#f3e7e9] shadow-sm p-8 text-center">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ee2b4b]"></div>
                            <p className="text-text-main">Loading orders...</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {allOrdersError && !allOrdersLoading && (
                    <div className="bg-white rounded-2xl border border-[#f3e7e9] shadow-sm p-8 text-center">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <p className="text-red-600 font-medium">Error loading orders</p>
                            <p className="text-text-secondary">{allOrdersError}</p>
                            <button
                                onClick={() => getAllOrders()}
                                className="px-4 py-2 bg-[#ee2b4b] text-white rounded-xl font-medium hover:bg-[#ee2b4b]/90"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                )}

                {/* Orders Table */}
                {!allOrdersLoading && !allOrdersError && (
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
                                        <th className="px-6 py-4 font-semibold">Order ID</th>
                                        <th className="px-6 py-4 font-semibold">Customer</th>
                                        <th className="px-6 py-4 font-semibold">Date</th>
                                        <th className="px-6 py-4 font-semibold">Total</th>
                                        <th className="px-6 py-4 font-semibold">Payment</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#f3e7e9]">
                                    {currentOrders.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="px-6 py-8 text-center text-text-secondary">
                                                {allOrders.length === 0 ? "No orders found" : "No orders match your filters"}
                                            </td>
                                        </tr>
                                    ) : (
                                        currentOrders.map((order) => {
                                            const customerName = typeof order.user !== 'string' ? order.user?.name || 'N/A' : 'N/A';
                                            const customerEmail = typeof order.user !== 'string' ? order.user?.email || 'N/A' : 'N/A';
                                            const formattedDate = order.createdAt ? formatDateForDisplay(order.createdAt) : { date: 'N/A', time: '' };
                                            const initials = getUserInitials(customerName);
                                            const color = getRandomColor(order._id);

                                            return (
                                                <tr
                                                    key={order._id}
                                                    className="hover:bg-gray-50 transition-colors group"
                                                >
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="checkbox"
                                                            className="rounded border-gray-300 text-[#ee2b4b] focus:ring-[#ee2b4b]/20 bg-white"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-bold text-[#ee2b4b]">
                                                        <a
                                                            className="hover:underline cursor-pointer"
                                                            onClick={() => handleViewOrder(order._id)}
                                                        >
                                                            #{order._id.slice(-8).toUpperCase()}
                                                        </a>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className={`size-8 rounded-full ${color} flex items-center justify-center text-[#ee2b4b] text-xs font-bold`}
                                                            >
                                                                {initials}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-medium text-text-main">
                                                                    {customerName}
                                                                </span>
                                                                <span className="text-xs text-text-secondary">
                                                                    {customerEmail}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-text-secondary">
                                                        {formattedDate.date} <br />
                                                        <span className="text-xs opacity-70">{formattedDate.time}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-bold text-text-main">
                                                        Rs. {order.total.toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getPaymentStatusColor(order.payment.status)}`}
                                                        >
                                                            <span
                                                                className={`w-2 h-2 rounded-full mr-1 ${order.payment.status === "Paid"
                                                                    ? "bg-green-500"
                                                                    : order.payment.status === "Pending"
                                                                        ? "bg-yellow-500"
                                                                        : order.payment.status === "Failed"
                                                                            ? "bg-red-500"
                                                                            : "bg-purple-500"
                                                                    }`}
                                                            ></span>
                                                            {order.payment.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getOrderStatusColor(order.status)}`}
                                                        >
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => handleViewOrder(order._id)}
                                                                className="size-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                                title="View Details"
                                                            >
                                                                <MdOutlineVisibility size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleUpdatePayment(order._id)}
                                                                className="size-8 flex items-center justify-center rounded-lg text-text-secondary hover:bg-[#ee2b4b] transition-colors"
                                                                title="Update Payment"
                                                            >
                                                                <MdPayment size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleEditOrder(order._id)}
                                                                className="size-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-[#ee2b4b] hover:bg-[#ee2b4b]/5 transition-colors"
                                                                title="Edit Order"
                                                            >
                                                                <MdOutlineEdit size={18} />
                                                            </button>
                                                            {order.status !== "Cancelled" && order.status !== "Delivered" && (
                                                                <button
                                                                    onClick={() => handleCancelOrder(order._id)}
                                                                    className="size-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-red-600 hover:bg-red-50 transition-colors"
                                                                    title="Cancel Order"
                                                                >
                                                                    <MdDeleteOutline size={18} />
                                                                </button>
                                                            )}
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
                        {filteredOrders.length > 0 && (
                            <div className="px-6 py-4 border-t border-[#f3e7e9] flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-sm text-text-secondary">
                                    Showing <span className="font-bold text-text-main">{indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, filteredOrders.length)}</span> of{" "}
                                    <span className="font-bold text-text-main">{filteredOrders.length}</span> orders
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

            {/* Edit Order Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-[#f3e7e9]">
                            <h3 className="text-xl font-bold text-text-main">Update Order Status</h3>
                        </div>
                        <form onSubmit={handleStatusUpdate} className="p-6">
                            <div className="space-y-4 mb-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-main block">
                                        Order Status *
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 bg-[#f8f6f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#ee2b4b]/20"
                                        required
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                        <option value="Returned">Returned</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-5 py-2.5 text-text-main hover:bg-gray-50 rounded-xl font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || orderLoading}
                                    className="px-5 py-2.5 bg-[#ee2b4b] text-white rounded-xl font-medium shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ee2b4b]/90"
                                >
                                    {(isSubmitting || orderLoading) ? "Updating..." : "Update Status"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Payment Update Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-[#f3e7e9]">
                            <h3 className="text-xl font-bold text-text-main">Update Payment Information</h3>
                        </div>
                        <form onSubmit={handlePaymentUpdate} className="p-6">
                            <div className="space-y-4 mb-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-main block">
                                        Payment Method *
                                    </label>
                                    <select
                                        name="method"
                                        value={paymentFormData.method}
                                        onChange={handlePaymentInputChange}
                                        className="w-full px-4 py-2.5 bg-[#f8f6f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#ee2b4b]/20"
                                        required
                                    >
                                        {paymentMethods.map(method => (
                                            <option key={method.value} value={method.value}>
                                                {method.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-main block">
                                        Transaction ID (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="transactionId"
                                        value={paymentFormData.transactionId}
                                        onChange={handlePaymentInputChange}
                                        placeholder="Enter transaction ID if available"
                                        className="w-full px-4 py-2.5 bg-[#f8f6f6] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#ee2b4b]/20"
                                    />
                                    <p className="text-xs text-text-secondary mt-1">
                                        Leave empty for Cash on Delivery orders
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-main block">
                                        Current Payment Status
                                    </label>
                                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                                        <span className={`w-3 h-3 rounded-full ${paymentFormData.status === "Paid" ? "bg-green-500" : paymentFormData.status === "Pending" ? "bg-yellow-500" : paymentFormData.status === "Failed" ? "bg-red-500" : "bg-purple-500"}`}></span>
                                        <span className={`font-medium ${getPaymentStatusColor(paymentFormData.status).split(' ')[1]}`}>
                                            {paymentFormData.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-text-secondary mt-1">
                                        Note: Payment status changes may require separate processing.
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowPaymentModal(false)}
                                    className="px-5 py-2.5 text-text-main hover:bg-gray-50 rounded-xl font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || addPaymentLoading}
                                    className="px-5 py-2.5 bg-[#ee2b4b] text-white rounded-xl font-medium shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed "
                                >
                                    {(isSubmitting || addPaymentLoading) ? "Updating..." : "Update Payment"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Order Details Modal */}
            {showViewModal && viewingOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-[#f3e7e9] flex justify-between items-center">
                            <h3 className="text-xl font-bold text-text-main">Order Details</h3>
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="text-text-secondary hover:text-text-main"
                            >
                                <MdClose size={24} />
                            </button>
                        </div>
                        <div className="p-6">
                            {/* Order Header */}
                            <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
                                <div>
                                    <h4 className="text-lg font-bold text-text-main mb-2">
                                        Order #{viewingOrder._id.slice(-8).toUpperCase()}
                                    </h4>
                                    <div className="flex items-center gap-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getOrderStatusColor(viewingOrder.status)}`}
                                        >
                                            {viewingOrder.status}
                                        </span>
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getPaymentStatusColor(viewingOrder.payment.status)}`}
                                        >
                                            {viewingOrder.payment.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-text-secondary">Order Date</p>
                                    <p className="font-medium">
                                        {viewingOrder.createdAt ? formatDateForDisplay(viewingOrder.createdAt).date : 'N/A'}
                                        <br />
                                        <span className="text-xs opacity-70">
                                            {viewingOrder.createdAt ? formatDateForDisplay(viewingOrder.createdAt).time : ''}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Customer Information */}
                            <div className="border-t border-[#f3e7e9] pt-6 mb-6">
                                <h4 className="font-bold text-text-main mb-4">Customer Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-text-secondary">Name</p>
                                        <p className="font-medium">
                                            {typeof viewingOrder.user !== 'string' ? viewingOrder.user?.name : 'N/A'}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-text-secondary">Email</p>
                                        <p className="font-medium">
                                            {typeof viewingOrder.user !== 'string' ? viewingOrder.user?.email : 'N/A'}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-text-secondary">Phone</p>
                                        <p className="font-medium">{viewingOrder.shippingAddress.phoneNumber}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="border-t border-[#f3e7e9] pt-6 mb-6">
                                <h4 className="font-bold text-text-main mb-4">Shipping Address</h4>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="font-medium">{viewingOrder.shippingAddress.fullName}</p>
                                    <p className="text-text-secondary">{viewingOrder.shippingAddress.street}</p>
                                    <p className="text-text-secondary">
                                        {viewingOrder.shippingAddress.city}, {viewingOrder.shippingAddress.province} {viewingOrder.shippingAddress.postalCode}
                                    </p>
                                    <p className="text-text-secondary">{viewingOrder.shippingAddress.country}</p>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="border-t border-[#f3e7e9] pt-6 mb-6">
                                <h4 className="font-bold text-text-main mb-4">Order Items ({viewingOrder.items.length})</h4>
                                <div className="space-y-3">
                                    {viewingOrder.items.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                            <div>
                                                <p className="font-medium">
                                                    {typeof item.product === 'string' ? `Product ID: ${item.product}` : item.product.name}
                                                </p>
                                                <p className="text-sm text-text-secondary">
                                                    Size: {item.size} | Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-text-secondary">
                                                    {typeof item.product !== 'string' && item.product.price
                                                        ? `Rs. ${(item.product.price * item.quantity).toLocaleString()}`
                                                        : 'Price unavailable'}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Information */}
                            <div className="border-t border-[#f3e7e9] pt-6 mb-6">
                                <h4 className="font-bold text-text-main mb-4">Payment Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-text-secondary">Payment Method</p>
                                        <p className="font-medium">{viewingOrder.payment.method}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-text-secondary">Transaction ID</p>
                                        <p className="font-medium text-[#ee2b4b]">
                                            {viewingOrder.payment.transactionId || 'N/A'}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-text-secondary">Payment Status</p>
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getPaymentStatusColor(viewingOrder.payment.status)}`}
                                        >
                                            <span
                                                className={`w-2 h-2 rounded-full mr-1 ${viewingOrder.payment.status === "Paid"
                                                    ? "bg-green-500"
                                                    : viewingOrder.payment.status === "Pending"
                                                        ? "bg-yellow-500"
                                                        : viewingOrder.payment.status === "Failed"
                                                            ? "bg-red-500"
                                                            : "bg-purple-500"
                                                    }`}
                                            ></span>
                                            {viewingOrder.payment.status}
                                        </span>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-text-secondary">Actions</p>
                                        <button
                                            onClick={() => {
                                                setShowViewModal(false);
                                                handleUpdatePayment(viewingOrder._id);
                                            }}
                                            className="px-3 py-1.5 text-sm bg-[#ee2b4b] text-white rounded-lg font-medium transition-colors"
                                        >
                                            Update Payment
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="border-t border-[#f3e7e9] pt-6">
                                <h4 className="font-bold text-text-main mb-4">Order Summary</h4>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-text-secondary">Subtotal</span>
                                            <span className="font-medium">Rs. {viewingOrder.subtotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-text-secondary">Shipping Fee</span>
                                            <span className="font-medium">Rs. {viewingOrder.shippingFee.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                                            <span className="font-bold text-text-main">Total</span>
                                            <span className="font-bold text-lg text-text-main">Rs. {viewingOrder.total.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-[#f3e7e9] flex justify-end gap-3">
                            <button
                                onClick={() => handleUpdatePayment(viewingOrder._id)}
                                className="px-5 py-2.5 bg-[#ee2b4b] text-white rounded-xl font-medium shadow-sm transition-all active:scale-95"
                            >
                                Update Payment
                            </button>
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

            {/* Cancel Order Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md">
                        <div className="p-6 border-b border-[#f3e7e9]">
                            <h3 className="text-xl font-bold text-text-main">Cancel Order</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-text-secondary mb-6">
                                Are you sure you want to cancel this order? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => {
                                        setShowCancelModal(false);
                                        setCancellingOrderId(null);
                                    }}
                                    className="px-5 py-2.5 text-text-main hover:bg-gray-50 rounded-xl font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmCancel}
                                    disabled={isSubmitting}
                                    className="px-5 py-2.5 bg-red-600 text-white rounded-xl font-medium shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700"
                                >
                                    {isSubmitting ? "Cancelling..." : "Cancel Order"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrdersManagement;