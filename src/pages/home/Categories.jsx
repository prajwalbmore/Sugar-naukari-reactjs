import React from "react";
import Badge from "../../components/ui/Badge";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const categories = [
    {
      title: "For Students",
      description: "Looking for Flexible Gigs?",
      buttonText: "Start Finding Gigs",
      navigation: "/join-as",
      img: "/assets/landingpage/Images/homecategory/banner2.png",
    },
    {
      title: "For Employers",
      description: "Need Reliable Student Talent?",
      buttonText: "Post a Job Now",
      navigation: "/join-as",
      img: "/assets/landingpage/Images/homecategory/banner1.png",
    },
  ];

  return (
    <section className="space-y-10 lg:px-24">
      {/* Header Section */}
      <div className="text-center">
        <Badge text="Who Is It For?" />
        <h2 className="text-3xl lg:text-5xl font-semibold mt-4">
          {t("Earn Easily as a Student. Hire Smarter as a Business")}.
        </h2>
      </div>

      {/* Categories Grid */}
      <div className="flex flex-col lg:flex-row w-full gap-10">
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`bg-homecategoryBg1 bg-cover bg-center bg-no-repeat flex-1 rounded-xl text-center sm:pt-4 lg:pt-10 lg:px-6 space-y-8 `}
          >
            <div>
              <h3 className="text-2xl lg:text-4xl font-bold">{t(cat.title)}</h3>
              <p className="text-lg lg:text-xl">{t(cat.description)}</p>
            </div>
            <button
              onClick={() => navigate(cat.navigation)}
              className="font-semibold inline-flex items-center justify-center bg-black text-white px-6 lg:px-10 py-2 rounded-full shadow hover:opacity-90 transition-opacity duration-200"
            >
              {t(cat.buttonText)}
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </button>
            <img
              src={cat.img}
              className={`${
                cat.title === "For Students" && "lg:h-[327px] w-auto mx-auto"
              }`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
