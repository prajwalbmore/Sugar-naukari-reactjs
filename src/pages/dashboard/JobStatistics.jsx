import React, { useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

// Tabs Component
const Tabs = React.memo(({ selected, onChange }) => {
  const tabs = ["jobs_posted", "applications", "hires"];
  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).replace("_", " ");

  return (
    <div className="flex gap-8 mb-4 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
            selected === tab
              ? "text-gray-800 border-indigo-500"
              : "text-gray-500 border-transparent hover:text-gray-700"
          }`}
        >
          {capitalize(tab)}
        </button>
      ))}
    </div>
  );
});
Tabs.displayName = "Tabs";

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white px-3 py-2 rounded-lg text-xs">
        <p>{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// Main Component
const JobStatistics = ({ data }) => {
  const response = data;
  const [selectedTab, setSelectedTab] = useState("jobs_posted");
  const { t } = useTranslation();
  // Prepare chart data
  const chartData = useMemo(() => {
    const months = response?.last_6_months_jobs_data || {};
    const monthsSet = new Set([
      ...(months.jobs_posted?.map((j) => j.month) || []),
      ...(months.applications?.map((a) => a.month) || []),
      ...(months.hires?.map((h) => h.month) || []),
    ]);

    return Array.from(monthsSet)
      .sort()
      .map((month) => ({
        month: month, // MM
        jobs_posted:
          months.jobs_posted?.find((j) => j.month === month)?.jobs_posted || 0,
        applications:
          months.applications?.find((a) => a.month === month)?.applications ||
          0,
        hires: months.hires?.find((h) => h.month === month)?.hires || 0,
      }));
  }, [response]);

  const handleTabChange = useCallback((tab) => setSelectedTab(tab), []);

  return (
    <div className="w-full rounded-lg px-6 py-4 shadow-md border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 mb-1">
            {t("Job Statistics")}
          </h1>
          <p className="text-gray-500 text-sm">{t("Showing last 6 months")}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs selected={selectedTab} onChange={handleTabChange} />

      {/* Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <XAxis dataKey="month" />
            <YAxis>
              <Label
                value={
                  selectedTab.charAt(0).toUpperCase() +
                  selectedTab.slice(1).replace("_", " ")
                }
                angle={-90} // rotate vertically
                position="insideLeft"
                style={{ textAnchor: "middle", fill: "#555", fontSize: 12 }}
              />
            </YAxis>
            <ReTooltip content={CustomTooltip} />
            <Bar
              dataKey={selectedTab}
              fill="#4f46e5"
              barSize={20}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default JobStatistics;
// import React, { useState, useMemo, useCallback } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// // Tabs Component
// const Tabs = React.memo(({ selected, onChange }) => {
//   const tabs = ["jobs_posted", "applications", "hires"];
//   const capitalize = (str) =>
//     str.charAt(0).toUpperCase() + str.slice(1).replace("_", " ");

//   return (
//     <div className="flex gap-8 mb-4 border-b border-gray-200">
//       {tabs.map((tab) => (
//         <button
//           key={tab}
//           onClick={() => onChange(tab)}
//           className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
//             selected === tab
//               ? "text-gray-800 border-indigo-500"
//               : "text-gray-500 border-transparent hover:text-gray-700"
//           }`}
//         >
//           {capitalize(tab)}
//         </button>
//       ))}
//     </div>
//   );
// });
// Tabs.displayName = "Tabs";

// // Main Component
// const JobStatistics = ({ data }) => {
//   const response = data;
//   const [selectedTab, setSelectedTab] = useState("jobs_posted");

//   // Prepare chart data
//   const chartData = useMemo(() => {
//     const months = response?.last_6_months_jobs_data || {};
//     const monthsSet = new Set([
//       ...(months.jobs_posted?.map((j) => j.month) || []),
//       ...(months.applications?.map((a) => a.month) || []),
//       ...(months.hires?.map((h) => h.month) || []),
//     ]);

//     return Array.from(monthsSet)
//       .sort()
//       .map((month) => ({
//         month: month.slice(5), // show MM
//         jobs_posted:
//           months.jobs_posted?.find((j) => j.month === month)?.jobs_posted || 0,
//         applications:
//           months.applications?.find((a) => a.month === month)?.applications ||
//           0,
//         hires: months.hires?.find((h) => h.month === month)?.hires || 0,
//       }));
//   }, [response]);

//   const handleTabChange = useCallback((tab) => setSelectedTab(tab), []);

//   return (
//     <div className="w-full rounded-lg px-6 py-4 shadow-md border border-gray-200 bg-white">
//       {/* Header */}
//       <div className="flex justify-between items-start mb-3">
//         <div>
//           <h1 className="text-xl font-semibold text-gray-800 mb-1">
//             Job Statistics
//           </h1>
//           <p className="text-gray-500 text-sm">Showing last 6 months</p>
//         </div>
//       </div>

//       {/* Tabs */}
//       <Tabs selected={selectedTab} onChange={handleTabChange} />

//       {/* Chart */}
//       <div className="w-full h-64">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar
//               dataKey={selectedTab}
//               fill="#4f46e5"
//               barSize={20}
//               radius={[4, 4, 0, 0]}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default JobStatistics;
// import React, { useState, useMemo, useCallback } from "react";

// // Tabs Component
// const Tabs = React.memo(({ selected, onChange }) => {
//   const tabs = ["jobs_posted", "applications", "hires"];

//   const capitalize = (str) =>
//     str.charAt(0).toUpperCase() + str.slice(1).replace("_", " ");

//   return (
//     <div className="flex gap-8 mb-4 border-b border-gray-200">
//       {tabs.map((tab) => (
//         <button
//           key={tab}
//           onClick={() => onChange(tab)}
//           className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
//             selected === tab
//               ? "text-gray-800 border-indigo-500"
//               : "text-gray-500 border-transparent hover:text-gray-700"
//           }`}
//         >
//           {capitalize(tab)}
//         </button>
//       ))}
//     </div>
//   );
// });
// Tabs.displayName = "Tabs";

// // Tooltip Component
// const Tooltip = React.memo(({ value, label }) => (
//   <div className="absolute hidden group-hover:block -top-16 bg-gray-800 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap z-10">
//     <div className="flex items-center gap-2">
//       <div className="w-3 h-3 bg-indigo-500 rounded-sm" />
//       <span>
//         {label}: {value}
//       </span>
//     </div>
//     <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
//   </div>
// ));
// Tooltip.displayName = "Tooltip";

// // Bar Chart Component
// const BarChart = React.memo(({ data, field }) => {
//   const maxValue = useMemo(
//     () => Math.max(1, ...data.map((d) => d[field] || 0)),
//     [data, field]
//   );

//   return (
//     <div className="flex items-end justify-between h-72 mb-4">
//       {data.map((bar) => {
//         const height = ((bar[field] || 0) / maxValue) * 100;
//         return (
//           <div
//             key={bar.month}
//             className="flex flex-col items-center group relative w-12"
//           >
//             <Tooltip value={bar[field]} label={field} />
//             <div className="flex flex-col justify-end h-60 w-[70%] cursor-pointer">
//               <div
//                 className="bg-indigo-500 transition-all"
//                 style={{ height: `${height}%` }}
//               />
//             </div>
//             <span className="text-xs text-gray-500 mt-2">
//               {bar.month.slice(5)}
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );
// });
// BarChart.displayName = "BarChart";

// // Chart Legend
// const ChartLegend = React.memo(({ field }) => {
//   const capitalize = (str) =>
//     str.charAt(0).toUpperCase() + str.slice(1).replace("_", " ");
//   return (
//     <div className="flex gap-6">
//       <div className="flex items-center gap-2">
//         <div className="w-4 h-4 bg-indigo-500 rounded-sm" />
//         <span className="text-sm text-gray-600">{capitalize(field)}</span>
//       </div>
//     </div>
//   );
// });
// ChartLegend.displayName = "ChartLegend";

// // Main Component
// const JobStatistics = ({ data }) => {
//   const response = data;
//   const [selectedTab, setSelectedTab] = useState("jobs_posted");

//   const chartData = useMemo(() => {
//     const months = response?.last_6_months_jobs_data || {};
//     const monthsSet = new Set([
//       ...(months.jobs_posted?.map((j) => j.month) || []),
//       ...(months.applications?.map((a) => a.month) || []),
//       ...(months.hires?.map((h) => h.month) || []),
//     ]);

//     return Array.from(monthsSet)
//       .sort()
//       .map((month) => ({
//         month,
//         jobs_posted:
//           months.jobs_posted?.find((j) => j.month === month)?.jobs_posted || 0,
//         applications:
//           months.applications?.find((a) => a.month === month)?.applications ||
//           0,
//         hires: months.hires?.find((h) => h.month === month)?.hires || 0,
//       }));
//   }, [response]);

//   const handleTabChange = useCallback((tab) => setSelectedTab(tab), []);

//   return (
//     <div className="w-full rounded-lg px-6 py-4 shadow-md border border-gray-200">
//       {/* Header */}
//       <div className="flex justify-between items-start mb-3">
//         <div>
//           <h1 className="text-xl font-semibold text-gray-800 mb-1">
//             Job Statistics
//           </h1>
//           <p className="text-gray-500 text-sm">Showing last 6 months</p>
//         </div>
//       </div>

//       {/* Tabs */}
//       <Tabs selected={selectedTab} onChange={handleTabChange} />

//       {/* Chart */}
//       <div className="flex flex-col">
//         <BarChart data={chartData} field={selectedTab} />
//         <ChartLegend field={selectedTab} />
//       </div>
//     </div>
//   );
// };

// export default JobStatistics;
// import React, { useState, useMemo, useCallback } from "react";

// // Period Selector Component
// const PeriodSelector = React.memo(({ selected, onChange }) => {
//   const periods = ["Week", "Month", "Year"];

//   return (
//     <div className="bg-gray-100 rounded-lg p-1 flex">
//       {periods.map((period) => (
//         <button
//           key={period}
//           onClick={() => onChange(period)}
//           className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
//             selected === period
//               ? "bg-indigo-500 text-white shadow-sm"
//               : "text-gray-600 hover:text-gray-800"
//           }`}
//         >
//           {period}
//         </button>
//       ))}
//     </div>
//   );
// });

// PeriodSelector.displayName = "PeriodSelector";

// // Tabs Component
// const Tabs = React.memo(({ selected, onChange }) => {
//   const tabs = ["Overview", "Jobs View", "Jobs Applied"];

//   return (
//     <div className="flex gap-8 mb-4 border-b border-gray-200">
//       {tabs.map((tab) => (
//         <button
//           key={tab}
//           onClick={() => onChange(tab)}
//           className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
//             selected === tab
//               ? "text-gray-800 border-indigo-500"
//               : "text-gray-500 border-transparent hover:text-gray-700"
//           }`}
//         >
//           {tab}
//         </button>
//       ))}
//     </div>
//   );
// });

// Tabs.displayName = "Tabs";

// // Tooltip Component (extracted for reusability)
// const Tooltip = React.memo(({ jobView, jobApplied }) => (
//   <div className="absolute hidden group-hover:block -top-16 bg-gray-800 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap z-10">
//     <div className="flex items-center gap-2 mb-1">
//       <div className="w-3 h-3 bg-orange-400 rounded-sm" />
//       <span>{jobView}</span>
//     </div>
//     <div className="flex items-center gap-2">
//       <div className="w-3 h-3 bg-indigo-500 rounded-sm" />
//       <span>{jobApplied}</span>
//     </div>
//     <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
//   </div>
// ));

// Tooltip.displayName = "Tooltip";

// // Bar Chart Component
// const BarChart = React.memo(({ data }) => {
//   const maxValue = useMemo(
//     () => Math.max(...data.map((d) => d.jobView + d.jobApplied)),
//     [data]
//   );

//   const chartBars = useMemo(
//     () =>
//       data.map((d) => {
//         const jobViewHeight = (d.jobView / maxValue) * 100;
//         const jobAppliedHeight = (d.jobApplied / maxValue) * 100;

//         return {
//           ...d,
//           jobViewHeight,
//           jobAppliedHeight,
//         };
//       }),
//     [data, maxValue]
//   );

//   return (
//     <div className="flex items-end justify-between h-72 mb-4">
//       {chartBars.map((bar) => (
//         <div
//           key={bar.day}
//           className="flex flex-col items-center group relative w-12"
//         >
//           <Tooltip jobView={bar.jobView} jobApplied={bar.jobApplied} />

//           {/* Bars */}
//           <div className="flex flex-col justify-end h-60 w-[70%] cursor-pointer">
//             <div
//               className="bg-[#FFB836] transition-all"
//               style={{ height: `${bar.jobViewHeight}%` }}
//             />
//             <div className="bg-white transition-all h-px" />
//             <div
//               className="bg-[#7B61FF] transition-all"
//               style={{ height: `${bar.jobAppliedHeight}%` }}
//             />
//           </div>

//           <span className="text-xs text-gray-500 mt-2">{bar.day}</span>
//         </div>
//       ))}
//     </div>
//   );
// });

// BarChart.displayName = "BarChart";

// // Stat Card Component
// const StatCard = React.memo(
//   ({ title, value, change, isPositive, color, icon }) => (
//     <div className="bg-gray-50 rounded-2xl px-4 py-2">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-medium text-gray-700">{title}</h3>
//         <div
//           className={`w-10 h-10 ${color.bg} rounded-full flex items-center justify-center`}
//         >
//           {icon}
//         </div>
//       </div>
//       <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
//       <div className="flex items-center gap-1">
//         <span className="text-sm text-gray-500">This Week</span>
//         <span
//           className={`text-sm font-medium ${
//             isPositive ? "text-indigo-500" : "text-red-500"
//           }`}
//         >
//           {change}%
//         </span>
//         <svg
//           className={`w-4 h-4 ${
//             isPositive ? "text-indigo-500" : "text-red-500"
//           }`}
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           aria-hidden="true"
//         >
//           <path
//             fillRule="evenodd"
//             d={
//               isPositive
//                 ? "M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
//                 : "M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
//             }
//             clipRule="evenodd"
//           />
//         </svg>
//       </div>
//     </div>
//   )
// );

// StatCard.displayName = "StatCard";

// // Chart Legend Component (extracted for reusability)
// const ChartLegend = React.memo(() => {
//   const legendItems = [
//     { label: "Job View", color: "bg-[#FFB836]" },
//     { label: "Job Applied", color: "bg-[#7B61FF]" },
//   ];

//   return (
//     <div className="flex gap-6">
//       {legendItems.map((item) => (
//         <div key={item.label} className="flex items-center gap-2">
//           <div className={`w-4 h-4 ${item.color} rounded-sm`} />
//           <span className="text-sm text-gray-600">{item.label}</span>
//         </div>
//       ))}
//     </div>
//   );
// });

// ChartLegend.displayName = "ChartLegend";

// // Icons as separate components for better reusability
// const EyeIcon = React.memo(() => (
//   <svg
//     className="w-5 h-5 text-orange-500"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//     aria-hidden="true"
//   >
//     <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
//   </svg>
// ));

// EyeIcon.displayName = "EyeIcon";

// const DocumentIcon = React.memo(() => (
//   <svg
//     className="w-5 h-5 text-indigo-500"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//     aria-hidden="true"
//   >
//     <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
//   </svg>
// ));

// DocumentIcon.displayName = "DocumentIcon";

// // Main Component
// const JobStatistics = () => {
//   const [selectedPeriod, setSelectedPeriod] = useState("Week");
//   const [selectedTab, setSelectedTab] = useState("Overview");

//   // Memoized chart data to prevent unnecessary recalculations
//   const chartData = useMemo(
//     () => [
//       { day: "Mon", jobView: 120, jobApplied: 180 },
//       { day: "Tue", jobView: 80, jobApplied: 160 },
//       { day: "Wed", jobView: 200, jobApplied: 100 },
//       { day: "Thu", jobView: 150, jobApplied: 180 },
//       { day: "Fri", jobView: 130, jobApplied: 120 },
//       { day: "Sat", jobView: 90, jobApplied: 70 },
//       { day: "Sun", jobView: 110, jobApplied: 140 },
//     ],
//     []
//   );

//   // Memoized stat cards data
//   const statCardsData = useMemo(
//     () => [
//       {
//         title: "Job Views",
//         value: "2,342",
//         change: "6.4",
//         isPositive: true,
//         color: { bg: "bg-orange-100" },
//         icon: <EyeIcon />,
//       },
//       {
//         title: "Job Applied",
//         value: "654",
//         change: "0.5",
//         isPositive: false,
//         color: { bg: "bg-indigo-100" },
//         icon: <DocumentIcon />,
//       },
//     ],
//     []
//   );

//   // Memoized callbacks to prevent unnecessary re-renders
//   const handlePeriodChange = useCallback((period) => {
//     setSelectedPeriod(period);
//   }, []);

//   const handleTabChange = useCallback((tab) => {
//     setSelectedTab(tab);
//   }, []);

//   return (
//     <div className="w-[50%] rounded-lg px-6 py-4 shadow-md border border-gray-200">
//       {/* Header */}
//       <div className="flex justify-between items-start mb-3">
//         <div>
//           <h1 className="text-xl font-semibold text-gray-800 mb-1">
//             Job Statistics
//           </h1>
//           <p className="text-gray-500 text-sm">
//             Showing Job Statistics Jul 19-25
//           </p>
//         </div>
//         <PeriodSelector
//           selected={selectedPeriod}
//           onChange={handlePeriodChange}
//         />
//       </div>

//       {/* Tabs */}
//       <Tabs selected={selectedTab} onChange={handleTabChange} />

//       <div className="flex gap-8 flex-col lg:flex-row">
//         {/* Chart */}
//         <div className="flex-1">
//           <BarChart data={chartData} />
//           <ChartLegend />
//         </div>

//         {/* Stat Cards */}
//         <div className="flex flex-col gap-4 w-full lg:w-64">
//           {statCardsData.map((stat) => (
//             <StatCard key={stat.title} {...stat} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobStatistics;
