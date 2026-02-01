import {
  CalendarDateRangeIcon,
  EnvelopeIcon,
  LanguageIcon,
  MapPinIcon,
  PencilSquareIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import Button from "../../../../components/ui/Button";

const AdditionalDetails = ({
  userData,
  refetch,
  user,
  setActive,
  isApplicant = false,
  t,
}) => {
  const info = userData?.data || {};
  const details = [
    { label: "Email", value: info.email, icon: EnvelopeIcon },
    { label: "Location", value: info.preferredLocation, icon: MapPinIcon },
    { label: "Phone Number", value: info.mobile, icon: PhoneIcon },
    {
      label: "Date of Birth",
      value: info.date_of_birth,
      icon: CalendarDateRangeIcon,
    },
    {
      label: "Languages",
      value: Array.isArray(info.languages)
        ? info.languages.map((lang) => lang).join(", ")
        : info.languages || "-",
      icon: LanguageIcon,
    },
    {
      label: "Gender",
      value: info?.gender?.charAt(0).toUpperCase() + info?.gender?.slice(1),
      icon: UserIcon,
    },
  ];

  return (
    <div className="border border-gray-300 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg sm:text-xl font-semibold">
          {t("Additional Details")}
        </h3>
        {!isApplicant && (
          <Button
            className="bg-dark rounded-full p-2 sm:p-3"
            onClick={() => setActive(1)}
            aria-label={t("Edit Additional Details")}
          >
            <PencilSquareIcon className="text-white h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        )}
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 gap-4">
        {details.map(({ label, value, icon: Icon }, idx) => (
          <div key={idx} className="flex items-start sm:items-center gap-3">
            {Icon && (
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0" />
            )}
            <div className="min-w-0">
              <p className="text-sm sm:text-base text-gray-500">{t(label)}</p>
              <p className="text-gray-800 break-words">{value || "-"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdditionalDetails;

// import {
//   CalendarDateRangeIcon,
//   EnvelopeIcon,
//   LanguageIcon,
//   MapPinIcon,
//   PencilSquareIcon,
//   PhoneIcon,
//   UserIcon,
// } from "@heroicons/react/24/outline";
// import React from "react";
// import Button from "../../../../components/ui/Button";

// const AdditionalDetails = ({
//   userData,
//   refetch,
//   user,
//   setActive,
//   isApplicant = false,
// }) => {
//   const info = userData?.data || {};
//   const details = [
//     { label: "Email", value: info.email, icon: EnvelopeIcon },
//     { label: "Location", value: info.mobile_number, icon: MapPinIcon },
//     { label: "Phone Number", value: info.mobile_number, icon: PhoneIcon },
//     {
//       label: "Date of Birth",
//       value: info.date_of_birth,
//       icon: CalendarDateRangeIcon,
//     },
//     {
//       label: "Languages",
//       value: info.languages.map((lang) => lang.lang).join(","),
//       icon: LanguageIcon,
//     },
//     { label: "Gender", value: info.gender, icon: UserIcon },
//   ];
//   return (
//     <div className="border border-gray-300 rounded-2xl p-6 shadow-sm space-y-4 bg-white">
//       <div className="flex justify-between">
//         <h3 className="text-lg font-semibold">Additional Details</h3>
//         {!isApplicant && (
//           <Button
//             className="bg-dark rounded-full p-2"
//             onClick={() => setActive(1)}
//           >
//             <PencilSquareIcon className="text-white h-5 w-5" />
//           </Button>
//         )}
//       </div>
//       <div className="space-y-4">
//         {details.map((detail, index) => {
//           const Icon = detail.icon;
//           return (
//             <div key={index} className="flex items-center space-x-4">
//               {Icon && <Icon className="w-5 h-5 text-gray-400 flex-shrink-0" />}
//               <div>
//                 <p className="text-sm text-gray-500">{detail.label}</p>
//                 <p className="text-gray-800">{detail.value}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default AdditionalDetails;
