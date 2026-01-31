"use client";

import SectionHeader from "@/components/SectionHeader";
import React from "react";
import ProductCard from "@/components/ProductCard";

interface Product {
    name: string;
    gender: string;
    price: string;
    oldPrice?: string;
    rating: string;
    description?: string;
    imageUrl: string;
    alt: string;
    badge?: string;
}

interface RelatedProductsProps {
    products: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
    return (
        <section className="mt-24 mb-12">
            <SectionHeader
                title="You Might Also Like"
                subtitle="Gear up with essentials"
                linkText="View All"
                linkHref="/products"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, idx) => (
                    <ProductCard
                        key={idx}
                        id={idx}
                        name={product.name}
                        gender={product.gender}
                        price={product.price}
                        rating={product.rating}
                        imageUrl={product.imageUrl}
                        badge={product.badge}
                    />
                ))}
            </div>
        </section>
    );
};

export default RelatedProducts;