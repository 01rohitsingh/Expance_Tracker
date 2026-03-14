import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function AdminLayout() {
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar (fixed) */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 md:ml-64">
        {/* md:ml-64 = leave space for sidebar on tablet/PC only */}

        {/* Navbar */}
        <Navbar
          search={search}
          setSearch={setSearch}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page Content */}
        <main className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto">
          <Outlet context={{ search }} />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;