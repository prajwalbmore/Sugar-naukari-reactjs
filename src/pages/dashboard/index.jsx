import React from 'react'

const Dashboard = () => {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard
// import React from "react";
// import OngoingJobs from "./OngoingJobs";
// import StatisticsCards from "./StatisticsCards";
// import EmpyoyerDashboardIndex from "./EmpyoyerDashboardIndex";
// import {
//   useGetDashboardForEmployeeeQuery,
//   useGetDashboardForEmployerQuery,
// } from "../../services/jobApiSlice";
// import Spinner from "../../components/ui/Spinner";
// import {
//   BriefcaseIcon,
//   UserIcon,
//   BookmarkIcon,
//   EnvelopeOpenIcon,
// } from "@heroicons/react/24/solid";
// import EmployeeDashboardIndex from "./EmployeeDashboardIndex";
// import { useAuthContext } from "../../contexts/auth/context";
// import { pollingInterval } from "../../constants/app.constant";

// const Dashboard = () => {
//   const { userType } = useAuthContext();
//   const { data, isLoading, refetch } = useGetDashboardForEmployerQuery(
//     {
//       allFlag: true,
//     },
//     { pollingInterval: 5000 }
//   );
//   console.log("Data", data);
//   // console.log("UserType",userType)
//   const {
//     data: empData,
//     isLoading: empLoading,
//     refetch: emprefetch,
//   } = useGetDashboardForEmployeeeQuery({ pollingInterval: 5000 });
//   const cardData =
//     userType === "employee" ? empData?.data?.stats : data?.data?.stats;
//   const cardsEmployer = [
//     {
//       title: "Total Job Published",
//       value: cardData?.total_jobs_posted,
//       bg: "bg-blue-400",
//       iconBg: "bg-white",
//       Icon: BriefcaseIcon,
//       index: 0,
//       isNavigate: true,
//     },
//     {
//       title: "Active Jobs",
//       value: cardData?.active_jobs,
//       bg: "bg-green-400",
//       iconBg: "bg-white",
//       Icon: UserIcon,
//       index: 2,
//       isNavigate: true,
//     },
//     {
//       title: "Closed Jobs",
//       value: cardData?.closed_jobs,
//       bg: "bg-orange-400",
//       iconBg: "bg-white",
//       Icon: BookmarkIcon,
//       index: 5,
//       isNavigate: true,
//     },
//     {
//       title: "Approved Applications",
//       value: cardData?.approved_applications,
//       bg: "bg-sky-400",
//       iconBg: "bg-white",
//       Icon: EnvelopeOpenIcon,
//       index: 6,
//       isNavigate: true,
//     },
//     {
//       title: "Completed Jobs",
//       value: cardData?.completed_jobs,
//       bg: "bg-purple-400",
//       iconBg: "bg-white",
//       Icon: BriefcaseIcon,
//       index: 4,
//       isNavigate: true,
//     },
//   ];
//   const cards = [
//     {
//       title: "Applied Jobs",
//       value: cardData?.applied_jobs,
//       bg: "bg-blue-400",
//       iconBg: "bg-white",
//       Icon: BriefcaseIcon,
//       index: 1,
//       isNavigate: true,
//     },
//     {
//       title: "Rejected Jobs",
//       value: cardData?.rejected_jobs,
//       bg: "bg-green-400",
//       iconBg: "bg-white",
//       Icon: UserIcon,
//       index: 4,
//       isNavigate: true,
//     },
//     {
//       title: "Saved Jobs",
//       value: cardData?.saved_jobs,
//       bg: "bg-orange-400",
//       iconBg: "bg-white",
//       Icon: BookmarkIcon,
//       index: 2,
//       isNavigate: true,
//     },
//     {
//       title: "Profile View",
//       value: cardData?.profile_view,
//       bg: "bg-sky-400",
//       iconBg: "bg-white",
//       Icon: EnvelopeOpenIcon,
//       isNavigate: false,
//       // index: 3,
//     },
//     {
//       title: "Completed Jobs",
//       value: cardData?.completed,
//       bg: "bg-purple-400",
//       iconBg: "bg-white",
//       Icon: BriefcaseIcon,
//       index: 6,
//       isNavigate: true,
//     },
//   ];
//   if (isLoading || empLoading) return <Spinner />;
//   if (userType === "employer" && !data?.data_available) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white">
//         <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2 text-center">
//           Ready to post your first job?
//         </h1>
//         <p className="text-gray-500 text-base sm:text-lg text-center">
//           Get started with your first job post and attract
//           <br />
//           the right talent today
//         </p>
//       </div>
//     );
//   }
//   return (
//     <section className="">
//       <OngoingJobs />
//       <StatisticsCards
//         cards={userType === "employee" ? cards : cardsEmployer}
//         isNavigate={userType === "employee"}
//       />
//       {userType === "employee" ? (
//         <EmployeeDashboardIndex data={empData?.data} refetch={emprefetch} />
//       ) : (
//         <EmpyoyerDashboardIndex data={data?.data} refetch={refetch} />
//       )}
//     </section>
//   );
// };

// export default Dashboard;
