import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import API from "../services/adminApi";
import { cardAnimation, iconAnimation, buttonAnimation } from "../utils/animations";

function TransactionsPage() {

  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");

  const { search } = useOutletContext();

  // ---------------- FETCH TRANSACTIONS ----------------
  const fetchTransactions = async () => {
    try {

      const res = await API.get("/transactions");
      setTransactions(res.data);

    } catch (err) {

      console.error(err);
      toast.error("Failed to fetch transactions");

    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ---------------- DELETE TRANSACTION ----------------
  const deleteTransaction = async (id) => {

    const result = await Swal.fire({
      title: "Delete Transaction?",
      text: "This transaction will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {

      try {

        await API.delete(`/transaction/${id}`);

        toast("Transaction deleted successfully", {
          type: "error",
          icon: "🗑️"
        });

        fetchTransactions();

      } catch (err) {

        console.error(err);
        toast.error("Delete failed");

      }

    }
  };

  // ---------------- FILTER + SEARCH ----------------
  const filteredTransactions = transactions
    .filter((t) => filter === "all" || t.type === filter)
    .filter((t) =>
      t.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.type?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="w-full">

      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Transactions
      </h1>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-3 mb-6">

        <motion.button
          {...buttonAnimation}
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          All
        </motion.button>

        <motion.button
          {...buttonAnimation}
          onClick={() => setFilter("income")}
          className={`px-4 py-2 rounded ${
            filter === "income"
              ? "bg-green-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Income
        </motion.button>

        <motion.button
          {...buttonAnimation}
          onClick={() => setFilter("expense")}
          className={`px-4 py-2 rounded ${
            filter === "expense"
              ? "bg-red-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Expense
        </motion.button>

      </div>

      {/* TRANSACTIONS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredTransactions.length === 0 ? (

          <p className="text-gray-500">
            No transactions found
          </p>

        ) : (

          filteredTransactions.map((t) => (

            <motion.div
              key={t._id}
              {...cardAnimation}
              className="bg-white p-5 md:p-6 rounded-xl shadow relative hover:shadow-lg transition"
            >

              {/* DELETE ICON */}
              <motion.div
                {...iconAnimation}
                title="Delete Transaction"
                className="absolute top-4 right-4 cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => deleteTransaction(t._id)}
              >
                <FaTrash />
              </motion.div>

              {/* USER NAME */}
              <h2 className="text-lg md:text-xl font-bold">
                {t.user?.name || "Unknown"}
              </h2>

              {/* AMOUNT */}
              <p className="text-lg font-semibold mt-2">
                ₹{t.amount}
              </p>

              {/* TYPE */}
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                  t.type === "income"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {t.type}
              </span>

              {/* DATE */}
              <p className="text-gray-500 mt-2 text-sm">
                {t.date ? new Date(t.date).toLocaleDateString() : "N/A"}
              </p>

            </motion.div>

          ))

        )}

      </div>

    </div>
  );
}

export default TransactionsPage;