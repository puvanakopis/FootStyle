import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

const breadcrumbItems = [
    { label: "Account", href: "" },
    { label: "Wishlist", href: "/wishlist" },
];

export default function Wishlist() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="px-30 py-6">
                <Breadcrumbs items={breadcrumbItems} />
                Wishlist
            </div>
            <Footer />
        </main>
    );
}