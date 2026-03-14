import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";

import API from "../services/adminApi";
import { cardAnimation } from "../utils/animations";

function UserDetails() {
  const { id } = useParams();
  const { search } = useOutletContext();

  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  // ------------------------- FETCH USER DETAILS -------------------------
  const fetchUserDetails = async () => {
    try {
      const res = await API.get(`/user-details/${id}`);
      setUser(res.data.user);
      setTransactions(res.data.transactions);
      setTotalIncome(res.data.totalIncome);
      setTotalExpense(res.data.totalExpense);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  // ------------------------- SEARCH FILTER -------------------------
  const filteredTransactions = transactions.filter((t) =>
    t.title?.toLowerCase().includes(search.toLowerCase()) ||
    t.type?.toLowerCase().includes(search.toLowerCase())
  );

  if (!user) return <p className="text-lg md:text-xl">Loading...</p>;

  return (
    <div className="w-full">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">User Profile</h1>

      {/* USER PROFILE CARD */}
      <motion.div
        {...cardAnimation}
        className="bg-white p-6 md:p-8 rounded-xl shadow mb-6 flex flex-col sm:flex-row items-center gap-6"
      >
        <img
          src={user.photo || "https://ui-avatars.com/api/?name=" + user.name}
          alt="user"
          className="w-24 md:w-32 h-24 md:h-32 rounded-full object-cover border"
        />

        <div>
          <h2 className="text-xl md:text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500 md:text-base">{user.email}</p>
          <p className="text-blue-500 md:text-base">Role: {user.role}</p>
        </div>
      </motion.div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <motion.div {...cardAnimation} className="bg-green-100 p-5 md:p-6 rounded-xl">
          <h3 className="font-semibold md:text-lg">Total Income</h3>
          <p className="text-xl md:text-2xl font-bold text-green-700 mt-2">
            ₹ {totalIncome}
          </p>
        </motion.div>

        <motion.div {...cardAnimation} className="bg-red-100 p-5 md:p-6 rounded-xl">
          <h3 className="font-semibold md:text-lg">Total Expense</h3>
          <p className="text-xl md:text-2xl font-bold text-red-700 mt-2">
            ₹ {totalExpense}
          </p>
        </motion.div>

        <motion.div {...cardAnimation} className="bg-blue-100 p-5 md:p-6 rounded-xl">
          <h3 className="font-semibold md:text-lg">Wallet Balance</h3>
          <p className="text-xl md:text-2xl font-bold text-blue-700 mt-2">
            ₹ {totalIncome - totalExpense}
          </p>
        </motion.div>
      </div>

      {/* TRANSACTIONS */}
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Transactions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-500 text-base md:text-lg">No transactions found</p>
        ) : (
          filteredTransactions.map((t) => (
            <motion.div
              key={t._id}
              {...cardAnimation}
              className="bg-white p-5 md:p-6 rounded-xl shadow"
            >
              <h3 className="text-lg md:text-xl font-semibold">{t.title}</h3>
              <p className="text-gray-500 mt-1 md:text-base">
                {t.date ? new Date(t.date).toLocaleDateString() : "N/A"}
              </p>
              <p className="text-lg md:text-xl font-bold mt-2">₹ {t.amount}</p>
              <span
                className={`inline-block mt-2 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base font-medium ${
                  t.type === "income"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {t.type}
              </span>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserDetails;