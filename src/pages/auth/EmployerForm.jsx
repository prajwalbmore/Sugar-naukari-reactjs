import React from "react";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Textarea from "../../components/ui/Textarea";
import FileInput from "../../components/ui/FileInput";
import InputDatePicker from "../../components/ui/InputDatePicker";
import ImageUpload from "../../components/ui/ImageUpload";
import CustomStepper from "../../components/ui/CustomStepper";
import { useTranslation } from "react-i18next";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const EmployerForm = ({
  values,
  handleChange,
  errors,
  touched,
  setFieldValue,
  onNext,
  activeStep,
  handleCompanyInfo,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-xl ">
      <h1 className="text-2xl font-bold mt-3">{t("Create Profile")}</h1>
      <p className="text-gray-500 text-xs mb-3">
        {t("Enter your Personal Information")}
      </p>
      <div className="w-60 my-3">
        <CustomStepper
          steps={["1", "2"]}
          activeStep={activeStep}
          activeColor="#FFDE59"
          inactiveColor="#E0E0E0"
          size={40}
          lineHeight={5}
        />
      </div>

      <div className="px-8 text-xs w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input
            label="UID Number"
            name="businessRegistrationNumber"
            placeholder="CHE411852400"
            value={values.businessRegistrationNumber}
            onChange={handleChange}
            error={
              touched.businessRegistrationNumber &&
              Boolean(errors.businessRegistrationNumber)
            }
            helperText={
              touched.businessRegistrationNumber &&
              errors.businessRegistrationNumber
            }
            showButton={true} // show the button
            buttonText="Verify" // button label
            onButtonClick={() => {
              handleCompanyInfo(values.businessRegistrationNumber);
            }}
          />
          {/* Company Name */}
          <Input
            label="Company Name"
            name="companyName"
            placeholder="Enter Company Name"
            value={values.companyName}
            onChange={handleChange}
            error={touched.companyName && Boolean(errors.companyName)}
            helperText={touched.companyName && errors.companyName}
          />

          <FileInput
            label="Upload Company Logo"
            name="companyLogo"
            accept=".png, .jpg, .jpeg, .pdf"
            value={values.companyLogo}
            setFieldValue={setFieldValue}
            error={touched.companyLogo && Boolean(errors.companyLogo)}
            helperText={touched.companyLogo && errors.companyLogo}
          />

          {/* Summary */}
          <div className="md:col-span-3">
            <Textarea
              label="Company Description"
              name="companyDescription"
              value={values.companyDescription}
              onChange={handleChange}
              error={
                touched.companyDescription && Boolean(errors.companyDescription)
              }
              helperText={
                touched.companyDescription && errors.companyDescription
              }
              rows={2}
            />
          </div>
          {/* Work Environment Culture */}
          <div className="md:col-span-3">
            <Textarea
              label="Work Environment Culture"
              name="workEnvironmentCulture"
              value={values.workEnvironmentCulture}
              onChange={handleChange}
              error={
                touched.workEnvironmentCulture &&
                Boolean(errors.workEnvironmentCulture)
              }
              helperText={
                touched.workEnvironmentCulture && errors.workEnvironmentCulture
              }
              rows={2}
            />
          </div>
          {/* Website URL */}
          <Input
            label="Website URL (Optional)"
            name="websiteUrl"
            placeholder="Enter Website URL"
            value={values.websiteUrl}
            onChange={handleChange}
          />
          <Select
            label="Size of Company"
            name="companySize"
            value={values.companySize}
            onChange={handleChange}
            options={[
              { label: "Select", value: "" },
              { label: "1-10 employees", value: "1-10 employees" },
              { label: "11-50 employees", value: "11-50 employees" },
              { label: "51-200 employees", value: "51-200 employees" },
              {
                label: "500-1000 employees",
                value: "500-1000 employees",
              },
            ]}
            error={touched.companySize && Boolean(errors.companySize)}
            helperText={touched.companySize && errors.companySize}
          />
          {/* </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3"> */}
          {/* <Input
            label="UID Number"
            name="businessRegistrationNumber"
            placeholder="CHE411852400"
            value={values.businessRegistrationNumber}
            onChange={handleChange}
            error={
              touched.businessRegistrationNumber &&
              Boolean(errors.businessRegistrationNumber)
            }
            helperText={
              touched.businessRegistrationNumber &&
              errors.businessRegistrationNumber
            }
          /> */}
          {/* Industry/Field */}
          <Select
            label="Industry/Field"
            name="industry"
            value={values.industry}
            onChange={handleChange}
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
            error={touched.industry && Boolean(errors.industry)}
            helperText={touched.industry && errors.industry}
          />

          <Input
            label="Hours of Operation"
            name="hoursOfOperation"
            placeholder="Enter Hours of Operation"
            value={values.hoursOfOperation}
            onChange={handleChange}
            error={touched.hoursOfOperation && Boolean(errors.hoursOfOperation)}
            helperText={touched.hoursOfOperation && errors.hoursOfOperation}
          />
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
    </div>
  );
};

export default EmployerForm;
