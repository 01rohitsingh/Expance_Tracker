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

// Gradient colors for bars
const colors = ["#ef4444", "#f97316", "#f59e0b", "#10b981", "#3b82f6"];

function TopSpendingChart({ data }) {
  // Sort descending
  const sortedData = [...data].sort((a, b) => b.spending - a.spending);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-2xl shadow-lg p-6 w-full"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg md:text-xl font-semibold">💰 Top Spending Users</h2>
        <span className="text-xs text-gray-400">Analytics</span>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px] md:h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value) => [`₹${value}`, "Spending"]}
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
              }}
            />
            <Bar
              dataKey="spending"
              radius={[12, 12, 0, 0]}
              barSize={50}
              isAnimationActive={true}
              animationDuration={1000}
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
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {sortedData.map((u, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-gray-50 p-4 rounded-xl shadow flex flex-col items-center justify-center"
          >
            <p className="text-sm font-semibold">#{i + 1} {u.name}</p>
            <p className="text-red-500 font-bold">₹{u.spending}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default TopSpendingChart;
