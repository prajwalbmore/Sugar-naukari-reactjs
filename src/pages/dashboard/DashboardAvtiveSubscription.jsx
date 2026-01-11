import React from "react";
import { useAuthContext } from "../../contexts/auth/context";
import { useViewSubscriptionQuery } from "../../services/faqApiSlice";
import { useTranslation } from "react-i18next";

const DashboardActiveSubscription = () => {
  const { user } = useAuthContext();
  const { t } = useTranslation();

  const {
    data: viewData,
    isLoading,
    isFetching,
    error,
  } = useViewSubscriptionQuery(user?.id, { skip: !user?.id });

  // Initial load
  if (isLoading) {
    return <div className="p-4 text-sm text-gray-600">{t("Loading...")}</div>;
  }

  // Error
  if (error) {
    return (
      <div className="p-4 rounded border border-red-200 text-red-700 bg-red-50">
        {t("Failed to load subscription data")}.
      </div>
    );
  }

  const subscription = viewData?.subscription ?? null;
  const creditPack =
    Array.isArray(viewData?.credit_packs) && viewData.credit_packs.length > 0
      ? viewData.credit_packs[0]
      : null;

  const subscriptionCard = subscription && {
    plan_id: subscription.plan_id,
    badgeText: subscription.available_jobs_count ?? 0,
    title: subscription.plan_name ?? t("Subscription"),
    price: subscription.plan_price
      ? `${subscription.plan_price} CHF`
      : t("Price not available"),
    validity: subscription.validity_days
      ? `${t("Valid for")} ${subscription.validity_days} ${t("Days")}`
      : t("Validity not available"),
    bgColorKey: "appcolor",
    type: "Subscription",
  };

  const creditCard = creditPack && {
    plan_id: creditPack.plan_id,
    badgeText: creditPack.credits_purchased ?? 0,
    title: creditPack.plan_name ?? t("Credit Pack"),
    price: creditPack.plan_price
      ? `${creditPack.plan_price} CHF`
      : t("Price not available"),
    validity: creditPack.validity_days
      ? `${t("Valid for")} ${creditPack.validity_days} ${t("Days")}`
      : t("Validity not available"),
    bgColorKey: "appcolor",
    type: "Credit",
    remaining: creditPack?.remaining_credits,
  };

  const cards = [subscriptionCard, creditCard].filter(Boolean);

  if (cards.length === 0) {
    return (
      <div className="p-4 rounded border border-gray-200 bg-gray-50 text-gray-600">
        {t("No active subscription or credits found")}.
      </div>
    );
  }

  const cardClasses =
    "p-5 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between w-full ";

  return (
    <section className="">
      {cards.map((card) => (
        <div
          key={card.plan_id}
          className={`${cardClasses} ${isFetching ? "opacity-80" : ""}`}
        >
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800">
              {card.title}
            </h3>
            <span className="text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">
              {card.type}
            </span>
          </div>

          <div className="mt-3 space-y-2">
            <p className="text-gray-600">{card.price}</p>
            <p className="text-gray-500 text-sm">{card.validity}</p>
          </div>

          <div className="mt-4">
            <h2 className="text-sm font-bold mb-2">
              {t("Remaining Credits")} : {card?.remaining}
            </h2>
            <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
              {card.type === "Subscription"
                ? `${t("Available Jobs")}: ${card.badgeText}`
                : `${t("Credits Purchased")}: ${card.badgeText}`}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default DashboardActiveSubscription;
