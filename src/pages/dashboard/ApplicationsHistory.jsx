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
  const tabledata = data?.application_history?.map((appli, index) => ({
    srNo: index + 1,
    company_name: appli?.company_name,
    company_logo: appli?.company_logo,
    role: appli?.role,
    date_applied: appli?.date_applied,
    status: appli?.status,
  })) || [];

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

  if (!tabledata || tabledata.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
        <p className="text-gray-600">Start applying to jobs to see your application history here.</p>
      </div>
    );
  }

  return (
    <section>
      <div className="overflow-x-auto">
        <ReusableTable
          title=""
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
