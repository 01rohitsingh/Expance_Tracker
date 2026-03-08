import API from "../services/api";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { addNotification } from "../utils/notifications";

function TransactionList({ transactions = [], refresh }) {

  const deleteTransaction = async (id, category, amount) => {

    const result = await Swal.fire({
      title: "Delete transaction?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280"
    });

    if (!result.isConfirmed) return;

    try {

      await API.delete(`/transactions/${id}`);

      toast.success("Transaction deleted 🗑");

      addNotification(`Transaction "${category}" ₹${amount} deleted`);

      refresh();

    } catch (error) {

      console.error("Delete failed", error);

      toast.error("Failed to delete transaction ❌");

    }

  };

  return (

    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
    >

      <h2 className="text-lg font-semibold mb-4 text-slate-800">
        Transactions
      </h2>

      {transactions.length === 0 && (
        <p className="text-slate-500">
          No transactions yet
        </p>
      )}

      <div className="space-y-3">

        {transactions.map((t, index) => (

          <motion.div
            key={t._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="flex justify-between items-center border border-slate-200 rounded-lg p-4 hover:shadow-md"
          >

            <div>

              <p className="font-medium text-slate-800 capitalize">
                {t.category}
              </p>

              <p className="text-xs text-slate-500">
                {t.date ? t.date.substring(0, 10) : "No date"}
              </p>

            </div>

            <div className="flex items-center gap-4">

              <span
                className={`px-2 py-1 text-xs rounded-full font-medium
                ${
                  t.type === "income"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {t.type}
              </span>

              <p
                className={
                  t.type === "income"
                    ? "text-green-600 font-semibold"
                    : "text-red-500 font-semibold"
                }
              >
                ₹ {Number(t.amount).toLocaleString()}
              </p>

              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => deleteTransaction(t._id, t.category, t.amount)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <Trash2 size={18} />
              </motion.button>

            </div>

          </motion.div>

        ))}

      </div>

    </motion.div>

  );

}

export default TransactionList;