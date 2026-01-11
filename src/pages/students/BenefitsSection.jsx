import React from "react";
import Badge from "../../components/ui/Badge";
import { useTranslation } from "react-i18next";

const BenefitsSection = () => {
  const { t } = useTranslation();
  const contactItems = [
    {
      icon: "/assets/landingpage/Icons/CheckSheild.png",
      text: "Financial support",
      description:
        "Temporary assignments allow you to finance your studies and daily needs without a long-term commitment.",
    },
    {
      icon: "/assets/landingpage/Icons/Thunder.png",
      text: "Professional experience",
      description:
        "Each mission is an opportunity to acquire new skills in various fields (events, catering, commerce, etc.)",
    },
    {
      icon: "/assets/landingpage/Icons/Thunder.png",
      text: "Balance between studies and work",
      description:
        "FASTAFF's flexibility helps you find assignments that respect your academic pace and priorities.",
    },
  ];

  const BenefitCard = ({ icon, text, description }) => (
    <div
      className="border-2 border-appcolor rounded-2xl py-6 px-6 shadow-md 
                 hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
    >
      <img src={icon} alt={text} className="h-14 w-14 sm:h-16 sm:w-16" />
      <p className="text-lg sm:text-xl font-semibold mt-4">{t(text)}</p>
      <p className="text-[#706183] text-sm sm:text-base mt-4">{t(description)}</p>
    </div>
  );

  return (
    <section className="space-y-10 px-6 lg:px-24 md:px-16">
      {/* Header */}
      <div className="text-center">
        <Badge text="Benefits for you" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mt-4">
          {t("Why choose us?")}
        </h2>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 max-w-7xl mx-auto">
        {contactItems.map((item, i) => (
          <BenefitCard key={i} {...item} />
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
// import React from "react";
// import Badge from "../../components/ui/Badge";

// const BenefitsSection = () => {
//   const contactItems = [
//     {
//       icon: "/assets/landingpage/Icons/CheckSheild.png",
//       text: "Financial support",
//       description:
//         "Temporary assignments allow you to finance your studies and daily needs without a long-term commitment.",
//     },
//     {
//       icon: "/assets/landingpage/Icons/Thunder.png",
//       text: "Professional experience",
//       description:
//         "Each mission is an opportunity to acquire new skills in various fields (events, catering, commerce, etc.)",
//     },
//     {
//       icon: "/assets/landingpage/Icons/Thunder.png",
//       text: "Balance between studies and work",
//       description:
//         "FASTAFF's flexibility helps you find assignments that respect your academic pace and priorities.",
//     },
//   ];

//   const BenefitCard = ({ icon, text, description }) => (
//     <div
//       className="border-2 border-appcolor rounded-2xl py-6 px-6 shadow-md
//                  hover:shadow-lg transition duration-300 flex flex-col items-center"
//     >
//       <img src={icon} alt={text} className="h-16 w-16" />
//       <p className="text-xl font-semibold mt-6 text-center">{text}</p>
//       <p className="text-[#706183] text-sm text-center mt-6">{description}</p>
//     </div>
//   );

//   return (
//         <section className="space-y-10">
//         <div className="text-center">
//             <Badge text="Benefits for you" />
//             <h2 className="text-5xl font-semibold mt-4">Why choose us?</h2>
//         </div>

//       {/* Benefits */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-8xl mx-auto px-2">
//         {contactItems.map((item, i) => (
//           <BenefitCard key={i} {...item} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default BenefitsSection;
