import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar({ search, setSearch, sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="bg-white shadow p-4 flex items-center justify-between z-50 relative">

      {/* LEFT: Logo / Title */}
      <h1 className="text-2xl md:text-3xl font-bold">FinTrack</h1>

      {/* RIGHT: Search + Hamburger (Logout removed on mobile) */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Search input */}
        <input
          type="text"
          placeholder="🔍 Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 md:px-4 md:py-3 rounded w-40 sm:w-52 md:w-64 text-sm md:text-base"
        />

        {/* Logout button only on md+ */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="hidden md:inline-block bg-red-500 hover:bg-red-600 text-white px-5 md:px-6 py-2 md:py-3 rounded text-sm md:text-base transition"
        >
          Logout
        </motion.button>

        {/* Hamburger menu (mobile only) */}
        <button
          className="md:hidden text-gray-700 z-50 relative"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

    </div>
  );
}

export default Navbar;