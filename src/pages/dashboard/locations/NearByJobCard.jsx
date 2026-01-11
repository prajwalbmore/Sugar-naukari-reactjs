import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import Button from "../../../components/ui/Button";

const NearByJobCard = ({ job, userLocation }) => {
  const handleNavigate = () => {
    if (!userLocation) {
      alert("User location not available");
      return;
    }

    // Google Maps directions URL
    const url = `https://www.google.com/maps/dir/?api=1&origin=${
      userLocation.lat
    },${userLocation.lng}&destination=${job.lat || job.latitude},${
      job.lng || job.longitude
    }&travelmode=driving`;
    console.log("{lng: 73.8786239, lat: 18.5246091}",url)
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl px-5 py-5 space-y-4 shadow hover:shadow-lg transition">
      {/* Job Title */}
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">{job.title}</h3>
        <Button onClick={handleNavigate} title="Goto google maps">
          <ArrowRightCircleIcon className="h-7 " />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex gap-4 items-center">
        <img
          src={job.logo}
          alt={`${job.companyName} logo`}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div className="space-y-1">
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
          <p className="flex items-center gap-1 text-gray-600">
            <img
              src="/assets/landingpage/Icons/locatio.png"
              alt="Location"
              className="h-8 w-8"
            />
            {job.location}
          </p>

          {/* Rating, Duration, Views */}
          <div className="flex items-center text-sm text-gray-700 gap-2">
            <div className="flex items-center gap-1 border-r-2 border-[#7C8493] pr-2">
              <img
                src="/assets/landingpage/Icons/StarRating.png"
                alt="Rating"
                className="h-4 w-4"
              />
              {job.rating}
            </div>
            <span className="px-2 border-r-2 border-[#7C8493] text-green-600">
              {job.duration}
            </span>
            <span className="px-2 text-yellow-800">{job.views}</span>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="flex flex-wrap gap-3 mt-3 text-sm font-bold">
        <span className="bg-[#56CDAD1A] text-[#56CDAD] px-3 py-1 rounded-full ">
          Valid til {job.validTill}
        </span>
        <span className="border border-[#FFB836] text-[#FFB836] px-3 py-1 rounded-full ">
          {job.time}
        </span>
        <span className="border border-black px-3 py-1 rounded-full ">
          {job.pay}
        </span>
      </div>
    </div>
  );
};

export default NearByJobCard;
