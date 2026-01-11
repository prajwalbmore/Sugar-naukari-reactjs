import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/ui/Button";
import ReusableTable from "../../../../components/ui/ReusableTable";
import {
  useGetApplicantsForOngoingEmployerQuery,
} from "../../../../services/jobApiSlice";
import Spinner from "../../../../components/ui/Spinner";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import Modal from "../../../../components/ui/Modal";
import CompleteJobModal from "../ongoingJobs/CompleteJobModal";
import { useTranslation } from "react-i18next";
import { pollingInterval } from "../../../../constants/app.constant";
import DeleteApplicantModal from "./DeleteApplicantModal";
// Status component
const Status = ({ type }) => {
  const statusStyles = {
    applied: {
      label: "Applied",
      color: "bg-[#EDF0FF] text-[#1265B7]",
    },
    pending: {
      label: "Pending",
      color: "bg-[#FFFBDA] text-[#F1BB46]",
    },
    rejected: {
      label: "Rejected",
      color: "bg-[#FFF2EA] text-[#F15046]",
    },
    approved: {
      label: "Approved",
      color: "bg-[#E6FFED] text-[#28A745]",
    },
  };
  const status = statusStyles[type?.toLowerCase()] || {
    label: type,
    color: "bg-gray-100 text-gray-700",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
    >
      <span className="text-lg font-bold"> • </span> {status.label}
    </span>
  );
};

// User information display
const UserSection = ({ row }) => (
  <div className="flex items-center gap-3">
    <img
      src={row.avatar || "/default-avatar.png"}
      alt={row.fullName || "User avatar"}
      className="rounded-full h-10 w-10 object-cover"
    />
    <div>
      <h1 className="font-medium">{row.fullName || "Unknown User"}</h1>
      {row.email && <p className="text-sm text-gray-500">{row.email}</p>}
    </div>
  </div>
);

// Review display
const ReviewSection = ({ row }) => (
  <div className="flex items-center gap-1">
    <StarIcon className="text-amber-400 h-5" />
    <h1>{row.review}</h1>
  </div>
);

// const StatCircle = ({ value = 75, max = 100, label = "Stat", t }) => {
//   const size = 40;
//   const strokeWidth = 3;
//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const percentage = Math.min(value / max, 1);
//   const dash = circumference * percentage;
//   const gap = circumference - dash;
//   console.log("Match", t("Match"));

//   // Determine the color based on the value
//   let strokeColor = "#3B82F6"; // default blue
//   if (value <= 25) {
//     strokeColor = "#EF4444"; // red
//   } else if (value <= 50) {
//     strokeColor = "#F59E0B"; // orange
//   } else if (value <= 75) {
//     strokeColor = "#10B981"; // green
//   } else {
//     strokeColor = "#3B82F6"; // blue
//   }

//   return (
//     <div className="">
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
//           stroke={strokeColor}
//           strokeWidth={strokeWidth}
//           fill="none"
//           strokeLinecap="round"
//           strokeDasharray={`${dash} ${gap}`}
//           style={{
//             transition: "stroke-dashoffset 0.5s ease, stroke 0.5s ease",
//           }}
//         />
//       </svg>
//       <div
//         className={`${
//           t("Match") === "Correspondance" ? "-mt-8 w-[25%]" : "-mt-8 -ml-8"
//         } text-center `}
//       >
//         <span className="text-[9px] font-bold text-black">{value} %</span>
//       </div>
//     </div>
//   );
// };

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

const ApplicantsJobDetails = ({ job, applicants, isOngoing = false, t, refetch: parentRefetch }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState({});
  const [isOpen, { open, close }] = useDisclosure(false);
  const [isOpenDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);

  // Use provided applicants data or empty array
  const applicantsData = applicants ? { data: applicants } : null;
  const isLoading = false;

  const {
    data: OngoingData,
    isLoading: OngoingLoading,
    refetch: apiRefetch,
  } = useGetApplicantsForOngoingEmployerQuery(job?.id);

  const refetch = parentRefetch || apiRefetch;

  // Handles additional actions on a row
  const handleAction = (row) => {
    console.log("Action triggered for:", row.fullName);
    // Add more logic here if needed
  };

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
      key: "distance",
      label: "Distance",
      render: (row) => (
        <span>{row.distance ? `${row.distance} km` : "N/A"}</span>
      ),
    },
    {
      key: "review",
      label: "Employee Review",
      render: (row) => <ReviewSection row={row} />,
    },
    {
      key: "status",
      label: "Hiring Status",
      render: (row) => <Status type={row.status || "pending"} />,
    },
    { key: "appliedAt", label: "Date Applied" },
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <div className="flex gap-2">
          <Button
            onClick={() =>
              navigate(`/dashboard/applicants/${row?.id}`, { state: { row } })
            }
            className="rounded-full bg-gray-300 px-4 py-1 font-semibold hover:bg-gray-400"
          >
            {t("View")}
          </Button>
          {row.status === "Approved" && (
            <Button
              onClick={() => {
                openDelete();
                setSelected(row);
              }}
              className="rounded-full bg-gray-300 px-4 py-1 font-semibold hover:bg-gray-400"
            >
              ❌
            </Button>
          )}
        </div>
      ),
    },
  ];

  const data = (applicants || applicantsData?.data || []).map((appli, index) => ({
    srNo: index + 1,
    id: appli?.user_id || appli?.id,
    employee_id: appli?.user_id || appli?.employee_id,
    fullName: appli?.name || appli?.employee_name,
    avatar: appli?.profile_picture || appli?.profile_image,
    review: appli?.rating || appli?.review || 0,
    appliedAt: appli?.applied_date || appli?.date_applied,
    status: appli?.status || "applied",
    distance: appli?.distance || 0,
    match: appli?.match || Math.floor(Math.random() * 100), // Mock match percentage
    job_id: job?.id,
    job_application_id: appli?.id,
  }));
  const OngoingColumns = [
    { key: "srNo", label: "Sr No" },
    {
      key: "fullName",
      label: "Full Name",
      render: (row) => <UserSection row={row} />,
    },
    { key: "estimated_salary", label: "Estimated Salary" },
    { key: "day", label: "Day" },
    { key: "applied_on", label: "Applied On" },
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              open();
              setSelected(row);
            }}
            className="rounded-full bg-gray-300 px-4 py-1 font-semibold hover:bg-gray-400"
          >
            Complete Job
          </Button>
        </div>
      ),
    },
  ];

  const OngoingTableData = (OngoingData?.data || []).map((appli, index) => ({
    srNo: index + 1,
    id: appli?.user_id || appli?.employee_id,
    fullName: appli?.name || appli?.employee_name,
    avatar: appli?.profile_picture || appli?.profile_image,
    applied_on: appli?.applied_date || appli?.applied_on,
    day: appli?.days_worked || appli?.day || 0,
    estimated_salary: appli?.salary || 'N/A',
    ...appli,
  }));
  console.log("OngoingData", OngoingData);
  if (isLoading || OngoingLoading) return <Spinner />;
  return (
    <>
      <div className="p-4">
        <div className="rounded bg-white shadow-sm">
          <ReusableTable
            columns={isOngoing ? OngoingColumns : columns}
            data={isOngoing ? OngoingTableData : data}
            pageSize={5}
            isDateFilter={false}
            title={`Total Applicants : ${
              isOngoing ? OngoingTableData?.length || 0 : data?.length || 0
            }`}
          />
        </div>
      </div>
      <Modal onClose={close} open={isOpen} title="Complete Job" size="xl">
        <CompleteJobModal
          jobs={job}
          selected={selected}
          onClose={close}
          refetch={refetch}
        />
      </Modal>
      <Modal onClose={closeDelete} open={isOpenDelete} title="Delete" size="md">
        <DeleteApplicantModal
          jobs={job}
          selected={selected}
          onClose={closeDelete}
          refetch={refetch}
        />
      </Modal>
    </>
  );
};

export default ApplicantsJobDetails;
