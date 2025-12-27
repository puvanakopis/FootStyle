import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Sidebar from '@/components/Sidebar';

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

                    {/* Main content with remaining width */}
                    <main className="w-full lg:w-4/5">
                        Orders
                    </main>
                </div>
            </div>
            <Footer />
        </main>
    );
}