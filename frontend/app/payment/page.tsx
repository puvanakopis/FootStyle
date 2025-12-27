import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';

const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Cart", href: "/cart" },
    { label: "Delivery Address", href: "/delivery-address" },
    { label: "Payment", href: "/payment" },
];

export default function Payment() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="px-30 py-6">
                <Breadcrumbs items={breadcrumbItems} />
                <PageHeader title="Payment Information" />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    Payment Information
                </div>
            </div>
            <Footer />
        </main>
    );
}