import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const JobApplicationOverview = ({ data: Data, t }) => {
  // Transform API response to chart data
  const data = [
    { name: t("Applied"), value: Data?.overview?.applied, color: "#6366F1" },
    { name: t("Saved"), value: Data?.overview?.save, color: "#10B981" },
    { name: t("Approved"), value: Data?.overview?.approved, color: "#F59E0B" },
    { name: t("Rejected"), value: Data?.overview?.reject, color: "#06B6D4" },
    {
      name: t("On-going"),
      value: Data?.overview?.["on-going"],
      color: "#8B5CF6",
    },
    {
      name: t("Completed"),
      value: Data?.overview?.completed,
      color: "#3B82F6",
    },
  ];

  const CustomLegend = ({ payload }) => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-1 gap-2">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600 font-medium">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Custom label renderer for inside pie
  const renderLabel = ({
    name,
    value,
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="600"
      >
        {value !== 0 && value}
      </text>
    );
  };

  return (
    <div className="rounded-lg shadow-lg border border-gray-200 py-4 px-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {t("Weekly Overview")}
        </h2>
      </div>

      {/* Chart + Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        {/* Chart */}
        <div className="w-full sm:w-1/2 md:w-2/3 h-72 sm:h-72 lg:h-80 mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderLabel}
                outerRadius="80%"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[30%] flex justify-center sm:justify-start">
          <CustomLegend
            payload={data.map((item) => ({
              value: item.name,
              color: item.color,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default JobApplicationOverview;

// import React from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// const JobApplicationOverview = ({ data: Data }) => {
//   // Transform API response to chart data
//   const data = [
//     { name: "Applied", value: Data?.overview?.applied, color: "#6366F1" },
//     { name: "Saved", value: Data?.overview?.save, color: "#10B981" },
//     { name: "Approved", value: Data?.overview?.approved, color: "#F59E0B" },
//     { name: "Rejected", value: Data?.overview?.reject, color: "#06B6D4" },
//     { name: "On-going", value: Data?.overview?.["on-going"], color: "#8B5CF6" },
//     { name: "Completed", value: Data?.overview?.completed, color: "#3B82F6" },
//   ];

//   const CustomLegend = ({ payload }) => {
//     return (
//       <div className="flex flex-col space-y-2 ml-8">
//         {payload.map((entry, index) => (
//           <div key={index} className="flex items-center space-x-2">
//             <div
//               className="w-3 h-3 rounded-full"
//               style={{ backgroundColor: entry.color }}
//             />
//             <span className="text-sm text-gray-600 font-medium">
//               {entry.value}
//             </span>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   // Custom label renderer for inside pie
//   const renderLabel = ({
//     name,
//     value,
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//   }) => {
//     const RADIAN = Math.PI / 180;
//     const radius = innerRadius + (outerRadius - innerRadius) / 2;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//       <text
//         x={x}
//         y={y}
//         fill="#fff"
//         textAnchor="middle"
//         dominantBaseline="central"
//         fontSize={12}
//         fontWeight="600"
//       >
//         {name} - {value}
//       </text>
//     );
//   };

//   return (
//     <div className="rounded-lg shadow-lg border border-gray-200 py-4 px-4">
//       {/* Header */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
//       </div>

//       {/* Chart Container */}
//       <div className="flex items-center justify-between">
//         <div className="w-72 h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={renderLabel}
//                 outerRadius={120}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Custom Legend */}
//         <CustomLegend
//           payload={data.map((item) => ({
//             value: item.name,
//             color: item.color,
//           }))}
//         />
//       </div>
//     </div>
//   );
// };

// export default JobApplicationOverview;
