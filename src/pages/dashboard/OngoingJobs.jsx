import { BriefcaseIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useDisclosure } from "../../hooks/useDisclosure";
import { CheckIcon } from "@heroicons/react/24/outline";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import JobCard from "../home/JobCard";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth/context";
import { useGetOngoingJobsQuery } from "../../services/jobApiSlice";
import Spinner from "../../components/ui/Spinner";
import { useTranslation } from "react-i18next";
import OngoingJobCard from "./OngoingJobCard";
const jobs = [
  {
    id: 1,
    title: "Social Media Assistant",
    companyName: "Nomand",
    logo: "/assets/landingpage/logo/Company Logo.png",
    verified: true,
    location: "Paris, France",
    rating: "4.5",
    duration: "3 hours ago",
    views: "10 people viewed",
    validTill: "Sept 12, 2024",
    time: "5 PM - 9 PM",
    pay: "$20/hr",
    applied: 5,
    capacity: 10,
  },
  {
    id: 2,
    title: "Graphic Designer",
    companyName: "Creatives Inc.",
    logo: "/assets/landingpage/logo/Company Logo.png",
    verified: true,
    location: "London, UK",
    rating: "4.7",
    duration: "5 hours ago",
    views: "25 people viewed",
    validTill: "Sept 15, 2024",
    time: "10 AM - 4 PM",
    pay: "$25/hr",
    applied: 2,
    capacity: 10,
  },
  {
    id: 3,
    title: "Content Writer",
    companyName: "WriteWell",
    logo: "/assets/landingpage/logo/Company Logo.png",
    verified: true,
    location: "Berlin, Germany",
    rating: "4.3",
    duration: "1 day ago",
    views: "30 people viewed",
    validTill: "Sept 20, 2024",
    time: "9 AM - 1 PM",
    pay: "$18/hr",
    applied: 5,
    capacity: 10,
  },
  {
    id: 4,
    title: "Social Media Assistant",
    companyName: "Nomand",
    logo: "/assets/landingpage/logo/Company Logo.png",
    verified: true,
    location: "Paris, France",
    rating: "4.5",
    duration: "3 hours ago",
    views: "10 people viewed",
    validTill: "Sept 12, 2024",
    time: "5 PM - 9 PM",
    pay: "$20/hr",
    applied: 5,
    capacity: 10,
  },
  {
    id: 5,
    title: "Graphic Designer",
    companyName: "Creatives Inc.",
    logo: "/assets/landingpage/logo/Company Logo.png",
    verified: true,
    location: "London, UK",
    rating: "4.7",
    duration: "5 hours ago",
    views: "25 people viewed",
    validTill: "Sept 15, 2024",
    time: "10 AM - 4 PM",
    pay: "$25/hr",
    applied: 2,
    capacity: 10,
  },
  {
    id: 6,
    title: "Content Writer",
    companyName: "WriteWell",
    logo: "/assets/landingpage/logo/Company Logo.png",
    verified: true,
    location: "Berlin, Germany",
    rating: "4.3",
    duration: "1 day ago",
    views: "30 people viewed",
    validTill: "Sept 20, 2024",
    time: "9 AM - 1 PM",
    pay: "$18/hr",
    applied: 5,
    capacity: 10,
  },
  {
    id: 7,
    title: "Social Media Assistant",
    companyName: "Nomand",
    logo: "/assets/landingpage/logo/Company Logo.png",
    verified: true,
    location: "Paris, France",
    rating: "4.5",
    duration: "3 hours ago",
    views: "10 people viewed",
    validTill: "Sept 12, 2024",
    time: "5 PM - 9 PM",
    pay: "$20/hr",
    applied: 5,
    capacity: 10,
  },
  {
    id: 8,
    title: "Graphic Designer",
    companyName: "Creatives Inc.",
    logo: "/assets/landingpage/logo/Company Logo.png",
    verified: true,
    location: "London, UK",
    rating: "4.7",
    duration: "5 hours ago",
    views: "25 people viewed",
    validTill: "Sept 15, 2024",
    time: "10 AM - 4 PM",
    pay: "$25/hr",
    applied: 2,
    capacity: 10,
  },
  {
    id: 9,
    title: "Content Writer",
    companyName: "WriteWell",
    logo: "/assets/landingpage/logo/Company Logo.png",
    verified: true,
    location: "Berlin, Germany",
    rating: "4.3",
    duration: "1 day ago",
    views: "30 people viewed",
    validTill: "Sept 20, 2024",
    time: "9 AM - 1 PM",
    pay: "$18/hr",
    applied: 5,
    capacity: 10,
  },
];
const OngoingJobs = () => {
  const [isOpen, { open, close }] = useDisclosure(false);
  const { user } = useAuthContext();
  const { data, isLoading } = useGetOngoingJobsQuery();
  const { t } = useTranslation();
  const navigate = useNavigate();
  if (isLoading) return <Spinner />;
  const jobData = data?.data?.map((job) => ({
    id: job.job_id,
    title: job.title,
    companyName: job.company_name,
    logo: job.company_logo,
    verified: job.is_verified || false,
    location: job.location,
    rating: job.employer_rating,
    duration: job.duration,
    views: job.employer_rating,
    validTill: job.start_date,
    time: `${job.start_time} - ${job.end_time}`,
    pay: job.salary,
    applied: job.applied,
    capacity: job.capacity,
    day: job.day,
    ...job,
  }));
  const s = {
    job_application_id: 42,
    employee_id: 37,
    is_save: false,
    employer_id: 101,
    job_id: 273,
    title: "Bike Cleaner",
    salary: 23,
    status: "On Going",
    company_name: "Tech Innovatorss",
    company_logo:
      "https://demo-compumatrixtechnologies.com/fastaff-laravel/storage/app/employer-company-logo/60481403-bestholding-logo.png",
    start_date: "29-09-2025",
    start_time: "10:00 AM",
    end_time: "12:00 AM",
    location:
      "Airport Road, Pune International Airport Area, 411032, Lohgaon, Pune, Pune",
    employee_name: "Vihan",
    day: 0,
  };
  return (
    <>
      <section className="">
        <div className="w-full rounded-full bg-yellow-300 flex items-center justify-between px-6  py-8 h-14">
          <div className="flex items-center gap-3">
            <div className="bg-[#FFFCEE] rounded-full h-12 w-12 flex items-center justify-center">
              <BriefcaseIcon className="h-8 w-8 text-dark" />
            </div>
            <p className="text-dark font-bold">{t("Your Ongoing Jobs")}</p>
          </div>
          <Button
            onClick={() => {
              if (user.user_type === "employee") {
                open();
              } else {
                navigate("/dashboard/ongoing");
              }
            }}
            className="bg-dark rounded-full text-white  px-4  md:px-5 lg:px-10 py-2 font-semibold"
          >
            {t("View All")}
          </Button>
        </div>
      </section>
      <Modal
        open={isOpen}
        onClose={close}
        title={t("Your Ongoing Jobs")}
        size="lg"
        isVisibleSave
        isVisibleClose
        onSave={() => console.log("Saved!")}
        onCancel={() => console.log("Cancelled!")}
      >
        {" "}
        <div className="space-y-5">
          {jobData?.map((job) => (
            <OngoingJobCard key={job.id} job={job} />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default OngoingJobs;
