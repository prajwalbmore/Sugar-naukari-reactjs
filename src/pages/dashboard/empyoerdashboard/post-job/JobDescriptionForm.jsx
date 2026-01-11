// import React from "react";
// import Input from "../../../../components/ui/Input";
// import { TextEditor } from "../../../../components/ui/TextEditor";
// import Button from "../../../../components/ui/Button";

// const FormSection = ({ id, label, description, children, error }) => (
//   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//     <div>
//       <label htmlFor={id} className="block text-xl font-bold text-gray-700">
//         {label}
//       </label>
//       {description && <p className="text-gray-500 mt-1">{description}</p>}
//     </div>
//     <div className="md:col-span-2">
//       {children}
//       {id !== "jobTitle" && error && (
//         <p className="text-xs text-red-500 mt-14">{error}</p>
//       )}
//     </div>
//   </div>
// );

// const JobDescriptionForm = ({
//   values,
//   handleChange,
//   errors,
//   touched,
//   setFieldValue,
// }) => {
//   return (
//     <section className="rounded-xl px-6 mt-3 py-6 shadow-md space-y-8">
//       <FormSection
//         id="jobTitle"
//         label="Job Title"
//         description="Job titles must describe one position"
//         error={touched.jobTitle && errors.jobTitle}
//       >
//         <Input
//           id="jobTitle"
//           name="jobTitle"
//           placeholder="e.g. Software Engineer"
//           value={values.jobTitle}
//           onChange={handleChange}
//           error={touched.jobTitle && Boolean(errors.jobTitle)}
//           helperText={touched.jobTitle && errors.jobTitle}
//         />
//       </FormSection>

//       <div className="bg-gray-300 h-px w-full" />

//       <FormSection
//         id="jobDescription"
//         label="Job Description"
//         description="Job descriptions must describe the position clearly"
//         error={touched.jobDescription && errors.jobDescription}
//       >
//         <TextEditor
//           value={values.jobDescription}
//           onChange={(content) => setFieldValue("jobDescription", content)}
//           placeholder="Enter job description"
//         />
//       </FormSection>

//       <FormSection
//         id="jobRole"
//         label="Job Role"
//         description="Job role must describe one position"
//         error={touched.jobRole && errors.jobRole}
//       >
//         <TextEditor
//           value={values.jobRole}
//           onChange={(content) => setFieldValue("jobRole", content)}
//           placeholder="Enter job role"
//         />
//       </FormSection>

//       <div className="flex justify-end pt-8">
//         <Button
//           className="bg-dark text-white px-6 py-2 rounded-full"
//           type="submit"
//         >
//           Next Step
//         </Button>
//       </div>
//     </section>
//   );
// };

// export default JobDescriptionForm;
import React from "react";
import Input from "../../../../components/ui/Input";
import { TextEditor } from "../../../../components/ui/TextEditor";
import Button from "../../../../components/ui/Button";
import Textarea from "../../../../components/ui/Textarea";
import { useTranslation } from "react-i18next";

const JobDescriptionForm = ({
  values,
  handleChange,
  errors,
  touched,
  setFieldValue,
}) => {
  const { t } = useTranslation();
  return (
    <section className=" rounded-xl  px-6 mt-3 space-y-6 py-6 shadow-md">
      <div className="flex flex-col items-center justify-center ">
        <div className="w-full px-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            {/* Job Title */}
            <div>
              <label
                htmlFor="jobTitle"
                className="block text-xl font-bold text-gray-700"
              >
                {t("Job Title")}
              </label>
              <p className=" text-gray-500 mt-1">
                {t("Job titles must describe one position")}
              </p>
            </div>
            <div className="md:col-span-2">
              <Input
                id="jobTitle"
                name="jobTitle"
                placeholder="e.g. Software Engineer"
                value={values.jobTitle}
                onChange={handleChange}
                error={touched.jobTitle && Boolean(errors.jobTitle)}
                helperText={touched.jobTitle && errors.jobTitle}
              />
            </div>
          </div>
          <div className="bg-gray-400 h-px w-full"></div>
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              {/* Job Description */}
              <div>
                <label
                  htmlFor="jobDescription"
                  className="block text-xl font-bold text-gray-700"
                >
                  {t("Job Description")}
                </label>
                <p className=" text-gray-500 mt-1">
                  {t("Job descriptions must describe the position clearly")}
                </p>
              </div>
              <div className="md:col-span-2">
                <Textarea
                  name="jobDescription"
                  value={values.jobDescription}
                  placeholder="Enter Job Description"
                  onChange={handleChange}
                  error={
                    touched.jobDescription && Boolean(errors.jobDescription)
                  }
                  helperText={touched.jobDescription && errors.jobDescription}
                  rows={4}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              {/* Job Role */}
              <div>
                <label
                  htmlFor="jobRole"
                  className="block text-xl font-bold text-gray-700"
                >
                  {t("Job Role")}
                </label>
                <p className=" text-gray-500 mt-1">
                  {t("Job role must describe one position")}
                </p>
              </div>
              <div className="md:col-span-2">
                <Textarea
                  name="jobRole"
                  value={values.jobRole}
                  onChange={handleChange}
                  placeholder="Enter Job Role"
                  error={touched.jobRole && Boolean(errors.jobRole)}
                  helperText={touched.jobRole && errors.jobRole}
                  rows={4}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-10 px-4 ">
        <Button
          className="bg-dark text-white px-6 py-2 text rounded-full"
          type="submit"
        >
          {t("Next Step")}
        </Button>
      </div>
    </section>
  );
};

export default JobDescriptionForm;
