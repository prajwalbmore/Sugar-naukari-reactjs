import React from "react";
import Badge from "../../components/ui/Badge";
import Accordion from "../../components/ui/Accordion";
import { useGetFAQQuery } from "../../services/faqApiSlice";
import Spinner from "../../components/ui/Spinner";
import { useTranslation } from "react-i18next";

const FAQs = [
  {
    title: "What is Fastaff?",
    description: `CashEase is an e-wallet app that allows you to store money, make payments, and perform other financial transactions electronically through your mobile device.`,
  },
  {
    title: "How do I download and install the Fastaff app?",
    description: `FASTAFF ensures smooth payments after each completed mission. 
      The exact process may vary depending on the client, but you’ll always 
      be able to track and manage your earnings in your dashboard.`,
  },
  {
    title: "Can I transfer money from Fastaff to my bank account?",
    description: `Yes! FASTAFF gives you the freedom to select assignments 
      that best suit your schedule, skills, and interests.`,
  },
  {
    title: "Is Fastaff compatible with all types of devices?",
    description: `Absolutely. FASTAFF is fully responsive and works across 
      desktops, tablets, and mobile devices.`,
  },
  {
    title: " How can I contact Fastaff customer support if I encounter issues?",
    description: `You can easily reach our support team through the in-app 
      chat feature or via email. We’re available 24/7 to help you.`,
  },
];

const EnterprisesFAQs = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetFAQQuery("employer");
  if (isLoading) {
    return <Spinner />;
  }
  const faqs = data?.data?.map((faq) => ({
    title: faq?.question,
    description: faq?.answer,
  }));
  return (
    <section className="space-y-10 px-6 lg:px-24 md:px-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <Badge text="Questions" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mt-4">
          {t("Frequently Asked Questions")}
        </h2>
      </div>

      {/* FAQ List */}
      <div className="space-y-5 px-4">
        {faqs.map((item, index) => (
          <Accordion key={index} title={item.title}>
            {item.description}
          </Accordion>
        ))}
      </div>
    </section>
  );
};

export default EnterprisesFAQs;
