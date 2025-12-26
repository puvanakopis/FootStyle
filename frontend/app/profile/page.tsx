import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProfileDetails from '@/containers/profile/ProfileDetails';

const breadcrumbItems = [
    { label: "Home", href: "" },
    { label: "Profile", href: "/profile" },
];

export default function Profile() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="px-30 py-6">
                <Breadcrumbs items={breadcrumbItems} />
                <ProfileDetails />
            </div>
            <Footer />
        </main>
    );
}