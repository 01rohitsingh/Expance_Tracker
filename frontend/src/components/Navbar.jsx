import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Bell, Search, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getNotifications } from "../utils/notifications";

function Navbar({ setOpenSidebar, setSearchQuery }) {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);

  /* REAL TIME BADGE UPDATE */

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

  return (

    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between">

      {/* LEFT */}

      <div className="flex items-center gap-3">

        <button
          onClick={() => setOpenSidebar(true)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-lg md:text-xl font-semibold text-gray-800">
          FinTrack
        </h1>

      </div>


      {/* RIGHT */}

      <div className="flex items-center gap-3 relative">

        {/* SEARCH */}

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

        <button
          onClick={() => navigate("/notifications")}
          className="p-2 rounded-lg hover:bg-gray-100 relative"
        >

          <Bell size={20} />

          {unreadCount > 0 && (

            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {unreadCount}
            </span>

          )}

        </button>


        {/* PROFILE */}

        <div
          onClick={() => navigate("/settings")}
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg"
        >

          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <span className="hidden md:block text-sm text-gray-700 font-medium">
            {user?.name || "User"}
          </span>

        </div>

      </div>

    </header>

  );

}

export default Navbar;