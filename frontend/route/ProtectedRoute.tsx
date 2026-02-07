'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Loading from '@/components/Loading';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const publicRoutes = [
    '/',
    '/products',
    '/about',
    '/contact',
    '/login',
    '/signup',
    '/forgot-password',
    '/forgot-password-otp',
    '/forgot-password-verify',
    '/signup-verify',
];

const adminRoutes = [
    '/admin',
    '/admin/products',
    '/admin/orders',
    '/admin/customers',
];

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading, user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isLoading) return;

        const isPublicRoute = publicRoutes.includes(pathname);
        const isAdminRoute = adminRoutes.some(route =>
            pathname.startsWith(route)
        );

        if (!isAuthenticated) {
            if (!isPublicRoute) {
                router.replace('/login');
            }
            return;
        }

        if (user?.role === 'admin') {
            if (!isAdminRoute) {
                router.replace('/admin');
            }
            return;
        }

        if (user?.role === 'customer') {
            if (isAdminRoute) {
                router.replace('/');
                return;
            }

            if (['/login', '/signup'].includes(pathname)) {
                router.replace('/');
                return;
            }
        }
    }, [isAuthenticated, isLoading, pathname, router, user]);

    if (isLoading) {
        return <Loading />;
    }

    return <>{children}</>;
}