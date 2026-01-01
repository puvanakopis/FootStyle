import Sidebar from "@/containers/admin/Sidebar";
import AdminDashboard from "@/containers/admin/AdminDashboard";

export default function AdminDashboardPage() {
    return (
        <main className="flex min-h-screen">
            {/* Fixed Sidebar */}
            <aside className="h-screen w-64 fixed top-0 left-0 bg-gray-100">
                <Sidebar />
            </aside>

            {/* Main content with margin-left equal to Sidebar width */}
            <div className="flex-1 ml-64 p-6 overflow-y-auto">
                <AdminDashboard />
            </div>
        </main>
    );
}
