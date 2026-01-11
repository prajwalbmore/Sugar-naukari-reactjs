import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useForgotPasswordMutation } from "../../services/authApiSlice";
import { handleSubmit } from "../../utils/useHandleSubmit";
import Input from "../../components/ui/Input";
import { useAuthContext } from "../../contexts/auth/context";
import Button from "../../components/ui/Button";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const { userType } = useAuthContext();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      user_type: userType,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      const response = await handleSubmit({
        apiCall: forgotPassword,
        values,
      });
      if (response.status === "success") {
        navigate("/verify-code", {
          state: { from: "forgot-password", userId: response?.data?.user_id },
        });
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center mx-10">
      <div className="w-full sm:w-96 sm:max-w-lg bg-white shadow-xl rounded-3xl px-6 py-6 sm:p-8 mx-4">
        {/* Header */}
        <h2 className="text-3xl font-semibold mb-2 text-center">
          {t("Forgot Password")}
        </h2>
        <p className="text-xs text-gray-500 mb-6 text-center">
          {t("Please enter your email to receive a verification code.")}
        </p>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              focusBorderColor="#000" // optional custom focus border color
            />
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

export default ForgotPassword;
