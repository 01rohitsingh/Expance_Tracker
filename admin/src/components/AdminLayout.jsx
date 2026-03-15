import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function AdminLayout() {
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Section */}
      <div className="flex flex-col flex-1 md:ml-64">

        {/* Navbar (Fixed) */}
        <div className="fixed top-0 left-0 md:left-64 right-0 z-40">
          <Navbar
            search={search}
            setSearch={setSearch}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto pt-20 p-6">
          <Outlet context={{ search }} />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;