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

  const profileImage =
    user?.photo ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (

    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.35 }}
      className="w-64 h-screen bg-slate-950 text-slate-300 flex flex-col fixed left-0 top-0 px-5 py-6"
    >

      {/* ================= TOP SECTION ================= */}

      <div>

        {/* LOGO */}

        <div className="mb-8">

          <h2
            onClick={() => navigate("/dashboard")}
            className="text-3xl font-bold text-white cursor-pointer"
          >
            FinTrack
          </h2>

          <p className="text-sm text-slate-400">
            Smart Finance Manager
          </p>

        </div>


        {/* NAVIGATION */}

        <ul className="space-y-3">

          {navItems.map((item) => {

            const Icon = item.icon;

            const active =
              location.pathname === item.path ||
              location.pathname.startsWith(item.path);

            return (

              <motion.li
                key={item.name}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >

                <Link
                  to={item.path}
                  onClick={() => closeSidebar && closeSidebar()}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg text-lg font-semibold transition
                  ${
                    active
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-800 hover:text-white"
                  }`}
                >

                  <Icon size={24} />

                  {item.name}

                </Link>

              </motion.li>

            );

          })}

        </ul>

      </div>


      {/* ================= BOTTOM SECTION ================= */}

      <div className="mt-auto">

        {/* PROFILE */}

        <div
          onClick={() => navigate("/settings")}
          className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-slate-800 p-3 rounded-lg transition"
        >

          <img
            src={profileImage}
            alt="profile"
            onError={(e)=>{
              e.target.src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }}
            className="w-10 h-10 rounded-full object-cover border border-slate-700"
          />

          <div>

            <p className="text-white font-semibold">
              {user?.name || "User"}
            </p>

            <p className="text-xs text-slate-400">
              FinTrack User
            </p>

          </div>

        </div>


        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full bg-red-500 hover:bg-red-600 transition px-4 py-2.5 rounded-lg text-white font-semibold cursor-pointer"
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </motion.aside>

  );

}

export default Sidebar;