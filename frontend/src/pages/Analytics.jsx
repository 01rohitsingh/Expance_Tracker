import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  CartesianGrid
} from "recharts";

function Analytics() {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {

    try {

      const res = await API.get("/transactions");
      setTransactions(res.data);

    } catch (error) {

      console.error("Analytics error:", error);

    }

  };

  const categoryData = {};

  transactions.forEach((t) => {

    if (t.type === "expense") {

      if (!categoryData[t.category]) {
        categoryData[t.category] = 0;
      }

      categoryData[t.category] += Number(t.amount);

    }

  });

  const pieData = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {

    if (t.type === "income") {
      income += Number(t.amount);
    } else {
      expense += Number(t.amount);
    }

  });

  const incomeExpenseData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense }
  ];

  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#14b8a6"
  ];

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-4 md:p-6 bg-gray-100 min-h-screen"
    >

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold mb-6 text-slate-800"
      >
        Analytics
      </motion.h1>

      {transactions.length === 0 ? (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-10 rounded-xl shadow text-center text-gray-500"
        >
          No data available for analytics
        </motion.div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Expense Category Chart */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}

            whileHover={{ y: -10, scale: 1.05 }}
            whileTap={{ scale: 0.92 }}

            transition={{
              type: "spring",
              stiffness: 300,
              damping: 18
            }}

            className="bg-white p-5 shadow rounded-xl cursor-pointer"
          >

            <h2 className="text-lg font-semibold mb-4">
              Expense by Category
            </h2>

            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >

                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}

                </Pie>

                <Tooltip />
                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </motion.div>


          {/* Income vs Expense */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}

            whileHover={{ y: -10, scale: 1.05 }}
            whileTap={{ scale: 0.92 }}

            transition={{
              type: "spring",
              stiffness: 300,
              damping: 18
            }}

            className="bg-white p-5 shadow rounded-xl cursor-pointer"
          >

            <h2 className="text-lg font-semibold mb-4">
              Income vs Expense
            </h2>

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={incomeExpenseData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />
                <YAxis />

                <Tooltip />

                <Bar dataKey="value" radius={[10, 10, 0, 0]}>

                  {incomeExpenseData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        entry.name === "Income"
                          ? "#10b981"
                          : "#ef4444"
                      }
                    />

                  ))}

                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </motion.div>

        </div>

      )}

    </motion.div>

  );

}

export default Analytics;