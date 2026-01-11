import React, { useState } from "react";
import { Box } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import EmployeeForm from "./EmployeeForm";
import EmployeeTermsCondition from "./EmployeeTermsCondition";
import dayjs from "dayjs";
import { useCreateProfileMutation } from "../../services/authApiSlice";
import { toast } from "sonner";
import { useAuthContext } from "../../contexts/auth/context";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";
import { useRefreshToken } from "../../utils/refreshToken";

const validationSchema = Yup.object({
  profileImage: Yup.mixed().required("Profile Image is required"),
  name: Yup.string().required("Full Name is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be a valid 10-digit number")
    .required("Phone number is required"),
  location: Yup.string().required("Location is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.string()
    .nullable()
    .required("Date of Birth is required")
    .test("age", "You must be at least 18 years old", function (value) {
      if (!value) return false;
      const today = dayjs();
      const birthDate = dayjs(value, "DD/MM/YY"); // ✅ parse with format
      return today.diff(birthDate, "year") >= 18;
    }),
  agree: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions"
  ),
  summary: Yup.string().required("Profile summary is required"),
  education: Yup.string().required("Education is required"),
  language: Yup.array()
    .min(1, "Select at least one language")
    .required("Language is required"),
  skills: Yup.array()
    .min(1, "Select at least one skill")
    .required("Skills are required"),
  idProof: Yup.mixed().required("Identity Proof is required"),
  certifications: Yup.array()
    .min(1, "Upload at least one certification")
    .required("Certifications are required"),
  que_ans: Yup.string().required("Please answer the question"),
});

const ProfileFormIndex = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [createProfile] = useCreateProfileMutation();

  const { isInitialized, user } = useAuthContext();
  const navigate = useNavigate();
  const refreshUser = useRefreshToken();
  if (!isInitialized) {
    return <Spinner />; // Or a spinner
  }
  console.log("user", user);
  const initialValues = {
    profileImage: null,
    name: user?.name || "",
    phone: user?.mobile_number || "",
    location: "",
    latitude: 0, // Add this
    longitude: 0, // Add this
    gender: "",
    dob: null,
    summary: "",
    education: "",
    certifications: [],
    language: [],
    skills: [],
    idProof: null,
    agree: false,
    que_ans: "",
  };

  const handleNext = () => setActiveStep((s) => s + 1);
  const handleBack = () => setActiveStep((s) => s - 1);

  // const handleSubmit = (values) => {
  //   console.log("Final Submitted ✅", values);
  //   // 👉 API call here
  //   if (activeStep === 0) {
  //     handleNext();
  //   }
  //   if (activeStep === 1) {
  //     console.log("Final Submitted ✅", values);
  //     const formData = new FormData();
  //     formData.append("name", values.name);
  //   }
  // };
  const handleSubmit = async (values) => {
    console.log("Form submitted ✅", values);

    if (activeStep === 0) {
      handleNext();
    } else if (activeStep === 1) {
      try {
        const formData = new FormData();

        formData.append("emp_id", user?.id);
        formData.append("full_name", values.name);
        formData.append("phone", values.phone);
        formData.append("location", values.location);
        formData.append("latitude", values.latitude); // Add this
        formData.append("longitude", values.longitude); // Add this
        formData.append("gender", values.gender);
        formData.append("agree", values.agree);
        formData.append("que_ans", values.que_ans);
        formData.append("date_of_birth", values.dob);

        formData.append("profile_summary", values.summary);
        formData.append("education", values.education);

        // Append arrays as JSON strings or individually
        if (values.language && values.language.length > 0) {
          values.language.forEach((lang) => {
            formData.append("languages[]", lang);
          });
        }

        if (values.skills && values.skills.length > 0) {
          values.skills.forEach((skill) => {
            formData.append("emp_skills[]", skill);
          });
        }

        // Append single file
        if (values.profileImage) {
          formData.append("profile_image", values.profileImage);
        }

        // Append multiple files individually
        if (values.certifications && values.certifications.length > 0) {
          values.certifications.forEach((file, index) => {
            formData.append("certifications_file[]", file);
          });
        }

        if (values.idProof) {
          formData.append("user_id_proof", values.idProof);
        }

        // ✅ Log all entries in FormData
        console.log("FormData contents:");
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }

        const response = await createProfile(formData).unwrap();
        if (response?.status === "success") {
          toast.success(response?.message || "");
          await refreshUser();
          navigate("/dashboard");
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
        const errorMessage = error?.data?.message;
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
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, errors, touched, setFieldValue }) => (
        <Form>
          <Box>
            {activeStep === 0 && (
              <EmployeeForm
                values={values}
                handleChange={handleChange}
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
              />
            )}

            {activeStep === 1 && (
              <EmployeeTermsCondition
                onBack={handleBack}
                submitForm={handleSubmit}
              />
            )}
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileFormIndex;
