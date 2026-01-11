import React, { useMemo, useState } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid"; // Ensure this package is installed
import { Link } from "react-router-dom";
import Button from "../../../../components/ui/Button";
import ReusableTable from "../../../../components/ui/ReusableTable";
import { useGetOngoingforEmployerJobsQuery, useCompleteJobMutation, useCompleteJobApplicationsMutation } from "../../../../services/jobApiSlice";
import Spinner from "../../../../components/ui/Spinner";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const statusStyles = {
  draft: {
    label: "Draft",
    color: "bg-[#EDF0FF] text-[#1265B7]",
  },
  closed: {
    label: "Closed",
    color: "bg-[#FFF2EA] text-[#F15046]",
  },
  active: {
    label: "Active",
    color: "bg-[#E6FFED] text-[#28A745]",
  },
};

const Status = ({ type }) => {
  const status = statusStyles[type.toLowerCase()] || {
    label: type,
    color: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
    >
      <span className="text-lg font-bold">•</span> {status.label}
    </span>
  );
};

const OngoingJobs = () => {
  const { data: ongoingData, isLoading, refetch } = useGetOngoingforEmployerJobsQuery();
  const [completeJob] = useCompleteJobMutation();
  const [completeJobApplications] = useCompleteJobApplicationsMutation();
  const { t } = useTranslation();

  const handleCompleteJob = async (jobId) => {
    try {
      // Complete the job
      await completeJob({ id: jobId, enddate: new Date() }).unwrap();

      // Complete all applications for this job
      await completeJobApplications(jobId).unwrap();

      toast.success("Job completed successfully!");
      refetch(); // Refresh the data
    } catch (error) {
      console.error("Error completing job:", error);
      toast.error("Failed to complete job. Please try again.");
    }
  };
  const columns = useMemo(
    () => [
      { key: "srNo", label: "Sr No" },
      {
        key: "jobRole",
        label: "Job Role",
        render: (row) => (
          <Link
            to={`/dashboard/jobs-listing/${row.id}`}
            state={{ row, isOngoing: true }}
            className="hover:underline"
          >
            {row.jobRole}
          </Link>
        ),
      },
      { key: "startdate", label: "Start Date" },
      { key: "shiftTime", label: "Shift Time" },
      { key: "salary", label: "Salary" },
      {
        key: "vacancy",
        label: "Vacancy",
        render: (row) => (
          <div>
            <span> {row.vacancy}</span>
            <span className="text-gray-400">/{row.totalVacancy}</span>
          </div>
        ),
      },
      {
        key: "action",
        label: "Action",
        render: (row) => (
          <Button
            onClick={() => handleCompleteJob(row.id)}
            className="rounded-full bg-green-600 text-white px-4 py-2 text-sm hover:bg-green-700"
          >
            Complete Job
          </Button>
        ),
      },
    ],
    []
  );

  const data = ongoingData?.data?.map((job, index) => ({
    srNo: index + 1,
    id: job?.job_id,
    jobRole: job?.title,
    startdate: job?.start_date,
    shiftTime: `${job?.start_time} - ${job?.end_time}`,
    vacancy: job?.ongoing_employees,
    totalVacancy: job?.total_vacancy || 0,
    salary: job?.salary,
    start_time: job?.start_time,
    end_time: job?.end_time,
    validTill: job?.start_date,
    ...job,
  }));
  if (isLoading) return <Spinner />;
  return (
    <section className="min-h-screen bg-gray-50 p-4">
      <div className="rounded space-y-5 bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold px-3">{t("Ongoing Jobs")}</h1>
        <ReusableTable
          title={t("Job List")}
          columns={columns}
          data={data}
          onFilterClick
          isDateFilter={false}
        />
      </div>
    </section>
  );
};

export default OngoingJobs;
