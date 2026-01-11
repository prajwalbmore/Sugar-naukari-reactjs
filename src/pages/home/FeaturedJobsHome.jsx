import React from "react";
import Badge from "../../components/ui/Badge";
import { Link } from "react-router-dom";
import JobCard from "./JobCard";
import { useTranslation } from "react-i18next";
import { useGetJobswithoutloginQuery } from "../../services/jobApiSlice";

const FeaturedJobsHome = () => {
  const { data, isLoading } = useGetJobswithoutloginQuery();
  const { t } = useTranslation();

  // Agar data aaya hai to latest 6 jobs le lo (maan ke chalte hai data ek array hai)
  const jobs = data?.data ? [...data.data].slice(-6).reverse() : [];

  return (
    <section className="space-y-10 px-4 md:px-2 lg:px-24 py-10">
      {/* Header */}
      <div className="">
        <div className="text-center">
          <Badge text="Featured Jobs" />
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-4 gap-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
            {t("Find work that fits your life")}
          </h2>
          <Link
            to="/jobs"
            className="font-semibold bg-dark text-white px-6 lg:px-10 py-3 rounded-full shadow hover:opacity-90 transition"
            aria-label="Show all jobs"
          >
            {t("Show all")}
          </Link>
        </div>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <p>Loading jobs...</p>
        ) : jobs.length > 0 ? (
          jobs.map((job, index) => <JobCard key={job.id} job={job} />)
        ) : (
          <p>No jobs found</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedJobsHome;

// import React from "react";
// import Badge from "../../components/ui/Badge";
// import { Link } from "react-router-dom";
// import JobCard from "./JobCard";
// import { useTranslation } from "react-i18next";
// import { useGetJobswithoutloginQuery } from "../../services/jobApiSlice";

// const FeaturedJobsHome = () => {

//   const jobs = [
//     {
//       title: "Social Media Assistant",
//       companyName: "Nomand",
//       logo: "/assets/landingpage/logo/Company Logo.png",
//       verified: true,
//       location: "Paris, France",
//       rating: "4.5",
//       duration: "3 hours ago",
//       views: "10 people viewed",
//       validTill: "Sept 12, 2024",
//       time: "5 PM - 9 PM",
//       pay: "$20/hr",
//     },
//     {
//       title: "Graphic Designer",
//       companyName: "Creatives Inc.",
//       logo: "/assets/landingpage/logo/Company Logo.png",
//       verified: true,
//       location: "London, UK",
//       rating: "4.7",
//       duration: "5 hours ago",
//       views: "25 people viewed",
//       validTill: "Sept 15, 2024",
//       time: "10 AM - 4 PM",
//       pay: "$25/hr",
//     },
//     {
//       title: "Content Writer",
//       companyName: "WriteWell",
//       logo: "/assets/landingpage/logo/Company Logo.png",
//       verified: true,
//       location: "Berlin, Germany",
//       rating: "4.3",
//       duration: "1 day ago",
//       views: "30 people viewed",
//       validTill: "Sept 20, 2024",
//       time: "9 AM - 1 PM",
//       pay: "$18/hr",
//     },
//     {
//       title: "Social Media Assistant",
//       companyName: "Nomand",
//       logo: "/assets/landingpage/logo/Company Logo.png",
//       verified: true,
//       location: "Paris, France",
//       rating: "4.5",
//       duration: "3 hours ago",
//       views: "10 people viewed",
//       validTill: "Sept 12, 2024",
//       time: "5 PM - 9 PM",
//       pay: "$20/hr",
//     },
//     {
//       title: "Graphic Designer",
//       companyName: "Creatives Inc.",
//       logo: "/assets/landingpage/logo/Company Logo.png",
//       verified: true,
//       location: "London, UK",
//       rating: "4.7",
//       duration: "5 hours ago",
//       views: "25 people viewed",
//       validTill: "Sept 15, 2024",
//       time: "10 AM - 4 PM",
//       pay: "$25/hr",
//     },
//     {
//       title: "Content Writer",
//       companyName: "WriteWell",
//       logo: "/assets/landingpage/logo/Company Logo.png",
//       verified: true,
//       location: "Berlin, Germany",
//       rating: "4.3",
//       duration: "1 day ago",
//       views: "30 people viewed",
//       validTill: "Sept 20, 2024",
//       time: "9 AM - 1 PM",
//       pay: "$18/hr",
//     },
//   ];
//   const { t } = useTranslation();

//   return (
//     <section className="space-y-10 px-4 md:px-2 lg:px-24 py-10">
//       {/* Header */}
//       <div>
//         <Badge text="Featured Jobs" />
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-4 gap-6">
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
//             {t("Find work that fits your life")}

//           </h2>
//           <Link
//             to="/jobs"
//             className="font-semibold bg-dark text-white px-6 lg:px-10 py-3 rounded-full shadow hover:opacity-90 transition"
//             aria-label="Show all jobs"
//           >
//             {t("Show all")}
//           </Link>
//         </div>
//       </div>

//       {/* Job Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {jobs.map((job, index) => (
//           <JobCard key={index} job={job} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FeaturedJobsHome;
