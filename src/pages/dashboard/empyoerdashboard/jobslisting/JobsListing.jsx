import React, { useMemo, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Tabs from "../../../../components/ui/Tabs";
import ReusableTable from "../../../../components/ui/ReusableTable";
import Button from "../../../../components/ui/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useActiveAndCloseJobMutation,
  useGetEmployerJobListingQuery,
} from "../../../../services/jobApiSlice";
import Spinner from "../../../../components/ui/Spinner";
import { handleSubmit } from "../../../../utils/useHandleSubmit";
import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import PaginatedTable from "../../../../components/ui/PaginatedTable";
import Modal from "../../../../components/ui/Modal";
import CreateJobModal from "../post-job/CreateJobModal";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import EditJobModal from "../post-job/EditJobModal";
import { useAuthContext } from "../../../../contexts/auth/context";
import { toast } from "sonner";

// ✅ Status Styles
const statusStyles = {
  active: { label: "Active", color: "bg-[#E6FFED] text-[#28A745]" },
  "save-as-draft": { label: "Draft", color: "bg-[#EDF0FF] text-[#1265B7]" },
  "on-going": { label: "Ongoing", color: "bg-[#FFFDE7] text-[#FF9800]" },
  completed: { label: "Completed", color: "bg-[#E0F7FA] text-[#00796B]" },
  inactive: { label: "Inactive", color: "bg-gray-200 text-gray-700" },
  hired: { label: "Hired", color: "bg-[#FFE4E1] text-[#F15046]" },
};

// ✅ Status Badge Component
const Status = ({ type }) => {
  const status = statusStyles[type?.toLowerCase()] || {
    label: type,
    color: "bg-gray-100 text-gray-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs sm:text-sm font-medium ${status.color} bg-opacity-20`}
    >
      <span className="mr-1 text-base sm:text-lg font-bold">•</span>{" "}
      {status.label}
    </span>
  );
};

const JobsListing = () => {
  const { user } = useAuthContext();
  const { index } = useLocation().state || { index: 0 };
  const [active, setActive] = useState(index);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isOpen, { open, close }] = useDisclosure(false);
  const [isOpenEdit, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [selected, setselected] = useState();

  // ✅ Tabs
  const tabStatusMap = {
    0: "all",
    1: "save-as-draft",
    2: "active",
    3: "on-going",
    4: "completed",
    5: "inactive",
    6: "hired",
  };

  // ✅ API Calls
  const {
    data: apiResponse,
    isLoading,
    refetch,
  } = useGetEmployerJobListingQuery(tabStatusMap[active]);
  const { data: allJobsResponse, isLoading: countIsLoading } =
    useGetEmployerJobListingQuery("all");
  const [editStatus] = useActiveAndCloseJobMutation();

  // ✅ Jobs data
  const jobs = useMemo(() => {
    if (!apiResponse?.data) return [];
    return apiResponse.data.map((job, index) => ({
      srNo: index + 1,
      id: job.job_id,
      jobTitle: job.job_role,
      status: job.status,
      postedAt: job.posted_on,
      validTill: job.start_date,
      applicants: job.no_of_applications,
      vacancy: job.no_of_applications,
      totalVacancy: job.total_vacancy,
      is_close_possible: job.is_close_possible,
      ...job,
    }));
  }, [apiResponse]);

  // ✅ Menu handlers
  const handleOpen = (event, rowId) => {
    setAnchorEl(event.currentTarget);
    setMenuRowId(rowId);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setMenuRowId(null);
  };
  const handleStatus = (values) => {
    handleSubmit({ values, refetch, apiCall: editStatus });
  };

  // ✅ Table Columns
  const columns = useMemo(
    () => [
      { key: "srNo", label: "Sr No" },
      {
        key: "jobTitle",
        label: "Job Title",
        render: (row) => (
          <Link
            to={`/dashboard/jobs-listing/${row.id}`}
            state={{ row }}
            className="hover:underline truncate"
          >
            {row.raw.jobTitle?.length > 30
              ? row.raw.jobTitle.slice(0, 30) + "..."
              : row.raw.jobTitle || "Untitled Job"}
          </Link>
        ),
      },
      {
        key: "status",
        label: "Job Status",
        render: (row) => <Status type={row.status} />,
      },
      { key: "postedAt", label: "Date Posted" },
      { key: "validTill", label: "Start Date" },
      { key: "applicants", label: "Applicants" },
      {
        key: "vacancy",
        label: "Vacancy",
        render: (row) => (
          <div>
            <span>{row.vacancy}</span>
            <span className="text-gray-400">/{row.totalVacancy}</span>
          </div>
        ),
      },
      {
        key: "action",
        label: "Action",
        render: (row) => {
          return (
            <>
              <Button
                onClick={() => {
                  openEdit();
                  setselected(row);
                }}
                className="rounded-lg border p-2 font-semibold hover:bg-gray-200"
              >
                <PencilSquareIcon className="h-5 w-5" />
              </Button>
            </>
          );
        },
      },
    ],
    [navigate, active, anchorEl, menuRowId]
  );

  return (
    <section className="min-h-screen bg-gray-50 p-4">
      <div className="rounded bg-white shadow-sm p-4">
        {isLoading || countIsLoading ? (
          <Spinner />
        ) : (
          <PaginatedTable
            title="Job List"
            columns={columns}
            data={jobs}
            isDateFilter={false}
            showAdd
            buttonTitle="Post Job"
            onAdd={() => {
              if (!user?.isprofileCreated) {
                toast.warning("Please complete profile");
                navigate("/dashboard/company-information");
              } else {
                open();
              }
            }}
          />
        )}
      </div>
      <Modal open={isOpen} onClose={close} title="Post Job" size="lg">
        <CreateJobModal onClose={close} refetch={refetch} />
      </Modal>
      <Modal open={isOpenEdit} onClose={closeEdit} title="Post Job" size="lg">
        <EditJobModal
          onClose={closeEdit}
          selected={selected}
          refetch={refetch}
        />
      </Modal>
    </section>
  );
};

export default JobsListing;
// import React, { useMemo, useState } from "react";
// import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
// import Tabs from "../../../../components/ui/Tabs";
// import ReusableTable from "../../../../components/ui/ReusableTable";
// import Button from "../../../../components/ui/Button";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   useActiveAndCloseJobMutation,
//   useGetEmployerJobListingQuery,
// } from "../../../../services/jobApiSlice";
// import Spinner from "../../../../components/ui/Spinner";
// import { handleSubmit } from "../../../../utils/useHandleSubmit";
// import { Menu, MenuItem } from "@mui/material";
// import { useTranslation } from "react-i18next";
// import PaginatedTable from "../../../../components/ui/PaginatedTable";

// // ✅ Status Styles
// const statusStyles = {
//   active: { label: "Active", color: "bg-[#E6FFED] text-[#28A745]" },
//   "save-as-draft": { label: "Draft", color: "bg-[#EDF0FF] text-[#1265B7]" },
//   "on-going": { label: "Ongoing", color: "bg-[#FFFDE7] text-[#FF9800]" },
//   completed: { label: "Completed", color: "bg-[#E0F7FA] text-[#00796B]" },
//   inactive: { label: "Inactive", color: "bg-gray-200 text-gray-700" },
//   hired: { label: "Hired", color: "bg-[#FFE4E1] text-[#F15046]" },
// };

// // ✅ Status Badge Component
// const Status = ({ type }) => {
//   const status = statusStyles[type?.toLowerCase()] || {
//     label: type,
//     color: "bg-gray-100 text-gray-700",
//   };
//   return (
//     <span
//       className={`inline-flex items-center rounded-full px-2 py-1 text-xs sm:text-sm font-medium ${status.color} bg-opacity-20`}
//     >
//       <span className="mr-1 text-base sm:text-lg font-bold">•</span>{" "}
//       {status.label}
//     </span>
//   );
// };

// const JobsListing = () => {
//   const { index } = useLocation().state || { index: 0 };
//   const [active, setActive] = useState(index);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [menuRowId, setMenuRowId] = useState(null);
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   // ✅ Tabs
//   const tabStatusMap = {
//     0: "all",
//     1: "save-as-draft",
//     2: "active",
//     3: "on-going",
//     4: "completed",
//     5: "inactive",
//     6: "hired",
//   };

//   // ✅ API Calls
//   const {
//     data: apiResponse,
//     isLoading,
//     refetch,
//   } = useGetEmployerJobListingQuery(tabStatusMap[active]);
//   const { data: allJobsResponse, isLoading: countIsLoading } =
//     useGetEmployerJobListingQuery("all");
//   const [editStatus] = useActiveAndCloseJobMutation();

//   // ✅ Count jobs per status using allJobsResponse
//   const counts = useMemo(() => {
//     const countObj = {
//       all: 0,
//       "save-as-draft": 0,
//       active: 0,
//       "on-going": 0,
//       completed: 0,
//       inactive: 0,
//       hired: 0,
//     };

//     allJobsResponse?.data?.forEach((job) => {
//       const status = job.status?.toLowerCase();
//       if (status && countObj[status] !== undefined) countObj[status]++;
//     });

//     countObj.all = allJobsResponse?.data?.length || 0;

//     return countObj;
//   }, [allJobsResponse]);

//   // ✅ Tabs with dynamic counts
//   const tabs = useMemo(
//     () => [
//       `All (${counts.all})`,
//       `Draft Jobs (${counts["save-as-draft"]})`,
//       `Active Jobs (${counts.active})`,
//       `Ongoing (${counts["on-going"]})`,
//       `Completed (${counts.completed})`,
//       `Inactive (${counts.inactive})`,
//       `Hired (${counts.hired})`,
//     ],
//     [counts]
//   );

//   // ✅ Jobs data
//   const jobs = useMemo(() => {
//     if (!apiResponse?.data) return [];
//     return apiResponse.data.map((job, index) => ({
//       srNo: index + 1,
//       id: job.job_id,
//       jobRole: job.job_role,
//       status: job.status,
//       postedAt: job.posted_on,
//       validTill: job.start_date,
//       applicants: job.no_of_applications,
//       vacancy: job.no_of_applications,
//       totalVacancy: job.total_vacancy,
//       is_close_possible: job.is_close_possible,
//       ...job,
//     }));
//   }, [apiResponse]);

//   // ✅ Menu handlers
//   const handleOpen = (event, rowId) => {
//     setAnchorEl(event.currentTarget);
//     setMenuRowId(rowId);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//     setMenuRowId(null);
//   };
//   const handleStatus = (values) => {
//     handleSubmit({ values, refetch, apiCall: editStatus });
//   };

//   // ✅ Table Columns
//   const columns = useMemo(
//     () => [
//       { key: "srNo", label: "Sr No" },
//       {
//         key: "jobRole",
//         label: "Job Role",
//         render: (row) => (
//           <Link
//             to={`/dashboard/jobs-listing/${row.id}`}
//             state={{ row }}
//             className="hover:underline truncate"
//           >
//             {row.jobRole?.length > 30
//               ? row.jobRole.slice(0, 30) + "..."
//               : row.jobRole || "Untitled Job"}
//           </Link>
//         ),
//       },
//       {
//         key: "status",
//         label: "Job Status",
//         render: (row) => <Status type={row.status} />,
//       },
//       { key: "postedAt", label: "Date Posted" },
//       { key: "validTill", label: "Start Date" },
//       { key: "applicants", label: "Applicants" },
//       {
//         key: "vacancy",
//         label: "Vacancy",
//         render: (row) => (
//           <div>
//             <span>{row.vacancy}</span>
//             <span className="text-gray-400">/{row.totalVacancy}</span>
//           </div>
//         ),
//       },
//       {
//         key: "action",
//         label: "Action",
//         render: (row) => {
//           const actions = [
//             {
//               label: "Edit Job",
//               onClick: () => navigate(`/dashboard/edit-job/${row.id}`),
//               disabled:
//                 ["Completed", "On-going", "Hired"].includes(row.status) ||
//                 row.vacancy !== 0,
//             },
//             {
//               label: "Duplicate Job",
//               onClick: () => navigate(`/dashboard/duplicate-job/${row.id}`),
//             },
//             {
//               label: "Publish",
//               onClick: () => handleStatus({ job_id: row.id, status: "active" }),
//               disabled: row.status !== "Save-as-draft",
//             },
//             {
//               label: "Close",
//               onClick: () =>
//                 handleStatus({ job_id: row.id, status: "inactive" }),
//               disabled: !row.is_close_possible,
//               // disabled: row.status !== "Active" || row.vacancy !== 0 || !row.is_close_possible,
//             },
//           ];

//           const availableActions = actions.filter((a) => !a.disabled);
//           if (!availableActions.length) return null;

//           return (
//             <>
//               <Button
//                 onClick={(e) => handleOpen(e, row.id)}
//                 className="rounded-full p-2 font-semibold hover:bg-gray-200"
//               >
//                 <EllipsisHorizontalIcon className="h-5 w-5" />
//               </Button>

//               {menuRowId === row.id && (
//                 <Menu
//                   anchorEl={anchorEl}
//                   open={Boolean(anchorEl)}
//                   onClose={handleClose}
//                   anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                   transformOrigin={{ vertical: "top", horizontal: "right" }}
//                 >
//                   {availableActions.map((action, index) => (
//                     <MenuItem
//                       key={index}
//                       onClick={() => {
//                         action.onClick();
//                         handleClose();
//                       }}
//                     >
//                       {t(action.label)}
//                     </MenuItem>
//                   ))}
//                 </Menu>
//               )}
//             </>
//           );
//         },
//       },
//     ],
//     [navigate, active, anchorEl, menuRowId]
//   );

//   return (
//     <section className="min-h-screen bg-gray-50 p-4">
//       <div
//         className="rounded shadow-md mb-4 overflow-x-auto"
//         style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//       >
//         <div style={{ display: "flex" }}>
//           <Tabs tabs={tabs} active={active} setActive={setActive} />
//         </div>
//         <style>{`div::-webkit-scrollbar { display: none; }`}</style>
//       </div>

//       <div className="rounded bg-white shadow-sm p-4">
//         {isLoading || countIsLoading ? (
//           <Spinner />
//         ) : (
//           <PaginatedTable
//             title="Job List"
//             columns={columns}
//             data={jobs}
//             isDateFilter={false}
//           />
//         )}
//       </div>
//     </section>
//   );
// };

// export default JobsListing;
