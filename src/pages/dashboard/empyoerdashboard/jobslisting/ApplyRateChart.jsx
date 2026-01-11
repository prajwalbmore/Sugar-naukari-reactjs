import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const ApplyRateChart = ({ data }) => {
  return (
    <div className="bg-white py-3 rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-3">
        <h2 className="text-lg font-semibold text-gray-900">Apply Rate</h2>
        <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
          MORE
        </button>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, bottom: 10 }}>
            <CartesianGrid stroke="#e2e8f0" vertical={false} />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />

            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />

            <Tooltip
              formatter={(value) => `${value}%`}
              labelFormatter={(label, payload) =>
                payload?.[0]?.payload?.date || label
              }
              contentStyle={{
                fontSize: "12px",
                borderRadius: "8px",
              }}
            />

            <Line
              type="monotone"
              dataKey="apply_rate"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ r: 4, fill: "#8b5cf6" }}
              activeDot={{
                r: 6,
                fill: "#8b5cf6",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ApplyRateChart;
