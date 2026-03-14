import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#f59e0b",
  "#9333ea"
];

function CategoryPieChart({ data }) {

  if (!data || data.length === 0) {

    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Top Spending Categories
        </h2>
        <p className="text-gray-400">No data available</p>
      </div>
    );

  }

  const formatted = data.map((item) => ({
    name: item._id,
    value: item.total
  }));

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">
        Top Spending Categories
      </h2>

      <ResponsiveContainer width="100%" height={250}>

        <PieChart>

          <Pie
            data={formatted}
            dataKey="value"
            outerRadius={90}
            label
          >

            {formatted.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}

export default CategoryPieChart;
