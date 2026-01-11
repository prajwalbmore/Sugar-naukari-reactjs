import React from "react";
import Badge from "../../components/ui/Badge";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TestHeaderSection = ({ data, onDownloadClick, onContactClick }) => {
  const { t } = useTranslation();
  return (
    <section className="">
      <div className="space-y-10 sm:px-6 md:px-16 lg:px-24">
        <div className="text-center mx-auto">
          <Badge
            text="Work Smarter. Earn Faster."
            icon={<ShieldCheck className="w-4 h-4" />}
            bgColor="bg-gray-200"
            textColor="text-black"
            padding="px-3 py-1"
            isHome
          />
          <h2 className="text-4xl sm:text-xl md:text-6xl mt-6">
            <span className="italic font-black">
              {t("Fast, Flexible Jobs")}{" "}
            </span>
            <span className="font-semibold">{t("for Students")}.</span>
          </h2>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mt-4">
            <span className="text-[#594E1F]">{t("Instant Hiring")}</span>{" "}
            {t("for Businesses")}.
          </h2>
          <p className="text-lg sm:text-xl max-w-xs mt-6 text-center mx-auto">
            {t(
              "Whether you're a student looking to earn or a business needing help,FastAff connects you in minutes"
            )}
            .
          </p>
          <div className="flex justify-center gap-5 mt-6 flex-wrap">
            <button
              className="font-semibold bg-appcolor text-black px-6 lg:px-10 py-3 rounded-full shadow hover:opacity-90"
              onClick={onContactClick} // <-- call scroll function
            >
              {t("Contact Us")}
            </button>
            <button
              className="font-semibold bg-dark text-white px-6 lg:px-10 py-3 rounded-full shadow hover:opacity-90"
              onClick={onDownloadClick} // <-- call scroll function
            >
              {t("Download App")}
            </button>
          </div>
        </div>
      </div>
      {/* Image */}
      <div className="grid grid-cols-2 justify-items-center items-center gap-5 bg-center mt-10 bg-homeBg123 h-60  lg:h-[400px] md:h-[300px] bg-no-repeat bg-contain mx-0 lg:mx-60 md:-mx-8">
        {/* 15,000+ Jobs Completed */}
        <div
          className="
    -rotate-6 sm:-rotate-12 md:-rotate-6 lg:rotate-0
    bg-white 
    rounded-full 
    px-2 sm:px-3 md:px-4 py-2 
    hidden sm:flex items-center gap-1 sm:gap-2 
    shadow
  "
        >
          <img
            src="/assets/landingpage/Icons/home/UpwardArrow.png"
            alt="Arrow Icon"
            className="h-4 sm:h-5 md:h-4 lg:h-6"
          />
          <span className="font-medium text-gray-800 text-sm sm:text-base md:text-sm lg:text-md">
            {data?.job_completed ? data?.job_completed : "0"}{" "}
            {t("Jobs Completed")}
          </span>
        </div>

        {/* 12k+ */}
        <div
          className="
    bg-white 
    rounded-full 
    pr-2 sm:pr-3 
    hidden sm:flex 
    items-center 
    gap-1 sm:gap-2 
    shadow
  "
        >
          <div className="flex -space-x-2 sm:-space-x-3">
            <img
              src="/assets/landingpage/Images/avatar/Avatar1.png"
              alt="Avatar 1"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-white"
            />
            <img
              src="/assets/landingpage/Images/avatar/Avatar2.png"
              alt="Avatar 2"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-white"
            />
            <img
              src="/assets/landingpage/Images/avatar/Avatar3.png"
              alt="Avatar 3"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-white"
            />
          </div>
          <img
            src="/assets/landingpage/Icons/home/love 1.png"
            alt="Love Icon"
            className="h-4 w-4 sm:h-6 sm:w-6 ml-1 sm:ml-2"
          />
          <span className="font-medium text-gray-800 ml-1 sm:ml-2">
            {data?.likes ? data?.likes : "0"}+
          </span>
        </div>

        {/* Employers Registered */}
        <div
          className="
    bg-white 
    rounded-3xl 
    px-2 sm:px-3 md:px-4 
    py-4 sm:py-5 
    text-center 
    shadow 
    space-y-2 sm:space-y-3
    hidden sm:block
  "
        >
          <p className="text-lg sm:text-xl">{t("Employers Registered")}</p>
          <p className="text-2xl font-bold">
            🏢 {data?.employers_registred ? data?.employers_registred : "0"}+
          </p>
        </div>

        {/* Active Students */}
        <div
          className="
    bg-white 
    rounded-3xl 
    px-3 sm:px-4 md:px-5
    py-3 sm:py-4 md:py-5
    shadow 
    space-y-2 sm:space-y-3 
    -rotate-3 sm:-rotate-6
    hidden sm:block
  "
        >
          <p className="text-lg sm:text-xl">{t("Active Students")}</p>
          <p className="text-2xl font-bold">
            🎓 {data?.active_students ? data?.active_students : "0"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestHeaderSection;
