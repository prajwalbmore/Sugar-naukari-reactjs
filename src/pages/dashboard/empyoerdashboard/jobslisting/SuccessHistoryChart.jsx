// SuccessHistoryChart.jsx
import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#FF8042",
  "#00C49F",
  "#FFBB28",
  "#A28BD4",
  "#FF6699",
];

const SuccessHistoryChart = ({ data = {}, title = "Monthly Success Rate" }) => {
  const chartData = useMemo(
    () =>
      Object.entries(data)
        .map(([name, value]) => ({ name, value }))
        .filter((item) => item.value > 0),
    [data]
  );

  if (!chartData.length) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg shadow-md p-3 text-center">
        No data available
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-3">
      <h3 className="text-lg font-semibold text-center mb-3">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={120}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SuccessHistoryChart;
