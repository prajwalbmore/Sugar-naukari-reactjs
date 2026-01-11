import React from "react";
import { useTranslation } from "react-i18next";

const Section = ({ title, children, t }) => (
  <section className="">
    <h2 className="text-2xl font-bold text-slate-800">{t(title)}</h2>
    <p className="mt-4 text-slate-600 leading-7">{children}</p>
    <hr className="mt-8 border-t border-slate-200" />
  </section>
);
const Stars = ({ value = 0, outOf = 5 }) => {
  const full = Math.floor(value);
  const hasHalf = value % 1 >= 0.5;
  const empty = outOf - full - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {Array.from({ length: full }).map((_, i) => (
          <span key={`f-${i}`} className="text-amber-400">
            ★
          </span>
        ))}
        {hasHalf && (
          <span className="text-amber-400 relative">
            <span className="text-gray-300">★</span>
            <span className="absolute inset-0 w-1/2 overflow-hidden text-amber-400">
              ★
            </span>
          </span>
        )}
        {Array.from({ length: empty }).map((_, i) => (
          <span key={`e-${i}`} className="text-gray-300">
            ★
          </span>
        ))}
      </div>
      <span className="text-xs text-gray-500">{value}</span>
    </div>
  );
};
const reviews = [
  {
    user: {
      name: "Dale",
      avatar: "/assets/landingpage/Images/avatar/Avatar1.png",
    },
    rating: 5,
  },
  {
    user: {
      name: "Dale",
      avatar: "/assets/landingpage/Images/avatar/Avatar2.png",
    },
    rating: 4,
  },
  {
    user: {
      name: "Dale",
      avatar: "/assets/landingpage/Images/avatar/Avatar3.png",
    },
    rating: 2,
  },
];

const AboutCompany = ({ jobData }) => {
  const { t } = useTranslation();

  const { about_company, work_environment_culture, office_address } = jobData;
  const reviews = jobData?.reviews.map((rev) => ({
    user: {
      name: rev.employee_name,
      avatar: rev.profile_image,
    },
    rating: rev.total_rating,
  }));
  return (
    <div className="p-6 bg-white">
      <Section title="About Company" t={t}>
        {about_company}
      </Section>

      <Section title="Work Environment and Culture" t={t}>
        {work_environment_culture}
      </Section>

      <Section title="Company Locations/Branches" t={t}>
        {office_address}
      </Section>
      {/* Reviews */}
      {/* {!isCompanyDetail && ( */}
      <div>
        <h4 className="mt-8 text-2xl font-bold">
          {t("Reviews")} ({reviews.length})
        </h4>
        <div className="mt-4 overflow-x-auto">
          <div className="flex space-x-4 px-2">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="min-w-[200px] bg-white p-4 rounded-lg shadow"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={review.user.avatar}
                    alt={review.user.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <h6 className="font-medium">{review.user.name}</h6>
                </div>
                <div className="mt-2">
                  <Stars value={review.rating} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default AboutCompany;
