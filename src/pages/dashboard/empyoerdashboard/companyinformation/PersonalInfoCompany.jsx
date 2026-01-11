import { Form, Formik } from "formik";
import React from "react";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import ImageUpload from "../../../../components/ui/ImageUpload";
import { useEditCompanyPersonalInfoMutation } from "../../../../services/authApiSlice";
import { handleSubmit } from "../../../../utils/useHandleSubmit";
import { useRefreshToken } from "../../../../utils/refreshToken";
import { useTranslation } from "react-i18next";

const PersonalInfoCompany = ({ userData, refetch, user }) => {
  const [editProfile, { isLoading }] = useEditCompanyPersonalInfoMutation();
  const refreshUser = useRefreshToken();
  const { t } = useTranslation();
  const onSubmit = async (values) => {
    handleSubmit({
      values,
      apiCall: editProfile,
      refetch,
      transformValues: (vals) => {
        const formData = new FormData();
        Object.entries(vals).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value);
          }
        });
        return formData;
      },
    });
    await refreshUser();
  };

  const personalFields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Mobile Number", name: "mobile_number", type: "number" },
  ];

  const contactFields = [
    { label: "Contact Person Name", name: "contact_person_name", type: "text" },
    {
      label: "Contact Person Email",
      name: "contact_person_email",
      type: "email",
    },
    {
      label: "Contact Person Phone Number",
      name: "contact_person_phone",
      type: "number",
    },
    {
      label: "Contact Person Job Role",
      name: "contact_person_job_role",
      type: "text",
    },
  ];

  return (
    <section className="py-5">
      <Formik
        initialValues={{
          employer_id: user?.id || "",
          name: user?.name || "",
          email: user?.email || "",
          profile_image: user?.profile_image || "",
          mobile_number: user?.mobile_number || "",
          contact_person_name: userData?.data.contact_person_name || "",
          contact_person_email: userData?.data.contact_person_email || "",
          contact_person_phone: userData?.data.contact_person_phone || "",
          contact_person_job_role: userData?.data.contact_person_job_role || "",
        }}
        onSubmit={onSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          errors,
          touched,
        }) => (
          <Form className="space-y-5">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold mb-2">
                {t("Personal Information")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {personalFields.map((field) => (
                  <Input
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    disabled={field.name === "email"}
                    value={values[field.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched[field.name] && Boolean(errors[field.name])}
                    helperText={touched[field.name] && errors[field.name]}
                  />
                ))}
                {/* Profile Image */}
                <div className="flex flex-col items-center justify-center">
                  <label className="mb-2 text-sm font-medium text-gray-700">
                    {t("Profile Image")}
                  </label>
                  <ImageUpload
                    initialImage={values.profile_image}
                    onChange={(file) => setFieldValue("profile_image", file)}
                    size="h-20 w-20"
                  />
                  {touched.profile_image && errors.profile_image && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.profile_image}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-semibold mb-6">
                {t("Contact Information")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactFields.map((field) => (
                  <Input
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    value={values[field.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched[field.name] && Boolean(errors[field.name])}
                    helperText={touched[field.name] && errors[field.name]}
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
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

export default PersonalInfoCompany;
// import { Form, Formik } from "formik";
// import React from "react";
// import Button from "../../../../components/ui/Button";
// import Input from "../../../../components/ui/Input";
// import { useEditCompanyPersonalInfoMutation } from "../../../../services/authApiSlice";
// import { handleSubmit } from "../../../../utils/useHandleSubmit";
// import ImageUpload from "../../../../components/ui/ImageUpload";

// const PersonalInfoCompany = ({ userData, refetch, user }) => {
//   const [editProfile, { isLoading }] = useEditCompanyPersonalInfoMutation();

//   const onSubmit = async (values) => {
//     handleSubmit({
//       values,
//       apiCall: editProfile, // Replace with the actual API call function for company details
//       refetch: () => refetch(), // Ensure refetch is available in props/context
//     });
//   };
//   return (
//     <section className="py-10">
//       <div>
//         <Formik
//           initialValues={{
//             employer_id: user?.id,
//             name: user?.name || "",
//             email: user?.email || "",
//             profile_image: user?.profile_image || "",
//             mobile_number: user?.mobile_number || "",
//             contact_person_name: userData?.data.contact_person_name || "",
//             contact_person_email: userData?.data.contact_person_email || "",
//             contact_person_phone: userData?.data.contact_person_phone || "",
//             contact_person_job_role:
//               userData?.data.contact_person_job_role || "",
//           }}
//           onSubmit={onSubmit}
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
//               {/* Input Fields */}
//               <div>
//                 <h1 className="mb-4"> Personal Information</h1>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <Input
//                     label="Name"
//                     name="name"
//                     value={values.name}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     error={touched.name && Boolean(errors.name)}
//                     helperText={touched.name && errors.name}
//                   />
//                   <div>
//                     <ImageUpload
//                       initialImage={values.profile_image}
//                       onChange={(file) => setFieldValue("profile_image", file)}
//                       size="h-20 w-20"
//                     />
//                     {touched.profile_image && errors.profile_image && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {errors.profile_image}
//                       </p>
//                     )}
//                   </div>
//                   <Input
//                     label="Email"
//                     name="email"
//                     type="email"
//                     value={values.email}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     error={touched.email && Boolean(errors.email)}
//                     helperText={touched.email && errors.email}
//                   />
//                   <Input
//                     label="Mobile Number"
//                     name="mobile_number"
//                     type="number"
//                     value={values.mobile_number}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     error={
//                       touched.mobile_number && Boolean(errors.mobile_number)
//                     }
//                     helperText={touched.mobile_number && errors.mobile_number}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <h1 className="mb-4">Contact Information</h1>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <Input
//                     label="Contact Person Name"
//                     name="contact_person_name"
//                     value={values.contact_person_name}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     error={
//                       touched.contact_person_name &&
//                       Boolean(errors.contact_person_name)
//                     }
//                     helperText={
//                       touched.contact_person_name && errors.contact_person_name
//                     }
//                   />
//                   <Input
//                     label="Contact Person Email"
//                     name="contact_person_email"
//                     type="email"
//                     value={values.contact_person_email}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     error={
//                       touched.contact_person_email &&
//                       Boolean(errors.contact_person_email)
//                     }
//                     helperText={
//                       touched.contact_person_email &&
//                       errors.contact_person_email
//                     }
//                   />
//                   <Input
//                     label="Contact Person Phone Number"
//                     name="contact_person_phone"
//                     type="number"
//                     value={values.contact_person_phone}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     error={
//                       touched.contact_person_phone &&
//                       Boolean(errors.contact_person_phone)
//                     }
//                     helperText={
//                       touched.contact_person_phone &&
//                       errors.contact_person_phone
//                     }
//                   />
//                   <Input
//                     label="Contact Person Job Role"
//                     name="contact_person_job_role"
//                     value={values.contact_person_job_role}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     error={
//                       touched.contact_person_job_role &&
//                       Boolean(errors.contact_person_job_role)
//                     }
//                     helperText={
//                       touched.contact_person_job_role &&
//                       errors.contact_person_job_role
//                     }
//                   />
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-end">
//                 <Button
//                   type="submit"
//                   className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
//                   loading={isLoading}
//                 >
//                   {!isLoading && "Save"}
//                 </Button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </section>
//   );
// };

// export default PersonalInfoCompany;
