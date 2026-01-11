import React from "react";
import { EyeIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import ApplyRateChart from "./ApplyRateChart";
import SkillsMatchEnhanced from "./SkillsMatchEnhanced";
import DonutChart from "./DonutChart";
import SuccessHistoryChart from "./SuccessHistoryChart";
import CandidateLeaderboardTable from "./CandidateLeaderboardTable";
import { useGetJobListingApplicantsQuery } from "../../../../services/jobApiSlice";
import Spinner from "../../../../components/ui/Spinner";

const StatCard = ({ title, value, icon: Icon, iconColor }) => (
  <div className="flex-1 bg-white shadow-lg rounded-2xl p-4 flex flex-col">
    {/* Header */}
    <div className="flex justify-between items-center mb-3">
      <span className="text-sm text-gray-500">{title}</span>
      <div
        className="p-2 rounded-full"
        style={{ backgroundColor: `${iconColor}20`, color: iconColor }}
      >
        <Icon className="w-5 h-5" />
      </div>
    </div>

    {/* Value */}
    <div className="text-3xl font-bold text-gray-900">{value ?? 0}</div>
  </div>
);

const AnalyticsJobDetails = ({ job }) => {
  const { data, isLoading } = useGetJobListingApplicantsQuery({
    job_id: job?.id,
    tab_name: "analytics",
  });

  const analytics = data?.data || {};

  if (isLoading) return <Spinner />;

  return (
    <section className="space-y-5">
      {/* Top Stats */}
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex-1 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard
              title="Total Views"
              value={analytics?.stats?.total_views ?? 0}
              icon={EyeIcon}
              iconColor="#26A4FF"
            />
            <StatCard
              title="Total Applied"
              value={analytics?.stats?.total_applied ?? 0}
              icon={BriefcaseIcon}
              iconColor="#7B61FF"
            />
          </div>

          {/* Apply Rate Chart */}
          {analytics?.apply_rate_trend && (
            <ApplyRateChart data={analytics.apply_rate_trend} />
          )}
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
        {analytics?.gender_distribution && (
          <DonutChart data={analytics.gender_distribution} />
        )}
        {analytics?.skills_match_distribution && (
          <SkillsMatchEnhanced data={analytics.skills_match_distribution} />
        )}
        {/* {analytics?.candidate_success_history && (
          <SuccessHistoryChart data={analytics.candidate_success_history} />
        )} */}
      </div>

      {/* Candidate Leaderboard */}
      {analytics?.candidate_leaderboard && (
        <CandidateLeaderboardTable data={analytics.candidate_leaderboard} />
      )}
    </section>
  );
};

export default AnalyticsJobDetails;
// import React from "react";
// import { EyeIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
// import ApplyRateChart from "./ApplyRateChart";
// import JobListingViewStats from "./JobListingViewStats";
// import TopMissingSkills from "./TopMissingSkills";
// import SkillsMatchEnhanced from "./SkillsMatchEnhanced";
// import PieChartComponent from "./PieChartComponent";
// import { useGetJobListingApplicantsQuery } from "../../../../services/jobApiSlice";
// import Spinner from "../../../../components/ui/Spinner";
// import DonutChart from "./DonutChart";
// import SuccessHistoryChart from "./SuccessHistoryChart";
// import CandidateLeaderboardTable from "./CandidateLeaderboardTable";

// const StatCard = ({ title, value, change, icon: Icon, iconColor }) => {
//   // const isPositive = change > 0;

//   return (
//     <div className="flex-1 bg-white shadow-lg rounded-2xl p-4 flex flex-col">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-3">
//         <span className="text-sm text-gray-500">{title}</span>
//         <div
//           className={`p-2 rounded-full`}
//           style={{ backgroundColor: `${iconColor}20`, color: iconColor }}
//         >
//           <Icon className="w-5 h-5" />
//         </div>
//       </div>

//       {/* Value */}
//       <div className="flex items-end gap-2">
//         <span className="text-3xl font-bold text-gray-900">{value}</span>
//         {/* <span
//           className={`text-sm font-medium ${
//             isPositive ? "text-green-500" : "text-red-500"
//           }`}
//         >
//           {Math.abs(change)}% {isPositive ? "▲" : "▼"}
//         </span> */}
//       </div>

//       {/* Footer */}
//       {/* <span className="text-xs text-gray-400 mt-1">vs last day</span> */}
//     </div>
//   );
// };
// const AnalyticsJobDetails = ({ job }) => {
//   const { data, isLoading } = useGetJobListingApplicantsQuery({
//     job_id: job?.id,
//     tab_name: "analytics",
//   });
//   const analytics = data?.data || {};
//   if (isLoading) return <Spinner />;
//   return (
//     <section className="space-y-5">
//       <div className="w-full flex gap-5">
//         <div className="w-[33%] space-y-5">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <StatCard
//               title="Total Views"
//               value={analytics?.stats?.total_views}
//               // change={6.4}
//               icon={EyeIcon}
//               iconColor="#26A4FF" // sky-500
//             />
//             <StatCard
//               title="Total Applied"
//               value={analytics?.stats?.total_applied}
//               // change={-0.4}
//               icon={BriefcaseIcon}
//               iconColor="#7B61FF" // violet-500
//             />
//           </div>
//           <ApplyRateChart data={analytics?.apply_rate_trend} />
//         </div>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//         <DonutChart data={analytics?.gender_distribution} />
//         <SkillsMatchEnhanced data={analytics?.skills_match_distribution} />
//         <SuccessHistoryChart data={analytics?.candidate_success_history} />
//       </div>
//       <CandidateLeaderboardTable data={analytics?.candidate_leaderboard} />
//     </section>
//   );
// };

// export default AnalyticsJobDetails;
