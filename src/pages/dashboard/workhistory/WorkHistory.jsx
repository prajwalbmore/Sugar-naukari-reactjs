import React, { useState } from "react";
import WorkJobCard from "./WorkJobCard";
import { useDisclosure } from "../../../hooks/useDisclosure";
import Modal from "../../../components/ui/Modal";
import JobModal from "./JobModal";
import { useGetWorkHistoryJobsQuery } from "../../../services/jobApiSlice";
import Spinner from "../../../components/ui/Spinner";
import { useTranslation } from "react-i18next";
const jobs = [
  {
    id: 1,
    title: "Social Media Assistant",
    companyName: "Nomand",
    logo: "/assets/landingpage/logo/Company Logo.png",
    verified: true,
    location: "Paris, France",
    rating: 4.5,
    duration: "3 hours ago",
    views: "10 people viewed",
    validTill: "Sept 12, 2024",
    time: "5 PM - 9 PM",
    pay: "$20/hr",
    applied: 5,
    capacity: 10,
    ratings: {
      clarity: 4.5,
      conditions: 4,
      payment: 5,
      communication: 4,
      accuracy: 4,
    },
  },
  {
    id: 2,
    title: "Graphic Designer",
    companyName: "Creatives Inc.",
    logo: "/assets/landingpage/logo/Company Logo.png",
    verified: true,
    location: "London, UK",
    rating: 4.7,
    duration: "5 hours ago",
    views: "25 people viewed",
    validTill: "Sept 15, 2024",
    time: "10 AM - 4 PM",
    pay: "$25/hr",
    applied: 2,
    capacity: 10,
    ratings: {
      clarity: 4.7,
      conditions: 4.5,
      payment: 4.8,
      communication: 4.2,
      accuracy: 4.6,
    },
  },
  {
    id: 3,
    title: "Content Writer",
    companyName: "WriteWell",
    logo: "/assets/landingpage/logo/Company Logo.png",
    verified: true,
    location: "Berlin, Germany",
    rating: 4.3,
    duration: "1 day ago",
    views: "30 people viewed",
    validTill: "Sept 20, 2024",
    time: "9 AM - 1 PM",
    pay: "$18/hr",
    applied: 5,
    capacity: 10,
    ratings: {
      clarity: 4.3,
      conditions: 3.8,
      payment: 4.5,
      communication: 4.1,
      accuracy: 4.2,
    },
  },
  // ... Add more as needed
];
const demo = {
  employer_id: 92,
  job_id: 233,
  total_rating: 3.2, //
  is_review_given: true,
  reviewer: "SR industries", //
  job_title: "SDET", //
  job_location: "Warje, Pune, Pune, Maharashtra, India", //
  total_working_hrs: 4,
  total_salary: "CHF 12000", //
  is_verified: false, //
  company_logo:
    "https://demo-compumatrixtechnologies.com/fastaff-laravel/storage/app/employer-company-logo/21621298-1000122117.jpg", //
  period: "Sep 19 - Sep 11 2025",
  employee_given_rating: {
    //
    clarity_of_instruction: 3,
    working_conditions: 3,
    payment_timeliness: 5,
    communication: 2,
    task_accuracy: 3,
    total_rating: 3.2,
  },
};
const WorkHistory = () => {
  const [isOpen, { open, close }] = useDisclosure(false);
  const [selected, setSelected] = useState({});
  const { data, isLoading, refetch } = useGetWorkHistoryJobsQuery();
  const { t } = useTranslation();

  const jobData = data?.data?.map((job) => ({
    id: 3,
    title: job?.job_title,
    companyName: job.reviewer,
    logo: job.company_logo,
    verified: job?.is_verified,
    location: job?.job_location,
    rating: job.total_rating,
    validTill: job?.period,
    time: job?.total_working_hrs,
    pay: job.total_salary,
    applied: 5,
    capacity: 10,
    ratings: {
      clarity: job.employee_given_rating?.clarity_of_instruction || 0,
      conditions: job.employee_given_rating?.working_conditions || 0,
      payment: job.employee_given_rating?.payment_timeliness || 0,
      communication: job.employee_given_rating?.communication || 0,
      accuracy: job.employee_given_rating?.task_accuracy || 0,
    },
    ...job,
  }));
  if (isLoading) return <Spinner />;
  return (
    <section>
      <div>
        <div className="mb-3">
          <h1 className="text-xl font-bold">{t("All Jobs")}</h1>
        </div>
        <div className="space-y-5">
          {jobData?.map((job) => (
            <WorkJobCard
              key={job.id}
              job={job}
              onClick={() => {
                setSelected(job);
                open();
              }}
            />
          ))}
        </div>
      </div>
      <Modal
        open={isOpen}
        onClose={close}
        title="Review Employer"
        size="xl"
        isVisibleSave
        isVisibleClose
        onSave={() => console.log("Saved!")}
        onCancel={() => console.log("Cancelled!")}
      >
        <JobModal selected={selected} onClose={close} refetch={refetch} />
      </Modal>
    </section>
  );
};

export default WorkHistory;
