import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChartPie, FaUsers, FaMoneyBill } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6">

      {/* Logo */}
      <h2 className="text-2xl font-bold mb-10">
        Admin Panel
      </h2>

      <nav className="space-y-4">

        {/* Dashboard */}
        <motion.div whileHover={{ x: 5 }}>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded transition ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            <FaChartPie />
            Dashboard
          </NavLink>
        </motion.div>

        {/* Users */}
        <motion.div whileHover={{ x: 5 }}>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded transition ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            <FaUsers />
            Users
          </NavLink>
        </motion.div>

        {/* Transactions */}
        <motion.div whileHover={{ x: 5 }}>
          <NavLink
            to="/admin/transactions"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded transition ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            <FaMoneyBill />
            Transactions
          </NavLink>
        </motion.div>

      </nav>

    </div>
  );
}

export default Sidebar;
