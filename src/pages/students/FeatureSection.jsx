import React from "react";
import Badge from "../../components/ui/Badge";
import { useTranslation } from "react-i18next";

const FeatureSection = () => {
  const { t } = useTranslation();
  const studentCards = [
    {
      title: "Jobs near you",
      description:
        "Our geo-matching ensures that you only see relevant, nearby jobs.",
      icon: "/assets/landingpage/mapPin.png",
    },
    {
      title: "Total flexibility",
      description:
        "Choose the missions that suit you and adapt your schedule over the weeks.",
      icon: "/assets/landingpage/businessBag.png",
    },
    {
      title: "Assessment and progression",
      description:
        "After each assignment, receive a company rating, allowing you to build a trusted profile and attract more assignments.",
      icon: "/assets/landingpage/starThumpsUp.png",
    },
    {
      title: "No constraints",
      description:
        "Fastaff is committed to never making the basic use of its platform paid for people looking for work.",
      icon: "/assets/landingpage/disableIcon.png",
    },
  ];

  // ✅ Reusable Card Component
  const FeatureCard = ({ icon, title, description }) => (
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
      {/* Header */}
      <div className="text-center">
        <Badge text="Why Choose Fastaff" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mt-4">
          {t("What Makes Us Different?")}
        </h2>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {studentCards.map((item, i) => (
          <FeatureCard key={i} {...item} />
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
// import React from "react";
// import Badge from "../../components/ui/Badge";

// const FeatureSection = () => {
//   const studentCards = [
//     {
//       title: "Jobs near you",
//       description:
//         "Our geo-matching ensures that you only see relevant, nearby jobs.",
//       icon: "/assets/landingpage/mapPin.png",
//     },
//     {
//       title: "Total flexibility",
//       description:
//         "Choose the missions that suit you and adapt your schedule over the weeks.",
//       icon: "/assets/landingpage/businessBag.png",
//     },
//     {
//       title: "Assessment and progression",
//       description:
//         "After each assignment, receive a company rating, allowing you to build a trusted profile and attract more assignments.",
//       icon: "/assets/landingpage/starThumpsUp.png",
//     },
//     {
//       title: "No constraints",
//       description:
//         "Fastaff is committed to never making the basic use of its platform paid for people looking for work.",
//       icon: "/assets/landingpage/disableIcon.png",
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
//     <section className="space-y-10">
//       <div className="text-center">
//         <Badge text="Why Choose Fastaff" />
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

// export default FeatureSection;
