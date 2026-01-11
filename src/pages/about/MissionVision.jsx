import React from "react";
import Badge from "../../components/ui/Badge";
import { useTranslation } from "react-i18next";

const MissionVision = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-appcolor py-4 lg:py-14 min-h-64  lg:min-h-screen md:min-h-80 ">
      <div className="px-2 md:px-12 lg:mx-24 space-y-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-2">
          <div>
            <Badge text="Our Mission & Vision" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4">
              {t("Built to Empower, Designed for Impact")}
            </h2>
          </div>
          <div className="lg:w-1/3 text-sm sm:text-base md:text-md font-semibold">
            {t(
              "Our platform was born from the growing need for reliable, fast, and fair job access for part-time and hourly workers—especially students and blue-collar talent. At the same time, we saw small and medium businesses struggling to find trustworthy candidates quickly. We created a solution to bridge that gap."
            )}
          </div>
        </div>
        {/* Mission */}
        <div className="hidden sm:hidden md:flex bg-black flex-col md:flex-row justify-between items-center px-6 sm:px-10 rounded-2xl gap-6">
          <div className="text-appcolor text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              {t("Mission")}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl font-semibold">
              {t(
                "To simplify job discovery and hiring through a transparent, trustworthy platform."
              )}
            </p>
          </div>
          <img
            src="/assets/landingpage/Images/PinArrow.png"
            alt="Mission illustration"
            className="h-40 sm:h-48 lg:h-56 w-auto"
          />
        </div>
        {/* sm */}
        <div className="block md:hidden lg:hidden bg-black flex justify-between rounded-md px-5">
          {" "}
          <div className="text-appcolor w-[60%] ">
            <h2 className="text-lg font-bold mb-2 mt-2">{t("Mission")}</h2>
            <p className="text-xs ">
              {t(
                "To simplify job discovery and hiring through a transparent, trustworthy platform."
              )}
            </p>
          </div>
          <img
            src="/assets/landingpage/Images/PinArrow.png"
            alt="Mission illustration"
            className="h-28 w-auto"
          />
        </div>
        {/* Vision */}
        <div className="hidden sm:hidden md:flex bg-footer flex justify-between items-center px-12  rounded-2xl flex-col md:flex-row sm:px-10 gap-6">
          <img
            src="/assets/landingpage/Images/Mooneye.png"
            alt="Vision illustration"
            className="h-40 sm:h-48 lg:h-56 w-auto order-1 md:order-none"
          />
          <div className="text-center md:text-right md:mr-5 max-w-xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Vision
            </h2>
            <p className="text-base sm:text-lg lg:text-xl font-semibold text-[#706183]">
              {t(
                "To build a world where everyone—regardless of background—can access work opportunities instantly and securely."
              )}
            </p>
          </div>
        </div>

        {/* SM */}
        <div className=" block md:hidden lg:hidden bg-footer flex justify-between rounded-md px-5">
          <img
            src="/assets/landingpage/Images/Mooneye.png"
            alt="Vision illustration"
            className="h-28 w-auto"
          />
          <div className="text-appcolor w-[60%] ">
            <h2 className="text-lg font-bold mb-2 mt-2">{t("Vision")}</h2>
            <p className="text-xs  text-[#706183]">
              {t(
                "To build a world where everyone—regardless of background—can access work opportunities instantly and securely."
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;

// import React from "react";
// import Badge from "../../components/ui/Badge";

// const MissionVision = () => {
//   return (
//     <section className="bg-appcolor py-14 min-h-screen md:min-h-80">
//       <div className="px-2 md:px-12 lg:mx-24 space-y-10">
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-2">
//           <div>
//             <Badge text="Our Mission & Vision" />
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4">
//               Built to Empower, Designed for Impact
//             </h2>
//           </div>
//           <div className="lg:w-1/3 text-sm sm:text-base md:text-md font-semibold">
//             Our platform was born from the growing need for reliable, fast, and
//             fair job access for part-time and hourly workers—especially students
//             and blue-collar talent. At the same time, we saw small and medium
//             businesses struggling to find trustworthy candidates quickly. We
//             created a solution to bridge that gap.
//           </div>
//         </div>
//         {/* Mission */}
//         {/* <div className="hidden sm:hidden md:flex bg-black flex-col md:flex-row justify-between items-center px-6 sm:px-10 rounded-2xl gap-6">
//           <div className="text-appcolor text-center md:text-left">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
//               Mission
//             </h2>
//             <p className="text-base sm:text-lg lg:text-xl font-semibold">
//               To simplify job discovery and hiring through a transparent,
//               trustworthy platform.
//             </p>
//           </div>
//           <img
//             src="/assets/landingpage/Images/PinArrow.png"
//             alt="Mission illustration"
//             className="h-40 sm:h-48 lg:h-56 w-auto"
//           />
//         </div> */}
//         {/* sm */}
//         <div className="block md:hidden lg:hidden bg-black flex justify-between rounded-md px-5">
//           {" "}
//           <div className="text-appcolor w-[60%] ">
//             <h2 className="text-lg font-bold mb-2 mt-2">Mission</h2>
//             <p className="text-xs ">
//               To simplify job discovery and hiring through a transparent,
//               trustworthy platform.
//             </p>
//           </div>
//           <img
//             src="/assets/landingpage/Images/PinArrow.png"
//             alt="Mission illustration"
//             className="h-28 w-auto"
//           />
//         </div>
//         {/* Vision */}
//         <div className="hidden sm:hidden md:flex bg-black flex-col md:flex-row justify-between items-center px-6 sm:px-10 rounded-2xl gap-6">
//           <img
//             src="/assets/landingpage/Images/Mooneye.png"
//             alt="Vision illustration"
//             className="h-40 sm:h-48 lg:h-56 w-auto order-1 md:order-none"
//           />
//           <div className="text-center md:text-right md:mr-5 max-w-xl">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
//               Vision
//             </h2>
//             <p className="text-base sm:text-lg lg:text-xl font-semibold text-[#706183]">
//               To build a world where everyone—regardless of background—can
//               access work opportunities instantly and securely.
//             </p>
//           </div>
//         </div>
//         {/* <div className="block md:hidden lg:hidden bg-black flex justify-between rounded-md px-5">
//           <img
//             src="/assets/landingpage/Images/Mooneye.png"
//             alt="Vision illustration"
//             className="h-40 sm:h-48 lg:h-56 w-auto order-1 md:order-none"
//           />
//           <div className="text-center md:text-right md:mr-5 max-w-xl">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
//               Vision
//             </h2>
//             <p className="text-base sm:text-lg lg:text-xl font-semibold text-[#706183]">
//               To build a world where everyone—regardless of background—can
//               access work opportunities instantly and securely.
//             </p>
//           </div>
//         </div> */}
//       </div>
//     </section>
//   );
// };

// export default MissionVision;
// ----------------------------------------------------

// import React from "react";
// import Badge from "../../components/ui/Badge";

// const MissionVision = () => {
//   return (
//     <section className="bg-appcolor py-14 min-h-screen">
//       <div className="mx-24 space-y-10">
//         <div className="flex justify-between gap-2 ">
//           <div className="">
//             <Badge text="Our Mission & Vision" />
//             <h2 className="text-4xl font-bold mt-4">
//               Built to Empower, Designed for Impact
//             </h2>
//           </div>
//           <div className="w-1/3 text-md font-semibold">
//             Our platform was born from the growing need for reliable, fast, and
//             fair job access for part-time and hourly workers—especially students
//             and blue-collar talent. At the same time, we saw small and medium
//             businesses struggling to find trustworthy candidates quickly. We
//             created a solution to bridge that gap.
//           </div>
//         </div>

//         {/* section 1 */}
//         <div className="bg-black flex justify-between items-center px-12  rounded-2xl">
//           <div className="text-appcolor ">
//             <h2 className="text-4xl font-bold mb-4">Mission</h2>
//             <p className="text-xl font-semibold">
//               To simplify job discovery and hiring through a transparent,
//               trustworthy platform.
//             </p>
//           </div>
//           <img
//             src="/assets/landingpage/Images/PinArrow.png"
//             alt="Mission illustration"
//             className="h-56 w-auto"
//           />
//         </div>

//         {/* section 2 */}
//         <div className="bg-footer flex justify-between items-center px-12  rounded-2xl">
//           <img
//             src="/assets/landingpage/Images/Mooneye.png"
//             alt="Mission illustration"
//             className="h-56 w-auto"
//           />
//           <div className="text-right mr-5 max-w-xl">
//             <h2 className="text-4xl font-bold mb-4">Vission</h2>
//             <p className="text-xl font-semibold text-[#706183]">
//               To build a world where everyone—regardless of background can
//               access work opportunities instantly and securely.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MissionVision;
