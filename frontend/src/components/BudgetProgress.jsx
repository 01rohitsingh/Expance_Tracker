import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
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

      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}

      whileTap={{ scale: 0.96 }}

      transition={{
        duration: 0.25,
        ease: "easeOut"
      }}

      className="cursor-pointer"

    >

      <div className="flex justify-between text-sm text-slate-600 mb-2">

        <span>
          ₹ {spent.toLocaleString()} / ₹ {budget?.limit?.toLocaleString()}
        </span>

        <span className="text-xs text-slate-500">
          {budget?.month}/{budget?.year}
        </span>

      </div>

      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">

        <motion.div
          key={progress}
          className={`${getColor()} h-3 rounded-full origin-left`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{
            duration: 0.9,
            ease: "easeOut"
          }}
          style={{ width: "100%" }}
        />

      </div>

      {percentage > 100 && (

        <p className="text-red-500 text-xs mt-2 font-medium">
          Budget exceeded ⚠
        </p>

      )}

    </motion.div>

  );

}

export default BudgetProgress;