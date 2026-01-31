"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, } from "react";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { authApi } from "@/services/authApi";
import { AuthContextType, User, SignupRequest, OTPRequest, PasswordResetRequest, UpdateUserRequest, } from "@/interfaces/authInterface";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initializeAuth = async () => {
            const savedToken = Cookies.get("token");
            if (savedToken) {
                setToken(savedToken);
                setIsAuthenticated(true);
                try {
                    const res = await authApi.getCurrentUser();
                    setUser(res.user);
                } catch (err: unknown) {
                    console.error("Failed to fetch current user:", err);
                    const error = err as AxiosError<{ message: string }> | Error;
                    if ('response' in error && error.response?.data?.message) {
                        setError(error.response.data.message);
                    } else if ('message' in error) {
                        setError(error.message || "Failed to fetch user");
                    } else {
                        setError("Failed to fetch user");
                    }
                    clearAuthState();
                }
            }
            setIsLoading(false);
        };

        initializeAuth();
    }, []);

    const updateAuthState = (token: string, user: User) => {
        Cookies.set("token", token, { expires: 1 });
        setToken(token);
        setUser(user);
        setIsAuthenticated(true);
        setError(null);
    };

    const clearAuthState = () => {
        Cookies.remove("token");
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
    };

    const handleError = (err: unknown) => {
        const error = err as AxiosError<{ message: string }> | Error;
        if ('response' in error && error.response?.data?.message) {
            setError(error.response.data.message);
        } else if ('message' in error) {
            setError(error.message || "Something went wrong");
        } else {
            setError("Something went wrong");
        }
    };

    // ---------------- LOGIN ----------------
    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const res = await authApi.login({ email, password });
            updateAuthState(res.token, res.user);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------- LOGOUT ----------------
    const logout = () => clearAuthState();

    // ---------------- SIGNUP OTP ----------------
    const requestSignupOtp = async (data: SignupRequest) => {
        try {
            setIsLoading(true);
            await authApi.requestSignupOtp(data);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const verifySignupOtp = async (data: OTPRequest) => {
        try {
            setIsLoading(true);
            const res = await authApi.verifySignupOtp(data);
            updateAuthState(res.token, res.user);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------- PASSWORD RESET FLOW ----------------
    const requestPasswordResetOtp = async (email: string) => {
        try {
            setIsLoading(true);
            await authApi.requestPasswordResetOtp({ email });
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const verifyPasswordResetOtp = async (data: OTPRequest) => {
        try {
            setIsLoading(true);
            await authApi.verifyPasswordResetOtp(data);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const resetPassword = async (data: PasswordResetRequest) => {
        try {
            setIsLoading(true);
            await authApi.resetPassword(data);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------- GET CURRENT USER ----------------
    const getCurrentUser = async () => {
        try {
            setIsLoading(true);
            const res = await authApi.getCurrentUser();
            setUser(res.user);
            setIsAuthenticated(true);
        } catch (err) {
            handleError(err);
            clearAuthState();
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------- UPDATE CURRENT USER ----------------
    const updateCurrentUser = async (data: UpdateUserRequest) => {
        try {
            setIsLoading(true);
            const res = await authApi.updateCurrentUser(data);
            setUser(res.user);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                isLoading,
                error,
                login,
                logout,
                requestSignupOtp,
                verifySignupOtp,
                requestPasswordResetOtp,
                verifyPasswordResetOtp,
                resetPassword,
                getCurrentUser,
                updateCurrentUser,
                clearError: () => setError(null),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};