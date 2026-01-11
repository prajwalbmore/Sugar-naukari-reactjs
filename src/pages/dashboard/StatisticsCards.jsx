import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth/context";

const StatisticsCards = ({ cards, isNavigate }) => {
  const { t } = useTranslation();
  const { userType } = useAuthContext();
  return (
    <section className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map(
          ({
            title,
            value,
            bg,
            iconBg = "bg-white",
            Icon,
            isNavigate,
            index,
          }) => (
            <Link
              key={title}
              className={`relative ${bg} rounded-2xl text-white overflow-hidden shadow-md h-28 px-4 flex items-center`}
              to={
                isNavigate
                  ? userType === "employee"
                    ? "/dashboard/applications"
                    : "/dashboard/jobs-listing"
                  : "#"
              }
              state={{ index: index }}
            >
              <div className="flex-1">
                <p className="text-md font-medium">{t(title)}</p>
                <p className="mt-2 text-4xl font-bold">{value}</p>
              </div>
              <div className="relative">
                <div
                  className={`${iconBg} h-12 w-12 rounded-full grid place-items-center shadow-sm`}
                  aria-label={title}
                >
                  <Icon className="h-6 w-6 text-black" />
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
};

export default StatisticsCards;
