import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import OrderSummary from '@/containers/cart/OrderSummary';
import CartItems from '@/containers/cart/CartItems';
import PageHeader from '@/components/PageHeader';

const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Cart", href: "/cart" },
];

export default function CartPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="px-30 py-6">
                <Breadcrumbs items={breadcrumbItems} />
                <PageHeader title="Your Shopping Cart" />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-8 space-y-6">
                        <CartItems />
                    </div>

                    <div className="lg:col-span-4 lg:sticky lg:top-24">
                        <OrderSummary />
                    </div>
                </div>

            </div>
            <Footer />
        </main>
    );
}