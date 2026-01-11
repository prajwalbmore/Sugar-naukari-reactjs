import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const PieChartComponent = ({ data: response }) => {
  // Response data
  //   const response = {
  //     inside: 2,
  //     outside: 3,
  //     inside_percentage: 40,
  //     outside_percentage: 60,
  //   };

  // Transform into chart data
  const data = [
    { name: "Inside", value: response.inside_percentage, color: "#6366f1" },
    { name: "Outside", value: response.outside_percentage, color: "#86efac" },
  ];

  // Custom center label (show Inside % in middle)
  const renderCustomLabel = ({ cx, cy }) => {
    return (
      <text
        x={cx}
        y={cy}
        fill="#000000"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-2xl font-bold"
      >
        {`${response.inside_percentage}%`}
      </text>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-gray-900">
            {`${name}: ${value}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white py-3 rounded-lg border border-gray-200 shadow-lg max-w-lg">
      {/* Header */}
      <div className="mb-6 px-6">
        <h2 className="text-lg font-semibold text-gray-900 border-b-2 border-teal-500 pb-2 inline-block">
          Pie
        </h2>
      </div>

      {/* Chart */}
      <div className="h-80 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={120}
              dataKey="value"
              startAngle={90}
              endAngle={450}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartComponent;
// {
//     "status": "success",
//     "tab": "analytics",
//     "data": {
//         "stats": {
//             "total_views": 34,
//             "total_applied": 8,
//             "apply_rate": 23.53
//         },
//         "apply_rate_trend": [
//             {
//                 "date": "Sep 22",
//                 "day": "Mon",
//                 "apply_rate": 0,
//                 "applications": 0
//             },
//             {
//                 "date": "Sep 23",
//                 "day": "Tue",
//                 "apply_rate": 0,
//                 "applications": 0
//             },
//             {
//                 "date": "Sep 24",
//                 "day": "Wed",
//                 "apply_rate": 3,
//                 "applications": 1
//             },
//             {
//                 "date": "Sep 25",
//                 "day": "Thu",
//                 "apply_rate": 9,
//                 "applications": 3
//             },
//             {
//                 "date": "Sep 26",
//                 "day": "Fri",
//                 "apply_rate": 3,
//                 "applications": 1
//             },
//             {
//                 "date": "Sep 27",
//                 "day": "Sat",
//                 "apply_rate": 9,
//                 "applications": 3
//             },
//             {
//                 "date": "Sep 28",
//                 "day": "Sun",
//                 "apply_rate": 0,
//                 "applications": 0
//             }
//         ],
//         "skills_match_distribution": [
//             {
//                 "skill": "Communication",
//                 "matched_count": 6
//             },
//             {
//                 "skill": "Cr\u00e9ation de contenu",
//                 "matched_count": 2
//             },
//             {
//                 "skill": "Gestion de caisse",
//                 "matched_count": 1
//             },
//             {
//                 "skill": "Service en salle",
//                 "matched_count": 1
//             },
//             {
//                 "skill": "Travail d\u2019\u00e9quipe",
//                 "matched_count": 0
//             },
//             {
//                 "skill": "Gestion du public",
//                 "matched_count": 0
//             },
//             {
//                 "skill": "Cuisine de base",
//                 "matched_count": 0
//             },
//             {
//                 "skill": "Pr\u00e9paration des boissons",
//                 "matched_count": 0
//             }
//         ],
//         "gender_distribution": {
//             "Male": 5,
//             "Female": 0,
//             "Non Binary": 0,
//             "Other": 1,
//             "Not To Say": 1
//         },
//         "candidate_stage_breakdown": {
//             "applied": 8,
//             "save": 0,
//             "approved": 0,
//             "reject": 0
//         },
//         "candidate_success_history": {
//             "0-4": 8,
//             "5-9": 0,
//             "10-14": 0,
//             "15-19": 0,
//             "20-24": 0,
//             "25-29": 0
//         },
//         "candidate_leaderboard": [
//             {
//                 "candidate_id": 270,
//                 "name": "Prajwal More",
//                 "appllied_at": "24-09-2025 01:25 PM",
//                 "completed_jobs": 0
//             },
//             {
//                 "candidate_id": 33,
//                 "name": "Vikas Mahale",
//                 "appllied_at": "25-09-2025 09:37 AM",
//                 "completed_jobs": 0
//             },
//             {
//                 "candidate_id": 34,
//                 "name": "Omi",
//                 "appllied_at": "26-09-2025 09:41 AM",
//                 "completed_jobs": 0
//             },
//             {
//                 "candidate_id": 35,
//                 "name": "Sham",
//                 "appllied_at": "27-09-2025 09:42 AM",
//                 "completed_jobs": 0
//             },
//             {
//                 "candidate_id": 37,
//                 "name": "Vihan",
//                 "appllied_at": "27-09-2025 10:54 AM",
//                 "completed_jobs": 0
//             }
//         ]
//     }
// }
