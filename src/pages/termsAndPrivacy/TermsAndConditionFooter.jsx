import React from "react";
import { useTermsAndConditionPrivacyQuery } from "../../services/faqApiSlice";
import Spinner from "../../components/ui/Spinner";

const TermsAndConditionFooter = () => {
  const { data, isLoading, isError } =
    useTermsAndConditionPrivacyQuery("term-n-condition");

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <p className="text-center text-red-500 py-8">
        Failed to load terms and conditions.
      </p>
    );

  return (
    <section className="py-8 px-4 sm:px-6 md:px-12 lg:px-24">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Conditions Générales pour les Employeurs
      </h1>
      <div
        className="prose max-w-none text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: data?.data?.content
            ?.replace(/\n/g, "<br/>") // convert line breaks
            ?.replace(/\\u00e9/g, "é") // handle escaped unicode
            ?.replace(/\\u00e0/g, "à")
            ?.replace(/\\u00e8/g, "è")
            ?.replace(/\\u00f4/g, "ô"),
        }}
      />
    </section>
  );
};

export default TermsAndConditionFooter;
