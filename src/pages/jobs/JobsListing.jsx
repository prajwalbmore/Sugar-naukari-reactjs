import React, { useMemo, useState, useEffect, useRef } from "react";
import Pagination from "../../components/ui/Pagination";
import { useTranslation } from "react-i18next";
import JobCard from "../dashboard/empyoerdashboard/post-job/JobCard";

const JobsListing = ({
  keyword,
  location,
  jobs = [],
  refetch,
  setActive,
  active,
}) => {
  const jobRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
  const { t } = useTranslation();
  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, location]);
  const scrollToJob = () => {
    jobRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("scrolling to Top jobs");
  };
  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs?.filter((job) => {
      // console.log("Filtering job:", job);
      const jobTitle = job?.title?.toLowerCase() || "";
      const jobLocation = job?.location?.toLowerCase() || "";
      const companyName = job?.companyName?.toLowerCase() || ""; // 👈 add this

      const keywordMatch = keyword
        ? jobTitle.includes(keyword.toLowerCase()) ||
          companyName.includes(keyword.toLowerCase()) // 👈 match both
        : true;

      const locationMatch = location
        ? jobLocation.includes(location.toLowerCase())
        : true;

      return keywordMatch && locationMatch;
    });
  }, [keyword, location, jobs]);

  // Pagination
  const { paginatedJobs, totalPages } = useMemo(() => {
    const start = (currentPage - 1) * jobsPerPage;
    const end = start + jobsPerPage;
    return {
      paginatedJobs: filteredJobs.slice(start, end),
      totalPages: Math.ceil(filteredJobs.length / jobsPerPage),
    };
  }, [filteredJobs, currentPage, jobsPerPage]);

  return (
    <section
      className="w-full px-4 sm:px-6 min-h-screen "
      ref={jobRef}
    >
      {/* Mobile Filters Button */}
      <div className="flex justify-between items-center mb-3 lg:hidden">
        {/* <button
          type="button"
          onClick={() => setActive((prev) => !prev)}
          className="bg-black text-white px-4 py-2 rounded-full font-semibold"
        >
          {t("Filters")}
        </button> */}
        {/* <h1 className="text-xl font-bold">{t("All Jobs")}</h1> */}
      </div>

      {/* Header for large screens */}
      {/* <div className="hidden lg:flex justify-between items-center mb-3">
        <h1 className="text-xl font-bold">{t("All Jobs")}</h1>
      </div> */}

      {/* Jobs List */}
      <div className="grid grid-cols-2 gap-5 overflow-y-auto hide-scrollbar">
        {paginatedJobs.length > 0 ? (
          paginatedJobs.map((job) => (
            <JobCard key={job._id || job.id} job={job} refetch={refetch} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-5 col-span-2">
            {t("No jobs found")}
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-end mt-4 py-4">
          <Pagination
            current={currentPage}
            total={totalPages}
            onChange={setCurrentPage}
            scrollToJob={scrollToJob}
          />
        </div>
      )}
    </section>
  );
};

export default JobsListing;
