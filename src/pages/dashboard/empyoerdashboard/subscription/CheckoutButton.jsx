import React, { useState } from "react";
import {
  useCreatePaymentLinkMutation,
  useCreatePaymentSuccessMutation,
} from "../../../../services/faqApiSlice";
import { toast } from "sonner";
import { useAuthContext } from "../../../../contexts/auth/context";
import { useRefreshToken } from "../../../../utils/refreshToken";

const CheckoutButton = ({
  finalPrice,
  subscriptions_plan_id,
  coupon_id,
  onClose,
  openStatus,
  viewRefetch,
  refetch,
  setStatus,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [createPayment] = useCreatePaymentLinkMutation();
  const [createPaymentSuccess] = useCreatePaymentSuccessMutation();
  const { user } = useAuthContext();
  const refreshUser = useRefreshToken();
  const handlePayNow = async () => {
    setIsProcessing(true);

    try {
      // Prepare body according to your backend API
      const body = {
        subscriptions_plan_id,
        is_coupon_apply: coupon_id ? "yes" : "no",
        coupon_id: coupon_id || "",
        paid_amount: finalPrice,
        employer_id: user?.id,
      };
      if (finalPrice === 0) {
        // createPaymentSuccess;
        const response = await createPaymentSuccess(body).unwrap();
        if (response.status === "success") {
          onClose();
          openStatus();
          setStatus("success");
          viewRefetch();
          refetch();
        }
        await refreshUser();
      } else {
        const response = await createPayment(body).unwrap();
        // console.log("first", response);
        if (response.status === "success" && response.url) {
          window.location.href = response.url; // Redirect to Stripe Checkout
          viewRefetch();
          refetch();
          await refreshUser();
        } else {
          // Add error handling as needed for your UX
          toast.error("Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePayNow}
      disabled={isProcessing}
      className={`w-full bg-black text-white py-3 rounded-lg font-semibold text-lg mt-2 hover:bg-gray-900 transition ${
        isProcessing ? "opacity-60 cursor-wait" : ""
      }`}
    >
      {isProcessing
        ? "Processing..."
        : finalPrice === 0
        ? "Get for free"
        : "Pay Now"}
    </button>
  );
};

export default CheckoutButton;
// import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   "pk_test_51QEXTAKTkEI0aPbujb6m4vxRcxo9hCHFtaSnRhj7bKbUcuMWfJPBpRiCdlfo9ABIMh3R1P9vCEbG9YOAIqiHL45x00notalhnA"
// );

// const CheckoutButton = ({ finalPrice }) => {
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handlePayNow = async () => {
//     setIsProcessing(true);
//     const stripe = await stripePromise;

//     const { error } = await stripe.redirectToCheckout({
//       lineItems: [{ price: finalPrice, quantity: 1 }], // 👈 replace with your price ID
//       mode: "payment",
//       successUrl: window.location.origin + "/success",
//       cancelUrl: window.location.origin + "/cancel",
//     });

//     if (error) {
//       console.error(error);
//     }

//     setIsProcessing(false);
//   };

//   return (
//     <button
//       type="button"
//       onClick={handlePayNow}
//       disabled={isProcessing}
//       className={`w-full bg-black text-white py-3 rounded-lg font-semibold text-lg mt-2 hover:bg-gray-900 transition ${
//         isProcessing ? "opacity-60 cursor-wait" : ""
//       }`}
//     >
//       {isProcessing
//         ? "Processing..."
//         : finalPrice === 0
//         ? "Get for free"
//         : "Pay Now"}
//     </button>
//   );
// };

// export default CheckoutButton;
