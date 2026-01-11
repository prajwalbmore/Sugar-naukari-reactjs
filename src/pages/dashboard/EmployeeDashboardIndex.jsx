import React, { use } from "react";
import JobApplicationOverview from "./JobApplicationOverview";
import EarningsChart from "./EarningsChart";
import AppliedJobsChart from "./AppliedJobsChart";
import EmployeeRecommendCard from "./EmployeeRecommendCard";
import { Link } from "react-router-dom";
import ApplicationsHistory from "./ApplicationsHistory";
import { useTranslation } from "react-i18next";

const EmployeeDashboardIndex = ({ data, refetch }) => {
  const { t } = useTranslation();
  return (
    <section className="px-3 sm:px-5">
      <div>
        {/* Overview + Charts */}
        <div className="w-full grid grid-cols-1 md:grid-cols-1dash lg:grid-cols-3 gap-5">
          <JobApplicationOverview data={data} t={t} />
          <EarningsChart data={data} t={t} />
          <AppliedJobsChart data={data} t={t} />
        </div>

        {/* Recommended Jobs */}
        <div className="space-y-4 mt-5">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b-2 gap-2">
            <h1 className="text-lg font-semibold text-gray-800">
              {t("Recommended Jobs for you")}
            </h1>
            <Link
              className="flex items-center gap-1 text-blue-600 hover:underline"
              to={"/dashboard/jobs"}
            >
              {t("View All")} <span className="font-bold text-xl">{"->"}</span>
            </Link>
          </div>

          {/* Job Cards */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5">
            {data?.recommended_jobs?.slice(0, 3).map((job, index) => (
              <EmployeeRecommendCard
                job={job}
                key={index}
                refetch={refetch}
                t={t}
              />
            ))}
          </div>
        </div>

        {/* Applications History */}
        <ApplicationsHistory data={data} t={t}/>
      </div>
    </section>
  );
};

export default EmployeeDashboardIndex;
// import React from "react";
// import JobApplicationOverview from "./JobApplicationOverview";
// import EarningsChart from "./EarningsChart";
// import AppliedJobsChart from "./AppliedJobsChart";
// import EmployeeRecommendCard from "./EmployeeRecommendCard";
// import { Link } from "react-router-dom";
// import ApplicationsHistory from "./ApplicationsHistory";

// const EmployeeDashboardIndex = ({ data }) => {
//   return (
//     <section>
//       <div>
//         <div className="w-full flex gap-5">
//           <JobApplicationOverview data={data} />
//           <EarningsChart data={data} />
//           <AppliedJobsChart data={data} />
//         </div>
//         <div className="space-y-4 mt-5">
//           {/* Header */}
//           <div className="flex justify-between items-center border-b-2">
//             <h1 className="text-lg font-semibold text-gray-800">
//               Recommended Jobs for you
//             </h1>
//             <Link className="flex gap-1" to={"/dashboard/jobs"}>
//               View All <span className="font-bold text-xl">{"->"}</span>
//             </Link>
//           </div>

//           {/* Job Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//             {data?.recommended_jobs?.map((job, index) => (
//               <EmployeeRecommendCard job={job} key={index} />
//             ))}
//           </div>
//         </div>
//         <ApplicationsHistory data={data} />
//       </div>
//     </section>
//   );
// };

// export default EmployeeDashboardIndex;
