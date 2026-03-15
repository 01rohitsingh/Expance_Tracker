import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChartPie, FaUsers, FaMoneyBill, FaUserSlash } from "react-icons/fa";

function Sidebar({ sidebarOpen, setSidebarOpen }) {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  return (
    <>
      {/* Overlay (Mobile) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 flex flex-col justify-between p-6 overflow-y-auto`}
      >

        <div>

          {/* Logo */}
          <h2 className="text-3xl font-bold mb-10">
            FinTrack
          </h2>

          {/* Navigation */}
          <nav className="space-y-4">

            <motion.div whileHover={{ x: 5 }}>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-700"
                  }`
                }
              >
                <FaChartPie />
                Dashboard
              </NavLink>
            </motion.div>

            <motion.div whileHover={{ x: 5 }}>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-700"
                  }`
                }
              >
                <FaUsers />
                Users
              </NavLink>
            </motion.div>

            <motion.div whileHover={{ x: 5 }}>
              <NavLink
                to="/admin/transactions"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-700"
                  }`
                }
              >
                <FaMoneyBill />
                Transactions
              </NavLink>
            </motion.div>

            <motion.div whileHover={{ x: 5 }}>
              <NavLink
                to="/admin/blocked-users"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-700"
                  }`
                }
              >
                <FaUserSlash />
                Blocked Users
              </NavLink>
            </motion.div>

          </nav>
        </div>

        {/* Logout (Mobile) */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded md:hidden w-full"
        >
          Logout
        </motion.button>

      </aside>
    </>
  );
}

export default Sidebar;