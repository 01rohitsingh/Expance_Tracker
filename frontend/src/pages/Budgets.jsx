import { useEffect, useState } from "react";
import BudgetProgress from "../components/BudgetProgress";
import API from "../services/api";
import { toast } from "react-toastify";
import { Target, Wallet, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { addNotification } from "../utils/notifications";

function Budgets({ searchQuery = "" }) {

  const [budgets, setBudgets] = useState([]);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {

    try {

      const res = await API.get("/budgets");
      setBudgets(res.data);

    } catch (error) {

      console.error("Budget fetch error", error);
      toast.error("Failed to load budgets");

    }

  };

  const addBudget = async (e) => {

    e.preventDefault();

    if (!category || !limit) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      const today = new Date();

      await API.post("/budgets", {
        category,
        limit: Number(limit),
        month: today.getMonth() + 1,
        year: today.getFullYear()
      });

      toast.success("Budget added successfully");

      addNotification(`Budget "${category}" added with limit ₹${limit}`);

      setCategory("");
      setLimit("");

      fetchBudgets();

    } catch (error) {

      console.error(error);
      toast.error("Failed to add budget");

    }

  };

  const deleteBudget = async (budget) => {

    const result = await Swal.fire({
      title: "Delete budget?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280"
    });

    if (!result.isConfirmed) return;

    try {

      await API.delete(`/budgets/${budget._id}`);

      toast.success("Budget deleted 🗑");

      addNotification(`Budget "${budget.category}" deleted`);

      fetchBudgets();

    } catch (error) {

      console.error(error);
      toast.error("Failed to delete budget");

    }

  };

  const filteredBudgets = budgets.filter((budget) => {

    if (!searchQuery) return true;

    const search = searchQuery.toLowerCase();

    const category = budget.category?.toLowerCase() || "";
    const limit = String(budget.limit || "");

    return (
      category.includes(search) ||
      limit.includes(search)
    );

  });

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}

      whileTap={{ scale: 0.99 }}

      onTouchStart={(e)=>{
        e.currentTarget.style.transform="scale(0.99)";
      }}

      onTouchEnd={(e)=>{
        e.currentTarget.style.transform="scale(1)";
      }}

      className="p-4 md:p-6 bg-slate-100 min-h-screen"
    >

      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}

        whileTap={{ scale: 0.97 }}

        onTouchStart={(e)=>{
          e.currentTarget.style.transform="scale(0.97)";
        }}

        onTouchEnd={(e)=>{
          e.currentTarget.style.transform="scale(1)";
        }}

        className="flex items-center justify-between mb-8"
      >

        <div className="flex items-center gap-3">

          <div className="bg-blue-100 p-3 rounded-lg">
            <Target className="text-blue-600"/>
          </div>

          <div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Budget Planning
            </h1>

            <p className="text-sm text-slate-500">
              Manage your monthly spending limits
            </p>

          </div>

        </div>

      </motion.div>


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}

        whileTap={{ scale: 0.98 }}

        onTouchStart={(e)=>{
          e.currentTarget.style.transform="scale(0.98)";
        }}

        onTouchEnd={(e)=>{
          e.currentTarget.style.transform="scale(1)";
        }}

        transition={{ duration: 0.35 }}

        className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8"
      >

        <h2 className="font-semibold text-slate-700 mb-4">
          Create Budget
        </h2>

        <form
          onSubmit={addBudget}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >

          <input
            type="text"
            placeholder="Category (Food, Travel, Shopping)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="number"
            placeholder="Budget Limit ₹"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <motion.button
            type="submit"

            whileHover={{ scale: 1.05 }}   // PC same
            whileTap={{ scale: 0.95 }}     // mobile

            onTouchStart={(e)=>{
              e.currentTarget.style.transform="scale(0.95)";
            }}

            onTouchEnd={(e)=>{
              e.currentTarget.style.transform="scale(1)";
            }}

            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 rounded-lg cursor-pointer transition"
          >
            Add Budget
          </motion.button>

        </form>

      </motion.div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}

          whileHover={{ y: -6, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}

          onTouchStart={(e)=>{
            e.currentTarget.style.transform="scale(0.97)";
          }}

          onTouchEnd={(e)=>{
            e.currentTarget.style.transform="scale(1)";
          }}

          transition={{ duration: 0.35 }}

          className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md"
        >

          <div className="bg-green-100 p-3 rounded-lg">
            <Wallet className="text-green-600"/>
          </div>

          <div>

            <p className="text-sm text-slate-500">
              Total Budgets
            </p>

            <p className="text-xl font-bold text-slate-800">
              {filteredBudgets.length}
            </p>

          </div>

        </motion.div>

      </div>


      {filteredBudgets.length === 0 ? (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-10 rounded-xl shadow text-center text-gray-500"
        >

          <p className="text-lg font-medium">
            No budgets found
          </p>

          <p className="text-sm mt-2">
            Try another search
          </p>

        </motion.div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredBudgets.map((budget, index) => (

            <motion.div
              key={budget._id}

              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: index * 0.05 }}

              whileHover={{ y: -5 }}   // PC same
              whileTap={{ scale: 0.97 }}

              onTouchStart={(e)=>{
                e.currentTarget.style.transform="scale(0.97)";
              }}

              onTouchEnd={(e)=>{
                e.currentTarget.style.transform="scale(1)";
              }}

              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md"
            >

              <div className="flex justify-between items-center mb-3">

                <h3 className="text-lg font-semibold capitalize text-slate-800">
                  {budget.category}
                </h3>

                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}

                  onTouchStart={(e)=>{
                    e.currentTarget.style.transform="scale(0.9)";
                  }}

                  onTouchEnd={(e)=>{
                    e.currentTarget.style.transform="scale(1)";
                  }}

                  onClick={() => deleteBudget(budget)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={18}/>
                </motion.button>

              </div>

              <BudgetProgress budget={budget} />

            </motion.div>

          ))}

        </div>

      )}

    </motion.div>

  );

}

export default Budgets;