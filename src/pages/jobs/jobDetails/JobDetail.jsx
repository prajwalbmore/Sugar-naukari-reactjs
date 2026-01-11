import React, { useState } from "react";
import JobCard from "../JobCard";
import Tabs from "../../../components/ui/Tabs";
import JobDescription from "./JobDescription";
import AboutCompany from "./AboutCompany";
import { useParams } from "react-router-dom";
import { useGetJobDetailsQuery } from "../../../services/jobApiSlice";
import Spinner from "../../../components/ui/Spinner";
const job123 = {
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
};
const JobDetail = ({ isDashboard }) => {
  const tabs = ["Job Description", "About Company"];
  const [active, setActive] = useState(0);
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetJobDetailsQuery(id);
  const jobData = data?.data || {};
  console.log("jobdata",jobData)
  const job = {
    id: jobData.job_id,
    title: jobData.title,
    companyName: jobData.company_name,
    logo: jobData.company_logo,
    verified: jobData.verified,
    location: jobData.location,
    rating: jobData.employer_rating || 0,
    duration: jobData.duration,
    views: jobData.reviews_count,
    validTill: jobData.start_date,
    time: `${jobData.start_time} - ${jobData.end_time}`,
    pay: jobData.salary,
    ...jobData,
  };

  if (isLoading) return <Spinner />;

  return (
    <section className={` space-y-5 ${isDashboard ? "" : "px-24 pt-12"} `}>
      <div className="space-y-5">
        <JobCard job={job} isDetails className="bg-white" refetch={refetch} />
        <div className="bg-white">
          <Tabs tabs={tabs} active={active} setActive={setActive} />
        </div>
        <div className="">
          {active === 0 && <JobDescription jobData={jobData} />}
          {active === 1 && <AboutCompany jobData={jobData} />}
        </div>
      </div>
    </section>
  );
};

export default JobDetail;
