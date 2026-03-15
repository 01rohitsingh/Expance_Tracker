import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Label
} from "recharts";

const COLORS = ["#16a34a", "#dc2626"];

const formatAmount = (num) => {
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e5) return (num / 1e5).toFixed(1) + "L";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num;
};

function PieChartAnalytics({ income, expense }) {

  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense }
  ];

  const total = income - expense;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white p-5 md:p-6 rounded-2xl shadow-lg w-full"
    >

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-semibold">
          💹 Income vs Expense
        </h2>
        <span className="text-xs text-gray-400">Monthly</span>
      </div>

      {/* Chart */}
      <div className="w-full h-[280px] md:h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              outerRadius={100}
              innerRadius={55}
              paddingAngle={3}
              animationDuration={1200}
            >

              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                />
              ))}

              <Label
                value={`Balance\n₹${formatAmount(total)}`}
                position="center"
                className="text-center font-bold text-gray-700"
              />

            </Pie>

            <Tooltip
              formatter={(value) => [`₹${formatAmount(value)}`, "Amount"]}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)"
              }}
            />

          </PieChart>
        </ResponsiveContainer>
      </div>

    </motion.div>
  );
}

export default PieChartAnalytics;