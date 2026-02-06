"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductDetail from "@/containers/product/ProductDetail";
import NoCurrentProduct from "@/containers/product/NoCurrentProduct";
import { useProduct } from '@/context/ProductContext';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '@/components/Loading';

export default function ProductDetailPage() {
    const params = useParams();
    const productId = params.id as string;

    const { currentProduct, fetchProductById, isLoading } = useProduct();

    useEffect(() => {
        fetchProductById(productId);
    }, [productId]);

    if (!currentProduct) {
        return <NoCurrentProduct />;
    }


    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: currentProduct.name, href: `/products/${productId}` },
    ];

    if (isLoading) {
        return (
            <main className="min-h-screen bg-background text-foreground">
                <Header />
                <Loading message='loading products .....' />
                <Footer />
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="px-8 lg:px-30 py-6">
                <Breadcrumbs items={breadcrumbItems} />
                <ProductDetail product={currentProduct} />
            </div>
            <Footer />
        </main>
    );
}