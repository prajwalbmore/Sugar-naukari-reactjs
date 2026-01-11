import React from "react";
import Badge from "../../components/ui/Badge";
import { useTranslation } from "react-i18next";

const CoreValues = () => {
  const { t } = useTranslation();
  const cardData = [
    {
      title: "Trust & Transparency",
      description:
        "We believe in being open and honest with our users – from job listings to support. No hidden fees, no false promises – just real work, real people.",
      icon: "/assets/landingpage/Icons/CheckSheild.png",
    },
    {
      title: "Simplicity & Speed",
      description:
        "Every second matters when you’re looking for a job. Our platform is designed to make the process fast, easy, stress-free from profile creation to job application.",
      icon: "/assets/landingpage/Icons/Thunder.png",
    },
    {
      title: "Empowerment through Work",
      description:
        "We don’t just offer jobs – we offer dignity, purpose, and the chance to move forward. Every gig is a step toward personal and financial growth.",
      icon: "/assets/landingpage/Icons/CloseFist.png",
    },
    {
      title: "Communication & Support",
      description:
        "We evolve as our users do. We constantly improve our platform, learn from feedback, and stay updated to meet your changing needs.",
      icon: "/assets/landingpage/Icons/ChatIcon.png",
    },
  ];

  return (
    <section className="space-y-10 px-6 sm:px-10 md:px-16 lg:px-24">
      <div className="text-center">
        <Badge text="Why choose us" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-4">
          {t("Our Core Values")}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
        {cardData.map((item, index) => (
          <div
            key={index}
            className="border-2 border-appcolor text-center rounded-xl p-6 shadow-sm hover:shadow-lg transition-all"
          >
            {/* Icon */}
            <div className="mx-auto rounded-lg flex items-center justify-center w-16 h-16 mb-4">
              <img
                src={item.icon}
                alt={`${item.title} Icon`}
                className="h-14 w-14 object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold mb-2">
              {t(item.title)}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#706183]">
              {t(item.description)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreValues;
// import React from "react";
// import Badge from "../../components/ui/Badge";

// const CoreValues = () => {
//   const cardData = [
//     {
//       title: "Trust & Transparency",
//       description:
//         "We believe in being open and honest with our users – from job listings to support. No hidden fees, no false promises – just real work, real people.",
//       icon: "/assets/landingpage/Icons/CheckSheild.png",
//     },
//     {
//       title: "Simplicity & Speed",
//       description:
//         "Every second matters when you’re looking for a job. Our platform is designed to make the process fast, easy, stress-free from profile creation to job application.",
//       icon: "/assets/landingpage/Icons/Thunder.png",
//     },
//     {
//       title: "Empowerment through Work",
//       description:
//         "We don’t just offer jobs – we offer dignity, purpose, and the chance to move forward. Every gig is a step toward personal and financial growth.",
//       icon: "/assets/landingpage/Icons/CloseFist.png",
//     },
//     {
//       title: "Communication & Support",
//       description:
//         "We evolve as our users do. We constantly improve our platform, learn from feedback, and stay updated to meet your changing needs.",
//       icon: "/assets/landingpage/Icons/ChatIcon.png",
//     },
//   ];
//   return (
//     <section className="space-y-10 px-24">
//       <div className="text-center">
//         <Badge text="Why choose us" />
//         <h2 className="text-4xl font-semibold mt-4">Our Core Values </h2>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-6">
//         {cardData.map((item, index) => (
//           <div
//             key={index}
//             className="border-2 border-appcolor text-center rounded-xl p-6 shadow-sm hover:shadow-lg transition-all "
//           >
//             {/* Icon */}
//             <div className=" mx-auto rounded-lg flex items-center justify-center w-16 h-16 mb-4 ">
//               <img
//                 src={item.icon}
//                 alt={`${item.title} Icon`}
//                 className="h-14 w-14 object-contain"
//               />
//             </div>

//             {/* Title */}
//             <h3 className="text-xl font-bold mb-2">{item.title}</h3>

//             {/* Description */}
//             <p className="text-sm text-[#706183]">{item.description}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CoreValues;
