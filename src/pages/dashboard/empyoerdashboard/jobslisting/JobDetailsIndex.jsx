import React, { useMemo, useState } from "react";
import ListingJobCard from "./ListingJobCard";
import Tabs from "../../../../components/ui/Tabs";
import ApplicantsJobDetails from "./ApplicantsJobDetails";
import JobDescription from "../../../jobs/jobDetails/JobDescription";
import { useLocation } from "react-router-dom";
import { useGetJobListingApplicantsQuery } from "../../../../services/jobApiSlice";
import AnalyticsJobDetails from "./AnalyticsJobDetails";
import { useTranslation } from "react-i18next";
import { pollingInterval } from "../../../../constants/app.constant";

const JobDetailsIndex = () => {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState(0);
  const { state } = useLocation() || {
    state: {
      isOngoing: false,
    },
  };
  const job = state?.row;
  const { data } = useGetJobListingApplicantsQuery(
    {
      job_id: job?.id,
      tab_name: "job_details",
    },
    { pollingInterval: pollingInterval }
  );

  const tabs = useMemo(
    () =>
      state?.isOngoing
        ? ["Applicants"]
        : ["Applicants", "Job Details", "Analytics"],
    []
  );
  // console.log("jobsssssssss", job);
  const jobData = {
    description: data?.data?.description,
    total_vacancy: data?.data?.total_vacancy || 0,
    no_of_vacancy: data?.data?.applied || 0,
    job_role: data?.data?.job_role,
    job_posted_on: job?.posted_on,
    start_date: data?.data?.start_date,
    salary: data?.data?.salary,
    exp_level: data?.data?.exp_level,
    jObSkills: data?.data?.skills?.map((sk) => ({
      name: sk,
    })),
  };

  // Function to render content based on active tab
  const renderActiveTab = () => {
    switch (active) {
      case 0:
        return (
          <ApplicantsJobDetails job={job} isOngoing={state?.isOngoing} t={t} />
        );
      case 1:
        return <JobDescription isCompanyDetail jobData={jobData} t={t} />;
      case 2:
        return <AnalyticsJobDetails job={job} t={t} />;
      default:
        return <div>Unknown Tab</div>;
    }
  };
  console.log("job", job);
  const jobs = {
    id: job?.id,
    title: job?.jobRole,
    companyName: "Nomand",
    logo: "/assets/landingpage/logo/Company Logo.png",
    verified: true,
    location: job?.location,
    rating: 4.5,
    duration: "3 hours ago",
    views: "10 people viewed",
    validTill: job?.validTill,
    time: ` ${job?.start_time} - ${job?.end_time}`,
    pay: job?.salary,
    applied: 5,
    capacity: 10,
    ratings: {
      clarity: 4.5,
      conditions: 4,
      payment: 5,
      communication: 4,
      accuracy: 4,
    },
  };
  return (
    <section>
      <div className="space-y-4">
        <ListingJobCard job={jobs} isOngoing={state?.isOngoing} />
        <div className="rounded shadow-md mb-6 bg-white">
          {tabs.length > 1 && (
            <Tabs tabs={tabs} active={active} setActive={setActive} />
          )}
        </div>
        <div className="rounded bg-white shadow-sm">{renderActiveTab()}</div>
      </div>
    </section>
  );
};

export default JobDetailsIndex;
