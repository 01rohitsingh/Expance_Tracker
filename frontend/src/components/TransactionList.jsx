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

      toast.error("Failed to delete transaction ❌");

    }

  };

  return (

    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">

      <h2 className="text-2xl font-medium mb-6 text-slate-800">
        Transactions
      </h2>

      {transactions.length === 0 && (
        <p className="text-slate-500">No transactions yet</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {transactions.map((t, index) => (

          <motion.div
            key={t._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="border border-slate-200 rounded-xl p-5 hover:shadow-lg transition bg-white flex flex-col gap-4"
          >

            {/* TOP */}
            <div className="flex justify-between items-center">

              <p className="text-xl font-semibold text-slate-800 capitalize">
                {t.category}
              </p>

              <span
                className={`px-4 py-1.5 text-sm rounded-full font-semibold
                ${
                  t.type === "income"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {t.type}
              </span>

            </div>

            {/* DATE */}
            <p className="text-base text-slate-500 font-medium">
              {t.date ? t.date.substring(0, 10) : "No date"}
            </p>

            {/* AMOUNT + DELETE */}
            <div className="flex justify-between items-center">

              <p
                className={
                  t.type === "income"
                    ? "text-green-600 text-xl font-bold"
                    : "text-red-500 text-xl font-bold"
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
                <Trash2 size={22} />
              </motion.button>

            </div>

          </motion.div>

        ))}

      </div>

    </div>

  );

}

export default TransactionList;