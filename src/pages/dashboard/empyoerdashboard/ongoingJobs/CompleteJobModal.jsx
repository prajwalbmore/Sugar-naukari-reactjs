import React, { useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Button from "../../../../components/ui/Button";
import PropTypes from "prop-types";
import { handleSubmit } from "../../../../utils/useHandleSubmit";
import {
  useEmployeeJobWorkTrackMutation,
  useReviewEmployerJobMutation,
} from "../../../../services/jobApiSlice";

dayjs.extend(customParseFormat);

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
function Section({ title, help, children }) {
  return (
    <section className="space-y-1">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-xs text-gray-500">{help}</p>
      {children}
    </section>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  help: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const generateTimeEntries = ({ period, startTime, endTime }) => {
  if (!period) return [];

  const startDate = dayjs(period, "DD-MM-YYYY");
  const today = dayjs();
  const entries = [];
  let current = startDate;
  let day = 1;

  while (current.isBefore(today) || current.isSame(today)) {
    const diffHrs = dayjs(endTime, "hh:mm A").diff(
      dayjs(startTime, "hh:mm A"),
      "hour"
    );

    entries.push({
      day,
      date: current.format("DD-MM-YYYY"),
      startTime,
      endTime,
      actualHours: diffHrs.toString(), // numeric hours only
    });

    current = current.add(1, "day");
    day++;
  }

  return entries;
};

const CompleteJobModal = ({ jobs, selected, refetch, onClose }) => {
  const [active, setActive] = useState(0);
  const [reviewJob] = useReviewEmployerJobMutation();
  const [trackJob] = useEmployeeJobWorkTrackMutation();

  const [ratings, setRatings] = useState({
    instructions: 0,
    punctuality: 0,
    professionalism: 0,
    workQuality: 0,
    initiative: 0,
  });

  const timeEntriesInit = generateTimeEntries({
    period: jobs?.validTill,
    startTime: jobs?.start_time,
    endTime: jobs?.end_time,
  });

  const [timeEntries, setTimeEntries] = useState(timeEntriesInit);

  const job = {
    title: jobs?.jobRole ?? "N/A",
    empName: selected?.fullName ?? "N/A",
    logo: selected?.avatar ?? "/default-avatar.png",
    location: selected?.location ?? "",
    period: jobs?.validTill ?? "N/A",
    hours: jobs?.shiftTime ?? "0 hrs",
    pay: selected?.estimated_salary ?? 0,
  };

  const handleRatingChange = (key, value) =>
    setRatings((prev) => ({ ...prev, [key]: value }));

  const handleHourChange = (index, value) => {
    const updated = [...timeEntries];
    updated[index].actualHours = value;
    setTimeEntries(updated);
  };

  const completeJob = () => {
    const payload = {
      job_id: jobs?.id,
      employee_id: selected.employee_id,
      working_date: timeEntries.map((e) => e.date),
      actual_work_hrs: timeEntries.map((e) => e.actualHours),
    };
    console.log("Work track payload", payload);
    handleSubmit({ values: payload, apiCall: trackJob });
  };

  const onSubmit = () => {
    const payload = {
      job_id: jobs?.id,
      employee_id: selected.employee_id,
      following_instructions: ratings.instructions,
      punctuality: ratings.punctuality,
      professionalism_and_behavior: ratings.professionalism,
      work_quality: ratings.workQuality,
      independence_and_proactivity: ratings.initiative,
    };
    console.log("Review payload", payload);
    handleSubmit({
      values: payload,
      apiCall: reviewJob,
      refetch: () => {
        refetch();
        onClose();
      },
    });
  };

  const ratingSections = [
    {
      key: "instructions",
      title: "Following Instructions",
      help: "Evaluate the student’s ability to understand and follow instructions accurately.",
    },
    {
      key: "punctuality",
      title: "Punctuality",
      help: "Assess whether the student arrives on time and adheres to schedules.",
    },
    {
      key: "professionalism",
      title: "Professionalism & Behavior",
      help: "Evaluate attitude, behavior, teamwork, and politeness.",
    },
    {
      key: "workQuality",
      title: "Work Quality",
      help: "Assess precision, efficiency, and care in tasks.",
    },
    {
      key: "initiative",
      title: "Independence & Proactivity",
      help: "Evaluate autonomy, initiative, and problem-solving.",
    },
  ];

  return (
    <section className="space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl px-6 py-5 shadow">
        <div className="flex items-center gap-5">
          <img
            src={job.logo}
            alt={job.empName}
            className="h-24 w-24 rounded-full object-cover border"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {job.empName}
            </h3>
            <p className="text-gray-600">{job.title}</p>
            {job.location && (
              <p className="flex items-center gap-1 text-gray-500 mt-1">
                <MapPin className="h-4 w-4 text-red-500" />
                {job.location}
              </p>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-3 mt-5 text-xs font-medium">
          <span className="bg-[#56CDAD1A] text-[#56CDAD] px-3 py-1 rounded-full">
            Time Period: {selected.period}
          </span>
          <span className="border border-[#FFB836] text-[#FFB836] px-3 py-1 rounded-full">
            Estimated Total Working Hour: {selected.total_working_hours}
          </span>
          <span className="border border-black text-black px-3 py-1 rounded-full">
            Estimated Total Salary: {selected.estimated_salary}
          </span>
        </div>
      </div>

      {/* Time Entries */}
      {active === 0 && (
        <div className="space-y-4">
          {timeEntries.map((entry, i) => (
            <div
              key={entry.day}
              className="flex items-center gap-4 rounded-lg shadow-sm"
            >
              {/* Day Card */}
              <div className="bg-[#FFF5CC] border-2 border-appcolor rounded-lg p-3 w-20 h-20 flex flex-col items-center justify-center text-center">
                <span className="text-xs text-gray-700 font-medium">Day</span>
                <span className="text-2xl font-bold text-gray-800">
                  {entry.day}
                </span>
              </div>

              {/* Date */}
              <div className="bg-white rounded-lg p-4 flex-1 min-w-0 shadow">
                <p className="text-xs text-gray-500 mb-1">Date</p>
                <p className="text-lg font-semibold text-gray-800">
                  {entry.date}
                </p>
              </div>

              {/* Time Estimate */}
              <div className="bg-white rounded-lg p-4 flex-1 min-w-0 shadow">
                <p className="text-xs text-gray-500 mb-2">Estimate Time</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-800">
                    {entry.startTime}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <span className="text-lg font-semibold text-gray-800">
                    {entry.endTime}
                  </span>
                </div>
              </div>

              {/* Actual Hours - Editable */}
              <div className="bg-white rounded-lg p-4 w-32 text-center shadow">
                <p className="text-xs text-gray-500 mb-1">Actual Hours</p>
                <input
                  type="number"
                  min="0"
                  className="w-full text-center border rounded p-1 font-semibold text-gray-800"
                  value={entry.actualHours}
                  onChange={(e) => handleHourChange(i, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ⭐ Ratings */}
      {active === 1 && (
        <div className="bg-white rounded-2xl space-y-5 px-5 py-5">
          {ratingSections.map(({ key, title, help }) => (
            <Section key={key} title={title} help={help}>
              <Stars
                value={ratings[key]}
                onChange={(val) => handleRatingChange(key, val)}
                disabled={job?.is_review_given}
              />
            </Section>
          ))}
        </div>
      )}

      <Button
        className="bg-dark w-full rounded-lg text-white py-3"
        onClick={() => {
          if (active === 0) {
            completeJob();
            setActive(1);
          } else {
            onSubmit();
          }
        }}
      >
        Submit
      </Button>
    </section>
  );
};

export default CompleteJobModal;
// import React, { act, useState } from "react";
// import { MapPin, ArrowRight } from "lucide-react";
// import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// import Button from "../../../../components/ui/Button";
// import PropTypes from "prop-types";
// import { handleSubmit } from "../../../../utils/useHandleSubmit";
// import {
//   useEmployeeJobWorkTrackMutation,
//   useReviewEmployerJobMutation,
// } from "../../../../services/jobApiSlice";

// dayjs.extend(customParseFormat);
// // ⭐ Stars Component
// const Stars = ({ value = 0, outOf = 5, onChange, disabled = false }) => {
//   const handleClick = (index) => {
//     if (!disabled && onChange) {
//       onChange(index + 1);
//     }
//   };

//   return (
//     <div className="flex items-center gap-2">
//       <div className="flex">
//         {Array.from({ length: outOf }).map((_, i) => {
//           const isFilled = i < value;
//           return (
//             <span
//               key={i}
//               className={`text-2xl ${
//                 disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
//               } ${isFilled ? "text-amber-400" : "text-gray-300"}`}
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

// // 📦 Section Component
// function Section({ title, help, children }) {
//   return (
//     <section className="section space-y-1">
//       <h3 className="title text-lg font-semibold">{title}</h3>
//       <p className="help text-xs text-gray-500">{help}</p>
//       {children}
//     </section>
//   );
// }

// Section.propTypes = {
//   title: PropTypes.string.isRequired,
//   help: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired,
// };
// const generateTimeEntries = ({ period, startTime, endTime }) => {
//   if (!period) return [];

//   // Parse with correct format
//   const startDate = dayjs(period, "DD-MM-YYYY");

//   const today = dayjs();
//   const dates = [];
//   let current = startDate;
//   let day = 1;

//   while (current.isBefore(today) || current.isSame(today)) {
//     const diffHrs = dayjs(endTime, "hh:mm A").diff(
//       dayjs(startTime, "hh:mm A"),
//       "hour"
//     );

//     dates.push({
//       day,
//       date: current.format("DD-MM-YYYY"),
//       startTime,
//       endTime,
//       actualHours: `${diffHrs} Hrs`,
//     });

//     current = current.add(1, "day");
//     day++;
//   }

//   return dates;
// };

// const CompleteJobModal = ({ jobs, selected, refetch, onClose }) => {
//   const [active, setActive] = useState(0);
//   const [reviewJob] = useReviewEmployerJobMutation();
//   const [trackJob] = useEmployeeJobWorkTrackMutation();
//   const [ratings, setRatings] = useState({
//     instructions: 0,
//     punctuality: 0,
//     professionalism: 0,
//     workQuality: 0,
//     initiative: 0,
//   });
//   //   console.log("jobs", selected);
//   const job = {
//     title: jobs?.jobRole ?? "N/A",
//     empName: selected?.fullName ?? "N/A",
//     logo: selected?.avatar ?? "/default-avatar.png",
//     location: selected?.location ?? "",
//     period: jobs?.validTill ?? "Mar 15 - Dec 20 2024",
//     hours: jobs?.shiftTime ?? "0 hrs",
//     pay: selected?.estimated_salary ?? 0,
//   };
//   const handleRatingChange = (key, value) => {
//     setRatings((prev) => ({ ...prev, [key]: value }));
//   };

//   const timeEntries = generateTimeEntries({
//     period: job.period,
//     startTime: jobs?.start_time,
//     endTime: jobs?.end_time,
//   });
//   const ratingSections = [
//     {
//       key: "instructions",
//       title: "Following Instructions",
//       help: "Evaluate the student’s ability to understand and follow instructions accurately, ensuring tasks are performed as expected.",
//     },
//     {
//       key: "punctuality",
//       title: "Punctuality",
//       help: "Assess whether the student arrives on time and consistently adheres to agreed schedules.",
//     },
//     {
//       key: "professionalism",
//       title: "Professionalism & Behavior",
//       help: "Evaluate the student’s attitude and behavior toward colleagues and the employer, including rule-following, politeness, and teamwork.",
//     },
//     {
//       key: "workQuality",
//       title: "Work Quality",
//       help: "Assess the precision, efficiency, and care the student puts into their tasks, ensuring the output meets company standards.",
//     },
//     {
//       key: "initiative",
//       title: "Independence & Proactivity",
//       help: "Evaluate the student’s ability to work autonomously, take initiative, and solve problems without requiring constant supervision.",
//     },
//   ];
//   const completeJob = () => {
//     const payload = {
//       job_id: jobs?.id,
//       employee_id: selected.employee_id,
//       working_date: timeEntries.map((entry) => entry.date),
//       actual_work_hrs: timeEntries.map(
//         (entry) => entry.actualHours.split(" ")[0]
//       ),
//     };
//     // handleSubmit({
//     //   values: payload,
//     //   apiCall: trackJob,
//     // });
//     console.log("payload", payload);
//   };
//   const onSubmit = () => {
//     const payload = {
//       job_id: jobs?.id,
//       employee_id: selected.employee_id,
//       following_instructions: ratings.instructions,
//       punctuality: ratings.punctuality,
//       professionalism_and_behavior: ratings.professionalism,
//       work_quality: ratings.workQuality,
//       independence_and_proactivity: ratings.initiative,
//     };
//     console.log("Submitted ratings:", payload);
//     // handleSubmit({
//     //   values: payload,
//     //   apiCall: reviewJob,
//     //   refetch: () => {
//     //     refetch();
//     //     onClose();
//     //   },
//     // });
//   };
//   return (
//     <section className="space-y-6">
//       {/* Profile Card */}
//       <div className="bg-white rounded-2xl px-6 py-5 shadow hover:shadow-lg transition">
//         <div className="flex items-center gap-5">
//           <img
//             src={job.logo}
//             alt={job.empName}
//             className="h-24 w-24 rounded-full object-cover border"
//           />
//           <div>
//             <h3 className="text-xl font-semibold text-gray-900">
//               {job.empName}
//             </h3>
//             <p className="text-gray-600">{job.title}</p>
//             {job.location && (
//               <p className="flex items-center gap-1 text-gray-500 mt-1">
//                 <MapPin className="h-4 w-4 text-red-500" />
//                 {job.location}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Badges */}
//         <div className="flex flex-wrap gap-3 mt-5 text-sm font-medium">
//           <span className="bg-[#56CDAD1A] text-[#56CDAD] px-3 py-1 rounded-full">
//             Time Period: {job.period}
//           </span>
//           <span className="border border-[#FFB836] text-[#FFB836] px-3 py-1 rounded-full">
//             Total Working Hour: {job.hours}
//           </span>
//           <span className="border border-black text-black px-3 py-1 rounded-full">
//             Total Salary: {new Intl.NumberFormat("en-IN").format(job.pay)}
//           </span>
//         </div>
//       </div>

//       {/* Time Entries */}
//       {active === 0 && (
//         <div className="space-y-4">
//           {timeEntries.map((entry) => (
//             <div
//               key={entry.day}
//               className="flex items-center gap-4 rounded-lg shadow-sm"
//             >
//               {/* Day Card */}
//               <div className="bg-[#FFF5CC] border-2 border-appcolor rounded-lg p-3 w-20 h-20 flex flex-col items-center justify-center text-center">
//                 <span className="text-xs text-gray-700 font-medium">Day</span>
//                 <span className="text-2xl font-bold text-gray-800">
//                   {entry.day}
//                 </span>
//               </div>

//               {/* Date */}
//               <div className="bg-white rounded-lg p-4 flex-1 min-w-0 shadow">
//                 <p className="text-xs text-gray-500 mb-1">Date</p>
//                 <p className="text-lg font-semibold text-gray-800">
//                   {entry.date}
//                 </p>
//               </div>

//               {/* Time Estimate */}
//               <div className="bg-white rounded-lg p-4 flex-1 min-w-0 shadow">
//                 <p className="text-xs text-gray-500 mb-2">Estimate Time</p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-lg font-semibold text-gray-800">
//                     {entry.startTime}
//                   </span>
//                   <ArrowRight className="w-4 h-4 text-gray-400" />
//                   <span className="text-lg font-semibold text-gray-800">
//                     {entry.endTime}
//                   </span>
//                 </div>
//               </div>

//               {/* Actual Hours */}
//               <div className="bg-white rounded-lg p-4 w-32 text-center shadow">
//                 <p className="text-xs text-gray-500 mb-1">Actual Hours</p>
//                 <p className="text-lg font-semibold text-gray-800">
//                   {entry.actualHours}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       {/* ⭐ Ratings */}
//       {active === 1 && (
//         <div className="container bg-white rounded-2xl space-y-5 px-5 py-5">
//           {ratingSections.map(({ key, title, help }) => (
//             <Section key={key} title={title} help={help}>
//               <Stars
//                 value={ratings[key]}
//                 onChange={(val) => handleRatingChange(key, val)}
//                 disabled={job?.is_review_given}
//               />
//             </Section>
//           ))}
//         </div>
//       )}
//       <Button
//         className="bg-dark w-full rounded-lg text-white py-3"
//         onClick={() => {
//           if (active === 0) {
//             completeJob();
//             setActive((prev) => prev + 1);
//           } else {
//             onSubmit();
//           }
//         }}
//       >
//         Submit
//       </Button>
//     </section>
//   );
// };

// export default CompleteJobModal;
