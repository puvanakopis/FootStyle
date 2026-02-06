"use client";

import React, { createContext, useContext, useState, ReactNode, } from "react";
import { AxiosError } from "axios";
import { userApi } from "@/services/userApi";
import { UserContextType, User, } from "@/interfaces/userInterface";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ---------------- ERROR HANDLER ----------------
    const handleError = (err: unknown) => {
        const error = err as AxiosError<{ message: string }> | Error;

        if ("response" in error && error.response?.data?.message) {
            setError(error.response.data.message);
        } else if ("message" in error) {
            setError(error.message || "Something went wrong");
        } else {
            setError("Something went wrong");
        }
    };

    // ---------------- FETCH ALL USERS ----------------
    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const fetchedUsers = await userApi.getUsers();
            setUsers(fetchedUsers);
        } catch (err) {
            handleError(err);
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------- DELETE USER ----------------
    const deleteUser = async (id: string) => {
        try {
            setIsLoading(true);
            await userApi.deleteUser(id);
            fetchUsers();

            setUsers((prev) => prev.filter((user) => user._id !== id));
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------- TOGGLE ACTIVE / INACTIVE ----------------
    const toggleActive = async (id: string) => {
        try {
            setIsLoading(true);
            await userApi.toggleUserActive(id);
            fetchUsers();
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------- CLEAR ERROR ----------------
    const clearError = () => {
        setError(null);
    };

    return (
        <UserContext.Provider
            value={{
                users,
                isLoading,
                error,
                fetchUsers,
                deleteUser,
                toggleActive,
                clearError,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};