import React from "react";
import JobApplicationOverview from "./JobApplicationOverview";
import EarningsChart from "./EarningsChart";
import AppliedJobsChart from "./AppliedJobsChart";
import EmployeeRecommendCard from "./EmployeeRecommendCard";
import { Link } from "react-router-dom";
import ApplicationsHistory from "./ApplicationsHistory";
import { useTranslation } from "react-i18next";
import JobCard from "./empyoerdashboard/post-job/JobCard";

const EmployeeDashboardIndex = ({ data, refetch }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-8 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Welcome back, Job Seeker!
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                Discover new opportunities, track your applications, and advance your career journey
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="text-3xl font-bold mb-1">{data?.stats?.applied_jobs || 0}</div>
                <div className="text-sm text-blue-100">Applications Sent</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="text-3xl font-bold mb-1">{data?.stats?.profile_view || 0}</div>
                <div className="text-sm text-blue-100">Profile Views</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/dashboard/jobs"
              className="group bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <div className="font-semibold">Browse Jobs</div>
                <div className="text-sm opacity-90">Find new opportunities</div>
              </div>
            </Link>

            <Link
              to="/dashboard/applications"
              className="group bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="font-semibold">My Applications</div>
                <div className="text-sm opacity-90">Track your progress</div>
              </div>
            </Link>

            <Link
              to="/dashboard/personal-info"
              className="group bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div className="font-semibold">Update Profile</div>
                <div className="text-sm opacity-90">Enhance your resume</div>
              </div>
            </Link>

            <Link
              to="/dashboard/saved-jobs"
              className="group bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <div className="font-semibold">Saved Jobs</div>
                <div className="text-sm opacity-90">Your favorites</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Left Column - Overview & Charts */}
          <div className="lg:col-span-8 space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-green-500 text-sm font-medium">+12%</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{data?.stats?.applied_jobs || 0}</div>
                <div className="text-sm text-gray-600">Applied Jobs</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <span className="text-blue-500 text-sm font-medium">+8%</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{data?.stats?.profile_view || 0}</div>
                <div className="text-sm text-gray-600">Profile Views</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </div>
                  <span className="text-purple-500 text-sm font-medium">+5%</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{data?.stats?.saved_jobs || 0}</div>
                <div className="text-sm text-gray-600">Saved Jobs</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-emerald-500 text-sm font-medium">+15%</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{data?.stats?.completed || 0}</div>
                <div className="text-sm text-gray-600">Completed Jobs</div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1  gap-6">
              {/* <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Application Overview</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    This Week
                  </div>
                </div>
                <JobApplicationOverview data={data} t={t} />
              </div> */}

              {/* <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Weekly Earnings</h3>
                  <div className="flex items-center text-sm text-green-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    +CHF 120
                  </div>
                </div>
                <EarningsChart data={data} t={t} />
              </div> */}

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Application Trends</h3>
                  <div className="flex items-center text-sm text-blue-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    +23%
                  </div>
                </div>
                <AppliedJobsChart data={data} t={t} />
              </div>
            </div>
          </div>

          {/* Right Column - Profile & Recommendations */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Completion Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Strength</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Profile Completion</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">15</div>
                    <div className="text-xs text-gray-600">Skills Added</div>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">3</div>
                    <div className="text-xs text-gray-600">Experience</div>
                  </div>
                </div>
                <Link
                  to="/dashboard/personal-info"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-center block"
                >
                  Complete Profile
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Applied to Senior Developer position</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Profile viewed by TechCorp Inc.</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Saved UX Designer position</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Alerts */}
            <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-lg text-white p-6">
              <h3 className="text-xl font-semibold mb-2">🚨 Job Alerts</h3>
              <p className="text-orange-100 mb-4">Get notified when jobs matching your skills are posted</p>
              <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                Enable Alerts
              </button>
            </div>
          </div>
        </div>

        {/* Recommended Jobs Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Recommended for You</h2>
              <p className="text-gray-600">Based on your skills, experience, and preferences</p>
            </div>
            <Link
              to="/dashboard/jobs"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Browse All Jobs
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {data?.recommended_jobs?.slice(0, 6).map((job, index) => (
              <div key={index} className="transform hover:scale-105 transition-all duration-200">
                <JobCard
                  job={job}
                  refetch={refetch}
                  t={t}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Applications History */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Application History</h2>
              <p className="text-gray-600">Track all your job applications and their status</p>
            </div>
            <Link
              to="/dashboard/applications"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              View All
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <ApplicationsHistory data={data} t={t}/>
        </div>
      </div>
    </div>
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
