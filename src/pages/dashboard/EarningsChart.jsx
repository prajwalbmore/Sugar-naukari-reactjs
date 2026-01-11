import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const EarningsChart = ({ data: earnings_chart, t }) => {
  // Transform into chart data
  const data = Object.entries(earnings_chart?.earnings_chart).map(
    ([day, value]) => ({
      day,
      earnings: value,
    })
  );

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={4}
          fill="#6366F1"
          stroke="#6366F1"
          strokeWidth={2}
        />
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          fontSize={12}
          fill="#6366F1"
          fontWeight="500"
        >
          {payload.earnings}
        </text>
      </g>
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {t("Weekly Earnings")}
        </h2>
      </div>

      {/* Chart Container */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="2 2"
              stroke="#E5E7EB"
              horizontal={true}
              vertical={true}
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              tickFormatter={(value) => `${value} CHF`}
            />

            <Area
              type="monotone"
              dataKey="earnings"
              stroke="#6366F1"
              strokeWidth={2}
              fill="url(#colorEarnings)"
              dot={<CustomDot />}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
          </div>
          <span className="text-sm text-gray-600 ml-2">{t("Earnings")}</span>
        </div>
      </div>
    </div>
  );
};

export default EarningsChart;
