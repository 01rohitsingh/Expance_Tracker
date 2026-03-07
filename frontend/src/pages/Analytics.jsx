import { useEffect, useState } from "react";
import API from "../services/api";

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

  // Category wise expense
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


  // Income vs Expense
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

  // Pie chart colors
  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#14b8a6"
  ];

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6 text-slate-800">
        Analytics
      </h1>

      {transactions.length === 0 ? (

        <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
          No data available for analytics
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Expense by Category */}

          <div className="bg-white p-5 shadow rounded-xl">

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

          </div>


          {/* Income vs Expense */}

          <div className="bg-white p-5 shadow rounded-xl">

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

          </div>

        </div>

      )}

    </div>

  );

}

export default Analytics;