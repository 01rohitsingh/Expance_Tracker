import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import { addNotification } from "../utils/notifications";

function BudgetProgress({ budget }) {

  const [spent, setSpent] = useState(0);

  useEffect(() => {
    fetchSpentAmount();
  }, [budget]);

  const fetchSpentAmount = async () => {

    try {

      const res = await API.get("/transactions");

      const totalSpent = res.data.reduce((total, transaction) => {

        if (
          transaction.category?.toLowerCase() === budget?.category?.toLowerCase() &&
          transaction.type === "expense"
        ) {
          return total + Number(transaction.amount);
        }

        return total;

      }, 0);

      setSpent(totalSpent);

    } catch (error) {

      console.error("Error calculating spent amount:", error);

    }

  };

  const percentage =
    budget?.limit > 0 ? (spent / budget.limit) * 100 : 0;

  const progress = Math.min(percentage, 100);

  const getColor = () => {

    if (percentage < 60) return "bg-green-500";
    if (percentage < 90) return "bg-yellow-500";
    return "bg-red-500";

  };

  /* 🔔 Budget Exceeded Notification (SAFE VERSION) */

  useEffect(() => {

    if (percentage > 100) {

      const key = `budget_exceeded_${budget?.category}_${budget?.month}_${budget?.year}`;

      if (!localStorage.getItem(key)) {

        addNotification(`Budget exceeded in ${budget?.category} ⚠`);

        localStorage.setItem(key, "true");

      }

    }

  }, [percentage, budget]);

  return (

    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md"
    >

      {/* Header */}

      <div className="flex justify-between items-center mb-3">

        <h3 className="text-lg font-semibold capitalize text-slate-800">
          {budget?.category}
        </h3>

        <span className="text-xs text-slate-500">
          {budget?.month}/{budget?.year}
        </span>

      </div>

      {/* Amount */}

      <p className="text-sm text-slate-600 mb-3">
        ₹ {spent.toLocaleString()} / ₹ {budget?.limit?.toLocaleString()}
      </p>

      {/* Progress Bar */}

      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">

        <div
          className={`${getColor()} h-3 rounded-full transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />

      </div>

      {/* Warning */}

      {percentage > 100 && (

        <p className="text-red-500 text-xs mt-2 font-medium">
          Budget exceeded ⚠
        </p>

      )}

    </motion.div>

  );

}

export default BudgetProgress;