import React, { useState } from "react";
import Button from "../../../../components/ui/Button";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const Education = ({
  userData,
  refetch,
  user,
  setActive,
  isApplicant = false,
  t,
}) => {
  const [showAll, setShowAll] = useState(false);

  const educationsData = userData?.data?.education || []; // fallback to empty array

  const displayedEducations = showAll
    ? educationsData
    : educationsData.slice(0, 2);

  return (
    <div className="border border-gray-300 rounded-2xl p-6 shadow-sm space-y-4 bg-white">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{t("Education")}</h3>
        {!isApplicant && (
          <Button
            className="bg-dark rounded-full p-2"
            onClick={() => setActive(2)}
          >
            <PencilSquareIcon className="text-white h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="space-y-4 transition-all duration-500 ease-in-out overflow-hidden">
        {displayedEducations.map((edu) => (
          <div
            key={edu.id}
            className="p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 ease-in-out"
          >
            <h4 className="font-bold text-gray-800">{edu.institution}</h4>
            <p className="text-sm text-gray-600">{edu.degree}</p>
            <p className="text-sm text-gray-500">{edu.graduation_year}</p>
            <p className="text-sm text-gray-500">{edu.location}</p>
          </div>
        ))}
      </div>

      {educationsData.length > 2 && (
        <div className="flex justify-center items-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="font-semibold hover:underline transition-colors duration-300 ease-in-out"
          >
            {showAll
              ? t("Show less")
              : `${t("Show")} ${educationsData.length - 2} ${t(
                  "more education"
                )}${educationsData.length - 2 > 1 ? "s" : ""}`}
          </button>
        </div>
      )}
    </div>
  );
};

export default Education;
// import React, { useState } from "react";
// import Button from "../../../../components/ui/Button";
// import { PencilSquareIcon } from "@heroicons/react/24/outline";

// const educations = [
//   {
//     id: 1,
//     school: "Harvard University",
//     degree: "Postgraduate degree, Applied Psychology",
//     period: "2010 – 2012",
//   },
//   {
//     id: 2,
//     school: "University of Toronto",
//     degree: "Bachelor of Arts, Visual Communication",
//     period: "2005 – 2009",
//   },
//   {
//     id: 3,
//     school: "Stanford University",
//     degree: "Certificate, Human-Computer Interaction",
//     period: "2013 – 2014",
//   },
//   {
//     id: 4,
//     school: "MIT",
//     degree: "Short Course, Design Thinking",
//     period: "2015",
//   },
// ];

// const Education = ({ userData, refetch, user, setActive }) => {
//   const [showAll, setShowAll] = useState(false);
//   const educationsData = userData?.data?.educations;
//   // console.log("educationsData", educationsData);

//   const displayedEducations = showAll
//     ? educationsData
//     : educationsData.slice(0, 2);

//   return (
//     <div className="border border-gray-300 rounded-2xl p-6 shadow-sm space-y-4 bg-white">
//       <div className="flex justify-between">
//         <h3 className="text-lg font-semibold">Educations</h3>
//         <Button
//           className="bg-dark rounded-full p-2"
//           onClick={() => setActive(2)}
//         >
//           <PencilSquareIcon className="text-white h-5 w-5" />
//         </Button>
//       </div>
//       <div className="space-y-4 transition-all duration-500 ease-in-out overflow-hidden">
//         {displayedEducations.map((edu) => (
//           <div
//             key={edu.id}
//             className="p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 ease-in-out"
//           >
//             <h4 className="font-bold text-gray-800">{edu.institution}</h4>
//             <p className="text-sm text-gray-600">{edu.degree}</p>
//             <p className="text-sm text-gray-500">{edu.graduation_year}</p>
//             <p className="text-sm text-gray-500">{edu.location}</p>
//           </div>
//         ))}
//       </div>
//       {educations.length > 2 && (
//         <div className="flex justify-center items-center">
//           <button
//             onClick={() => setShowAll(!showAll)}
//             className="font-semibold hover:underline transition-colors duration-300 ease-in-out"
//           >
//             {showAll
//               ? "Show less"
//               : `Show ${educations.length - 2} more educations`}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Education;
