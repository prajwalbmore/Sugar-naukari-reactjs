// CandidateLeaderboardTable.jsx
import React from "react";
import ReusableTable from "../../../../components/ui/ReusableTable";

const CandidateLeaderboardTable = ({
  data = [],
  title = "Candidate Leaderboard",
}) => {
  const tableData = data?.map((can, index) => ({
    srNo: index + 1,
    name: can?.name,
    applied_at: can?.applied_at,
    completed_jobs: can?.completed_jobs,
  }));
  return (
    <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-md p-4">
      {/* Table Title */}
      <ReusableTable
        title="Candidate Leaderboard"
        isDateFilter={false}
        data={tableData}
        columns={[
          { key: "srNo", label: "Sr No" },
          { key: "name", label: "Name" },
          { key: "applied_at", label: "Applied At" },
          { key: "completed_jobs", label: "Completed Jobs" },
        ]}
      />
    </div>
  );
};

export default CandidateLeaderboardTable;
