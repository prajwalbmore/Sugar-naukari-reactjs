import React from "react";
import Badge from "../../components/ui/Badge";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeaderSection = ({ data, onDownloadClick, onContactClick }) => {
  const { t } = useTranslation();
  return (
    <section className="hidden md:block">
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
      <div className="flex justify-center pt-20 relative">
        <img
          src="/assets/landingpage/Phones/AboutJoinUs.png"
          className="lg:h-96 md:h-80 h-60"
          alt="Preview"
        />
        <div
          className="
    absolute 
    -bottom-2 sm:-bottom-4 md:-bottom-6 lg:-bottom-2 
    left-0 w-full 
    h-20 md:h-56 lg:h-60 
    bg-gradient-to-t from-[#FCF6DF] to-transparent 
    pointer-events-none
  "
        ></div>
      </div>
      {/*    15,000+ Jobs Completed*/}
      <div
        className="
    absolute 
    bottom-0  md:bottom-[335px] lg:bottom-20
    left-4 sm:left-8 md:left-20 lg:left-[370px]
    -rotate-6 sm:-rotate-12 md:-rotate-6 lg:rotate-0
    bg-white 
    rounded-full 
    w-56 sm:w-52 md:w-56 lg:w-[240px]
    px-1 sm:px-3 md:px-4 py-2 
    flex items-center gap-2 
    shadow
  "
      >
        {" "}
        <img
          src="/assets/landingpage/Icons/home/UpwardArrow.png"
          alt="Arrow Icon"
          className="h-4 lg:h-6"
        />
        <span className="font-medium text-gray-800 text-sm sm:text-base md:text-sm lg:text-md">
          {data?.job_completed ? data?.job_completed : "0"}{" "}
          {t("Jobs Completed")}
        </span>
      </div>
      {/* 12k+ */}
      <div className="absolute lg:-bottom-[90px] lg:left-[990px] md:bottom-[150px] md:left-[550px] bg-white rounded-full w-[220px]  pr-3 flex items-center gap-2 shadow">
        <div className="flex -space-x-2">
          <img
            src="/assets/landingpage/Images/avatar/Avatar1.png"
            alt="Avatar 1"
            className="h-12 w-12 rounded-full border-2 border-white"
          />
          <img
            src="/assets/landingpage/Images/avatar/Avatar2.png"
            alt="Avatar 2"
            className="h-12 w-12 rounded-full border-2 border-white"
          />
          <img
            src="/assets/landingpage/Images/avatar/Avatar3.png"
            alt="Avatar 3"
            className="h-12 w-12 rounded-full border-2 border-white"
          />
        </div>
        <img
          src="/assets/landingpage/Icons/home/love 1.png"
          alt="Love Icon"
          className="h-6 w-6 ml-2"
        />
        <span className="font-medium text-gray-800 ml-1">
          {data?.likes ? data?.likes : "0"}+
        </span>
      </div>
      {/*  Employers Registered*/}
      <div className="absolute lg:-bottom-[0px] lg:left-[1060px] md:bottom-[250px] md:left-[550px] bg-white rounded-3xl w-[240px] px-2 py-5 text-center shadow space-y-3 ">
        <p className="text-xl">{t("Employers Registered")}</p>
        <p className="text-3xl font-bold">
          🏢 {data?.employers_registred ? data?.employers_registred : "0"}+
        </p>
      </div>
      {/*  Active Students*/}
      <div className="absolute lg:-bottom-[100px] md:bottom-20  lg:left-[480px] md:left-[80px] bg-white rounded-3xl w-[220px] px-4 py-4 shadow space-y-3  -rotate-6">
        <p className="text-xl">{t("Active Students")}</p>
        <p className="text-3xl font-bold">
          🎓 {data?.active_students ? data?.active_students : "0"}
        </p>
      </div>
    </section>
  );
};

export default HeaderSection;
// "active_students": "1300",
// "employers_registred": "60",       \
// "likes": "21",
// "job_completed": null,
