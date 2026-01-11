import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Modal from "../../../../components/ui/Modal";
import Button from "../../../../components/ui/Button";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import {
  useGetSponsorsBannerListQuery,
  useViewSubscriptionQuery,
} from "../../../../services/faqApiSlice";
import Spinner from "../../../../components/ui/Spinner";
import ModifiedSubscriptionCard from "../subscription/ModifiedSubscriptionCard";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../../../contexts/auth/context";

const Card = ({ title, children, onClick = () => {}, t }) => (
  <section className="rounded-xl border border-gray-200 bg-gray-200  shadow-sm py-3">
    <header className="px-5 pt-3 flex justify-between">
      <h2 className="text-lg font-semibold text-gray-700">{t(title)}</h2>
      <Button className="bg-dark rounded-full p-2" onClick={onClick}>
        <PencilSquareIcon className="text-white h-5 w-5" />
      </Button>
    </header>
    <div className="px-5 py-2">{children}</div>
  </section>
);

export default function CompanyProfileOverview({
  setActive,
  userData,
  refetch,
  user,
}) {
  const { t } = useTranslation();
  const [isOpen, { open, close }] = useDisclosure(false);
  const { data, isLoading, error } = useGetSponsorsBannerListQuery();
  const { data: viewData, isLoading: viewLoading } = useViewSubscriptionQuery(
    user?.id
  );
  if (isLoading || viewLoading) return <Spinner />;
  const sponsors = data?.data || [];
  const viewSubscriptionPlans = {
    plan_id: viewData?.subscription?.plan_id,
    badgeText: viewData?.subscription?.available_jobs_count,
    title: viewData?.subscription?.plan_name,
    price: `${viewData?.subscription?.plan_price} CHF`,
    validity: `Valid for ${viewData?.subscription?.validity_days} Days`,
    bgColor: "appcolor",
    textColor: "black",
    buttonBg: "black",
    buttonTextColor: "appcolor",
    ...viewData?.subscription,
  };
  const viewCreaditPlans = {
    plan_id: viewData?.credit_packs?.[0]?.plan_id,
    badgeText: viewData?.credit_packs?.[0]?.credits_purchased,
    title: viewData?.credit_packs?.[0]?.plan_name,
    price: `${viewData?.credit_packs?.[0]?.plan_price} CHF`,
    validity: `Valid for ${viewData?.credit_packs?.[0]?.validity_days} Days`,
    bgColor: "appcolor",
    textColor: "black",
    buttonBg: "black",
    buttonTextColor: "appcolor",
    ...viewData?.credit_packs?.[0],
  };
  // const sponsors = [
  //   {
  //     src: "/assets/landingpage/Images/Sponsors/Sponsor1.png",
  //     alt: "Sponsor 1",
  //   },
  //   {
  //     src: "/assets/landingpage/Images/Sponsors/Sponsor2.png",
  //     alt: "Sponsor 2",
  //   },
  //   {
  //     src: "/assets/landingpage/Images/Sponsors/Sponsor1.png",
  //     alt: "Sponsor 1",
  //   },
  //   {
  //     src: "/assets/landingpage/Images/Sponsors/Sponsor2.png",
  //     alt: "Sponsor 2",
  //   },
  // ];
  return (
    <>
      <main className="w-full space-y-6 p-4">
        {/* Personal Information */}
        <Card title="Company Name and Logo" onClick={() => setActive(1)} t={t}>
          <div className="space-y-1 bg-white rounded-xl p-3">
            <div className="flex gap-2 items-center text-xl font-bold">
              <img src={userData?.data?.company_logo} className="h-16" />
              {userData?.data?.company_name}
            </div>
            <p className="text-md font-medium text-gray-900">
              {userData?.data?.industry_type}
            </p>
            <p className="text-md text-gray-600">
              {userData?.data?.employee_count}
            </p>
            <p className="text-md text-gray-600">
              {userData?.data?.office_address}
            </p>
          </div>
        </Card>

        {/* Resume */}
        <Card title="Personal Information" onClick={() => setActive(2)} t={t}>
          <div className="space-y-1 bg-white rounded-xl p-3">
            <p className="text-md font-medium text-gray-900"> {user.name}</p>
            <p className="text-md text-gray-600"> {user?.mobile_number}</p>
            <p className="text-md text-gray-600"> {user?.email}</p>
          </div>
        </Card>

        {/* Education */}
        <Card title="Current Subscription" onClick={open} t={t}>
          <div className="space-y-1 bg-white rounded-xl p-3">
            <p className="text-md font-medium text-gray-900">
              {userData?.data?.subscription_status}
            </p>
          </div>
        </Card>
        <div className="relative">
          <div
            className="flex overflow-x-auto gap-6"
            style={{ scrollbarWidth: "none" }} // Firefox
          >
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="flex-shrink-0 rounded-lg flex items-center justify-center"
                style={{ minWidth: "150px" }}
              >
                <img
                  src={sponsor.image}
                  alt={sponsor.banner_for}
                  className="h-24 sm:h-32 md:h-40 lg:h-48 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Modal open={isOpen} onClose={close} title="My Subscription" size="md">
        <div className="mx-auto">
          {viewData?.subscription ? (
            <ModifiedSubscriptionCard
              {...viewSubscriptionPlans}
              isButton={false}
              can_post_job={viewData?.can_post_job}
            />
          ) : (
            <ModifiedSubscriptionCard
              {...viewCreaditPlans}
              isButton={false}
              can_post_job={viewData?.can_post_job}
            />
          )}
        </div>
      </Modal>
      <style>
        {`
          /* Hide scrollbar for Chrome, Safari and Opera */
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </>
  );
}
