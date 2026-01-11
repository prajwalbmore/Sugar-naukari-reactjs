import React from "react";
import { Formik, Form, FieldArray } from "formik";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { handleSubmit } from "../../../utils/useHandleSubmit";
import { useSaveEmployeeEducationMutation } from "../../../services/authApiSlice";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  section: Yup.array().of(
    Yup.object().shape({
      degree: Yup.string().required("Degree is required"),
      institution: Yup.string().required("Institution is required"),
      location: Yup.string().required("Location is required"),
      graduation_year: Yup.string()
        .matches(/^\d{4}$/, "Enter a valid year")
        .required("Graduation year is required"),
    })
  ),
});

const EducationTab = ({ userData, user, refetch }) => {
  const { t } = useTranslation();
  const [saveEduction, { isLoading }] = useSaveEmployeeEducationMutation();
  const initialValues = {
    section: userData?.data?.educations?.length
      ? userData.data.educations.map((edu) => ({
          degree: edu.degree || "",
          institution: edu.institution || "",
          location: edu.location || "",
          graduation_year: edu.graduation_year || "",
        }))
      : [
          {
            degree: "",
            institution: "",
            location: "",
            graduation_year: "",
          },
        ],
  };

  const onSubmit = (values) => {
    const education = values.section;
    console.log("Form submitted", education);
    handleSubmit({
      values: { education: education, employee_id: user.id },
      apiCall: saveEduction,
      refetch: () => {
        refetch();
      },
    });
  };

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-xl font-semibold">
          {t("Educational Information")}
        </h1>
        <p className="text-md text-gray-500">
          {t("Update your educational details anytime")}.
        </p>
        <div className="bg-gray-200 h-[1.5px]" />
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, touched, errors }) => {
          const getFieldProps = (index, name) => ({
            name: `section[${index}].${name}`,
            value: values.section[index][name],
            onChange: handleChange,
            error:
              touched.section?.[index]?.[name] &&
              Boolean(errors.section?.[index]?.[name]),
            helperText:
              touched.section?.[index]?.[name] &&
              errors.section?.[index]?.[name],
          });

          return (
            <Form className="space-y-6">
              <FieldArray name="section">
                {({ push, remove }) => (
                  <>
                    {values.section.map((edu, index) => (
                      <div
                        key={index}
                        className="space-y-4 border p-4 rounded-lg"
                      >
                        <div className="flex justify-end gap-3">
                          {index === values.section.length - 1 && (
                            <Button
                              type="button"
                              onClick={() =>
                                push({
                                  degree: "",
                                  institution: "",
                                  location: "",
                                  graduation_year: "",
                                })
                              }
                              className="text-xl text-white"
                            >
                              <PlusCircleIcon className="h-8 w-8 rounded-full bg-dark" />
                            </Button>
                          )}
                          {values.section.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-white text-xl"
                            >
                              <MinusCircleIcon className="h-8 w-8 rounded-full bg-red-500" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="Degree"
                            {...getFieldProps(index, "degree")}
                          />
                          <Input
                            label="Institution"
                            {...getFieldProps(index, "institution")}
                          />
                          <Input
                            label="Location"
                            {...getFieldProps(index, "location")}
                          />
                          <Input
                            label="Graduation Year"
                            {...getFieldProps(index, "graduation_year")}
                          />
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </FieldArray>

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
          );
        }}
      </Formik>
    </section>
  );
};

export default EducationTab;
// import React from "react";
// import { Formik, Form, FieldArray } from "formik";
// import Input from "../../../components/ui/Input";
// import Button from "../../../components/ui/Button";
// import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

// const EducationTab = ({ userData, refetch, user }) => {
//   const initialValues = {
//     section: userData?.educations?.map((edu, index) => ({
//       degree: "",
//       institution: "",
//       location: "",
//       graduation_year: "",
//     })) || [
//       {
//         degree: "",
//         institution: "",
//         location: "",
//         graduation_year: "",
//       },
//     ],
//   };

//   const handleSubmit = (values) => {
//     console.log("Form submitted", values);
//     // Add your submit logic here
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

//       <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//         {({ values, handleChange, touched, errors }) => {
//           const getFieldProps = (index, name) => ({
//             name: `section[${index}].${name}`,
//             value: values.section[index][name],
//             onChange: handleChange,
//             error:
//               touched.section?.[index]?.[name] &&
//               Boolean(errors.section?.[index]?.[name]),
//             helperText:
//               touched.section?.[index]?.[name] &&
//               errors.section?.[index]?.[name],
//           });

//           return (
//             <Form className="space-y-6">
//               <FieldArray name="section">
//                 {({ push, remove }) => (
//                   <>
//                     {values.section.map((edu, index) => (
//                       <div
//                         key={index}
//                         className="space-y-4 border p-4 rounded-lg"
//                       >
//                         <div className="flex justify-end gap-3">
//                           {index === values.section.length - 1 && (
//                             <Button
//                               type="button"
//                               onClick={() =>
//                                 push({
//                                   degree: "",
//                                   institution: "",
//                                   location: "",
//                                   graduation_year: "",
//                                 })
//                               }
//                               className="text-xl text-white"
//                             >
//                               <PlusCircleIcon className="h-8 w-8 rounded-full bg-dark" />
//                             </Button>
//                           )}
//                           {values.section.length > 1 && (
//                             <Button
//                               type="button"
//                               onClick={() => remove(index)}
//                               className="text-white text-xl"
//                             >
//                               <MinusCircleIcon className="h-8 w-8 rounded-full bg-red-500" />
//                             </Button>
//                           )}
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <Input
//                             label="Degree"
//                             {...getFieldProps(index, "degree")}
//                           />
//                           <Input
//                             label="Institution"
//                             {...getFieldProps(index, "institution")}
//                           />
//                           <Input
//                             label="Location"
//                             {...getFieldProps(index, "location")}
//                           />
//                           <Input
//                             label="Graduation Year"
//                             {...getFieldProps(index, "graduation_year")}
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </>
//                 )}
//               </FieldArray>

//               <div className="flex justify-end">
//                 <Button
//                   type="submit"
//                   className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
//                 >
//                   Save
//                 </Button>
//               </div>
//             </Form>
//           );
//         }}
//       </Formik>
//     </section>
//   );
// };

// export default EducationTab;

// import React from "react";
// import { Formik, Form, FieldArray } from "formik";
// import Input from "../../../components/ui/Input";
// import FileInput from "../../../components/ui/FileInput";

// const EducationTab = () => {
//   const initialValues = {
//     section: [
//       {
//         degree: "",
//         institution: "",
//         location: "",
//         graduation_year: "",
//       },
//     ],
//   };

//   const handleSubmit = (values) => {
//     console.log("Form submitted", values);
//     // Add your submit logic here
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

//       <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//         {({ values, handleChange, setFieldValue, errors, touched }) => (
//           <Form className="space-y-6">
//             <FieldArray name="section">
//               {({ push, remove }) => (
//                 <>
//                   {values.section.map((edu, index) => (
//                     <div
//                       key={index}
//                       className="grid grid-cols-1 md:grid-cols-2 gap-3"
//                     >
//                       <div className="flex justify-end gap-2">
//                         {values.section.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => remove(index)}
//                             className="text-red-500 hover:underline"
//                           >
//                             Remove
//                           </button>
//                         )}
//                         {index === values.section.length - 1 && (
//                           <button
//                             type="button"
//                             onClick={() =>
//                               push({
//                                 degree: "",
//                                 institution: "",
//                                 location: "",
//                                 certifications: null,
//                               })
//                             }
//                             className="text-blue-500 hover:underline"
//                           >
//                             Add More
//                           </button>
//                         )}
//                       </div>
//                       <Input
//                         label="Degree"
//                         name={`section[${index}].degree`}
//                         value={edu.degree}
//                         onChange={handleChange}
//                         error={
//                           touched.section?.[index]?.degree &&
//                           Boolean(errors.section?.[index]?.degree)
//                         }
//                         helperText={
//                           touched.section?.[index]?.degree &&
//                           errors.section?.[index]?.degree
//                         }
//                       />
//                       <Input
//                         label="Institution"
//                         name={`section[${index}].institution`}
//                         value={edu.institution}
//                         onChange={handleChange}
//                         error={
//                           touched.section?.[index]?.institution &&
//                           Boolean(errors.section?.[index]?.institution)
//                         }
//                         helperText={
//                           touched.section?.[index]?.institution &&
//                           errors.section?.[index]?.institution
//                         }
//                       />
//                       <Input
//                         label="Location"
//                         name={`section[${index}].location`}
//                         value={edu.location}
//                         onChange={handleChange}
//                         error={
//                           touched.section?.[index]?.location &&
//                           Boolean(errors.section?.[index]?.location)
//                         }
//                         helperText={
//                           touched.section?.[index]?.location &&
//                           errors.section?.[index]?.location
//                         }
//                       />
//                       <Input
//                         label="Graduation Year"
//                         name={`section[${index}].graduation_year`}
//                         value={edu.graduation_year}
//                         onChange={handleChange}
//                         error={
//                           touched.section?.[index]?.graduation_year &&
//                           Boolean(errors.section?.[index]?.graduation_year)
//                         }
//                         helperText={
//                           touched.section?.[index]?.graduation_year &&
//                           errors.section?.[index]?.graduation_year
//                         }
//                       />
//                     </div>
//                   ))}
//                 </>
//               )}
//             </FieldArray>

//             <div className="flex justify-center">
//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
//               >
//                 Save
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </section>
//   );
// };

// export default EducationTab;
