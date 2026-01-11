import React from "react";
import Badge from "../../components/ui/Badge";
import { useTranslation } from "react-i18next";

const FeatureSectionEnterprises = () => {
  const { t } = useTranslation();
  const studentCards = [
    {
      title: "Instant Access to Local Talent",
      description:
        "Quickly connect with nearby students ready to work, reducing hiring time",
      icon: "/assets/landingpage/Icons/mapPin.png",
    },
    {
      title: "Simple & Fast Job Posting",
      description:
        "Publish jobs with clear criteria in minutes—no lengthy process",
      icon: "/assets/landingpage/Icons/Clock.png",
    },
    {
      title: "Flexible Workforce",
      description: "Hire students with adaptable schedules to match your needs",
      icon: "/assets/landingpage/Icons/Shuffle.png",
    },
    {
      title: "Trusted Quality",
      description: "Two-way reviews ensure reliable, high-quality matches",
      icon: "/assets/landingpage/Icons/starThumpsUp.png",
    },
    {
      title: "Cost-Effective Hiring",
      description: "Save on ads and admin—monthly billing includes all charges",
      icon: "/assets/landingpage/Icons/Wallet.png",
    },
  ];

  const FeatureCard = ({ icon, title, description, t }) => (
    <div
      className="bg-white rounded-2xl px-6 py-8 space-y-4 shadow-md 
                 hover:bg-dark hover:text-appcolor transition-all duration-300 
                 transform hover:-translate-y-2 hover:shadow-xl"
    >
      <img src={icon} alt={title} className="h-16 w-16" />
      <h3 className="text-lg font-semibold">{t(title)}</h3>
      <p className="text-sm">{t(description)}</p>
    </div>
  );

  return (
    <section className="space-y-10 px-6 lg:px-24 md:px-16">
      <div className="text-center">
        <Badge text="Why Choose Fastaff" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mt-4">
          {t("What advantage will you have?")}
        </h2>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {studentCards.map((item, i) => (
          <FeatureCard key={i} {...item} t={t} />
        ))}
      </div>
    </section>
  );
};

export default FeatureSectionEnterprises;
// import React from "react";
// import Badge from "../../components/ui/Badge";

// const FeatureSectionEnterprises = () => {
//   const studentCards = [
//     {
//       title: "Instant Access to Local Talent",
//       description:
//         "Quickly connect with nearby students ready to work, reducing hiring time",
//       icon: "/assets/landingpage/Icons/mapPin.png",
//     },
//     {
//       title: "Simple & Fast Job Posting",
//       description:
//         "Publish jobs with clear criteria in minutes—no lengthy process",
//       icon: "/assets/landingpage/Icons/Clock.png",
//     },
//     {
//       title: "Flexible Workforce",
//       description: "Hire students with adaptable schedules to match your needs",
//       icon: "/assets/landingpage/Icons/Shuffle.png",
//     },
//     {
//       title: "Trusted Quality",
//       description: "Two-way reviews ensure reliable, high-quality matches",
//       icon: "/assets/landingpage/Icons/starThumpsUp.png",
//     },
//     {
//       title: "Cost-Effective Hiring",
//       description: "Save on ads and admin—monthly billing includes all charges",
//       icon: "/assets/landingpage/Icons/Wallet.png",
//     },
//   ];
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
//     <section className="space-y-10">
//       <div className="text-center">
//         <Badge text="Why Choose Fastaff" />
//         <h2 className="text-5xl font-semibold mt-4">
//           What advantage will you have?
//         </h2>
//       </div>

//       {/* Feature Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//         {studentCards.map((item, i) => (
//           <FeatureCard key={i} {...item} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FeatureSectionEnterprises;
