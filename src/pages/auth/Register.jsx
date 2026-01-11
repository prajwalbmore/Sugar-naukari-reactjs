import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import GoogleLogo from "/assets/GoogleLogo.svg";
import FaceBookLogo from "/assets/FacebookLogo.svg";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Input from "../../components/ui/Input";
import SelectInput from "../../components/ui/Select";
import { useRegisterMutation } from "../../services/authApiSlice";
import { useAuthContext } from "../../contexts/auth/context";
import { toast } from "sonner";
import GoogleRegistrationButton from "./GoogleRegistrationButton";
import FacebookRegistrationButton from "./FacebookRegistrationButton";
import Button from "../../components/ui/Button";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();
  const { userType, setUserType } = useAuthContext();

  const userTypeOptions = [
    { value: "employee", label: "Find a Job" },
    { value: "employer", label: "Find an Employee" },
  ];

  const initialValues = {
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    mobile: Yup.string().required("Mobile number is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values) => {
    const payload = {
      fullName: values.name,
      email: values.email,
      password: values.password,
      mobile: values.mobile,
      role: userType,
    };
    console.log("Form Data:", payload);
    try {
      const response = await register(payload).unwrap();
      // const response = { status: "success" };
      if (response?.status === "success") {
        toast.success(response?.message || "Registration successfully!");
        // navigate("/verify-code", {
        //   state: { from: "register", userId: response?.data?.user_id },
        // });
      } else {
        const errorMessage = response?.message;
        if (typeof errorMessage === "string") {
          toast.error(errorMessage);
        } else if (typeof errorMessage === "object") {
          Object.entries(errorMessage).forEach(([key, value]) => {
            toast.error(` ${value.join(", ")}`);
          });
        } else {
          toast.error(errorMessage);
        }
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error?.response?.data?.message;
      if (typeof errorMessage === "string") {
        toast.error(errorMessage);
      } else if (typeof errorMessage === "object") {
        Object.entries(errorMessage).forEach(([key, value]) => {
          toast.error(` ${value.join(", ")}`);
        });
      } else {
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mx-10">
      <div className="w-full sm:w-96 sm:max-w-lg bg-white shadow-xl rounded-3xl px-6 py-6 sm:p-8 mx-4">
        <h2 className="text-3xl font-semibold mb-2 text-center">
          {t("Create Account")}
        </h2>
        <p className="text-xs text-gray-500 mb-3 text-center">
          {t("Welcome! We're excited to have you join us!")}
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, setFieldValue, touched, errors }) => (
            <Form className="space-y-2.5">
              {/* User Type Selection */}
              <SelectInput
                label="I am looking to"
                name="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                options={userTypeOptions}
              />

              <Input
                label="Full Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Enter your first name"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              

              <Input
                label="Mobile Number"
                name="mobile"
                type="number"
                value={values.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                error={touched.mobile && Boolean(errors.mobile)}
                helperText={touched.mobile && errors.mobile}
              />

              <Input
                label="Email"
                name="email"
                // type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Enter your email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <div className="relative">
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
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

              <div className="relative">
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  placeholder="Enter your confirm password"
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
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

              <Button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md font-semibold mb-4 hover:bg-gray-800 transition"
                loading={isLoading}
              >
                {!isLoading && t("Sign Up")}
              </Button>

              <div className="flex items-center mb-3">
                <div className="flex-grow h-px bg-gray-200"></div>
                <span className="mx-3 text-gray-500 text-sm">
                  {t("Or sign in with")}
                </span>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>

              <div className="flex justify-center space-x-4 mb-4">
                <GoogleRegistrationButton />
                {/* <FacebookRegistrationButton /> */}
              </div>

              <p className="text-center text-sm text-gray-500">
                {t("Already have an account")}?{" "}
                <Link
                  to="/login"
                  className="text-emerald-500 font-semibold hover:underline"
                >
                  {t("Sign In")}
                </Link>
                <h1 className="hover:underline mt-2">
                  <Link to="/">{t("Back to Home")}</Link>
                </h1>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import GoogleLogo from "/assets/GoogleLogo.svg";
// import FaceBookLogo from "/assets/FacebookLogo.svg";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

// const Register = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   return (
//     <div className="min-h-screen flex items-center justify-center mx-10">
//       <div className="w-full sm:w-96 sm:max-w-lg bg-white shadow-xl rounded-3xl px-6 py-6 sm:p-8 mx-4">
//         {/* Header */}
//         <h2 className="text-3xl font-semibold mb-2 text-center">
//           Create Account
//         </h2>
//         <p className="text-xs text-gray-500 mb-6 text-center">
//           Welcome! We're excited to have you join us!
//         </p>

//         {/* Form */}
//         <form>
//           {/* Name Input */}
//           <div className="mb-4 relative">
//             <label
//               htmlFor="name"
//               className="absolute -top-2 left-3 bg-white px-1 rounded-md text-gray-500 text-xs"
//             >
//               Name
//             </label>
//             <input
//               id="name"
//               type="text"
//               placeholder="Enter your name"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-inputBorder"
//               required
//             />
//           </div>

//           {/* Mobile number Input */}
//           <div className="mb-4 relative">
//             <label
//               htmlFor="mobile"
//               className="absolute -top-2 left-3 bg-white px-1 rounded-md text-gray-500 text-xs"
//             >
//               Mobile Number
//             </label>
//             <input
//               id="mobile"
//               type="tel"
//               placeholder="Enter your mobile number"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-inputBorder"
//               required
//             />
//           </div>

//           {/* Email Input */}
//           <div className="mb-4 relative">
//             <label
//               htmlFor="email"
//               className="absolute -top-2 left-3 bg-white px-1 rounded-md text-gray-500 text-xs"
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-inputBorder"
//               required
//             />
//           </div>
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
//               type="password"
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 border border-gray-300 placeholder:text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-inputBorder"
//               required
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

//           {/* Password Input */}
//           <div className="mb-4 relative">
//             <label
//               htmlFor="password"
//               className="absolute -top-2 left-3 bg-white px-2 rounded-md text-gray-500 text-xs"
//             >
//               Confirm Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 border border-gray-300 placeholder:text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-inputBorder"
//               required
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

//           {/* Sign In Button */}
//           <button
//             type="submit"
//             className="w-full bg-black text-white py-2 rounded-md font-semibold mb-4 hover:bg-gray-800 transition"
//             onClick={() => {
//               navigate("/verify-code", { state: { from: "register" } });
//             }}
//           >
//             Sign Up
//           </button>

//           {/* Divider */}
//           <div className="flex items-center mb-3">
//             <div className="flex-grow h-px bg-gray-200"></div>
//             <span className="mx-3 text-gray-500 text-sm">Or sign in with</span>
//             <div className="flex-grow h-px bg-gray-200"></div>
//           </div>

//           {/* Social Buttons */}
//           <div className="flex justify-center space-x-4 mb-4">
//             <button
//               type="button"
//               className="rounded-full  hover:bg-gray-100 flex items-center justify-center"
//             >
//               <img
//                 src={GoogleLogo}
//                 alt="Google Sign In"
//                 className="w-10 h-10"
//               />
//             </button>
//             <button
//               type="button"
//               className="rounded-full  hover:bg-gray-100 flex items-center justify-center"
//             >
//               <img
//                 src={FaceBookLogo}
//                 alt="Google Sign In"
//                 className="w-10 h-10"
//               />
//             </button>
//           </div>

//           {/* Sign Up Link */}
//           <p className="text-center text-sm text-gray-500">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="text-yellow-500 font-semibold hover:underline"
//             >
//               Sign In
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
