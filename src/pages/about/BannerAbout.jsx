import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const BannerAbout = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-[#FFF5CC] px-4 pt-10 pb-20">
      <div className="lg:pt-40 md:pt-20 pt-10 lg:mx-24 md:mx-10 mx-2">
        <div className="w-full bg-[#FFFCEE] rounded-3xl relative overflow-hidden flex items-center px-6 lg:px-10 py-8">
          {/* Background Shapes */}
          <img
            src="/assets/landingpage/Images/Aboutelips2.png"
            className="absolute top-0 left-0 h-40 md:h-52"
            alt="ellipse shape"
          />
          <img
            src="/assets/landingpage/Images/Aboutelips.png"
            className="absolute top-3 right-0 h-60 lg:h-[330px] hidden lg:block"
            alt="ellipse shape"
          />

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-center relative z-10">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-10 text-center lg:text-left">
              <div className="space-y-4 md:space-y-7 mt-4">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
                  {t("Find Work. Hire Fast. Grow Together.")}
                </h1>
                <p className="text-sm md:text-base lg:text-lg">
                  {t(
                    "Join thousands of jobseekers and employers building a smarter, faster, and more flexible way to work."
                  )}
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex justify-center lg:justify-start">
                <Link
                  to="/register"
                  className="font-semibold bg-dark text-white px-6 md:px-8 lg:px-10 py-3 rounded-full shadow hover:opacity-90 text-sm md:text-base"
                >
                  {t("Sign Up and Start Earning")}
                </Link>
              </div>
            </div>

            {/* Right Content - Phones */}
            <div className="mt-10 lg:mt-0 flex justify-center lg:justify-end">
              {/* For sm/md show inline */}
              <img
                src="/assets/landingpage/Phones/AboutJoinUs.png"
                className="h-64 md:h-80 lg:hidden block object-contain"
                alt="App preview small"
              />
            </div>
          </div>
        </div>

        {/* For lg absolute positioning */}
        <div className="relative hidden lg:block">
          <img
            src="/assets/landingpage/Phones/AboutJoinUs.png"
            className="h-[400px] object-contain absolute left-[820px] -top-[400px] z-20"
            alt="App preview large"
          />
        </div>
      </div>
    </section>
  );
};

export default BannerAbout;

// import React from "react";
// import { Link } from "react-router-dom";

// const BannerAbout = () => {
//   return (
//     <section className="bg-[#FFF5CC] pt-10 pb-20">
//       <div className="pt-40 mx-24">
//         <div className="w-full bg-[#FFFCEE] rounded-3xl relative overflow-hidden flex items-center px-10 py-8">
//           {/* Background Shapes */}
//           <img
//             src="/assets/landingpage/Images/Aboutelips2.png"
//             className="absolute top-0 left-0 h-52"
//             alt="ellipse shape"
//           />
//           <img
//             src="/assets/landingpage/Images/Aboutelips.png"
//             className="absolute top-3 right-0 h-[330px]"
//             alt="ellipse shape"
//           />

//           {/* Content */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-center relative z-10">
//             {/* Left Content */}
//             <div className="space-y-10">
//               <div className="space-y-7 mt-4">
//                 <h1 className="text-3xl font-bold">
//                   Find Work. Hire Fast. Grow Together.
//                 </h1>
//                 <p className="text-lg">
//                   Join thousands of jobseekers and employers building a smarter,
//                   faster, and more flexible way to work.
//                 </p>
//               </div>

//               {/* App Store Buttons */}
//               <div className="flex gap-5">
//                 <Link
//                   to="/register"
//                   className="font-semibold bg-dark text-white px-6 lg:px-10 py-3 rounded-full shadow hover:opacity-90"
//                 >
//                   Sign Up and Start Earning
//                 </Link>
//               </div>
//             </div>

//             {/* Right Content (Phones Overlap) */}
//           </div>
//         </div>
//         <div className="relative ">
//           <img
//             src="/assets/landingpage/Phones/AboutJoinUs.png"
//             className="h-[400px] object-contain absolute lg:left-[820px] -top-[400px] z-20"
//             alt="App preview left"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BannerAbout;
