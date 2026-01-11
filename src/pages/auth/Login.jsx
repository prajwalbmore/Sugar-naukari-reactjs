import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Formik } from "formik";
import * as Yup from "yup";

import FaceBookLogo from "/assets/FacebookLogo.svg";
import Input from "../../components/ui/Input";
import SelectInput from "../../components/ui/Select";
import { useAuthContext } from "../../contexts/auth/context";
import Button from "../../components/ui/Button";
import GoogleLoginButton from "./GoogleLoginButton";
import FacebookLoginButton from "./FacebookLoginButton";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const Login = () => {

  const location = useLocation();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, isLoading, userType, setUserType, user } = useAuthContext();

  const userTypeOptions = [
    { value: "employee", label: "Find a Job" },
    { value: "employer", label: "Find an Employee" },
  ];

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Please enter email"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Please enter password"),
  });

  const handleFormSubmit = async (values) => {
    // console.log("Form values:", values);
    const res = await login({
      email: values.email,
      password: values.password,
    });
    console.log("res", res);
    if(res?.success) {
      navigate("/dashboard");
    } else {
      toast.error(res?.message);
    }
    // if (res?.status === "email_error") {
    //   navigate("/verify-code", {
    //     state: { from: "register", userId: res?.data?.user_id },
    //   });
    //   return;
    // }
    // if (res?.isprofileCreated) {
    // } else if (res?.isprofileCreated !== undefined) {
      // navigate(`/create-profile/${res.role || userType}`);
    // }
    // if (res.status !== "error" && res.status !== "email_error") {
    //   if (res?.isprofileCreated) {
    //     navigate("/dashboard");
    //     console.log("dashboard");
    //   } else {
    //     navigate(`/create-profile/${userType}`);
    //     console.log(`/create-profile/${userType}`);
    //   }
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mx-10">
      <div className="w-full sm:w-96 sm:max-w-lg bg-white shadow-xl rounded-3xl px-6 py-6 sm:p-8 mx-4">
        <h2 className="text-3xl font-semibold mb-2 text-center">Sign in</h2>
        <p className="text-xs text-gray-500 mb-6 text-center">
          Welcome! We're excited to have you join us!
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              {/* User Type Selection */}
              <div className="mb-4">
                <SelectInput
                  label="I am looking to"
                  name="userType"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  options={userTypeOptions}
                />
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </div>

              {/* Password Input */}
              <div className="mb-4 relative">
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute ${
                    errors.password
                      ? "right-3 top-1/3 transform -translate-y-1/2"
                      : "right-3 top-1/2 transform -translate-y-1/2"
                  }  text-gray-400`}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="mb-4 flex justify-end">
                <Link
                  to={"/forgot-password"}
                  className="text-emerald-500 text-sm hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md font-semibold mb-4  transition"
                loading={isLoading}
              >
                {!isLoading && t("Sign In")}
              </Button>

              {/* Divider */}
              <div className="flex items-center mb-2">
                <div className="flex-grow h-px bg-gray-200"></div>
                <span className="mx-3 text-gray-500 text-sm">
                  {t("Or sign in with")}
                </span>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>

              {/* Social Buttons */}
              <div className="flex justify-center space-x-4 mb-4">
                <GoogleLoginButton />
                {/* <FacebookLoginButton /> */}
                {/* <Button
                  type="button"
                  className="rounded-full hover:bg-gray-100 flex items-center justify-center"
                >
                  <img
                    src={GoogleLogo}
                    alt="Google Sign In"
                    className="w-10 h-10"
                  />
                </Button> */}
                {/* <Button
                  type="button"
                  className="rounded-full hover:bg-gray-100 flex items-center justify-center"
                >
                  <img
                    src={FaceBookLogo}
                    alt="Facebook Sign In"
                    className="w-10 h-10"
                  />
                </Button> */}
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-gray-500">
                {t("Don't have an account")}?{" "}
                <Link
                  to="/register"
                  className="text-emerald-500 font-semibold hover:underline"
                >
                  {t("Sign Up")}
                </Link>
                <h1 className="hover:underline mt-2">
                  <Link to="/">{t("Back to Home")}</Link>
                </h1>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import GoogleLogo from "/assets/GoogleLogo.svg";
// import FaceBookLogo from "/assets/FacebookLogo.svg";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

// const Login = () => {
//   const location = useLocation();
//   const selectedOption = location?.state?.selectedOption || "employee";
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex items-center justify-center mx-10">
//       <div className="w-full sm:w-96 sm:max-w-lg bg-white shadow-xl rounded-3xl px-6 py-6 sm:p-8 mx-4">
//         {/* Header */}
//         <h2 className="text-3xl font-semibold mb-2 text-center">Sign in</h2>
//         <p className="text-xs text-gray-500 mb-6 text-center">
//           Welcome! We're excited to have you join us!
//         </p>

//         {/* Form */}
//         <form className="">
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
//               className="w-full px-4 py-3 border border-gray-300 placeholder:text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-inputBorder"
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
//               className="w-full px-4 py-3 border border-gray-300 placeholder:text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-inputBorder"
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

//           {/* Forgot Password */}
//           <div className="mb-4 flex justify-end">
//             <Link
//               to={"/forgot-password"}
//               className="text-yellow-500 text-sm hover:underline"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           {/* Sign In Button */}
//           <button
//             type="submit"
//             className="w-full bg-black text-white py-3 rounded-md font-semibold mb-4 hover:bg-gray-800 transition"
//             onClick={() => {
//               // Handle sign in logic here
//               navigate(`/create-profile/${selectedOption}`);
//             }}
//           >
//             Sign In
//           </button>

//           {/* Divider */}
//           <div className="flex items-center mb-2">
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
//             Don't have an account?{" "}
//             <Link
//               to="/register"
//               className="text-yellow-500 font-semibold hover:underline"
//             >
//               Sign Up
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
