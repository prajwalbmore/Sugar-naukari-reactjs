import React from "react";
import { useTranslation } from "react-i18next";
import useMediaQuery from "../../utils/useMediaQuery";

const FounderSectionXL = () => {
  const { t } = useTranslation();
  const isSmallLaptop = useMediaQuery("(min-width: 1366px)");
  const isMidSizeLaptop = useMediaQuery("(min-width: 1440px)");
  const isFullHD = useMediaQuery("(min-width: 1920px)");
  const isRetinaLarge = useMediaQuery("(min-width: 2560px)");
  return (
    <section className="relative bg-white">
      {/* Main Flex Layout */}
      <div
        className={`flex ${isRetinaLarge && "min-h-[45vh]"} ${
          isFullHD && "min-h-[60vh]"
        } ${isMidSizeLaptop && "min-h-[70vh]"}
         ${isSmallLaptop && "min-h-[90vh]"}`}
      >
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
      <div className="absolute w-2/3 lg:w-auto md:w-auto top-[250px] left-[200px] md:top-[110px] lg:top-[75px] lg:left-[920px] md:left-[540px]  transform -translate-x-1/2 lg:flex lg:space-x-20">
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
            className="h-72 lg:h-[360px] lg:w-80 md:h-96 md:w-80 absolute -top-[53px] -left-[10px] lg:-top-[47px] lg:left-0 md:-top-[70px] md:left-0 object-cover rounded-full"
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
            className="h-72 lg:h-96 lg:w-80 md:h-96 md:w-80 absolute -top-[53px] -left-[0px] lg:-top-[70px] lg:left-0 md:-top-[70px] md:left-0 object-cover rounded-full"
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

export default FounderSectionXL;
