"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductDetail from "@/containers/product/ProductDetail";
import RelatedProducts from "@/containers/product/RelatedProducts";
import NoCurrentProduct from "@/containers/product/NoCurrentProduct";
import { useProduct } from '@/context/ProductContext';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Product } from '@/interfaces/productInterface';

export default function ProductDetailPage() {
    const params = useParams();
    const productId = params.id as string;

    const { currentProduct, fetchProductById } = useProduct();

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

    const relatedProducts: Product[] = [];

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="px-8 lg:px-30 py-6">
                <Breadcrumbs items={breadcrumbItems} />
                <ProductDetail product={currentProduct} />
                {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} />}
            </div>
            <Footer />
        </main>
    );
}