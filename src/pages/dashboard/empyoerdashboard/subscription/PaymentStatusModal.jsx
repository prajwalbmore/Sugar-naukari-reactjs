import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useLocation } from "react-router-dom";
import React from "react";

const PaymentStatusModal = ({ couponSuccess, t }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  //   const status = "error";
  const status = queryParams.get("status") || couponSuccess;
  return (
    <div className="flex items-center justify-center">
      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-3 bg-green-100 border border-green-400 p-6 rounded-2xl shadow-lg"
          >
            <CheckCircleIcon className="h-16 w-16 text-green-600" />
            <h2 className="text-2xl font-bold text-green-700">
              {t("Payment Successful!")}
            </h2>
            <p className="text-green-600">
              {t("Your subscription is now active.")}
            </p>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-3 bg-red-100 border border-red-400 p-6 rounded-2xl shadow-lg"
          >
            <XCircleIcon className="h-16 w-16 text-red-600" />
            <h2 className="text-2xl font-bold text-red-700">
              {"Payment Failed!"}
            </h2>
            <p className="text-red-600">
              {t("Something went wrong. Please try again.")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentStatusModal;
