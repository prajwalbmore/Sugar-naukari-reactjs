import React, { useMemo } from "react";
import ReusableTable from "../../components/ui/ReusableTable";
const statusStyles = {
  active: { label: "Active", color: "bg-[#E6FFED] text-[#28A745]" },
  "save-as-draft": { label: "Draft", color: "bg-[#EDF0FF] text-[#1265B7]" },
  "on-going": { label: "Ongoing", color: "bg-[#FFFDE7] text-[#FF9800]" },
  completed: { label: "Completed", color: "bg-[#E0F7FA] text-[#00796B]" },
  inactive: { label: "Inactive", color: "bg-gray-200 text-gray-700" },
};
// User information display
const UserSection = ({ row }) => (
  <div className="flex items-center gap-3">
    <img
      src={row.company_logo || "/default-avatar.png"}
      alt={row.company_name || "User avatar"}
      className="rounded-full h-10 w-10 object-cover"
    />
    <h1 className="font-medium">{row.company_name || "Unknown User"}</h1>
  </div>
);
// ✅ Status Badge Component
const Status = ({ type }) => {
  const status = statusStyles[type?.toLowerCase()] || {
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
const ApplicationsHistory = ({ data, t }) => {
  const columns = useMemo(() => [
    { key: "srNo", label: t("Sr No") },
    {
      key: "company_name",
      label: t("Company Name"),
      render: (row) => <UserSection row={row} />,
    },
    { key: "role", label: t("Role") },
    { key: "date_applied", label: t("Date Applied") },
    {
      key: "status",
      label: t("Job Status"),
      render: (row) => <Status type={row.status} />,
    },
  ]);
  const tabledata = data?.applications_history.map((appli, index) => ({
    srNo: index + 1,
    company_name: appli?.company_name,
    company_logo: appli?.company_logo,
    role: appli?.role,
    date_applied: appli?.date_applied,
    status: appli?.status,
  }));
  return (
    <section>
      <div className="mt-5">
        <ReusableTable
          title="Applications History"
          data={tabledata}
          columns={columns}
          pageSize={5}
          isDateFilter={false}
        />
      </div>
    </section>
  );
};

export default ApplicationsHistory;
