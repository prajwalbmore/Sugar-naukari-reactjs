import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEditEmployeePersonalInfoMutation } from "../../../services/authApiSlice";
import { handleSubmit } from "../../../utils/useHandleSubmit";
import Button from "../../../components/ui/Button";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  resume_file: Yup.mixed()
    .required("Resume is required")
    .test("fileType", "Only PDF files are allowed", (value) => {
      return value ? value.type === "application/pdf" : false;
    })
    .test("fileSize", "File size must be less than 2 MB", (value) => {
      return value ? value.size <= 2 * 1024 * 1024 : false;
    }),
});

export default function ResumeUploadCard({ refetch, onClose, user }) {
  const [editProfile, { isLoading }] = useEditEmployeePersonalInfoMutation();
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        resume_file: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit({
          values,
          apiCall: editProfile,
          refetch: () => {
            refetch();
            onClose();
          },
          transformValues: (vals) => {
            const formData = new FormData();
            formData.append("employee_id", user?.id);
            formData.append("resume_file", vals.resume_file);
            return formData;
          },
        }).finally(() => {
          setSubmitting(false);
        });
      }}
    >
      {({ setFieldValue, values, errors, touched }) => (
        <Form className="p-5">
          <div className="w-full py-8 px-10 rounded-xl border-2 border-dashed border-gray-500 bg-white flex flex-col items-center gap-4">
            <p className="text-center text-sm leading-relaxed">
              {t("Upload your CV or Resume and use it")}
              <br />
              {t("when you apply for jobs")}
            </p>

            <label className="w-full cursor-pointer">
              <div className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                <div className="rounded-md text-white flex items-center justify-center text-[10px] font-bold">
                  <img src="/assets/PDFicon.png" className="h-10" />
                </div>
                <div className="flex flex-col min-w-0 justify-between w-full">
                  <div className="text-sm font-semibold text-gray-900 truncate max-w-[240px]">
                    {values.resume_file
                      ? values.resume_file.name
                      : t("No file selected")}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {values.resume_file
                      ? `${(values.resume_file.size / 1024).toFixed(1)} KB`
                      : "0 KB"}
                  </div>
                </div>
                <ArrowUpTrayIcon className="h-8 w-8" />
              </div>
              <input
                type="file"
                name="resume_file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.currentTarget.files.length > 0) {
                    setFieldValue("resume_file", e.currentTarget.files[0]);
                  }
                }}
              />
            </label>

            {/* Validation error message */}
            {errors.resume_file && touched.resume_file && (
              <p className="text-red-500 text-sm">{errors.resume_file}</p>
            )}

            <Button
              type="submit"
              loading={isLoading}
              className="mt-1 w-full h-12 rounded-xl bg-black text-white font-semibold text-base hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {!isLoading && t("Update")}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
// import React from "react";
// import { Formik, Form, Field } from "formik";
// import { useEditEmployeePersonalInfoMutation } from "../../../services/authApiSlice";
// import { handleSubmit } from "../../../utils/useHandleSubmit";
// import Button from "../../../components/ui/Button";
// import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

// export default function ResumeUploadCard({
//   refetch,
//   onClose,
//   user,
//   resumeData,
// }) {
//   const [editProfile, { isLoading }] = useEditEmployeePersonalInfoMutation();
//   return (
//     <Formik
//       initialValues={{
//         resume_file: null,
//       }}
//       onSubmit={(values, { setSubmitting }) => {
//         handleSubmit({
//           values,
//           apiCall: editProfile,
//           refetch: () => {
//             refetch();
//             onClose();
//           },
//           transformValues: (vals) => {
//             const formData = new FormData();
//             formData.append("employee_id", user?.id);
//             formData.append("resume_file", vals.resume_file);
//             return formData;
//           },
//         }).finally(() => {
//           setSubmitting(false);
//         });
//       }}
//     >
//       {({ setFieldValue, values }) => (
//         <Form className="p-5">
//           <div className="w-full py-8 px-10 rounded-xl border-2 border-dashed border-gray-500 bg-white flex flex-col items-center gap-4">
//             <p className="text-center text-sm leading-relaxed">
//               Upload your CV or Resume and use it
//               <br />
//               when you apply for jobs
//             </p>

//             <label className="w-full cursor-pointer">
//               <div className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
//                 <div className="rounded-md text-white flex items-center justify-center text-[10px] font-bold">
//                   <img src="/assets/PDFicon.png" className="h-10" />
//                 </div>
//                 <div className="flex flex-col min-w-0 justify-between w-full">
//                   <div className="text-sm font-semibold text-gray-900 truncate max-w-[240px]">
//                     {values.resume_file
//                       ? values.resume_file.name
//                       : "No file selected"}
//                   </div>
//                   <div className="text-xs text-gray-500 mt-0.5">
//                     {values.resume_file
//                       ? values.resume_file.file_size
//                         ? values.resume_file.file_size
//                         : `${(values.resume_file.size / 1024).toFixed(1)} KB`
//                       : "0 KB"}
//                   </div>
//                 </div>
//                 <ArrowUpTrayIcon className="h-8 w-8" />
//               </div>
//               <input
//                 type="file"
//                 name="resume_file"
//                 accept=".pdf"
//                 className="hidden"
//                 onChange={(e) => {
//                   if (e.currentTarget.files.length > 0) {
//                     setFieldValue("resume_file", e.currentTarget.files[0]);
//                   }
//                 }}
//               />
//             </label>

//             <Button
//               type="submit"
//               loading={isLoading}
//               className="mt-1 w-full h-12 rounded-xl bg-black text-white font-semibold text-base hover:bg-gray-800 transition-colors disabled:opacity-50"
//             >
//               {!isLoading && "Update"}
//             </Button>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// }
