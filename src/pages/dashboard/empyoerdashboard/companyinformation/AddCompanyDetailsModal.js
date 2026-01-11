import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../../../../components/ui/Input";
import Textarea from "../../../../components/ui/Textarea";
import Select from "../../../../components/ui/Select";
import Button from "../../../../components/ui/Button";
import { handleSubmit } from "../../../../utils/useHandleSubmit";
import { useCreateProfileEmployerMutation } from "../../../../services/authApiSlice";

// 🔹 Validation Schema
const validationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name is required"),
  companyEmail: Yup.string().email("Invalid email").required("Company email is required"),
  companyWebsite: Yup.string().url("Invalid URL").nullable(),
  companyAddress: Yup.string().required("Company address is required"),
  industryType: Yup.string().required("Industry type is required"),
  noOfEmployees: Yup.number()
    .typeError("Must be a number")
    .positive("Must be positive")
    .required("Number of employees is required"),
  registrationNumber: Yup.string().required("Registration number is required"),
  gstNumber: Yup.string().nullable(),
  companyDescription: Yup.string().nullable(),
});

// 🔹 Industry Type Options
const industryOptions = [
  { label: "Select Industry", value: "" },
  { label: "IT", value: "IT" },
  { label: "Manufacturing", value: "Manufacturing" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "Education", value: "Education" },
  { label: "Finance", value: "Finance" },
];

const AddCompanyDetailsModal = ({ onClose }) => {
  const [createCompany] = useCreateProfileEmployerMutation();

  const initialValues = {
    companyName: "",
    companyEmail: "",
    companyWebsite: "",
    companyAddress: "",
    companyLogo: "",
    companyDescription: "",
    industryType: "",
    noOfEmployees: "",
    registrationNumber: "",
    gstNumber: "",
  };

  const handleFormSubmit = async (values, resetForm) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    await handleSubmit({
      apiCall: createCompany,
      values: formData,
      successMessage: "Company details added successfully!",
      refetch: () => onClose?.(),
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => handleFormSubmit(values, resetForm)}
      >
        {({ values, handleChange, handleBlur, setFieldValue, touched, errors }) => (
          <Form className="space-y-5">
            <Input
              label="Company Name"
              name="companyName"
              type="text"
              value={values.companyName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter company name"
              error={touched.companyName && Boolean(errors.companyName)}
              helperText={touched.companyName && errors.companyName}
            />

            <Input
              label="Company Email"
              name="companyEmail"
              type="email"
              value={values.companyEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter company email"
              error={touched.companyEmail && Boolean(errors.companyEmail)}
              helperText={touched.companyEmail && errors.companyEmail}
            />

            <Input
              label="Company Website"
              name="companyWebsite"
              type="url"
              value={values.companyWebsite}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="https://example.com"
              error={touched.companyWebsite && Boolean(errors.companyWebsite)}
              helperText={touched.companyWebsite && errors.companyWebsite}
            />

            <Textarea
              label="Company Address"
              name="companyAddress"
              value={values.companyAddress}
              onChange={handleChange}
              placeholder="Enter full address"
              error={touched.companyAddress && Boolean(errors.companyAddress)}
              helperText={touched.companyAddress && errors.companyAddress}
              rows={2}
            />

            <Select
              label="Industry Type"
              name="industryType"
              value={values.industryType}
              onChange={handleChange}
              options={industryOptions}
              error={touched.industryType && Boolean(errors.industryType)}
              helperText={touched.industryType && errors.industryType}
            />

            <Input
              label="No. of Employees"
              name="noOfEmployees"
              type="number"
              value={values.noOfEmployees}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. 50"
              error={touched.noOfEmployees && Boolean(errors.noOfEmployees)}
              helperText={touched.noOfEmployees && errors.noOfEmployees}
            />

            <Input
              label="Registration Number"
              name="registrationNumber"
              type="text"
              value={values.registrationNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter registration number"
              error={touched.registrationNumber && Boolean(errors.registrationNumber)}
              helperText={touched.registrationNumber && errors.registrationNumber}
            />

            <Input
              label="GST Number"
              name="gstNumber"
              type="text"
              value={values.gstNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter GST number"
              error={touched.gstNumber && Boolean(errors.gstNumber)}
              helperText={touched.gstNumber && errors.gstNumber}
            />

            <Textarea
              label="Company Description"
              name="companyDescription"
              value={values.companyDescription}
              onChange={handleChange}
              placeholder="Tell us about your company"
              rows={3}
            />

            <div>
              <label className="block text-sm font-medium mb-1">Company Logo</label>
              <input
                type="file"
                name="companyLogo"
                accept="image/*"
                onChange={(e) => setFieldValue("companyLogo", e.target.files[0])}
                className="w-full border rounded-md p-2"
              />
            </div>

            {/* 🔹 Footer Buttons */}
            <div className="flex justify-end pt-4 gap-3">
              <Button
                type="button"
                className="rounded-full bg-gray-300 font-bold px-6 py-2 hover:bg-gray-400"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="rounded-full bg-black text-white px-6 py-2 hover:bg-gray-800"
              >
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCompanyDetailsModal;
