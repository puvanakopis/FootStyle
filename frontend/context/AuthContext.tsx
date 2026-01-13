'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { authApi } from '@/lib/api/auth';
import { AuthContextType, User } from '@/interfaces/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
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
        // Check for saved token on initial load
        const initializeAuth = () => {
            try {
                const savedToken = Cookies.get('token');

                if (savedToken) {
                    setToken(savedToken);
                    setIsAuthenticated(true);
                }
            } catch (err) {
                console.error('Error loading auth state:', err);
                Cookies.remove('token');
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const updateAuthState = (newToken: string, newUser: User) => {
        setToken(newToken);
        setUser(newUser);
        setIsAuthenticated(true);
        setError(null);
        Cookies.set('token', newToken, { expires: 1 });
    };

    const clearAuthState = () => {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setError(null);

        Cookies.remove('token');
    };

    const handleError = (err: any) => {
        let errorMessage = 'An error occurred';

        if (err.response?.data?.message) {
            errorMessage = err.response.data.message;
        } else if (err.message) {
            errorMessage = err.message;
        }

        setError(errorMessage);
    };

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await authApi.login({ email, password });
            updateAuthState(response.token, response.user);
            console.log(user)
        } catch (err: any) {
            handleError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        clearAuthState();
    };

    const value: AuthContextType = {
        user,
        token,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};