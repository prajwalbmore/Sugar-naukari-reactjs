import React, { useState } from "react";
import Button from "../../../../components/ui/Button";
import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Modal from "../../../../components/ui/Modal";
import ResumeUploadCard from "../ResumeUploadCard";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import IDProofUploadModal from "../IDProofUploadModal";
import CertificationUploadModal from "../CertificationUploadModal";
import { useAuthContext } from "../../../../contexts/auth/context";

const FileRow = ({ type = "pdf", title, size, fileUrl, onPreview }) => {
  const isPdf = type === "pdf";

  return (
    <div className="w-full rounded-xl bg-gray-100/70 px-4 py-3 flex justify-between gap-4 items-center">
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={
            isPdf
              ? "rounded-md text-white flex items-center justify-center text-[10px] font-bold bg-gray-300"
              : "h-12 w-12 rounded-md bg-yellow-400/20 flex items-center justify-center"
          }
        >
          <img
            src={isPdf ? "/assets/PDFicon.png" : "/assets/Certificate.png"}
            alt={isPdf ? "PDF icon" : "Certificate icon"}
            className="h-10"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900 truncate overflow-hidden whitespace-nowrap">
            {title}
          </p>
          {size && <p className="text-xs text-gray-500 mt-0.5">{size}</p>}
        </div>
      </div>
      {fileUrl && (
        <Button
          variant="text"
          size="sm"
          onClick={() => onPreview({ type, title, fileUrl })}
        >
          <EyeIcon className="h-6 w-6" strokeWidth={2} />
        </Button>
      )}
    </div>
  );
};

export function Documents({
  userData = {},
  refetch,
  user,
  isApplicant = false,
  t,
}) {
  // Disclosure hooks
  const { userType } = useAuthContext();
  const [isOpenResume, { open: openResume, close: closeResume }] =
    useDisclosure(false);
  const [isOpenIDProof, { open: openIDProof, close: closeIDProof }] =
    useDisclosure(false);
  const [
    isOpenCertificate,
    { open: openCertificate, close: closeCertificate },
  ] = useDisclosure(false);
  const [isPreviewOpen, { open: openPreview, close: closePreview }] =
    useDisclosure(false);

  // File preview state
  const [previewFile, setPreviewFile] = useState(null);

  // Data extraction with defaults
  const certifications = userData?.data?.certifications || [];
  const idProofData = {
    file: userData?.data?.user_id_proof || "",
    name: userData?.data?.user_id_name || "No ID proof uploaded",
  };
  const resumeData = {
    file: userData?.data?.resume_file || "",
    name: userData?.data?.resume_file_name || "No file selected",
    file_size: userData?.data?.resume_file_size || "0 KB",
  };

  const handlePreview = (file) => {
    setPreviewFile(file);
    openPreview();
  };

  return (
    <>
      <div className="space-y-4 py-4">
        {/* Resume Section */}

        <section className="rounded-2xl border border-gray-300 p-5">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {t("Resume")}
            </h3>
            {!isApplicant && (
              <Button className="bg-dark rounded-full p-2" onClick={openResume}>
                <PencilSquareIcon className="text-white h-5 w-5" />
              </Button>
            )}
          </div>
          <FileRow
            type="pdf"
            title={resumeData.name}
            size={resumeData.file_size}
            fileUrl={resumeData.file}
            onPreview={handlePreview}
          />
        </section>

        {/* ID Proof Section */}
        {userType === "employee" && (
          <section className="rounded-2xl border border-gray-300 p-5">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {t("ID Proof")}
              </h3>
              {!isApplicant && (
                <Button
                  className="bg-dark rounded-full p-2"
                  onClick={openIDProof}
                >
                  <PencilSquareIcon className="text-white h-5 w-5" />
                </Button>
              )}
            </div>
            <FileRow
              type={
                idProofData.name.toLowerCase().endsWith(".pdf") ? "pdf" : "cert"
              }
              title={idProofData.name}
              fileUrl={idProofData.file}
              onPreview={handlePreview}
            />
          </section>
        )}

        {/* Certifications Section */}
        <section className="rounded-2xl border border-gray-300 p-5">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {t("Certifications")}
            </h3>
            {!isApplicant && (
              <Button
                className="bg-dark rounded-full p-2"
                onClick={openCertificate}
              >
                <PencilSquareIcon className="text-white h-5 w-5" />
              </Button>
            )}
          </div>
          {certifications.length > 0 ? (
            certifications.map((cert) => (
              <div key={cert.certification_id} className="mt-5">
                <FileRow
                  type={
                    cert.name.toLowerCase().endsWith(".pdf") ? "pdf" : "cert"
                  }
                  title={cert.name}
                  fileUrl={cert.url}
                  onPreview={handlePreview}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">
              {t("No certifications uploaded.")}
            </p>
          )}
        </section>
      </div>

      {/* Modals for uploads */}
      <Modal
        open={isOpenResume}
        onClose={closeResume}
        title="Add Resume or CV"
        size="lg"
      >
        <ResumeUploadCard
          refetch={refetch}
          onClose={closeResume}
          user={user}
          resumeData={resumeData}
        />
      </Modal>

      <Modal
        open={isOpenIDProof}
        onClose={closeIDProof}
        title="Add ID Proof"
        size="lg"
      >
        <IDProofUploadModal
          refetch={refetch}
          onClose={closeIDProof}
          user={user}
          idProofData={idProofData}
          t={t}
        />
      </Modal>

      <Modal
        open={isOpenCertificate}
        onClose={closeCertificate}
        title="Add Certifications"
        size="lg"
      >
        <CertificationUploadModal
          refetch={refetch}
          onClose={closeCertificate}
          user={user}
          idProofData={certifications}
          t={t}
        />
      </Modal>

      {/* Preview Modal */}
      <Modal
        open={isPreviewOpen}
        onClose={closePreview}
        title="File Preview"
        size="xl_5"
      >
        {previewFile && (
          <div className="">
            {previewFile.type === "pdf" ? (
              <iframe
                src={previewFile.fileUrl}
                title="PDF Preview"
                width="100%"
                height="500px"
                className="border rounded-md"
              />
            ) : (
              <img
                src={previewFile.fileUrl}
                alt={previewFile.title}
                className="max-w-full max-h-[500px] mx-auto rounded-md"
              />
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
