import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function AnalyticsChart({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white p-5 md:p-6 rounded-2xl shadow-lg w-full"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl md:text-3xl font-semibold">📈 Income vs Expense</h2>
        <span className="text-sm md:text-base text-gray-400">Monthly</span>
      </div>

      <div className="w-full h-[280px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 14, fill: "#475569" }}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
            />
            <YAxis
              tick={{ fontSize: 14, fill: "#475569" }}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
            />

            <Tooltip
              formatter={(value) => [`₹${value}`, "Amount"]}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                fontSize: "14px",
              }}
            />

            {/* Income Line */}
            <Line
              type="monotone"
              dataKey="income"
              stroke="#16a34a"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7, strokeWidth: 2, stroke: "#16a34a" }}
              fill="#bbf7d0"
              fillOpacity={0.2}
              isAnimationActive={true}
              animationDuration={1500}
            />

            {/* Expense Line */}
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#dc2626"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7, strokeWidth: 2, stroke: "#dc2626" }}
              fill="#fca5a5"
              fillOpacity={0.2}
              isAnimationActive={true}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default AnalyticsChart;