import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import { cardAnimation } from "../utils/animations";

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
  CartesianGrid,
  Line,
  AreaChart,
  Area
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

  /* CATEGORY EXPENSE */

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


  /* INCOME VS EXPENSE */

  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {

    if (t.type === "income") {
      income += Number(t.amount);
    } else {
      expense += Number(t.amount);
    }

  });

  const balance = income - expense;

  const incomeExpenseData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense }
  ];


  /* MONTHLY TREND */

  const monthlyData = {};

  transactions.forEach((t) => {

    const date = new Date(t.date);
    const month = date.toLocaleString("default", { month: "short" });

    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }

    monthlyData[month] += Number(t.amount);

  });

  const lineData = Object.keys(monthlyData).map((m) => ({
    name: m,
    value: monthlyData[m]
  }));


  const COLORS = [
    "#6366f1",
    "#ec4899",
    "#f97316",
    "#22c55e",
    "#06b6d4",
    "#eab308"
  ];

  return (

    <motion.div
      className="p-6 bg-slate-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >

      <h1 className="text-3xl font-bold mb-8 text-slate-800">
        Analytics Dashboard
      </h1>


      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <motion.div
          {...cardAnimation}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-xl shadow-lg cursor-pointer"
        >
          <p className="text-sm">Total Income</p>
          <h2 className="text-2xl font-bold">₹ {income}</h2>
        </motion.div>

        <motion.div
          {...cardAnimation}
          className="bg-gradient-to-r from-orange-400 to-pink-500 text-white p-6 rounded-xl shadow-lg cursor-pointer"
        >
          <p className="text-sm">Total Expense</p>
          <h2 className="text-2xl font-bold">₹ {expense}</h2>
        </motion.div>

        <motion.div
          {...cardAnimation}
          className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white p-6 rounded-xl shadow-lg cursor-pointer"
        >
          <p className="text-sm">Balance</p>
          <h2 className="text-2xl font-bold">₹ {balance}</h2>
        </motion.div>

      </div>


      {/* CHARTS */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


        {/* PIE CHART */}

        <motion.div
          {...cardAnimation}
          className="bg-white p-6 rounded-xl shadow-lg cursor-pointer"
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



        {/* BAR CHART */}

        <motion.div
          {...cardAnimation}
          className="bg-white p-6 rounded-xl shadow-lg cursor-pointer"
        >

          <h2 className="text-lg font-semibold mb-4">
            Income vs Expense
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={incomeExpenseData}>

              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

              <XAxis dataKey="name" />
              <YAxis />

              <Tooltip />

              <Bar dataKey="value" radius={[12, 12, 0, 0]}>

                {incomeExpenseData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      entry.name === "Income"
                        ? "#22c55e"
                        : "#f43f5e"
                    }
                  />
                ))}

              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </motion.div>



        {/* MONTHLY TREND */}

        <motion.div
          {...cardAnimation}
          className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2 cursor-pointer"
        >

          <h2 className="text-lg font-semibold mb-4">
            Monthly Spending Trend
          </h2>

          <ResponsiveContainer width="100%" height={320}>

            <AreaChart data={lineData}>

              <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />

              <XAxis dataKey="name" />
              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                fill="#c7d2fe"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
              />

            </AreaChart>

          </ResponsiveContainer>

        </motion.div>

      </div>

    </motion.div>

  );

}

export default Analytics;