import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";

// bar colors
const colors = ["#ef4444", "#f97316", "#f59e0b", "#10b981", "#3b82f6"];

function TopSpendingChart({ data }) {

  // sort highest spending
  const sortedData = [...data].sort((a, b) => b.spending - a.spending);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-white rounded-2xl shadow-md p-6 w-full border border-gray-100"
    >

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
          💰 Top Spending Users
        </h2>

        <span className="text-xs text-gray-400">
          Analytics
        </span>

      </div>

      {/* Chart */}
      <div className="w-full h-[320px] bg-white">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart
            data={sortedData}
            margin={{ top: 10, right: 30, left: -10, bottom: 0 }}
            style={{ background: "transparent" }}
          >

            {/* Grid */}
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#e5e7eb"
              vertical={false}
            />

            {/* X Axis */}
            <XAxis
              dataKey="name"
              tick={{ fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            {/* Y Axis */}
            <YAxis
              tick={{ fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            {/* Tooltip */}
            <Tooltip
              formatter={(value) => [`₹${value}`, "Spending"]}
              contentStyle={{
                background: "#fff",
                borderRadius: "10px",
                border: "1px solid #eee",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
              }}
            />

            {/* Bars */}
            <Bar
              dataKey="spending"
              radius={[10, 10, 0, 0]}
              barSize={45}
              animationDuration={900}
            >

              {sortedData.map((entry, index) => (

                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />

              ))}

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Ranking Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

        {sortedData.map((u, i) => (

          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 border border-gray-100 p-4 rounded-xl shadow-sm text-center"
          >

            <p className="text-sm font-semibold text-gray-700">
              #{i + 1} {u.name}
            </p>

            <p className="text-lg font-bold text-red-500 mt-1">
              ₹{u.spending}
            </p>

          </motion.div>

        ))}

      </div>

    </motion.div>
  );
}

export default TopSpendingChart;