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
      className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >

      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">

        <motion.h1
          className="text-lg md:text-xl font-semibold text-gray-800"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}

          whileTap={{ scale: 0.95 }}

          onTouchStart={(e)=>{
            e.currentTarget.style.transform="scale(0.95)";
          }}

          onTouchEnd={(e)=>{
            e.currentTarget.style.transform="scale(1)";
          }}
        >
          FinTrack
        </motion.h1>

      </div>


      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3 relative">

        {/* SEARCH BAR (PC ONLY) */}
        <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-lg w-56 lg:w-64">

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
            className="bg-transparent outline-none text-sm w-full"
          />

          <Search size={18} className="text-gray-500 ml-2" />

        </div>


        {/* NOTIFICATION */}
        <motion.button
          onClick={() => navigate("/notifications")}
          className="p-2 rounded-lg hover:bg-gray-100 relative"

          whileHover={{ scale: 1.1 }}   // PC same
          whileTap={{ scale: 0.9 }}     // mobile

          onTouchStart={(e)=>{
            e.currentTarget.style.transform="scale(0.9)";
          }}

          onTouchEnd={(e)=>{
            e.currentTarget.style.transform="scale(1)";
          }}
        >

          <Bell size={20} />

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}

        </motion.button>


        {/* PROFILE */}
        <motion.div
          onClick={() => navigate("/settings")}
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg"

          whileHover={{ scale: 1.05 }}  // PC same
          whileTap={{ scale: 0.95 }}    // mobile

          onTouchStart={(e)=>{
            e.currentTarget.style.transform="scale(0.95)";
          }}

          onTouchEnd={(e)=>{
            e.currentTarget.style.transform="scale(1)";
          }}
        >

          <img
            src={profileImage}
            alt="profile"
            className="w-9 h-9 rounded-full object-cover border"
          />

          <span className="hidden md:block text-sm text-gray-700 font-medium">
            {user?.name || "User"}
          </span>

        </motion.div>


        {/* MOBILE MENU BUTTON */}
        <motion.button
          onClick={() => setOpenSidebar(true)}
          className="p-2 rounded-lg hover:bg-gray-100 md:hidden"

          whileTap={{ scale: 0.9 }}

          onTouchStart={(e)=>{
            e.currentTarget.style.transform="scale(0.9)";
          }}

          onTouchEnd={(e)=>{
            e.currentTarget.style.transform="scale(1)";
          }}
        >
          <Menu size={20} />
        </motion.button>

      </div>

    </motion.header>

  );

}

export default Navbar;