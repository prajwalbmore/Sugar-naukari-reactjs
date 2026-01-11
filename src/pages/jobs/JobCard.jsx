import {
  BookmarkIcon,
  ShareIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/ui/Modal";
import ShareModal from "./ShareModal";
import { useDisclosure } from "../../hooks/useDisclosure";
import Button from "../../components/ui/Button";
import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid";
import { handleSubmit } from "../../utils/useHandleSubmit";
import { useAuthContext } from "../../contexts/auth/context";
import {
  useApplyAndSaveJobMutation,
  useMarkAsUnusedJobMutation,
} from "../../services/jobApiSlice";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const JobCard = ({ job = {}, isDetails = false, refetch = () => {} }) => {
  const pct = Math.max(
    0,
    Math.min(100, ((job.applied || 0) / (job.capacity || 1)) * 100)
  );
  const { t } = useTranslation();

  const [isOpen, { open, close }] = useDisclosure(false);
  const { user } = useAuthContext();

  const [apply, { isLoading }] = useApplyAndSaveJobMutation();
  const [markAsUnused, { isLoading: markAsUnusedLoading }] =
    useMarkAsUnusedJobMutation();
  const [save, { isLoading: saveisLoading }] = useApplyAndSaveJobMutation();
  const navigate = useNavigate();
  const onApply = async () => {
    if (!user) {
      toast.error("Please login to apply for a job");
      return;
    }
    const res = await handleSubmit({
      apiCall: apply,
      // refetch: refetch,
      transformValues: () => ({
        employee_id: user?.id,
        job_id: job.id,
        status: "applied",
      }),
    });
    navigate("/dashboard/jobs");
  };

  const onSave = async () => {
    if (!user) {
      toast.error("Please login to save a job");
      return;
    }
    handleSubmit({
      apiCall: save,
      refetch: refetch,
      transformValues: () => ({
        employee_id: user?.id,
        job_id: job.id,
        status: "save",
      }),
    });
  };
  const onUnused = async () => {
    handleSubmit({
      apiCall: markAsUnused,
      refetch: refetch,
      transformValues: () => ({
        employee_id: user?.id,
        job_id: job.id,
      }),
    });
  };

  return (
    <>
      <div
        className={`bg-white w-full flex flex-col md:flex-row border justify-between rounded-2xl p-5 md:p-10 relative shadow hover:shadow-lg transition ${
          isDetails ? "" : "space-y-4 md:space-y-0"
        }`}
      >
        {/* Close Button */}
        {!isDetails && user && (
          <div className="absolute top-3 right-4">
            <Button
              onClick={onUnused}
              variant="flat"
              isIcon
              className="rounded-full"
              title="Close"
            >
              <XCircleIcon className="h-6 w-6" strokeWidth={2} />
            </Button>
          </div>
        )}

        {/* Job Info */}
        <div className="flex-1">
          {isDetails ? (
            <h3 className="text-lg sm:text-xl font-semibold max-w-xl">
              {job.title}
            </h3>
          ) : (
            <Link to={`${job.id || ""}`}>
              <h3 className="text-lg sm:text-xl font-semibold hover:underline truncate">
                {job.title
                  ? job.title.length > 40
                    ? job.title.slice(0, 40) + "..."
                    : job.title
                  : "Untitled Job"}
              </h3>
            </Link>
          )}

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-3">
            <img
              src={job.logo || "/assets/landingpage/logo/placeholder.png"}
              alt={`${job.companyName || "Company"} logo`}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-1 flex-wrap">
                <h4 className="font-medium">{job.companyName || "Unknown"}</h4>
                {job.verified && (
                  <img
                    src="/assets/landingpage/Icons/CloudCheck.png"
                    alt="Verified"
                    className="h-4 w-4"
                  />
                )}
              </div>
              <p className="flex items-center gap-1 text-gray-600 text-sm sm:text-base">
                <img
                  src="/assets/landingpage/Icons/locatio.png"
                  alt="Location"
                  className="h-4 w-4"
                />
                {job.location || "N/A"}
              </p>

              <div className="flex flex-wrap items-center text-sm text-gray-700 gap-2 mt-1 sm:mt-0">
                <div className="flex items-center gap-1 border-r-2 border-[#7C8493] pr-2">
                  <img
                    src="/assets/landingpage/Icons/StarRating.png"
                    alt="Rating"
                    className="h-4 w-4"
                  />
                  <span>{job.rating || "0"}</span>
                </div>
                {job.duration && (
                  <span className="px-2 border-r-2 border-[#7C8493] text-green-600">
                    {job.duration}
                  </span>
                )}
                {job.views && (
                  <span className="px-2 text-yellow-800">{job.views}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3 text-sm font-bold">
            {job.validTill && (
              <span className="bg-[#56CDAD1A] text-[#56CDAD] px-3 py-1 rounded-full text-xs sm:text-sm">
                {t("Valid till")} {job.validTill}
              </span>
            )}
            {job.time && (
              <span className="border border-[#FFB836] text-[#FFB836] px-3 py-1 rounded-full text-xs sm:text-sm">
                {job.time}
              </span>
            )}
            {job.pay && (
              <span className="border border-black px-3 py-1 rounded-full text-xs sm:text-sm">
                {job.pay}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div
          className={`mt-4 md:mt-0 flex flex-col md:justify-between items-start md:items-end gap-3 w-full md:w-auto`}
        >
          <div className="flex gap-2 items-center w-full md:w-auto flex-wrap">
            <Button
              type="button"
              className="flex-1 md:flex-none w-full md:w-auto rounded-full bg-black text-white py-2 px-6 text-sm font-medium hover:opacity-90"
              onClick={onApply}
              loading={isLoading}
            >
              {!isLoading && t("Apply")}
            </Button>
            <Button
              type="button"
              aria-label="Bookmark"
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={onSave}
            >
              {job.is_save ? (
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

          {!isDetails && (
            <div className="w-full mt-3 md:mt-0">
              <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full bg-amber-300 transition-all duration-300 ease-in-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-700">
                <span className="font-semibold">{job.applied || 0}</span>
                <span className="text-gray-500">
                  {" "}
                  {t("of")} {job.capacity || 0} {t("capacity")}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <Modal open={isOpen} onClose={close} title="Share this job" size="lg">
        <ShareModal onClose={close} />
      </Modal>
    </>
  );
};

export default JobCard;
// import {
//   BookmarkIcon,
//   ShareIcon,
//   XCircleIcon,
// } from "@heroicons/react/24/outline";
// import React from "react";
// import { Link } from "react-router-dom";
// import Modal from "../../components/ui/Modal";
// import ShareModal from "./ShareModal";
// import { useDisclosure } from "../../hooks/useDisclosure";
// import Button from "../../components/ui/Button";
// import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid";
// import { handleSubmit } from "../../utils/useHandleSubmit";
// import { useAuthContext } from "../../contexts/auth/context";
// import { useApplyAndSaveJobMutation } from "../../services/jobApiSlice";

// const JobCard = ({ job = {}, isDetails = false, refetch = () => {} }) => {
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
//                 {job.location || "N/A"}
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
//           <div className="flex gap-2 items-center">
//             <Button
//               type="button"
//               className="w-full rounded-full bg-black text-white py-2 px-6 text-sm font-medium hover:opacity-90"
//               onClick={onApply}
//               loading={isLoading}
//             >
//               {!isLoading && "Apply"}
//             </Button>
//             <Button
//               type="button"
//               aria-label="Bookmark"
//               className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
//               onClick={onSave}
//             >
//               {job.is_save ? (
//                 <SolidBookmarkIcon className="h-5 w-5" />
//               ) : (
//                 <BookmarkIcon className="h-5 w-5" />
//               )}
//             </Button>
//             <Button
//               type="button"
//               aria-label="Share"
//               className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
//               onClick={open}
//             >
//               <ShareIcon className="h-5 w-5" />
//             </Button>
//           </div>

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

// export default JobCard;
// import {
//   BookmarkIcon,
//   ShareIcon,
//   XCircleIcon,
// } from "@heroicons/react/24/outline";
// import React from "react";
// import { Link } from "react-router-dom";
// import Modal from "../../components/ui/Modal";
// import ShareModal from "./ShareModal";
// import { useDisclosure } from "../../hooks/useDisclosure";
// import Button from "../../components/ui/Button";

// const JobCard = ({ job, isDetails = false }) => {
//   const pct = Math.max(0, Math.min(100, (job.applied / job.capacity) * 100));
//   const [isOpen, { open, close }] = useDisclosure(false);

//   return (
//     <>
//       <div
//         className={`bg-white w-full flex justify-between rounded-2xl px-10 py-5 ${
//           isDetails ? "" : "space-y-4"
//         }  shadow hover:shadow-lg transition`}
//       >
//         <div className="flex justify-between">
//           <Button
//             // onClick={safeClose}
//             variant="flat"
//             isIcon
//             className=" rounded-full"
//             title="Close"
//           >
//             <XCircleIcon className="size-8" />
//           </Button>
//         </div>
//         <div>
//           {/* Job Title */}
//           <Link to={`${job.id}`}>
//             <h3 className="text-xl font-semibold hover:underline">
//               {job.title}
//             </h3>
//           </Link>

//           {/* Company Info */}
//           <div className="flex gap-4 items-center mt-3">
//             <img
//               src={job.logo}
//               alt={`${job.companyName} logo`}
//               className="h-16 w-16 rounded-full object-cover"
//             />
//             <div className="space-y-1">
//               <div className="flex items-center gap-1">
//                 <h4 className="font-medium">{job.companyName}</h4>
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
//                 {job.location}
//               </p>

//               {/* Rating, Duration, Views */}
//               <div className="flex items-center text-sm text-gray-700 gap-2">
//                 <div className="flex items-center gap-1 border-r-2 border-[#7C8493] pr-2">
//                   <img
//                     src="/assets/landingpage/Icons/StarRating.png"
//                     alt="Rating"
//                     className="h-4 w-4"
//                   />
//                   <span>{job.rating}</span>
//                 </div>
//                 <span className="px-2 border-r-2 border-[#7C8493] text-green-600">
//                   {job.duration}
//                 </span>
//                 <span className="px-2 text-yellow-800">{job.views}</span>
//               </div>
//             </div>
//           </div>

//           {/* Job Details */}
//           <div className="flex flex-wrap gap-3 mt-3 text-sm font-bold">
//             <span className="bg-[#56CDAD1A] text-[#56CDAD] px-3 py-1 rounded-full">
//               Valid til {job.validTill}
//             </span>
//             <span className="border border-[#FFB836] text-[#FFB836] px-3 py-1 rounded-full">
//               {job.time}
//             </span>
//             <span className="border border-black px-3 py-1 rounded-full">
//               {job.pay}
//             </span>
//           </div>
//         </div>

//         {/* Actions Section */}
//         <div
//           className={`space-y-3 ${
//             isDetails ? "flex justify-center items-center" : ""
//           }`}
//         >
//           <div className="flex gap-2 items-center">
//             <Button
//               type="button"
//               className="w-full rounded-full bg-black text-white py-2 px-6 text-sm font-medium hover:opacity-90"
//             >
//               Apply
//             </Button>
//             <Button
//               type="button"
//               aria-label="Bookmark"
//               className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
//             >
//               <BookmarkIcon className="h-5 w-5" />
//             </Button>
//             <Button
//               type="button"
//               aria-label="Share"
//               className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
//               onClick={open}
//             >
//               <ShareIcon className="h-5 w-5" />
//             </Button>
//           </div>

//           {!isDetails && (
//             <div className="w-full">
//               <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
//                 <div
//                   className="h-full bg-amber-300 transition-all duration-300 ease-in-out"
//                   style={{ width: `${pct}%` }}
//                 />
//               </div>
//               <p className="mt-2 text-sm text-gray-700">
//                 <span className="font-semibold">{job.applied}</span>
//                 <span className="text-gray-500">
//                   {" "}
//                   of {job.capacity} capacity
//                 </span>
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//       <Modal open={isOpen} onClose={close} title="Share this job" size="lg">
//         <ShareModal isOpen={open} onClose={close} />
//       </Modal>
//     </>
//   );
// };

// export default JobCard;
