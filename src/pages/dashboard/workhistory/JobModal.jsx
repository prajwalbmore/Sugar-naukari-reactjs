import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../../components/ui/Button";
import { useReviewEmployeeJobMutation } from "../../../services/jobApiSlice";
import { handleSubmit } from "../../../utils/useHandleSubmit";
import { useTranslation } from "react-i18next";

// ⭐ Stars Component
const Stars = ({ value = 0, outOf = 5, onChange, disabled = false }) => {
  const handleClick = (index) => {
    if (!disabled && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {Array.from({ length: outOf }).map((_, i) => {
          const isFilled = i < value;
          return (
            <span
              key={i}
              className={`text-2xl ${
                disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              } ${isFilled ? "text-amber-400" : "text-gray-300"}`}
              onClick={() => handleClick(i)}
              aria-label={`${i + 1} star`}
            >
              ★
            </span>
          );
        })}
      </div>
    </div>
  );
};

// 📦 Section Component
function Section({ title, help, children, t }) {
  return (
    <section className="section space-y-1">
      <h3 className="title text-lg font-semibold">{t(title)}</h3>
      <p className="help text-xs text-gray-500">{help}</p>
      {children}
    </section>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  help: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

// 🏷️ JobModal Component
const JobModal = ({ selected, refetch, onClose }) => {
  const job = selected;
  const [reviewJob, { isLoading }] = useReviewEmployeeJobMutation();
  const { t } = useTranslation();

  // ✅ Maintain ratings state
  const [ratings, setRatings] = useState({
    clarity: job.ratings.clarity || 0,
    conditions: job.ratings.conditions || 0,
    payment: job.ratings.payment || 0,
    communication: job.ratings.communication || 0,
    accuracy: job.ratings.accuracy || 0,
  });

  // Update specific rating
  const handleRatingChange = (key, value) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  // Submit handler
  const onSubmit = () => {
    console.log("Submitted ratings:", ratings);
    handleSubmit({
      values: ratings,
      apiCall: reviewJob,
      refetch: () => {
        refetch();
        onClose();
      },
      transformValues: (vals) => {
        const payload = {
          job_id: job.job_id,
          clarity_of_instruction: vals.clarity,
          working_conditions: vals.conditions,
          payment_timeliness: vals.payment,
          communication: vals.communication,
          task_accuracy: vals.accuracy,
        };
        return payload;
      },
    });
  };

  const ratingSections = [
    {
      key: "clarity",
      title: "Clarity of Instructions",
      help: "Did the company provide precise and complete instructions for the job?",
    },
    {
      key: "conditions",
      title: "Working Conditions",
      help: "How would you rate the working atmosphere, schedule, and safety?",
    },
    {
      key: "payment",
      title: "Payment Timeliness",
      help: "Did the company pay on time as agreed?",
    },
    {
      key: "communication",
      title: "Communication",
      help: "Was the company available to answer questions or clarify issues?",
    },
    {
      key: "accuracy",
      title: "Task Accuracy",
      help: "How well did the job match the description?",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Job Header */}
      <div className="bg-white rounded-2xl px-5 py-5 space-y-4 shadow hover:shadow-lg transition">
        <h3 className="text-xl font-semibold">{job.title}</h3>

        <div className="flex gap-4 items-center">
          <img
            src={job.logo}
            alt={`${job.companyName} logo`}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <h4 className="font-medium">{job.companyName}</h4>
              {job.verified && (
                <img
                  src="/assets/landingpage/Icons/CloudCheck.png"
                  alt="Verified"
                  className="h-4 w-4"
                />
              )}
            </div>
            <p className="flex items-center gap-1 text-gray-600">
              <img
                src="/assets/landingpage/Icons/locatio.png"
                alt="Location"
                className="h-4 w-4"
              />
              {job.location}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-3 text-sm font-bold">
          <span className="bg-[#56CDAD1A] text-[#56CDAD] px-3 py-1 rounded-full">
            {t("Time Period")}: {job.validTill}
          </span>
          <span className="border border-[#FFB836] text-[#FFB836] px-3 py-1 rounded-full">
            {t("Total Working Hour")}: {job.time}
          </span>
          <span className="border border-black px-3 py-1 rounded-full">
            {t("Total Salary")}: {job.pay}
          </span>
        </div>
      </div>

      {/* ⭐ Ratings */}
      <div className="container bg-white rounded-2xl space-y-5 px-5 py-5">
        {ratingSections.map(({ key, title, help }) => (
          <Section key={key} title={title} help={help} t={t}>
            <Stars
              value={ratings[key]}
              onChange={(val) => handleRatingChange(key, val)}
              disabled={job?.is_review_given}
            />
          </Section>
        ))}
      </div>

      {/* Submit */}
      {!job?.is_review_given && (
        <Button
          onClick={onSubmit}
          className="w-full bg-dark text-white rounded-lg py-3"
          loading={isLoading}
        >
          {!isLoading && t("Submit")}
        </Button>
      )}
    </div>
  );
};

JobModal.propTypes = {
  selected: PropTypes.shape({
    title: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    verified: PropTypes.bool,
    location: PropTypes.string.isRequired,
    validTill: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    pay: PropTypes.string.isRequired,
    ratings: PropTypes.shape({
      clarity: PropTypes.number,
      conditions: PropTypes.number,
      payment: PropTypes.number,
      communication: PropTypes.number,
      accuracy: PropTypes.number,
    }),
  }).isRequired,
  onSubmit: PropTypes.func, // ✅ Pass callback or API call
};

export default JobModal;
// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import Button from "../../../components/ui/Button";

// // Stars Component (for display purposes)
// const Stars = ({ value = 0, outOf = 5, onChange }) => {
//   const handleClick = (index) => {
//     if (onChange) onChange(index + 1);
//   };

//   return (
//     <div className="flex items-center gap-2">
//       <div className="flex">
//         {Array.from({ length: outOf }).map((_, i) => {
//           const isFilled = i < value;
//           return (
//             <span
//               key={i}
//               className={`cursor-pointer text-2xl ${
//                 isFilled ? "text-amber-400" : "text-gray-300"
//               }`}
//               onClick={() => handleClick(i)}
//               aria-label={`${i + 1} star`}
//             >
//               ★
//             </span>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// // Section Component
// function Section({ title, help, children }) {
//   return (
//     <section className="section">
//       <h3 className="title text-lg font-semibold">{title}</h3>
//       <p className="help text-xs">{help}</p>
//       {children}
//     </section>
//   );
// }

// Section.propTypes = {
//   title: PropTypes.string.isRequired,
//   help: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired,
// };

// // JobModal Component
// const JobModal = ({ selected }) => {
//   const job = selected;

//   const ratingSections = [
//     {
//       key: "clarity",
//       title: "Clarity of Instructions:",
//       help: "Did the company provide precise and complete instructions for the job, ensuring that the expectations and tasks were clear?",
//       value: job.ratings.clarity || 0,
//     },
//     {
//       key: "conditions",
//       title: "Working Conditions:",
//       help: "How would you rate the conditions under which the job was carried out, including the atmosphere, adherence to schedule, and safety standards?",
//       value: job.ratings.conditions || 0,
//     },
//     {
//       key: "payment",
//       title: "Payment Timeliness:",
//       help: "Did the company adhere to the agreed‑upon payment schedule, ensuring trustworthiness?",
//       value: job.ratings.payment || 0,
//     },
//     {
//       key: "communication",
//       title: "Communication:",
//       help: "How would you assess the quality of communication with the company, particularly availability to answer questions or clarify issues during the job?",
//       value: job.ratings.communication || 0,
//     },
//     {
//       key: "accuracy",
//       title: "Task Accuracy:",
//       help: "How accurately did the tasks performed align with those described in the job posting, and did the job represent the reality of the role?",
//       value: job.ratings.accuracy || 0,
//     },
//   ];

//   return (
//     <div className="space-y-5">
//       <div className="bg-white rounded-2xl px-5 py-5 space-y-4 shadow hover:shadow-lg transition">
//         <h3 className="text-xl font-semibold">{job.title}</h3>

//         <div className="flex gap-4 items-center">
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
//           </div>
//         </div>

//         <div className="flex flex-wrap gap-3 mt-3 text-sm font-bold">
//           <span className="bg-[#56CDAD1A] text-[#56CDAD] px-3 py-1 rounded-full">
//             Time Period: {job.validTill}
//           </span>
//           <span className="border border-[#FFB836] text-[#FFB836] px-3 py-1 rounded-full">
//             Total Working Hour: {job.time}
//           </span>
//           <span className="border border-black px-3 py-1 rounded-full">
//             Total Salary: {job.pay}
//           </span>
//         </div>
//       </div>

//       <div className="container bg-white rounded-2xl space-y-5 px-5 py-5">
//         {ratingSections.map(({ key, title, help, value }) => (
//           <Section key={key} title={title} help={help}>
//             <Stars value={value} />
//           </Section>
//         ))}
//       </div>
//       {!job?.is_review_given && (
//         <Button className="w-full bg-dark text-white rounded-lg py-3">
//           Submit
//         </Button>
//       )}
//     </div>
//   );
// };

// JobModal.propTypes = {
//   selected: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     logo: PropTypes.string.isRequired,
//     companyName: PropTypes.string.isRequired,
//     verified: PropTypes.bool,
//     location: PropTypes.string.isRequired,
//     validTill: PropTypes.string.isRequired,
//     time: PropTypes.string.isRequired,
//     pay: PropTypes.string.isRequired,
//     ratings: PropTypes.shape({
//       clarity: PropTypes.number,
//       conditions: PropTypes.number,
//       payment: PropTypes.number,
//       communication: PropTypes.number,
//       accuracy: PropTypes.number,
//     }),
//   }).isRequired,
// };

// export default JobModal;
