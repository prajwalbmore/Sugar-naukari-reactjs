import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const JobListingViewStats = ({ data }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 7 days");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownOptions = [
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
    "Last 6 months",
  ];

  // ✅ Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-slate-700 text-white px-3 py-2 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-teal-400 rounded-full" />
            <span>Views</span>
          </div>
          <div className="text-lg font-semibold mt-1">{payload[0].value}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white py-3 rounded-lg border w-[67%] border-gray-200 shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 px-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Job Listing View Stats
        </h2>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <span>{selectedPeriod}</span>
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <div className="py-1">
                {dropdownOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedPeriod(option);
                      setIsDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                      selectedPeriod === option
                        ? "text-teal-600 bg-teal-50"
                        : "text-gray-700"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
          >
            <CartesianGrid stroke="#f1f5f9" vertical={false} />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />

            <YAxis
              domain={[0, 500]}
              ticks={[0, 100, 200, 300, 400, 500]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "transparent" }}
            />

            <Line
              type="monotone"
              dataKey="views"
              stroke="#14b8a6"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#14b8a6",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default JobListingViewStats;
