import {
  BanknotesIcon,
  BellIcon,
  CheckCircleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const EmployeeHome = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();
  const steps = [
    {
      title: "Create Your Profile",
      description:
        "Add your skills, interests, preferred job types, and availability.",
      icon: UserIcon,
      selectStep: "/assets/landingpage/Phones/home/tab1.png",
    },
    {
      title: "Get Real-Time Job Alerts",
      description:
        "Get instantly notified when relevant jobs are posted nearby.",
      icon: BellIcon,
      selectStep: "/assets/landingpage/Phones/home/tab2.png",
    },
    {
      title: "Apply & Get Hired",
      description:
        "Browse, apply with one click, and get hired based on your profile match and ratings.",
      icon: CheckCircleIcon,
      selectStep: "/assets/landingpage/Phones/home/tab3.png",
    },
    {
      title: "Complete Job & Get Paid Securely",
      description:
        "After the job is done, receive your payment directly via the app quickly and safely.",
      icon: BanknotesIcon,
      selectStep: "/assets/landingpage/Phones/home/tab4.png",
    },
  ];

  const activeStep = steps[activeIndex];

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 lg:px-24 space-y-20 lg:space-y-10 block ">
      <div className="container mx-auto flex flex-col lg:flex-row justify-center gap-8 lg:gap-0">
        {/* Left Side (Steps) */}
        <div className="order-1 lg:order-1 flex-1 space-y-6 px-0 md:px-4 lg:px-10  mb-10 lg:mb-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            {t("How It Works here.")}
          </h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            {t("For")} <span className="italic font-bold">{t("Employee")}</span>
          </h2>
          <p className="text-gray-600 max-w-md text-base sm:text-lg">
            {t("With FastAff, daily wage jobs are just a few taps away. No long forms. No waiting.")}
          </p>

          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeIndex;
              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    isActive ? "bg-lightYellow shadow-xl scale-[1.03]" : ""
                  }`}
                >
                  <div
                    className={`p-2 sm:p-3 rounded-lg transition-colors duration-200 ${
                      isActive ? "bg-appcolor" : "bg-[#FCF6DF]"
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 sm:h-8 sm:w-8 transition-colors duration-200 ${
                        isActive ? "text-dark" : "text-appcolor"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">
                      {t(step.title)}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      {t(step.description)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side (Image) */}
        <div className="order-2 lg:order-2 flex-1 flex justify-center items-end relative mb-8 lg:mb-0 ">
          <div className="relative bg-lightYellow h-52 w-60 sm:h-72 sm:w-10 md:h-[350px] md:w-[400px] lg:h-[430px] lg:w-[480px] rounded-xl overflow-hidden"></div>
          <img
            src={activeStep.selectStep}
            alt={activeStep.title}
            className="object-contain h-60 sm:h-80 md:h-[350px] lg:h-[600px] w-auto absolute lg:top-[48px] bottom-0 left-1/2 -translate-x-1/2"
          />
        </div>
      </div>
    </section>
  );
};

export default EmployeeHome;

// import {
//   BanknotesIcon,
//   BellIcon,
//   CheckCircleIcon,
//   UserIcon,
// } from "@heroicons/react/24/solid";
// import React, { useState } from "react";

// const EmployeeHome = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const steps = [
//     {
//       title: "Create Your Profile",
//       description:
//         "Add your skills, interests, preferred job types, and availability.",
//       icon: UserIcon,
//       selectStep: "/assets/landingpage/Phones/HomeCategory1.png",
//     },
//     {
//       title: "Get Real-Time Job Alerts",
//       description:
//         "Get instantly notified when relevant jobs are posted nearby.",
//       icon: BellIcon,
//       selectStep: "/assets/landingpage/Phones/HomeCategory1.png",
//     },
//     {
//       title: "Apply & Get Hired",
//       description:
//         "Browse, apply with one click, and get hired based on your profile match and ratings.",
//       icon: CheckCircleIcon,
//       selectStep: "/assets/landingpage/Phones/HomeCategory1.png",
//     },
//     {
//       title: "Complete Job & Get Paid Securely",
//       description:
//         "After the job is done, receive your payment directly via the app quickly and safely.",
//       icon: BanknotesIcon,
//       selectStep: "/assets/landingpage/Phones/HomeCategory1.png",
//     },
//   ];

//   const activeStep = steps[activeIndex];

//   return (
//     <section className="space-y-10 px-24 hidden ">
//       <div className="container mx-auto flex flex-col lg:flex-row justify-center ">
//         {/* Left Side */}
//         <div className="flex-1 space-y-6 px-4 lg:px-10">
//           <h2 className="text-4xl ">How It Works here.</h2>
//           <h2 className="text-4xl ">
//             For <span className="italic font-bold">Employee</span>
//           </h2>
//           <p className="text-gray-600 max-w-md">
//             With FastAff, daily wage jobs are just a few taps away. No long
//             forms. No waiting.
//           </p>

//           <div className="space-y-4">
//             {steps.map((step, index) => {
//               const Icon = step.icon;
//               const isActive = index === activeIndex;
//               return (
//                 <div
//                   key={index}
//                   onClick={() => setActiveIndex(index)}
//                   className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
//                     isActive ? "bg-lightYellow shadow-xl scale-105" : ""
//                   }`}
//                 >
//                   <div
//                     className={`p-3 rounded-lg transition-colors duration-200 ${
//                       isActive ? "bg-appcolor" : "bg-[#FCF6DF]"
//                     }`}
//                   >
//                     <Icon
//                       className={`h-8 w-8 transition-colors duration-200 ${
//                         isActive ? "text-dark" : "text-appcolor"
//                       }`}
//                     />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold">{step.title}</h3>
//                     <p className="text-sm text-gray-600">{step.description}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="flex-1 flex justify-center items-end relative">
//           <div className="relative bg-lightYellow h-[430px] w-[480px] rounded-xl overflow-hidden"></div>
//           <img
//             src={activeStep.selectStep}
//             alt={activeStep.title}
//             className="object-contain h-[600px] absolute top-[13px]"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EmployeeHome;
