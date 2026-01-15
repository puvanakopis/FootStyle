'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Loading from '@/components/loading';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const publicRoutes = [
    '/',
    '/products',
    '/about',
    '/contact',
];

const authRoutes = [
    '/login',
    '/signup',
    '/forgot-password',
    '/forgot-password-otp',
    '/forgot-password-verify',
    '/signup-verify',
];

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isLoading) return;

        const isPublicRoute = publicRoutes.includes(pathname);
        const isAuthRoute = authRoutes.includes(pathname);

        if (!isAuthenticated) {
            if (!isPublicRoute && !isAuthRoute) {
                router.replace('/login');
            }
            return;
        }

        if (isAuthenticated && isAuthRoute) {
            router.replace('/');
        }
    }, [isAuthenticated, isLoading, pathname, router]);

    if (isLoading) {
        return <Loading />;
    }

    return <>{children}</>;
}