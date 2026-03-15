import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar({ search, setSearch, sidebarOpen, setSidebarOpen }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="bg-white shadow px-4 py-3 flex items-center justify-between z-50">

      {/* Logo */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-800">
        FinTrack
      </h1>

      <div className="flex items-center gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-40 md:w-64 text-sm outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Logout Desktop */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="hidden md:block bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded text-sm"
        >
          Logout
        </motion.button>

        {/* Mobile Menu */}
        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

      </div>

    </div>
  );
}

export default Navbar;