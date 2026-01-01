import Sidebar from "@/containers/admin/Sidebar";
import AdminUsersManagement from "@/containers/admin/AdminUsersManagement";

export default function AdminCustomers() {
    return (
        <main className="flex min-h-screen">
            <aside className="h-screen w-64 fixed top-0 left-0 bg-gray-100">
                <Sidebar />
            </aside>

            <div className="flex-1 ml-64 p-6 overflow-y-auto">
                <AdminUsersManagement />
            </div>
        </main>
    );
}