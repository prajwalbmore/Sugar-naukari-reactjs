import React from "react";
import PropTypes from "prop-types";
import { MapPin } from "lucide-react";

// SkillTag component for individual skill badges
const SkillTag = ({ skill, isMatched = true }) => (
  <span
    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
      isMatched ? "bg-teal-100 text-teal-800" : "bg-gray-100 text-gray-600"
    }`}
  >
    {skill}
  </span>
);

SkillTag.propTypes = {
  skill: PropTypes.string.isRequired,
  isMatched: PropTypes.bool,
};

// Enhanced circular progress component matching the design
const SkillMatchCircle = ({
  percentage = 40,
  matchedCount = 4,
  totalCount = 10,
  t,
}) => {
  const size = 140;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (circumference * percentage) / 100;
  const gap = circumference - dash;

  return (
    <div className="flex gap-5 items-center justify-center">
      <div className="relative">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#14B8A6" // Teal color to match the design
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${gap}`}
            style={{
              transition: "stroke-dasharray 0.5s ease",
              strokeDashoffset: 0,
            }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="text-xs font-medium text-gray-600 mb-1">
              {t("Match")}
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {percentage}%
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center max-w-40">
        <p className="text-sm font-medium text-gray-700">
          {matchedCount} {t("out of")} {totalCount} {t("required skills met")}
        </p>
      </div>
    </div>
  );
};

SkillMatchCircle.propTypes = {
  percentage: PropTypes.number,
  matchedCount: PropTypes.number,
  totalCount: PropTypes.number,
};

// Main Component
export default function RelevantSkillsCard({ userData, t }) {
  // Use the provided jobMatch data or fallback to default
  console.log("userData", userData);
  const job_match = userData?.data?.job_match || {};

  // Ensure job_match is an object and has the required arrays
  const matchedSkills = Array.isArray(job_match?.matched_skills) ? job_match.matched_skills : [];
  const unmatchedSkills = Array.isArray(job_match?.unmatched_skills) ? job_match.unmatched_skills : [];

  return (
    <section>
      {/* Skill Match Score Card */}
      <div className="max-w-xl rounded-2xl border border-slate-200 mt-5 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">
          {t("Skill Match Score")}
        </h3>

        <div className="flex items-center justify-between mb-6">
          {/* Circular Progress */}
          <div className="flex-shrink-0">
            <SkillMatchCircle
              percentage={job_match?.match_percentage || 0}
              matchedCount={job_match?.employee_have || 0}
              totalCount={job_match?.total_required || 0}
              t={t}
            />
          </div>
        </div>

        {/* Skills Tags */}
        <div className="space-y-3">
          {/* Matched Skills */}
          {matchedSkills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {matchedSkills.map((skill, index) => (
                <SkillTag
                  key={`matched-${index}`}
                  skill={skill}
                  isMatched={true}
                />
              ))}
            </div>
          )}

          {/* Unmatched Skills */}
          {unmatchedSkills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {unmatchedSkills.map((skill, index) => (
                <SkillTag
                  key={`unmatched-${index}`}
                  skill={skill}
                  isMatched={false}
                />
              ))}
            </div>
          )}

          {/* No skills message */}
          {matchedSkills.length === 0 && unmatchedSkills.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              <p>{t("No skills data available")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Location Card - Removed since distance functionality was removed */}
      {/* <div className="flex max-w-xl items-center justify-center rounded-2xl border mt-4 border-slate-200 bg-[#FFFCEE] p-5 shadow-sm gap-6">
        <MapPin className="text-amber-600" />
        <h1 className="bg-yellow-100 px-8 py-3 font-semibold rounded-xl text-amber-800">
          {userData?.data?.distance_from_current || "5km"}{" "}
          {t("Away From Location")}
        </h1>
      </div> */}
    </section>
  );
}

RelevantSkillsCard.propTypes = {
  userData: PropTypes.object,
  jobMatch: PropTypes.shape({
    job_id: PropTypes.number,
    total_required: PropTypes.number,
    employee_have: PropTypes.number,
    match_percentage: PropTypes.number,
    matched_skills: PropTypes.arrayOf(PropTypes.string),
    unmatched_skills: PropTypes.arrayOf(PropTypes.string),
  }),
};
// import React from "react";
// import PropTypes from "prop-types";
// import { MapPin } from "lucide-react";

// // SkillBar component
// const SkillBar = ({ label, value, color }) => (
//   <div className="flex items-center gap-4">
//     <span className="w-28 text-sm text-slate-700">{label}</span>
//     {/* <div className="flex-1 h-1 rounded-full bg-slate-200">
//       <div
//         className={`h-1 rounded-full ${color}`}
//         style={{ width: `${value}%` }}
//       />
//     </div> */}
//   </div>
// );

// SkillBar.propTypes = {
//   label: PropTypes.string.isRequired,
//   value: PropTypes.number.isRequired,
//   color: PropTypes.string.isRequired,
// };

// // StatCircle component
// const StatCircle = ({ value = 75, max = 100, label = "Stat" }) => {
//   const size = 60;
//   const strokeWidth = 4;
//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const percentage = Math.min(value / max, 1);
//   const dash = circumference * percentage;
//   const gap = circumference - dash;

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <svg
//         width={size}
//         height={size}
//         viewBox={`0 0 ${size} ${size}`}
//         className="-rotate-90"
//       >
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           stroke="#E5E7EB"
//           strokeWidth={strokeWidth}
//           fill="none"
//         />
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           stroke="#000000"
//           strokeWidth={strokeWidth}
//           fill="none"
//           strokeLinecap="round"
//           strokeDasharray={`${dash} ${gap}`}
//           style={{ transition: "stroke-dashoffset 0.5s ease" }}
//         />
//       </svg>
//       <div className="-mt-11 flex flex-col items-center text-center">
//         <span className="text-xl font-bold text-black">{value}</span>
//       </div>
//       <h1 className="font-bold mt-6 text-gray-600 text-sm">
//         {label} {value}/{max}
//       </h1>
//     </div>
//   );
// };

// StatCircle.propTypes = {
//   value: PropTypes.number,
//   max: PropTypes.number,
//   label: PropTypes.string,
// };

// StatCircle.defaultProps = {
//   value: 75,
//   max: 100,
//   label: "Stat",
// };

// // Main Component
// export default function RelevantSkillsCard({ userData }) {
//   const skills = [
//     { label: "Intelligence", value: 80, color: "bg-sky-500" },
//     { label: "Creativity", value: 60, color: "bg-fuchsia-500" },
//     { label: "Efficiency", value: 40, color: "bg-emerald-500" },
//     { label: "Debugging", value: 25, color: "bg-amber-500" },
//   ];
//   const job_match = {
//     job_id: 241,
//     total_required: 10,
//     employee_have: 4,
//     match_percentage: 40,
//     matched_skills: [
//       "Gestion de caisse",
//       "Permis de conduire B (automobile)",
//       "Service en salle",
//       "Cr\u00e9ation de contenu",
//     ],
//     unmatched_skills: [
//       "Communication",
//       "Cuisine de base",
//       "Gestion du public",
//       "Assistance administrative",
//       "Pr\u00e9paration des boissons",
//       "Travail d\u2019\u00e9quipe",
//     ],
//   };
//   return (
//     <section>
//       <div className="flex max-w-xl  rounded-2xl border mt-4 border-slate-200 bg-white p-5 shadow-sm gap-6">
//         {/* Skills Section */}
//         <div className="flex-1">
//           <h3 className="text-lg font-semibold text-slate-900 mb-4">
//             Relevant Skills
//           </h3>
//           <div className="">
//             {skills.map((skill, index) => (
//               <SkillBar
//                 key={index}
//                 label={skill.label}
//                 value={skill.value}
//                 color={skill.color}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Stat Circle Section */}
//         <div className="flex items-end">
//           <StatCircle value={3} max={4} label="Match" />
//         </div>
//       </div>
//       <div className="flex max-w-xl items-center justify-center rounded-2xl border mt-4 border-slate-200 bg-[#FFFCEE] p-5 shadow-sm gap-6">
//         <MapPin />
//         <h1 className="bg-lightYellow px-8 py-3  font-semibold rounded-xl">
//           {" "}
//           {userData?.data?.distance_from_current} Away From Location
//         </h1>
//       </div>
//     </section>
//   );
// }
