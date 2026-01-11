import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  useDeleteCertificateMutation,
  useEditEmployeePersonalInfoMutation,
} from "../../../services/authApiSlice";
import { handleSubmit } from "../../../utils/useHandleSubmit";
import Button from "../../../components/ui/Button";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function CertificationUploadModal({
  refetch,
  onClose,
  user,
  idProofData = [], // initial files: array or single object
  t,
}) {
  const [editProfile, { isLoading }] = useEditEmployeePersonalInfoMutation();
  const [deleteCerificate] = useDeleteCertificateMutation();

  // Ensure initialFiles is always an array
  const initialFilesArray = Array.isArray(idProofData)
    ? idProofData
    : [idProofData];

  // State for managing initial files (uploaded before opening modal)
  const [initialFiles, setInitialFiles] = useState(initialFilesArray);
  const handleDelete = async (values) => {
    console.log("Deleted files", initialFiles[values]);
    const deletedFile = initialFiles[values];
    await deleteCerificate({
      certification_id: deletedFile.certification_id,
    }).unwrap();
    refetch();
  };
  return (
    <Formik
      initialValues={{
        certifications_file: [], // new files to be uploaded
      }}
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

            // Append new files for upload
            if (
              vals.certifications_file &&
              vals.certifications_file.length > 0
            ) {
              vals.certifications_file.forEach((file) => {
                formData.append("certifications_file[]", file);
              });
            }
            return formData;
          },
        }).finally(() => {
          setSubmitting(false);
        });
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className="p-5">
          <div className="w-full py-4 px-10 rounded-xl border-2 border-dashed border-gray-500 bg-white flex flex-col items-center gap-4">
            {/* Initial Files Section */}
            {initialFiles.length > 0 && (
              <div className="w-full mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  {t("Uploaded Certificates")}
                </h3>
                {initialFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 mb-2 bg-gray-100 rounded"
                  >
                    <div className="h-8 w-8 flex items-center justify-center bg-yellow-400/20 rounded-md">
                      <img
                        src="/assets/Certificate.png"
                        alt="certificate icon"
                        className="h-6"
                      />
                    </div>
                    <div className="text-sm text-gray-800 truncate flex-1">
                      {file.file_name || file.name || "Unnamed File"}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        handleDelete(index);
                        setInitialFiles((files) =>
                          files.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      <XMarkIcon
                        className="h-5 text-gray-600"
                        strokeWidth={2}
                      />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Input */}
            <label className="w-full cursor-pointer">
              <div className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                <div className="h-12 w-12 rounded-md bg-yellow-400/20 flex items-center justify-center">
                  <img
                    src="/assets/Certificate.png"
                    className="h-10"
                    alt="upload icon"
                  />
                </div>
                <div className="flex flex-col min-w-0 justify-between w-full">
                  <div className="text-sm font-semibold text-gray-900 truncate max-w-[240px]">
                    {t("Select files to upload")}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {t("You can upload multiple files")}
                  </div>
                </div>
                <ArrowUpTrayIcon className="h-8 w-8" />
              </div>
              <input
                type="file"
                name="certifications_file"
                multiple
                className="hidden"
                accept="application/pdf,image/jpeg,image/png"
                onChange={(e) => {
                  if (e.currentTarget.files.length > 0) {
                    const newFiles = Array.from(e.currentTarget.files);
                    setFieldValue("certifications_file", [
                      ...values.certifications_file,
                      ...newFiles,
                    ]);
                  }
                }}
              />
            </label>

            {/* Newly Uploaded Files Section */}
            {values.certifications_file.length > 0 && (
              <div className="w-full mt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  {t("Files to be uploaded")}
                </h3>
                {values.certifications_file.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center gap-3 p-2 mb-2 bg-gray-100 rounded"
                  >
                    <div>
                      <div className="text-sm text-gray-800 truncate">
                        {file.name || "Unnamed File"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {file.size
                          ? `${(file.size / 1024).toFixed(1)} KB`
                          : "Unknown size"}
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={() => {
                        const updatedFiles = values.certifications_file.filter(
                          (_, i) => i !== index
                        );
                        setFieldValue("certifications_file", updatedFiles);
                      }}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 p-0"
                    >
                      <XMarkIcon
                        className="h-5 text-gray-600"
                        strokeWidth={2}
                      />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              loading={isLoading}
              className="mt-4 w-full h-12 rounded-xl bg-black text-white font-semibold text-base hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {!isLoading && t("Update")}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
