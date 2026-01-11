import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../components/ui/Input";
import { useResetForgotPasswordMutation } from "../../services/authApiSlice";
import { handleSubmit } from "../../utils/useHandleSubmit";
import { useAuthContext } from "../../contexts/auth/context";
import Button from "../../components/ui/Button";
import { useTranslation } from "react-i18next";

const NewPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userType } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPassword, { isLoading }] = useResetForgotPasswordMutation();
  console.log("state");
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      const payload = {
        new_password: values.password,
        confirm_password: values.confirmPassword,
        user_id: state?.userId,
        user_type: userType,
      };
      handleSubmit({
        values: payload,
        apiCall: resetPassword,
        navigate: navigate,
        successRedirect: "/login",
      });
      console.log(values);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center mx-10">
      <div className="w-full sm:w-96 sm:max-w-lg bg-white shadow-xl rounded-3xl px-6 py-6 sm:p-8 mx-4">
        {/* Header */}
        <h2 className="text-3xl font-semibold mb-2 text-center">
          {t("New Password")}
        </h2>
        <p className="text-xs text-gray-500 mb-6 text-center">
          {t(
            "Please enter a new password. For your security, create a strong password that you haven't used before."
          )}
        </p>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          {/* Password Input */}
          <div className="mb-4 relative">
            <Input
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4 relative">
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400"
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Continue Button */}
          <Button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md font-semibold mb-4 hover:bg-gray-800 transition"
            loading={isLoading}
          >
            {!isLoading && t("Continue")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

// const NewPassword = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // You can add password validation logic here
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center mx-10">
//       <div className="w-full sm:w-96 sm:max-w-lg bg-white shadow-xl rounded-3xl px-6 py-6 sm:p-8 mx-4">
//         {/* Header */}
//         <h2 className="text-3xl font-semibold mb-2 text-center">
//           New Password
//         </h2>
//         <p className="text-xs text-gray-500 mb-6 text-center ">
//           Please enter your new password which should be different from your
//           previous password
//         </p>

//         {/* Form */}
//         <form onSubmit={handleSubmit}>
//           {/* Password Input */}
//           <div className="mb-4 relative">
//             <label
//               htmlFor="password"
//               className="absolute -top-2 left-3 bg-white px-2 rounded-md text-gray-500 text-xs"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 border border-gray-300 placeholder:text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-inputBorder"
//               //   required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-3 text-gray-400"
//               tabIndex={-1}
//             >
//               {showPassword ? (
//                 <EyeSlashIcon className="h-5 w-5" />
//               ) : (
//                 <EyeIcon className="h-5 w-5" />
//               )}
//             </button>
//           </div>

//           {/* Confirm Password Input */}
//           <div className="mb-4 relative">
//             <label
//               htmlFor="confirmPassword"
//               className="absolute -top-2 left-3 bg-white px-2 rounded-md text-gray-500 text-xs"
//             >
//               Confirm Password
//             </label>
//             <input
//               id="confirmPassword"
//               type={showConfirmPassword ? "text" : "password"}
//               placeholder="Confirm your password"
//               className="w-full px-4 py-2 border border-gray-300 placeholder:text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-inputBorder"
//               //   required
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-3 top-3 text-gray-400"
//               tabIndex={-1}
//             >
//               {showConfirmPassword ? (
//                 <EyeSlashIcon className="h-5 w-5" />
//               ) : (
//                 <EyeIcon className="h-5 w-5" />
//               )}
//             </button>
//           </div>

//           {/* Continue Button */}
//           <button
//             type="submit"
//             className="w-full bg-black text-white py-3 rounded-md font-semibold mb-4 hover:bg-gray-800 transition"
//           >
//             Continue
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default NewPassword;
