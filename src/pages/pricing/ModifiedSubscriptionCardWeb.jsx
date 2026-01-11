import { ArrowRight, Check } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

const ModifiedSubscriptionCardWeb = ({
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
  isButton = true,
  can_post_job = false,
  subscription_end_date = "",
  date_of_payment,
  amount_paid,
  invoice_no,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={`bg-${bgColor} rounded-3xl px-6 py-6 w-[300px] shadow-lg text-${textColor} flex flex-col`}
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

        {/* Price */}
        <div className="text-3xl font-bold mb-1">{price}</div>
        {validity && <p className="text-md mb-4">{validity}</p>}
        {description2 && (
          <p className="text-xs mb-4 max-w-sm">{description2}</p>
        )}
      </div>
      {can_post_job && (
        <div>
          <p>
            {t("Your Plan is active till date")} {subscription_end_date}
          </p>
          <div>
            <p className="font-bold">{t("Billing")}</p>
            <p>
              {t("Invoice Number")} : {invoice_no}{" "}
            </p>
            <p>
              {t("Date of Payment")} :{date_of_payment}{" "}
            </p>
            <p>
              {t("Amount Paid")} :{amount_paid}
            </p>
          </div>
        </div>
      )}

      {/* Button at the bottom */}
      {isButton && (
        <div className="">
          <button
            className={`bg-${buttonBg} text-${buttonTextColor} w-full py-3 rounded-full flex justify-center items-center hover:opacity-90 transition`}
            onClick={onButtonClick}
          >
            {t(buttonText)}
            <span className="ml-2">
              <ArrowRight />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ModifiedSubscriptionCardWeb;
