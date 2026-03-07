import { useEffect, useState } from "react";
import SummaryCard from "../components/SummaryCard";
import TransactionList from "../components/TransactionList";
import TransactionForm from "../components/TransactionForm";
import API from "../services/api";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function Dashboard({ searchQuery = "" }) {

  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [remainingIncome, setRemainingIncome] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const walletRes = await API.get("/wallets");

      if (!walletRes.data || walletRes.data.length === 0) {
        toast.warning("Please create a wallet first ⚠");
        return;
      }

      let totalBalance = 0;

      walletRes.data.forEach((wallet) => {
        totalBalance += Number(wallet.balance);
      });

      setWalletBalance(totalBalance);

      localStorage.setItem("walletId", walletRes.data[0]._id);

      const res = await API.get("/transactions");
      const data = res.data;

      setTransactions(data);

      let totalIncome = 0;
      let totalExpense = 0;

      data.forEach((t) => {

        if (t.type === "income") {
          totalIncome += Number(t.amount);
        }

        if (t.type === "expense") {
          totalExpense += Number(t.amount);
        }

      });

      setIncome(totalIncome);
      setExpense(totalExpense);

      const remaining = Math.max(totalIncome - totalExpense, 0);
      setRemainingIncome(remaining);

    } catch (error) {

      console.error("Dashboard error:", error);
      toast.error("Failed to load dashboard ❌");

    }

  };


  /* SEARCH FILTER */

  const filteredTransactions = transactions.filter((t) => {

    if (!searchQuery) return true;

    const search = searchQuery.toLowerCase();

    const category = t.category?.toLowerCase() || "";
    const description = t.description?.toLowerCase() || "";
    const type = t.type?.toLowerCase() || "";
    const amount = String(t.amount);

    return (
      category.includes(search) ||
      description.includes(search) ||
      type.includes(search) ||
      amount.includes(search)
    );

  });


  return (

    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">

      {/* TITLE */}

      <motion.h1
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl md:text-3xl font-bold mb-6"
      >
        Dashboard
      </motion.h1>


      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <motion.div whileHover={{ y: -8, scale: 1.03 }}>
          <SummaryCard title="Income" amount={income} />
        </motion.div>

        <motion.div whileHover={{ y: -8, scale: 1.03 }}>
          <SummaryCard title="Expense" amount={expense} />
        </motion.div>

        <motion.div whileHover={{ y: -8, scale: 1.03 }}>
          <SummaryCard title="Remaining Income" amount={remainingIncome} />
        </motion.div>

        <motion.div whileHover={{ y: -8, scale: 1.03 }}>
          <SummaryCard title="Wallet Balance" amount={walletBalance} />
        </motion.div>

      </div>


      {/* TRANSACTION FORM */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <TransactionForm refresh={loadDashboard} />
      </motion.div>


      {/* TRANSACTION LIST */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        <TransactionList
          transactions={filteredTransactions}
          refresh={loadDashboard}
        />

      </motion.div>

    </div>

  );

}

export default Dashboard;