import Sidebar from "@/containers/admin/Sidebar";

export default function AdminProducts() {
    return (
        <main className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6">
                AdminProducts
            </div>
        </main>
    );
}