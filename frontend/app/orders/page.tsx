import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Sidebar from '@/components/Sidebar';
import OrderHistory from '@/containers/orders/OrderHistory';
import OrderFilter from '@/containers/orders/OrderFilter';

const breadcrumbItems = [
    { label: "Account", href: "" },
    { label: "Orders", href: "/orders" },
];

export default function Orders() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="px-30 py-6">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex flex-col lg:flex-row gap-6 mt-6">
                    {/* Sidebar with fixed width */}
                    <div className='w-full lg:w-1/5'>
                        <Sidebar />
                    </div>

                    <section className="w-full lg:w-4/5 space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-neutral-900">My Orders</h1>
                                <p className="text-neutral-600 mt-1">
                                    5 items
                                </p>
                            </div>
                            <OrderFilter />
                        </div>
                        <OrderHistory />
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}