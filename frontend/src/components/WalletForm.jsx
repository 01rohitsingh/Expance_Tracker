import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { addNotification } from "../utils/notifications";

function WalletForm({ refresh }) {

  const [name, setName] = useState("");
  const [type, setType] = useState("cash");
  const [balance, setBalance] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!name || !type) {
      toast.error("Please fill all fields ❌");
      return;
    }

    try {

      await API.post("/wallets", {
        name,
        type,
        balance: Number(balance) || 0
      });

      toast.success("Wallet created successfully 💰");

      /* 🔔 ADD NOTIFICATION */

      addNotification(`Wallet "${name}" added successfully`);

      setName("");
      setType("cash");
      setBalance("");

      refresh();

    } catch (error) {

      console.error("Wallet create error", error);

      toast.error(error.response?.data?.message || "Failed to create wallet ❌");

    }

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm mb-6"
    >

      <h2 className="text-lg font-semibold mb-4 text-slate-800">
        Add Wallet
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <input
          type="text"
          placeholder="Wallet Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="cash">Cash</option>
          <option value="bank">Bank</option>
          <option value="credit">Credit Card</option>
          <option value="upi">UPI</option>
        </select>

        <input
          type="number"
          placeholder="Initial Balance"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 mt-4 rounded-lg cursor-pointer transition"
      >
        Add Wallet
      </button>

    </form>

  );

}

export default WalletForm;