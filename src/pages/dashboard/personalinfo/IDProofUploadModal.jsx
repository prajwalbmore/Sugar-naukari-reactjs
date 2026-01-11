import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEditEmployeePersonalInfoMutation } from "../../../services/authApiSlice";
import { handleSubmit } from "../../../utils/useHandleSubmit";
import Button from "../../../components/ui/Button";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

const validationSchema = Yup.object().shape({
  user_id_proof: Yup.mixed()
    .required("ID Proof is required")
    .test("fileType", "Only PDF, JPG, or PNG files are allowed", (value) => {
      if (!value) return false;
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      return allowedTypes.includes(value.type);
    })
    .test("fileSize", "File size must be less than 2 MB", (value) => {
      return value ? value.size <= 2 * 1024 * 1024 : false;
    }),
});

export default function IDProofUploadModal({
  refetch,
  onClose,
  user,
  idProofData,
  t,
}) {
  const [editProfile, { isLoading }] = useEditEmployeePersonalInfoMutation();

  return (
    <Formik
      initialValues={{
        user_id_proof: null,
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
            formData.append("user_id_proof", vals.user_id_proof);
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
              {t("Upload your ID Proof")}
            </p>

            <label className="w-full cursor-pointer">
              <div className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                <div className="h-12 w-12 rounded-md bg-yellow-400/20 flex items-center justify-center">
                  <img src="/assets/Certificate.png" className="h-10" />
                </div>
                <div className="flex flex-col min-w-0 justify-between w-full">
                  <div className="text-sm font-semibold text-gray-900 truncate max-w-[240px]">
                    {values.user_id_proof
                      ? values.user_id_proof.name
                      : t("No file selected")}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {values.user_id_proof
                      ? `${(values.user_id_proof.size / 1024).toFixed(1)} KB`
                      : "0 KB"}
                  </div>
                </div>
                <ArrowUpTrayIcon className="h-8 w-8" />
              </div>
              <input
                type="file"
                name="user_id_proof"
                accept="application/pdf,image/jpeg,image/png"
                className="hidden"
                onChange={(e) => {
                  if (e.currentTarget.files.length > 0) {
                    setFieldValue("user_id_proof", e.currentTarget.files[0]);
                  }
                }}
              />
            </label>

            {/* Validation error message */}
            {errors.user_id_proof && touched.user_id_proof && (
              <p className="text-red-500 text-sm">{errors.user_id_proof}</p>
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

// export default function IDProofUploadModal({
//   refetch,
//   onClose,
//   user,
//   idProofData,
// }) {
//   const [editProfile, { isLoading }] = useEditEmployeePersonalInfoMutation();
//   return (
//     <Formik
//       initialValues={{
//         user_id_proof: idProofData,
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
//             formData.append("user_id_proof", vals.user_id_proof);
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
//               Upload your ID Proof
//             </p>

//             <label className="w-full cursor-pointer">
//               <div className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
//                 <div className="h-12 w-12 rounded-md bg-yellow-400/20 flex items-center justify-center">
//                   <img src="/assets/Certificate.png" className="h-10" />
//                 </div>
//                 <div className="flex flex-col min-w-0">
//                   <div className="text-sm font-semibold text-gray-900 truncate max-w-[240px]">
//                     {values.user_id_proof
//                       ? values.user_id_proof.name
//                       : "No file selected"}
//                   </div>
//                   <div className="text-xs text-gray-500 mt-0.5">
//                     {values.user_id_proof
//                       ? values.user_id_proof.file_size
//                         ? values.user_id_proof.file_size
//                         : `${(values.user_id_proof.size
//                             ? values.user_id_proof.size / 1024
//                             : 69
//                           ).toFixed(1)} KB`
//                       : "0 KB"}
//                   </div>
//                 </div>
//               </div>
//               <input
//                 type="file"
//                 name="user_id_proof"
//                 // accept=".pdf"
//                 className="hidden"
//                 onChange={(e) => {
//                   if (e.currentTarget.files.length > 0) {
//                     setFieldValue("user_id_proof", e.currentTarget.files[0]);
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
