// SkillsMatchEnhanced.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const SkillsMatchEnhanced = ({ data: response }) => {
  // Transform array -> chart data, filter out zero matched_count if needed
  const data = (response || []).map((item) => ({
    match: item.skill,
    count: item.matched_count,
  }));
  const { t } = useTranslation();

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white border border-gray-300 rounded-lg shadow-md p-3">
          <p className="text-sm font-semibold text-gray-900 mb-1">{label}</p>
          <p className="text-sm text-gray-700">
            {t("Candidates")}:
            <span className="font-semibold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const CustomLegend = () => (
    <div className="flex items-center justify-center mt-3">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-3 bg-green-300 rounded-sm"></div>
        <span className="text-sm text-gray-600">{t("No. of Candidates")}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white py-3 rounded-lg border border-gray-200 shadow-sm max-w-4xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-6">
        <h2 className="text-lg font-semibold text-gray-900 border-b-2 border-teal-500 pb-2 inline-block">
          {t("Skills Match")}
        </h2>
      </div>

      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 30, bottom: 10, left: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e2e2"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="match"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              label={{ value: "Skills", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="count"
              fill="#86efac"
              name="Candidates"
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <CustomLegend />
    </div>
  );
};

export default SkillsMatchEnhanced;
