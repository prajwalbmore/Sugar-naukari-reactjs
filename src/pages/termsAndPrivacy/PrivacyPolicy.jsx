import React from "react";
import { useTermsAndConditionPrivacyQuery } from "../../services/faqApiSlice";
import Spinner from "../../components/ui/Spinner";

const PrivacyPolicy = () => {
  const { data, isLoading, isError } =
    useTermsAndConditionPrivacyQuery("privacy");

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <p className="text-center text-red-500 py-8">
        Failed to load privacy policy.
      </p>
    );

  const content = data?.data?.content || "";

  return (
    <section className="py-8 px-4 sm:px-6 md:px-12 lg:px-24">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Conditions Générales pour les Employeurs – Fastaff
      </h1>
      <div
        className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line"
        dangerouslySetInnerHTML={{
          __html: content
            .replace(/\r?\n/g, "<br/>") // Convert newlines to <br/>
            .replace(/\\u00e9/g, "é")
            .replace(/\\u00e0/g, "à")
            .replace(/\\u00e8/g, "è")
            .replace(/\\u00f4/g, "ô")
            .replace(/\\u00e7/g, "ç")
            .replace(/\\u2019/g, "’")
            .replace(/\\u2022/g, "•")
            .replace(/\\ud83d\\udce7/g, "📧")
            .replace(/\\ud83d\\udcde/g, "📞"),
        }}
      />
    </section>
  );
};

export default PrivacyPolicy;
