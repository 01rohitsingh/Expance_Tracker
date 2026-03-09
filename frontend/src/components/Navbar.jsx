import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Bell, Search, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getNotifications } from "../utils/notifications";
import { motion } from "framer-motion";

function Navbar({ setOpenSidebar, setSearchQuery }) {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL;

  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const interval = setInterval(() => {
      const data = getNotifications();
      setNotifications(data);
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  const handleSearch = (e) => {

    const value = e.target.value;
    setSearch(value);

    if (setSearchQuery) {
      setSearchQuery(value);
    }

  };

  const unreadCount = notifications.filter((n) => !n.seen).length;

  const profileImage = user?.photo
    ? `${BASE_URL}${user.photo}`
    : `${BASE_URL}/photo/download.png`;

  return (

    <motion.header
      className="bg-white border-b border-slate-200 px-4 lg:px-10 py-3 flex items-center justify-between shadow-sm"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >

      {/* LEFT SIDE LOGO */}

      <motion.h1
        onClick={() => navigate("/dashboard")}
        className="text-xl lg:text-3xl font-bold text-slate-800 cursor-pointer"
        whileTap={{ scale: 0.95 }}
      >
        FinTrack
      </motion.h1>


      {/* RIGHT SIDE */}

      <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">

        {/* SEARCH (DESKTOP ONLY) */}

        <div className="hidden md:flex items-center bg-slate-100 px-4 py-2 rounded-xl w-[280px]">

          <Search size={20} className="text-gray-500 mr-2" />

          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={handleSearch}
            className="bg-transparent outline-none w-full"
          />

        </div>


        {/* NOTIFICATION */}

        <motion.button
          onClick={() => navigate("/notifications")}
          className="p-1.5 rounded-lg hover:bg-slate-100 relative cursor-pointer"
          whileTap={{ scale: 0.9 }}
        >

          <Bell size={24} className="text-slate-700" />

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}

        </motion.button>


        {/* PROFILE (DESKTOP ONLY) */}

        <motion.div
          onClick={() => navigate("/settings")}
          className="hidden lg:flex items-center gap-2 cursor-pointer hover:bg-slate-100 px-3 py-1.5 rounded-lg"
          whileTap={{ scale: 0.95 }}
        >

          <img
            src={profileImage}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover border"
          />

          <span className="text-sm font-semibold text-slate-800">
            {user?.name || "User"}
          </span>

        </motion.div>


        {/* MOBILE MENU */}

        <motion.button
          onClick={() => setOpenSidebar(true)}
          className="p-1.5 rounded-lg hover:bg-slate-100 lg:hidden cursor-pointer"
          whileTap={{ scale: 0.9 }}
        >
          <Menu size={24} />
        </motion.button>

      </div>

    </motion.header>

  );

}

export default Navbar;