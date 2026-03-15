import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Label
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#dc2626", "#f59e0b", "#9333ea"];

// format numbers
const formatAmount = (num) => {
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e5) return (num / 1e5).toFixed(1) + "L";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num;
};

function CategoryPieChart({ data = [] }) {

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-5 md:p-6 rounded-2xl shadow-lg w-full"
      >
        <h2 className="text-xl font-semibold mb-4">
          📊 Top Spending Categories
        </h2>
        <p className="text-gray-400">No data available</p>
      </motion.div>
    );
  }

  const formatted = data.map((item) => ({
    name: item._id || "Unknown",
    value: item.total || 0
  }));

  const total = formatted.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white p-5 md:p-6 rounded-2xl shadow-lg w-full"
    >

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          📊 Top Spending Categories
        </h2>
        <span className="text-xs text-gray-400">
          Analytics
        </span>
      </div>

      {/* Chart */}
      <div className="w-full h-[280px] md:h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={formatted}
              dataKey="value"
              outerRadius={100}
              innerRadius={55}
              paddingAngle={3}
              animationDuration={1200}
              activeShape={false}
              activeIndex={-1}
            >
              {formatted.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

              <Label
                value={`₹${formatAmount(total)}`}
                position="center"
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  fill: "#374151"
                }}
              />

            </Pie>

            <Tooltip
              cursor={false}
              formatter={(value) => [
                `₹${formatAmount(value)}`,
                "Spending"
              ]}
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

export default CategoryPieChart;