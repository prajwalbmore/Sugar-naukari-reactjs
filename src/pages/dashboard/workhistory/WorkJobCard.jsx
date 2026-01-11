import { BookmarkIcon, ShareIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useTranslation } from "react-i18next";

const WorkJobCard = ({ job, isDetails = true, onClick = () => {} }) => {
  const pct = Math.max(0, Math.min(100, (job.applied / job.capacity) * 100));
  const { t } = useTranslation();
  return (
    <div
      className={`bg-gray-100 w-full flex flex-col md:flex-row justify-between rounded-2xl 
      lg:px-10 md:px-5 px-3 py-5 gap-6 shadow hover:shadow-lg transition`}
    >
      {/* Left Content */}
      <div className="flex-1">
        {/* Job Title */}
        <h3 className="text-lg md:text-xl font-semibold">{job.title}</h3>

        {/* Company Info */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-3">
          <img
            src={job.logo}
            alt={`${job.companyName} logo`}
            className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <h4 className="font-medium text-base md:text-lg">
                {job.companyName}
              </h4>
              {job.verified && (
                <img
                  src="/assets/landingpage/Icons/CloudCheck.png"
                  alt="Verified"
                  className="h-4 w-4"
                />
              )}
            </div>
            <p className="flex items-center gap-1 text-gray-600 text-sm md:text-base">
              <img
                src="/assets/landingpage/Icons/locatio.png"
                alt="Location"
                className="h-4 w-4"
              />
              {job.location}
            </p>

            {/* Rating */}
            <div className="flex items-center text-sm text-gray-700 gap-2 mt-1">
              <div className="flex items-center gap-1 border-[#7C8493] pr-2">
                <img
                  src="/assets/landingpage/Icons/StarRating.png"
                  alt="Rating"
                  className="h-4 w-4"
                />
                <span>{job.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="flex flex-wrap gap-2 md:gap-3 mt-3 text-xs sm:text-sm md:text-base font-bold">
          <span className="bg-[#56CDAD1A] text-[#56CDAD] px-3 py-1 rounded-full">
            {t("Time Period")}: {job.validTill}
          </span>
          <span className="border border-[#FFB836] text-[#FFB836] px-3 py-1 rounded-full">
            {t("Working Hours")}: {job.time}
          </span>
          <span className="border border-black px-3 py-1 rounded-full">
            {t("Salary")}: {job.pay}
          </span>
        </div>
      </div>

      {/* Right Content */}
      <div
        className={`w-full md:w-auto flex justify-center md:justify-end items-center`}
      >
        <button
          type="button"
          onClick={onClick}
          className="w-full md:w-auto rounded-full bg-black text-white py-2 px-6 
          text-sm sm:text-base md:text-lg font-medium hover:opacity-90"
        >
          {job?.is_review_given ? t("View Review") : t("Review")}
        </button>
      </div>
    </div>
  );
};

export default WorkJobCard;
// import { BookmarkIcon, ShareIcon } from "@heroicons/react/24/outline";
// import React from "react";
// import { Link } from "react-router-dom";

// const WorkJobCard = ({ job, isDetails = true, onClick = () => {} }) => {
//   const pct = Math.max(0, Math.min(100, (job.applied / job.capacity) * 100));

//   return (
//     <div
//       className={`bg-gray-100 w-full flex justify-between rounded-2xl lg:px-10 md:px-5 px-3 py-5 ${
//         isDetails ? "" : "space-y-4"
//       }  shadow hover:shadow-lg transition`}
//     >
//       <div>
//         {/* Job Title */}
//         <h3 className="text-xl font-semibold">{job.title}</h3>

//         {/* Company Info */}
//         <div className="flex gap-4 items-center mt-3">
//           <img
//             src={job.logo}
//             alt={`${job.companyName} logo`}
//             className="h-16 w-16 rounded-full object-cover"
//           />
//           <div className="space-y-1">
//             <div className="flex items-center gap-1">
//               <h4 className="font-medium">{job.companyName}</h4>
//               {job.verified && (
//                 <img
//                   src="/assets/landingpage/Icons/CloudCheck.png"
//                   alt="Verified"
//                   className="h-4 w-4"
//                 />
//               )}
//             </div>
//             <p className="flex items-center gap-1 text-gray-600">
//               <img
//                 src="/assets/landingpage/Icons/locatio.png"
//                 alt="Location"
//                 className="h-4 w-4"
//               />
//               {job.location}
//             </p>

//             {/* Rating, Duration, Views */}
//             <div className="flex items-center text-sm text-gray-700 gap-2">
//               {/* {job.rating && ( */}
//               <div className="flex items-center gap-1 border-[#7C8493] pr-2">
//                 <img
//                   src="/assets/landingpage/Icons/StarRating.png"
//                   alt="Rating"
//                   className="h-4 w-4"
//                 />
//                 <span>{job.rating}</span>
//               </div>
//               {/* )} */}
//               {/* {job.duration && (
//                 <span className="px-2 border-r-2 border-[#7C8493] text-green-600">
//                   {job.duration}
//                 </span>
//               )}
//               {job.views && (
//                 <span className="px-2 text-yellow-800">{job.views}</span>
//               )} */}
//             </div>
//           </div>
//         </div>

//         {/* Job Details */}
//         <div className="flex flex-wrap gap-3 mt-3 text-sm font-bold">
//           <span className="bg-[#56CDAD1A] text-[#56CDAD] px-3 py-1 rounded-full">
//             Time Period : {job.validTill}
//           </span>
//           <span className="border border-[#FFB836] text-[#FFB836] px-3 py-1 rounded-full">
//             Total Working Hours : {job.time}
//           </span>
//           <span className="border border-black px-3 py-1 rounded-full">
//             Total Salary : {job.pay}
//           </span>
//         </div>
//       </div>

//       {/* Actions Section */}
//       <div
//         className={`space-y-3 ${
//           isDetails ? "flex justify-center items-center" : ""
//         }`}
//       >
//         <div className="flex items-center justify-center">
//           <button
//             type="button"
//             onClick={onClick}
//             className="w-full rounded-full bg-black text-white py-2 px-6 text-lg font-medium hover:opacity-90"
//           >
//             Review Job
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkJobCard;
