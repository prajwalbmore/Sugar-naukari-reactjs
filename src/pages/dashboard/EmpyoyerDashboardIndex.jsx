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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
              <p className="mt-1 text-gray-600">Manage your jobs and track applications.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard/post-job"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Post New Job
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Jobs Posted</p>
                <p className="text-2xl font-bold text-gray-900">{data?.stats?.total_jobs_posted || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{data?.stats?.active_jobs || 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Applications</p>
                <p className="text-2xl font-bold text-gray-900">{data?.applicants_today?.applicants_applied || 0}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved Applications</p>
                <p className="text-2xl font-bold text-gray-900">{data?.stats?.approved_applications || 0}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Job Statistics Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Job Performance Analytics</h2>
          <JobStatistics data={data} />
        </div>

        {/* Analytics Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Employees</h3>
            <ReusableTable
              title=""
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
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Job Roles</h3>
            <ReusableTable
              title=""
              isDateFilter={false}
              columns={[
                { key: "srNo", label: "Sr No" },
                { key: "job_title", label: "Job Title" },
                { key: "jobs", label: "Total Applications" },
                { key: "hires", label: "Hires" },
              ]}
              data={data?.top_roles?.map((emp, index) => ({
                srNo: index + 1,
                ...emp,
              }))}
            />
          </div>
        </div>

        {/* Recent Job Updates */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Job Updates</h2>
            <Link
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              to={"/dashboard/jobs-listing"}
            >
              View All Jobs
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {job_updates.map((job) => (
              <DashboardJobCard key={job.id || job.title} job={job} t={t} />
            ))}
          </div>
        </div>

        {/* Subscription Status */}
        
      </div>
    </div>
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
