import { ArrowRight, Check } from "lucide-react";
import React from "react";

const SubscriptionCard = ({
  bgColor = "appcolor",
  textColor = "black",
  buttonTextColor = "appcolor",
  buttonBg = "black",
  badgeText = "",
  title = "Occasional",
  description = "Perfect for occasional or one-time hiring needs.",
  price = "",
  validity = "",
  features = [],
  description2 = "",
  buttonText = "Get started",
  onButtonClick,
}) => {
  return (
    <div
      className={`bg-${bgColor} rounded-3xl px-6 py-6 w-[300px] h-[420px] shadow-lg text-${textColor} flex flex-col`}
    >
      <div className="flex-1">
        {/* Badge */}
        {badgeText && (
          <div className="bg-white text-black px-3 py-1 rounded-full text-xs inline-block mb-3">
            {badgeText}
          </div>
        )}

        {/* Title */}
        <h2 className="text-lg font-bold mb-1">{title}</h2>

        {/* Description */}
        {description && <p className="text-xs mb-4">{description}</p>}

        {/* Price */}
        <div className="text-3xl font-bold mb-1">{price}</div>
        {validity && <p className="text-md mb-4">{validity}</p>}
        {description2 && (
          <p className="text-xs mb-4 max-w-sm">{description2}</p>
        )}

        {/* Features */}
        {features && features.length > 0 && (
          <ul className="space-y-2 mb-4 text-xs">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center">
                <span className="mr-2">
                  <Check />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Button at the bottom */}
      <div className="">
        <button
          className={`bg-${buttonBg} text-${buttonTextColor} w-full py-3 rounded-full flex justify-center items-center hover:opacity-90 transition`}
          onClick={onButtonClick}
        >
          {buttonText}
          <span className="ml-2">
            <ArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
// const pricingTiers = [
//   {
//     bgColor: "appcolor",
//     textColor: "black",
//     buttonTextColor: "appcolor",
//     badgeText: "Pack of 5 Listings",
//     title: "Pack de 1 mois",
//     description: "Perfect for occasional or one-time hiring needs.",
//     price: "75 CHF",
//     validity: "Valid for 30 Days",
//     features: [
//       "Post up to 5 job listings",
//       "Credits valid for 6 months from purchase",
//       "Ideal for small-scale or seasonal recruitment",
//     ],
//     buttonText: "Get started",
//     onButtonClick: () => console.log("Occasional plan selected"),
//   },
//   {
//     badgeText: "Pack of 15 Listings",
//     buttonTextColor: "black",
//     title: "Businesses",
//     description: "For businesses with frequent or ongoing hiring needs.",
//     price: "50 CHF",
//     validity: "Valid for 6 months",
//     features: [
//       "Post up to 15 job listings",
//       "Credits valid for 6 months from purchase",
//       "Great for growing teams or regular staff turnover",
//     ],
//     bgColor: "black",
//     textColor: "white",
//     buttonText: "Get started",
//     buttonBg: "white",
//     onButtonClick: () => console.log("Businesses plan selected"),
//   },
//   {
//     badgeText: "Unlimited",
//     title: "Recruit without limits",
//     description:
//       "Recruit without limits — our best value for high-volume hiring",
//     price: "150 CHF",
//     validity: "Valid for 6 months",
//     features: [
//       "Unlimited job listings",
//       "Valid for 6 months from activation",
//       "Designed for companies with continuous staffing needs",
//     ],
//     bgColor: "appcolor",
//     textColor: "black",
//     buttonText: "Get started",
//     buttonTextColor: "appcolor",

//     onButtonClick: () => console.log("Unlimited plan selected"),
//   },
//   {
//     badgeText: "Unlimited",
//     title: "One Month Free",
//     description: "Unlimited Access",
//     description2:
//       "All newly registered companies enjoy 1 month of free, unlimited job postings — no time limit to activate. Try FASTAFF at no cost and discover the easiest way to hire.",
//     validity: "Valid for 6 months",
//     bgColor: "lightYellow",
//     textColor: "black",
//     buttonText: "Get started",
//     buttonTextColor: "appcolor",

//     onButtonClick: () => console.log("Unlimited plan selected"),
//   },
// ];
