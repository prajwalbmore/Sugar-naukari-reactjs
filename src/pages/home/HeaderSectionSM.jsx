import React from "react";
import Badge from "../../components/ui/Badge";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeaderSectionSM = () => {
  const { t } = useTranslation();
  return (
    <section className="block sm:block md:hidden lg:hidden xl:hidden relative px-4 py-10">
      {/* Top Content */}
      <div className="space-y-8 text-center">
        <Badge
          text="Work Smarter. Earn Faster."
          icon={<ShieldCheck className="w-4 h-4" />}
          bgColor="bg-gray-200"
          textColor="text-black"
          padding="px-3 py-1"
          isHome
        />

        <h2 className="text-2xl font-black italic">
          {t("Fast, Flexible Jobs")}{" "}
          <span className="font-semibold not-italic">{t("for Students")}.</span>
        </h2>

        <h2 className="text-2xl font-semibold mt-2">
          <span className="text-[#594E1F]">{t("Instant Hiring")}</span> {t("for Businesses")}.
        </h2>

        <p className="text-base max-w-sm mx-auto mt-4">
          {t("Whether you're a student looking to earn or a business needing help,FastAff connects you in minutes")}.
        </p>

        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <Link
            to="/register"
            className="font-semibold bg-appcolor text-black px-5 py-2 rounded-full shadow hover:opacity-90"
          >
            {t("Contact Us")}
          </Link>
          <Link
            to="/register"
            className="font-semibold bg-dark text-white px-5 py-2 rounded-full shadow hover:opacity-90"
          >
            {t("Download App")}
          </Link>
        </div>
      </div>

      {/* Image + Cards */}
      <div className="flex mt-12 items-start">
        {/* Left Image */}
        <div className="flex-shrink-0">
          <img
            src="/assets/landingpage/Phones/AboutJoinUs.png"
            className="h-72 w-auto"
            alt="Preview"
          />
        </div>

        {/* Right Cards */}
      </div>
      {/* <div className="flex flex-col gap-4">
          {/* Jobs Completed 
          <div className="bg-white rounded-full w-52 px-3 py-2 flex items-center gap-2 shadow">
            <img
              src="/assets/landingpage/Icons/home/UpwardArrow.png"
              alt="Arrow Icon"
              className="h-4"
            />
            <span className="font-medium text-gray-800 text-sm">
              15,000+ Jobs Completed
            </span>
          </div>

          {/* 12k+ 
          <div className="bg-white rounded-full w-52 px-3 py-2 flex items-center gap-2 shadow">
            <div className="flex -space-x-2">
              <img
                src="/assets/landingpage/Images/avatar/Avatar1.png"
                alt="Avatar 1"
                className="h-8 w-8 rounded-full border-2 border-white"
              />
              <img
                src="/assets/landingpage/Images/avatar/Avatar2.png"
                alt="Avatar 2"
                className="h-8 w-8 rounded-full border-2 border-white"
              />
              <img
                src="/assets/landingpage/Images/avatar/Avatar3.png"
                alt="Avatar 3"
                className="h-8 w-8 rounded-full border-2 border-white"
              />
            </div>
            <img
              src="/assets/landingpage/Icons/home/love 1.png"
              alt="Love Icon"
              className="h-5 w-5 ml-2"
            />
            <span className="font-medium text-gray-800 ml-1">12k+</span>
          </div>

          {/* Employers Registered 
          <div className="bg-white rounded-3xl w-52 px-3 py-4 text-center shadow">
            <p className="text-sm">Employers Registered</p>
            <p className="text-xl font-bold">🏢 2,000+</p>
          </div>

          {/* Active Students 
          <div className="bg-white rounded-3xl w-52 px-3 py-4 shadow">
            <p className="text-sm">Active Students</p>
            <p className="text-xl font-bold">🎓 8,500+</p>
          </div>
        </div> */}
    </section>
  );
};

export default HeaderSectionSM;
// import React from "react";
// import Badge from "../../components/ui/Badge";
// import { ShieldCheck } from "lucide-react";
// import { Link } from "react-router-dom";

// const HeaderSectionSM = () => {
//   return (
//     <section className="block sm:block md:hidden lg:hidden xl:hidden">
//       <div className="space-y-10 sm:px-6 md:px-16 lg:px-24">
//         <div className="text-center mx-auto">
//           <Badge
//             text="Work Smarter. Earn Faster."
//             icon={<ShieldCheck className="w-4 h-4" />}
//             bgColor="bg-gray-200"
//             textColor="text-black"
//             padding="px-3 py-1"
//             isHome
//           />
//           <h2 className="text-4xl sm:text-xl md:text-6xl mt-6">
//             <span className="italic font-black">Fast, Flexible Jobs </span>
//             <span className="font-semibold">for Students.</span>
//           </h2>
//           <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mt-4">
//             <span className="text-[#594E1F]">Instant Hiring</span> for
//             Businesses.
//           </h2>
//           <p className="text-lg sm:text-xl max-w-xs mt-6 text-center mx-auto">
//             Whether you're a student looking to earn or a business needing help,
//             FastAff connects you in minutes.
//           </p>
//           <div className="flex justify-center gap-5 mt-6 flex-wrap">
//             <Link
//               to="/register"
//               className="font-semibold bg-appcolor text-black px-6 lg:px-10 py-3 rounded-full shadow hover:opacity-90"
//             >
//               Contact US
//             </Link>
//             <Link
//               to="/register"
//               className="font-semibold bg-dark text-white px-6 lg:px-10 py-3 rounded-full shadow hover:opacity-90"
//             >
//               Download App
//             </Link>
//           </div>
//         </div>
//       </div>
//       {/* Image */}
//       <div className="flex justify-center pt-20 relative">
//         <img
//           src="/assets/landingpage/Phones/AboutJoinUs.png"
//           className="lg:h-96 h-60"
//           alt="Preview"
//         />
//         <div
//           className="
//     absolute
//     -bottom-2 sm:-bottom-4 md:-bottom-6 lg:-bottom-2
//     left-0 w-full
//     h-20 md:h-56 lg:h-60
//     bg-gradient-to-t from-[#FCF6DF] to-transparent
//     pointer-events-none
//   "
//         ></div>
//       </div>
//       {/*    15,000+ Jobs Completed*/}
//       <div
//         className="
//     bottom-0  md:-bottom-20 lg:bottom-20
//     left-4 sm:left-8 md:left-32 lg:left-[370px]
//     -rotate-6 sm:-rotate-12 md:-rotate-6 lg:rotate-0
//     bg-white
//     rounded-full
//     w-56 sm:w-52 md:w-56 lg:w-[240px]
//     px-2 sm:px-3 md:px-4 py-2
//     flex items-center gap-2
//     shadow
//   "
//       >
//         {" "}
//         <img
//           src="/assets/landingpage/Icons/home/UpwardArrow.png"
//           alt="Arrow Icon"
//           className="h-4 lg:h-6"
//         />
//         <span className="font-medium text-gray-800 text-sm sm:text-base md:text-base lg:text-base">
//           15,000+ Jobs Completed
//         </span>
//       </div>
//       {/* 12k+ */}
//       <div className="  -bottom-[90px] left-[990px] bg-white rounded-full w-[220px]  pr-3 flex items-center gap-2 shadow">
//         <div className="flex -space-x-2">
//           <img
//             src="/assets/landingpage/Images/avatar/Avatar1.png"
//             alt="Avatar 1"
//             className="h-12 w-12 rounded-full border-2 border-white"
//           />
//           <img
//             src="/assets/landingpage/Images/avatar/Avatar2.png"
//             alt="Avatar 2"
//             className="h-12 w-12 rounded-full border-2 border-white"
//           />
//           <img
//             src="/assets/landingpage/Images/avatar/Avatar3.png"
//             alt="Avatar 3"
//             className="h-12 w-12 rounded-full border-2 border-white"
//           />
//         </div>
//         <img
//           src="/assets/landingpage/Icons/home/love 1.png"
//           alt="Love Icon"
//           className="h-6 w-6 ml-2"
//         />
//         <span className="font-medium text-gray-800 ml-1">12k+</span>
//       </div>
//       {/*  Employers Registered*/}
//       <div className=" -bottom-[0px] left-[1060px] bg-white rounded-3xl w-[240px] px-2 py-5 text-center shadow space-y-3 ">
//         <p className="text-xl">Employers Registered</p>
//         <p className="text-3xl font-bold">🏢 2,000+</p>
//       </div>
//       {/*  Active Students*/}
//       <div className=" -bottom-[100px] left-[480px] bg-white rounded-3xl w-[220px] px-4 py-4 shadow space-y-3  -rotate-6">
//         <p className="text-xl">Active Students</p>
//         <p className="text-3xl font-bold">🎓 8,500+</p>
//         <div className="flex text-xl ">
//           <img
//             src="/assets/landingpage/Icons/home/ZicZacArrow.png"
//             className="h-6 w-6 mr-2"
//             alt="Arrow"
//           />
//           <span>234.45%</span>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeaderSectionSM;
