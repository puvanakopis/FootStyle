"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductDetail from "@/containers/product/ProductDetail.tsx";
import RelatedProducts from "@/containers/product/RelatedProducts";

import { useParams } from 'next/navigation';

interface Product {
    name: string;
    category: string;
    price: string;
    oldPrice?: string;
    rating: string;
    description?: string;
    imageUrl: string;
    alt: string;
    badge?: string;
}

export default function ProductDetailPage() {
    const params = useParams();
    const productId = typeof params.id === 'string' ? parseInt(params.id, 10) : 1;

    const product = {
        id: productId,
        mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtFmK6hMzMhfSRYyFVzT-mD-V_51dzbFXIc2CXwUJyYGFQ5IA9b7mQdYYiUAkLfQTJzsLqIRyXDgB0qsbQC134aZrhB7Uw7XniReunu-ymhtGXV-kv7z_tPsZxy3dRyYiWCpGmm7rHUptUKAwAHqfJtpMJDWRq8SQ4mOBfBgUHhiSyCUin2ex5hDfOqpJQWhYJowTk2LtOiCQ3JmJkxt3nCxzvTcwZnonzPAF50lGpbHY8z7wZYS93EBRBv2E_FbrAqIpNVu-9_rx_",
        mainAlt: "Red Nike Air Zoom Pegasus 39 running shoe side profile",
        thumbnails: [
            { imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmQ875Oc5EDaG3IxRJ3dKpDtxel54dMg-_tPturJQDODkVMHNQwVt3RO019I2gBY_jTVP9aUpD1PWp3DY2oECXvNbiGBuseUai97ypP5M9RO4BL3Gw5_c8UL5fqdrVJo7k23WC9TLwxa5mS2gRxDvlym9J7bqMZqwIMOP6TSpUfisn9sD0u6N4-0a-ex71mIYXSvlDfVWjok8EAvb0O2u0rrEXwaZbaI96XrJLxeBpuqJl2pzkpVlUv_IU9ShTfE29xiOrIoAKV24l", alt: "Thumbnail side view" },
            { imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmH4rlTJSM0wHhb6rfgErXK_PySc5y5k6ALrl5B-dXVXl_JBnFB8kieiYuP-sQR_4T9nWd05pQOudA4iZy7SRj9uU799kSFI7QVvARF_AVSvStN7NgK9mRyfqVMi1zuG70BV7MXe_8CiWEHnpJI5ggf5zhOVB8VHUi9uRIhw4-Y2NaJWzbHLni41_0s96oXU2LQjTsTN-WflMmEO_kWmYAasofzXk-eSpm-MEM6lv1_AlhuoUilyf4s9UgOmogNnApmS6M8CQ-1MVc", alt: "Thumbnail top view" },
            { imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEpsY_4MVOQPooCkTZYTirbJ3tNSG_0iOy3lZGR8-miY17OnDE2D8oecdFWT8ky8lFmETo24--r1F6oNJVfNhPsxTeM3OLhJKLuUvLNA0ur8BsGmJXqWjJzbDahGX0BoG5Z0AFsSQG6aVIgK8rZ7EZOZRkzL2-8miXBq79O1VcfBIvi2YAai3njAS_mtObXEJrxKypDGTpjwvYL_BYn2JNgKK5SDorMpbZ5cocTD7SeVzO1nTPwIlMVFf4T66lHYEAgKEFLl7mwem2", alt: "Thumbnail sole view" },
            { imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW68r7vjWRoYql_OtS3yAX3DkZ7ja_HrtBE94gm4u6iCRY3T16y3wj5L68SaXzvFlgDKw01spFdWhE4LrZq8WcY-thZBuntu-5PAkOoj4uczaTwgefcpg0AqDcAIhneBEhKyefEGI_vkFyTZ5UJJnA5vkr1mwa9_POZfBUxoyC1SqfpaE1z2p5cuEAu5ALmNnhq-WTEJxueskAMXAETfNvZT_AFwXoAAFLYL_09LTyt6CSiGzsmYyRXkMNkDYkulbx_53wz8jIvqkh", alt: "Thumbnail back heel" },
        ],
        category: "Men's Road Running Shoes",
        name: "Nike Air Zoom Pegasus 39",
        price: 120,
        rating: 4.5,
        reviews: 128,
        description: "Running is your daily ritual, taking you from road to trail as you seek out new adventures and goals. The Nike Air Zoom Pegasus 39 can help you ascend to new heights with its comfortable, intuitive design.",
        colors: [
            { name: "Red", colorClass: "bg-red-600 ring-2 ring-offset-2 ring-primary ring-offset-white" },
            { name: "Black", colorClass: "bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700" },
            { name: "Blue", colorClass: "bg-blue-600 ring-1 ring-slate-200 dark:ring-slate-700" },
            { name: "White", colorClass: "bg-gray-200 ring-1 ring-slate-200 dark:ring-slate-700" },
        ],
        sizes: [
            { size: "7", available: true },
            { size: "7.5", available: true },
            { size: "8", available: true },
            { size: "8.5", available: true },
            { size: "9", available: true },
            { size: "9.5", available: false },
            { size: "10", available: true },
            { size: "10.5", available: true },
            { size: "11", available: true },
            { size: "12", available: true },
        ],
    };

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: product.name, href: `/products/${productId}` },
    ];

    const relatedProducts: Product[] = [
        {
            name: "Nike Zoom Fly 5",
            category: "Men's Running Shoes",
            price: "$160",
            rating: "4.6",
            description: "Men's Running Shoe",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4jmFhKJ5kODh1Pw9E-AbBdCy017Sxa6jkfuI7PX7yblRUh9XQlUb1rGePcIVNTIzAjWqQkSuofcUdBMZpBKa2UikAchL1HYhtdejhekoq7WuAjLXH2Wu5lyVhxoZHEjroJofWh6xIAw--tRbihEk-6uwg4KVhf83mCFqO4Cn4u24_LtB1RMpCPERYMSIxN5qGx85gZ8M5gBwXFS-Cm5hVoz9_CQI7T04A2cI7oB3GX0RGBjpmpic4uoZ9SbPVm-JFlYT1QP-vNpqo",
            alt: "Green Nike running shoe floating on a dark background",
        },
        {
            name: "Nike Air Max 270",
            category: "Men's Running Shoes",
            price: "$110",
            oldPrice: "$150",
            rating: "4.2",
            description: "Men's Shoe",
            badge: "SALE",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYpHtv2raM6c7GzG5PdnnZ-jx-nk_qZ3F_y88Ef-O9tikg_51ZC91n3G5hefPI9xM38_mwzpGhQuZLakMXWzS-KkbiAHjXFYHgjp_YG9PQLbXtatOFHZSbooDcH179xRi7LEoaCkFW5DZ8z5FCNGpCx-rIUaleL9v2AMgAJidVLep6RyhlFmOzF08D7kinH9u-MT0iEz2isbvnYLGJ8lwWUG3RDVbsfZVaLzeYllViWpEsoKAUrFdjrxPT2oVAh0N5lxTuqCOjANdU",
            alt: "White and purple athletic shoe on gradient background",
        },
        {
            name: "Nike Air Zoom Pegasus 36",
            category: "Men's Running Shoes",
            price: "$140",
            rating: "4.4",
            description: "Men's Running Shoe",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYpHtv2raM6c7GzG5PdnnZ-jx-nk_qZ3F_y88Ef-O9tikg_51ZC91n3G5hefPI9xM38_mwzpGhQuZLakMXWzS-KkbiAHjXFYHgjp_YG9PQLbXtatOFHZSbooDcH179xRi7LEoaCkFW5DZ8z5FCNGpCx-rIUaleL9v2AMgAJidVLep6RyhlFmOzF08D7kinH9u-MT0iEz2isbvnYLGJ8lwWUG3RDVbsfZVaLzeYllViWpEsoKAUrFdjrxPT2oVAh0N5lxTuqCOjANdU",
            alt: "Blue Nike running shoe on white background",
        },
        {
            name: "Nike React Infinity Run",
            category: "Men's Running Shoes",
            price: "$150",
            rating: "4.5",
            description: "Men's Running Shoe",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4jmFhKJ5kODh1Pw9E-AbBdCy017Sxa6jkfuI7PX7yblRUh9XQlUb1rGePcIVNTIzAjWqQkSuofcUdBMZpBKa2UikAchL1HYhtdejhekoq7WuAjLXH2Wu5lyVhxoZHEjroJofWh6xIAw--tRbihEk-6uwg4KVhf83mCFqO4Cn4u24_LtB1RMpCPERYMSIxN5qGx85gZ8M5gBwXFS-Cm5hVoz9_CQI7T04A2cI7oB3GX0RGBjpmpic4uoZ9SbPVm-JFlYT1QP-vNpqo",
            alt: "Black Nike running shoe on white background",
        },
    ];

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="px-8 lg:px-30 py-6">
                <Breadcrumbs items={breadcrumbItems} />
                <ProductDetail {...product} />
                <RelatedProducts products={relatedProducts} />
            </div>
            <Footer />
        </main>
    );
}