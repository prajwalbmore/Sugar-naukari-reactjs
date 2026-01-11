import { Formik, Form } from "formik";
import React from "react";
import Input from "../../../../components/ui/Input";
import FileInput from "../../../../components/ui/FileInput";
import Button from "../../../../components/ui/Button";
import Select from "../../../../components/ui/Select";
import Textarea from "../../../../components/ui/Textarea";
import { handleSubmit } from "../../../../utils/useHandleSubmit";
import { useEditCompanyPersonalInfoMutation } from "../../../../services/authApiSlice";
import { useRefreshToken } from "../../../../utils/refreshToken";
import { useTranslation } from "react-i18next";

const CompanyDetailTap = ({ userData, user, refetch }) => {
  const [editProfile, { isLoading }] = useEditCompanyPersonalInfoMutation();
  const refreshUser = useRefreshToken();
  const { t } = useTranslation();
  const initialValues = {
    company_name: userData?.data?.company_name || "",
    company_logo:
      { name: userData?.data?.company_logo.split("/").pop(), islocal: true } ||
      null,
    about_company: userData?.data?.about_company || "",
    work_environment_culture: userData?.data?.work_environment_culture || "",
    industry_type: userData?.data?.industry_type || "",
    website_url: userData?.data?.website_url || "",
    office_address: userData?.data?.office_address || "",
    registration_number: userData?.data?.registration_number || "",
    operating_hrs: userData?.data?.operating_hrs || "",
    employee_count: userData?.data?.employee_count || "",
  };

  const onSubmit = async (values) => {
    handleSubmit({
      values,
      apiCall: editProfile, // Replace with the actual API call function for company details
      refetch: () => refetch(), // Ensure refetch is available in props/context
      transformValues: (vals) => {
        const formData = new FormData();
        formData.append("employer_id", user?.id);
        formData.append("company_name", vals.company_name);
        formData.append("about_company", vals.about_company);
        formData.append(
          "work_environment_culture",
          vals.work_environment_culture
        );
        formData.append("industry_type", vals.industry_type);
        formData.append("website_url", vals.website_url);
        formData.append("office_address", vals.office_address);
        formData.append("registration_number", vals.registration_number);
        formData.append("operating_hrs", vals.operating_hrs);
        formData.append("employee_count", vals.employee_count);

        if (vals.company_logo && vals.company_logo instanceof File) {
          formData.append("company_logo", vals.company_logo);
        }
        console.log("logo", vals.company_logo);
        if (!vals.company_logo) {
          formData.append("logo_removed", true);
        } else {
          formData.append("logo_removed", false);
        }
        return formData;
      },
    });
    await refreshUser();
  };

  return (
    <section className="py-8">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          errors,
          touched,
        }) => (
          <Form className="space-y-6">
            {/* Company Name and Logo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Company Name"
                name="company_name"
                value={values.company_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.company_name && Boolean(errors.company_name)}
                helperText={touched.company_name && errors.company_name}
              />
              <div>
                <FileInput
                  label="Company Logo"
                  name="company_logo"
                  value={values.company_logo}
                  setFieldValue={setFieldValue}
                  error={touched.company_logo && Boolean(errors.company_logo)}
                  helperText={touched.company_logo && errors.company_logo}
                />
                {/* <p className="text-sm text-gray-600 mt-1">
                  {values.company_logo
                    ? typeof values.company_logo === "string"
                      ? values.company_logo.split("/").pop()
                      : values.company_logo.name
                    : "No file selected"}
                </p> */}
              </div>
            </div>

            {/* Company Description and Work Environment */}
            <div className="space-y-4">
              <Textarea
                label="Company Description"
                name="about_company"
                value={values.about_company}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.about_company && Boolean(errors.about_company)}
                helperText={touched.about_company && errors.about_company}
                rows={3}
              />
              <Textarea
                label="Work Environment Culture"
                name="work_environment_culture"
                value={values.work_environment_culture}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.work_environment_culture &&
                  Boolean(errors.work_environment_culture)
                }
                helperText={
                  touched.work_environment_culture &&
                  errors.work_environment_culture
                }
                rows={3}
              />
            </div>

            {/* Other Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Industry Field"
                name="industry_type"
                value={values.industry_type}
                onChange={handleChange}
                onBlur={handleBlur}
                options={[
                  { label: "Select", value: "" },
                  { label: "Catering", value: "Catering" },
                  { label: "Market Gardening", value: "Market Gardening" },
                  { label: "Reception", value: "Reception" },
                  { label: "Archiving", value: "Archiving" },
                  { label: "Service", value: "Service" },
                  { label: "Sales", value: "Sales" },
                  { label: "Packaging", value: "Packaging" },
                ]}
                error={touched.industry_type && Boolean(errors.industry_type)}
                helperText={touched.industry_type && errors.industry_type}
              />
              <Input
                label="Website URL (Optional)"
                name="website_url"
                value={values.website_url}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.website_url && Boolean(errors.website_url)}
                helperText={touched.website_url && errors.website_url}
              />
              <Input
                label="Office Address"
                name="office_address"
                value={values.office_address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.office_address && Boolean(errors.office_address)}
                helperText={touched.office_address && errors.office_address}
              />
              <Input
                label="UID Number"
                name="registration_number"
                placeholder="CHE411852400"
                value={values.registration_number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.registration_number &&
                  Boolean(errors.registration_number)
                }
                helperText={
                  touched.registration_number && errors.registration_number
                }
              />
              <Input
                label="Hours Of Operation"
                name="operating_hrs"
                value={values.operating_hrs}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.operating_hrs && Boolean(errors.operating_hrs)}
                helperText={touched.operating_hrs && errors.operating_hrs}
              />
              <Select
                label="Size of Company"
                name="employee_count"
                value={values.employee_count}
                onChange={handleChange}
                onBlur={handleBlur}
                options={[
                  { label: "Select", value: "" },
                  { label: "1-10 employees", value: "1-10 employees" },
                  { label: "11-50 employees", value: "11-50 employees" },
                  { label: "51-200 employees", value: "51-200 employees" },
                  { label: "500-1000 employees", value: "500-1000 employees" },
                ]}
                error={touched.employee_count && Boolean(errors.employee_count)}
                helperText={touched.employee_count && errors.employee_count}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                loading={isLoading}
              >
                {!isLoading && t("Save")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default CompanyDetailTap;
// import { Form, Formik } from "formik";
// import React from "react";
// import Input from "../../../../components/ui/Input";
// import FileInput from "../../../../components/ui/FileInput";
// import Button from "../../../../components/ui/Button";
// import Select from "../../../../components/ui/Select";
// import Textarea from "../../../../components/ui/Textarea";

// const CompanyDetailTap = ({ userData, refetch, user }) => {
//   const initialValues = {
//     company_name: userData?.data?.company_name || "",
//     company_logo: userData?.data?.company_logo || null,
//     about_company: userData?.data?.about_company || "",
//     work_environment_culture: userData?.data?.work_environment_culture || "",
//     industry_type: userData?.data?.industry_type || "",
//     website_url: userData?.data?.website_url || "",
//     office_address: userData?.data?.office_address || "",
//     registration_number: userData?.data?.registration_number || "",
//     operating_hrs: userData?.data?.operating_hrs || "",
//     employee_count: userData?.data?.employee_count || "",
//   };
//   const onSubmit = async (values) => {
//     console.log("values", values);
//   };
//   return (
//     <section className="py-8">
//       <div>
//         <Formik
//           initialValues={initialValues}
//           // validationSchema={validationSchema} // Add if needed
//           onSubmit={onSubmit} // Define this function
//         >
//           {({
//             values,
//             handleChange,
//             handleBlur,
//             setFieldValue,
//             errors,
//             touched,
//           }) => (
//             <Form className="space-y-6">
//               {/* Company Name and Logo */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Input
//                   label="Company Name"
//                   name="company_name"
//                   value={values.company_name}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.company_name && Boolean(errors.company_name)}
//                   helperText={touched.company_name && errors.company_name}
//                 />
//                 <FileInput
//                   label="Company Logo"
//                   name="company_logo"
//                   value={values.company_logo}
//                   setFieldValue={setFieldValue}
//                   error={touched.company_logo && Boolean(errors.company_logo)}
//                   helperText={touched.company_logo && errors.company_logo}
//                 />
//                 {values.company_logo
//                   ? values.company_logo.split("/").pop()
//                   : "No file selected"}
//               </div>

//               {/* Company Description and Environment Culture */}
//               <div className="space-y-4">
//                 <Textarea
//                   label="Company Description"
//                   name="about_company"
//                   value={values.about_company}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.about_company && Boolean(errors.about_company)}
//                   helperText={touched.about_company && errors.about_company}
//                   rows={3}
//                 />
//                 <Textarea
//                   label="Work Environment Culture"
//                   name="work_environment_culture"
//                   value={values.work_environment_culture}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={
//                     touched.work_environment_culture &&
//                     Boolean(errors.work_environment_culture)
//                   }
//                   helperText={
//                     touched.work_environment_culture &&
//                     errors.work_environment_culture
//                   }
//                   rows={3}
//                 />
//               </div>

//               {/* Other Details */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Select
//                   label="Industry Field"
//                   name="industry_type"
//                   value={values.industry_type}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   options={[
//                     { label: "Select", value: "" },
//                     { label: "Catering", value: "Catering" },
//                     { label: "Market Gardening", value: "Market Gardening" },
//                     { label: "Reception", value: "Reception" },
//                     { label: "Archiving", value: "Archiving" },
//                     { label: "Service", value: "Service" },
//                     { label: "Sales", value: "Sales" },
//                     { label: "Packaging", value: "Packaging" },
//                   ]}
//                   error={touched.industry_type && Boolean(errors.industry_type)}
//                   helperText={touched.industry_type && errors.industry_type}
//                 />

//                 <Input
//                   label="Website URL (Optional)"
//                   name="website_url"
//                   type="text"
//                   value={values.website_url}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.website_url && Boolean(errors.website_url)}
//                   helperText={touched.website_url && errors.website_url}
//                 />

//                 <Input
//                   label="Office Address"
//                   name="office_address"
//                   type="text"
//                   value={values.office_address}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={
//                     touched.office_address && Boolean(errors.office_address)
//                   }
//                   helperText={touched.office_address && errors.office_address}
//                 />

//                 <Input
//                   label="Business Registration Number"
//                   name="registration_number"
//                   type="text"
//                   value={values.registration_number}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={
//                     touched.registration_number &&
//                     Boolean(errors.registration_number)
//                   }
//                   helperText={
//                     touched.registration_number && errors.registration_number
//                   }
//                 />

//                 <Input
//                   label="Hours Of Operation"
//                   name="operating_hrs"
//                   type="text"
//                   value={values.operating_hrs}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.operating_hrs && Boolean(errors.operating_hrs)}
//                   helperText={touched.operating_hrs && errors.operating_hrs}
//                 />

//                 <Select
//                   label="Size of Company"
//                   name="employee_count"
//                   value={values.employee_count}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   options={[
//                     { label: "Select", value: "" },
//                     { label: "1-10 employees", value: "1-10 employees" },
//                     { label: "11-50 employees", value: "11-50 employees" },
//                     { label: "51-200 employees", value: "51-200 employees" },
//                     {
//                       label: "500-1000 employees",
//                       value: "500-1000 employees",
//                     },
//                   ]}
//                   error={
//                     touched.employee_count && Boolean(errors.employee_count)
//                   }
//                   helperText={touched.employee_count && errors.employee_count}
//                 />
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-end">
//                 <Button
//                   type="submit"
//                   className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
//                 >
//                   Save
//                 </Button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </section>
//   );
// };

// export default CompanyDetailTap;
// import { Form, Formik } from "formik";
// import React from "react";
// import Input from "../../../../components/ui/Input";
// import FileInput from "../../../../components/ui/FileInput";
// import Button from "../../../../components/ui/Button";
// import Select from "../../../../components/ui/Select";
// import Textarea from "../../../../components/ui/Textarea";

// const CompanyDetailTap = ({ userData, refetch, user }) => {
//   const initialValues = {
//     company_name: userData?.data?.company_name || "",
//     company_logo: userData?.data?.company_logo || null,
//     about_company: userData?.data?.about_company || "",
//     work_environment_culture: "",
//     industry_type: "",
//     website_url: "",
//     office_address: "",
//     registration_number: "",
//     operating_hrs: "",
//     employee_count: "",
//     skills: "",
//   };

//   return (
//     <section className="py-8">
//       <div>
//         <Formik
//           initialValues={initialValues}
//           // validationSchema={validationSchema} // Define this if needed
//           // onSubmit={handleSubmit} // Define this if needed
//         >
//           {({
//             values,
//             handleChange,
//             handleBlur,
//             setFieldValue,
//             errors,
//             touched,
//           }) => (
//             <Form className="space-y-6">
//               {/* Company Name and Logo */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Input
//                   label="Company Name"
//                   name="company_name"
//                   value={values.company_name}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.company_name && Boolean(errors.company_name)}
//                   helperText={touched.company_name && errors.company_name}
//                 />
//                 <FileInput
//                   label="Company Logo"
//                   name="company_logo"
//                   value={values.company_logo}
//                   setFieldValue={setFieldValue}
//                   error={touched.company_logo && Boolean(errors.company_logo)}
//                   helperText={touched.company_logo && errors.company_logo}
//                 />
//               </div>

//               {/* about_company & work_environment_culture */}
//               <div className="space-y-4">
//                 <Textarea
//                   label="Company Description"
//                   name="about_company"
//                   value={values.about_company}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.about_company && Boolean(errors.about_company)}
//                   helperText={touched.about_company && errors.about_company}
//                   rows={3}
//                 />
//                 <Textarea
//                   label="Work Environment Culture"
//                   name="work_environment_culture"
//                   value={values.work_environment_culture}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={
//                     touched.work_environment_culture &&
//                     Boolean(errors.work_environment_culture)
//                   }
//                   helperText={
//                     touched.work_environment_culture &&
//                     errors.work_environment_culture
//                   }
//                   rows={3}
//                 />
//               </div>

//               {/* Other Company Details */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Select
//                   label="Industry Field"
//                   name="industry_type"
//                   value={values.industry_type}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   options={[
//                     { label: "Select", value: "" },
//                     { label: "Catering", value: "Catering" },
//                     { label: "Market Gardening", value: "Market Gardening" },
//                     { label: "Reception", value: "Reception" },
//                     { label: "Archiving", value: "Archiving" },
//                     { label: "Service", value: "Service" },
//                     { label: "Sales", value: "Sales" },
//                     { label: "Packaging", value: "Packaging" },
//                   ]}
//                   error={touched.industry_type && Boolean(errors.industry_type)}
//                   helperText={touched.industry_type && errors.industry_type}
//                 />

//                 <Input
//                   label="Website URL (Optional)"
//                   name="website_url"
//                   type="text"
//                   value={values.website_url}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.website_url && Boolean(errors.website_url)}
//                   helperText={touched.website_url && errors.website_url}
//                 />

//                 <Input
//                   label="Office Address"
//                   name="office_address"
//                   type="text"
//                   value={values.office_address}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.office_address && Boolean(errors.office_address)}
//                   helperText={touched.office_address && errors.office_address}
//                 />

//                 <Input
//                   label="Business Registration Number"
//                   name="registration_number"
//                   type="text"
//                   value={values.registration_number}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.registration_number && Boolean(errors.registration_number)}
//                   helperText={touched.registration_number && errors.registration_number}
//                 />

//                 <Input
//                   label="operating_hrs Of Operation"
//                   name="operating_hrs"
//                   type="text"
//                   value={values.operating_hrs}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.operating_hrs && Boolean(errors.operating_hrs)}
//                   helperText={touched.operating_hrs && errors.operating_hrs}
//                 />

//                 <Select
//                   label="Employee Count"
//                   name="employee_count"
//                   value={values.employee_count}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   options={[
//                     { label: "Select", value: "" },
//                     { label: "1-10", value: "1-10" },
//                     { label: "11-50", value: "11-50" },
//                     { label: "51-200", value: "51-200" },
//                     { label: "201+", value: "201+" },
//                   ]}
//                   error={touched.employee_count && Boolean(errors.employee_count)}
//                   helperText={touched.employee_count && errors.employee_count}
//                 />
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-end">
//                 <Button
//                   type="submit"
//                   className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
//                 >
//                   Save
//                 </Button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </section>
//   );
// };

// export default CompanyDetailTap;
