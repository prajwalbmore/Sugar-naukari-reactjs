import React from "react";
import Button from "../../../../components/ui/Button";
import JobHistoryReviewModal from "./JobHistoryReviewModal";
import Modal from "../../../../components/ui/Modal";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import { StarIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

const JobHistoryCard = ({ job, isDetails = true, refetch }) => {
  const [isOpen, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();
  return (
    <>
      <div
        className={`bg-footer border-2 border-appcolor w-full flex flex-col lg:flex-row justify-between rounded-2xl px-5 sm:px-7 md:px-10 py-4 sm:py-5 shadow hover:shadow-lg transition ${
          isDetails ? "" : "space-y-4"
        }`}
      >
        {/* Left Section: Job Info */}
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
            {job.user}
          </h3>

          {/* Completed badge for small/medium screens */}
          <div className="flex justify-end lg:hidden mt-2">
            <div className="bg-appcolor rounded-full text-xs sm:text-sm md:text-base text-gray-700 py-1 px-3 text-center">
              {t("Completed")}
            </div>
          </div>

          {/* Company Info */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center mt-2">
            <div className="space-y-1">
              <h4 className="font-medium text-base sm:text-lg md:text-xl text-gray-500">
                {job.title}
              </h4>
              <p className="flex items-center gap-1 text-sm sm:text-base text-gray-600">
                <img
                  src="/assets/landingpage/Icons/locatio.png"
                  alt="Location"
                  className="h-3 w-3 sm:h-4 sm:w-4"
                />
                {job.location}
              </p>
            </div>
          </div>

          {/* Job Details */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 text-xs sm:text-sm md:text-base font-bold">
            <span className="bg-[#56CDAD1A] text-[#56CDAD] px-2 sm:px-3 py-1 rounded-full">
              {t("Time Period")}: {job.validTill}
            </span>
            <span className="border border-[#FFB836] text-[#FFB836] px-2 sm:px-3 py-1 rounded-full">
              {t("Total Working Hour")}: {job.time}
            </span>
            <span className="border border-black px-2 sm:px-3 py-1 rounded-full">
              {t("Total Salary")}: {job.pay}
            </span>
          </div>
          {job?.is_review_given && (
            <div className="flex items-center gap-1 mt-2 text-sm font-medium text-gray-700">
              <span>{t("Given rating")}:</span>
              <StarIcon className="h-4 w-4 text-yellow-500" />
              <span>{job?.review_rating || 0}</span>
            </div>
          )}
        </div>
        {/* Right Section: Actions */}
        <div className="flex flex-col sm:flex-col-reverse lg:flex-col space-y-4 lg:space-y-16 mt-4 lg:mt-0">
          {/* Completed badge for large screens */}
          <div className="hidden lg:flex justify-end">
            <div className="bg-appcolor rounded-full text-base text-gray-700 py-1 px-3 text-center">
              {t("Completed")}
            </div>
          </div>

          {/* Buttons */}
          <div
            className={
              isDetails
                ? "flex flex-col lg:flex-row items-center lg:justify-end gap-2"
                : "space-y-3"
            }
          >
            <Button
              onClick={() => window.open(job?.invoice_pdf, "_blank")}
              className="rounded-full bg-gray-300 py-2 px-4 sm:px-5 font-bold text-xs sm:text-sm md:text-base hover:opacity-90"
            >
              {t("View Invoice")}
            </Button>
            <Button
              onClick={open}
              className="rounded-full bg-black text-white py-2 px-4 sm:px-5 font-medium text-xs sm:text-sm md:text-base hover:opacity-90"
            >
              {!job?.is_review_given ? t("Review") : t(`View Review`)}
            </Button>
          </div>
        </div>
      </div>

      <Modal
        onClose={close}
        open={isOpen}
        title={!job?.is_review_given ? t("Complete Job") : t("View Review")}
        size="xl"
      >
        <JobHistoryReviewModal
          jobs={job}
          onClose={close}
          refetch={refetch}
          t={t}
        />
      </Modal>
    </>
  );
};

export default JobHistoryCard;

// import { BookmarkIcon, ShareIcon } from "@heroicons/react/24/outline"; // Remove if unused
// import React from "react";
// import { Link } from "react-router-dom";
// import Button from "../../../../components/ui/Button";
// import JobHistoryReviewModal from "./JobHistoryReviewModal";
// import Modal from "../../../../components/ui/Modal";
// import { useDisclosure } from "../../../../hooks/useDisclosure";

// const JobHistoryCard = ({
//   job,
//   isDetails = true,
//   onClick = () => {},
//   refetch,
// }) => {
//   const pct = Math.max(0, Math.min(100, (job.applied / job.capacity) * 100));
//   const [isOpen, { open, close }] = useDisclosure(false);

//   return (
//     <>
//       <div
//         className={`bg-footer border-2 border-appcolor w-full flex justify-between rounded-2xl px-10 py-5 shadow hover:shadow-lg transition ${
//           isDetails ? "" : "space-y-4"
//         }`}
//       >
//         <div>
//           {/* Job Title */}
//           <h3 className="text-xl font-semibold ">{job.user}</h3>

//           {/* Company Info */}
//           <div className="flex gap-4 items-center mt-2">
//             <div className="space-y-1">
//               <div className="flex items-center gap-1">
//                 <h4 className="font-medium text-xl text-gray-500">
//                   {job.title}
//                 </h4>
//               </div>
//               <p className="flex items-center gap-1 text-gray-600">
//                 <img
//                   src="/assets/landingpage/Icons/locatio.png"
//                   alt="Location"
//                   className="h-4 w-4"
//                 />
//                 {job.location}
//               </p>
//             </div>
//           </div>

//           {/* Job Details */}
//           <div className="flex flex-wrap gap-3 mt-3 text-sm font-bold">
//             <span className="bg-[#56CDAD1A] text-[#56CDAD] px-3 py-1 rounded-full">
//               Time Period: {job.validTill}
//             </span>
//             <span className="border border-[#FFB836] text-[#FFB836] px-3 py-1 rounded-full">
//               Total Working Hour: {job.time}
//             </span>
//             <span className="border border-black px-3 py-1 rounded-full">
//               Total Salary: {job.pay}
//             </span>
//           </div>
//         </div>

//         {/* Actions Section */}
//         <div className="space-y-16">
//           <div className="flex justify-end">
//             <div className="bg-appcolor rounded-full text-sm text-gray-700 py-1 px-3 text-center">
//               Completed
//             </div>
//           </div>

//           <div
//             className={isDetails ? "flex items-end justify-end" : "space-y-3"}
//           >
//             <div className="flex gap-2 w-full justify-center">
//               <Button
//                 onClick={() => {
//                   window.open(job?.invoice_pdf, "_blank"); // opens in new tab
//                 }}
//                 className="rounded-full bg-gray-300  py-2 px-5 font-bold hover:opacity-90"
//               >
//                 View Invoice
//               </Button>
//               <Button
//                 onClick={open}
//                 className="rounded-full bg-black text-white py-2 px-5 font-medium hover:opacity-90"
//               >
//                 Review Employee
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Modal onClose={close} open={isOpen} title="Complete Job" size="xl">
//         <JobHistoryReviewModal jobs={job} onClose={close} refetch={refetch} />
//       </Modal>
//     </>
//   );
// };

// export default JobHistoryCard;
