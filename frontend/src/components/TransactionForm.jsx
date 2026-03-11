import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { addNotification } from "../utils/notifications";
import { motion } from "framer-motion";
import { buttonAnimation } from "../utils/animations";

function TransactionForm({ refresh }) {

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
    date: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const { title, amount, category, type, date } = formData;

    if (!title || !amount || !category || !date) {
      toast.error("Please fill all fields ❌");
      return;
    }

    if (Number(amount) <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    const walletId = localStorage.getItem("walletId");

    if (!walletId) {
      toast.error("Wallet not found ⚠");
      return;
    }

    try {

      setLoading(true);

      await API.post("/transactions", {
        title,
        amount: Number(amount),
        category,
        type,
        wallet: walletId,
        date
      });

      toast.success("Transaction added 💰");

      addNotification(`Transaction "${title}" ₹${amount} added`);

      setFormData({
        title: "",
        amount: "",
        category: "",
        type: "expense",
        date: ""
      });

      refresh();

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Failed to add transaction ❌"
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm mb-6"
    >

      <h2 className="text-xl font-semibold mb-5 text-slate-800">
        Add Transaction
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border border-black p-3 rounded-lg w-full
          focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        {/* Amount */}
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="border border-black p-3 rounded-lg w-full
          focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        {/* Category */}
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border border-black p-3 rounded-lg w-full
          focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        {/* Type */}
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border border-black p-3 rounded-lg w-full
          focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {/* Date */}
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border border-black p-3 rounded-lg w-full
          focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

      </div>

      {/* Button */}
      <motion.button
        {...buttonAnimation}
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 mt-5 rounded-lg font-medium transition"
      >
        {loading ? "Adding..." : "Add Transaction"}
      </motion.button>

    </form>
  );
}

export default TransactionForm;