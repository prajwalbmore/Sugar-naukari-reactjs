import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import FileInput from "../../components/ui/FileInput";
import InputDatePicker from "../../components/ui/InputDatePicker";
import ImageUpload from "../../components/ui/ImageUpload";
import Button from "../../components/ui/Button";
import {
  useGetLanguageQuery,
  useGetSkillsQuery,
} from "../../services/authApiSlice";
import Select from "../../components/ui/Select";
import {
  useGetQuestionsForEmployeeRegistrationQuery,
  useGetSchoolListQuery,
} from "../../services/faqApiSlice";
import { useDisclosure } from "../../hooks/useDisclosure";
import Modal from "../../components/ui/Modal";
import { useTranslation } from "react-i18next";
import LocationMapModal from "../dashboard/personalinfo/LocationMapModal";
import { useNavigate } from "react-router-dom";

const EmployeeForm = ({
  values,
  handleChange,
  errors,
  touched,
  setFieldValue,
  onNext,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, isLoading, isError } =
    useGetQuestionsForEmployeeRegistrationQuery();
  const {
    data: skillData,
    isLoading: skillisLoading,
    isError: skillisError,
  } = useGetSkillsQuery();
  const {
    data: langData,
    isLoading: langisLoading,
    isError: langisError,
  } = useGetLanguageQuery();
  const {
    data: schoolData,
    isLoading: schoolisLoading,
    isError: schoolisError,
  } = useGetSchoolListQuery();
  const skillsOption = skillData?.data?.map((skill) => ({
    label: skill?.skill_name,
    value: skill?.skill_id,
  }));
  const langOption = langData?.data?.map((lang) => ({
    label: lang?.name,
    value: lang?.name,
  }));
  const schoolOption = schoolData?.data?.map((lang) => ({
    label: lang?.name,
    value: lang?.name,
  }));
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isOpen, { open, close }] = useDisclosure(false);
  const [
    isLocationModalOpen,
    { open: openLocationModal, close: closeLocationModal },
  ] = useDisclosure(false);

  const handleAnswerChange = (value) => {
    setAnswer(value);
    setFieldValue("que_ans", value);
    if (value === "yes" && data?.data?.pdf_show_when_if_ans_is === "yes") {
      open();
    } else if (value === "no" && data?.data?.pdf_show_when_if_ans_is === "no") {
      open();
    }
  };
  if (isLoading || skillisLoading || langisLoading || schoolisLoading)
    return <div>Loading...</div>;
  return (
    <div className="flex flex-col items-center  md:max-w-3xl lg:max-w-5xl justify-center bg-white rounded-xl">
      <h1 className="text-2xl font-bold mt-3">{t("Create Profile")}</h1>
      <p className="text-gray-500 text-xs mb-3">
        {t("Enter your Personal Information")}
      </p>

      <div className="px-8 text-xs w-full">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <ImageUpload
            initialImage={
              values.profileImage
                ? URL.createObjectURL(values.profileImage)
                : ""
            }
            onChange={(file) => setFieldValue("profileImage", file)}
          />
          {touched.profileImage && errors.profileImage && (
            <p className="text-red-500 text-xs mt-1">{errors.profileImage}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Full Name */}
          <Input
            label="Full Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />

          {/* Phone */}
          <Input
            label="Phone Number"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            error={touched.phone && Boolean(errors.phone)}
            helperText={touched.phone && errors.phone}
          />

          {/* Location */}
          {/* <Input
            label="Location"
            name="location"
            value={values.location}
            onChange={handleChange}
            error={touched.location && Boolean(errors.location)}
            helperText={touched.location && errors.location}
          /> */}
          <Input
            label="Location"
            name="location"
            value={values.location}
            onChange={handleChange}
            onClick={openLocationModal} // Add click handler
            readOnly // Make it read-only
            className="cursor-pointer"
            placeholder="Click to select location"
            error={touched.location && Boolean(errors.location)}
            helperText={touched.location && errors.location}
          />

          {/* Gender */}
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

          {/* DOB */}
          {/* <InputDatePicker
            label="Date of Birth"
            value={values.dob}
            onChange={(newValue) => setFieldValue("dob", newValue)}
            error={touched.dob && Boolean(errors.dob)}
            helperText={touched.dob && errors.dob}
          /> */}
          <InputDatePicker
            label="Date of Birth"
            value={values.dob}
            onChange={(newValue) => setFieldValue("dob", newValue)}
            error={touched.dob && Boolean(errors.dob)}
            helperText={touched.dob && errors.dob ? errors.dob : ""}
          />

          {/* Summary */}
          <div className="md:col-span-3">
            <Textarea
              label="Profile Summary"
              name="summary"
              value={values.summary}
              onChange={handleChange}
              error={touched.summary && Boolean(errors.summary)}
              helperText={touched.summary && errors.summary}
              rows={2}
            />
          </div>

          {/* Education */}
          <Select
            label="Education"
            name="education"
            value={values.education}
            onChange={handleChange}
            options={schoolOption}
            error={touched.education && Boolean(errors.education)}
            helperText={touched.education && errors.education}
          />

          {/* Language */}
          <Select
            label="Language"
            name="language"
            value={values.language}
            onChange={handleChange}
            options={langOption}
            multiple
            error={touched.language && Boolean(errors.language)}
            helperText={touched.language && errors.language}
          />

          {/* Skills */}
          <Select
            label="Skills Required"
            name="skills"
            value={values.skills}
            onChange={handleChange}
            options={skillsOption}
            multiple
            error={touched.skills && Boolean(errors.skills)}
            helperText={touched.skills && errors.skills}
          />

          {/* Certifications */}
          <FileInput
            label="Upload Certifications"
            name="certifications"
            multiple
            accept=".png, .jpg, .jpeg, .pdf"
            value={values.certifications}
            setFieldValue={setFieldValue}
            error={touched.certifications && Boolean(errors.certifications)}
            helperText={touched.certifications && errors.certifications}
          />

          {/* Identity Proof */}
          <FileInput
            label="Upload Identity Proof"
            name="idProof"
            accept=".png, .jpg, .jpeg, .pdf"
            value={values.idProof}
            setFieldValue={setFieldValue}
            error={touched.idProof && Boolean(errors.idProof)}
            helperText={touched.idProof && errors.idProof}
          />
        </div>
        <div className="space-y-2 text-gray-700 text-sm mt-5">
          {/* Question */}
          <div>
            ●{" "}
            {showMoreInfo ? (
              <>{data?.data?.que_more_info}</>
            ) : (
              <>{data?.data?.current_que} </>
            )}
            <button
              type="button"
              onClick={() => setShowMoreInfo(!showMoreInfo)}
              className="text-blue-600 font-medium hover:underline"
            >
              {showMoreInfo ? t("see less") : t("more info")}..
            </button>
          </div>

          {/* Yes/No Radio Buttons */}
          <div className="flex items-center gap-4 ml-5 mt-2">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="insurance"
                value="yes"
                checked={answer === "yes"}
                onChange={(e) => handleAnswerChange(e.target.value)}
              />
              {t("Yes")}
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="insurance"
                value="no"
                checked={answer === "no"}
                onChange={(e) => handleAnswerChange(e.target.value)}
              />
              {t("No")}
            </label>
          </div>
          {touched.que_ans && errors.que_ans && (
            <p className="text-red-500 text-xs mt-1">{errors.que_ans}</p>
          )}

          {/* Checkbox remains */}

          <div className="flex items-center mt-3">
            <input
              type="checkbox"
              id="terms"
              className="mr-2"
              checked={values.agree}
              onChange={(e) => setFieldValue("agree", e.target.checked)}
            />
            <label htmlFor="terms" className="text-sm">
              {t("I agree to the app’s terms, conditions, and privacy policy")}
            </label>
          </div>
          {touched.agree && errors.agree && (
            <p className="text-red-500 text-xs mt-1">{errors.agree}</p>
          )}
        </div>
        {/* Next Button */}
        <div className="my-3 flex justify-end gap-4">
          <Button
            type="button"
            onClick={() => navigate("/")}
            className="px-6 py-2 border rounded-md bg-gray-100 text-base font-semibold"
          >
            {t("Back to home")}
          </Button>
          <Button
            type="submit"
            // onClick={onNext}
            className="px-6 py-2 bg-black text-white rounded-md text-base font-semibold"
          >
            {t("Next")}
          </Button>
        </div>
      </div>
      <Modal open={isOpen} onClose={close} title="Document" size="lg">
        <div className="p-6 space-y-4">
          {/* Question Content */}
          {data?.data?.que_content && (
            <p className="text-sm text-gray-700 leading-relaxed">
              {data.data.que_content}
            </p>
          )}

          {/* PDF Preview */}
          {data?.data?.que_pdf && (
            <iframe
              src={data.data.que_pdf}
              title="PDF Preview"
              className="w-full h-[500px] border rounded-md"
            />
          )}
        </div>
      </Modal>
      {/* Add Location Modal */}
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
    </div>
  );
};

export default EmployeeForm;
