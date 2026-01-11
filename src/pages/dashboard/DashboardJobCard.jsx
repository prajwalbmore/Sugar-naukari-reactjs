import React from "react";
import {
  BookmarkIcon,
  ShareIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const DashboardJobCard = ({ job, isDetails = false, t }) => {
  const pct = Math.max(0, Math.min(100, (job.applied / job.capacity) * 100));

  const badgeClasses =
    "px-2 py-1 rounded-full text-[12px] font-bold inline-block";

  return (
    <div
      className={`bg-[#F2F2F2] w-full rounded-2xl px-4 py-5 shadow hover:shadow-lg transition ${
        isDetails ? "flex flex-col items-center" : "space-y-4"
      }`}
    >
      {/* Job Info */}
      <div>
        {/* Title */}

        <Link
          to={`/dashboard/jobs-listing/${job.job_id}`}
          state={{ row: job }}
          className="text-xl font-semibold"
        >
          {job.title.length > 20 ? `${job.title.slice(0, 20)}...` : job.title}
        </Link>

        {/* Location */}
        <div className="flex gap-2 items-center mt-3 text-gray-600">
          <img
            src="/assets/landingpage/Icons/locatio.png"
            alt="Location"
            className="h-5 w-5"
          />
          <span>
            {job.location.length > 20
              ? `${job.location.slice(0, 20)}...`
              : job.location}
          </span>
        </div>

        {/* Job Details */}
        <div className="flex flex-wrap gap-3 mt-3">
          <span className={`${badgeClasses} bg-[#56CDAD1A] text-[#56CDAD]`}>
            {job.validTill}
          </span>
          <span
            className={`${badgeClasses} border border-[#FFB836] text-[#FFB836]`}
          >
            {job.time}
          </span>
          <span className={`${badgeClasses} border border-black text-black`}>
            {job.pay}
          </span>
        </div>
      </div>

      {/* Capacity & Progress */}
      {!isDetails && (
        <div className="w-full">
          <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-amber-300 transition-all duration-300 ease-in-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-700">
            <span className="font-semibold">{job.applied}</span>
            <span className="text-gray-500">
              {" "}
              {t("of")} {job.capacity} {t("capacity")}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardJobCard;
