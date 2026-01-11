import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const TopMissingSkills = ({data}) => {
  // ✅ Corrected data structure
//   const data = [
//     { skill: "Cuisine de base", missing_count: 5, missing_percentage: 100 },
//     { skill: "Gestion du public", missing_count: 5, missing_percentage: 100 },
//     {
//       skill: "Assistance administrative",
//       missing_count: 5,
//       missing_percentage: 100,
//     },
//     {
//       skill: "Préparation des boissons",
//       missing_count: 5,
//       missing_percentage: 100,
//     },
//     { skill: "Travail d’équipe", missing_count: 5, missing_percentage: 100 },
//   ];

  return (
    <div className="bg-white py-3 rounded-lg border border-gray-200 shadow-lg">
      {/* Header */}
      <div className="mb-6 px-6">
        <h2 className="text-lg font-semibold text-gray-900 border-b-2 border-indigo-500 pb-2 inline-block">
          Top Missing Skills
        </h2>
      </div>

      {/* Chart */}
      <div className="h-80 w-full px-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 20, left: -20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e2e2"
              horizontal={false}
            />

            {/* X Axis = percentage */}
            <XAxis
              type="number"
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />

            {/* Y Axis = skills */}
            <YAxis
              type="category"
              dataKey="skill"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#374151" }}
              width={140}
            />

            {/* Tooltip */}
            <Tooltip
              formatter={(value, name, props) => [`${value}%`, "Missing"]}
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
            />

            {/* Bars */}
            <Bar
              dataKey="missing_percentage"
              fill="#7086FD"
              radius={[0, 4, 4, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-indigo-500 rounded-sm"></div>
          <span className="text-sm text-gray-600">Missing %</span>
        </div>
      </div>
    </div>
  );
};

export default TopMissingSkills;
