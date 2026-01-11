// PaymentPageOptimized.jsx
import React, { useState, useCallback, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import CheckoutButton from "./CheckoutButton";
import { useGetCouponsListQuery } from "../../../../services/faqApiSlice";

/**
 * Example default coupons (in real apps, fetch from server).
 * expiration_date format: "DD-MM-YYYY"
 */
const DEFAULT_COUPONS = [
  {
    id: 4,
    code: "1FREETAFF",
    discount_percentage: 100,
    expiration_date: "27-02-2026",
    usage_limit: 10000,
  },
];

/* ---------------------- Utilities ----------------------- */

/** Parse date string "DD-MM-YYYY" to a Date at end of that day (safe comparison) */
function parseExpiryDateEndOfDay(expiryStr) {
  const [d, m, y] = expiryStr.split("-").map((s) => parseInt(s, 10));
  if (!d || !m || !y) return null;
  const dt = new Date(y, m - 1, d);
  dt.setHours(23, 59, 59, 999); // end of expiry day
  return dt;
}

/** Return true if coupon exists and not expired (client-side check only) */
function isCouponValidClientSide(coupon) {
  if (!coupon?.expiration_date) return false;
  const expiry = parseExpiryDateEndOfDay(coupon.expiration_date);
  if (!expiry) return false;
  return expiry.getTime() >= Date.now();
}

/* ---------------------- Component ----------------------- */

export default function PaymentPage({
  selected = {},
  onClose = () => {},
  onPay = null, // optional handler (price, coupon) => Promise
  openStatus,
  t,
  viewRefetch,
  refetch,
  setStatus,
}) {
  const [promoInput, setPromoInput] = useState("");
  const [appliedCode, setAppliedCode] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { data, isLoading } = useGetCouponsListQuery();
  const planName = selected.plan_name ?? "No Plan Selected";
  const validityDays = selected.validity_days ?? 0;
  const price = Number(selected.price ?? 0);

  const coupons = data?.data;
  // map coupons by uppercase code for faster lookup
  const couponsMap = useMemo(() => {
    const map = new Map();
    (coupons || []).forEach((c) =>
      map.set(String(c.code ?? "").toUpperCase(), c)
    );
    return map;
  }, [coupons]);

  const appliedCoupon = useMemo(() => {
    if (!appliedCode) return null;
    const c = couponsMap.get(appliedCode.trim().toUpperCase());
    return c && isCouponValidClientSide(c) ? c : null;
  }, [appliedCode, couponsMap]);
  console.log("selected", selected);
  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    const amt = (price * Number(appliedCoupon.discount_percentage || 0)) / 100;
    // round to 2 decimals
    return Math.round(amt * 100) / 100;
  }, [appliedCoupon, price]);

  const finalPrice = useMemo(() => {
    return Math.max(Math.round((price - discountAmount) * 100) / 100, 0);
  }, [price, discountAmount]);

  // close drawer with Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setIsDrawerOpen(false);
    }
    if (isDrawerOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isDrawerOpen]);

  const clearError = useCallback(() => setError(""), []);

  const handleApplyPromo = useCallback(async () => {
    clearError();
    const code = (promoInput || "").trim().toUpperCase();
    if (!code) {
      setError("Please enter a promo code.");
      return;
    }

    // Prefer server-side validation. Here we do a client-side quick check:
    const coupon = couponsMap.get(code);
    if (!coupon) {
      setError("Invalid promo code.");
      return;
    }
    if (!isCouponValidClientSide(coupon)) {
      setError("This promo code is expired.");
      return;
    }

    // Success: apply locally (still validate on server before charging)
    setAppliedCode(code);
    setIsDrawerOpen(false);
    // DON'T console.log secrets or coupon internals in production
  }, [promoInput, couponsMap, clearError]);

  const applyCouponFromList = useCallback(
    (code) => {
      if (!code) return;
      const upper = String(code).toUpperCase();
      const coupon = couponsMap.get(upper);
      if (!coupon || !isCouponValidClientSide(coupon)) {
        setError("Cannot apply invalid/expired coupon.");
        return;
      }
      setAppliedCode(upper);
      setPromoInput(upper);
      setError("");
      setIsDrawerOpen(false);
    },
    [couponsMap]
  );

  const removeCoupon = useCallback(() => {
    setAppliedCode("");
    setPromoInput("");
    setError("");
  }, []);

  // pay handler — if onPay provided, call it; otherwise do a default flow
  const handlePayNow = useCallback(async () => {
    setError("");
    setIsProcessing(true);
    try {
      // IMPORTANT: ALWAYS validate coupon & compute final price on the SERVER before charging.
      if (typeof onPay === "function") {
        // send price and applied coupon code to parent / payment flow
        await onPay({ price: finalPrice, couponCode: appliedCode || null });
      } else {
        // client-only fallback: simulate success for free plans
        if (finalPrice === 0) {
          // e.g., call /api/subscriptions/activate (server) in a real app
          // here we just simulate immediate success:
          alert("Success — plan activated (free).");
        } else {
          alert("Proceed to payment provider (client fallback).");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Payment failed. Try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [onPay, finalPrice, appliedCode]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-xl font-bold">{planName}</h2>
        <p className="text-gray-400 text-sm">
          {validityDays} {t("Days")}
        </p>

        <div className="flex justify-between space-x-4 mt-2">
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={onClose}
          >
            {t("Change")}
          </button>
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => setIsDrawerOpen(true)}
            aria-expanded={isDrawerOpen}
            aria-controls="coupon-drawer"
          >
            {t("All Coupons")}
          </button>
        </div>
      </div>

      {/* Promo Input */}
      <div className="mb-6 flex flex-col">
        <label htmlFor="promo" className="sr-only">
          {t("Promo code")}
        </label>
        <div className="flex items-center">
          <input
            id="promo"
            name="promo"
            type="text"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value.toUpperCase())} // visual convenience
            placeholder="Have a Promo Code?"
            className="border border-gray-300 rounded-l-md px-3 py-2 w-full focus:outline-none"
            aria-invalid={!!error}
            aria-describedby={error ? "promo-error" : undefined}
            style={{ textTransform: "uppercase" }}
          />
          <button
            type="button"
            onClick={appliedCode ? removeCoupon : handleApplyPromo}
            disabled={!promoInput.trim() || isProcessing}
            className={`bg-gray-100 border border-gray-300 border-l-0 rounded-r-md px-4 py-2 ${
              appliedCode ? "text-red-500" : "text-gray-700"
            }  font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-disabled={!promoInput.trim() || isProcessing}
          >
            {appliedCode ? "Remove" : "Apply"}
          </button>
        </div>

        {error && (
          <p
            id="promo-error"
            role="alert"
            className="text-red-500 text-sm mt-1"
          >
            {error}
          </p>
        )}
      </div>

      {/* Payment Option */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-2">{t("Payment Option")}</h3>
        <div className="flex items-center mb-3">
          <img
            src="https://img.icons8.com/color/48/000000/stripe.png"
            alt="Stripe"
            className="w-10 h-10 mr-2"
            aria-hidden
          />
          <span className="text-base font-medium">Stripe</span>
        </div>

        {/* Plan Details */}
        <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm mb-3">
          <div>{t("Plan")}</div>
          <div className="text-right">{planName}</div>
          <div>{t("Duration")}</div>
          <div className="text-right">{validityDays} Days</div>
        </div>

        {/* Price Summary */}
        <div className="grid grid-cols-2 gap-4 text-gray-800 text-base">
          <div>{t("Total Price")}</div>
          <div className="text-right font-semibold">{price.toFixed(2)} ₣</div>
          <div>{t("Discount Amount")}</div>
          <div className="text-right">{discountAmount.toFixed(2)} ₣</div>
          <div>{t("Final Price")}</div>
          <div className="text-right font-semibold">
            {finalPrice.toFixed(2)} ₣
          </div>
        </div>
      </div>

      <CheckoutButton
        finalPrice={finalPrice}
        subscriptions_plan_id={selected?.plan_id}
        coupon_id={appliedCoupon ? appliedCoupon.id : ""}
        onClose={onClose}
        openStatus={openStatus}
        setStatus={setStatus}
        viewRefetch={viewRefetch}
        refetch={refetch}
      />

      {/* Bottom Drawer */}
      {isDrawerOpen && (
        <div
          id="coupon-drawer"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/50 z-50 flex justify-center items-end"
          onClick={(e) => {
            // close when clicking on backdrop
            if (e.target === e.currentTarget) setIsDrawerOpen(false);
          }}
        >
          <div className="bg-white w-full max-w-md rounded-t-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{t("Available Coupons")}</h3>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-gray-500 font-semibold"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 max-h-60 overflow-auto">
              {(coupons || []).map((coupon) => {
                const valid = isCouponValidClientSide(coupon);
                const isApplied =
                  appliedCode === String(coupon.code).toUpperCase();
                return (
                  <div
                    key={coupon.id}
                    className={`flex justify-between items-center p-3 border rounded hover:bg-gray-100 ${
                      !valid ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{coupon.code}</div>
                      <div className="text-sm text-gray-500">
                        {coupon.discount_percentage}% off | Expires:{" "}
                        {coupon.expiration_date}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {valid && !isApplied && (
                        <button
                          className="text-blue-600 font-medium hover:underline"
                          onClick={() => applyCouponFromList(coupon.code)}
                        >
                          {t("Apply")}
                        </button>
                      )}
                      {isApplied && (
                        <button
                          className="text-red-500 font-medium hover:underline"
                          onClick={removeCoupon}
                        >
                          {t("Remove")}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

PaymentPage.propTypes = {
  selected: PropTypes.object,
  onClose: PropTypes.func,
  coupons: PropTypes.array,
  onPay: PropTypes.func,
};

// import React, { useState, useCallback, useMemo } from "react";

// const couponsData = [
//   {
//     id: 4,
//     code: "1FREETAFF",
//     discount_percentage: 100,
//     expiration_date: "27-02-2026",
//     usage_limit: 10000,
//   },
// ];

// function isCouponValid(coupon) {
//   if (!coupon) return false;
//   const today = new Date();
//   const [day, month, year] = coupon.expiration_date.split("-");
//   const expiryDate = new Date(+year, +month - 1, +day); // months are 0-indexed
//   return expiryDate >= today;
// }

// function PaymentPage({ selected, onClose }) {
//   const [promo, setPromo] = useState("");
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [error, setError] = useState("");

//   const planName = selected?.plan_name || "No Plan Selected";
//   const validityDays = selected?.validity_days || 0;
//   const price = selected?.price ?? 0;

//   const appliedCoupon = useMemo(() => {
//     const found = couponsData.find(
//       (c) => c.code.toUpperCase() === promo.trim().toUpperCase()
//     );
//     return found && isCouponValid(found) ? found : null;
//   }, [promo]);

//   const discountAmount = appliedCoupon
//     ? (price * appliedCoupon.discount_percentage) / 100
//     : 0;
//   const finalPrice = Math.max(price - discountAmount, 0);

//   const handleApplyPromo = useCallback(() => {
//     setError("");
//     if (!promo.trim()) return setError("Please enter a promo code.");
//     if (!appliedCoupon) return setError("Invalid or expired promo code.");
//     setError("");
//     setIsDrawerOpen(false);
//     console.log("Applied coupon:", promo.toUpperCase());
//   }, [promo, appliedCoupon]);

//   const applyCouponFromList = useCallback((code) => {
//     setPromo(code);
//     setError("");
//     setIsDrawerOpen(false);
//   }, []);

//   const removeCoupon = useCallback(() => {
//     setPromo("");
//     setError("");
//   }, []);

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       {/* Header */}
//       <div className="mb-4">
//         <h2 className="text-xl font-bold">{planName}</h2>
//         <p className="text-gray-400 text-sm">{validityDays} Days</p>
//         <div className="flex justify-between space-x-4 mt-2">
//           <button
//             type="button"
//             className="text-blue-600 hover:underline"
//             onClick={onClose}
//           >
//             Change
//           </button>
//           <button
//             type="button"
//             className="text-blue-600 hover:underline"
//             onClick={() => setIsDrawerOpen(true)}
//           >
//             All Coupons
//           </button>
//         </div>
//       </div>

//       {/* Promo Code Input */}
//       <div className="mb-6 flex flex-col">
//         <div className="flex items-center">
//           <input
//             type="text"
//             value={promo}
//             onChange={(e) => setPromo(e.target.value.toUpperCase())}
//             placeholder="Have a Promo Code?"
//             className="border border-gray-300 rounded-l-md px-3 py-2 w-full focus:outline-none"
//           />
//           <button
//             type="button"
//             onClick={handleApplyPromo}
//             disabled={!promo.trim()}
//             className="bg-gray-100 border border-gray-300 border-l-0 rounded-r-md px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Apply
//           </button>
//           {promo && (
//             <button
//               type="button"
//               className="ml-2 text-red-500 font-medium hover:underline"
//               onClick={removeCoupon}
//             >
//               Remove
//             </button>
//           )}
//         </div>
//         {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//       </div>

//       {/* Payment Option */}
//       <div className="mb-6">
//         <h3 className="font-bold text-lg mb-2">Payment Option</h3>
//         <div className="flex items-center mb-3">
//           <img
//             src="https://img.icons8.com/color/48/000000/stripe.png"
//             alt="Stripe"
//             className="w-10 h-10 mr-2"
//           />
//           <span className="text-base font-medium">Stripe</span>
//         </div>

//         {/* Plan Details */}
//         <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm mb-3">
//           <div>Plan</div>
//           <div className="text-right">{planName}</div>
//           <div>Duration</div>
//           <div className="text-right">{validityDays} Days</div>
//         </div>

//         {/* Price Summary */}
//         <div className="grid grid-cols-2 gap-4 text-gray-800 text-base">
//           <div>Total Price</div>
//           <div className="text-right font-semibold">{price} ₣</div>
//           <div>Discount Amount</div>
//           <div className="text-right">{discountAmount.toFixed(2)} ₣</div>
//           <div>Final Price</div>
//           <div className="text-right font-semibold">
//             {finalPrice.toFixed(2)} ₣
//           </div>
//         </div>
//       </div>

//       <button
//         type="button"
//         className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg mt-2 hover:bg-gray-900 transition"
//         disabled={finalPrice === 0}
//       >
//         Pay Now
//       </button>

//       {/* Bottom Drawer */}
//       {isDrawerOpen && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-end">
//           <div className="bg-white w-full max-w-md rounded-t-lg p-6 shadow-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-bold">Available Coupons</h3>
//               <button
//                 onClick={() => setIsDrawerOpen(false)}
//                 className="text-gray-500 font-semibold"
//               >
//                 Close
//               </button>
//             </div>
//             <div className="space-y-3 max-h-60 overflow-auto">
//               {couponsData.map((coupon) => {
//                 const valid = isCouponValid(coupon);
//                 return (
//                   <div
//                     key={coupon.id}
//                     className={`flex justify-between items-center p-3 border rounded hover:bg-gray-100 ${
//                       !valid ? "opacity-50 cursor-not-allowed" : ""
//                     }`}
//                   >
//                     <div>
//                       <div className="font-semibold">{coupon.code}</div>
//                       <div className="text-sm text-gray-500">
//                         {coupon.discount_percentage}% off | Expires:{" "}
//                         {coupon.expiration_date}
//                       </div>
//                     </div>
//                     <div className="flex gap-2">
//                       {valid && (
//                         <button
//                           className="text-blue-600 font-medium hover:underline"
//                           onClick={() => applyCouponFromList(coupon.code)}
//                         >
//                           Apply
//                         </button>
//                       )}
//                       {promo.toUpperCase() === coupon.code && (
//                         <button
//                           className="text-red-500 font-medium hover:underline"
//                           onClick={removeCoupon}
//                         >
//                           Remove
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PaymentPage;
