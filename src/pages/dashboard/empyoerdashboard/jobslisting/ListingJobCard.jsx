import {
  BookmarkIcon,
  PencilSquareIcon,
  ShareIcon,
} from "@heroicons/react/24/outline"; // Remove if unused
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../../components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

const ListingJobCard = ({
  job,
  isDetails = true,
  onClick = () => {},
  isEmpyoer = false,
  isEdit = true,
  isOngoing = false,
}) => {
  const pct = Math.max(0, Math.min(100, (job.applied / job.capacity) * 100)); // Unused but available
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div
      className={`bg-gray-100 w-full flex rounded-2xl px-8 py-5 ${
        isDetails ? "" : "space-y-4"
      } shadow hover:shadow-lg transition`}
    >
      {/* Left Section: Job Title and Company Info */}
      <div className="flex-1">
        {/* Job Title */}
        <div className="flex items-center gap-5">
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft size={35} strokeWidth={2} />
          </Button>
          <h3 className="text-xl font-semibold ">{job.title}</h3>
        </div>
        {/* Company Info */}
        <div>
          <p className="flex items-center gap-1 text-gray-600 mt-1">
            <img
              src="/assets/landingpage/Icons/locatio.png"
              alt="Location"
              className="h-4 w-4"
            />
            {job.location}
          </p>
        </div>
        <div className="flex gap-4 items-center">
          {/* {!isEmpyoer && (
            <div className="flex gap-4 items-center mt-3">
              <img
                src={job.logo}
                alt={`${job.companyName} logo`}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="font-medium">{job.companyName}</h4>
                  {job.verified && (
                    <img
                      src="/assets/landingpage/Icons/CloudCheck.png"
                      alt="Verified"
                      className="h-4 w-4"
                    />
                  )}
                </div>
                <p className="flex items-center gap-1 text-gray-600 mt-1">
                  <img
                    src="/assets/landingpage/Icons/locatio.png"
                    alt="Location"
                    className="h-4 w-4"
                  />
                  {job.location}
                </p>
              </div>
            </div>
          )} */}
          {/* Job Details Tags */}
          <div className="flex flex-wrap gap-3 text-sm font-bold mt-5">
            <span className="bg-[#56CDAD1A] text-[#56CDAD] px-3 py-1 rounded-full">
              {isOngoing ? t("Start Date") : t("Valid till")} {job.validTill}
            </span>
            <span className="border border-[#FFB836] text-[#FFB836] px-3 py-1 rounded-full">
              {job.time}
            </span>
            <span className="border border-black px-3 py-1 rounded-full">
              {job.pay}
            </span>
          </div>
        </div>
      </div>

      {/* Right Section: Job Details Tags above the button */}
      {/* <div
        className={`space-y-3 ${
          isDetails ? "flex flex-col justify-center items-center" : ""
        }`}
      >
        {/* Button 
        {!isOngoing && (
          <Button
            type="button"
            onClick={() => navigate(`/dashboard/edit-job/${job.id}`)}
            className="w-full rounded-xl flex gap-3 justify-center items-center border border-gray-400  py-2 px-4 text-lg font-semibold hover:opacity-90 transition"
          >
            <PencilSquareIcon className="h-5 w-5" strokeWidth={2} />
            {t("Edit Job Details")}
          </Button>
        )}
      </div> */}
    </div>
  );
};

export default ListingJobCard;
