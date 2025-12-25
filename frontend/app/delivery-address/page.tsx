import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';
import SavedAddresses from "@/containers/delivery-address/SavedAddresses";
import YourOrder from "@/containers/delivery-address/YourOrder";

const breadcrumbItems = [
    { label: "Home", href: "" },
    { label: "Delivery Address", href: "/delivery-address" },
];

export default function DeliveryAddress() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="px-30 py-6">
                <Breadcrumbs items={breadcrumbItems} />
                <PageHeader title="Shipping Information" />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <SavedAddresses />
                    <YourOrder />
                </div>
            </div>
            <Footer />
        </main>
    );
}