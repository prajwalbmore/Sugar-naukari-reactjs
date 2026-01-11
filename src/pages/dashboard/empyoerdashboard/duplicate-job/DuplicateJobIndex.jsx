import React, { useState } from "react";
import {
  BriefcaseIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import { Box } from "@mui/material";
import * as Yup from "yup";
import { handleSubmit } from "../../../../utils/useHandleSubmit";
import { useAuthContext } from "../../../../contexts/auth/context";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateJobMutation,
  useGetJobByIDQuery,
  useSaveDraftJobMutation,
} from "../../../../services/jobApiSlice";
import JobDescriptionForm from "../post-job/JobDescriptionForm";
import JobRequirementForm from "../post-job/JobRequirmentForm";
import dayjs from "dayjs";
import Spinner from "../../../../components/ui/Spinner";
import { useTranslation } from "react-i18next";

export const stepValidations = [
  // Step 1: Job Title + Description
  Yup.object().shape({
    jobTitle: Yup.string().trim().required("Job title is required"),
    jobDescription: Yup.string()
      .trim()
      .min(20, "Description must be at least 20 characters")
      .required("Job description is required"),
    jobRole: Yup.string().trim().required("Job role is required"),
  }),

  // Step 2: Job Requirements
  Yup.object().shape({
    exp_level: Yup.string().trim().required("Experience level is required"),
    skills: Yup.array()
      .min(1, "Select at least one skill")
      .of(Yup.string().required())
      .required("Skills are required"),
    vacancy: Yup.number()
      .typeError("Vacancy must be a number")
      .integer("Must be an integer")
      .min(1, "At least 1 vacancy is required")
      .required("Vacancy is required"),
    salary: Yup.number()
      .typeError("Salary must be a number")
      .required("Salary is required")
      .min(0, "Salary cannot be negative"),
    location: Yup.string().required("Location is required"),
    startdate: Yup.date().nullable().required("Start date is required"),
    startTime: Yup.string().required("Start time is required"),
    endTime: Yup.string()
      .required("End time is required")
      .test(
        "is-greater",
        "End time must be after start time",
        function (value) {
          const { startTime } = this.parent;
          if (!startTime || !value) return true; // skip if empty
          return startTime < value;
        }
      ),
  }),
];

const steps = [
  {
    label: "Step 1",
    description: "Job Title and Description",
    icon: BriefcaseIcon,
    validationSchema: stepValidations[0],
  },
  {
    label: "Step 2",
    description: "Job Requirements",
    icon: ClipboardDocumentListIcon,
    validationSchema: stepValidations[1],
  },
];

const Stepper = ({ activeStep, t }) => {
  return (
    <div className="flex items-center w-full space-x-4 p-4 border border-gray-300 rounded-2xl bg-white shadow-sm">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className={`flex w-1/2 items-center space-x-3 ${
              index === activeStep ? "opacity-100" : "opacity-50"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                index === activeStep ? "bg-appcolor " : "bg-gray-300"
              }`}
            >
              <step.icon className="w-6 h-6 " strokeWidth={2} />
            </div>
            <div>
              <div className="  text-gray-800">{t(step.label)}</div>
              <div className="font-semibold text-lg mt-1">
                {t(step.description)}
              </div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className="w-px h-10 bg-gray-200"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const DuplicateJobIndex = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { user } = useAuthContext();
  const { id } = useParams();
  const { data, isLoading: dataLoading, refetch } = useGetJobByIDQuery(id);
  const [createJob, { isLoading }] = useCreateJobMutation();
  const [saveDraftJob, { isLoading: isLoadingSaveDraft }] =
    useSaveDraftJobMutation();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const initialValues = {
    jobTitle: data?.data?.title || "",
    jobDescription: data?.data?.description || "",
    jobRole: data?.data?.job_role || "",
    exp_level: data?.data?.exp_level || "",
    skills: data?.data?.skills?.map((skill) => skill.skill_id) || [],
    salary: data?.data?.salary || "",
    vacancy: data?.data?.no_of_vacancy || "",
    location:
      `${data?.data?.location}, ${data?.data?.state} ,${data?.data?.country}` ||
      "",
    latitude: Number(data?.data?.latitude) || 0,
    longitude: Number(data?.data?.longitude) || 0,
    status: data?.data?.status,
    startdate: null,
    startTime: data?.data?.start_time || "",
    endTime: data?.data?.end_time || "",
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const onSubmit = (values, { setSubmitting }) => {
    if (activeStep === 0) {
      handleNext();
    } else if (activeStep === 1) {
      handleSubmit({
        values,
        apiCall: createJob,
        successRedirect: "/dashboard/jobs-listing",
        navigate: navigate,
        transformValues: (vals) => {
          const parts = vals.location.split(",").map((p) => p.trim());
          const location = parts.slice(0, parts.length - 2).join(", ");
          const state = parts[parts.length - 2] || "";
          const country = parts[parts.length - 1] || "";

          return {
            employer_id: user?.id,
            title: vals.jobTitle,
            description: vals.jobDescription,
            job_role: vals.jobRole,
            job_type: "Part time",
            exp_level: vals.exp_level,
            salary: vals.salary,
            start_date: vals.startdate
              ? new Intl.DateTimeFormat("en-CA").format(vals.startdate)
              : "",
            start_time: vals.startTime,
            end_time: vals.endTime,
            status: "active",
            job_skills: vals.skills,
            location,
            state,
            country,
            latitude: vals.latitude,
            longitude: vals.longitude, // fixed typo
            no_of_vacancy: vals.vacancy,
          };
        },
      });
      console.log("Final Submitted ✅", values);
    }

    setSubmitting(false);
  };
  const handleSaveDraft = (values) => {
    if (activeStep === 0) {
      handleNext();
    } else if (activeStep === 1) {
      handleSubmit({
        values,
        apiCall: saveDraftJob,
        successRedirect: "/dashboard/jobs-listing",
        navigate: navigate,
        transformValues: (vals) => {
          const parts = vals.location.split(",").map((p) => p.trim());
          const location = parts.slice(0, parts.length - 2).join(", ");
          const state = parts[parts.length - 2] || "";
          const country = parts[parts.length - 1] || "";

          return {
            employer_id: user?.id,
            title: vals.jobTitle,
            description: vals.jobDescription,
            job_role: vals.jobRole,
            job_type: "Part time",
            exp_level: vals.exp_level,
            salary: vals.salary,
            start_date: vals.startdate
              ? new Intl.DateTimeFormat("en-CA").format(vals.startdate)
              : "",
            start_time: vals.startTime,
            end_time: vals.endTime,
            status: "save-as-draft",
            job_skills: vals.skills,
            location,
            state,
            country,
            latitude: vals.latitude,
            longitude: vals.longitude, // fixed typo
            no_of_vacancy: vals.vacancy,
          };
        },
      });
      console.log("Final Submitted ✅", values);
    }
  };
  if (dataLoading) return <Spinner />;

  return (
    <section className="p-4">
      <div>
        <Stepper activeStep={activeStep} t={t} />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={steps[activeStep].validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, errors, touched, setFieldValue }) => (
          <Form>
            <Box>
              {activeStep === 0 && (
                <JobDescriptionForm
                  values={values}
                  handleChange={handleChange}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  activeStep={activeStep}
                />
              )}

              {activeStep === 1 && (
                <JobRequirementForm
                  values={values}
                  handleChange={handleChange}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  onBack={handleBack}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  isLoading={isLoading}
                  isLoadingSaveDraft={isLoadingSaveDraft}
                  handleSaveDraft={handleSaveDraft}
                />
              )}
            </Box>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default DuplicateJobIndex;
