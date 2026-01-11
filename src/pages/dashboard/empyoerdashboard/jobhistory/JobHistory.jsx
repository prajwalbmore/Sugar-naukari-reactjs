import React, { useState, useMemo, useCallback } from "react";
import JobHistoryCard from "./JobHistoryCard";
import { useGetJobHistoryEmployerQuery } from "../../../../services/jobApiSlice";
import Spinner from "../../../../components/ui/Spinner";
import { useTranslation } from "react-i18next";

const JobHistory = () => {
  const { data, isLoading, refetch } = useGetJobHistoryEmployerQuery();
  const { t } = useTranslation();
  const [q, setQ] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");

  // Normalize jobs
  const jobs = useMemo(
    () =>
      data?.data?.map((job) => ({
        id: job?.job_id,
        title: job?.title || "Social Media Assistant",
        user: job?.employee_name || "Jane Smith",
        companyName: job?.company_name || "Nomand",
        logo: job?.profile_image || "/assets/landingpage/logo/Company Logo.png",
        location: job?.location || "Paris, France",
        rating: 4.5,
        review_rating: job?.review_rating || 0,
        validTill: job?.period || "Sept 12, 2024",
        time: job?.["total_working_hrs "] || "5 PM - 9 PM",
        pay: `${job.total_salary || 0}`,
        ratings: {
          clarity: 4.5,
          conditions: 4,
          payment: 5,
          communication: 4,
          accuracy: 4,
        },
        ...job,
      })) || [],
    [data]
  );

  // Unique job titles
  const jobTitles = useMemo(
    () => [...new Set(jobs.map((job) => job.title))],
    [jobs]
  );

  // Handle search
  const handleSearch = useCallback((e) => {
    setQ(e.target.value);
  }, []);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    const term = q.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesSearch =
        !term ||
        job.title.toLowerCase().includes(term) ||
        job.companyName.toLowerCase().includes(term) ||
        job.user.toLowerCase().includes(term);

      const matchesTitle =
        !selectedTitle ||
        job.title.toLowerCase() === selectedTitle.toLowerCase();

      return matchesSearch && matchesTitle;
    });
  }, [jobs, q, selectedTitle]);

  if (isLoading) return <Spinner />;

  return (
    <section className="mt-5">
      <div className="flex justify-between mb-3">
        <h1 className="text-xl font-bold mb-2">{t("All Jobs")}</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Search */}
          <input
            type="text"
            value={q}
            onChange={handleSearch}
            placeholder={t("Search jobs...")}
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 w-full sm:w-auto"
          />

          {/* Job Title Filter */}
          <select
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
          >
            <option value="">{t("All Job Titles")}</option>
            {jobTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Job List */}
      <div className="space-y-5">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobHistoryCard key={job.id} job={job} refetch={refetch} />
          ))
        ) : (
          <p className="text-gray-500 text-sm">{t("No jobs found")}.</p>
        )}
      </div>
    </section>
  );
};

export default JobHistory;
// import React, { useState } from "react";
// import JobHistoryCard from "./JobHistoryCard";
// import { useGetJobHistoryEmployerQuery } from "../../../../services/jobApiSlice";
// import Spinner from "../../../../components/ui/Spinner";
// // {
// //       id: 1,
// //       title: "Social Media Assistant",
// //       user: "Jane Smith",
// //       companyName: "Nomand",
// //       logo: "/assets/landingpage/logo/Company Logo.png",
// //       verified: true,
// //       location: "Paris, France",
// //       rating: 4.5,
// //       duration: "3 hours ago",
// //       views: "10 people viewed",
// //       validTill: "Sept 12, 2024",
// //       time: "5 PM - 9 PM",
// //       pay: "$20/hr",
// //       applied: 5,
// //       capacity: 10,
// //       ratings: {
// //         clarity: 4.5,
// //         conditions: 4,
// //         payment: 5,
// //         communication: 4,
// //         accuracy: 4,
// //       },
// //     },
// const JobHistory = () => {
//   const { data, isLoading, refetch } = useGetJobHistoryEmployerQuery();

//   const [selected, setSelected] = useState({});

//   const jobs = data?.data?.map((job) => ({
//     id: job?.job_id,
//     title: job?.title || "Social Media Assistant",
//     user: job?.employee_name || "Jane Smith",
//     companyName: job?.company_name || "Nomand",
//     logo: job?.profile_image || "/assets/landingpage/logo/Company Logo.png",
//     location: job?.location || "Paris, France",
//     rating: 4.5,
//     validTill: job?.start_date || "Sept 12, 2024",
//     time: job?.["total_working_hrs "] || "5 PM - 9 PM",
//     pay: `${job["total_salary "] || 0} CHF`,
//     ratings: {
//       clarity: 4.5,
//       conditions: 4,
//       payment: 5,
//       communication: 4,
//       accuracy: 4,
//     },
//     ...job,
//   }));
//   const s = {
//     job_application_id: 36,
//     employee_id: 37,
//     job_id: 272,
//     is_review_given: true,
//     title: "Frontend Developer",
//     "total_salary ": 1996,
//     "total_working_hrs ": 4,
//     "status ": "Completed",
//     company_name: "Tech Innovatorss",
//     start_date: "26-09-2025",
//     job_end_date: "29-09-2025",
//     end_date: "2025-09-29",
//     start_time: "11:05 PM",
//     end_time: "12:00 AM",
//     location: "Shivaji Road, Tulshibaug, 411005, Budhwar Peth, Pune, Pune",
//     employee_name: "Vihan",
//     profile_image:
//       "https://demo-compumatrixtechnologies.com/fastaff-laravel/storage/app/employee-profile-image/69104819-tvs-logo-tvs-icon-transparent-png-free-vector.jpg",
//     invoice_pdf:
//       "https://demo-compumatrixtechnologies.com/fastaff-laravel/storage/app/invoices/employer_101_job_272.pdf",
//   };
//   if (isLoading) return <Spinner />;
//   return (
//     <>
//       <section>
//         <div>
//           <div className="mb-3">
//             <h1 className="text-xl font-bold">All Jobs</h1>
//             <div className="flex gap-3 items-center">
//               <input
//               type="text"
//               placeholder="Search jobs..."
//               className="border px-3 py-2 rounded"
//               value={selected.search || ""}
//               onChange={e =>
//                 setSelected(prev => ({ ...prev, search: e.target.value }))
//               }
//               />
//               <select
//               className="border px-3 py-2 rounded"
//               value={selected.title || ""}
//               onChange={e =>
//                 setSelected(prev => ({ ...prev, title: e.target.value }))
//               }
//               >
//               <option value="">All Job Titles</option>
//               {[...new Set(jobs.map(job => job.title))].map(title => (
//                 <option key={title} value={title}>
//                 {title}
//                 </option>
//               ))}
//               </select>
//             </div>
//           </div>
//           <div className="space-y-5">
//             {jobs.map((job) => (
//               <JobHistoryCard key={job.id} job={job} refetch={refetch} />
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default JobHistory;
