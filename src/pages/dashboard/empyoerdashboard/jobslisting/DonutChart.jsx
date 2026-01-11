// DonutChart.jsx
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DEFAULT_COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28", "#A28BD4"];

const DonutChart = ({ data = {}, title = "Gender Distribution" }) => {
  const { t } = useTranslation();
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
        {t("No data available")}
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-3">
      <h3 className="text-lg font-semibold text-center mb-3">{title}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            paddingAngle={1}
            innerRadius={70}
            outerRadius={120}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
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

export default DonutChart;
