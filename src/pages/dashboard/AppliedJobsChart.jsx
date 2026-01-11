import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const AppliedJobsChart = ({ data: applications_chart, t }) => {
  const rawData = applications_chart?.applications_chart ?? {};
  const data = Object.entries(rawData).map(([day, jobs]) => ({ day, jobs }));

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900">
            {t("Weekly Applied Jobs")}
          </h2>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="2 2" stroke="#E5E7EB" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
            />
            <Bar
              dataKey="jobs"
              fill="#6366F1"
              radius={[2, 2, 0, 0]}
              stroke="#6366F1"
              strokeWidth={0}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-indigo-500 rounded-sm"></div>
          <span className="text-sm text-gray-600">{t("Jobs applied")}</span>
        </div>
      </div>
    </div>
  );
};

export default AppliedJobsChart;
// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// const AppliedJobsChart = ({ data: applications_chart }) => {
//   const data = applications_chart?.applications_chart;
//   // [
//   //   { day: "Sun", jobs: 55 },
//   //   { day: "Mon", jobs: 64 },
//   //   { day: "Tue", jobs: 76 },
//   //   { day: "Wed", jobs: 78 },
//   //   { day: "Thu", jobs: 70 },
//   //   { day: "Fri", jobs: 36 },
//   //   { day: "Sat", jobs: 36 },
//   // ];

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-6 w-full">
//       {/* Header */}
//       <div className="flex justify-between items-start mb-6">
//         <div className="flex-1">
//           {/* <div className="flex items-center mb-2">
//             <div className="h-1 w-8 bg-cyan-400 rounded-full"></div>
//             <div className="h-px flex-1 bg-gray-300 ml-2"></div>
//           </div> */}
//           <h2 className="text-lg font-semibold text-gray-900">Applied Jobs</h2>
//         </div>
//         <div className="text-sm text-gray-500">This Week</div>
//       </div>

//       {/* Chart */}
//       <div className="h-80">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={data}
//             margin={{
//               top: 20,
//               right: 30,
//               left: 0,
//               bottom: 20,
//             }}
//             barCategoryGap="20%"
//           >
//             <CartesianGrid
//               strokeDasharray="2 2"
//               stroke="#E5E7EB"
//               horizontal={true}
//               vertical={true}
//             />

//             <XAxis
//               dataKey="day"
//               axisLine={false}
//               tickLine={false}
//               tick={{ fontSize: 12, fill: "#6B7280" }}
//             />

//             <YAxis
//               axisLine={false}
//               tickLine={false}
//               tick={{ fontSize: 12, fill: "#6B7280" }}
//               domain={[0, 100]}
//               ticks={[0, 20, 40, 60, 80, 100]}
//             />

//             <Bar
//               dataKey="jobs"
//               fill="#6366F1"
//               radius={[2, 2, 0, 0]}
//               stroke="#6366F1"
//               strokeWidth={0}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Legend */}
//       <div className="flex justify-center mt-4">
//         <div className="flex items-center space-x-2">
//           <div className="w-3 h-3 bg-indigo-500 rounded-sm"></div>
//           <span className="text-sm text-gray-600">Jobs applied</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppliedJobsChart;
