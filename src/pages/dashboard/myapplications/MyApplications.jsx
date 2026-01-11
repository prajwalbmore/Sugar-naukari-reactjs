import React, { useState, useMemo, use } from "react";
import Tabs from "../../../components/ui/Tabs";
import ReusableTable from "../../../components/ui/ReusableTable";
import { useGetMyApplicationsQuery } from "../../../services/jobApiSlice";
import Spinner from "../../../components/ui/Spinner";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import DeleteApplicantModal from "../empyoerdashboard/jobslisting/DeleteApplicantModal";
import { useDisclosure } from "../../../hooks/useDisclosure";

// Status styles configuration
// const statusStyles = {
//   applied: { label: "Applied", color: "bg-[#EDF0FF] text-[#1265B7]" },
//   save: { label: "Saved", color: "bg-[#FFFBDA] text-[#F1BB46]" },
//   approved: { label: "Approved", color: "bg-[#E6FFED] text-[#28A745]" },
//   reject: { label: "Rejected", color: "bg-[#FFF2EA] text-[#F15046]" },
//   "on-going": { label: "Ongoing", color: "bg-blue-100 text-blue-600" },
//   "stand-by": { label: "Stand By", color: "bg-blue-100 text-blue-600" },
//   completed: { label: "Completed", color: "bg-green-100 text-green-600" },
// };
const statusStyles = {
  applied: { label: "Applied", color: "bg-blue-100 text-blue-600" },
  approved: { label: "Approved", color: "bg-green-100 text-green-600" },
  reject: { label: "Rejected", color: "bg-red-100 text-red-600" },
  "on-going": { label: "Ongoing", color: "bg-indigo-100 text-indigo-600" },
  ongoing: { label: "Ongoing", color: "bg-indigo-100 text-indigo-600" },
  completed: { label: "Completed", color: "bg-emerald-100 text-emerald-600" },
};

// Status component
export const Status = ({ type }) => {
  const status = statusStyles[type?.toLowerCase()] || {
    label: type,
    color: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`px-2 sm:px-3 py-1 rounded-full w-32 text-xs sm:text-sm font-medium ${status.color} flex items-center gap-1`}
    >
      <span className="text-lg font-bold">•</span> {status.label}
    </span>
  );
};

const MyApplications = () => {
  const { index } = useLocation().state || { index: 0 };
  const [active, setActive] = useState(index);
  const [selected, setSelected] = useState({});

  const [isOpenDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const { t } = useTranslation();

  // Fetch from API
  const { data: apiRes, isLoading } = useGetMyApplicationsQuery({ status: "" });
  const applications = apiRes?.data || [];
  console.log("Data", applications);

  // Generate dynamic counts
  const tabs = useMemo(() => {
    const counts = {
      all: applications.length,
      applied: applications.filter((a) => a.status?.toLowerCase() === "applied")
        .length,
      approved: applications.filter(
        (a) => a.status?.toLowerCase() === "approved"
      ).length,
      reject: applications.filter((a) => a.status?.toLowerCase() === "reject")
        .length,
      ongoing: applications.filter(
        (a) => a.status?.toLowerCase() === "ongoing"
      ).length,
      completed: applications.filter(
        (a) => a.status?.toLowerCase() === "completed"
      ).length,
    };

    return [
      `${t("All Jobs")} (${counts.all})`,
      `${t("Applied")} (${counts.applied})`,
      `${t("Approved")} (${counts.approved})`,
      `${t("Rejected")} (${counts.reject})`,
      `${t("Ongoing")} (${counts.ongoing})`,
      `${t("Completed")} (${counts.completed})`,
    ];
  }, [applications]);

  const columns = useMemo(
    () => [
      { key: "srno", label: "Sr No" },
      { key: "company_name", label: "Company Name" },
      // { key: "role", label: "Role" },
      {
        key: "role",
        label: "Role",
        render: (row) => (
          <Link
            to={`/dashboard/jobs/${row.job_id}`} // Adjust the path according to your routing structure
            className="hover:underline font-medium"
          >
            {row.role
              ? row.role.length > 40
                ? row.role.slice(0, 40) + "..."
                : row.role
              : "Untitled Job"}
          </Link>
        ),
      },
      { key: "date_applied", label: "Applied At" },
      {
        key: "status",
        label: "Status",
        render: (row) => <Status type={row.status} />,
      },
      {
        key: "action",
        label: "Action",
        render: (row) => (
          <div className="flex gap-2">
            {/* {row.status === "approved" && row.status === "applied" && ( */}
              <Button
                onClick={() => {
                  openDelete();
                  setSelected(row);
                }}
                className="rounded-full bg-gray-300 px-4 py-1 font-semibold hover:bg-gray-400"
              >
                ❌
              </Button>
            {/* )} */}
          </div>
        ),
      },
    ],
    []
  );

  // Filter data based on active tab
  const getFilteredData = () => {
    switch (active) {
      case 1:
        return applications
          .filter((a) => a.status?.toLowerCase() === "applied")
          .map((appli, index) => ({
            ...appli,
            srno: index + 1,
          }));
      case 2:
        return applications
          .filter((a) => a.status?.toLowerCase() === "approved")
          .map((appli, index) => ({
            ...appli,
            srno: index + 1,
          }));
      case 3:
        return applications
          .filter((a) => a.status?.toLowerCase() === "reject")
          .map((appli, index) => ({
            ...appli,
            srno: index + 1,
          }));
      case 4:
        return applications
          .filter((a) => a.status?.toLowerCase() === "ongoing")
          .map((appli, index) => ({
            ...appli,
            srno: index + 1,
          }));
      case 5:
        return applications
          .filter((a) => a.status?.toLowerCase() === "completed")
          .map((appli, index) => ({
            ...appli,
            srno: index + 1,
          }));
      default:
        return applications.map((appli, index) => ({
          ...appli,
          srno: index + 1,
        }));
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section className="p-2 sm:p-4 min-h-screen">
      <div className="rounded shadow-md mb-4 overflow-x-auto">
        <Tabs tabs={tabs} active={active} setActive={setActive} />
      </div>
      <div className="rounded p-2 sm:p-4 overflow-x-auto">
        <ReusableTable
          columns={columns}
          data={getFilteredData()}
          pageSize={5}
          title="Applications History"
          isDateFilter={false}
          className="w-full min-w-[600px] sm:min-w-full"
        />
      </div>
      <Modal onClose={closeDelete} open={isOpenDelete} title="Delete" size="md">
        <DeleteApplicantModal
          // jobs={job}
          selected={selected}
          onClose={closeDelete}
          // refetch={refetch}
          isEmployee
        />
      </Modal>
    </section>
  );
};

export default MyApplications;
// import React, { useState, useMemo } from "react";
// import Tabs from "../../../components/ui/Tabs";
// import ReusableTable from "../../../components/ui/ReusableTable";
// import { useGetMyApplicationsQuery } from "../../../services/jobApiSlice";
// import Spinner from "../../../components/ui/Spinner";

// // Status styles configuration
// const statusStyles = {
//   applied: { label: "Applied", color: "bg-[#EDF0FF] text-[#1265B7]" },
//   pending: { label: "Pending", color: "bg-[#FFFBDA] text-[#F1BB46]" },
//   rejected: { label: "Rejected", color: "bg-[#FFF2EA] text-[#F15046]" },
//   approved: { label: "Approved", color: "bg-[#E6FFED] text-[#28A745]" },
//   ongoing: { label: "Ongoing", color: "bg-blue-100 text-blue-600" },
//   completed: { label: "Completed", color: "bg-green-100 text-green-600" },
// };

// // Status component
// export const Status = ({ type }) => {
//   const status = statusStyles[type?.toLowerCase()] || {
//     label: type,
//     color: "bg-gray-100 text-gray-700",
//   };

//   return (
//     <span
//       className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${status.color} flex items-center gap-1`}
//     >
//       <span className="text-lg font-bold">•</span> {status.label}
//     </span>
//   );
// };

// const MyApplications = () => {
//   const [active, setActive] = useState(0);

//   // Fetch from API
//   const { data: apiRes, isLoading } = useGetMyApplicationsQuery({ status: "" });
//   const applications = apiRes?.data || [];

//   // Generate dynamic counts
//   const tabs = useMemo(() => {
//     const counts = {
//       all: applications.length,
//       saved: applications.filter((a) => a.status?.toLowerCase() === "save")
//         .length,
//       applied: applications.filter((a) => a.status?.toLowerCase() === "applied")
//         .length,
//       pending: applications.filter((a) => a.status?.toLowerCase() === "pending")
//         .length,
//       ongoing: applications.filter(
//         (a) => a.status?.toLowerCase() === "on-going"
//       ).length,
//       completed: applications.filter(
//         (a) => a.status?.toLowerCase() === "completed"
//       ).length,
//     };

//     return [
//       `All (${counts.all})`,
//       `Applied Jobs (${counts.applied})`,
//       `Saved Jobs (${counts.saved})`,
//       `Pending Jobs (${counts.pending})`,
//       `Ongoing Jobs (${counts.ongoing})`,
//       `Completed Jobs (${counts.completed})`,
//     ];
//   }, [applications]);

//   const columns = useMemo(
//     () => [
//       { key: "id", label: "Sr No" },
//       { key: "company_name", label: "Company Name" },
//       { key: "role", label: "Role" },
//       { key: "date_applied", label: "Applied At" },
//       {
//         key: "status",
//         label: "Status",
//         render: (row) => <Status type={row.status} />,
//       },
//     ],
//     []
//   );

//   // Filter data based on active tab
//   const getFilteredData = () => {
//     switch (active) {
//       case 1:
//         return applications.filter((a) => a.status?.toLowerCase() === "save");
//       case 2:
//         return applications.filter(
//           (a) => a.status?.toLowerCase() === "applied"
//         );
//       case 3:
//         return applications.filter(
//           (a) => a.status?.toLowerCase() === "pending"
//         );
//       case 4:
//         return applications.filter(
//           (a) => a.status?.toLowerCase() === "on-going"
//         );
//       case 5:
//         return applications.filter(
//           (a) => a.status?.toLowerCase() === "completed"
//         );
//       default:
//         return applications;
//     }
//   };

//   if (isLoading) return <Spinner />;

//   return (
//     <section className="p-2 sm:p-4 min-h-screen">
//       <div className="rounded shadow-md mb-4 overflow-x-auto">
//         <Tabs tabs={tabs} active={active} setActive={setActive} />
//       </div>
//       <div className="rounded p-2 sm:p-4 overflow-x-auto">
//         <ReusableTable
//           columns={columns}
//           data={getFilteredData()}
//           pageSize={5}
//           title="Applications History"
//           isDateFilter={false}
//           className="w-full min-w-[600px] sm:min-w-full"
//         />
//       </div>
//     </section>
//   );
// };

// export default MyApplications;
// import React, { useState, useMemo } from "react";
// import Tabs from "../../../components/ui/Tabs";
// import ReusableTable from "../../../components/ui/ReusableTable";
// import { useGetMyApplicationsQuery } from "../../../services/jobApiSlice";
// import Spinner from "../../../components/ui/Spinner";

// // Status styles configuration
// const statusStyles = {
//   applied: { label: "Applied", color: "bg-[#EDF0FF] text-[#1265B7]" },
//   pending: { label: "Pending", color: "bg-[#FFFBDA] text-[#F1BB46]" },
//   rejected: { label: "Rejected", color: "bg-[#FFF2EA] text-[#F15046]" },
//   approved: { label: "Approved", color: "bg-[#E6FFED] text-[#28A745]" },
//   ongoing: { label: "Ongoing", color: "bg-blue-100 text-blue-600" },
//   completed: { label: "Completed", color: "bg-green-100 text-green-600" },
// };

// // Status component
// export const Status = ({ type }) => {
//   const status = statusStyles[type?.toLowerCase()] || {
//     label: type,
//     color: "bg-gray-100 text-gray-700",
//   };

//   return (
//     <span
//       className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
//     >
//       <span className="text-lg font-bold"> • </span> {status.label}
//     </span>
//   );
// };

// const MyApplications = () => {
//   const [active, setActive] = useState(0);

//   // Fetch from API
//   const { data: apiRes, isLoading } = useGetMyApplicationsQuery({
//     status: "",
//   });

//   const applications = apiRes?.data || [];

//   // Generate dynamic counts
//   const tabs = useMemo(() => {
//     const counts = {
//       all: applications.length,
//       saved: applications.filter((a) => a.status?.toLowerCase() === "save")
//         .length,
//       applied: applications.filter((a) => a.status?.toLowerCase() === "applied")
//         .length,
//       pending: applications.filter((a) => a.status?.toLowerCase() === "pending")
//         .length,
//       ongoing: applications.filter(
//         (a) => a.status?.toLowerCase() === "on-going"
//       ).length,
//       completed: applications.filter(
//         (a) => a.status?.toLowerCase() === "completed"
//       ).length,
//     };

//     return [
//       `All (${counts.all})`,
//       `Saved Jobs (${counts.saved})`,
//       `Applied Jobs (${counts.applied})`,
//       `Pending Jobs (${counts.pending})`,
//       `Ongoing Jobs (${counts.ongoing})`,
//       `Completed Jobs (${counts.completed})`,
//     ];
//   }, [applications]);

//   const columns = useMemo(
//     () => [
//       { key: "id", label: "Sr No" },
//       { key: "company_name", label: "Company Name" },
//       { key: "role", label: "Role" },
//       { key: "date_applied", label: "Applied At" },
//       {
//         key: "status",
//         label: "Status",
//         render: (row) => <Status type={row.status} />,
//       },
//     ],
//     []
//   );

//   // Filter data based on active tab
//   const getFilteredData = () => {
//     switch (active) {
//       case 1:
//         return applications.filter((a) => a.status?.toLowerCase() === "save");
//       case 2:
//         return applications.filter(
//           (a) => a.status?.toLowerCase() === "applied"
//         );
//       case 3:
//         return applications.filter(
//           (a) => a.status?.toLowerCase() === "pending"
//         );
//       case 4:
//         return applications.filter(
//           (a) => a.status?.toLowerCase() === "on-going"
//         );
//       case 5:
//         return applications.filter(
//           (a) => a.status?.toLowerCase() === "completed"
//         );
//       default:
//         return applications;
//     }
//   };

//   if (isLoading) return <Spinner />;

//   return (
//     <section className="p-4 min-h-screen">
//       <div className="rounded shadow-md mb-4">
//         <Tabs tabs={tabs} active={active} setActive={setActive} />
//       </div>
//       <div className="rounded p-4">
//         <ReusableTable
//           columns={columns}
//           data={getFilteredData()}
//           pageSize={5}
//           title="Applications History"
//         />
//       </div>
//     </section>
//   );
// };

// export default MyApplications;
// import React, { useState, useMemo } from "react";
// import Tabs from "../../../components/ui/Tabs";
// import ReusableTable from "../../../components/ui/ReusableTable";
// import { useGetMyApplicationsQuery } from "../../../services/jobApiSlice";
// import Spinner from "../../../components/ui/Spinner";

// // Status styles configuration
// const statusStyles = {
//   applied: {
//     label: "Applied",
//     color: "bg-[#EDF0FF] text-[#1265B7]",
//   },
//   pending: {
//     label: "Pending",
//     color: "bg-[#FFFBDA] text-[#F1BB46]",
//   },
//   rejected: {
//     label: "Rejected",
//     color: "bg-[#FFF2EA] text-[#F15046]",
//   },
//   approved: {
//     label: "Approved",
//     color: "bg-[#E6FFED] text-[#28A745]",
//   },
// };

// // Status component
// export const Status = ({ type }) => {
//   const status = statusStyles[type.toLowerCase()] || {
//     label: type,
//     color: "bg-gray-100 text-gray-700",
//   };

//   return (
//     <span
//       className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
//     >
//       <span className="text-lg font-bold"> • </span> {status.label}
//     </span>
//   );
// };

// // Sample data
// const data = [
//   {
//     id: 1,
//     srNo: 1,
//     companyName: "Acme Corp",
//     role: "Developer",
//     appliedAt: "24 July 2024",
//     status: "Applied",
//   },
//   {
//     id: 2,
//     srNo: 2,
//     companyName: "Beta Inc",
//     role: "Designer",
//     appliedAt: "25 July 2024",
//     status: "Pending",
//   },
//   {
//     id: 3,
//     srNo: 3,
//     companyName: "Gamma LLC",
//     role: "Tester",
//     appliedAt: "26 July 2024",
//     status: "Approved",
//   },
//   {
//     id: 4,
//     srNo: 4,
//     companyName: "Acme Corp",
//     role: "Developer",
//     appliedAt: "24 July 2024",
//     status: "Applied",
//   },
//   {
//     id: 5,
//     srNo: 5,
//     companyName: "Beta Inc",
//     role: "Designer",
//     appliedAt: "25 July 2024",
//     status: "Rejected",
//   },
//   {
//     id: 6,
//     srNo: 6,
//     companyName: "Gamma LLC",
//     role: "Tester",
//     appliedAt: "26 July 2024",
//     status: "Approved",
//   },
//   {
//     id: 7,
//     srNo: 7,
//     companyName: "Acme Corp",
//     role: "Developer",
//     appliedAt: "24 July 2024",
//     status: "Applied",
//   },
//   {
//     id: 8,
//     srNo: 8,
//     companyName: "Beta Inc",
//     role: "Designer",
//     appliedAt: "25 July 2024",
//     status: "Pending",
//   },
//   {
//     id: 9,
//     srNo: 9,
//     companyName: "Gamma LLC",
//     role: "Tester",
//     appliedAt: "26 July 2024",
//     status: "Approved",
//   },
// ];

// const MyApplications = () => {
//   const [active, setActive] = useState(0);
//   const { data: applicationData, isLoading } = useGetMyApplicationsQuery();

//   const tabs = useMemo(
//     () => [
//       `All (${data.length})`,
//       `Saved Jobs (${data.length})`,
//       `Applied Jobs (${
//         data.filter((item) => item.status.toLowerCase() === "applied").length
//       })`,
//       `Pending Jobs (${
//         data.filter((item) => item.status.toLowerCase() === "pending").length
//       })`,
//       `Ongoing Jobs (${data.length})`,
//       `Completed Jobs (${data.length})`,
//     ],
//     []
//   );

//   const columns = useMemo(
//     () => [
//       { key: "srNo", label: "Sr No" },
//       { key: "companyName", label: "Company Name" },
//       { key: "role", label: "Role" },
//       { key: "appliedAt", label: "Applied At" },
//       {
//         key: "status",
//         label: "Status",
//         render: (row) => <Status type={row.status} />,
//       },
//     ],
//     []
//   );

//   const getFilteredData = () => {
//     switch (active) {
//       case 2: // Applied Jobs
//         return data.filter((item) => item.status.toLowerCase() === "applied");
//       case 3: // Pending Jobs
//         return data.filter((item) => item.status.toLowerCase() === "pending");
//       default:
//         return data;
//     }
//   };

//   if (isLoading) return <Spinner />;
//   return (
//     <section className="p-4 min-h-screen">
//       <div className="rounded shadow-md mb-4">
//         <Tabs tabs={tabs} active={active} setActive={setActive} />
//       </div>
//       <div className="rounded p-4">
//         <ReusableTable
//           columns={columns}
//           data={getFilteredData()}
//           pageSize={5}
//           title="Applications History"
//         />
//       </div>
//     </section>
//   );
// };

// export default MyApplications;

// import React, { useState, useMemo } from "react";
// import Tabs from "../../../components/ui/Tabs";
// import ReusableTable from "../../../components/ui/ReusableTable";
// // Status.js or inside ReusableTable file
// const statusStyles = {
//   applied: {
//     label: "Applied",
//     color: "bg-[#EDF0FF] text-[#1265B7]",
//   },
//   pending: {
//     label: "Pending",
//     color: "bg-[#FFFBDA] text-[#F1BB46]",
//   },
//   rejected: {
//     label: "Rejected",
//     color: "bg-[#FFF2EA] text-[#F15046]",
//   },
// };

// export const Status = ({ type }) => {
//   const status = statusStyles[type.toLowerCase()] || {
//     label: type,
//     color: "bg-gray-100 text-gray-700",
//   };

//   return (
//     <span
//       className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
//     >
//       {status.label}
//     </span>
//   );
// };
// const data = [
//   {
//     id: 1,
//     srNo: 1,
//     companyName: "Acme Corp",
//     role: "Developer",
//     appliedAt: "24 July 2024",
//     status: "Applied",
//   },
//   {
//     id: 2,
//     srNo: 2,
//     companyName: "Beta Inc",
//     role: "Designer",
//     appliedAt: "25 July 2024",
//     status: "Pending",
//   },
//   {
//     id: 3,
//     srNo: 3,
//     companyName: "Gamma LLC",
//     role: "Tester",
//     appliedAt: "26 July 2024",
//     status: "Approved",
//   },
//   {
//     id: 4,
//     srNo: 4,
//     companyName: "Acme Corp",
//     role: "Developer",
//     appliedAt: "24 July 2024",
//     status: "Applied",
//   },
//   {
//     id: 5,
//     srNo: 5,
//     companyName: "Beta Inc",
//     role: "Designer",
//     appliedAt: "25 July 2024",
//     status: "Rejected",
//   },
//   {
//     id: 6,
//     srNo: 6,
//     companyName: "Gamma LLC",
//     role: "Tester",
//     appliedAt: "26 July 2024",
//     status: "Approved",
//   },
//   {
//     id: 7,
//     srNo: 7,
//     companyName: "Acme Corp",
//     role: "Developer",
//     appliedAt: "24 July 2024",
//     status: "Applied",
//   },
//   {
//     id: 8,
//     srNo: 8,
//     companyName: "Beta Inc",
//     role: "Designer",
//     appliedAt: "25 July 2024",
//     status: "Pending",
//   },
//   {
//     id: 9,
//     srNo: 9,
//     companyName: "Gamma LLC",
//     role: "Tester",
//     appliedAt: "26 July 2024",
//     status: "Approved",
//   },
// ];
// const MyApplications = () => {
//   const [active, setActive] = useState(0);

//   const tabs = useMemo(
//     () => [
//       `All (45)`,
//       `Saved Jobs (45)`,
//       `Applied Jobs (45)`,
//       `Pending Jobs (45)`,
//       `Ongoing Jobs (45)`,
//       `Completed Jobs (45)`,
//     ],
//     []
//   );

//   const columns = [
//     { key: "srNo", label: "Sr No" },
//     { key: "companyName", label: "Company Name" },
//     { key: "role", label: "Role" },
//     { key: "appliedAt", label: "Applied At" },
//     {
//       key: "status",
//       label: "Status",
//       render: (row) => <Status type={row.status} />,
//     },
//   ];
//   const renderTabContent = () => {
//     switch (active) {
//       case 0:
//         return (
//           <ReusableTable
//             columns={columns}
//             data={data}
//             pageSize={5}
//             title="Applications History"
//           />
//         );
//       case 1:
//         return (
//           <ReusableTable
//             columns={columns}
//             data={data}
//             pageSize={5}
//             title="Applications History"
//           />
//         );
//       case 2:
//         return (
//           <ReusableTable
//             columns={columns}
//             data={data}
//             pageSize={5}
//             title="Applications History"
//           />
//         );
//       case 3:
//         return (
//           <ReusableTable
//             columns={columns}
//             data={data}
//             pageSize={5}
//             title="Applications History"
//           />
//         );
//       case 4:
//         return (
//           <ReusableTable
//             columns={columns}
//             data={data}
//             pageSize={5}
//             title="Applications History"
//           />
//         );
//       case 5:
//         return (
//           <ReusableTable
//             columns={columns}
//             data={data}
//             pageSize={5}
//             title="Applications History"
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <section className="p-4 min-h-screen">
//       <div className=" rounded shadow-md mb-4">
//         <Tabs tabs={tabs} active={active} setActive={setActive} />
//       </div>
//       <div className="rounded p-4">{renderTabContent()}</div>
//     </section>
//   );
// };

// export default MyApplications;
