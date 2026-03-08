import { useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import { toast } from "react-toastify";
import { addNotification } from "../utils/notifications";

function TransactionForm({ refresh }) {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!title || !amount || !category || !date) {
      toast.error("Please fill all fields ❌");
      return;
    }

    const walletId = localStorage.getItem("walletId");

    if (!walletId) {
      toast.error("Wallet not found. Create wallet first ⚠");
      return;
    }

    try {

      const res = await API.post("/transactions", {
        title,
        amount: Number(amount),
        category,
        type,
        wallet: walletId,
        date
      });

      console.log("Transaction Added:", res.data);

      toast.success("Transaction added successfully 💰");

      addNotification(`Transaction "${title}" ₹${amount} added`);

      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
      setType("expense");

      refresh();

    } catch (error) {

      console.error("Transaction create error:", error.response?.data || error);

      toast.error(error.response?.data?.message || "Failed to add transaction ❌");

    }

  };

  return (

    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm mb-6"
    >

      <h2 className="text-lg font-semibold mb-4 text-slate-800">
        Add Transaction
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 mt-4 rounded-lg transition"
      >
        Add Transaction
      </motion.button>

    </motion.form>

  );

}

export default TransactionForm;