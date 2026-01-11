import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
const BannerEnterprises = forwardRef(({ data }, ref) => {
  const { t, i18n } = useTranslation();
  return (
    <section
      ref={ref}
      className={`${
        t("Home") === "Accueil" ? "lg:max-h-80 md:max-h-40" : "lg:max-h-72 md:max-h-64"
      }  px-6 md:px-16 lg:px-24`}
    >
      <div
        className={`w-full bg-appcolor rounded-3xl relative overflow-hidden min-h-screen ${
          t("Home") === "Accueil"
            ? "lg:min-h-96 md:min-h-10"
            : "lg:min-h-64 md:min-h-10"
        } `}
      >
        <div className="flex justify-between">
          <img src="/assets/landingpage/Images/elips.png" className="h-52" />
          <img
            src="/assets/landingpage/Images/elips2.png"
            className="h-80 md:h-56 mt-10"
          />
        </div>
        <div className="absolute top-0 flex px-10 lg:py-16 ">
          <div className="lg:space-y-7 lg:-mt-10 md:mt-3 mt-10 space-y-7">
            <div className="lg:space-y-3 space-y-3 lg:max-w-[850px] md:max-w-md ">
              <h1 className="lg:text-4xl text-xl font-bold ">
                {t("Ready to Start Earning or Hiring in Just Minutes ?")}
              </h1>
              <p className="lg:text-2xl text-sm font-bold">
                {t("Find Your Next Job or Hire Instantly - All in One App!")}
              </p>
              <img
                src="/assets/landingpage/Phones/home/DualBannerSM.png"
                className="sm:block md:hidden lg:hidden h-[380px]"
              />
              <p className="text-sm md:max-w-sm">
                {t(
                  "Join thousands already finding flexible jobs and reliable workers - all from your phone"
                )}
              </p>
            </div>
            <div className="flex gap-5 lg:justify-start md:justify-start justify-center">
              <img
                src="/assets/landingpage/Images/GooglePlayBlack.png"
                className="h-10 lg:h-16 cursor-pointer"
                onClick={() =>
                  window.open(data?.google_play_store_link, "_blank")
                }
              />
              <img
                src="/assets/landingpage/Images/AppStoreBlack.png"
                className="h-10 lg:h-16 cursor-pointer"
                onClick={() => window.open(data?.ios_store_link, "_blank")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-[30%] md:w-[40%] relative lg:-top-[400px] lg:left-[950px] hidden lg:block md:block md:-top-[286px] md:left-[440px]">
        <img
          src="/assets/landingpage/Phones/DualPhone.png"
          className="lg:h-[400px] h-72 w-full"
        />
      </div>
    </section>
  );
});

export default BannerEnterprises;
