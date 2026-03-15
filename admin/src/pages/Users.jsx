import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaBan, FaCheck } from "react-icons/fa";
import { useNavigate, useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import API from "../services/adminApi";
import { cardAnimation } from "../utils/animations";

function Users() {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { search } = useOutletContext();

  // ---------------- FETCH USERS ----------------
  const fetchUsers = async () => {
    try {

      const res = await API.get("/users");
      setUsers(res.data);

    } catch (err) {

      console.log(err);
      toast.error("Failed to fetch users");

    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ---------------- DELETE USER ----------------
  const deleteUser = async (id) => {

    const result = await Swal.fire({
      title: "Delete User?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {

      try {

        await API.delete(`/user/${id}`);

        toast("User deleted successfully", {
          type: "error",
          icon: "🗑️"
        });

        fetchUsers();

      } catch (err) {

        toast.error("Delete failed");

      }

    }

  };

  // ---------------- BLOCK USER ----------------
  const blockUser = async (id) => {

    const result = await Swal.fire({
      title: "Block User?",
      text: "User will not be able to login!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      confirmButtonText: "Yes, Block",
    });

    if (result.isConfirmed) {

      try {

        await API.put(`/block-user/${id}`);

        toast("User blocked successfully", {
          type: "warning",
          icon: "🚫"
        });

        fetchUsers();

      } catch (err) {

        toast.error("Block failed");

      }

    }

  };

  // ---------------- UNBLOCK USER ----------------
  const unblockUser = async (id) => {

    const result = await Swal.fire({
      title: "Unblock User?",
      text: "User will be able to login again!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      confirmButtonText: "Yes, Unblock",
    });

    if (result.isConfirmed) {

      try {

        await API.put(`/unblock-user/${id}`);

        toast("User unblocked successfully", {
          type: "success",
          icon: "✅"
        });

        fetchUsers();

      } catch (err) {

        toast.error("Unblock failed");

      }

    }

  };

  // ---------------- SEARCH FILTER ----------------
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">

      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Users List
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredUsers.map((user) => (

          <motion.div
            key={user._id}
            {...cardAnimation}
            onClick={() => navigate(`/admin/user/${user._id}`)}
            className="bg-white p-5 md:p-6 rounded-xl shadow relative cursor-pointer hover:shadow-lg transition"
          >

            {/* DELETE BUTTON */}
            <FaTrash
              title="Delete User"
              onClick={(e) => {
                e.stopPropagation();
                deleteUser(user._id);
              }}
              className="absolute top-4 right-4 text-red-500 text-lg md:text-2xl cursor-pointer hover:text-red-700"
            />

            {/* USER PROFILE */}
            <div className="flex items-center gap-4 mb-3">

              <img
                src={user.photo || "https://ui-avatars.com/api/?name=" + user.name}
                alt="user"
                className="w-16 md:w-20 h-16 md:h-20 rounded-full object-cover border"
              />

              <div>
                <h2 className="text-lg md:text-xl font-bold">
                  {user.name}
                </h2>

                <p className="text-gray-500 text-sm md:text-base break-all">
                  {user.email}
                </p>
              </div>

            </div>

            {/* ROLE */}
            <p className="text-blue-500 text-sm md:text-base mt-2">
              Role: {user.role}
            </p>

            {/* STATUS */}
            <p
              className={`mt-1 font-semibold text-sm md:text-base ${
                user.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {user.isActive ? "Active" : "Blocked"}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mt-4">

              {user.isActive ? (

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    blockUser(user._id);
                  }}
                  className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  <FaBan />
                  Block
                </button>

              ) : (

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    unblockUser(user._id);
                  }}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  <FaCheck />
                  Unblock
                </button>

              )}

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  );
}

export default Users;