import React, { useState } from "react";
import ringLogo from "/assets/ringLogo.png";
import BriefcaseBusiness from "/assets/BriefcaseBusiness.png";
import UserTie from "/assets/UserTie.png";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth/context";
import { useTranslation } from "react-i18next";

const JoinAs = () => {
  const { t } = useTranslation();
  const { userType, setUserType } = useAuthContext();
  // const [userType, setUserType] = useState("employee");
  const location = useLocation();
  console.log("location", location?.state);

  return (
    <div className="bg-loginbg bg-cover bg-center min-h-screen flex flex-col items-center text-center px-4 relative">
      {/* Logo */}
      <img
        src={ringLogo}
        alt="Fastaff Logo"
        className="h-72 mt-5 relative z-0"
      />

      {/* Description */}
      <div className="absolute top-72 z-10 max-w-xl">
        <p className="text-sm p-2">
          {t(
            "Select whether you're seeking employment opportunities or your organization requires talented individuals"
          )}
          .
        </p>
        <h2 className="text-xl font-semibold">
          {t("What are you looking for")}?
        </h2>
      </div>

      {/* Options */}
      <div className="w-full max-w-sm space-y-4 mt-24 mb-8 z-10 relative">
        {/* Find a Job Option */}
        <label
          className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
            userType === "employee"
              ? "bg-white shadow-lg border-2 border-yellow-400"
              : "bg-gray-100"
          }`}
        >
          <div className="flex items-center space-x-3">
            <img src={BriefcaseBusiness} className="w-8 h-8" alt="Job" />
            <span className="font-medium text-dark">{t("Find a Job")}</span>
          </div>
          <input
            type="radio"
            name="joinOption"
            value="employee"
            checked={userType === "employee"}
            onChange={(e) => setUserType(e.target.value)}
            className="w-5 h-5 accent-black cursor-pointer"
          />
        </label>

        {/* Find an Employee Option */}
        <label
          className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
            userType === "employer"
              ? "bg-white shadow-lg border-2 border-yellow-400"
              : "bg-gray-100"
          }`}
        >
          <div className="flex items-center space-x-3">
            <img src={UserTie} className="w-8 h-8" alt="Employee" />
            <span className="font-medium text-dark">{t("Find an Employee")}</span>
          </div>
          <input
            type="radio"
            name="joinOption"
            value="employer"
            checked={userType === "employer"}
            onChange={(e) => setUserType(e.target.value)}
            className="w-5 h-5 accent-black cursor-pointer"
          />
        </label>
      </div>

      {/* Continue Button */}
      <Link
        to={location?.state}
        state={{ userType }}
        className="w-full max-w-sm bg-dark text-white py-4 rounded-xl font-semibold transition-colors z-10 relative"
        onClick={() => {
          // Handle continue button click
          console.log("Selected option:", userType);
          localStorage.setItem("userType", userType);
        }}
      >
        {t("Continue")}
      </Link>
    </div>
  );
};

export default JoinAs;
