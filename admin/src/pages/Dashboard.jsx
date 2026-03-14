import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaMoneyBillWave,
  FaArrowDown,
  FaArrowUp
} from "react-icons/fa";

import AnalyticsChart from "../components/AnalyticsChart";

import API from "../services/adminApi";
import { cardAnimation } from "../utils/animations";

function Dashboard() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    totalUsers: 0,
    totalTransactions: 0,
    totalIncome: 0,
    totalExpense: 0
  });

  const [chartData, setChartData] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    try {

      const res = await API.get("/dashboard");
      setData(res.data);

    } catch (error) {

      console.log(error);
      navigate("/admin/login");

    }

  }, [navigate]);


  const fetchAnalytics = async () => {

    try {

      const res = await API.get("/analytics");

      const formatted = res.data.map((item) => ({
        month: `M${item._id}`,
        income: item.totalIncome,
        expense: item.totalExpense
      }));

      setChartData(formatted);

    } catch (error) {
      console.log(error);
    }

  };


  const fetchRecentTransactions = async () => {

    try {

      const res = await API.get("/transactions");

      setRecentTransactions(res.data.slice(0, 5));

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  };


  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin/login");
    } else {
      fetchDashboard();
      fetchAnalytics();
      fetchRecentTransactions();
    }

  }, [fetchDashboard, navigate]);


  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (

        <>
          {/* STATS CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <motion.div
              {...cardAnimation}
              onClick={() => navigate("/admin/users")}
              className="bg-white p-6 rounded-xl shadow flex items-center justify-between cursor-pointer"
            >
              <div>
                <h3 className="text-gray-500">Total Users</h3>
                <p className="text-2xl font-bold">{data.totalUsers}</p>
              </div>

              <FaUsers className="text-blue-500 text-3xl" />
            </motion.div>


            <motion.div
              {...cardAnimation}
              onClick={() => navigate("/admin/transactions")}
              className="bg-white p-6 rounded-xl shadow flex items-center justify-between cursor-pointer"
            >
              <div>
                <h3 className="text-gray-500">Transactions</h3>
                <p className="text-2xl font-bold">{data.totalTransactions}</p>
              </div>

              <FaMoneyBillWave className="text-green-500 text-3xl" />
            </motion.div>


            <motion.div
              {...cardAnimation}
              className="bg-white p-6 rounded-xl shadow flex items-center justify-between"
            >
              <div>
                <h3 className="text-gray-500">Income</h3>
                <p className="text-2xl font-bold text-green-600">
                  ₹{data.totalIncome}
                </p>
              </div>

              <FaArrowUp className="text-green-500 text-3xl" />
            </motion.div>


            <motion.div
              {...cardAnimation}
              className="bg-white p-6 rounded-xl shadow flex items-center justify-between"
            >
              <div>
                <h3 className="text-gray-500">Expense</h3>
                <p className="text-2xl font-bold text-red-600">
                  ₹{data.totalExpense}
                </p>
              </div>

              <FaArrowDown className="text-red-500 text-3xl" />
            </motion.div>

          </div>


          {/* CHART */}

          <div className="mt-8">
            <AnalyticsChart data={chartData} />
          </div>


          {/* RECENT TRANSACTIONS */}

          <div className="bg-white p-6 rounded-xl shadow mt-8">

            <h2 className="text-xl font-semibold mb-4">
              Recent Transactions
            </h2>

            <table className="w-full">

              <thead className="border-b">
                <tr className="text-left text-gray-500">
                  <th>User</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>

                {recentTransactions.map((t) => (

                  <tr key={t._id} className="border-b">

                    <td className="py-2">
                      {t.user?.name || "Unknown"}
                    </td>

                    <td>₹{t.amount}</td>

                    <td className={
                      t.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }>
                      {t.type}
                    </td>

                    <td>
                      {new Date(t.date).toLocaleDateString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </>
      )}
    </>
  );
}

export default Dashboard;
