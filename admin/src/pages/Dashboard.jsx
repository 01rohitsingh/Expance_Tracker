import { useEffect, useState, useCallback } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUsers, FaMoneyBillWave, FaArrowUp, FaArrowDown } from "react-icons/fa";

import AnalyticsChart from "../components/AnalyticsChart";
import CategoryPieChart from "../components/CategoryPieChart";
import PieChartAnalytics from "../components/PieChartAnalytics";
import TopSpendingChart from "../components/TopSpendingChart";

import API from "../services/adminApi";
import { cardAnimation } from "../utils/animations";

function Dashboard() {

  const navigate = useNavigate();
  const { search } = useOutletContext();

  const [data, setData] = useState({
    totalUsers: 0,
    totalTransactions: 0,
    totalIncome: 0,
    totalExpense: 0
  });

  const [chartData, setChartData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  /*
  -----------------------------------
  FETCH DASHBOARD DATA
  -----------------------------------
  */

  const fetchDashboard = useCallback(async () => {
    try {

      const res = await API.get("/dashboard");
      setData(res.data);

    } catch (error) {

      console.log(error);
      navigate("/admin/login");

    }
  }, [navigate]);


  /*
  -----------------------------------
  FETCH MONTHLY ANALYTICS
  -----------------------------------
  */

  const fetchAnalytics = async () => {

    try {

      const res = await API.get("/analytics");

      const formatted = res.data.map(item => ({
        month: `M${item._id}`,
        income: item.totalIncome,
        expense: item.totalExpense
      }));

      setChartData(formatted);

    } catch (error) {

      console.log(error);

    }
  };


  /*
  -----------------------------------
  FETCH CATEGORY ANALYTICS
  -----------------------------------
  */

  const fetchCategoryAnalytics = async () => {

    try {

      const res = await API.get("/top-categories");
      setCategoryData(res.data);

    } catch (error) {

      console.log(error);

    }
  };


  /*
  -----------------------------------
  FETCH TOP SPENDING USERS
  -----------------------------------
  */

  const fetchTopUsers = async () => {

    try {

      const res = await API.get("/top-spending-users");

      const formatted = res.data.map(user => ({
        name: user.name,
        spending: user.totalSpent
      }));

      setTopUsers(formatted);

    } catch (error) {

      console.log(error);

    }
  };


  /*
  -----------------------------------
  FETCH RECENT TRANSACTIONS (6)
  -----------------------------------
  */

  const fetchRecentTransactions = async () => {

    try {

      const res = await API.get("/transactions");

      // latest 6
      setRecentTransactions(res.data.slice(0, 6));

    } catch (error) {

      console.log(error);

    }
  };


  /*
  -----------------------------------
  LOAD ALL DATA
  -----------------------------------
  */

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/admin/login");

    } else {

      const loadData = async () => {

        await fetchDashboard();
        await fetchAnalytics();
        await fetchCategoryAnalytics();
        await fetchTopUsers();
        await fetchRecentTransactions();

        setLoading(false);

      };

      loadData();

    }

  }, [fetchDashboard, navigate]);


  /*
  -----------------------------------
  SEARCH FILTER
  -----------------------------------
  */

  const filteredTransactions = recentTransactions.filter(t =>

    t?.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    t?.type?.toLowerCase().includes(search.toLowerCase())

  );


  return (

    <div className="w-full">

      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Dashboard
      </h1>

      {loading ? (

        <p className="text-lg">Loading...</p>

      ) : (

        <>

          {/* STATS CARDS */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            <motion.div
              {...cardAnimation}
              onClick={() => navigate("/admin/users")}
              className="bg-white p-6 md:p-8 rounded-xl shadow flex items-center justify-between cursor-pointer"
            >

              <div>
                <h3 className="text-gray-500 text-sm md:text-base">
                  Total Users
                </h3>

                <p className="text-2xl md:text-3xl font-bold">
                  {data.totalUsers}
                </p>
              </div>

              <FaUsers className="text-blue-500 text-3xl md:text-4xl" />

            </motion.div>


            <motion.div
              {...cardAnimation}
              onClick={() => navigate("/admin/transactions")}
              className="bg-white p-6 md:p-8 rounded-xl shadow flex items-center justify-between cursor-pointer"
            >

              <div>
                <h3 className="text-gray-500 text-sm md:text-base">
                  Transactions
                </h3>

                <p className="text-2xl md:text-3xl font-bold">
                  {data.totalTransactions}
                </p>
              </div>

              <FaMoneyBillWave className="text-green-500 text-3xl md:text-4xl" />

            </motion.div>


            <motion.div
              {...cardAnimation}
              className="bg-white p-6 md:p-8 rounded-xl shadow flex items-center justify-between"
            >

              <div>
                <h3 className="text-gray-500 text-sm md:text-base">
                  Income
                </h3>

                <p className="text-2xl md:text-3xl font-bold text-green-600">
                  ₹{data.totalIncome}
                </p>
              </div>

              <FaArrowUp className="text-green-500 text-3xl md:text-4xl" />

            </motion.div>


            <motion.div
              {...cardAnimation}
              className="bg-white p-6 md:p-8 rounded-xl shadow flex items-center justify-between"
            >

              <div>
                <h3 className="text-gray-500 text-sm md:text-base">
                  Expense
                </h3>

                <p className="text-2xl md:text-3xl font-bold text-red-600">
                  ₹{data.totalExpense}
                </p>
              </div>

              <FaArrowDown className="text-red-500 text-3xl md:text-4xl" />

            </motion.div>

          </div>


          {/* MONTHLY ANALYTICS */}

          <div className="mt-8 bg-white p-6 md:p-8 rounded-xl shadow">
            <AnalyticsChart data={chartData} />
          </div>


          {/* TOP SPENDING USERS */}

          <div className="mt-8 bg-white p-6 md:p-8 rounded-xl shadow">
            <TopSpendingChart data={topUsers} />
          </div>


          {/* PIE CHARTS */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

            <CategoryPieChart data={categoryData} />

            <PieChartAnalytics
              income={data.totalIncome}
              expense={data.totalExpense}
            />

          </div>


          {/* RECENT TRANSACTIONS */}

          <div className="mt-8">

            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Recent Transactions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {filteredTransactions.map(t => (

                <motion.div
                  key={t._id}
                  {...cardAnimation}
                  className="bg-white p-6 rounded-xl shadow flex items-center justify-between"
                >

                  <div>

                    <h3 className="text-gray-500 text-sm">
                      {t?.user?.name || "Unknown"}
                    </h3>

                    <p className="text-2xl font-bold mt-1">
                      ₹{t.amount}
                    </p>

                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                        t.type === "income"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {t.type}
                    </span>

                  </div>

                  <div className="text-gray-400 text-sm">
                    {t.date ? new Date(t.date).toLocaleDateString() : ""}
                  </div>

                </motion.div>

              ))}

            </div>

          </div>

        </>

      )}

    </div>

  );
}

export default Dashboard;