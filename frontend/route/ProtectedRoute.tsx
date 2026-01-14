'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Loading from '@/components/loading';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    redirectTo?: string;
}

const authRoutes = ['/login', '/signup', '/forgot-password', '/forgot-password-otp', '/forgot-password-verify', '/signup-verify'];

export default function ProtectedRoute({
    children,
    redirectTo = '/login',
}: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;

        const path = window.location.pathname;

        if (!isAuthenticated && !authRoutes.includes(path)) {
            router.push(redirectTo);
        }

        if (isAuthenticated && authRoutes.includes(path)) {
            router.push('/');
        }
    }, [isAuthenticated, isLoading, router, redirectTo]);

    if (isLoading) {
        return (
            <Loading />
        );
    }

    return <>{children}</>;
}