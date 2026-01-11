import React from "react";
import Badge from "../../components/ui/Badge";
import { useTranslation } from "react-i18next";

const BenefitsSectionAbout = () => {
  const { t } = useTranslation();
  const studentCards = [
    {
      title: "Real-Time Job Alerts",
      description:
        "Get notified instantly when a job that matches your profile is posted near you.",
      icon: "/assets/landingpage/businessBag.png",
    },
    {
      title: "Location-Based Matching",
      description:
        "Our geo-matching ensures that you only see relevant, nearby jobs.",
      icon: "/assets/landingpage/mapPin.png",
    },
    {
      title: "Secure Payouts",
      description: "Work tracked, payouts ensured directly through the app.",
      icon: "/assets/landingpage/Icons/Wallet.png",
    },
    {
      title: "Ratings & Reviews",
      description:
        "Students and employers can leave feedback to ensure accountability.",
      icon: "/assets/landingpage/starThumpsUp.png",
    },
  ];

  // ✅ Reusable Card Component
  const FeatureCard = ({ icon, title, description, t }) => (
    <div
      className="bg-white rounded-2xl px-6 py-8 space-y-4 shadow-md 
                 hover:bg-dark hover:text-appcolor transition-all duration-300 
                 transform hover:-translate-y-2 hover:shadow-xl"
    >
      <img src={icon} alt={title} className="h-14 w-14 sm:h-16 sm:w-16" />
      <h3 className="text-base sm:text-lg font-semibold">{t(title)}</h3>
      <p className="text-sm sm:text-base">{t(description)}</p>
    </div>
  );

  return (
    <section className="space-y-10 px-6 sm:px-10 md:px-16 lg:px-24">
      {/* Section Header */}
      <div className="text-center">
        <Badge text="Awesome Benefit From Us" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mt-4">
          {t("What Makes Us Different?")}
        </h2>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
        {studentCards.map((item, i) => (
          <FeatureCard key={i} {...item} t={t} />
        ))}
      </div>
    </section>
  );
};

export default BenefitsSectionAbout;
// import React from "react";
// import Badge from "../../components/ui/Badge";

// const BenefitsSectionAbout = () => {
//   const studentCards = [
//     {
//       title: "Real-Time Job Alerts",
//       description:
//         "Get notified instantly when a job that matches your profile is posted near you.",
//       icon: "/assets/landingpage/businessBag.png",
//     },
//     {
//       title: "Location-Based Matching",
//       description:
//         "Our geo-matching ensures that you only see relevant, nearby jobs.",
//       icon: "/assets/landingpage/mapPin.png",
//     },
//     {
//       title: "Secure Payouts",
//       description:
//         "Work tracked, payouts ensured directly through the app.",
//       icon: "/assets/landingpage/Icons/Wallet.png",
//     },
//     {
//       title: "Ratings & Reviews",
//       description:
//         "Students and employers can leave feedback to ensure accountability.",
//       icon: "/assets/landingpage/starThumpsUp.png",
//     },
//   ];
//   // ✅ Reusable Card Components
//   const FeatureCard = ({ icon, title, description }) => (
//     <div
//       className="bg-white rounded-2xl px-6 py-8 space-y-4 shadow-md
//                  hover:bg-dark hover:text-appcolor transition-all duration-300
//                  transform hover:-translate-y-2 hover:shadow-xl"
//     >
//       <img src={icon} alt={title} className="h-16 w-16" />
//       <h3 className="text-lg font-semibold">{title}</h3>
//       <p className="text-sm">{description}</p>
//     </div>
//   );
//   return (
//     <section className="space-y-10 px-24">
//       <div className="text-center">
//         <Badge text="Awesome Benefit From Us" />
//         <h2 className="text-5xl font-semibold mt-4">
//           What Makes Us Different?
//         </h2>
//       </div>

//       {/* Feature Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {studentCards.map((item, i) => (
//           <FeatureCard key={i} {...item} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default BenefitsSectionAbout;
