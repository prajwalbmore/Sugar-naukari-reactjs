import React, { useEffect, useRef, useState } from "react";
import ModifiedSubscriptionCard from "./ModifiedSubscriptionCard";
import {
  useCancelPaymentMutation,
  useGetSubscriptionsQuery,
  useSubscriptionHistoryQuery,
  useSuccessPaymentMutation,
  useViewSubscriptionQuery,
} from "../../../../services/faqApiSlice";
import { useAuthContext } from "../../../../contexts/auth/context";
import Spinner from "../../../../components/ui/Spinner";
import Modal from "../../../../components/ui/Modal";
import PaymentPage from "./PaymentPageModal";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentStatusModal from "./PaymentStatusModal";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import { useTranslation } from "react-i18next";
import ReusableTable from "../../../../components/ui/ReusableTable";
import ModifiedSubscriptionCardHorizontal from "./ModifiedSubscriptionCardHorizontal";
import { useRefreshToken } from "../../../../utils/refreshToken";

const Subscription = () => {
  const { t } = useTranslation();
  const [successPayment] = useSuccessPaymentMutation();
  const [cancelPayment] = useCancelPaymentMutation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { data, isLoading, refetch } = useGetSubscriptionsQuery(user?.id);
  const {
    data: historyData,
    isLoading: historyisLoading,
    refetch: historyrefetch,
  } = useSubscriptionHistoryQuery();
  const {
    data: viewData,
    isLoading: viewLoading,
    refetch: viewRefetch,
  } = useViewSubscriptionQuery(user?.id);

  const [isOpen, { open, close }] = useDisclosure(false);
  const [isOpenStatus, { open: openStatus, close: closeStatus }] =
    useDisclosure(false);
  const [selected, setSelected] = useState({});
  const [cupounStatus, setStatus] = useState("");

  const location = useLocation(); // ✅ get location from react-router
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");
  const status = queryParams.get("status");
  const refreshUser = useRefreshToken();
  const runCount = useRef(0);

  useEffect(() => {
    const refresh = async () => {
      try {
        await refreshUser();
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    };

    if (status === "success" && runCount.current < 2) {
      refresh();
      runCount.current += 1;
    }
  }, [status, refreshUser]);

  // Open status modal if sessionId exists
  useEffect(() => {
    if (sessionId) {
      openStatus();
    }
  }, [sessionId, openStatus]);

  // Handle payment status once
  useEffect(() => {
    const handlePaymentStatus = async () => {
      if (sessionId && status === "success") {
        console.log("status", status);
        await successPayment(sessionId).unwrap();
      } else if (sessionId) {
        console.log("status", status);
      }
    };
    handlePaymentStatus();
  }, [sessionId, status, successPayment]);

  if (isLoading || viewLoading) return <Spinner />;

  const formatPlans = (plans, isCredit = false) =>
    plans?.map((plan, index) => {
      const isEvenIndex = index % 2 === 0;
      return {
        plan_id: plan?.plan_id,
        badgeText: isCredit ? `${plan?.credits} Jobs` : plan?.jobs_count,
        title: plan?.plan_name,
        price: `${plan?.price} CHF`,
        validity: `Valid for ${plan?.validity_days} Days`,
        buttonText: "Get started",
        bgColor: isEvenIndex ? "appcolor" : "black",
        textColor: isEvenIndex ? "black" : "white",
        buttonBg: isEvenIndex ? "black" : "white",
        buttonTextColor: isEvenIndex ? "appcolor" : "black",
        ...plan,
      };
    });

  const subscriptionPlans = formatPlans(data?.subscription_plans);
  const creditPacks = formatPlans(data?.credit_packs, true);
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
    type: "Subscription",
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
    type: "Credit",
    ...viewData?.credit_packs?.[0],
  };
  const subscriptionColumn = [
    { key: "srNo", label: "Sr No" },
    { key: "plan_name", label: "Plan Name" },
    { key: "subscription_start_date", label: "Start Date" },
    { key: "subscription_end_date", label: "End Date" },
    { key: "subscription_status", label: "Status" },
    { key: "subscription_price", label: "Price (CHF)" },
    { key: "paid_amount", label: "Paid Amount (CHF)" },
    { key: "invoice_no", label: "Invoice No" },
    { key: "transaction_id", label: "Transaction ID" },
    { key: "payment_status", label: "Payment Status" },
    { key: "is_coupon_apply", label: "Coupon Applied" },
  ];
  const subscriptionData =
    historyData?.data.map((history, index) => ({
      srNo: index + 1,
      ...history,
    })) || [];
  const creditColumn = [];
  const creditData = [];
  return (
    <section className="flex w-full">
      {viewData?.can_post_job ? (
        viewData?.subscription ? (
          <div className="space-y-5 w-full p-4">
            <div className="hidden sm:block">
              <ModifiedSubscriptionCardHorizontal
                {...viewSubscriptionPlans}
                isButton={false}
                can_post_job={viewData?.can_post_job}
              />
            </div>
            <div className="block md:hidden mx-auto">
              <ModifiedSubscriptionCard
                {...viewSubscriptionPlans}
                isButton={false}
                can_post_job={viewData?.can_post_job}
              />
            </div>
            <ReusableTable
              title="Subscription History"
              columns={subscriptionColumn}
              data={subscriptionData}
              isDateFilter={false}
            />
          </div>
        ) : (
          <div className="space-y-5 w-full p-4">
            <div className="hidden sm:block">
              <ModifiedSubscriptionCardHorizontal
                {...viewCreaditPlans}
                isButton={false}
                can_post_job={viewData?.can_post_job}
                ifCredit={true}
              />
            </div>
            <div className="block md:hidden mx-auto">
              <ModifiedSubscriptionCard
                {...viewCreaditPlans}
                isButton={false}
                can_post_job={viewData?.can_post_job}
                ifCredit={true}
              />
            </div>
            <ReusableTable
              title="Credit History"
              columns={subscriptionColumn}
              data={subscriptionData}
              isDateFilter={false}
            />
          </div>
        )
      ) : (
        <div className="flex flex-wrap gap-5 w-full ">
          <div>
            <h2 className="text-2xl font-bold mb-5">
              {t("Subscription Plans")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
              {subscriptionPlans.map((tier) => (
                <ModifiedSubscriptionCard
                  key={tier.plan_id}
                  {...tier}
                  onButtonClick={() => {
                    setSelected(tier);
                    open();
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-5">{t("Credit Packs")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
              {creditPacks.map((tier) => (
                <ModifiedSubscriptionCard
                  key={tier.plan_id}
                  {...tier}
                  onButtonClick={() => {
                    setSelected(tier);
                    open();
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <Modal
        open={isOpen}
        onClose={close}
        size="md"
        title="Complete Your Payment"
      >
        <PaymentPage
          selected={selected}
          onClose={close}
          openStatus={openStatus}
          t={t}
          viewRefetch={viewRefetch}
          refetch={refetch}
          setStatus={setStatus}
        />
      </Modal>

      <Modal
        open={isOpenStatus}
        onClose={() => {
          navigate("/dashboard/subscription");
          closeStatus();
          viewRefetch();
          refetch();
        }}
        size="md"
        title="Payment status"
      >
        <PaymentStatusModal t={t} couponSuccess={cupounStatus} />
      </Modal>
    </section>
  );
};

export default Subscription;
// import React, { useEffect, useState } from "react";
// import ModifiedSubscriptionCard from "./ModifiedSubscriptionCard";
// import {
//   useCancelPaymentMutation,
//   useGetSubscriptionsQuery,
//   useSuccessPaymentMutation,
// } from "../../../../services/faqApiSlice";
// import { useAuthContext } from "../../../../contexts/auth/context";
// import Spinner from "../../../../components/ui/Spinner";
// import SideDrawer from "../../../../components/ui/SideDrawer";
// import { useDisclosure } from "../../../../hooks/useDisclosure";
// import Modal from "../../../../components/ui/Modal";
// import PaymentPage from "./PaymentPageModal";
// import { useLocation, useParams } from "react-router-dom";
// import PaymentStatusModal from "./PaymentStatusModal";

// const Subscription = () => {
//   const [succesPayment] = useSuccessPaymentMutation();
//   const [cancelPayment] = useCancelPaymentMutation();

//   const { user } = useAuthContext();
//   const { data, isLoading } = useGetSubscriptionsQuery(user?.id);
//   const [isOpen, { open, close }] = useDisclosure(false);
//   const [isOpenStatus, { open: openStatus, close: closeStatus }] =
//     useDisclosure(false);
//   const [selected, setSelected] = useState({});
//   const queryParams = new URLSearchParams(location.search);
//   const sessionId = queryParams.get("session_id");
//   const status = queryParams.get("status");
//   useEffect(() => {
//     if (sessionId) {
//       openStatus();
//     }
//   }, [sessionId, openStatus]);
//   if (isLoading) return <Spinner />;
//   useEffect(() => {
//     const handlePaymentStatus = async () => {
//       if (sessionId) {
//         if (status === "success") {
//           console.log("status", status);
//           await succesPayment(sessionId).unwrap();
//         } else {
//           console.log("status", status);
//         }
//       }
//     };
//     handlePaymentStatus();
//   }, [sessionId, status, succesPayment]);

//   // Utility function to map plans or credit packs
//   const formatPlans = (plans, isCredit = false) =>
//     plans?.map((plan, index) => {
//       const isEvenIndex = index % 2 === 0;
//       return {
//         plan_id: plan?.plan_id,
//         badgeText: isCredit ? `${plan?.credits} Jobs` : plan?.jobs_count,
//         title: plan?.plan_name,
//         price: `${plan?.price} CHF`,
//         validity: `Valid for ${plan?.validity_days} Days`,
//         buttonText: "Get started",
//         // onButtonClick: () => handleSelect(plans),
//         bgColor: isEvenIndex ? "appcolor" : "black",
//         textColor: isEvenIndex ? "black" : "white",
//         buttonBg: isEvenIndex ? "black" : "white",
//         buttonTextColor: isEvenIndex ? "appcolor" : "black",
//         ...plan,
//       };
//     });

//   const subscriptionPlans = formatPlans(data?.subscription_plans);
//   const creditPacks = formatPlans(data?.credit_packs, true);
//   return (
//     <>
//       <section className="flex flex-wrap gap-5 w-full px-0">
//         {/* Subscription Plans */}
//         <div>
//           <h2 className="text-2xl font-bold mb-5">Subscription Plans</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
//             {subscriptionPlans.map((tier) => (
//               <ModifiedSubscriptionCard
//                 key={tier.plan_id}
//                 {...tier}
//                 onButtonClick={() => {
//                   setSelected(tier);
//                   open();
//                 }}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Credit Packs */}
//         <div>
//           <h2 className="text-2xl font-bold mb-5">Credit Packs</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
//             {creditPacks.map((tier) => (
//               <ModifiedSubscriptionCard
//                 key={tier.plan_id}
//                 {...tier}
//                 onButtonClick={() => {
//                   setSelected(tier);
//                   open();
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//         <Modal
//           open={isOpen}
//           onClose={close}
//           size="md"
//           title="Complete Your Payment"
//         >
//           <PaymentPage selected={selected} onClose={close} />
//         </Modal>
//         <Modal
//           open={isOpenStatus}
//           onClose={closeStatus}
//           size="md"
//           title="Payment status"
//         >
//           <PaymentStatusModal />
//         </Modal>
//       </section>
//     </>
//   );
// };

// export default Subscription;
