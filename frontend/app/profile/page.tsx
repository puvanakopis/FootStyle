import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Sidebar from '@/components/Sidebar';
import ProfileDetails from '@/containers/profile/ProfileDetails';

const breadcrumbItems = [
    { label: "Account", href: "" },
    { label: "Profile", href: "/profile" },
];

export default function Profile() {
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
                    <section className="w-full lg:w-4/5 space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-neutral-900">My Profile</h1>
                                <p className="text-neutral-600 mt-1">
                                    Manage your personal information and account settings
                                </p>
                            </div>
                        </div>
                        <ProfileDetails />
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}