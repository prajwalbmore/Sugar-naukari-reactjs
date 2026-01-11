import React from "react";
import { useTranslation } from "react-i18next";

const BannerEnterprises = ({ data }) => {
  const { t } = useTranslation();
  return (
    <section
      className={`${
        t("Home") === "Accueil" ? "lg:max-h-80" : "lg:max-h-72"
      } px-6 lg:px-24 md:px-16 relative py-16`}
    >
      <div
        className={`w-full bg-appcolor rounded-3xl relative overflow-hidden min-h-[93vh] ${
          t("Home") === "Accueil"
            ? "lg:min-h-72 md:min-h-10"
            : "lg:min-h-64 md:min-h-10"
        }`}
      >
        {/* Background Shapes */}
        <img
          src="/assets/landingpage/Images/elips.png"
          className="absolute top-0 left-0 h-52"
          alt="ellipse shape"
        />
        <img
          src="/assets/landingpage/Images/elips2.png"
          className="absolute top-3 right-0 h-80 md:h-60"
          alt="ellipse shape"
        />

        {/* Content */}
        <div className="absolute -top-10 flex px-10 lg:py-16 w-full">
          <div className="lg:space-y-7 md:mt-3 mt-10 space-y-7 lg:max-w-[850px] md:max-w-md">
            <div className="space-y-3 lg:space-y-3">
              <h1 className="lg:text-3xl text-xl font-bold">
                {t("Ready to Hiring in Just Minutes?")}
              </h1>
              <p className="lg:text-xl text-sm font-bold">
                {t(
                  "Download the app now and create your account in 2-3 clicks"
                )}
              </p>

              {/* Mobile Dual Banner */}
              <img
                src="/assets/landingpage/Phones/home/DualBannerSM.png"
                className="sm:block md:hidden lg:hidden h-[380px]"
                alt="App preview mobile"
              />
            </div>

            {/* App Store Buttons */}
            <div className="flex gap-5 lg:justify-start md:justify-start justify-center">
              <img
                src="/assets/landingpage/Images/GooglePlayBlack.png"
                className="h-10 lg:h-12 cursor-pointer"
                alt="Google Play"
                onClick={() =>
                  window.open(data?.google_play_store_link, "_blank")
                }
              />
              <img
                src="/assets/landingpage/Images/AppStoreBlack.png"
                className="h-10 lg:h-12 cursor-pointer"
                alt="App Store"
                onClick={() => window.open(data?.ios_store_link, "_blank")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Phones */}
      <div className="lg:w-[30%] md:w-[40%] relative lg:-top-[400px] lg:left-[930px] hidden lg:block md:block md:-top-[286px] md:left-[440px]">
        <img
          src="/assets/landingpage/Phones/DualPhone.png"
          className="lg:h-[400px] h-72 w-full"
          alt="App preview right"
        />
      </div>
    </section>
  );
};

export default BannerEnterprises;

// import React from "react";

// const BannerEnterprises = () => {
//   return (
//     <section className="pt-40">
//       <div className="w-full bg-appcolor rounded-3xl relative overflow-hidden flex items-center px-10 py-8">
//         {/* Background Shapes */}
//         <img
//           src="/assets/landingpage/Images/elips.png"
//           className="absolute top-0 left-0 h-52"
//           alt="ellipse shape"
//         />
//         <img
//           src="/assets/landingpage/Images/elips2.png"
//           className="absolute top-3 right-0 h-[330px]"
//           alt="ellipse shape"
//         />

//         {/* Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-10 items-center relative z-10">
//           {/* Left Content */}
//           <div className="space-y-10">
//             <div className="space-y-3">
//               <h1 className="text-4xl font-bold">
//                 Ready to Hiring in Just Minutes?
//               </h1>
//               <p className="text-xl lg:text-2xl font-semibold">
//                 Download the app now and create your account in 2-3 clicks
//               </p>
//             </div>

//             {/* App Store Buttons */}
//             <div className="flex gap-5">
//               <img
//                 src="/assets/landingpage/Images/GooglePlayBlack.png"
//                 className="h-16 cursor-pointer"
//                 alt="Google Play"
//               />
//               <img
//                 src="/assets/landingpage/Images/AppStoreBlack.png"
//                 className="h-16 cursor-pointer"
//                 alt="App Store"
//               />
//             </div>
//           </div>

//           {/* Right Content (Phones Overlap) */}
//         </div>
//       </div>
//       <div className="relative ">
//         <img
//           src="/assets/landingpage/Phones/DualPhone.png"
//           className="h-[480px] object-contain absolute left-[750px] -top-[480px] z-20"
//           alt="App preview left"
//         />
//       </div>
//     </section>
//   );
// };

// export default BannerEnterprises;

// import React from "react";

// const BannerEnterprises = () => {
//   return (
//     <section className="min-h-screen">
//       <div className="w-full bg-appcolor rounded-3xl relative overflow-hidden min-h-[320px]">
//         <div className="flex justify-between">
//           <img
//             src="/assets/landingpage/Images/elips.png"
//             className="h-52"
//           />
//           <img
//             src="/assets/landingpage/Images/elips2.png"
//             className="h-80 mt-3"
//           />
//         </div>
//         <div className="absolute top-0 flex  px-10 py-16 ">
//           <div className=" space-y-10">
//             <div className="space-y-3">
//               <h1 className="text-4xl font-bold ">
//                 Ready to Hiring in Just Minutes?
//               </h1>
//               <p className="text-2xl font-bold">
//                 Download the app now and create your account in 2-3 clicks
//               </p>
//             </div>
//             <div className="flex gap-5">
//               <img
//                 src="/assets/landingpage/Images/GooglePlayBlack.png"
//                 className="h-16"
//               />
//               <img
//                 src="/assets/landingpage/Images/AppStoreBlack.png"
//                 className="h-16"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="relative z-50 -top-[550px] left-[670px]">
//         <img src="/assets/landingpage/Phones/DualPhone.png" className="h-[550px]"/>
//       </div>
//     </section>
//   );
// };

// export default BannerEnterprises;
