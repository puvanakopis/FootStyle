import Sidebar from "@/containers/admin/Sidebar";
import AdminOrdersManagement from "@/containers/admin/AdminOrdersManagement";

export default function AdminOrders() {
    return (
        <main className="flex min-h-screen">
            <aside className="h-screen fixed top-0 left-0 bg-gray-100">
                <Sidebar />
            </aside>

            <div className="flex-1 lg:ml-64 ml-8 p-6 overflow-y-auto">
                <AdminOrdersManagement />
            </div>
        </main>
    );
}