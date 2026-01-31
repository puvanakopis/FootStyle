"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductDetail from "@/containers/product/ProductDetail.tsx";
import RelatedProducts from "@/containers/product/RelatedProducts";
import { useProduct } from '@/context/ProductContext';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Product } from '@/interfaces/productInterface';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const productId = params.id as string;

    const { currentProduct, fetchProductById, error } = useProduct();

    useEffect(() => {
        fetchProductById(productId);
    }, [productId]);

    // If no product found
    if (!currentProduct) {
        return (
            <main className="min-h-screen bg-background text-foreground">
                <Header />
                <div className="px-8 lg:px-30 py-6">
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center">
                            <div className="text-5xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Product Not Found</h3>
                            <p>The product you&#39;re looking for doesn&#39;t exist.</p>
                            <button
                                onClick={() => router.push('/products')}
                                className="bg-[#ee2b4b] hover:bg-[#d62545] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                            >
                                Browse Products
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        );
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