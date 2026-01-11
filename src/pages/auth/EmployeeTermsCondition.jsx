import React from "react";
import Button from "../../components/ui/Button";
import { useGetTermsAndConditionsQuery } from "../../services/faqApiSlice";
import { useTranslation } from "react-i18next";

const EmployeeTermsCondition = ({ onBack, submitForm }) => {
  const { t } = useTranslation();
  const { data: termsAndConditions } = useGetTermsAndConditionsQuery();
  return (
    <div className="flex flex-col items-center md:max-w-3xl lg:max-w-5xl justify-center bg-white rounded-xl ">
      <div className="mx-10">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mt-4">
          {t("Terms and Condition")}
        </h1>
        <p className="text-center text-gray-500 text-xs mt-2 ">
          {t(`Welcome to Fast aff, a platform designed to connect daily wage
          employees and employers. By using our platform, you agree to comply
          with and be bound by the following terms and conditions`)}
        </p>

        <hr className="my-6" />

        {/* Terms List */}
        <div className="whitespace-pre-line max-h-96 overflow-y-auto text-justify text-xs md:text-sm">
          {termsAndConditions?.data?.content}
        </div>

        <hr className="my-6" />

        {/* Action Buttons */}
        <div className="w-full my-4 flex justify-end gap-4">
          <Button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border rounded-md bg-gray-100 text-base font-semibold"
          >
            {t("Cancel")}
          </Button>
          <Button
            type="submit" // 👉 Final Formik submit
            className="px-6 py-2 bg-black text-white rounded-md text-base font-semibold"
          >
            {t("Create Profile")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTermsCondition;
