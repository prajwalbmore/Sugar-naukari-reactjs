import React, { useRef, useState, useEffect } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import Badge from "../../components/ui/Badge";
import { useGetTestimonialsQuery } from "../../services/faqApiSlice";
import Spinner from "../../components/ui/Spinner";
import { useTranslation } from "react-i18next";

const SuccessStories = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();
  const { data, isLoading } = useGetTestimonialsQuery();

  // Card width + gap (maintain consistent scroll)
  const cardWidth = 280 + 24; // 280 is max card width + gap 24 (6*4 default gap*4)

  const scrollToActive = (index) => {
    const container = scrollRef.current;
    if (container) {
      const scrollPosition =
        index * cardWidth - container.clientWidth / 2 + cardWidth / 2;
      container.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToActive(activeIndex);
  }, [activeIndex]);

  const nextCard = () => {
    if (data?.data?.length) {
      setActiveIndex((prev) => (prev < data.data.length - 1 ? prev + 1 : prev));
    }
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const navButtonClass =
    "px-2 py-2 border-2 border-[#998535] text-[#998535] rounded-full flex gap-2 items-center hover:bg-black hover:text-white hover:border-transparent transition-colors duration-200";

  if (isLoading) {
    return <Spinner />;
  }

  if (!data?.data?.length) {
    return null; // Don't render if no testimonials
  }

  return (
    <section className="px-6 md:px-12 lg:px-24">
      {/* Heading */}
      <div className="text-center">
        <Badge text="Success Stories" />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4">
          {t("What Our Users Say")}
        </h2>
      </div>

      {/* Scrollable cards */}
      <div>
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth px-4 py-6 hide-scrollbar no-scrollbar"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {data.data.map((story, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-[230px] sm:w-[260px] md:w-[280px] h-[320px] rounded-lg px-6 py-4 shadow-md flex flex-col transition-transform duration-300
                ${
                  index === activeIndex
                    ? "bg-white scale-105"
                    : "bg-gray-100 opacity-70"
                }
              `}
              style={{ scrollSnapAlign: "center" }}
            >
              <img
                src="/assets/landingpage/Icons/home/Quote.png"
                alt="Quote Icon"
                className="h-12 w-12 mb-4"
              />
              <p className="text-gray-800 text-base sm:text-lg font-medium mb-4 line-clamp-4 break-words">
                {story?.description}
              </p>
              <div className="mt-auto">
                <p className="text-sm text-gray-500">{story?.name}</p>
                <p className="font-semibold text-gray-900">
                  {story?.designation}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-6 mt-4">
          <button
            onClick={prevCard}
            className={navButtonClass}
            disabled={activeIndex === 0}
            aria-label="Previous"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <button
            onClick={nextCard}
            className={navButtonClass}
            disabled={activeIndex === data.data.length - 1}
            aria-label="Next"
          >
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </section>
  );
};

export default SuccessStories;
// import React, { useRef, useState, useEffect } from "react";
// import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
// import Badge from "../../components/ui/Badge";
// import { useGetTestimonialsQuery } from "../../services/faqApiSlice";
// import Spinner from "../../components/ui/Spinner";
// import { useTranslation } from "react-i18next";

// const SuccessStories = () => {
//   const scrollRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const { t } = useTranslation();
//   const { data, isLoading } = useGetTestimonialsQuery();

//   // Fixed card width (matches Tailwind w-[250px] + gap-6)
//   const cardWidth = 250 + 24;

//   const scrollToActive = (index) => {
//     const container = scrollRef.current;
//     if (container) {
//       const scrollPosition =
//         index * cardWidth - container.clientWidth / 2 + cardWidth / 2;
//       container.scrollTo({ left: scrollPosition, behavior: "smooth" });
//     }
//   };

//   useEffect(() => {
//     scrollToActive(activeIndex);
//   }, [activeIndex]);

//   const nextCard = () => {
//     if (data?.data?.length) {
//       setActiveIndex((prev) => (prev < data.data.length - 1 ? prev + 1 : prev));
//     }
//   };

//   const prevCard = () => {
//     setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
//   };

//   const navButtonClass =
//     "px-2 py-2 border-2 border-[#998535] text-[#998535] rounded-full flex gap-2 items-center hover:bg-black hover:text-white hover:border-transparent transition-colors duration-200";

//   if (isLoading) {
//     return <Spinner />;
//   }

//   if (!data?.data?.length) {
//     return null; // don’t render section if no testimonials
//   }

//   return (
//     <section className="px-6 md:px-12 lg:px-24">
//       {/* Heading */}
//       <div className="text-center">
//         <Badge text="Success Stories" />
//         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4">
//           {t("What Our Users Say")}
//         </h2>
//       </div>

//       {/* Scrollable cards */}
//       <div>
//         <div
//           ref={scrollRef}
//           className="flex gap-6 overflow-x-auto scroll-smooth px-4 py-6 hide-scrollbar"
//         >
//           {data.data.map((story, index) => (
//             <div
//               key={index}
//               className={`flex-shrink-0 w-full md:w-[300px] lg:w-[280px] h-[320px] rounded-lg px-6 py-4 shadow-md flex flex-col transition-transform duration-300
//         ${
//           index === activeIndex
//             ? "bg-white scale-105"
//             : "bg-gray-100 opacity-70"
//         }
//       `}
//             >
//               <img
//                 src="/assets/landingpage/Icons/home/Quote.png"
//                 alt="Quote Icon"
//                 className="h-12 w-12 mb-4"
//               />
//               <p className="text-gray-800 text-base sm:text-lg font-medium mb-4 line-clamp-4 break-words">
//                 {story?.description}
//               </p>
//               <div className="mt-auto">
//                 <p className="text-sm text-gray-500">{story?.name}</p>
//                 <p className="font-semibold text-gray-900">
//                   {story?.designation}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Navigation */}
//         <div className="flex justify-center gap-6 mt-4">
//           <button
//             onClick={prevCard}
//             className={navButtonClass}
//             disabled={activeIndex === 0}
//           >
//             <ArrowLeftIcon className="h-5 w-5" />
//           </button>
//           <button
//             onClick={nextCard}
//             className={navButtonClass}
//             disabled={activeIndex === data.data.length - 1}
//           >
//             <ArrowRightIcon className="h-5 w-5" />
//           </button>
//         </div>
//       </div>

//       <style jsx>{`
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default SuccessStories;
// import React, { useRef, useState, useEffect } from "react";
// import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
// import Badge from "../../components/ui/Badge";
// import { useGetTestimonialsQuery } from "../../services/faqApiSlice";
// import Spinner from "../../components/ui/Spinner";

// const SuccessStories = () => {
//   const stories = [
//     {
//       content:
//         "Hired 10 students for a weekend event — smooth, simple, and reliable.",
//       user: "John Tiramisu",
//       role: "Employer",
//     },
//     {
//       content: "Great platform! Found the perfect candidate within hours.",
//       user: "Emily Rose",
//       role: "Recruiter",
//     },
//     {
//       content: "The hiring process was seamless and efficient.",
//       user: "Michael Lee",
//       role: "HR Manager",
//     },
//     {
//       content:
//         "A trustworthy service that connects you with skilled professionals.",
//       user: "Sophia Turner",
//       role: "Employer",
//     },
//     {
//       content:
//         "Extremely helpful and supportive throughout the hiring process.",
//       user: "David Chen",
//       role: "Hiring Manager",
//     },
//     {
//       content: "Helped us scale quickly by connecting with the right talent.",
//       user: "Anna Williams",
//       role: "Startup Founder",
//     },
//     {
//       content: "User-friendly platform with excellent support.",
//       user: "Carlos Mendes",
//       role: "Recruiter",
//     },
//   ];

//   const scrollRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(2); // Middle card initially active
//   const { data, isLoading } = useGetTestimonialsQuery();
//   const cardWidth = 250 + 24; // card width + gap

//   const scrollToActive = (index) => {
//     const container = scrollRef.current;
//     if (container) {
//       const scrollPosition =
//         index * cardWidth - container.clientWidth / 2 + cardWidth / 2;
//       container.scrollTo({ left: scrollPosition, behavior: "smooth" });
//     }
//   };

//   useEffect(() => {
//     scrollToActive(activeIndex);
//   }, [activeIndex]);

//   const nextCard = () => {
//     setActiveIndex((prev) => (prev < stories.length - 1 ? prev + 1 : prev));
//   };

//   const prevCard = () => {
//     setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
//   };

//   const navButtonClass =
//     "px-2 py-2 border-2 border-[#998535] text-[#998535] rounded-full flex gap-2 items-center hover:bg-black hover:text-white hover:border-none transition-colors duration-200";
//   if (isLoading) {
//     return <Spinner />;
//   }
//   return (
//     <section className="px-6 md:px-12 lg:px-24">
//       <div className="text-center">
//         <Badge text="Success Stories" />
//         <h2 className="text-4xl sm:text-5xl font-semibold mt-4">
//           What Our Users Say
//         </h2>
//       </div>

//       <div>
//         {/* Scrollable container */}
//         <div
//           ref={scrollRef}
//           className="flex gap-6 overflow-x-auto scroll-smooth px-4 py-4 hide-scrollbar"
//         >
//           {data?.data.map((story, index) => (
//             <div
//               key={index}
//               className={`w-[250px] h-[320px] rounded-lg px-6 py-4 shadow transition duration-300 flex flex-col
//     ${index === activeIndex ? "bg-white scale-105" : "bg-gray-100 opacity-70"}
//   `}
//             >
//               <img
//                 src="/assets/landingpage/Icons/home/Quote.png"
//                 alt="Quote Icon"
//                 className="h-16 w-16 mb-6"
//               />
//               <p className="text-gray-800 text-lg font-semibold mb-6 line-clamp-4">
//                 {story?.description}
//               </p>
//               <div className="mt-auto">
//                 <p className="text-sm text-gray-500">{story?.name}</p>
//                 <p className="font-semibold text-gray-900">
//                   {story?.designation}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Navigation buttons below */}
//         <div className="flex justify-center gap-6 mt-4">
//           <button onClick={prevCard} className={navButtonClass}>
//             <ArrowLeftIcon className="h-5 w-5" />
//           </button>
//           <button onClick={nextCard} className={navButtonClass}>
//             <ArrowRightIcon className="h-5 w-5" />
//           </button>
//         </div>
//       </div>

//       <style jsx>{`
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default SuccessStories;
