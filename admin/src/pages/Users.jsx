import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import API from "../services/adminApi";
import { cardAnimation } from "../utils/animations";

function Users() {

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await API.delete(`/user/${id}`);
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

      <div className="grid grid-cols-3 gap-6">

        {users.map((user) => (

          <motion.div
            key={user._id}
            {...cardAnimation}
            className="bg-white p-6 rounded-xl shadow relative"
          >

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

          </motion.div>

        ))}

      </div>

    </>
  );
}

export default Users;
