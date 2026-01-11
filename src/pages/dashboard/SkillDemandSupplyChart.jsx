import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SkillDemandSupplyChart = ({ data, t }) => {
  const skillData = data?.skill_demand_supply;
  return (
    <div className="p-5 w-full bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-5 text-center">
        {t("Skill Demand vs Supply")}
      </h2>
      <ResponsiveContainer width="100%" height={800}>
        <BarChart
          layout="vertical" // Make the chart horizontal
          data={skillData}
          margin={{ top: 20, right: 30, left: 80, bottom: 20 }} // increase left margin for skill labels
        >
          <XAxis type="number" /> {/* Horizontal axis now */}
          <YAxis dataKey="skill" type="category" /> {/* Skills on Y-axis */}
          <Tooltip />
          <Legend />
          <Bar dataKey="demand" fill="#4f46e5" barSize={20} />
          <Bar dataKey="supply" fill="#10b981" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillDemandSupplyChart;
// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const SkillDemandSupplyChart = ({ data, t }) => {
//   const skillData = data?.skill_demand_supply;
//   return (
//     <div className="p-5 w-full bg-white rounded-xl shadow-lg">
//       <h2 className="text-xl font-semibold mb-5 text-center">
//         {t("Skill Demand vs Supply")}
//       </h2>
//       <ResponsiveContainer width="100%" height={400}>
//         <BarChart
//           data={skillData}
//           margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//         >
//           <XAxis dataKey="skill" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="demand" fill="#4f46e5" barSize={20} />
//           <Bar dataKey="supply" fill="#10b981" barSize={20} />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default SkillDemandSupplyChart;
