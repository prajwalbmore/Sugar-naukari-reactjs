import React from "react";
import OccasionalCard from "./OccasionalCard";
import Badge from "../../components/ui/Badge";
import { useGetSubscriptionsForWebsiteQuery } from "../../services/faqApiSlice";
import ModifiedSubscriptionCardWeb from "./ModifiedSubscriptionCardWeb";
import Spinner from "../../components/ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const pricingTiers = [
  {
    bgColor: "appcolor",
    textColor: "black",
    buttonTextColor: "appcolor",
    badgeText: "Pack of 5 Listings",
    title: "Occasional",
    description: "Perfect for occasional or one-time hiring needs.",
    price: "25 CHF",
    validity: "Valid for 6 months",
    features: [
      "Post up to 5 job listings",
      "Credits valid for 6 months from purchase",
      "Ideal for small-scale or seasonal recruitment",
    ],
    buttonText: "Get started",
    onButtonClick: () => console.log("Occasional plan selected"),
  },
  {
    badgeText: "Pack of 15 Listings",
    buttonTextColor: "black",
    title: "Businesses",
    description: "For businesses with frequent or ongoing hiring needs.",
    price: "50 CHF",
    validity: "Valid for 6 months",
    features: [
      "Post up to 15 job listings",
      "Credits valid for 6 months from purchase",
      "Great for growing teams or regular staff turnover",
    ],
    bgColor: "black",
    textColor: "white",
    buttonText: "Get started",
    buttonBg: "white",
    onButtonClick: () => console.log("Businesses plan selected"),
  },
  {
    badgeText: "Unlimited",
    title: "Recruit without limits",
    description:
      "Recruit without limits — our best value for high-volume hiring",
    price: "150 CHF",
    validity: "Valid for 6 months",
    features: [
      "Unlimited job listings",
      "Valid for 6 months from activation",
      "Designed for companies with continuous staffing needs",
    ],
    bgColor: "appcolor",
    textColor: "black",
    buttonText: "Get started",
    buttonTextColor: "appcolor",
    onButtonClick: () => console.log("Unlimited plan selected"),
  },
];
const Pricing = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetSubscriptionsForWebsiteQuery();
  const navigate = useNavigate();
  if (isLoading) {
    return <Spinner />;
  }
  const formatPlans = (plans, isCredit = false) =>
    plans?.map((plan, index) => {
      const isEvenIndex = index % 2 === 0;
      return {
        plan_id: plan?.plan_id,
        badgeText: isCredit ? `${plan?.credits} Jobs` : plan?.jobs_count,
        title: plan?.plan_name,
        price: `${plan?.price} CHF`,
        validity: `Valid for ${plan?.validity_days} Days`,
        buttonText: "Get started",
        bgColor: isEvenIndex ? "appcolor" : "black",
        textColor: isEvenIndex ? "black" : "white",
        buttonBg: isEvenIndex ? "black" : "white",
        buttonTextColor: isEvenIndex ? "appcolor" : "black",
        ...plan,
      };
    });

  const subscriptionPlans = formatPlans(data?.subscription_plans);
  const creditPacks = formatPlans(data?.credit_packs, true);
  return (
    <section className="py-6 px-4 sm:px-6 md:px-12 lg:px-24">
      {/* Header */}
      <div className="text-center">
        <Badge text="Pricing" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mt-4">
          {/* {t("Flexible Hiring. Scalable Plans.")} */}
          {t("Plans Are Exclusively For Employers,")}
        </h2>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mt-4 text-[#594E1F]">{t("Students Enjoy Free Access.")}</h1>
        <p className="mt-2 sm:mt-3 md:mt-4 text-gray-600 text-sm sm:text-base md:text-lg">
          {t(
            "Flexible plans for every employer — from one-time posts to unlimited job listings."
          )}
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Subscription Plans */}
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5">
            {t("Subscription Plans")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {subscriptionPlans.map((tier) => (
              <ModifiedSubscriptionCardWeb
                key={tier.plan_id}
                {...tier}
                onButtonClick={() => navigate("/join-as", { state: "/login" })}
              />
            ))}
          </div>
        </div>

        {/* Credit Packs */}
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5">
            {t("Credit Packs")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {creditPacks.map((tier) => (
              <ModifiedSubscriptionCardWeb
                key={tier.plan_id}
                {...tier}
                onButtonClick={() => navigate("/join-as", { state: "/login" })}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Introductory Offer */}
      <div className="bg-[#FFF5CC] border-2 border-[#FFDE59] rounded-2xl mt-10 p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="text-center flex flex-col items-center">
          <span className="bg-white text-[#736428] font-medium rounded-full px-3 sm:px-5 py-1 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 inline-block">
            {t("Introductory Offer")}
          </span>
          <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2">
            <span className="italic">
              {t("One Month Free – Unlimited Access")}
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-semibold max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto">
            {t(
              "All newly registered companies enjoy 1 month of free, unlimited job postings — no time limit to activate."
            )}
            <br />
            {t("Try FASTAFF at no cost and discover the easiest way to hire.")}
          </p>

          {/* Illustration */}
          <div className="flex justify-center items-start mt-4 sm:mt-6">
            <img
              src="/assets/landingpage/pricing.png"
              alt="pricing"
              className="h-40 sm:h-52 md:h-60 lg:h-72 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
// <section className="py-8 px-4 sm:px-6 md:px-12 lg:px-24">
//   {/* Header */}
//   <div className="text-center">
//     <Badge text="Pricing" />
//     <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mt-4">
//       Flexible Hiring. Scalable Plans.
//     </h2>
//     <p className="mt-2 sm:mt-4 text-gray-600 text-sm sm:text-base md:text-lg">
//       Flexible plans for every employer — from one-time posts to unlimited
//       job listings.
//     </p>
//   </div>

//   {/* Pricing Cards */}

//   <div className="flex flex-wrap gap-5 w-full ">
//     <div>
//       <h2 className="text-2xl font-bold mb-5">Subscription Plans</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
//         {subscriptionPlans.map((tier) => (
//           <ModifiedSubscriptionCardWeb
//             key={tier.plan_id}
//             {...tier}
//             onButtonClick={() => {
//               navigate("/join-as", { state: "/login" });
//             }}
//           />
//         ))}
//       </div>
//     </div>

//     <div>
//       <h2 className="text-2xl font-bold mb-5">Credit Packs</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
//         {creditPacks.map((tier) => (
//           <ModifiedSubscriptionCardWeb
//             key={tier.plan_id}
//             {...tier}
//             onButtonClick={() => {
//               navigate("/join-as", { state: "/login" });
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   </div>

//   {/* Introductory Offer */}
//   <div className="bg-[#FFF5CC] border-2 border-[#FFDE59] rounded-2xl mx-4 sm:mx-6 md:mx-12 lg:mx-24 my-8 p-6 sm:p-8 md:p-10">
//     <div className="text-center flex flex-col items-center">
//       <span className="bg-white text-[#736428] font-medium rounded-full px-4 sm:px-5 py-1 text-sm sm:text-lg mb-4 sm:mb-5 inline-block">
//         Introductory Offer
//       </span>
//       <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl mb-2">
//         <span className="italic">One Month Free – Unlimited Access</span>
//       </h1>
//       <p className="text-sm sm:text-base md:text-lg font-semibold max-w-xl sm:max-w-2xl md:max-w-5xl mx-auto">
//         All newly registered companies enjoy 1 month of free, unlimited job
//         postings — no time limit to activate.
//         <br />
//         Try FASTAFF at no cost and discover the easiest way to hire.
//       </p>

//       {/* Illustration */}
//       <div className="flex justify-center items-start mt-4 sm:mt-6">
//         <img
//           src="/assets/landingpage/pricing.png"
//           alt="pricing"
//           className="h-40 sm:h-52 md:h-60 object-contain"
//         />
//       </div>
//     </div>
//   </div>
// </section>
// import React from "react";
// import OccasionalCard from "./OccasionalCard";
// import Badge from "../../components/ui/Badge";
// import { Sparkle } from "lucide-react";

// const Pricing = () => {
//   const pricingTiers = [
//     {
//       bgColor: "appcolor",
//       textColor: "black",
//       buttonTextColor: "appcolor",
//       badgeText: "Pack of 5 Listings",
//       title: "Occasional",
//       description: "Perfect for occasional or one-time hiring needs.",
//       price: "25 CHF",
//       validity: "Valid for 6 months",
//       features: [
//         "Post up to 5 job listings",
//         "Credits valid for 6 months from purchase",
//         "Ideal for small-scale or seasonal recruitment",
//       ],
//       buttonText: "Get started",
//       onButtonClick: () => console.log("Occasional plan selected"),
//     },
//     {
//       badgeText: "Pack of 15 Listings",
//       buttonTextColor: "black",
//       title: "Businesses",
//       description: "For businesses with frequent or ongoing hiring needs.",
//       price: "50 CHF",
//       validity: "Valid for 6 months",
//       features: [
//         "Post up to 15 job listings",
//         "Credits valid for 6 months from purchase",
//         "Great for growing teams or regular staff turnover",
//       ],
//       bgColor: "black",
//       textColor: "white",
//       buttonText: "Get started",
//       buttonBg: "white",
//       onButtonClick: () => console.log("Businesses plan selected"),
//     },
//     {
//       badgeText: "Unlimited",
//       title: "Recruit without limits",
//       description:
//         "Recruit without limits — our best value for high-volume hiring",
//       price: "150 CHF",
//       validity: "Valid for 6 months",
//       features: [
//         "Unlimited job listings",
//         "Valid for 6 months from activation",
//         "Designed for companies with continuous staffing needs",
//       ],
//       bgColor: "appcolor",
//       textColor: "black",
//       buttonText: "Get started",
//       buttonTextColor: "appcolor",

//       onButtonClick: () => console.log("Unlimited plan selected"),
//     },
//   ];

//   return (
//     <section className="py-8 px-24">
//       <div className="text-center">
//         <Badge text="Pricing" />
//         <h2 className="text-5xl font-semibold">
//           Flexible Hiring. Scalable Plans.
//         </h2>
//         <p className="mt-4 text-gray-600">
//           Flexible plans for every employer — from one-time posts to unlimited
//           job listings.
//         </p>
//       </div>
//       <div className="mt-10 flex flex-col md:flex-row w-full mx-auto justify-center items-center gap-10">
//         {pricingTiers.map((tier, index) => (
//           <OccasionalCard key={index} {...tier} />
//         ))}
//       </div>
//       <div className="bg-[#FFF5CC] border-2 border-[#FFDE59] rounded-2xl mx-auto my-8 p-8">
//         <div className="text-center flex flex-col items-center">
//           <span className="bg-white text-[#736428] font-medium rounded-full px-5 py-1 text-lg mb-5 inline-block">
//             Introductory Offer
//           </span>
//           <h1 className="font-[800] text-5xl mb-2">
//             <span className="italic">One Month Free – Unlimited Access</span>
//           </h1>
//           <p className="text-lg font-semibold max-w-5xl mx-auto ">
//             All newly registered companies enjoy 1 month of free, unlimited job
//             postings — no time limit to activate.
//             <br />
//             Try FASTAFF at no cost and discover the easiest way to hire.
//           </p>
//           {/* Illustration Placeholder */}
//           <div className="flex justify-center items-start">
//             <img
//               src="/assets/landingpage/pricing.png"
//               alt="pricing"
//               className="h-60"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Pricing;
