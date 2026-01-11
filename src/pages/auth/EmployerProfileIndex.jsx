import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import EmployerForm from "./EmployerForm";
import EmployerForm2 from "./EmployerForm2";
import { useCreateProfileEmployerMutation } from "../../services/authApiSlice";
import { useAuthContext } from "../../contexts/auth/context";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useGetCompanyDetailsMutation } from "../../services/faqApiSlice";
import { handleSubmit } from "../../utils/useHandleSubmit";
import { stringify } from "postcss";
import { useRefreshToken } from "../../utils/refreshToken";

// ✅ Step 1 Validation Schema
const step1ValidationSchema = Yup.object({
  companyName: Yup.string().required("Company Name is required"),
  industry: Yup.string().required("Industry is required"),
  companyDescription: Yup.string()
    .max(1000, "Max 500 characters")
    .required("Company Description is required"),
  businessRegistrationNumber: Yup.string().required(
    "Business Registration Number is required"
  ),
  hoursOfOperation: Yup.string().required("Hours of Operation is required"),
});

// ✅ Step 2 Validation Schema
const step2ValidationSchema = Yup.object({
  contactPerson: Yup.string().required("Contact Person Name is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be a valid 10-digit number")
    .required("Phone number is required"),
});

const EmployerProfileIndex = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { user } = useAuthContext();
  const [createProfile] = useCreateProfileEmployerMutation();
  const navigate = useNavigate();
  const refreshUser = useRefreshToken();
  const [getCompanyDetails] = useGetCompanyDetailsMutation();
  const [companyData, setCompanyData] = useState(
    () => JSON.parse(localStorage.getItem("Company")) || {}
  );

  const initialValues = useMemo(() => {
    const {
      company_name = "",
      registration_number = "",
      about_company = "",
      office_address = "",
    } = companyData;

    return {
      companyName: company_name || "",
      companyLogo: null,
      industry: "",
      companyDescription: about_company || "",
      workEnvironmentCulture: "",
      websiteUrl: "",
      companySize: "",
      businessRegistrationNumber: registration_number || "",
      hoursOfOperation: "",
      contactPerson: "",
      contactPersonJobTitle: "",
      email: "",
      phone: "",
      officeAddress: office_address || "",
    };
  }, [companyData]);

  const handleCompanyInfo = async (UID, setFieldValue) => {
    const res = await handleSubmit({
      apiCall: getCompanyDetails,
      values: { registration_number: UID },
    });

    const data = res?.data || {};
    localStorage.setItem("Company", JSON.stringify(data));
    setCompanyData(data);

    // Update Formik fields immediately
    setFieldValue("companyName", data.company_name || "");
    setFieldValue("businessRegistrationNumber", data.registration_number || "");
    setFieldValue("companyDescription", data.about_company || "");
    setFieldValue("officeAddress", data.office_address || "");
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleOnsubmit = async (values, { setSubmitting }) => {
    console.log("Form submitted ✅", values);

    if (activeStep === 0) {
      handleNext();
      setSubmitting(false);
    } else if (activeStep === 1) {
      try {
        const formData = new FormData();

        formData.append("emp_id", user.id); //
        formData.append("company_name", values.companyName); //
        formData.append("industry_type", values.industry); //
        formData.append("about_company", values.companyDescription); //
        formData.append(
          "work_environment_culture",
          values.workEnvironmentCulture
        ); //
        formData.append("website_url", values.websiteUrl); //
        formData.append("employee_count", values.companySize); //
        formData.append(
          "registration_number",
          values.businessRegistrationNumber
        ); //
        formData.append("operating_hrs", values.hoursOfOperation); //
        formData.append("contact_person_name", values.contactPerson); //
        formData.append(
          "contact_person_job_role",
          values.contactPersonJobTitle
        ); //
        formData.append("contact_person_email", values.email); //
        formData.append("contact_person_phone", values.phone); //
        formData.append("office_address", values.officeAddress); //

        if (values.companyLogo) {
          formData.append("company_logo", values.companyLogo); //
        }

        console.log("FormData contents:");
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }

        const response = await createProfile(formData).unwrap();

        if (response?.status === "success") {
          toast.success(response?.message || "Company profile created!");
          await refreshUser();
          navigate("/dashboard");
          localStorage.removeItem("Company");
        } else {
          const errorMessage = response?.message;
          if (typeof errorMessage === "string") {
            toast.error(errorMessage);
          } else if (typeof errorMessage === "object") {
            Object.entries(errorMessage).forEach(([key, value]) => {
              toast.error(`${value.join(", ")}`);
            });
          } else {
            toast.error("An unknown error occurred.");
          }
        }
      } catch (error) {
        console.error(error);
        const errorMessage = error?.data?.message;
        if (typeof errorMessage === "string") {
          toast.error(errorMessage);
        } else if (typeof errorMessage === "object") {
          Object.entries(errorMessage).forEach(([key, value]) => {
            toast.error(`${value.join(", ")}`);
          });
        } else {
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setSubmitting(false);
      }
    }
  };

  // Dynamically choose validation schema
  const currentValidationSchema =
    activeStep === 0 ? step1ValidationSchema : step2ValidationSchema;

  return (
    <div className="w-full mx-auto lg:mx-28 lg:my-20 my-10">
      <Formik
        initialValues={initialValues}
        validationSchema={currentValidationSchema}
        onSubmit={handleOnsubmit}
        enableReinitialize={true} // <-- Add this
      >
        {({ values, handleChange, errors, touched, setFieldValue }) => (
          <Form>
            <Box>
              {activeStep === 0 && (
                <EmployerForm
                  values={values}
                  handleChange={handleChange}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  activeStep={activeStep}
                  handleCompanyInfo={handleCompanyInfo}
                />
              )}

              {activeStep === 1 && (
                <EmployerForm2
                  values={values}
                  handleChange={handleChange}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  onBack={handleBack}
                  activeStep={activeStep}
                />
              )}
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmployerProfileIndex;
