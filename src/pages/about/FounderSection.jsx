import React from "react";
import { useTranslation } from "react-i18next";

const FounderSection = () => {
  const { t } = useTranslation();
  return (
    <section className="relative bg-white">
      {/* Main Flex Layout */}
      <div className="flex min-h-[182vh] lg:min-h-screen md:min-h-[110vh]">
        {/* <div className="flex  min-h-[170vh] xl:min-h-[100vh] md:min-h-[110vh] lg:min-h-[90vh] "> */}
        {/* Left Side */}
        <div className="w-[75%] md:w-[80%] lg:w-1/2 bg-appcolor px-4 lg:px-12 md:px-12 py-12 sm:py-10 flex flex-col justify-between ">
          <div className="max-w-[70%] md:max-w-[75%] lg:max-w-[380px]">
            <h2 className="sm:text-lg md:text-3xl lg:text-5xl">
              {t("A NOTE FROM")}{" "}
              <span className="font-bold italic">{t("THE FOUNDERS")}</span>
            </h2>
            <p className="mt-4 md:text-xl lg:text-2xl  font-semibold">
              {t(
                "Our journey, values, and vision straight from those who started it all."
              )}
            </p>
          </div>
          <div>
            <img
              src="/assets/landingpage/Images/AboutQuote1.png"
              alt="Inspirational quote"
              className=" lg:h-48 h-28 w-auto"
            />
          </div>
        </div>
        {/* Right Side */}
        <div className="w-[10%] md:w-[30%] lg:w-1/2 bg-white px-12 lg:px-24 md:px-20 py-12 sm:py-20 flex justify-end ">
          <img
            src="/assets/landingpage/Images/AboutQuote2.png"
            alt="Background quote"
            className="h-20 lg:h-48  w-auto opacity-20"
          />
        </div>
      </div>

      {/* Overlay Image */}
      <div className="absolute w-2/3 lg:w-auto md:w-auto top-[250px] left-[200px] md:top-[110px] lg:top-[110px] lg:left-[920px] md:left-[540px]  transform -translate-x-1/2 lg:flex lg:space-x-20">
        {/* First Founder */}
        <div className="relative lg:h-80 lg:w-80 md:h-80 md:w-80">
          {/* Base Image */}
          <div className="relative h-60 lg:h-80 lg:w-80 md:h-80 md:w-80 mx-auto overflow-hidden rounded-full">
            <img
              src="/assets/landingpage/Images/RingAbout.png"
              alt="Decorative ring"
              className="h-60 lg:h-80 lg:w-80 md:h-80 md:w-80"
            />
          </div>
          {/* Overlay Image */}
          <img
            src="/assets/landingpage/Images/avatar/1.png"
            alt="Founder portrait"
            className="h-[270px] lg:h-96 lg:w-80 md:h-96 md:w-80 absolute -top-[35px] -left-[10px] lg:-top-[70px] lg:left-0 md:-top-[70px] md:left-0 object-cover rounded-full"
          />
          <div className="w-64 md:w-full lg:w-full text-center mt-5">
            <h1 className="text-lg md:text-2xl lg:text-2xl font-bold">
              Dana Calloni
            </h1>
            <p className="font-medium">
              {t("Co-founder – Student coordination & matching management")}
            </p>
            <p className="italic">{t("MSc in Psychology")}</p>
            <p>
              {t(
                "Dana manages student relations and ensures smooth, human-centered experiences on FASTAFF, making every connection valuable and efficient."
              )}
            </p>
          </div>
        </div>

        {/* Second Founder */}
        <div className="relative lg:h-80 lg:w-80 md:h-80 md:w-80 mt-24 lg:mt-0 md:mt-60">
          {/* Base Image */}
          <div className="relative h-60 lg:h-80 lg:w-80 md:h-80 md:w-80 mx-auto overflow-hidden rounded-full">
            <img
              src="/assets/landingpage/Images/RingAbout.png"
              alt="Decorative ring"
              className="h-60 lg:h-80 lg:w-80 md:h-80 md:w-80"
            />
          </div>
          {/* Overlay Image */}
          <img
            src="/assets/landingpage/Images/avatar/2.png"
            alt="Founder portrait"
            className="h-72 lg:h-96 lg:w-80 md:h-96 md:w-80 absolute -top-[53px] -left-[15px] lg:-top-[70px] lg:left-0 md:-top-[70px] md:left-0 object-cover rounded-full"
          />
          <div className="w-64 lg:w-full md:w-full text-center mt-5">
            <h1 className="text-2xl font-bold">Matteo Melfi</h1>
            <p className="font-medium">
              {t("Co-founder – Technical lead & business relations")}
            </p>
            <p className="italic">{t("BSc in Management")}</p>
            <p>
              {t(
                "Matteo oversees technical development and business partnerships, ensuring FASTAFF’ remains efficient, reliable, and locally impactful."
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;

// import React from "react";

// const FounderSection = () => {
//   return (
//     <section className="relative">
//       {" "}
//       {/* Added relative positioning here */}
//       <div className="flex min-h-screen">
//         {/* Left Side */}
//         <div className="w-1/2 bg-appcolor px-24 py-20 flex flex-col justify-between">
//           <div className="max-w-[300px]">
//             <h2 className="text-4xl">
//               A NOTE FROM{" "}
//               <span className="font-extrabold italic">THE FOUNDERS</span>
//             </h2>
//             <p className="mt-4 text-xl font-semibold">
//               Our journey, values, and vision straight from those who started it
//               all.
//             </p>
//           </div>
//           <div>
//             <img
//               src="/assets/landingpage/Images/AboutQuote1.png"
//               alt="About Quote 1"
//               className="h-48"
//             />
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="w-1/2 bg-white px-24 py-20 flex justify-end">
//           <div>
//             <img
//               src="/assets/landingpage/Images/AboutQuote2.png"
//               alt="About Quote 2"
//               className="h-48 opacity-20"
//             />
//           </div>
//         </div>
//       </div>
//       {/* Overlay Image */}
//       <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
//         <div className="relative h-80 w-fit mx-auto overflow-hidden">
//           {/* Base Image */}
//           <img
//             src="/assets/landingpage/Images/RingAbout.png"
//             alt="Base Ring Image"
//             className="h-80"
//           />

//           {/* Overlay Image */}
//           <img
//             src="/assets/landingpage/Images/DanaAbout.png"
//             alt="Overlay Dana Image"
//             className="h-96 absolute top-0 left-0"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FounderSection;
