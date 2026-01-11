import { MapPin, Clock, Briefcase, ChevronRight } from "lucide-react";
import React, { useMemo } from "react";
import { FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useApplyAndSaveJobMutation } from "../../../../services/jobApiSlice";
import { handleSubmit } from "../../../../utils/useHandleSubmit";
import { toast } from "sonner";
import { useAuthContext } from "../../../../contexts/auth/context";

export default function JobCard({ job, onApply, refetch }) {
  const { user } = useAuthContext();
  const [applyJob] = useApplyAndSaveJobMutation();
  const postedDate = useMemo(() => {
    if (!job?.createdAt) return "N/A";
    return new Date(job.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }, [job?.createdAt]);

  const skills = job?.skills || [];

  return (
    <article className="group w-full bg-white/80 backdrop-blur-sm border border-teal-600 rounded-3xl transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-2 border-b border-white/30">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center min-w-0 flex-1">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-2xl mr-4 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
              <FaBuilding className="w-7 h-7" />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent truncate transition-transform duration-300">
                {job?.createdBy?.companyName || job?.createdBy?.fullName || "Unknown Company"}
              </h2>
              <p className="text-sm text-gray-500 mt-1 font-medium">
                Posted {postedDate}
              </p>
            </div>
          </div>

          {/* Salary Badge */}
          <div className="flex-shrink-0">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              ₹{job?.salary || 0} LPA
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Title */}
        <Link to={`/jobs/${job._id || ""}`} className="block">
          <h3 className="text-2xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-emerald-900 bg-clip-text text-transparent mb-4 line-clamp-2 leading-tight  transition-transform duration-300">
            {job?.jobTitle || "Job Title"}
          </h3>
        </Link>

        {/* Key Info Grid */}
        <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
          <div className="group flex items-center gap-2 p-3 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 rounded-xl border border-emerald-200/50 hover:bg-emerald-100/80 transition-all duration-300 cursor-pointer">
            <Briefcase className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold text-gray-800">
              {job?.jobRole || "Role"}
            </span>
          </div>

          <div className="group flex items-center gap-2 p-3 bg-gradient-to-r from-orange-50/80 to-yellow-50/80 rounded-xl border border-orange-200/50 hover:bg-orange-100/80 transition-all duration-300 cursor-pointer">
            <Clock className="w-5 h-5 text-orange-600 flex-shrink-0" />
            <span className="font-semibold text-gray-800">
              {job?.exp_level || "Fresher"}
            </span>
          </div>

          <div className="group flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-xl border border-blue-200/50 hover:bg-blue-100/80 transition-all duration-300 cursor-pointer">
            <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <span className="font-semibold text-gray-800 truncate">
              {job?.location || "Location"}
            </span>
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-1">
            <div className="flex flex-wrap gap-2.5">
              {skills.slice(0, 4).map((skill, i) => (
                <span
                  key={i}
                  className="group bg-gradient-to-r from-gray-100/80 to-gray-200/80 hover:from-emerald-100 hover:to-teal-100 text-gray-800 px-4 py-2.5 rounded-2xl text-sm font-semibold border border-gray-300/50 hover:border-emerald-300/80 hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center gap-2 hover:scale-105"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 4 && (
                <span className="bg-gradient-to-r from-gray-100/80 to-gray-200/80 text-gray-600 px-4 py-2.5 rounded-2xl text-sm font-semibold border border-gray-300/50 hover:shadow-lg transition-all duration-300">
                  +{skills.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/30">
          <div className="text-sm text-gray-600 font-medium">
            {job?.vacancy || 0} openings
          </div>

          <div className="flex items-center gap-3">
            {job?.hasApplied ? (
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-6 rounded-2xl shadow-xl flex items-center gap-2 text-sm">
                Applied
              </div>
            ) : (
              <button
                onClick={() => {
                  if (!user) {
                    toast.error("Please login to apply for a job");
                    return;
                  }
                handleSubmit({
                  apiCall: applyJob,
                  values: { jobId: job?._id },
                  successCallback: () => {
                    refetch?.(); // Refresh jobs to update application status
                  }
                });
                }}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] flex items-center gap-2 text-sm active:scale-[0.98]"
              >
                Quick Apply
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
// import { MapPin, Clock, Briefcase } from "lucide-react";
// import React, { useMemo } from "react";
// import { FaBuilding } from "react-icons/fa";
// import { Link } from "react-router-dom";

// export default function JobCard({ job, onApply }) {
//   const postedDate = useMemo(() => {
//     if (!job?.createdAt) return "N/A";
//     return new Date(job.createdAt).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//     });
//   }, [job?.createdAt]);

//   const skills = job?.skills || [];

//   return (
//     <article
//       className="group w-full bg-white border border-gray-200 rounded-2xl shadow-sm
//       hover:shadow-xl hover:border-gray-300 transition-all duration-300 overflow-hidden"
//     >
//       {/* Header */}
//       <div className="p-6 pb-4 border-b border-gray-100">
//         <div className="flex items-start justify-between gap-4">
//           <div className="flex items-center min-w-0 flex-1">
//             <div
//               className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600
//               rounded-2xl flex items-center justify-center text-white shadow-lg mr-4 flex-shrink-0"
//             >
//               <FaBuilding className="w-6 h-6" />
//             </div>

//             <div className="min-w-0 flex-1">
//               <h2 className="text-lg font-bold text-gray-900 truncate group-hover:text-emerald-600 transition-colors">
//                 {job?.createdBy?.fullName || "Unknown Company"}
//               </h2>
//               <p className="text-xs text-gray-500 mt-0.5">
//                 Posted {postedDate}
//               </p>
//             </div>
//           </div>

//           {/* Salary + Apply */}
//           <div className="flex gap-5 flex-shrink-0 text-right">
//             <button
//               onClick={() => onApply?.(job)}
//               className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-1 px-4
//               rounded-xl text-sm font-semibold shadow-sm hover:from-emerald-600 hover:to-teal-700
//               hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2
//               transform hover:scale-[1.02] active:scale-[0.98]"
//             >
//               Apply
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Body */}
//       <div className="p-6">
//         {/* Title */}
//         <Link to={`/jobs/${job._id || ""}`}>
//           <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2 leading-tight">
//             {job?.jobTitle || "Job Title"}
//           </h3>
//         </Link>

//         {/* ---------------------------- */}
//         {/* 50% Info Section + 50% Salary/Openings */}
//         {/* ---------------------------- */}
//         <div className="flex justify-between gap-4 mb-4">
//           {/* LEFT 50% — Role, Exp, Location */}
//           <div className="w-1/2 space-y-2 text-xs text-gray-600">
//             <div className="flex items-center gap-1.5">
//               <Briefcase className="w-4 h-4 text-gray-400" />
//               <span>{job?.jobRole || "Role"}</span>
//             </div>

//             <div className="flex items-center gap-1.5">
//               <Clock className="w-4 h-4 text-gray-400" />
//               <span>{job?.exp_level || "Fresher"}</span>
//             </div>

//             <div className="flex items-center gap-1.5 truncate">
//               <MapPin className="w-4 h-4 text-gray-400" />
//               <span className="truncate">{job?.location || "Location"}</span>
//             </div>
//           </div>

//           {/* RIGHT 50% — Salary + Openings */}
//           <div className="w-1/2 flex flex-col items-end justify-start text-sm">
//             <div className="text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-2">
//               ₹{job?.salary || 0} LPA
//             </div>
//             <span className="text-gray-600">{job?.vacancy || 0} openings</span>
//           </div>
//         </div>

//         {/* Skills */}
//         {skills.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-4">
//             {skills.slice(0, 4).map((skill, i) => (
//               <span
//                 key={i}
//                 className="bg-gray-50 text-gray-700 px-2.5 py-1 rounded-lg text-xs font-medium
//                 border border-gray-200 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
//               >
//                 {skill}
//               </span>
//             ))}

//             {skills.length > 4 && (
//               <span className="bg-gray-100 text-gray-500 px-2.5 py-1 rounded-lg text-xs font-medium">
//                 +{skills.length - 4}
//               </span>
//             )}
//           </div>
//         )}
//       </div>
//     </article>
//   );
// }
