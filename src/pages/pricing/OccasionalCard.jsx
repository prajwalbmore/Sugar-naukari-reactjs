import { ArrowRight, Check } from "lucide-react";
import React from "react";

const OccasionalCard = ({
  bgColor = "appcolor",
  textColor = "black",
  buttonTextColor = "appcolor",
  buttonBg = "black",
  badgeText = "Pack of 5 Listings",
  title = "Occasional",
  description = "Perfect for occasional or one-time hiring needs.",
  price = "25 CHF",
  validity = "Valid for 6 months",
  features = [
    "Post up to 5 job listings",
    "Credits valid for 6 months from purchase",
    "Ideal for small-scale or seasonal recruitment",
  ],
  buttonText = "Get started",
  onButtonClick,
}) => {
  return (
    <div
      className={`bg-${bgColor} rounded-3xl px-10 py-6 max-w-sm shadow-lg text-${textColor}`}
    >
      {/* Badge */}
      {badgeText && (
        <div className="bg-white text-black px-3 py-1 rounded-full text-sm inline-block mb-3">
          {badgeText}
        </div>
      )}

      {/* Title */}
      <h2 className="text-2xl font-bold mb-1">{title}</h2>

      {/* Description */}
      {description && <p className="text-lg mb-4">{description}</p>}

      {/* Price */}
      <div className="text-3xl font-bold mb-1">{price}</div>
      {validity && <p className="text-md mb-4">{validity}</p>}

      {/* Features */}
      {features && features.length > 0 && (
        <ul className="space-y-2 mb-4 text-xl">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center">
              <span className="mr-2">
                <Check />
              </span>{" "}
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* Button */}
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
  );
};

export default OccasionalCard;
