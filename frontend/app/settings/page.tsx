import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

const breadcrumbItems = [
    { label: "Account", href: "" },
    { label: "Settings", href: "/settings" },
];

export default function Settings() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="px-30 py-6">
                <Breadcrumbs items={breadcrumbItems} />
                Settings
            </div>
            <Footer />
        </main>
    );
}