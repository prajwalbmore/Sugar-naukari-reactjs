import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const JobCard = ({ job = {}}) => {
  console.log("first", job);
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-2xl px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 space-y-4 shadow hover:shadow-lg transition hover:bg-appcolor group">
      {/* Job Title */}
      {/* <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
        {job.title}
      </h3> */}
      <Link to={`/jobs/${job.id || ""}`}>
        <h3 className="text-lg sm:text-xl font-semibold hover:underline truncate">
          {job.title
            ? job.title.length > 40
              ? job.title.slice(0, 40) + "..."
              : job.title
            : "Untitled Job"}
        </h3>
      </Link>

      {/* Company Info */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
        <img
          src={job.logo}
          alt={`${job.companyName} logo`}
          className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-fill"
        />
        <div className="space-y-1 w-full">
          <div className="flex items-center gap-1 flex-wrap">
            <h4 className="font-medium text-sm sm:text-base md:text-lg">
              {job.companyName}
            </h4>
            {job.verified && (
              <img
                src="/assets/landingpage/Icons/CloudCheck.png"
                alt="Verified"
                className="h-3 w-3 sm:h-4 sm:w-4"
              />
            )}
          </div>
          <p className="flex items-center gap-1 text-gray-600 text-xs sm:text-sm">
            <img
              src="/assets/landingpage/Icons/locatio.png"
              alt="Location"
              className="h-3 w-3 sm:h-4 sm:w-4"
            />
            <span className="line-clamp-2">{job.location}</span>
          </p>

          {/* Rating, Duration, Views */}
          <div className="flex items-center text-xs sm:text-sm text-gray-700 gap-2 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-1 border-r-2 border-[#7C8493] pr-2">
              <img
                src="/assets/landingpage/Icons/StarRating.png"
                alt="Rating"
                className="h-3 w-3 sm:h-4 sm:w-4"
              />
              {job.rating}
            </div>
            <span className="px-2 border-r-2 border-[#7C8493] text-green-600 text-xs sm:text-sm">
              {job.duration}
            </span>
            <span className="px-2 text-yellow-800 text-xs sm:text-sm">
              {job.views}
            </span>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="flex flex-wrap gap-1 sm:gap-1 mt-3 text-[11px] font-bold">
        <span className="bg-[#56CDAD1A] text-[#56CDAD] px-2 py-1 sm:px-3 sm:py-1 rounded-full group-hover:bg-[#FFFCEE] group-hover:border-none">
          {t("Valid till")} {job.validTill}
        </span>
        <span className="border border-[#FFB836] text-[#FFB836] px-2 py-1 sm:px-3 sm:py-1 rounded-full group-hover:bg-[#FFFCEE] group-hover:border-none">
          {job.time}
        </span>
        <span className="border border-black px-2 py-1 sm:px-3 sm:py-1 rounded-full group-hover:bg-[#FFFCEE] group-hover:border-none">
          {job.pay}
        </span>
      </div>
    </div>
  );
};

export default JobCard;
// import React from "react";

// const JobCard = ({ job }) => {
//   return (
//     <div className="bg-white rounded-2xl px-5 py-5 space-y-4 shadow hover:shadow-lg transition hover:bg-appcolor group">
//       {/* Job Title */}
//       <h3 className="text-xl font-semibold">{job.title}</h3>

//       {/* Company Info */}
//       <div className="flex gap-4 items-center">
//         <img
//           src={job.logo}
//           alt={`${job.companyName} logo`}
//           className="h-16 w-16 rounded-full object-cover"
//         />
//         <div className="space-y-1">
//           <div className="flex items-center gap-1">
//             <h4 className="font-medium">{job.companyName}</h4>
//             {job.verified && (
//               <img
//                 src="/assets/landingpage/Icons/CloudCheck.png"
//                 alt="Verified"
//                 className="h-4 w-4"
//               />
//             )}
//           </div>
//           <p className="flex items-center gap-1 text-gray-600">
//             <img
//               src="/assets/landingpage/Icons/locatio.png"
//               alt="Location"
//               className="h-4 w-4"
//             />
//             {job.location}
//           </p>

//           {/* Rating, Duration, Views */}
//           <div className="flex items-center text-sm text-gray-700 gap-2">
//             <div className="flex items-center gap-1 border-r-2 border-[#7C8493] pr-2">
//               <img
//                 src="/assets/landingpage/Icons/StarRating.png"
//                 alt="Rating"
//                 className="h-4 w-4"
//               />
//               {job.rating}
//             </div>
//             <span className="px-2 border-r-2 border-[#7C8493] text-green-600">
//               {job.duration}
//             </span>
//             <span className="px-2 text-yellow-800">{job.views}</span>
//           </div>
//         </div>
//       </div>

//       {/* Job Details */}
//       <div className="flex flex-wrap gap-3 mt-3 text-sm font-bold">
//         <span className="bg-[#56CDAD1A] text-[#56CDAD] px-3 py-1 rounded-full group-hover:bg-[#FFFCEE] group-hover:border-none">
//           Valid til {job.validTill}
//         </span>
//         <span className="border border-[#FFB836] text-[#FFB836] px-3 py-1 rounded-full group-hover:bg-[#FFFCEE] group-hover:border-none">
//           {job.time}
//         </span>
//         <span className="border border-black px-3 py-1 rounded-full group-hover:bg-[#FFFCEE] group-hover:border-none">
//           {job.pay}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default JobCard;
