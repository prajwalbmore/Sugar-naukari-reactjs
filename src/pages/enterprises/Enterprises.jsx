import React from "react";
import Badge from "../../components/ui/Badge";
import FeatureSectionEnterprises from "./FeatureSectionEnterprises";
import StepsSectionEnterprises from "./StepsSectionEnterprises";
import EnterprisesFAQs from "./EnterprisesFAQs";
import BannerEnterprises from "./BannerEnterprises";
import { useGetWebsiteGeneralDataQuery } from "../../services/faqApiSlice";
import Spinner from "../../components/ui/Spinner";

const Enterprises = () => {
  const { data, isLoading } = useGetWebsiteGeneralDataQuery();
  if (isLoading) {
    return <Spinner />;
  }
  const studentCards = [
    {
      title: "Instant Access to Local Talent",
      description:
        "Quickly connect with nearby students ready to work, reducing hiring time",
      icon: "/assets/landingpage/Icons/mapPin.png",
    },
    {
      title: "Simple & Fast Job Posting",
      description:
        "Publish jobs with clear criteria in minutes—no lengthy process",
      icon: "/assets/landingpage/Icons/Clock.png",
    },
    {
      title: "Flexible Workforce",
      description: "Hire students with adaptable schedules to match your needs",
      icon: "/assets/landingpage/Icons/Shuffle.png",
    },
    {
      title: "Trusted Quality",
      description: "Two-way reviews ensure reliable, high-quality matches",
      icon: "/assets/landingpage/Icons/starThumpsUp.png",
    },
    {
      title: "Cost-Effective Hiring",
      description: "Save on ads and admin—monthly billing includes all charges",
      icon: "/assets/landingpage/Icons/Wallet.png",
    },
  ];

  return (
    <section className="py-12 space-y-20 ">
      <FeatureSectionEnterprises />

      <StepsSectionEnterprises />

      <BannerEnterprises data={data?.data} />

      <EnterprisesFAQs />
    </section>
  );
};

export default Enterprises;
