import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "../../services/authApiSlice";
import { toast } from "sonner";
import Button from "../../components/ui/Button";
import { useAuthContext } from "../../contexts/auth/context";
import { handleSubmit } from "../../utils/useHandleSubmit";
import { useTranslation } from "react-i18next";

const VerifyCode = () => {
  const { t } = useTranslation;
  const { userType } = useAuthContext();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: resendLoading }] = useResendOtpMutation();

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // allow only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next field
    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const validateOtp = () => {
    if (otp.some((digit) => digit === "")) {
      toast.error("Please enter all 4 digits of the OTP.");
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateOtp()) return;

    try {
      const response = await verifyOtp({
        user_id: state?.userId,
        otp: otp.join(""),
        type: state?.from === "forgot-password" ? 2 : 1,
        user_type: userType,
      }).unwrap();

      if (response?.status === "success") {
        toast.success(response?.message || "OTP Verified successfully!");
        if (state?.from === "register") {
          navigate("/login");
        } else {
          navigate("/new-password", {
            state: { from: "verify-code", userId: state?.userId },
          });
        }
      } else {
        toast.error(response?.message || "Failed to verify OTP.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  const onResend = async () => {
    await handleSubmit({
      values: {
        user_id: state?.userId,
        type: state?.from === "forgot-password" ? 2 : 1,
        user_type: userType,
      },
      apiCall: resendOtp,
    });
    setOtp(["", "", "", ""]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center mx-6">
      <div className="w-full sm:w-96 sm:max-w-lg bg-white shadow-xl rounded-3xl px-6 py-6 sm:p-8 mx-4">
        {/* Header */}
        <button type="button" onClick={() => navigate(-1)}>
          <ArrowLeftIcon className="h-6 w-6" strokeWidth={3} />
        </button>

        <h2 className="text-3xl font-semibold mb-2 text-center">
          {/* {t("Verify Code")} */}
          Verify Code
        </h2>
        <p className="text-xs text-gray-500 mb-6 text-center">
          {/* {t("Please enter the code we just sent to your email")} */}
          Please enter the code we just sent to your email
        </p>

        {/* Form */}
        <form onSubmit={onSubmit}>
          <div className="flex justify-center space-x-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-14 h-14 bg-emerald-50 text-center rounded-lg text-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            ))}
          </div>

          <div className="text-center mb-4">
            <p className="text-gray-500 text-xs">
              Didn’t receive the code?{" "}
              <button
                type="button"
                className="text-emerald-500 text-sm font-medium hover:underline ml-1"
                onClick={onResend}
                disabled={resendLoading}
              >
                {resendLoading ? "Sending..." : "Resend"}
              </button>
            </p>
          </div>

          {/* Verify Button */}
          <Button
            type="submit"
            loading={isLoading}
            className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition"
          >
            {!isLoading && "Verify"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;
// import { ArrowLeftIcon } from "@heroicons/react/24/solid";
// import React, { useState, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   useResendOtpMutation,
//   useVerifyOtpMutation,
// } from "../../services/authApiSlice";
// import { toast } from "sonner";
// import Button from "../../components/ui/Button";
// import { useAuthContext } from "../../contexts/auth/context";
// import { handleSubmit } from "../../utils/useHandleSubmit";

// const VerifyCode = () => {
//   const { userType } = useAuthContext();
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const inputsRef = useRef([]);
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
//   const [resendOtp, { isLoading: resendLoading }] = useResendOtpMutation();
//   console.log("state", state);

//   const handleChange = (e, index) => {
//     const value = e.target.value.replace(/\D/g, ""); // allow only digits
//     if (value) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       // Move to next field
//       if (index < otp.length - 1) {
//         inputsRef.current[index + 1].focus();
//       }
//     } else {
//       const newOtp = [...otp];
//       newOtp[index] = "";
//       setOtp(newOtp);
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputsRef.current[index - 1].focus();
//     }
//   };
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await verifyOtp({
//         user_id: state?.userId,
//         otp: otp.join(""),
//         type: state?.from === "forgot-password" ? 2 : 1,
//         user_type: userType,
//       }).unwrap();

//       console.log("response", response);

//       if (response?.status === "success") {
//         toast.success(response?.message || "OTP Verified successfully!");
//         // You can navigate here if needed
//         if (state?.from === "register") {
//           navigate("/login");
//         } else {
//           navigate("/new-password", {
//             state: { from: "verify-code", userId: state?.userId },
//           });
//         }
//       } else {
//         toast.error(response?.message || "Failed to verify OTP.");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Server error");
//     }
//   };
//   const onResend = async () => {
//     const response = await handleSubmit({
//       values: {
//         user_id: state?.userId,
//         type: state?.from === "forgot-password" ? 2 : 1,
//         user_type: userType,
//       },
//       apiCall: resendOtp,
//     });
//   };
//   return (
//     <div className="min-h-screen flex items-center justify-center mx-6">
//       <div className="w-full sm:w-96 sm:max-w-lg bg-white shadow-xl rounded-3xl px-6 py-6 sm:p-8 mx-4">
//         {/* Header */}
//         <button type="button" onClick={() => navigate(-1)}>
//           <ArrowLeftIcon className="h-6 w-6" strokeWidth={3} />
//         </button>

//         <h2 className="text-3xl font-semibold mb-2 text-center">Verify Code</h2>
//         <p className="text-xs text-gray-500 mb-6 text-center">
//           Please enter the code we just sent to your email
//         </p>

//         {/* Form */}
//         <form onSubmit={onSubmit}>
//           <div className="flex justify-center space-x-3 mb-6">
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 inputMode="numeric"
//                 pattern="\d*"
//                 maxLength="1"
//                 value={digit}
//                 onChange={(e) => handleChange(e, index)}
//                 onKeyDown={(e) => handleKeyDown(e, index)}
//                 ref={(el) => (inputsRef.current[index] = el)}
//                 className="w-14 h-14 bg-primary text-center  rounded-lg text-2xl focus:outline-none focus:ring-2 focus:ring-inputBorder"
//               />
//             ))}
//           </div>

//           <div className="text-center mb-4">
//             <p className="text-gray-500 text-xs">
//               Didn’t receive the code?{" "}
//               <button
//                 type="button"
//                 className="text-yellow-500 text-sm font-medium hover:underline ml-1"
//                 onClick={onResend}
//               >
//                 Resend
//               </button>
//             </p>
//           </div>

//           {/* Verify Button */}
//           <Button
//             type="submit"
//             loading={isLoading}
//             className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition"
//           >
//             {!isLoading && "Verify"}
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VerifyCode;
