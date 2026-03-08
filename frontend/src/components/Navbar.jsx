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
      className="bg-white border-b border-slate-200 px-8 lg:px-12 py-2.5 flex items-center justify-between shadow-sm"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >

      {/* LEFT SIDE */}
      <div className="flex items-center gap-6">

        <motion.h1
          className="text-3xl font-bold text-slate-800 tracking-tight"
          whileTap={{ scale: 0.95 }}
        >
          FinTrack
        </motion.h1>

      </div>


      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">

        {/* SEARCH BAR */}
        <div className="hidden md:flex items-center bg-slate-100 px-5 py-3 rounded-xl w-[340px] lg:w-[420px]">

          <Search size={26} className="text-gray-500 mr-3" />

          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={handleSearch}
            className="bg-transparent outline-none text-lg w-full"
          />

        </div>


        {/* NOTIFICATION */}
        <motion.button
          onClick={() => navigate("/notifications")}
          className="p-3 rounded-xl hover:bg-slate-100 relative"
          whileTap={{ scale: 0.9 }}
        >

          <Bell size={28} className="text-slate-700" />

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}

        </motion.button>


        {/* PROFILE */}
        <motion.div
          onClick={() => navigate("/settings")}
          className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 px-4 py-2 rounded-xl"
          whileTap={{ scale: 0.95 }}
        >

          <img
            src={profileImage}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover border"
          />

          <span className="hidden md:block text-lg font-semibold tracking-wide text-slate-800">
            {user?.name || "User"}
          </span>

        </motion.div>


        {/* MOBILE MENU */}
        <motion.button
          onClick={() => setOpenSidebar(true)}
          className="p-3 rounded-xl hover:bg-slate-100 md:hidden"
          whileTap={{ scale: 0.9 }}
        >
          <Menu size={28} />
        </motion.button>

      </div>

    </motion.header>

  );

}

export default Navbar;