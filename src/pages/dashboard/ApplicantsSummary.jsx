import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

const ApplicantsSummary = ({ data }) => {
  const { total_applicants, breakdown } = data?.applicants_summary || {};
  const {
    applied = 0,
    approved = 0,
    //pending = 0,
    rejected = 0,
  } = breakdown || {};
  const { t } = useTranslation();

  // Calculate percentages for the progress bar safely
  const total = applied + approved + rejected || 1; // fallback to 1 to avoid division by zero
  const newPercent = (applied / total) * 100;
  const approvedPercent = (approved / total) * 100;
  //const pendingPercent = (pending / total) * 100;
  const rejectedPercent = (rejected / total) * 100;

  const legendData = useMemo(
    () => [
      { label: "Applied", count: applied, color: "bg-blue-500" },
      // { label: "Pending", count: pending, color: "bg-yellow-400" },
      { label: "Approved", count: approved, color: "bg-green-400" },
      { label: "Rejected", count: rejected, color: "bg-red-500" },
    ],
    [applied, approved, rejected]
  );
  return (
    <div className="rounded-lg px-4 py-4 shadow-md border border-gray-200">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        {t("Applicants Summary")}
      </h2>

      {/* Total Count */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold text-gray-900">
            {total_applicants || 0}
          </span>
          <span className="text-gray-500 text-lg">{t("Applicants")}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex h-3 rounded-full overflow-hidden">
          <div
            className="bg-blue-500"
            style={{ width: `${newPercent}%` }}
          ></div>
          <div
            className="bg-green-400"
            style={{ width: `${approvedPercent}%` }}
          ></div>
          {/* <div
            className="bg-yellow-400"
            style={{ width: `${pendingPercent}%` }}
          ></div> */}
          <div
            className="bg-red-500"
            style={{ width: `${rejectedPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-4">
        {legendData.map(({ label, count, color }) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-sm ${color}`}></div>
            <span className="text-sm text-gray-600">
              {label} : <span className="font-semibold">{count}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicantsSummary;
