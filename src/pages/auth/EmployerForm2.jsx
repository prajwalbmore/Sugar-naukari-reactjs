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

const EmployerForm2 = ({
  values,
  handleChange,
  errors,
  touched,
  setFieldValue,
  onBack,
  activeStep,
}) => {
  const { t } = useTranslation();
  return (
    <div className=" flex flex-col items-center justify-center bg-white rounded-xl">
      <h1 className="text-2xl font-bold mt-10">{t("Create Profile")}</h1>
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

      <div className="mb-24 sm:mt-4 lg:m-0 md:m-0 px-8 text-xs w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Company Name */}
          <Input
            label="Contact Person Name"
            name="contactPerson"
            placeholder="Enter Contact Person Name"
            value={values.contactPerson}
            onChange={handleChange}
            error={touched.contactPerson && Boolean(errors.contactPerson)}
            helperText={touched.contactPerson && errors.contactPerson}
          />
          <Input
            label="Contact Person Job Title"
            name="contactPersonJobTitle"
            placeholder="Enter Contact Person Job Title"
            value={values.contactPersonJobTitle}
            onChange={handleChange}
            error={
              touched.contactPersonJobTitle &&
              Boolean(errors.contactPersonJobTitle)
            }
            helperText={
              touched.contactPersonJobTitle && errors.contactPersonJobTitle
            }
          />
          {/* Phone */}
          <Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <Input
            label="Phone Number"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            error={touched.phone && Boolean(errors.phone)}
            helperText={touched.phone && errors.phone}
          />

          {/* Summary */}
          <div className="md:col-span-3">
            <Textarea
              label="Enter Office Address"
              name="officeAddress"
              value={values.officeAddress}
              onChange={handleChange}
              error={touched.officeAddress && Boolean(errors.officeAddress)}
              helperText={touched.officeAddress && errors.officeAddress}
              rows={2}
            />
          </div>
        </div>

        <hr className="my-6" />

        {/* Action Buttons */}
        <div className="w-full my-3 flex justify-end gap-4 text-xs">
          <Button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border rounded-md bg-gray-100 text-base font-semibold"
          >
            {t("Cancel")}
          </Button>
          <Button
            type="submit" // 👉 Final Formik submit
            className="px-6 py-2 bg-black text-white rounded-md text-base font-semibold"
          >
            {t("Create Profile")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployerForm2;
