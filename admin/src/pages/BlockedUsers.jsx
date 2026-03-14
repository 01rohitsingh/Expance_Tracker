import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserCheck } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";

import API from "../services/adminApi";
import {
  cardAnimation,
  iconAnimation,
  buttonAnimation
} from "../utils/animations";

function BlockedUsers() {

  const [users, setUsers] = useState([]);

  // ⭐ Search from navbar
  const { search } = useOutletContext();

  /*
  -----------------------------------
  FETCH USERS
  -----------------------------------
  */

  const fetchUsers = async () => {
    try {

      const res = await API.get("/users");

      // only blocked users
      const blocked = res.data.filter(user => user.isActive === false);

      setUsers(blocked);

    } catch (error) {
      console.log(error);
    }
  };


  /*
  -----------------------------------
  UNBLOCK USER
  -----------------------------------
  */

  const unblockUser = async (id) => {

    const confirm = window.confirm("Unblock this user?");

    if (!confirm) return;

    try {

      await API.put(`/unblock-user/${id}`);

      fetchUsers();

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);


  /*
  -----------------------------------
  SEARCH FILTER
  -----------------------------------
  */

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );


  return (

    <div className="w-full">

      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Blocked Users
      </h1>


      {/* USERS GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredUsers.length === 0 ? (

          <p className="text-gray-500 text-lg">
            No blocked users found
          </p>

        ) : (

          filteredUsers.map(user => (

            <motion.div
              key={user._id}
              {...cardAnimation}
              className="bg-white p-6 md:p-7 rounded-xl shadow hover:shadow-lg transition relative"
            >

              {/* PROFILE */}

              <div className="flex items-center gap-4 mb-3">

                <img
                  src={
                    user.photo ||
                    `https://ui-avatars.com/api/?name=${user.name}`
                  }
                  alt="user"
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full border object-cover"
                />

                <div>

                  <h2 className="text-lg md:text-xl font-bold">
                    {user.name}
                  </h2>

                  <p className="text-gray-500 text-sm break-all">
                    {user.email}
                  </p>

                </div>

              </div>


              {/* ROLE */}

              <p className="text-blue-500 text-sm md:text-base mt-2">
                Role: {user.role}
              </p>


              {/* STATUS */}

              <p className="text-red-600 font-semibold mt-1">
                Blocked
              </p>


              {/* UNBLOCK BUTTON */}

              <motion.button
                {...buttonAnimation}
                onClick={() => unblockUser(user._id)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
              >

                <motion.span {...iconAnimation}>
                  <FaUserCheck />
                </motion.span>

                Unblock

              </motion.button>

            </motion.div>

          ))

        )}

      </div>

    </div>

  );

}

export default BlockedUsers;