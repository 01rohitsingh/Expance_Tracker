import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Bell, Search, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar({ setOpenSidebar, setSearchQuery }) {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {

    const value = e.target.value;

    setSearch(value);

    // send search text to Layout
    if (setSearchQuery) {
      setSearchQuery(value);
    }

  };

  return (

    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between">

      {/* LEFT SECTION */}

      <div className="flex items-center gap-3">

        {/* Mobile Menu */}
        <button
          onClick={() => setOpenSidebar(true)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <Menu size={20} />
        </button>

        {/* Logo */}
        <h1 className="text-lg md:text-xl font-semibold text-gray-800">
          FinTrack
        </h1>

      </div>



      {/* RIGHT SECTION */}

      <div className="flex items-center gap-3">

        {/* Search Box */}

        <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-lg w-56 lg:w-64">

          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={handleSearch}
            className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-500"
          />

          <Search size={18} className="text-gray-500 ml-2" />

        </div>



        {/* Notification */}

        <button className="p-2 rounded-lg hover:bg-gray-100 transition">
          <Bell size={18} />
        </button>



        {/* Profile */}

        <div
          onClick={() => navigate("/settings")}
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg transition"
        >

          {/* Avatar */}

          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">

            {user?.name?.charAt(0)?.toUpperCase() || "U"}

          </div>

          {/* Name */}

          <span className="hidden md:block text-sm text-gray-700 font-medium">
            {user?.name || "User"}
          </span>

        </div>

      </div>

    </header>

  );

}

export default Navbar;