'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    redirectTo?: string;
}

const publicRoutes = ['/'];
const authRoutes = ['/login', '/signup', '/forgot-password'];

export default function ProtectedRoute({
    children,
    redirectTo = '/login',
}: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            const path = window.location.pathname;

            if (!isAuthenticated) {
                router.push(redirectTo);
            } else if (isAuthenticated && authRoutes.includes(path)) {
                router.push('/');
            }
        }
    }, [isAuthenticated, isLoading, router, redirectTo]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return <>{children}</>;
}