import React from "react";
import Badge from "../../components/ui/Badge";
import { useTranslation } from "react-i18next";

const StepsSection = () => {
  const { t } = useTranslation();
  const StepCard = ({ icon, title, description, image, reverse, bg }) => (
    <div
      className={`w-full flex flex-col ${
        reverse ? "lg:flex-row-reverse bg-dark text-appcolor" : "lg:flex-row"
      } ${bg || ""} rounded-3xl`}
    >
      {/* Content */}
      <div className="w-full lg:w-1/2 my-10 lg:my-16 px-6 sm:px-10 lg:px-16 space-y-3 text-center">
        {icon && (
          <div className="flex justify-center">
            <img
              src={icon}
              alt="step icon"
              className="h-16 w-16 sm:h-20 sm:w-20"
            />
          </div>
        )}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold">{t(title)}</h1>
          <p className="text-base sm:text-lg">{t(description)}</p>
        </div>
      </div>

      {/* Image */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end px-6 sm:px-12 lg:px-20 mt-6 lg:mt-[55px]">
        <img
          src={image}
          alt={title}
          className="h-[250px] sm:h-[300px] lg:h-[300px] w-full max-w-md object-contain"
        />
      </div>
    </div>
  );

  // ✅ Reusable WorkCard Component
  const WorkCard = ({
    title,
    description,
    image,
    bg = "bg-dark",
    textColor = "text-appcolor",
  }) => (
    <div className={`w-full ${bg} ${textColor} rounded-[34px] flex flex-col`}>
      {/* Content */}
      <div className="space-y-3 px-6 sm:px-10 lg:px-20 mt-8">
        <h1 className="text-2xl sm:text-3xl text-center font-semibold">
          {t(title)}
        </h1>
        <p className="text-base sm:text-lg text-center">{t(description)}</p>
      </div>

      {/* Image */}
      <div className="mt-8 flex justify-center px-6 sm:px-12 lg:px-20">
        <img
          src={image}
          alt={title}
          className="h-[250px] sm:h-[300px] lg:h-[350px] w-full max-w-md object-contain"
        />
      </div>
    </div>
  );

  return (
    <section className="space-y-10 px-6 lg:px-24 md:px-16">
      <div className="text-center">
        <Badge text="How it works" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mt-4 mb-5">
          <span className="italic font-extrabold">{t("Download the app")}</span>{" "}
          {t("on your mobile store for")}
          <span className="italic font-extrabold">{t("FREE")}</span>
        </h2>
        <p className="text-sm sm:text-base">
          {t("(available on iOS and Android)")}
        </p>
      </div>

      {/* Steps Section */}
      <div className="space-y-16">
        <StepCard
          icon="/assets/landingpage/Phones/CreateprofileUser.png"
          title="Create Profile"
          description="Add your name, skills, preferred job type, location, and availability to help employers discover you faster."
          image="/assets/landingpage/Phones/CreateProfile.png"
          bg="bg-CardPhoneBg bg-cover bg-no-repeat"
        />
        <StepCard
          icon="/assets/landingpage/Phones/CreateprofileUser.png"
          title="Browse Jobs Near You"
          description="Explore jobs tailored to your skills and location — filter by category, timing, or pay."
          image="/assets/landingpage/Phones/BrowseJobs.png"
          reverse
        />
        <StepCard
          icon="/assets/landingpage/Phones/CreateprofileUser.png"
          title="Apply in One Tap"
          description="Instantly apply to jobs you’re interested in — no long forms, just a simple click to express interest."
          image="/assets/landingpage/Phones/ApplyJobs.png"
          bg="bg-CardPhoneBg bg-cover bg-no-repeat"
        />

        {/* Start Working & Get Paid */}
        <div className="flex flex-col lg:flex-row gap-8">
          <WorkCard
            title="Start Working"
            description="Once selected, follow the job instructions, check-in as required, and complete your task on time."
            image="/assets/landingpage/Phones/workCard1.png"
            bg="bg-dark"
            textColor="text-appcolor"
          />
          <WorkCard
            title="Add Review"
            description="After job completion, follow the job instructions, Rate jobs and help create a transparent, reliable platform."
            image="/assets/landingpage/Phones/workCard2.png"
            bg="bg-CardPhoneBg bg-cover bg-no-repeat"
            textColor="text-black"
          />
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
// import React from "react";
// import Badge from "../../components/ui/Badge";

// const StepsSection = () => {
//   const StepCard = ({ icon, title, description, image, reverse, bg }) => (
//     <div
//       className={`w-full flex rounded-3xl ${
//         reverse ? "flex-row-reverse bg-dark text-appcolor" : bg || ""
//       }`}
//     >
//       {/* Content */}
//       <div className="w-1/2 my-24 mx-10 px-10 space-y-3">
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
//     <section className="space-y-10 px-6 lg:px-20 md:16">
//       <div className="text-center">
//         <Badge text="How it works" />
//         <h2 className="text-5xl font-medium mt-4 mb-5">
//           <span className="italic font-extrabold">Download the app</span> on
//           your mobile store for{" "}
//           <span className="italic font-extrabold">FREE</span>
//         </h2>
//         <p>(available on iOS and Android)</p>
//       </div>

//       {/* Steps Section */}
//       <div className="space-y-16">
//         <StepCard
//           icon="/assets/landingpage/Phones/CreateprofileUser.png"
//           title="Create Profile"
//           description="Add your name, skills, preferred job type, location, and availability to help employers discover you faster."
//           image="/assets/landingpage/Phones/CreateProfile.png"
//           bg="bg-CardPhoneBg bg-cover bg-no-repeat"
//         />
//         <StepCard
//           icon="/assets/landingpage/Phones/CreateprofileUser.png"
//           title="Browse Jobs Near You"
//           description="Explore jobs tailored to your skills and location — filter by category, timing, or pay."
//           image="/assets/landingpage/Phones/BrowseJobs.png"
//           reverse
//         />
//         <StepCard
//           icon="/assets/landingpage/Phones/CreateprofileUser.png"
//           title="Apply in One Tap"
//           description="Instantly apply to jobs you’re interested in — no long forms, just a simple click to express interest."
//           image="/assets/landingpage/Phones/ApplyJobs.png"
//           bg="bg-CardPhoneBg bg-cover bg-no-repeat"
//         />

//         {/* Start Working & Get Paid */}

//         <div className="flex flex-col lg:flex-row gap-5">
//           <WorkCard
//             title="Start Working"
//             description="Once selected, follow the job instructions, check-in as required, and complete your task on time."
//             image="/assets/landingpage/Phones/StartWorking.png"
//             bg="bg-dark"
//             textColor="text-appcolor"
//           />
//           <WorkCard
//             title="Get Paid Securely"
//             description="After job completion, receive payment directly in your wallet or bank — quick, safe, and trackable."
//             image="/assets/landingpage/Phones/StartWorking.png"
//             bg="bg-CardPhoneBg bg-cover bg-no-repeat"
//             textColor="text-black"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StepsSection;
