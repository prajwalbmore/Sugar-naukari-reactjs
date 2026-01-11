import React from "react";
import Badge from "../../components/ui/Badge";
import { useGetSponsorsBannerListQuery } from "../../services/faqApiSlice";
import Spinner from "../../components/ui/Spinner";
import { useTranslation } from "react-i18next";

const OurSponsors = () => {
  const { data, isLoading, error } = useGetSponsorsBannerListQuery();
  const { t } = useTranslation();
  if (isLoading) return <Spinner />;
  if (error) return <div>{t("Error loading sponsors")}</div>;
  const sponsors = data?.data || [];

  return (
    <section className="bg-[#FFFCEE] py-10">
      <div className="space-y-10 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="text-center">
          <Badge text="Our Sponsors" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-4">
            {t("Powered by Our Awesome Sponsors")}
          </h2>
        </div>
        <div className="relative">
          <div
            className="flex overflow-x-auto gap-4 sm:gap-6 md:gap-8"
            style={{ scrollbarWidth: "none" }} // Firefox
          >
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="flex-shrink-0 rounded-lg flex items-center justify-center"
                style={{ minWidth: "150px" }}
              >
                <img
                  src={sponsor.image}
                  alt={sponsor.banner_for}
                  className="h-24 sm:h-32 md:h-40 lg:h-48 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>
        {`
          /* Hide scrollbar for Chrome, Safari and Opera */
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </section>
  );
};

export default OurSponsors;

// import React from "react";
// import Badge from "../../components/ui/Badge";
// import { useGetSponsorsBannerListQuery } from "../../services/faqApiSlice";
// import Spinner from "../../components/ui/Spinner";

// const OurSponsors = () => {
//   const { data, isLoading, error } = useGetSponsorsBannerListQuery();
//   if (isLoading) return <Spinner />;
//   if (error) return <div>Error loading sponsors</div>;

//   const sponsors = data?.data || [];

//   return (
//     <section className="bg-[#FFFCEE] py-10">
//       <div className="space-y-10 lg:px-24">
//         <div className="text-center">
//           <Badge text="Our Sponsors" />
//           <h2 className="text-4xl font-semibold mt-4">
//             Powered by Our Awesome Sponsors
//           </h2>
//         </div>
//         <div className="relative">
//           <div
//             className="flex overflow-x-auto gap-6"
//             style={{
//               scrollbarWidth: "none", // Firefox
//             }}
//           >
//             {sponsors.map((sponsor, index) => (
//               <div
//                 key={index}
//                 className="flex-shrink-0  rounded-lg flex items-center justify-center"
//               >
//                 <img
//                   src={sponsor.image}
//                   alt={sponsor.banner_for}
//                   className="h-48 object-contain"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <style>
//         {`
//           /* Hide scrollbar for Chrome, Safari and Opera */
//           div::-webkit-scrollbar {
//             display: none;
//           }
//         `}
//       </style>
//     </section>
//   );
// };

// export default OurSponsors;
// import React from "react";
// import Badge from "../../components/ui/Badge";
// import { useGetSponsorsBannerListQuery } from "../../services/faqApiSlice";
// import Spinner from "../../components/ui/Spinner";

// const sponsors = [
//   {
//     src: "/assets/landingpage/Images/Sponsors/Sponsor1.png",
//     alt: "Sponsor 1",
//   },
//   {
//     src: "/assets/landingpage/Images/Sponsors/Sponsor2.png",
//     alt: "Sponsor 2",
//   },
//   {
//     src: "/assets/landingpage/Images/Sponsors/Sponsor1.png",
//     alt: "Sponsor 1",
//   },
//   {
//     src: "/assets/landingpage/Images/Sponsors/Sponsor2.png",
//     alt: "Sponsor 2",
//   },
// ];

// const OurSponsors = () => {
//   const { data, isLoading, error } = useGetSponsorsBannerListQuery();
//   if (isLoading) {
//     return <Spinner />;
//   }
//   if (error) {
//     return <div>Error loading sponsors</div>;
//   }
//   const sponsors = data?.data || [];
//   return (
//     <section className="bg-[#FFFCEE] py-10">
//       <div className="space-y-10 lg:px-24">
//         <div className="text-center">
//           <Badge text="Our Sponsors" />
//           <h2 className="text-4xl font-semibold mt-4">
//             Powered by Our Awesome Sponsors
//           </h2>
//         </div>
//         <div className="flex flex-wrap justify-center gap-10">
//           {sponsors.map((sponsor, index) => (
//             <img
//               key={index}
//               src={sponsor.image}
//               alt={sponsor.banner_for}
//               className="h-44"
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OurSponsors;
