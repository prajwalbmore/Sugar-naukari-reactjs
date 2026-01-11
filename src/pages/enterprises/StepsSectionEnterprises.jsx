import React from "react";
import Badge from "../../components/ui/Badge";
import { useTranslation } from "react-i18next";

const StepsSectionEnterprises = () => {
  const { t } = useTranslation();
  const StepCard = ({
    icon,
    title,
    description,
    image,
    reverse,
    bg,
    list = [],
  }) => (
    <div
      className={`w-full flex flex-col lg:flex-row rounded-3xl ${
        reverse ? "lg:flex-row-reverse bg-dark text-appcolor" : bg || ""
      }`}
    >
      {/* Content */}
      <div className="w-full lg:w-1/2 my-6 lg:my-8 px-6 md:px-10 space-y-3">
        {icon && (
          <div className="flex justify-center">
            <img
              src={icon}
              alt="step icon"
              className="h-16 w-16 md:h-20 md:w-20"
            />
          </div>
        )}
        <div className="space-y-2">
          <h1 className="text-xl md:text-2xl lg:text-3xl text-center font-semibold">
            {t(title)}
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-center">
            {t(description)}
          </p>
          {/* {list.length > 0 && (
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base lg:text-lg">
              {list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )} */}
        </div>
      </div>

      {/* Image */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-start px-6 lg:px-16 mt-6 lg:mt-[55px]">
        <img
          src={image}
          alt={title}
          className="h-[250px] md:h-[300px] lg:h-[300px] w-full object-contain"
        />
      </div>
    </div>
  );

  // ✅ WorkCard Component
  const WorkCard = ({
    title,
    description,
    image,
    bg = "bg-dark",
    textColor = "text-appcolor",
  }) => (
    <div
      className={`w-full ${bg} ${textColor} rounded-[20px] md:rounded-[34px]`}
    >
      {/* Content */}
      <div className="px-6 md:px-10 space-y-3">
        <div className="space-y-2 mt-6 md:mt-10">
          <h1 className="text-xl md:text-2xl lg:text-3xl text-center font-semibold">
            {t(title)}
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-center">
            {t(description)}
          </p>
        </div>
      </div>

      {/* Image */}
      <div
        className={`${
          title === "Pay Safely" ? "mt-24" : "mt-[70px]"
        }  flex justify-center px-6 md:px-16`}
      >
        <img
          src={image}
          alt={title}
          className="h-[220px] md:h-[280px] lg:h-[300px] w-full object-contain"
        />
      </div>
    </div>
  );

  return (
    <section className="space-y-10 *:px-6 lg:px-24 md:px-16">
      <div className="text-center">
        <Badge text="How it works" />
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mt-4 mb-5">
          <span className="italic font-extrabold">{t("How to integrate")}</span>{" "}
          {t("our platform")} <span className="italic font-extrabold">?</span>
        </h2>
      </div>

      {/* Steps Section */}
      <div className="space-y-16">
        <StepCard
          icon="/assets/landingpage/Phones/CreateprofileUser.png"
          title="Create a company account"
          description="Register on the app by providing your information (company name, address, contact details, etc.). This allows you to access the company dashboard to manage your offers and view available student profiles"
          image="/assets/landingpage/Phones/CreateCompany.png"
          bg="bg-CardPhoneBg bg-cover bg-no-repeat"
        />
        <StepCard
          icon="/assets/landingpage/Phones/CreateprofileUser.png"
          title="Subscribe to a subscription"
          description="FASTAFF' offers an annual subscription that gives you access to students registered on the platform and all temporary recruitment features"
          image="/assets/landingpage/Phones/Subscription.png"
          reverse
        />
        <StepCard
          icon="/assets/landingpage/Phones/CreateprofileUser.png"
          title="Publish an assignment"
          description="As soon as your account is activated, you can create temporary mission offers. Provide details such as:
• Type of assignment (job description),
• Emergency (urgent or non-urgent mission),
•Localization• Duration and schedules,
• Proposed salary,
• Specific criteria (e.g. dress code, badge required, etc."
          list={[
            "Type of assignment (job description)",
            "Emergency (urgent or non-urgent mission)",
            "Localization",
            "Duration and schedules",
            "Proposed salary",
            "Specific criteria (e.g. dress code, badge required, etc.)",
          ]}
          image="/assets/landingpage/Phones/Publish.png"
          bg="bg-CardPhoneBg bg-cover bg-no-repeat"
        />

        {/* Start Working & Get Paid */}
        <div className="flex flex-col lg:flex-row gap-5">
          <WorkCard
            title="Select a candidate"
            description="When students apply, review their profiles, including grades and reviews from past assignments, to choose the ideal candidate. Selected students receive a notification and can accept the assignment within 5-10 minutes.​"
            image="/assets/landingpage/Phones/SelectCandidate.png"
            bg="bg-[#FFF5CC]"
            textColor="text-black"
          />
          <WorkCard
            title="Pay Safely"
            description="At the end of the assignment, evaluate the student, and the student will do the same for you. Use secure in-app payments, rate the worker, and keep a record for future hiring."
            image="/assets/landingpage/Phones/PaySafely.png"
            bg="bg-[#FFF5CC]"
            textColor="text-black"
          />
        </div>
      </div>
    </section>
  );
};

export default StepsSectionEnterprises;
// import React from "react";
// import Badge from "../../components/ui/Badge";

// const StepsSectionEnterprises = () => {
//   const StepCard = ({
//     icon,
//     title,
//     description,
//     image,
//     reverse,
//     bg,
//     list = [],
//   }) => (
//     <div
//       className={`w-full flex rounded-3xl ${
//         reverse ? "flex-row-reverse bg-dark text-appcolor" : bg || ""
//       }`}
//     >
//       {/* Content */}
//       <div className="w-1/2 my-14 mx-10 px-10 space-y-3">
//         {icon && (
//           <div className="flex justify-center">
//             <img src={icon} alt="step icon" className="h-20 w-20" />
//           </div>
//         )}
//         <div className="space-y-2">
//           <h1 className="text-3xl text-center font-semibold">{title}</h1>
//           <p className="text-center text-lg">{description}</p>
//         </div>
//       </div>

//       {/* Image */}
//       <div className="mt-[51px] mx-32">
//         <img src={image} alt={title} className="h-[350px] w-full" />
//       </div>
//     </div>
//   );
//   // ✅ Reusable WorkCard Component
//   const WorkCard = ({
//     title,
//     description,
//     image,
//     bg = "bg-dark",
//     textColor = "text-appcolor",
//   }) => (
//     <div className={`w-full ${bg} ${textColor} rounded-[34px]`}>
//       {/* Content */}
//       <div className="space-y-3">
//         <div className="space-y-2 mx-20 mt-10">
//           <h1 className="text-3xl text-center font-semibold">{title}</h1>
//           <p className="text-center text-lg">{description}</p>
//         </div>
//       </div>

//       {/* Image */}
//       <div className="mt-[40px] mx-36">
//         <img src={image} alt={title} className="h-[350px] w-full" />
//       </div>
//     </div>
//   );

//   return (
//     <section className="space-y-10">
//       <div className="text-center">
//         <Badge text="How it works" />
//         <h2 className="text-5xl font-medium mt-4 mb-5">
//           <span className="italic font-extrabold">How to integrate</span>
//           our platform <span className="italic font-extrabold">?</span>
//         </h2>
//       </div>

//       {/* Steps Section */}
//       <div className="space-y-16">
//         <StepCard
//           icon="/assets/landingpage/Phones/CreateprofileUser.png"
//           title="Create a company account"
//           description="Register on the app by providing your information (company name, address, contact details, etc.). This allows you to access the company dashboard to manage your offers and view available student profiles"
//           image="/assets/landingpage/Phones/CreateCompany.png"
//           bg="bg-CardPhoneBg bg-cover bg-no-repeat"
//         />
//         <StepCard
//           icon="/assets/landingpage/Phones/CreateprofileUser.png"
//           title="Subscribe to a subscription"
//           description="FASTAFF' offers an annual subscription that gives you access to students registered on the platform and all temporary recruitment features"
//           image="/assets/landingpage/Phones/Subscription.png"
//           reverse
//         />
//         <StepCard
//           icon="/assets/landingpage/Phones/CreateprofileUser.png"
//           title="Publish an assignment"
//           description="As soon as your account is activated, you can create temporary mission offers. Provide details such as:
// • Type of assignment (job description),
// • Emergency (urgent or non-urgent mission),
// •Localization• Duration and schedules,
// • Proposed salary,
// • Specific criteria (e.g. dress code, badge required, etc."
//           list={[
//             "• Type of assignment (job description)",
//             "• Emergency (urgent or non-urgent mission)",
//             "• Localization",
//             "• Duration and schedules",
//             "• Proposed salary",
//             "• Specific criteria (e.g. dress code, badge required, etc.",
//           ]}
//           image="/assets/landingpage/Phones/Publish.png"
//           bg="bg-CardPhoneBg bg-cover bg-no-repeat"
//         />

//         {/* Start Working & Get Paid */}

//         <div className="flex flex-col lg:flex-row gap-5">
//           <WorkCard
//             title="Select a candidate"
//             description="When students apply, review their profiles, including grades and reviews from past assignments, to choose the ideal candidate. Selected students receive a notification and can accept the assignment within 5-10 minutes.​"
//             image="/assets/landingpage/Phones/SelectCandidate.png"
//             bg="bg-[#FFF5CC]"
//             textColor="text-black"
//           />
//           <WorkCard
//             title="Pay Safely"
//             description="At the end of the assignment, evaluate the student, and the student will do the same for youUse secure in-app payments, rate the worker, and keep a record for future hiring"
//             image="/assets/landingpage/Phones/PaySafely.png"
//             bg="bg-[#FFF5CC]"
//             textColor="text-black"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StepsSectionEnterprises;
