"use client";

import React, { useState, useEffect } from "react";
import { MdOutlineEdit, MdDeleteOutline, MdOutlineVisibility, MdClose, } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { showToast } from "@/utils/toast";
import { User } from "@/interfaces/userInterface";
import { useUser } from "@/context/UserContext";

const AdminUsersManagement: React.FC = () => {
    const { users, isLoading, fetchUsers, deleteUser, toggleActive, clearError, } = useUser();

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [roleFilter, setRoleFilter] = useState("All");

    // State for modals
    const [showEditActiveModal, setShowEditActiveModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    // State for editing active status
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [newActiveStatus, setNewActiveStatus] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State for deleting
    const [deletingUser, setDeletingUser] = useState<User | null>(null);

    // State for viewing
    const [viewingUser, setViewingUser] = useState<User | null>(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Clear error when component unmounts
    useEffect(() => {
        return () => {
            clearError();
        };
    }, []);

    // Format date for display
    const formatDateForDisplay = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
    };

    // Get user status based on isActive
    const getUserStatus = (isActive: boolean): "Active" | "Inactive" => {
        return isActive ? "Active" : "Inactive";
    };

    // Get initials for avatar
    const getInitials = (firstName: string | undefined, lastName: string | undefined) => {
        const first = firstName?.charAt(0) ?? 'U';
        const last = lastName?.charAt(0) ?? 'U';
        return `${first}${last}`.toUpperCase();
    };

    // Get random color for avatar
    const getRandomColor = () => {
        const colors = [
            'bg-blue-100 text-blue-800',
            'bg-green-100 text-green-800',
            'bg-purple-100 text-purple-800',
            'bg-yellow-100 text-yellow-800',
            'bg-pink-100 text-pink-800',
            'bg-indigo-100 text-indigo-800'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    // Process users for display
    const processedUsers = users.map(user => ({
        ...user,
        status: getUserStatus(user.isActive),
        avatarInitials: getInitials(user.firstName, user.lastName),
        avatarColor: getRandomColor(),
        registeredDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
        registeredTime: user.createdAt ? new Date(user.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : ''
    }));

    // Filter users based on search and filters
    const filteredUsers = processedUsers.filter((user) => {
        const matchesSearch =
            String(user.firstName).toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(user.lastName).toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(user.email).toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(user.username).toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(user._id).toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
            statusFilter === "All" ||
            user.status === statusFilter;

        const matchesRole =
            roleFilter === "All" ||
            user.role === roleFilter;

        return matchesSearch && matchesStatus && matchesRole;
    });

    // Calculate pagination values
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Handle edit active status
    const handleEditActiveStatus = (user: User) => {
        setEditingUser(user);
        setNewActiveStatus(user.isActive);
        setShowEditActiveModal(true);
    };

    // Handle view user details
    const handleViewUser = (user: User) => {
        setViewingUser(user);
        setShowViewModal(true);
    };

    // Handle delete click
    const handleDeleteClick = (user: User) => {
        setDeletingUser(user);
        setShowDeleteModal(true);
    };

    // Confirm delete
    const handleConfirmDelete = async () => {
        if (deletingUser && deletingUser._id) {
            try {
                setIsSubmitting(true);

                await deleteUser(deletingUser._id);

                showToast('success', "User deleted successfully");
                setShowDeleteModal(false);
                setDeletingUser(null);

                if (currentUsers.length === 1 && currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                showToast('error', "Failed to delete user");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    // Confirm edit active status
    const handleConfirmEditActive = async () => {
        if (editingUser && editingUser._id) {
            try {
                setIsSubmitting(true);
                console.log("Toggling active status for user ID:", editingUser._id);

                await toggleActive(editingUser._id);

                showToast('success', `User ${newActiveStatus ? 'activated' : 'deactivated'} successfully`);
                setShowEditActiveModal(false);
                setEditingUser(null);

                await fetchUsers();

            } catch (error) {
                console.error("Error updating user status:", error);
                showToast('error', "Failed to update user status");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    // Refresh users list
    const handleRefreshUsers = async () => {
        try {
            await fetchUsers();
            showToast('success', "Users list refreshed");
        } catch (error) {
            console.error("Error refreshing users:", error);
            showToast('error', "Failed to refresh users");
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

    return (
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-black text-text-main tracking-tight">
                            User Management
                        </h2>
                        <p className="text-text-secondary">
                            View and manage all registered users.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleRefreshUsers}
                            disabled={isLoading}
                            className="px-4 py-2 text-white text-text-main rounded-xl font-medium bg-red-500 disabled:opacity-50 transition-colors"
                        >
                            {isLoading ? "Refreshing..." : "Refresh Users"}
                        </button>
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
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            {/* Role Filter */}
                            <div>
                                <select
                                    className="pl-4 pr-10 py-2 bg-[#f8f6f6] border-none rounded-xl text-sm text-text-main focus:ring-2 focus:ring-[#ee2b4b]/20"
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                >
                                    <option value="All">All Roles</option>
                                    <option value="admin">Admin</option>
                                    <option value="customer">Customer</option>
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
                                    placeholder="Filter by name, email, username, or ID..."
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
                            <p className="text-text-main">Loading users...</p>
                        </div>
                    </div>
                )}

                {/* Users Table */}
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
                                        <th className="px-6 py-4 font-semibold">User</th>
                                        <th className="px-6 py-4 font-semibold">User ID</th>
                                        <th className="px-6 py-4 font-semibold">Role</th>
                                        <th className="px-6 py-4 font-semibold">Registered</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#f3e7e9]">
                                    {currentUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-8 text-center text-text-secondary">
                                                {users.length === 0 ? "No users found" : "No users match your filters"}
                                            </td>
                                        </tr>
                                    ) : (
                                        currentUsers.map((user) => (
                                            <tr
                                                key={user._id}
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
                                                        {user.profileImage ? (
                                                            <div
                                                                className="w-10 h-10 rounded-full bg-cover bg-center"
                                                                style={{ backgroundImage: `url(${user.profileImage})` }}
                                                            />
                                                        ) : (
                                                            <div
                                                                className={`w-10 h-10 rounded-full ${user.avatarColor} flex items-center justify-center text-sm font-bold`}
                                                            >
                                                                {user.avatarInitials}
                                                            </div>
                                                        )}
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-medium text-text-main">
                                                                {user.firstName} {user.lastName}
                                                            </span>
                                                            <span className="text-xs text-text-secondary">
                                                                {user.email}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-bold text-[#ee2b4b]">
                                                    {user._id}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${user.role === "admin"
                                                            ? "bg-purple-100 text-purple-800 border-purple-200"
                                                            : "bg-blue-100 text-blue-800 border-blue-200"
                                                            }`}
                                                    >
                                                        {user.role === "admin" ? "Admin" : "Customer"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-text-secondary">
                                                    {user.registeredDate} <br />
                                                    <span className="text-xs opacity-70">
                                                        {user.registeredTime}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${user.isActive
                                                            ? "bg-green-100 text-green-800 border-green-200"
                                                            : "bg-gray-100 text-gray-800 border-gray-200"
                                                            }`}
                                                    >
                                                        <span
                                                            className={`w-2 h-2 rounded-full mr-1 ${user.isActive
                                                                ? "bg-green-500"
                                                                : "bg-gray-500"
                                                                }`}
                                                        ></span>
                                                        {user.isActive ? "Active" : "Inactive"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleViewUser(user)}
                                                            className="size-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                            title="View Details"
                                                        >
                                                            <MdOutlineVisibility size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleEditActiveStatus(user)}
                                                            className="size-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-[#ee2b4b] hover:bg-[#ee2b4b]/5 transition-colors"
                                                            title="Edit Active Status"
                                                        >
                                                            <MdOutlineEdit size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteClick(user)}
                                                            className="size-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-red-600 hover:bg-red-50 transition-colors"
                                                            title="Delete User"
                                                        >
                                                            <MdDeleteOutline size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {filteredUsers.length > 0 && (
                            <div className="px-6 py-4 border-t border-[#f3e7e9] flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-sm text-text-secondary">
                                    Showing <span className="font-bold text-text-main">{indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)}</span> of{" "}
                                    <span className="font-bold text-text-main">{filteredUsers.length}</span> users
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

            {/* Edit Active Status Modal */}
            {showEditActiveModal && editingUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md">
                        <div className="p-6 border-b border-[#f3e7e9]">
                            <h3 className="text-xl font-bold text-text-main">
                                {newActiveStatus ? 'Activate User' : 'Deactivate User'}
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-6">
                                {editingUser.profileImage ? (
                                    <div
                                        className="w-16 h-16 rounded-full bg-cover bg-center"
                                        style={{ backgroundImage: `url(${editingUser.profileImage})` }}
                                    />
                                ) : (
                                    <div
                                        className={`w-16 h-16 rounded-full ${getRandomColor()} flex items-center justify-center text-lg font-bold`}
                                    >
                                        {getInitials(editingUser.firstName ?? '', editingUser.lastName ?? '')}
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-bold text-text-main">
                                        {editingUser.firstName ?? 'User'} {editingUser.lastName ?? ''}
                                    </h4>
                                    <p className="text-text-secondary text-sm">{editingUser.email ?? ''}</p>
                                    <p className="text-text-secondary text-sm">ID: {editingUser._id ?? ''}</p>
                                </div>
                            </div>

                            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-text-main font-medium">Current Status:</span>
                                    <span
                                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold border ${editingUser.isActive
                                            ? "bg-green-100 text-green-800 border-green-200"
                                            : "bg-gray-100 text-gray-800 border-gray-200"
                                            }`}
                                    >
                                        {editingUser.isActive ? "Active" : "Inactive"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-text-main font-medium">New Status:</span>
                                    <span
                                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold border ${newActiveStatus
                                            ? "bg-green-100 text-green-800 border-green-200"
                                            : "bg-gray-100 text-gray-800 border-gray-200"
                                            }`}
                                    >
                                        {newActiveStatus ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={newActiveStatus}
                                            onChange={(e) => setNewActiveStatus(e.target.checked)}
                                            className="sr-only"
                                        />
                                        <div className='block w-14 h-7 rounded-full transition-colors bg-red-500'></div>
                                        <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${newActiveStatus ? 'transform translate-x-7' : ''}`}></div>
                                    </div>
                                    <span className="text-text-main font-medium">
                                        {newActiveStatus ? 'Activate User' : 'Deactivate User'}
                                    </span>
                                </label>
                                <p className="text-text-secondary text-sm mt-2">
                                    {newActiveStatus
                                        ? "Activating this user will allow them to access the system."
                                        : "Deactivating this user will prevent them from accessing the system."
                                    }
                                </p>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => {
                                        setShowEditActiveModal(false);
                                        setEditingUser(null);
                                    }}
                                    className="px-5 py-2.5 text-text-main hover:bg-gray-50 rounded-xl font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmEditActive}
                                    disabled={isSubmitting}
                                    className='px-5 py-2.5 text-white rounded-xl font-medium shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed bg-red-600 hover:bg-red-700'
                                >
                                    {isSubmitting ? "Processing..." : newActiveStatus ? "Activate User" : "Deactivate User"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* View User Details Modal */}
            {showViewModal && viewingUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-[#f3e7e9] flex justify-between items-center">
                            <h3 className="text-xl font-bold text-text-main">User Details</h3>
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="text-text-secondary hover:text-text-main"
                            >
                                <MdClose size={24} />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row gap-6 mb-6">
                                <div className="flex flex-col items-center">
                                    {viewingUser.profileImage ? (
                                        <div
                                            className="w-24 h-24 rounded-full bg-cover bg-center mb-4"
                                            style={{ backgroundImage: `url(${viewingUser.profileImage})` }}
                                        />
                                    ) : (
                                        <div
                                            className={`w-24 h-24 rounded-full ${getRandomColor()} flex items-center justify-center text-2xl font-bold mb-4`}
                                        >
                                            {getInitials(viewingUser.firstName ?? '', viewingUser.lastName ?? '')}
                                        </div>
                                    )}
                                    <div className="text-center">
                                        <h4 className="text-lg font-bold text-text-main">
                                            {viewingUser.firstName ?? 'User'} {viewingUser.lastName ?? ''}
                                        </h4>
                                        <p className="text-text-secondary">{viewingUser.email ?? ''}</p>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-sm text-text-secondary">Username</p>
                                            <p className="font-medium">{viewingUser.username ?? 'N/A'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-text-secondary">User ID</p>
                                            <p className="font-medium text-[#ee2b4b]">{viewingUser._id ?? 'N/A'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-text-secondary">Role</p>
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${viewingUser.role === "admin"
                                                    ? "bg-purple-100 text-purple-800 border-purple-200"
                                                    : "bg-blue-100 text-blue-800 border-blue-200"
                                                    }`}
                                            >
                                                {viewingUser.role === "admin" ? "Admin" : "Customer"}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-text-secondary">Status</p>
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${viewingUser.isActive
                                                    ? "bg-green-100 text-green-800 border-green-200"
                                                    : "bg-gray-100 text-gray-800 border-gray-200"
                                                    }`}
                                            >
                                                <span
                                                    className={`w-2 h-2 rounded-full mr-1 ${viewingUser.isActive
                                                        ? "bg-green-500"
                                                        : "bg-gray-500"
                                                        }`}
                                                ></span>
                                                {viewingUser.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-text-secondary">Phone Number</p>
                                            <p className="font-medium">{viewingUser.phoneNumber || "Not provided"}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-text-secondary">Account Created</p>
                                            <p className="font-medium">{viewingUser.createdAt ? formatDateForDisplay(viewingUser.createdAt).date : 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Address Section */}
                            {viewingUser.address && (
                                <div className="border-t border-[#f3e7e9] pt-6">
                                    <h4 className="font-bold text-text-main mb-4">Address Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-sm text-text-secondary">Street</p>
                                            <p className="font-medium">{viewingUser.address.street || "Not provided"}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-text-secondary">City</p>
                                            <p className="font-medium">{viewingUser.address.city || "Not provided"}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-text-secondary">State</p>
                                            <p className="font-medium">{viewingUser.address.state || "Not provided"}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-text-secondary">Zip Code</p>
                                            <p className="font-medium">{viewingUser.address.zipCode || "Not provided"}</p>
                                        </div>
                                        <div className="md:col-span-2 space-y-1">
                                            <p className="text-sm text-text-secondary">Country</p>
                                            <p className="font-medium">{viewingUser.address.country || "Not provided"}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Account Dates */}
                            <div className="border-t border-[#f3e7e9] pt-6 mt-6">
                                <h4 className="font-bold text-text-main mb-4">Account Dates</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-text-secondary">Created At</p>
                                        <p className="font-medium">{viewingUser.createdAt ? new Date(viewingUser.createdAt).toLocaleString() : 'N/A'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-text-secondary">Last Updated</p>
                                        <p className="font-medium">{viewingUser.updatedAt ? new Date(viewingUser.updatedAt).toLocaleString() : 'N/A'}</p>
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
            {showDeleteModal && deletingUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md">
                        <div className="p-6 border-b border-[#f3e7e9]">
                            <h3 className="text-xl font-bold text-text-main">Delete User</h3>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-6">
                                {deletingUser.profileImage ? (
                                    <div
                                        className="w-16 h-16 rounded-full bg-cover bg-center"
                                        style={{ backgroundImage: `url(${deletingUser.profileImage})` }}
                                    />
                                ) : (
                                    <div
                                        className={`w-16 h-16 rounded-full ${getRandomColor()} flex items-center justify-center text-lg font-bold`}
                                    >
                                        {getInitials(deletingUser.firstName ?? '', deletingUser.lastName ?? '')}
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-bold text-text-main">
                                        {deletingUser.firstName ?? 'User'} {deletingUser.lastName ?? ''}
                                    </h4>
                                    <p className="text-text-secondary text-sm">{deletingUser.email ?? ''}</p>
                                    <p className="text-text-secondary text-sm">ID: {deletingUser._id ?? ''}</p>
                                </div>
                            </div>
                            <p className="text-text-secondary mb-6">
                                Are you sure you want to delete this user? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setDeletingUser(null);
                                    }}
                                    className="px-5 py-2.5 text-text-main hover:bg-gray-50 rounded-xl font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    disabled={isSubmitting}
                                    className="px-5 py-2.5 bg-red-600 text-white rounded-xl font-medium shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Deleting..." : "Delete User"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsersManagement;