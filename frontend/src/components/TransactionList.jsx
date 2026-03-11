import API from "../services/api";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { addNotification } from "../utils/notifications";
import { cardAnimation, buttonAnimation } from "../utils/animations";

function TransactionList({ transactions = [], refresh }) {

  const deleteTransaction = async (id, category, amount) => {

    try {

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

      await API.delete(`/transactions/${id}`);

      toast.success("Transaction deleted 🗑");

      addNotification(`Transaction "${category}" ₹${amount} deleted`);

      refresh();

    } catch (error) {

      console.error("Delete transaction error:", error);
      toast.error("Failed to delete transaction ❌");

    }

  };

  return (

    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">

      <h2 className="text-2xl font-semibold mb-6 text-slate-800">
        Transactions
      </h2>

      {transactions.length === 0 && (
        <p className="text-slate-500">No transactions yet</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {transactions.map((t, index) => (

          <motion.div
            key={t._id}

            {...cardAnimation}

            viewport={{ once: true }}

            transition={{
              ...cardAnimation.transition,
              delay: index * 0.02
            }}

            className="border border-slate-200 rounded-xl p-5 hover:shadow-lg active:scale-95 transition bg-white flex flex-col gap-4 cursor-pointer touch-manipulation"
          >

            {/* CATEGORY + TYPE */}
            <div className="flex justify-between items-center">

              <p className="text-lg font-semibold text-slate-800 capitalize">
                {t.category}
              </p>

              <span
                className={`px-3 py-1 text-xs rounded-full font-semibold
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
            <p className="text-sm text-slate-500">
              {t.date ? new Date(t.date).toLocaleDateString() : "No date"}
            </p>

            {/* AMOUNT + DELETE */}
            <div className="flex justify-between items-center">

              <p
                className={`text-xl font-bold ${
                  t.type === "income"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                ₹ {Number(t.amount).toLocaleString()}
              </p>

              <motion.button
                {...buttonAnimation}

                whileTap={{ scale: 0.85 }}

                onClick={() =>
                  deleteTransaction(t._id, t.category, t.amount)
                }

                className="text-red-500 hover:text-red-700 active:scale-90 cursor-pointer"
              >
                <Trash2 size={20} />
              </motion.button>

            </div>

          </motion.div>

        ))}

      </div>

    </div>

  );

}

export default TransactionList;