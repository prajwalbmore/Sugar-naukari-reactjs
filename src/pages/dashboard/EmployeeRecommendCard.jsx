import {
  BookmarkIcon,
  ShareIcon,
  XCircleIcon,
  MapPinIcon,
  StarIcon,
  ClockIcon,
  EyeIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";
import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid";
import { useDisclosure } from "../../hooks/useDisclosure";
import { useAuthContext } from "../../contexts/auth/context";
import { useApplyAndSaveJobMutation } from "../../services/jobApiSlice";
import { handleSubmit } from "../../utils/useHandleSubmit";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import ShareModal from "../jobs/ShareModal";

const EmployeeRecommendCard = ({
  job = {},
  isDetails = false,
  refetch = () => {},
  t,
}) => {
  const pct = Math.max(
    0,
    Math.min(
      100,
      ((job.applications_count || 0) / (job.total_capacity || 1)) * 100
    )
  );

  const [isOpen, { open, close }] = useDisclosure(false);
  const { user } = useAuthContext();

  const [apply, { isLoading }] = useApplyAndSaveJobMutation();
  const [save, { isLoading: saveisLoading }] = useApplyAndSaveJobMutation();

  const onApply = async () => {
    handleSubmit({
      apiCall: apply,
      refetch: refetch,
      transformValues: (vals) => {
        return {
          employee_id: user?.id,
          job_id: job.job_id,
          status: "applied",
        };
      },
    });
  };

  const onSave = async () => {
    handleSubmit({
      apiCall: save,
      refetch: refetch,
      transformValues: (vals) => {
        return {
          employee_id: user?.id,
          job_id: job.job_id,
          status: "save",
        };
      },
    });
  };
  console.log("applications_count", job);
  return (
    <>
      <div className="bg-gray-50 w-full rounded-2xl px-2 py-4 sm:py-4 sm:px-4 shadow-sm hover:shadow-md transition-shadow">
        {/* Header with Bookmark and Share Icons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
          <Link to={`/dashboard/jobs/${job.job_id || ""}`}>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 hover:underline">
              {job.title || "Social Media Assistant"}
            </h3>
          </Link>

          <div className="flex gap-2 items-center mt-2 sm:mt-0">
            <Button
              type="button"
              aria-label="Bookmark"
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={onSave}
            >
              {job?.is_saved ? (
                <SolidBookmarkIcon className="h-5 w-5" />
              ) : (
                <BookmarkIcon className="h-5 w-5" />
              )}
            </Button>
            <Button
              type="button"
              aria-label="Share"
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={open}
            >
              <ShareIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Company Info Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-2">
          <div className="relative flex-shrink-0">
            <img
              src={
                job.company_logo || "/assets/landingpage/logo/placeholder.png"
              }
              alt={`${job.company || "Company"} logo`}
              className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 mb-1">
              <h4 className="text-md sm:text-lg font-medium text-gray-900">
                {job.company || "Nomad"}
              </h4>
              {job.is_verified && (
                <img
                  src="/assets/landingpage/Icons/CloudCheck.png"
                  alt="Verified"
                  className="h-4 w-4 mt-1 sm:mt-0"
                />
              )}
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 text-gray-600 mb-2 text-sm sm:text-base">
              <MapPinIcon className="h-4 w-4 text-red-500" />
              <span>
                {job.location.length > 20
                  ? `${job.location.slice(0, 20)}...`
                  : job.location}
              </span>
            </div>

            {/* Rating, Duration, Views */}
            <div className="flex flex-wrap sm:flex-nowrap items-center text-xs  text-gray-700 gap-2 sm:gap-2">
              <div className="flex items-center gap-1 border-r-2  border-[#7C8493] pr-1">
                <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-xs">{job.employerRating}</span>
              </div>
              {/* <div className="h-4 w-px bg-gray-300 hidden sm:block"></div> */}
              <div className="flex items-center gap-1  text-green-600 font-medium border-r-2 border-[#7C8493] pr-1">
                <ClockIcon className="h-4 w-4" />
                <span>{job.duration || "3 hours ago"}</span>
              </div>
              {/* <div className="h-4 w-px bg-gray-300 text-sm hidden sm:block"></div> */}
              <div className="flex items-center gap-1">
                <EyeIcon className="h-4 w-4" />
                <span>{job.no_of_view}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Job Details Tags */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-2 text-xs sm:text-xs">
          {(job.validTill || true) && (
            <span className="bg-teal-50 text-teal-600 px-2 sm:px-1 py-1 rounded-full font-medium">
              {t("Valid till")} {job.start_date || "Sept 12, 2024"}
            </span>
          )}
          {(job.time || true) && (
            <span className="border border-orange-300 text-orange-600 bg-orange-50 px-2 sm:px-1 py-1 rounded-full font-medium">
              {job.time || "5 PM - 9 PM"}
            </span>
          )}
          {(job.pay || true) && (
            <span className="border border-black text-black bg-white px-2 sm:px-1 py-1 rounded-full font-medium">
              {job.salary || "$20/per hr"}
            </span>
          )}
        </div>

        {/* Progress Bar and Apply Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:mr-6 mb-3 sm:mb-0">
            <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden mb-2">
              <div
                className="h-full bg-yellow-400 transition-all duration-300 ease-in-out rounded-full"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-sm sm:text-base text-gray-700">
              <span className="font-semibold text-gray-900">
                {job?.applications_count || 0} {t("applied")}
              </span>
              <span className="text-gray-500">
                {" "}
                of {job?.total_capacity || 0} {t("capacity")}
              </span>
            </p>
          </div>

          <Button
            type="button"
            className="rounded-full bg-black text-white px-6 sm:px-8 py-2 sm:py-2 text-sm sm:text-base font-semibold hover:bg-gray-800 transition-colors"
            onClick={onApply}
            loading={isLoading}
          >
            {!isLoading && t("Apply")}
          </Button>
        </div>
      </div>

      {/* Share Modal */}
      <Modal open={isOpen} onClose={close} title="Share this job" size="lg">
        <ShareModal onClose={close} />
      </Modal>
    </>
  );
};

export default EmployeeRecommendCard;
// {/* <div className="bg-gray-50 w-full rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
//   {/* Header with Bookmark and Share Icons */}
//   <div className="flex justify-between items-start mb-2">
//     <Link to={`/dashboard/jobs/${job.job_id || ""}`}>
//       <h3 className="text-xl font-semibold text-gray-900 hover:underline">
//         {job.title || "Social Media Assistant"}
//       </h3>
//     </Link>
//     <div className="flex gap-2 items-center">
//       <Button
//         type="button"
//         aria-label="Bookmark"
//         className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
//         onClick={onSave}
//       >
//         {job?.is_saved ? (
//           <SolidBookmarkIcon className="h-5 w-5" />
//         ) : (
//           <BookmarkIcon className="h-5 w-5" />
//         )}
//       </Button>
//       <Button
//         type="button"
//         aria-label="Share"
//         className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
//         onClick={open}
//       >
//         <ShareIcon className="h-5 w-5" />
//       </Button>
//     </div>
//   </div>

//   {/* Company Info Section */}
//   <div className="flex gap-4 items-center mb-2">
//     {/* Company Logo */}
//     <div className="relative">
//       <img
//         src={
//           job.company_logo || "/assets/landingpage/logo/placeholder.png"
//         }
//         alt={`${job.company || "Company"} logo`}
//         className="h-16 w-16 rounded-full object-cover"
//       />
//     </div>

//     <div className="flex-1">
//       {/* Company Name with Verification */}
//       <div className="flex items-center gap-2 mb-1">
//         <h4 className="text-lg font-medium text-gray-900">
//           {job.company || "Nomad"}
//         </h4>
//         {job.verified && (
//           <img
//             src="/assets/landingpage/Icons/CloudCheck.png"
//             alt="Verified"
//             className="h-4 w-4"
//           />
//         )}
//       </div>

//       {/* Location */}
//       <div className="flex items-center gap-1 text-gray-600 mb-2">
//         <MapPinIcon className="h-4 w-4 text-red-500" />
//         <span>
//           {job.location.length > 20
//             ? `${job.location.slice(0, 20)}...`
//             : job.location}
//         </span>
//       </div>

//       {/* Rating, Duration, Views */}
//       <div className="flex items-center text-sm text-gray-700 gap-4">
//         <div className="flex items-center gap-1">
//           <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
//           <span className="font-medium">
//             {job.employerRating || "4.5"}
//           </span>
//         </div>

//         <div className="h-4 w-px bg-gray-300"></div>

//         <div className="flex items-center gap-1 text-green-600 font-medium">
//           <ClockIcon className="h-4 w-4" />
//           <span>{job.duration || "3 hours ago"}</span>
//         </div>

//         <div className="h-4 w-px bg-gray-300"></div>

//         <div className="flex items-center gap-1">
//           <EyeIcon className="h-4 w-4" />
//           <span>{job.no_of_view || "10 people Viewed"}</span>
//         </div>
//       </div>
//     </div>
//   </div>

//   {/* Job Details Tags */}
//   <div className="flex flex-wrap gap-3 mb-2">
//     {(job.validTill || true) && (
//       <span className="bg-teal-50 text-teal-600 px-3 py-1 rounded-full text-sm font-medium">
//         Valid til {job.start_date || "Sept 12, 2024"}
//       </span>
//     )}
//     {(job.time || true) && (
//       <span className="border border-orange-300 text-orange-600 bg-orange-50 px-3 py-1 rounded-full text-sm font-medium">
//         {job.time || "5 PM - 9 PM"}
//       </span>
//     )}
//     {(job.pay || true) && (
//       <span className="border border-black text-black bg-white px-3 py-1 rounded-full text-sm font-medium">
//         {job.pay || "$20/per hr"}
//       </span>
//     )}
//   </div>

//   {/* Progress Bar and Apply Section */}
//   <div className="flex items-center justify-between">
//     <div className="flex-1 mr-6">
//       {/* Progress Bar */}
//       <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden mb-2">
//         <div
//           className="h-full bg-yellow-400 transition-all duration-300 ease-in-out rounded-full"
//           style={{ width: `${pct}%` }}
//         />
//       </div>
//       <p className="text-sm text-gray-700">
//         <span className="font-semibold text-gray-900">
//           {job?.applications_count || 0} applied
//         </span>
//         <span className="text-gray-500">
//           {" "}
//           of {job?.total_capacity || 0} capacity
//         </span>
//       </p>
//     </div>

//     {/* Apply Button */}
//     <Button
//       type="button"
//       className="rounded-full bg-black text-white px-8 py-3 text-sm font-semibold hover:bg-gray-800 transition-colors"
//       onClick={onApply}
//       loading={isLoading}
//     >
//       {!isLoading && "Apply"}
//     </Button>
//   </div>
// </div> */}
// import {
//   BookmarkIcon,
//   ShareIcon,
//   XCircleIcon,
// } from "@heroicons/react/24/outline";
// import React from "react";
// import { Link } from "react-router-dom";
// import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid";
// import { useDisclosure } from "../../hooks/useDisclosure";
// import { useAuthContext } from "../../contexts/auth/context";
// import { useApplyAndSaveJobMutation } from "../../services/jobApiSlice";
// import { handleSubmit } from "../../utils/useHandleSubmit";
// import Button from "../../components/ui/Button";
// import Modal from "../../components/ui/Modal";
// import ShareModal from "../jobs/ShareModal";

// const EmployeeRecommendCard = ({
//   job = {},
//   isDetails = false,
//   refetch = () => {},
// }) => {
//   const pct = Math.max(
//     0,
//     Math.min(100, ((job.applied || 0) / (job.capacity || 1)) * 100)
//   );

//   const [isOpen, { open, close }] = useDisclosure(false);
//   const { user } = useAuthContext();

//   const [apply, { isLoading }] = useApplyAndSaveJobMutation();
//   const [save, { isLoading: saveisLoading }] = useApplyAndSaveJobMutation();
//   const onApply = async () => {
//     handleSubmit({
//       apiCall: apply,
//       refetch: refetch,
//       transformValues: (vals) => {
//         return {
//           employee_id: user?.id,
//           job_id: job.id,
//           status: "applied",
//         };
//       },
//     });
//   };
//   const onSave = async () => {
//     handleSubmit({
//       apiCall: save,
//       refetch: refetch,
//       transformValues: (vals) => {
//         return {
//           employee_id: user?.id,
//           job_id: job.id,
//           status: "save",
//         };
//       },
//     });
//   };

//   return (
//     <>
//       <div
//         className={`bg-white w-full flex border justify-between rounded-2xl px-10 py-5 relative ${
//           isDetails ? "" : "space-y-4"
//         } shadow hover:shadow-lg transition`}
//       >
//         {/* Close Button (only if needed for details mode) */}
//         {!isDetails && (
//           <div className="absolute top-3 right-4">
//             <Button
//               onClick={close}
//               variant="flat"
//               isIcon
//               className="rounded-full"
//               title="Close"
//             >
//               <XCircleIcon className="size-6" strokeWidth={2} />
//             </Button>
//           </div>
//         )}

//         {/* Job Info */}
//         <div>
//           {/* Job Title */}
//           <Link to={`${job.id || ""}`}>
//             <h3 className="text-xl font-semibold hover:underline">
//               {job.title || "Untitled Job"}
//             </h3>
//           </Link>

//           {/* Company Info */}
//           <div className="flex gap-4 items-center mt-3">
//             <img
//               src={job.logo || "/assets/landingpage/logo/placeholder.png"}
//               alt={`${job.companyName || "Company"} logo`}
//               className="h-16 w-16 rounded-full object-cover"
//             />
//             <div className="space-y-1">
//               <div className="flex items-center gap-1">
//                 <h4 className="font-medium">{job.companyName || "Unknown"}</h4>
//                 {job.verified && (
//                   <img
//                     src="/assets/landingpage/Icons/CloudCheck.png"
//                     alt="Verified"
//                     className="h-4 w-4"
//                   />
//                 )}
//               </div>
//               <p className="flex items-center gap-1 text-gray-600">
//                 <img
//                   src="/assets/landingpage/Icons/locatio.png"
//                   alt="Location"
//                   className="h-4 w-4"
//                 />
//                 <span>
//                   {job.location.length > 20
//                     ? `${job.location.slice(0, 20)}...`
//                     : job.location}
//                 </span>
//               </p>

//               {/* Rating, Duration, Views */}
//               <div className="flex items-center text-sm text-gray-700 gap-2">
//                 <div className="flex items-center gap-1 border-r-2 border-[#7C8493] pr-2">
//                   <img
//                     src="/assets/landingpage/Icons/StarRating.png"
//                     alt="Rating"
//                     className="h-4 w-4"
//                   />
//                   <span>{job.rating || "0"}</span>
//                 </div>
//                 {job.duration && (
//                   <span className="px-2 border-r-2 border-[#7C8493] text-green-600">
//                     {job.duration}
//                   </span>
//                 )}
//                 {job.views && (
//                   <span className="px-2 text-yellow-800">{job.views}</span>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Job Details */}
//           <div className="flex flex-wrap gap-3 mt-3 text-sm font-bold">
//             {job.validTill && (
//               <span className="bg-[#56CDAD1A] text-[#56CDAD] px-3 py-1 rounded-full">
//                 Valid till {job.validTill}
//               </span>
//             )}
//             {job.time && (
//               <span className="border border-[#FFB836] text-[#FFB836] px-3 py-1 rounded-full">
//                 {job.time}
//               </span>
//             )}
//             {job.pay && (
//               <span className="border border-black px-3 py-1 rounded-full">
//                 {job.pay}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Actions Section */}
//         <div
//           className={`space-y-3 ${
//             isDetails ? "flex justify-center items-center" : ""
//           }`}
//         >
//   <div className="flex gap-2 items-center">
//     <Button
//       type="button"
//       className="w-full rounded-full bg-black text-white py-2 px-6 text-sm font-medium hover:opacity-90"
//       onClick={onApply}
//       loading={isLoading}
//     >
//       {!isLoading && "Apply"}
//     </Button>
//     <Button
//       type="button"
//       aria-label="Bookmark"
//       className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
//       onClick={onSave}
//     >
//       {job.is_save ? (
//         <SolidBookmarkIcon className="h-5 w-5" />
//       ) : (
//         <BookmarkIcon className="h-5 w-5" />
//       )}
//     </Button>
//     <Button
//       type="button"
//       aria-label="Share"
//       className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
//       onClick={open}
//     >
//       <ShareIcon className="h-5 w-5" />
//     </Button>
//   </div>

//           {!isDetails && (
//             <div className="w-full">
//               <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
//                 <div
//                   className="h-full bg-amber-300 transition-all duration-300 ease-in-out"
//                   style={{ width: `${pct}%` }}
//                 />
//               </div>
//               <p className="mt-2 text-sm text-gray-700">
//                 <span className="font-semibold">{job.applied || 0}</span>
//                 <span className="text-gray-500">
//                   {" "}
//                   of {job.capacity || 0} capacity
//                 </span>
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Share Modal */}
//       <Modal open={isOpen} onClose={close} title="Share this job" size="lg">
//         <ShareModal onClose={close} />
//       </Modal>
//     </>
//   );
// };

// export default EmployeeRecommendCard;
