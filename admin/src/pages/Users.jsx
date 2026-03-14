import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaBan, FaCheck } from "react-icons/fa";
import API from "../services/adminApi";
import { cardAnimation } from "../utils/animations";

function Users() {

  const [users, setUsers] = useState([]);

  /*
  ---------------------------
  FETCH USERS
  ---------------------------
  */

  const fetchUsers = async () => {

    try {

      const res = await API.get("/users");

      setUsers(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  /*
  ---------------------------
  DELETE USER
  ---------------------------
  */

  const deleteUser = async (id) => {

    try {

      await API.delete(`/user/${id}`);

      fetchUsers();

    } catch (err) {

      console.log(err);

    }

  };

  /*
  ---------------------------
  BLOCK USER
  ---------------------------
  */

  const blockUser = async (id) => {

    try {

      await API.put(`/block-user/${id}`);

      fetchUsers();

    } catch (err) {

      console.log(err);

    }

  };

  /*
  ---------------------------
  UNBLOCK USER
  ---------------------------
  */

  const unblockUser = async (id) => {

    try {

      await API.put(`/unblock-user/${id}`);

      fetchUsers();

    } catch (err) {

      console.log(err);

    }

  };


  useEffect(() => {

    fetchUsers();

  }, []);


  return (

    <>

      <h1 className="text-3xl font-bold mb-6">
        Users List
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {users.map((user) => (

          <motion.div
            key={user._id}
            {...cardAnimation}
            className="bg-white p-6 rounded-xl shadow relative"
          >

            {/* DELETE BUTTON */}

            <FaTrash
              onClick={() => deleteUser(user._id)}
              className="absolute top-4 right-4 text-red-500 cursor-pointer hover:text-red-700"
            />

            <h2 className="text-xl font-bold">
              {user.name}
            </h2>

            <p className="text-gray-500">
              {user.email}
            </p>

            <p className="text-blue-500 mt-2">
              Role: {user.role}
            </p>

            {/* STATUS */}

            <p className={`mt-2 font-semibold ${
              user.isActive ? "text-green-600" : "text-red-600"
            }`}>
              {user.isActive ? "Active" : "Blocked"}
            </p>

            {/* ACTION BUTTONS */}

            <div className="flex gap-3 mt-4">

              {user.isActive ? (

                <button
                  onClick={() => blockUser(user._id)}
                  className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  <FaBan />
                  Block
                </button>

              ) : (

                <button
                  onClick={() => unblockUser(user._id)}
                  className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  <FaCheck />
                  Unblock
                </button>

              )}

            </div>

          </motion.div>

        ))}

      </div>

    </>
  );

}

export default Users;
