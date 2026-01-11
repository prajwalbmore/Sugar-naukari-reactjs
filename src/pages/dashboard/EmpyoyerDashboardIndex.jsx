import React from "react";
import ApplicantsSummary from "./ApplicantsSummary";
import JobStatistics from "./JobStatistics";
import ExpensesChart from "./ExpensesChart";
import DashboardJobCard from "./DashboardJobCard";
import { Link } from "react-router-dom";
import SkillDemandSupplyChart from "./SkillDemandSupplyChart";
import TopRolesTable from "./TopRolesTable";
import { useTranslation } from "react-i18next";
import ReusableTable from "../../components/ui/ReusableTable";
import DashboardAvtiveSubscription from "./DashboardAvtiveSubscription";

const EmployerDashboardIndex = ({ data }) => {
  const { t } = useTranslation();

  const cardClasses =
    "shadow-md rounded-lg border border-gray-200 px-4 py-5 bg-white";

  const job_updates = data?.job_updates?.map((job) => ({
    title: job?.job_role,
    location: job?.location,
    validTill: job?.start_date,
    time: `${job?.start_time} - ${job?.end_time}`,
    pay: job?.salary,
    applied: job?.no_of_applications,
    capacity: job?.total_vacancy,
    id: job.job_id,
    jobRole: job.job_role,
    status: job.status,
    postedAt: job.posted_on,
    applicants: job.no_of_applications,
    vacancy: job.no_of_applications,
    totalVacancy: job.total_vacancy,
    ...job,
  }));
  const s = {
    job_id: 267,
    job_role: "Senior Admin",
    exp_level: "Experience",
    no_of_view: "0 people viewed",
    salary: "CHF 15/hr",
    total_vacancy: 5,
    no_of_applications: 0,
    start_date: "29 Sep 2025",
    start_time: "12:00 PM",
    end_time: "02:00 PM",
    location: "105 Dangat Patil Nagar, 413102, Shivane, Pune, Pune",
    status: "save-as-draft",
    posted_on: "26 Sep 2025 05:24 AM",
  };

  return (
    <section className="w-full p-2 sm:p-4">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Left Section */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-5">
          {/* Jobs Open Card */}
          <div className={cardClasses}>
            <h3 className="text-md sm:text-lg font-medium text-gray-600">
              {t("Ongoing Jobs")}
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-1 sm:gap-2 mt-2">
              <span className="text-3xl sm:text-5xl font-bold text-gray-800">
                {data?.ongoingcount}
              </span>
              <span className="text-sm sm:text-lg text-gray-500">
                {t("Jobs Ongoing")}
              </span>
            </div>
          </div>
          <DashboardAvtiveSubscription />
          {/* Applicants Summary */}
          {/* <ApplicantsSummary data={data} /> */}
        </div>

        {/* Middle Section - Job Statistics */}
        <div className="lg:col-span-6 mt-4 lg:mt-0">
          <JobStatistics data={data} />
        </div>

        {/* Right Section */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-5 mt-4 lg:mt-0">
          {/* Applicants Today Card */}
          <div className={cardClasses}>
            <h3 className="text-sm sm:text-md font-medium text-gray-600">
              {t("Applicants Today")}
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-1 sm:gap-2 mt-2">
              <span className="text-3xl sm:text-5xl font-bold text-gray-800">
                {data?.applicants_today?.applicants_applied}
              </span>
              <span className="text-sm sm:text-lg text-gray-500">
                {t("Applications applied")}
              </span>
            </div>
          </div>

          {/* Expenses Chart */}
          {/* <ExpensesChart data={data} /> */}
          <ApplicantsSummary data={data} />
        </div>
      </div>

      {/* Charts Section */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mt-4 sm:mt-5"> */}
      <div className="space-y-5 mt-4 sm:mt-5">
        {/* <SkillDemandSupplyChart data={data} t={t} /> */}
        {/* <TopRolesTable data={data} t={t} /> */}
        <ReusableTable
          title="Top Employees"
          isDateFilter={false}
          columns={[
            { key: "srNo", label: "Sr No" },
            { key: "employee_name", label: "Employee Name" },
            { key: "jobs_completed", label: "Completed Jobs" },
            { key: "rating", label: "Rating" },
          ]}
          data={data?.topEmployees?.map((emp, index) => ({
            srNo: index + 1,
            ...emp,
          }))}
        />
        <ReusableTable
          title="Top Roles"
          isDateFilter={false}
          columns={[
            { key: "srNo", label: "Sr No" },
            { key: "job_title", label: "Job Title" },
            { key: "jobs", label: "Total Applictions" },
            { key: "hires", label: "Hires" },
          ]}
          data={data?.top_roles?.map((emp, index) => ({
            srNo: index + 1,
            ...emp,
          }))}
        />
      </div>

      {/* Job Updates */}
      <div className="space-y-4 mt-4 sm:mt-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b-2 gap-2 pb-2">
          <h1 className="text-md sm:text-lg font-semibold text-gray-800">
            {t("Job Updates")}
          </h1>
          <Link
            className="flex gap-1 text-blue-600 hover:underline text-sm sm:text-base"
            to={"/dashboard/jobs-listing"}
          >
            {t("View All")}
            <span className="font-bold text-base sm:text-xl">{"->"}</span>
          </Link>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {job_updates.map((job) => (
            <DashboardJobCard key={job.id || job.title} job={job} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmployerDashboardIndex;
// import React from "react";
// import ApplicantsSummary from "./ApplicantsSummary";
// import JobStatistics from "./JobStatistics";
// import ExpensesChart from "./ExpensesChart";
// import DashboardJobCard from "./DashboardJobCard";
// import Button from "../../components/ui/Button";
// import { Link } from "react-router-dom";
// import SkillDemandSupplyChart from "./SkillDemandSupplyChart";
// import TopRolesTable from "./TopRolesTable";

// const EmployerDashboardIndex = ({ data }) => {
//   const cardClasses =
//     "shadow-md rounded-lg border border-gray-200 px-4 py-5 bg-white";
//   const job_updates = data?.job_updates?.map((job) => ({
//     title: job?.title,
//     location: job?.location,
//     validTill: job?.valid_till,
//     time: job?.time,
//     pay: job?.salary_range,
//     applied: job?.applications_count,
//     capacity: job?.total_capacity,
//   }));

//   return (
//     <section className="w-full">
//       {/* Top Section */}
//       <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
//         {/* Left Section */}
//         <div className="md:col-span-3 space-y-5">
//           {/* Jobs Open Card */}
//           <div className={cardClasses}>
//             <h3 className="text-lg font-medium text-gray-600">Ongoing Jobs</h3>
//             <div className="flex items-baseline gap-2 mt-2">
//               <span className="text-5xl font-bold text-gray-800">
//                 {data?.ongoingcount}
//               </span>
//               <span className="text-lg text-gray-500">Jobs Ongoing</span>
//             </div>
//           </div>

//           {/* Applicants Summary */}
//           <ApplicantsSummary data={data} />
//         </div>

//         {/* Middle Section - Job Statistics */}
//         <div className="md:col-span-6">
//           <JobStatistics data={data} />
//         </div>

//         {/* Right Section */}
//         <div className="md:col-span-3 space-y-5">
//           {/* Applicants Today Card */}
//           <div className={cardClasses}>
//             <h3 className="text-sm font-medium text-gray-600">
//               Applicants Today
//             </h3>
//             <div className="flex items-baseline gap-2 mt-2">
//               <span className="text-5xl font-bold text-gray-800">
//                 {data?.applicants_today?.applicants_applied}
//               </span>
//               <span className="text-lg text-gray-500">
//                 Applications applied
//               </span>
//             </div>
//           </div>

//           {/* Expenses Chart */}
//           <ExpensesChart data={data} />
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
//         <SkillDemandSupplyChart data={data} />
//         <TopRolesTable data={data} />
//       </div>

//       {/* Job Updates */}
//       <div className="space-y-4 mt-5">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b-2 gap-2">
//           <h1 className="text-lg font-semibold text-gray-800">Job Updates</h1>
//           <Link
//             className="flex gap-1 text-blue-600 hover:underline"
//             to={"/dashboard/jobs-listing"}
//           >
//             View All <span className="font-bold text-xl">{"->"}</span>
//           </Link>
//         </div>

//         {/* Job Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//           {job_updates.map((job) => (
//             <DashboardJobCard key={job.id || job.title} job={job} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EmployerDashboardIndex;
// import React from "react";
// import ApplicantsSummary from "./ApplicantsSummary";
// import JobStatistics from "./JobStatistics";
// import ExpensesChart from "./ExpensesChart";
// import DashboardJobCard from "./DashboardJobCard";
// import Button from "../../components/ui/Button";
// import { Link } from "react-router-dom";
// import SkillDemandSupplyChart from "./SkillDemandSupplyChart";
// import TopRolesTable from "./TopRolesTable";

// const EmployerDashboardIndex = ({ data }) => {
//   const cardClasses =
//     "shadow-md rounded-lg border border-gray-200 px-4 py-5 bg-white";
//   const job_updates = data?.job_updates?.map((job) => ({
//     title: job?.title,
//     location: job?.location,
//     validTill: job?.valid_till,
//     time: job?.time,
//     pay: job?.salary_range,
//     applied: job?.applications_count,
//     capacity: job?.total_capacity,
//   }));

//   return (
//     <section className="w-full">
//       <div className="flex gap-5">
//         {/* Left Section */}
//         <div className="w-[25%] space-y-5">
//           {/* Jobs Open Card */}
//           <div className={cardClasses}>
//             <h3 className="text-lg font-medium text-gray-600">Ongoing Jobs</h3>
//             <div className="flex items-baseline gap-2 mt-2">
//               <span className="text-5xl font-bold text-gray-800">
//                 {data?.ongoingcount}
//               </span>
//               <span className="text-lg text-gray-500">Jobs Ongoing</span>
//             </div>
//           </div>

//           {/* Applicants Summary */}
//           <ApplicantsSummary data={data} />
//         </div>

//         {/* Middle Section - Job Statistics */}
//         <JobStatistics data={data} />

//         {/* Right Section */}
//         <div className="w-[25%] space-y-5">
//           {/* Applicants Today Card */}
//           <div className={cardClasses}>
//             <h3 className="text-sm font-medium text-gray-600">
//               Applicants Today
//             </h3>
//             <div className="flex items-baseline gap-2 mt-2">
//               <span className="text-5xl font-bold text-gray-800">
//                 {data?.applicants_today?.applicants_applied}
//               </span>
//               <span className="text-lg text-gray-500">
//                 Applications applied
//               </span>
//             </div>
//           </div>

//           {/* Expenses Chart */}
//           <ExpensesChart data={data} />
//         </div>
//       </div>
//       <div className="w-full flex  gap-5 mt-5">
//         <SkillDemandSupplyChart data={data} />
//         <TopRolesTable data={data} />
//       </div>
//       <div className="space-y-4 mt-5">
//         {/* Header */}
//         <div className="flex justify-between items-center border-b-2">
//           <h1 className="text-lg font-semibold text-gray-800">Job Updates</h1>
//           <Link className="flex gap-1" to={"/dashboard/jobs-listing"}>
//             View All <span className="font-bold text-xl">{"->"}</span>
//           </Link>
//         </div>

//         {/* Job Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//           {job_updates.map((job) => (
//             <DashboardJobCard key={job.id || job.title} job={job} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EmployerDashboardIndex;
