import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
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

  return (

    <aside className="w-64 h-screen bg-slate-950 text-slate-300 flex flex-col px-6 py-8 fixed left-0 top-0">

      {/* Logo */}
      <div className="mb-10">

        <h2 className="text-2xl font-bold text-white tracking-wide">
          FinTrack
        </h2>

        <p className="text-xs text-slate-400 mt-1">
          Smart Finance Manager
        </p>

      </div>

      {/* Navigation */}
      <ul className="space-y-2 flex-1">

        {navItems.map((item) => {

          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (

            <li key={item.name}>

              <Link
                to={item.path}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${
                  active
                    ? "bg-blue-600 text-white shadow"
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >

                <Icon size={18} />

                {item.name}

              </Link>

            </li>

          );

        })}

      </ul>

      {/* User Section */}
      <div className="border-t border-slate-800 pt-5">

        {/* Profile (clickable) */}
        <div
          onClick={() => navigate("/settings")}
          className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-slate-800 p-2 rounded-lg transition"
        >

          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="text-sm">

            <p className="text-white font-medium">
              {user?.name || "User"}
            </p>

            <p className="text-xs text-slate-400">
              FinTrack User
            </p>

          </div>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full bg-red-500 hover:bg-red-600 transition px-4 py-2.5 rounded-lg text-white text-sm font-medium"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>

  );

}

export default Sidebar;