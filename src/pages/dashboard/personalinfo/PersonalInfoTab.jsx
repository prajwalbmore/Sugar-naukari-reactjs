import { Form, Formik } from "formik";
import React from "react";
import ImageUpload from "../../../components/ui/ImageUpload";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import InputDatePicker from "../../../components/ui/InputDatePicker";
import Textarea from "../../../components/ui/Textarea";
import FileInput from "../../../components/ui/FileInput";
import Button from "../../../components/ui/Button";

import {
  useEditEmployeePersonalInfoMutation,
  useGetLanguageQuery,
  useGetSkillsQuery,
} from "../../../services/authApiSlice";
import dayjs from "dayjs";
import { handleSubmit } from "../../../utils/useHandleSubmit";
import { useRefreshToken } from "../../../utils/refreshToken";
import { useTranslation } from "react-i18next";
import { useDisclosure } from "../../../hooks/useDisclosure";
import Modal from "../../../components/ui/Modal";
import LocationMapModal from "./LocationMapModal";

const PersonalInfoTab = ({ userData, refetch, user }) => {
  const { t } = useTranslation();
  const { data: skillData } = useGetSkillsQuery();
  const { data: langData } = useGetLanguageQuery();
  const [editProfile, { isLoading }] = useEditEmployeePersonalInfoMutation();
  const refreshUser = useRefreshToken();

  // Add modal state
  const [
    isLocationModalOpen,
    { open: openLocationModal, close: closeLocationModal },
  ] = useDisclosure(false);

  const skillsOption =
    skillData?.data?.map((skill) => ({
      label: skill.skill_name,
      value: skill.skill_id,
    })) || [];

  const langOption =
    langData?.data?.map((lang) => ({
      label: lang.name,
      value: lang.name,
    })) || [];

  console.log(userData, "userDatauserDatauserData");

  const initialValues = {
    profile_image: userData?.data?.profile_image || null,
    full_name: userData?.data?.full_name || "",
    languages: userData?.data?.languages?.map((lang) => lang.lang) || [],
    mobile_number: userData?.data?.mobile_number || "",
    location: userData?.data?.location || "",
    latitude: Number(userData?.data?.latitude) || 0, // Add latitude
    longitude: Number(userData?.data?.longitude) || 0, // Add longitude
    gender: userData?.data?.gender || "",
    date_of_birth: userData?.data?.date_of_birth
      ? dayjs(userData?.data?.date_of_birth, "DD MMM YYYY")
      : null,
    profile_summary: userData?.data?.profile_summary || "",
    emp_skills: userData?.data?.skills?.map((skill) => skill.skill_id) || [],
  };

  const onSubmit = async (values) => {
    handleSubmit({
      values,
      apiCall: editProfile,
      refetch: () => {
        refetch();
      },
      transformValues: (vals) => {
        const formData = new FormData();
        formData.append("employee_id", user?.id);
        formData.append("full_name", vals?.full_name);
        formData.append("mobile_number", vals?.mobile_number);
        formData.append("profile_summary", vals?.profile_summary);
        formData.append("location", vals.location);
        formData.append("latitude", vals.latitude); // Add latitude
        formData.append("longitude", vals.longitude); // Add longitude
        formData.append("gender", vals.gender);

        if (vals?.profile_image instanceof File) {
          formData.append("profile_image", vals.profile_image);
        }
        if (vals.languages && vals.languages.length > 0) {
          vals.languages.forEach((lang) => {
            formData.append("languages[]", lang);
          });
        }

        if (vals.emp_skills && vals.emp_skills.length > 0) {
          vals.emp_skills.forEach((skill) => {
            formData.append("emp_skills[]", skill);
          });
        }

        formData.append("d_o_b", vals.date_of_birth);
        return formData;
      },
    });
    await refreshUser();
  };

  return (
    <>
      <section className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">{t("Basic Information ")}</h1>
          <p className="text-md text-gray-500">
            {t("This is your personal information that you can update anytime")}
            .
          </p>
          <div className="bg-gray-200 h-[1.5px]" />
        </div>

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({
            values,
            handleChange,
            handleBlur,
            setFieldValue,
            errors,
            touched,
            isSubmitting,
          }) => (
            <Form className="space-y-6">
              {/* Profile Image */}
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="md:w-1/3 space-y-2">
                  <h2 className="text-lg font-semibold">
                    {t("Profile Photo")}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {t(
                      "This image will be shown publicly as your profile picture"
                    )}
                    .
                  </p>
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <ImageUpload
                    initialImage={values.profile_image}
                    onChange={(file) => setFieldValue("profile_image", file)}
                    size="h-32 w-32"
                  />
                  {touched.profile_image && errors.profile_image && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.profile_image}
                    </p>
                  )}
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="full_name"
                  value={values.full_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.full_name && Boolean(errors.full_name)}
                  helperText={touched.full_name && errors.full_name}
                />

                <Select
                  label="Language"
                  name="languages"
                  value={values.languages}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiple
                  options={langOption}
                  error={touched.languages && Boolean(errors.languages)}
                  helperText={touched.languages && errors.languages}
                />

                <Input
                  label="Phone Number"
                  name="mobile_number"
                  type="number"
                  value={values.mobile_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.mobile_number && Boolean(errors.mobile_number)}
                  helperText={touched.mobile_number && errors.mobile_number}
                />

                {/* Updated Location Input with Click Handler */}
                <div className="relative">
                  <Input
                    label="Location"
                    name="location"
                    value={values.location}
                    onChange={handleChange}
                    onClick={openLocationModal} // Add click handler
                    readOnly // Make it read-only so users must use modal
                    className="cursor-pointer"
                    placeholder="Click to select location"
                    error={touched.location && Boolean(errors.location)}
                    helperText={touched.location && errors.location}
                  />
                </div>

                <Select
                  label="Gender"
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  options={[
                    { label: "Select", value: "" },
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Non-Binary", value: "non-binary" },
                    { label: "Other(specify)", value: "other" },
                    { label: "Prefer not to say", value: "prefer not to say" },
                  ]}
                  error={touched.gender && Boolean(errors.gender)}
                  helperText={touched.gender && errors.gender}
                />

                <InputDatePicker
                  label="Date of Birth"
                  value={values.date_of_birth}
                  onChange={(newValue) =>
                    setFieldValue("date_of_birth", newValue)
                  }
                  onBlur={handleBlur}
                  error={touched.date_of_birth && Boolean(errors.date_of_birth)}
                  helperText={touched.date_of_birth && errors.date_of_birth}
                />
              </div>

              {/* Summary and Skills */}
              <div className="space-y-4">
                <Textarea
                  label="Profile Summary"
                  name="profile_summary"
                  value={values.profile_summary}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.profile_summary && Boolean(errors.profile_summary)
                  }
                  helperText={touched.profile_summary && errors.profile_summary}
                  rows={3}
                />

                <Select
                  label="Skills Required"
                  name="emp_skills"
                  value={values.emp_skills}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiple
                  options={skillsOption}
                  error={touched.emp_skills && Boolean(errors.emp_skills)}
                  helperText={touched.emp_skills && errors.emp_skills}
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

              {/* Location Modal */}
              <Modal
                onClose={closeLocationModal}
                open={isLocationModalOpen}
                title={t("Select Location")}
                size="xl"
              >
                <LocationMapModal
                  onClose={closeLocationModal}
                  onLocationSave={(locationData) => {
                    setFieldValue("location", locationData.location);
                    setFieldValue("latitude", locationData.latitude);
                    setFieldValue("longitude", locationData.longitude);
                  }}
                  initialValues={{
                    location: values.location,
                    latitude: values.latitude,
                    longitude: values.longitude,
                  }}
                />
              </Modal>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
};

export default PersonalInfoTab;

////Prajwal Working Code///
// import { Form, Formik } from "formik";
// import React from "react";
// import ImageUpload from "../../../components/ui/ImageUpload";
// import Input from "../../../components/ui/Input";
// import Select from "../../../components/ui/Select";
// import InputDatePicker from "../../../components/ui/InputDatePicker";
// import Textarea from "../../../components/ui/Textarea";
// import FileInput from "../../../components/ui/FileInput";
// import Button from "../../../components/ui/Button";
// import {
//   useEditEmployeePersonalInfoMutation,
//   useGetLanguageQuery,
//   useGetSkillsQuery,
// } from "../../../services/authApiSlice";
// import dayjs from "dayjs";
// import { handleSubmit } from "../../../utils/useHandleSubmit";
// import { useRefreshToken } from "../../../utils/refreshToken";
// import { useTranslation } from "react-i18next";

// const PersonalInfoTab = ({ userData, refetch, user }) => {
//   const { t } = useTranslation();
//   const { data: skillData } = useGetSkillsQuery();
//   const { data: langData } = useGetLanguageQuery();
//   const [editProfile, { isLoading }] = useEditEmployeePersonalInfoMutation();
//   const refreshUser = useRefreshToken();

//   const skillsOption =
//     skillData?.data?.map((skill) => ({
//       label: skill.skill_name,
//       value: skill.skill_id,
//     })) || [];

//   const langOption =
//     langData?.data?.map((lang) => ({
//       label: lang.name,
//       value: lang.name,
//     })) || [];

//     console.log(userData,"userDatauserDatauserData")

//   const initialValues = {
//     profile_image: userData?.data?.profile_image || null,
//     full_name: userData?.data?.full_name || "",
//     languages: userData?.data?.languages?.map((lang) => lang.lang) || [],
//     mobile_number: userData?.data?.mobile_number || "",
//     location: userData?.data?.location || "",
//     gender: userData?.data?.gender || "",

//     date_of_birth: userData?.data?.date_of_birth
//       ? dayjs(userData?.data?.date_of_birth, "DD MMM YYYY")
//       : null,
//     profile_summary: userData?.data?.profile_summary || "",
//     emp_skills: userData?.data?.skills?.map((skill) => skill.skill_id) || [],
//   };
//   const onSubmit = async (values) => {
//     handleSubmit({
//       values,
//       apiCall: editProfile,
//       refetch: () => {
//         refetch();
//       },
//       transformValues: (vals) => {
//         const formData = new FormData();
//         formData.append("employee_id", user?.id);
//         formData.append("full_name", vals?.full_name);
//         formData.append("mobile_number", vals?.mobile_number);
//         formData.append("profile_summary", vals?.profile_summary);
//         formData.append("location", values.location);
//         formData.append("gender", values.gender);

//         if (vals?.profile_image instanceof File) {
//           formData.append("profile_image", vals.profile_image);
//         }
//         if (vals.languages && vals.languages.length > 0) {
//           vals.languages.forEach((lang) => {
//             formData.append("languages[]", lang);
//           });
//         }

//         if (vals.emp_skills && vals.emp_skills.length > 0) {
//           vals.emp_skills.forEach((skill) => {
//             formData.append("emp_skills[]", skill);
//           });
//         }

//         formData.append(
//           "d_o_b",
//           vals.date_of_birth
//           // ? new Intl.DateTimeFormat("en-CA").format(vals.date_of_birth)
//           // : ""
//         );
//         return formData;
//       },
//     });
//     await refreshUser();
//   };

//   return (
//     <section className="space-y-6">
//       <div className="space-y-3">
//         <h1 className="text-xl font-semibold">{t("Basic Information ")}</h1>
//         <p className="text-md text-gray-500">
//           {t("This is your personal information that you can update anytime")}.
//         </p>
//         <div className="bg-gray-200 h-[1.5px]" />
//       </div>

//       <Formik initialValues={initialValues} onSubmit={onSubmit}>
//         {({
//           values,
//           handleChange,
//           handleBlur,
//           setFieldValue,
//           errors,
//           touched,
//           isSubmitting,
//         }) => (
//           <Form className="space-y-6">
//             {/* Profile Image */}
//             <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
//               <div className="md:w-1/3 space-y-2">
//                 <h2 className="text-lg font-semibold">{t("Profile Photo")}</h2>
//                 <p className="text-gray-500 text-sm">
//                   {t(
//                     "This image will be shown publicly as your profile picture"
//                   )}
//                   .
//                 </p>
//               </div>
//               <div className="flex flex-col items-center md:items-start">
//                 <ImageUpload
//                   initialImage={values.profile_image}
//                   onChange={(file) => setFieldValue("profile_image", file)}
//                   size="h-32 w-32"
//                 />
//                 {touched.profile_image && errors.profile_image && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.profile_image}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Form Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Input
//                 label="Full Name"
//                 name="full_name"
//                 value={values.full_name}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.full_name && Boolean(errors.full_name)}
//                 helperText={touched.full_name && errors.full_name}
//               />

//               <Select
//                 label="Language"
//                 name="languages"
//                 value={values.languages}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 multiple
//                 options={langOption}
//                 error={touched.languages && Boolean(errors.languages)}
//                 helperText={touched.languages && errors.languages}
//               />

//               <Input
//                 label="Phone Number"
//                 name="mobile_number"
//                 type="number"
//                 value={values.mobile_number}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.mobile_number && Boolean(errors.mobile_number)}
//                 helperText={touched.mobile_number && errors.mobile_number}
//               />

//               <Input
//                 label="Location"
//                 name="location"
//                 value={values.location}
//                 onChange={handleChange}
//                 error={touched.location && Boolean(errors.location)}
//                 helperText={touched.location && errors.location}
//               />
//               <Select
//                 label="Gender"
//                 name="gender"
//                 value={values.gender}
//                 onChange={handleChange}

//                 options={[
//                   { label: "Select", value: "" },
//                   { label: "Male", value: "male" },
//                   { label: "Female", value: "female" },
//                   { label: "Non-Binary", value: "non-binary" },
//                   { label: "Other(specify)", value: "other" },
//                   { label: "Prefer not to say", value: "prefer not to say" },
//                 ]}
//                 error={touched.gender && Boolean(errors.gender)}
//                 helperText={touched.gender && errors.gender}
//               />

//               {/* <FileInput
//                 label="Upload Certifications"
//                 name="certifications"
//                 multiple
//                 value={values.certifications}
//                 setFieldValue={setFieldValue}
//                 error={touched.certifications && Boolean(errors.certifications)}
//                 helperText={touched.certifications && errors.certifications}
//               /> */}

//               <InputDatePicker
//                 label="Date of Birth"
//                 value={values.date_of_birth}
//                 onChange={(newValue) =>
//                   setFieldValue("date_of_birth", newValue)
//                 }
//                 onBlur={handleBlur}
//                 error={touched.date_of_birth && Boolean(errors.date_of_birth)}
//                 helperText={touched.date_of_birth && errors.date_of_birth}
//               />

//               {/* <FileInput
//                 label="Upload Identity Proof"
//                 name="idProof"
//                 value={values.idProof}
//                 setFieldValue={setFieldValue}
//                 error={touched.idProof && Boolean(errors.idProof)}
//                 helperText={touched.idProof && errors.idProof}
//               /> */}
//             </div>

//             {/* Summary and Skills */}
//             <div className="space-y-4">
//               <Textarea
//                 label="Profile Summary"
//                 name="profile_summary"
//                 value={values.profile_summary}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={
//                   touched.profile_summary && Boolean(errors.profile_summary)
//                 }
//                 helperText={touched.profile_summary && errors.profile_summary}
//                 rows={3}
//               />

//               <Select
//                 label="Skills Required"
//                 name="emp_skills"
//                 value={values.emp_skills}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 multiple
//                 options={skillsOption}
//                 error={touched.emp_skills && Boolean(errors.emp_skills)}
//                 helperText={touched.emp_skills && errors.emp_skills}
//               />
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end">
//               <Button
//                 type="submit"
//                 className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
//                 loading={isLoading}
//               >
//                 {!isLoading && t("Save")}
//               </Button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </section>
//   );
// };

// export default PersonalInfoTab;

///Prajwal Old Code////
// import { Form, Formik } from "formik";
// import React from "react";
// import ImageUpload from "../../../components/ui/ImageUpload";
// import Input from "../../../components/ui/Input";
// import Select from "../../../components/ui/Select";
// import InputDatePicker from "../../../components/ui/InputDatePicker";
// import Textarea from "../../../components/ui/Textarea";
// import FileInput from "../../../components/ui/FileInput";
// import Button from "../../../components/ui/Button";
// import {
//   useGetLanguageQuery,
//   useGetSkillsQuery,
//   useGetUserDetailsQuery,
// } from "../../../services/authApiSlice";
// import { useAuthContext } from "../../../contexts/auth/context";

// const PersonalInfoTab = () => {
//   const { user } = useAuthContext();
//   const { data: userData, isLoading } = useGetUserDetailsQuery(user?.id);
//   const {
//     data: skillData,
//     isLoading: skillisLoading,
//     isError: skillisError,
//   } = useGetSkillsQuery();
//   const {
//     data: langData,
//     isLoading: langisLoading,
//     isError: langisError,
//   } = useGetLanguageQuery();
//   const skillsOption = skillData?.data?.map((skill) => ({
//     label: skill?.skill_name,
//     value: skill?.skill_id,
//   }));
//   const langOption = langData?.data?.map((lang) => ({
//     label: lang?.name,
//     value: lang?.name,
//   }));
//   if (isLoading) {
//     return <div>Loading..............................</div>;
//   }
//   const initialValues = {
//     profileImage: userData?.data?.profile_image || null,
//     name: userData?.data?.full_name || "",
//     language: [],
//     phone: userData?.data?.mobile_number,
//     certifications: null,
//     dob: null,
//     idProof: null,
//     summary: userData?.data?.full_name,
//     skills:
//       userData?.data?.skills?.map((skill) => ({
//         label: skill?.skill_name,
//         value: skill?.skill_id,
//       })) || [],
//   };
//   console.log("initialValues", initialValues);
//   const handleSubmit = (values) => {
//     console.log("Submitted values:", values);
//   };

//   return (
//     <section className="space-y-6">
//       <div className="space-y-3">
//         <h1 className="text-xl font-semibold">Basic Information</h1>
//         <p className="text-md text-gray-500">
//           This is your educational information that you can update anytime.
//         </p>
//         <div className="bg-gray-200 h-[1.5px]" />
//       </div>

//       <Formik
//         initialValues={initialValues}
//         // validationSchema={validationSchema} // Uncomment when you define validation
//         onSubmit={handleSubmit}
//       >
//         {({
//           values,
//           handleChange,
//           handleBlur,
//           setFieldValue,
//           errors,
//           touched,
//         }) => (
//           <Form className="space-y-6">
//             {/* Profile Image Section */}
//             <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
//               <div className="md:w-1/3 space-y-2">
//                 <h2 className="text-lg font-semibold">Profile Photo</h2>
//                 <p className="text-gray-500 text-sm">
//                   This image will be shown publicly as your profile picture. It
//                   will help recruiters recognize you!
//                 </p>
//               </div>
//               <div className="flex flex-col items-center md:items-start">
//                 <ImageUpload
//                   initialImage={
//                     values.profileImage
//                     // ? URL.createObjectURL(values?.profileImage)
//                     // : ""
//                   }
//                   onChange={(file) => setFieldValue("profileImage", file)}
//                   size="h-32 w-32"
//                 />
//                 {touched.profileImage && errors.profileImage && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.profileImage}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Input Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Input
//                 label="Full Name"
//                 name="name"
//                 value={values.name}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.name && Boolean(errors.name)}
//                 helperText={touched.name && errors.name}
//               />

//               <Select
//                 label="Language"
//                 name="language"
//                 value={values.language}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 multiple
//                 options={langOption}
//                 error={touched.language && Boolean(errors.language)}
//                 helperText={touched.language && errors.language}
//               />

//               <Input
//                 label="Phone Number"
//                 name="phone"
//                 type="number"
//                 value={values.phone}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.phone && Boolean(errors.phone)}
//                 helperText={touched.phone && errors.phone}
//               />

//               <FileInput
//                 label="Upload Certifications"
//                 name="certifications"
//                 multiple
//                 value={values.certifications}
//                 setFieldValue={setFieldValue}
//                 error={touched.certifications && Boolean(errors.certifications)}
//                 helperText={touched.certifications && errors.certifications}
//               />

//               <InputDatePicker
//                 label="Date of Birth"
//                 value={values.dob}
//                 onChange={(newValue) => setFieldValue("dob", newValue)}
//                 onBlur={handleBlur}
//                 error={touched.dob && Boolean(errors.dob)}
//                 helperText={touched.dob && errors.dob}
//               />

//               <FileInput
//                 label="Upload Identity Proof"
//                 name="idProof"
//                 value={values.idProof}
//                 setFieldValue={setFieldValue}
//                 error={touched.idProof && Boolean(errors.idProof)}
//                 helperText={touched.idProof && errors.idProof}
//               />
//             </div>

//             {/* Summary and Skills */}
//             <div className="space-y-4">
//               <Textarea
//                 label="Profile Summary"
//                 name="summary"
//                 value={values.summary}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.summary && Boolean(errors.summary)}
//                 helperText={touched.summary && errors.summary}
//                 rows={3}
//               />

//               <Select
//                 label="Skills Required"
//                 name="skills"
//                 value={values.skills}
//                 multiple
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 options={skillsOption}
//                 error={touched.skills && Boolean(errors.skills)}
//                 helperText={touched.skills && errors.skills}
//               />
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end">
//               <Button
//                 type="submit"
//                 className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
//               >
//                 Save
//               </Button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </section>
//   );
// };

// export default PersonalInfoTab;
