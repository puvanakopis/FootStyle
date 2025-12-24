import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/containers/account/Sidebar';


export default function Account() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="px-30 py-6">
                <div className="flex flex-col lg:flex-row gap-6 mt-6">
                    {/* Sidebar with fixed width */}
                    <div className='w-full lg:w-1/5'>
                        <Sidebar />
                    </div>

                    {/* Main content with remaining width */}
                    <main className="w-full lg:w-4/5 p-4 bg-white rounded-lg shadow">
                        <h1 className="text-2xl font-bold">Profile Page</h1>
                    </main>
                </div>
            </div>

            <Footer />
        </main>
    );
}