import { useEffect, useState } from "react";
import BudgetProgress from "../components/BudgetProgress";
import API from "../services/api";
import { toast } from "react-toastify";
import { Target, Wallet, TrendingUp } from "lucide-react";

function Budgets() {

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

      setCategory("");
      setLimit("");

      fetchBudgets();

    } catch (error) {

      console.error(error);
      toast.error("Failed to add budget");

    }

  };

  return (

    <div className="p-6 bg-slate-100 min-h-screen">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-3">

          <div className="bg-blue-100 p-3 rounded-lg">
            <Target className="text-blue-600"/>
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Budget Planning
            </h1>

            <p className="text-sm text-slate-500">
              Manage your monthly spending limits
            </p>

          </div>

        </div>

      </div>


      {/* ADD BUDGET CARD */}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">

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

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 rounded-lg cursor-pointer transition"
          >
            Add Budget
          </button>

        </form>

      </div>


      {/* SUMMARY STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">

          <div className="bg-green-100 p-3 rounded-lg">
            <Wallet className="text-green-600"/>
          </div>

          <div>

            <p className="text-sm text-slate-500">
              Total Budgets
            </p>

            <p className="text-xl font-bold text-slate-800">
              {budgets.length}
            </p>

          </div>

        </div>






      </div>


      {/* BUDGET CARDS */}

      {budgets.length === 0 ? (

        <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">

          <p className="text-lg font-medium">
            No budgets created yet
          </p>

          <p className="text-sm mt-2">
            Add your first budget to track spending
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {budgets.map((budget) => (

            <BudgetProgress
              key={budget._id}
              budget={budget}
            />

          ))}

        </div>

      )}

    </div>

  );

}

export default Budgets;