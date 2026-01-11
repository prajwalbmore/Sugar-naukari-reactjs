import React from "react";
import Badge from "../../components/ui/Badge";
import FeaturedAbout from "./FeaturedAbout";
import CoreValues from "./CoreValues";
import BenefitsSectionAbout from "./BenefitsSectionAbout";
import MissionVision from "./MissionVision";
import BannerAbout from "./BannerAbout";
import FounderSection from "./FounderSection";
import { useGetWebsiteGeneralDataQuery } from "../../services/faqApiSlice";
import Spinner from "../../components/ui/Spinner";
import useMediaQuery from "../../utils/useMediaQuery";
import FounderSectionXL from "./FounderSectionXL";

export default function About() {
  const { data, isLoading } = useGetWebsiteGeneralDataQuery();
  const isSmallLaptop = useMediaQuery("(min-width: 1366px)");
  const isMidSizeLaptop = useMediaQuery("(min-width: 1440px)");
  const isFullHD = useMediaQuery("(min-width: 1920px)");
  const isRetinaLarge = useMediaQuery("(min-width: 2560px)");
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className="space-y-20">
      <FeaturedAbout data={data?.data} />
      <MissionVision />
      {isRetinaLarge || isFullHD || isMidSizeLaptop || isSmallLaptop ? (
        <FounderSectionXL />
      ) : (
        <FounderSection />
      )}
      <CoreValues />
      <BenefitsSectionAbout />
      <BannerAbout />
    </section>
  );
}
