import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">

        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;