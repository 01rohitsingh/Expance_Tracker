import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Wallet,
  BarChart3,
  Settings,
  PiggyBank,
  LogOut
} from "lucide-react";

function Sidebar({ closeSidebar }) {

  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Wallets", path: "/wallets", icon: Wallet },
    { name: "Budgets", path: "/budgets", icon: PiggyBank },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Settings", path: "/settings", icon: Settings }
  ];

  const profileImage = user?.photo
    ? `${BASE_URL}${user.photo}`
    : `${BASE_URL}/photo/download.png`;

  return (

    <motion.aside
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-64 h-screen bg-slate-950 text-slate-300 flex flex-col px-6 py-8 fixed left-0 top-0"
    >

      {/* LOGO */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >

        <h2 className="text-3xl font-bold text-white tracking-wide">
          FinTrack
        </h2>

        <p className="text-sm text-slate-400 mt-1">
          Smart Finance Manager
        </p>

      </motion.div>


      {/* NAVIGATION */}

      <ul className="space-y-4 flex-1">

        {navItems.map((item, index) => {

          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (

            <motion.li
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.95 }}
            >

              <Link
                to={item.path}
                onClick={closeSidebar}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-lg text-lg font-bold transition-all duration-200
                ${
                  active
                    ? "bg-blue-600 text-white shadow"
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >

                <Icon size={26} />

                {item.name}

              </Link>

            </motion.li>

          );

        })}

      </ul>


      {/* USER SECTION */}

      <div className="border-t border-slate-800 pt-6">

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/settings")}
          className="flex items-center gap-4 mb-5 cursor-pointer hover:bg-slate-800 p-3 rounded-lg transition"
        >

          <img
            src={profileImage}
            alt="profile"
            className="w-13 h-13 rounded-full object-cover border"
            onError={(e) => {
              e.target.src = `${BASE_URL}/photo/download.png`;
            }}
          />

          <div className="text-lg">

            <p className="text-white font-bold">
              {user?.name || "User"}
            </p>

            <p className="text-sm text-slate-400">
              FinTrack User
            </p>

          </div>

        </motion.div>


        {/* LOGOUT */}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full bg-red-500 hover:bg-red-600 transition px-4 py-3.5 rounded-lg text-white text-lg font-bold"
        >

          <LogOut size={24} />

          Logout

        </motion.button>

      </div>

    </motion.aside>

  );

}

export default Sidebar;