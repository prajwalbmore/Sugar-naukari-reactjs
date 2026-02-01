import React from "react";
import {
  useGetDashboardForEmployeeeQuery,
  useGetDashboardForEmployerQuery,
} from "../../services/jobApiSlice";
import Spinner from "../../components/ui/Spinner";
import EmployeeDashboardIndex from "./EmployeeDashboardIndex";
import EmpyoyerDashboardIndex from "./EmpyoyerDashboardIndex";
import { useAuthContext } from "../../contexts/auth/context";
import { useTranslation } from "react-i18next";


const Dashboard = () => {
  const { userType } = useAuthContext();
  const { t } = useTranslation();
  // Employer dashboard query
  const {
    data: employerData,
    isLoading: employerLoading,
    refetch: employerRefetch,
    error: employerError,
  } = useGetDashboardForEmployerQuery(
    { allFlag: true },
    {
      pollingInterval: 30000, // Poll every 30 seconds
      skip: userType !== "employer",
    }
  );

  // Employee dashboard query
  const {
    data: employeeData,
    isLoading: employeeLoading,
    refetch: employeeRefetch,
    error: employeeError,
  } = useGetDashboardForEmployeeeQuery(
    {}, // Add location params if needed
    {
      pollingInterval: 30000,
      skip: userType !== "employee",
    }
  );

  // Loading state
  if (
    (userType === "employer" && employerLoading) ||
    (userType === "employee" && employeeLoading)
  ) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner />
      </div>
    );
  }

  // Error states
  if (
    (userType === "employer" && employerError) ||
    (userType === "employee" && employeeError)
  ) {
    const error = userType === "employer" ? employerError : employeeError;
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {t("Something went wrong")}
          </h2>
          <p className="text-gray-600 mb-4">
            {error?.data?.message || "Failed to load dashboard data"}
          </p>
          <button
            onClick={() => {
              if (userType === "employer") employerRefetch();
              else employeeRefetch();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t("Try Again")}
          </button>
        </div>
      </div>
    );
  }

  // Empty state for employer with no jobs
  if (userType === "employer" && !employerData?.data?.data_available) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t("Ready to post your first job?")}
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {t("Get started with your first job post and attract the right talent today")}
          </p>
          <button
            onClick={() => (window.location.href = "/dashboard/post-job")}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            {t("Post Your First Job")}
          </button>
        </div>
      </div>
    );
  }

  // Empty state for employee with no activity
  if (userType === "employee" && !employeeData?.data?.data_available) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-emerald-50 to-teal-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t("Start your job search journey")}
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {t("Browse available jobs and apply to positions that match your skills")}
          </p>
          <button
            onClick={() => (window.location.href = "/dashboard/jobs")}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {t("Browse Jobs")}
          </button>
        </div>
      </div>
    );
  }

  // Render appropriate dashboard based on user type
  return (
    <div className="min-h-screen bg-gray-50">
      {userType === "employee" ? (
        <EmployeeDashboardIndex
          data={employeeData?.data}
          refetch={employeeRefetch}
        />
      ) : (
        <EmpyoyerDashboardIndex
          data={employerData?.data}
          refetch={employerRefetch}
        />
      )}
    </div>
  );
};

export default Dashboard;
