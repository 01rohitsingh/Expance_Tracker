import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import API from "../services/adminApi";
import { cardAnimation } from "../utils/animations";

function Transactions() {

  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchTransactions = async () => {
    try {

      const res = await API.get("/transactions");
      setTransactions(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  const deleteTransaction = async (id) => {

    const confirmDelete = window.confirm("Delete this transaction?");

    if (!confirmDelete) return;

    try {

      await API.delete(`/transaction/${id}`);
      fetchTransactions();

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  return (
    <>

      <h1 className="text-3xl font-bold mb-6">
        Transactions
      </h1>

      {/* FILTER BUTTONS */}

      <div className="flex gap-4 mb-6">

        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("income")}
          className={`px-4 py-2 rounded ${
            filter === "income"
              ? "bg-green-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Income
        </button>

        <button
          onClick={() => setFilter("expense")}
          className={`px-4 py-2 rounded ${
            filter === "expense"
              ? "bg-red-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Expense
        </button>

      </div>

      {/* GRID */}

      <div className="grid grid-cols-3 gap-6">

        {filteredTransactions.map((t) => (

          <motion.div
            key={t._id}
            {...cardAnimation}
            className="bg-white p-6 rounded-xl shadow relative"
          >

            <FaTrash
              onClick={() => deleteTransaction(t._id)}
              className="absolute top-4 right-4 text-red-500 cursor-pointer"
            />

            <h2 className="text-xl font-bold">
              {t.user?.name || "Unknown"}
            </h2>

            <p className="text-lg font-semibold mt-2">
              ₹{t.amount}
            </p>

            <span
              className={
                t.type === "income"
                  ? "bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm"
                  : "bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm"
              }
            >
              {t.type}
            </span>

            <p className="text-gray-500 mt-2">
              {t.date
                ? new Date(t.date).toLocaleDateString()
                : "N/A"}
            </p>

          </motion.div>

        ))}

      </div>

    </>
  );
}

export default Transactions;
