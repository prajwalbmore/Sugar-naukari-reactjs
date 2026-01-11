import React from "react";
import Badge from "../../components/ui/Badge";
import { useTranslation } from "react-i18next";
// "job_posted": "34",
//         "ave_rating": "4.3",
//         "app_downloads": "100",
//         "verified_profiles": "12",
const FeaturedAbout = ({ data }) => {
  const { t } = useTranslation();
  const cards = [
    {
      title: data?.job_posted || "50,000+",
      description: "Jobs Posted",
      icon: "/assets/landingpage/Icons/about/BCaseHD.png",
    },
    {
      title: data?.ave_rating || "4.8",
      description: "Average Rating",
      icon: "/assets/landingpage/Icons/about/StarHD.png",
    },
    {
      title: data?.app_downloads || "100K+",
      description: "Mobile app downloads",
      icon: "/assets/landingpage/Icons/about/SquareHD.png",
    },
    {
      title: data?.verified_profiles || "90%+",
      description: "Verified Profiles",
      icon: "/assets/landingpage/Icons/about/UserHD.png",
    },
  ];

  return (
    <section className="space-y-10 px-4 sm:px-6 md:px-16 lg:px-24 py-4">
      {/* Heading Section */}
      <div className="text-center max-w-3xl mx-auto">
        <Badge text="About Us" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mt-4">
          {t("Empowering Daily Wage Workers,")}
        </h2>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mt-2">
          {t("Connecting Trusted Employers.")}
        </h2>
        <p className="text-sm sm:text-base md:text-lg mt-3 text-gray-700">
          {t(
            "At FastAff, we make job discovery and hiring effortless for both those seeking work and those needing hands-on support."
          )}
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {cards.map((item, index) => (
          <div
            key={index}
            className="group bg-footer text-center rounded-xl p-6 shadow-sm hover:shadow-lg transition-all text-[#594E1F] hover:bg-appcolor"
          >
            {/* Icon */}
            <div className="bg-appcolor mx-auto rounded-lg flex items-center justify-center w-16 h-16 mb-4 transition-colors group-hover:bg-lightYellow">
              <img
                src={item.icon}
                alt={`${item.title} Icon`}
                className="h-10 w-10 object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 font-noto">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-md lg:text-lg text-gray-700">
              {t(item.description)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedAbout;
// import React from "react";
// import Badge from "../../components/ui/Badge";

// const FeaturedAbout = () => {
//   const cards = [
//     {
//       title: "50,000+",
//       description: "Jobs Posted",
//       icon: "/assets/landingpage/Icons/about/Briefcase.png",
//     },
//     {
//       title: "4.8",
//       description: "Average Rating",
//       icon: "/assets/landingpage/Icons/about/Star.png",
//     },
//     {
//       title: "100K+",
//       description: "Mobile app downloads",
//       icon: "/assets/landingpage/Icons/about/SquareMenu.png",
//     },
//     {
//       title: "90%+",
//       description: "Verified Profiles",
//       icon: "/assets/landingpage/Icons/about/UserLog.png",
//     },
//   ];
//   return (
//     <section className="space-y-10 px-24">
//       <div className="text-center">
//         <Badge text="About Us" />
//         <h2 className="text-5xl font-semibold mt-4">
//           Empowering Daily Wage Workers,
//         </h2>
//         <h2 className="text-5xl font-semibold mt-4">
//           Connecting Trusted Employers.
//         </h2>
//         <p className="max-w-lg mx-auto mt-3">
//           At FastAff, we make job discovery and hiring effortless for both those
//           seeking work and those needing hands-on support.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
//         {cards.map((item, index) => (
//           <div
//             key={index}
//             className="group bg-footer text-center rounded-xl p-6 shadow-sm hover:shadow-lg transition-all text-[#594E1F] hover:bg-appcolor"
//           >
//             {/* Icon */}
//             <div className="bg-appcolor mx-auto rounded-lg flex items-center justify-center w-16 h-16 mb-4 transition-colors group-hover:bg-lightYellow">
//               <img
//                 src={item.icon}
//                 alt={`${item.title} Icon`}
//                 className="h-10 w-10 object-contain"
//               />
//             </div>

//             {/* Title */}
//             <h3 className="text-5xl font-bold mb-2 font-noto">{item.title}</h3>

//             {/* Description */}
//             <p className="text-md text-gray-700">{item.description}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FeaturedAbout;
