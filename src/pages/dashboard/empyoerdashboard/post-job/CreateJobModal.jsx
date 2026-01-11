import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Input from "../../../../components/ui/Input";
import Textarea from "../../../../components/ui/Textarea";
import Select from "../../../../components/ui/Select";
import InputDatePicker3 from "../../../../components/ui/InputDatePicker3";
import Button from "../../../../components/ui/Button";
import { useCreateJobMutation } from "../../../../services/jobApiSlice";
import { handleSubmit } from "../../../../utils/useHandleSubmit";

// ✅ Validation schema
const validationSchema = Yup.object().shape({
  jobTitle: Yup.string().required("Job title is required"),
  jobDescription: Yup.string().required("Job description is required"),
  jobRole: Yup.string().required("Job role is required"),
  exp_level: Yup.string().required("Experience level is required"),
  skills: Yup.array().min(1, "At least one skill is required"),
  salary: Yup.number()
    .positive("Must be positive")
    .required("Salary is required"),
  vacancy: Yup.number()
    .positive("Must be positive")
    .required("Vacancy is required"),
  location: Yup.string().required("Location is required"),
  startdate: Yup.date().required("Start date is required").nullable(),
});

// 🔹 Options
const experienceOptions = [
  { label: "Select Experience Level", value: "" },
  { label: "Fresher", value: "Fresher" },
  { label: "Mid", value: "Mid" },
  { label: "Senior", value: "Senior" },
];

const skillOptions = [
  { label: "React", value: "React" },
  { label: "Node.js", value: "Node.js" },
  { label: "MongoDB", value: "MongoDB" },
  { label: "JavaScript", value: "JavaScript" },
  { label: "Express", value: "Express" },
];

const CreateJobModal = ({ onClose, refetch }) => {
  const { t } = useTranslation();
  const [createJob] = useCreateJobMutation();
  const [status, setStatus] = useState("draft"); // Default to draft

  const initialValues = {
    jobTitle: "",
    jobDescription: "",
    jobRole: "",
    exp_level: "",
    skills: [],
    salary: "",
    vacancy: "",
    location: "",
    startdate: null,
  };

  const handleFormSubmit = async (values, resetForm) => {
    await handleSubmit({
      apiCall: createJob,
      values: { ...values, status }, // Send status here
      successMessage:
        status === "active"
          ? "Job published successfully!"
          : "Job saved as draft!",
      refetch: () => {
        onClose?.();
        refetch?.();
      },
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) =>
          handleFormSubmit(values, resetForm)
        }
      >
        {({
          values,
          handleChange,
          errors,
          touched,
          setFieldValue,
          handleBlur,
        }) => (
          <Form className="space-y-5">
            <Input
              label="Job Title"
              name="jobTitle"
              type="text"
              value={values.jobTitle}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Software Engineer"
              error={touched.jobTitle && Boolean(errors.jobTitle)}
              helperText={touched.jobTitle && errors.jobTitle}
            />

            <Textarea
              label="Job Description"
              name="jobDescription"
              value={values.jobDescription}
              onChange={handleChange}
              placeholder="Enter Job Description"
              error={touched.jobDescription && Boolean(errors.jobDescription)}
              helperText={touched.jobDescription && errors.jobDescription}
              rows={3}
            />

            <Textarea
              label="Job Role"
              name="jobRole"
              value={values.jobRole}
              onChange={handleChange}
              placeholder="Enter Job Role"
              error={touched.jobRole && Boolean(errors.jobRole)}
              helperText={touched.jobRole && errors.jobRole}
              rows={3}
            />

            <Select
              label="Experience Level"
              name="exp_level"
              value={values.exp_level}
              onChange={handleChange}
              options={experienceOptions}
              error={touched.exp_level && Boolean(errors.exp_level)}
              helperText={touched.exp_level && errors.exp_level}
            />

            <Select
              name="skills"
              label="Skills"
              value={values.skills}
              onChange={handleChange}
              options={skillOptions}
              multiple
              error={touched.skills && Boolean(errors.skills)}
              helperText={touched.skills && errors.skills}
            />

            <Input
              id="salary"
              name="salary"
              label="Salary (in LPA)"
              type="number"
              min={1}
              placeholder="Enter salary"
              value={values.salary}
              onChange={handleChange}
              error={touched.salary && Boolean(errors.salary)}
              helperText={touched.salary && errors.salary}
            />

            <Input
              id="vacancy"
              name="vacancy"
              label="Vacancy"
              type="number"
              min={1}
              placeholder="Enter number of vacancies"
              value={values.vacancy}
              onChange={handleChange}
              error={touched.vacancy && Boolean(errors.vacancy)}
              helperText={touched.vacancy && errors.vacancy}
            />

            <InputDatePicker3
              label="Start Date"
              value={values.startdate}
              onChange={(date) => setFieldValue("startdate", date)}
              error={touched.startdate && Boolean(errors.startdate)}
              helperText={touched.startdate && errors.startdate}
              allowPast={false}
            />

            <Input
              label="Location"
              name="location"
              type="text"
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter location"
              error={touched.location && Boolean(errors.location)}
              helperText={touched.location && errors.location}
            />

            {/* 🔹 Footer Buttons */}
            <div className="flex justify-end pt-4 gap-3">
              <Button
                type="button"
                className="rounded-full bg-gray-300 font-bold px-6 py-2 hover:bg-gray-400"
                onClick={() => {
                  setStatus("draft");
                  document.querySelector("form").requestSubmit();
                }}
              >
                {t("Save Draft")}
              </Button>

              <Button
                type="button"
                className="rounded-full bg-black text-white px-6 py-2 hover:bg-gray-800"
                onClick={() => {
                  setStatus("active");
                  document.querySelector("form").requestSubmit();
                }}
              >
                {t("Publish Job")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateJobModal;
