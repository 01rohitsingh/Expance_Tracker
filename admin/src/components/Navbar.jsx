import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    // remove token
    localStorage.removeItem("token");

    // redirect to login
    navigate("/admin/login");
  };

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">

      {/* Title */}
      <h1 className="text-xl font-semibold">
        Admin Dashboard
      </h1>

      {/* Logout Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
      >
        Logout
      </motion.button>

    </div>
  );
}

export default Navbar;