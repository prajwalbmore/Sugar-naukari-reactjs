import React, { useState } from "react";
import ReusableTable from "../../../../components/ui/ReusableTable";
import Button from "../../../../components/ui/Button";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useGetApplicantsForEmployerQuery } from "../../../../services/jobApiSlice";
import Spinner from "../../../../components/ui/Spinner";
import { useTranslation } from "react-i18next";

const UserSection = ({ row }) => {
  // console.log("row", row.fullName);
  return (
    <div className="flex items-center gap-3">
      <img
        src={row.avatar || "/default-avatar.png"}
        alt={row.fullName || "User avatar"}
        className="rounded-full h-10 w-10 object-cover"
      />
      <h1>{row.fullName || "Unknown User"}</h1>
    </div>
  );
};
const ReviewSection = ({ row }) => {
  return (
    <div className="flex items-center gap-1">
      {/* <span className="text-amber-400 text-2xl font-bold">★</span> */}
      <StarIcon className="text-amber-400 h-5" />
      <h1>{row.review}</h1>
    </div>
  );
};

const StatCircle = ({ value = 75, max = 100, label = "Stat", t }) => {
  const size = 40;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(value / max, 1);
  const dash = circumference * percentage;
  const gap = circumference - dash;

  // Determine the color based on the value
  let strokeColor = "#3B82F6"; // default blue
  if (value <= 25) {
    strokeColor = "#EF4444"; // red
  } else if (value <= 50) {
    strokeColor = "#F59E0B"; // orange
  } else if (value <= 75) {
    strokeColor = "#10B981"; // green
  } else {
    strokeColor = "#3B82F6"; // blue
  }

  return (
    <div className="relative flex items-center justify-center">
      {/* Circle */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${gap}`}
          style={{
            transition: "stroke-dashoffset 0.5s ease, stroke 0.5s ease",
          }}
        />
      </svg>

      {/* Centered text */}
      <div className="absolute flex items-center justify-center">
        <span className="text-[9px] font-bold text-black">{value} %</span>
      </div>
    </div>
  );
};
const Applicants = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: applicantsData, isLoading } =
    useGetApplicantsForEmployerQuery();
  // console.log("ApplicantsData",applicantsData)
  const [selectedRating, setSelectedRating] = useState("");

  const columns = [
    { key: "srNo", label: "Sr No" },
    {
      key: "fullName",
      label: "Full Name",
      render: (row) => <UserSection row={row} />,
    },
    {
      key: "match",
      label: "Match",
      render: (row) => <StatCircle value={row.match} t={t} />,
    },
    {
      key: "review",
      label: "Review",
      render: (row) => <ReviewSection row={row} />,
    },
    { key: "appliedAt", label: "Date Applied" },
    { key: "jobRole", label: "Job Role" },
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <div className="flex gap-3">
          <Button
            onClick={() => {
              navigate(`/dashboard/applicants/${row.employee_id}`, {
                state: { row },
              });
            }}
            className="rounded-full bg-gray-300 px-4 py-1 font-semibold"
          >
            {t("View")}
          </Button>
          {/* <Button
            onClick={() => handleAction(row)}
            className="rounded-full  p-1 font-semibold hover:bg-gray-200"
          >
            <EllipsisHorizontalIcon className="h-5" />
          </Button> */}
        </div>
      ),
    },
  ];

  const data = applicantsData?.data?.map((appli, index) => ({
    srNo: index + 1,
    id: appli?.application_id,
    fullName: appli?.employee_name,
    avatar: appli?.profile_image,
    review: appli?.review_rating,
    // match:
    //   typeof appli?.skill_match === "string"
    //     ? parseInt(appli.skill_match.replace("%", ""), 10)
    //     : Number(appli?.skill_match) || 0,
    match: appli?.job_match?.match_percentage,
    appliedAt: appli?.applied_on,
    jobRole:
      appli?.job_title.length > 20
        ? `${appli?.job_title.slice(0, 20)}...`
        : `${appli?.job_title}`,
    employee_id: appli?.employee_id,
    job_id: appli?.job_id,
    job_application_id: appli?.application_id,
  }));

  const filteredData = (data || [])
    // Filter by rating
    .filter((item) =>
      selectedRating && selectedRating !== "all"
        ? Number(item.review) === Number(selectedRating)
        : true
    );

  if (isLoading) return <Spinner />;
  const handleChange = (e) => {
    setSelectedRating(e.target.value);
  };
  return (
    <section className="p-4">
      <ReusableTable
        title={`Total Applicants: ${data?.length || 0}`}
        columns={columns}
        data={filteredData}
        isDateFilter={false}
        handleChange={handleChange}
        selectedRating={selectedRating}
        isApplicantFilter
      />
    </section>
  );
};

export default Applicants;
