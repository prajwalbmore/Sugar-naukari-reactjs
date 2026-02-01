import React, { useEffect, useState } from "react";
import Header from "../../personalinfo/info/Header";
import Experiences from "../../personalinfo/info/Experiences";
import Education from "../../personalinfo/info/Education";
import AdditionalDetails from "../../personalinfo/info/AdditionalDetails";
import { Documents } from "../../personalinfo/info/Documents";
import { ArrowLeft } from "lucide-react";
import Button from "../../../../components/ui/Button";
import RelevantSkillsCard from "./RelevantSkillsCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetApplicantsDetailsQuery } from "../../../../services/authApiSlice";
import Spinner from "../../../../components/ui/Spinner";
import { useHireAndRejectApplicationMutation } from "../../../../services/jobApiSlice";
import { handleSubmit } from "../../../../utils/useHandleSubmit";
import { useAuthContext } from "../../../../contexts/auth/context";
import { useTranslation } from "react-i18next";
import { useSaveChatHistoryMutation } from "../../../../services/faqApiSlice";

// Location functionality removed since distance was removed from the application

const ApplicantDetails = () => {
  const navigate = useNavigate();
  const [hire, { isLoading: hireIsloading }] =
    useHireAndRejectApplicationMutation();
  const [reject, { isLoading: rejectIsloading }] =
    useHireAndRejectApplicationMutation();
  const [saveChatHistory, { isLoading: saveLoading }] =
    useSaveChatHistoryMutation();
  const { id } = useParams();
  const { state } = useLocation();
  const { user } = useAuthContext();
  const { t } = useTranslation();

  // Call API directly without location requirements
  const { data, isLoading, refetch } = useGetApplicantsDetailsQuery({
    emp_id: id,
    job_id: state?.row?.job_id,
  });

  if (isLoading) return <Spinner />;

  const userData = data || {};

  const onSubmit = (status) => {
    handleSubmit({
      values: { job_application_id: state?.row?.job_application_id, status },
      apiCall: hire,
      refetch: refetch,
    });
  };
  const onSubmit1 = (status) => {
    handleSubmit({
      values: { job_application_id: state?.row?.job_application_id, status },
      apiCall: reject,
      refetch: refetch,
    });
  };
  const handleSaveChat = async () => {
    const payload = {
      chatId: `${user?.id}-${userData?.data?.emp_id}`,
      senderId: user?.id,
      recipientId: userData?.data?.emp_id,
    };
    const res = await handleSubmit({
      values: payload,
      apiCall: saveChatHistory,
    });
    if (res.status === "success") {
      navigate("/dashboard/messages", {
        state: {
          recipientId: userData?.data?.emp_id || "",
        },
      });
    }
  };
  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft size={28} strokeWidth={2} />
          </Button>
          <h1 className="text-lg sm:text-xl font-semibold">
            {t("Applicant Details")}
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-0">
          {userData?.data?.application_status === "approved" ? (
            <div className="rounded-full bg-dark text-white px-4 py-2 text-sm text-center">
              {t("Hired")}
            </div>
          ) : userData?.data?.application_status === "reject" ? (
            <div className="rounded-full bg-red-600 text-white px-4 py-2 text-sm text-center">
              {t("Rejected")}
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                className="rounded-full bg-dark text-white px-4 py-2 text-sm hover:bg-dark/90"
                onClick={() => onSubmit("approved")}
                loading={hireIsloading}
              >
                {!hireIsloading && t("Hire Now")}
              </Button>
              <Button
                className="rounded-full border-2 border-red-600 text-red-600 px-4 py-2 text-sm hover:bg-red-50"
                onClick={() => onSubmit1("reject")}
                loading={rejectIsloading}
              >
                {!rejectIsloading && t("Reject")}
              </Button>
            </div>
          )}

          {/* <Button
            className="rounded-full border-2 border-gray-500 text-gray-500 px-4 py-2 text-sm hover:bg-gray-100"
            onClick={handleSaveChat}
            loading={saveLoading}
          >
            {!saveLoading && t("Chat With Employee")}
          </Button> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-full gap-6">
        {/* Left Column */}
        <div className="w-full lg:w-2/3 space-y-6">
          <Header
            rating={userData?.data?.employee_reviews}
            isRatingVisible={true}
            userData={userData}
            refetch={refetch}
            t={t}
          />
          <Experiences userData={userData} refetch={refetch} t={t} />
          <Education
            t={t}
            userData={userData}
            refetch={refetch}
            user={user}
            isApplicant
          />
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-1/3 space-y-6">
          <AdditionalDetails
            t={t}
            userData={userData}
            refetch={refetch}
            isApplicant
          />
          <RelevantSkillsCard userData={userData} t={t} />
          <Documents
            t={t}
            userData={userData}
            refetch={refetch}
            user={user}
            isApplicant
          />
        </div>
      </div>
    </section>
  );
};

export default ApplicantDetails;
// import React, { useEffect, useState } from "react";
// import Header from "../../personalinfo/info/Header";
// import Experiences from "../../personalinfo/info/Experiences";
// import Education from "../../personalinfo/info/Education";
// import AdditionalDetails from "../../personalinfo/info/AdditionalDetails";
// import { Documents } from "../../personalinfo/info/Documents";
// import { ArrowLeft, ChevronDown } from "lucide-react";
// import Button from "../../../../components/ui/Button";
// import RelevantSkillsCard from "./RelevantSkillsCard";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import {
//   useGetApplicantsDetailsQuery,
//   useGetUserDetailsQuery,
// } from "../../../../services/authApiSlice";
// import Spinner from "../../../../components/ui/Spinner";
// import { useHireAndRejectApplicationMutation } from "../../../../services/jobApiSlice";
// import { handleSubmit } from "../../../../utils/useHandleSubmit";
// import { useAuthContext } from "../../../../contexts/auth/context";

// // ✅ custom hook for current location
// const useCurrentLocation = () => {
//   const [location, setLocation] = useState({ lat: null, long: null });
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser");
//       setLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLocation({
//           lat: position.coords.latitude,
//           long: position.coords.longitude,
//         });
//         setLoading(false);
//       },
//       (err) => {
//         setError(err.message);
//         setLoading(false);
//       }
//     );
//   }, []);

//   return { location, error, loading };
// };

// const ApplicantDetails = () => {
//   const navigate = useNavigate();
//   const [hire] = useHireAndRejectApplicationMutation();
//   const [reject] = useHireAndRejectApplicationMutation();
//   const { id } = useParams();
//   const { state } = useLocation();
//   const { user } = useAuthContext();

//   // ✅ get location
//   const { location, error, loading } = useCurrentLocation();

//   // ✅ only call API when we have location
//   const { data, isLoading, refetch } = useGetApplicantsDetailsQuery(
//     {
//       emp_id: id,
//       job_id: state?.row?.job_id,
//       current_lat: location.lat,
//       current_long: location.long,
//     },
//     {
//       skip: !location.lat || !location.long, // ⬅️ skip until we have coords
//     }
//   );
//   console.log("location", error);
//   if (loading || isLoading) return <Spinner />;

//   const userData = data || {};
//   const onSubmit = (status) => {
//     const payload = {
//       job_application_id: state?.row?.job_application_id,
//       status: status,
//     };
//     handleSubmit({
//       values: payload,
//       apiCall: hire, // Replace with the actual API call function for company details
//       // refetch: () => refetch(), // Ensure refetch is available in props/context
//     });
//   };

//   return (
//     <section>
//       <div className="flex justify-between items-center mb-6">
//         {/* Left Section */}
//         <div className="flex items-center gap-5">
//           <Button onClick={() => navigate(-1)}>
//             <ArrowLeft size={35} strokeWidth={2} />
//           </Button>
//           <h1 className="text-xl font-semibold">Applicant Details</h1>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-3">
//           <Button
//             className="rounded-full bg-dark text-white px-5 py-2 text-sm hover:bg-dark/90"
//             onClick={() => onSubmit("approved")}
//           >
//             Hire Now
//           </Button>
//           <Button
//             className="rounded-full border-2 border-red-600 text-red-600 px-5 py-2 text-sm hover:bg-red-50"
//             onClick={() => onSubmit("reject")}
//           >
//             Reject
//           </Button>
//           <Button className="rounded-full border-2 border-gray-500 text-gray-500 px-5 py-2 text-sm hover:bg-gray-100">
//             Chat With Employee
//           </Button>
//         </div>
//       </div>

//       <div className="flex w-full gap-5">
//         <div className="w-[70%] space-y-6">
//           <Header rating="4.5" userData={userData} refetch={refetch} />
//           <Experiences userData={userData} refetch={refetch} />
//           <Education
//             userData={userData}
//             refetch={refetch}
//             user={user}
//             isApplicant
//           />
//         </div>

//         <div className="w-[30%] ">
//           <AdditionalDetails
//             userData={userData}
//             refetch={refetch}
//             isApplicant
//           />
//           <RelevantSkillsCard userData={userData} />
//           <Documents
//             userData={userData}
//             refetch={refetch}
//             user={user}
//             isApplicant
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ApplicantDetails;
// import React from "react";
// import Header from "../../personalinfo/info/Header";
// import Experiences from "../../personalinfo/info/Experiences";
// import Education from "../../personalinfo/info/Education";
// import AdditionalDetails from "../../personalinfo/info/AdditionalDetails";
// import { Documents } from "../../personalinfo/info/Documents";
// import { ArrowLeft, ChevronDown } from "lucide-react";
// import Button from "../../../../components/ui/Button";
// import RelevantSkillsCard from "./RelevantSkillsCard";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import {
//   useGetApplicantsDetailsQuery,
//   useGetUserDetailsQuery,
// } from "../../../../services/authApiSlice";
// import Loading from "../../../../components/ui/Loading";
// import Spinner from "../../../../components/ui/Spinner";

// const ApplicantDetails = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { state } = useLocation();
//   console.log("state", state);
//   const user = { id: 270 };
//   // Fetch user details
//   const { data, isLoading, refetch } = useGetApplicantsDetailsQuery({
//     emp_id: id,
//     job_id: state?.row?.job_id,
//     current_lat,
//     current_long,
//   });
//   if (isLoading) {
//     return <Spinner />;
//   }
//   const userData = data || {};
//   return (
//     <section>
//       <div className="flex justify-between items-center mb-6">
//         {/* Left Section */}
//         <div className="flex items-center gap-5">
//           <Button onClick={() => navigate(-1)}>
//             <ArrowLeft size={35} strokeWidth={2} />
//           </Button>
//           <h1 className="text-xl font-semibold">Applicant Details</h1>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-3">
//           <Button className="rounded-full bg-dark text-white px-5 py-2 text-sm hover:bg-dark/90">
//             Hire Now
//           </Button>
//           <Button className="rounded-full border-2 border-red-600 text-red-600 px-5 py-2 text-sm hover:bg-red-50">
//             Reject
//           </Button>
//           <Button className="rounded-full border-2 border-gray-500 text-gray-500 px-5 py-2 text-sm hover:bg-gray-100">
//             Chat With Employee
//           </Button>
//           <Button className="rounded-full border-2 border-gray-400 flex items-center gap-2 px-2 py-2 text-sm hover:bg-gray-100">
//             <ChevronDown size={20} strokeWidth={2} />
//             More Action
//           </Button>
//         </div>
//       </div>
//       <div className="flex w-full gap-5">
//         <div className="w-[70%] space-y-6">
//           <Header
//             rating="4.5"
//             userData={userData}
//             refetch={refetch}
//             user={user}
//           />
//           <Experiences userData={userData} refetch={refetch} user={user} />
//           <Education
//             userData={userData}
//             refetch={refetch}
//             user={user}
//             isApplicant
//           />
//         </div>
//         <div className="w-[30%] ">
//           <AdditionalDetails
//             userData={userData}
//             refetch={refetch}
//             user={user}
//             isApplicant
//           />
//           <RelevantSkillsCard />
//           <Documents
//             userData={userData}
//             refetch={refetch}
//             user={user}
//             isApplicant
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ApplicantDetails;
