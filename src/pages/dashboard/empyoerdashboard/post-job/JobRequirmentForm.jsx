import React from "react";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import Select from "../../../../components/ui/Select";
import InputDatePicker from "../../../../components/ui/InputDatePicker";
import { useGetSkillsQuery } from "../../../../services/authApiSlice";
import MapComponent from "./MapComponent";
import { useTranslation } from "react-i18next";
import InputDatePicker3 from "../../../../components/ui/InputDatePicker3";

const JobRequirementForm = ({
  values,
  handleChange,
  errors,
  touched,
  setFieldValue,
  setActiveStep,
  isLoading,
  isLoadingSaveDraft,
  handleSaveDraft,
  isDuplicate = false,
  isEdit = false,
  setTouched,
}) => {
  const { t } = useTranslation();
  // Fetch skills from API
  const { data: skillData } = useGetSkillsQuery();
  const skillsOption =
    skillData?.data?.map((skill) => ({
      label: skill.skill_name,
      value: skill.skill_id,
    })) || [];

  const experienceOptions = [
    { label: "Select Experience Level", value: "" },
    { label: "Fresher", value: "Fresher" },
    { label: "Experience", value: "Experience" },
  ];
  // console.log("errors", errors);
  return (
    <section className="rounded-xl px-6 py-6 mt-3 shadow-md bg-white">
      <div className="w-full space-y-8">
        {/* Experience Level */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <label className="block text-lg font-bold text-gray-700">
            {t("Experience Level")}
          </label>
          <div className="md:col-span-2 w-80">
            <Select
              name="exp_level"
              value={values.exp_level}
              onChange={handleChange}
              options={experienceOptions}
              error={touched.exp_level && Boolean(errors.exp_level)}
              helperText={touched.exp_level && errors.exp_level}
            />
          </div>
        </div>

        {/* Skills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <label className="block text-lg font-bold text-gray-700">
            {t("Skills Required")}
          </label>
          <div className="md:col-span-2 w-80">
            <Select
              name="skills"
              value={values.skills}
              onChange={handleChange}
              options={skillsOption}
              multiple
              error={touched.skills && Boolean(errors.skills)}
              helperText={touched.skills && errors.skills}
            />
          </div>
        </div>

        {/* Salary Range */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <div>
            <label className="block text-lg font-bold text-gray-700">
              {t("Salary")}
            </label>
            <p className="text-gray-500 mt-1 text-xs leading-5">
              {t(
                "Specify the estimated salary range."
              )}
              .
            </p>
          </div>
          <div className="md:col-span-2 w-80">
            <Input
              id="salary"
              name="salary"
              type="number"
              min={1}
              placeholder="Enter salary"
              value={values.salary}
              onChange={handleChange}
              error={touched.salary && Boolean(errors.salary)}
              helperText={touched.salary && errors.salary}
            />
          </div>
        </div>

        {/* No. of Vacancy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <label className="block text-lg font-bold text-gray-700">
            {t("No. of Vacancy")}
          </label>
          <div className="md:col-span-2 w-80">
            <Input
              id="vacancy"
              name="vacancy"
              type="number"
              min={1}
              placeholder="Enter number of vacancy"
              value={values.vacancy}
              onChange={handleChange}
              error={touched.vacancy && Boolean(errors.vacancy)}
              helperText={touched.vacancy && errors.vacancy}
            />
          </div>
        </div>

        {/* Date of Job Start */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <label className="block text-lg font-bold text-gray-700">
            {t("Date of Job Start")}
          </label>
          <div className="md:col-span-2 w-80">
            <InputDatePicker3
              value={values.startdate}
              onChange={(date) => setFieldValue("startdate", date)}
              error={touched.startdate && Boolean(errors.startdate)}
              helperText={touched.startdate && errors.startdate}
              allowPast={false}
            />
          </div>
        </div>

        {/* Job Time */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <label className="block text-lg font-bold text-gray-700">
            {t("Job Time")}
          </label>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-28 max-w-3xl">
            <Input
              id="startTime"
              name="startTime"
              type="time"
              value={values.startTime}
              onChange={handleChange}
              error={touched.startTime && Boolean(errors.startTime)}
              helperText={touched.startTime && errors.startTime}
            />
            <Input
              id="endTime"
              name="endTime"
              type="time"
              value={values.endTime}
              onChange={handleChange}
              error={touched.endTime && Boolean(errors.endTime)}
              helperText={touched.endTime && errors.endTime}
            />
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <label className="block text-lg font-bold text-gray-700">
            {t("Location")}
          </label>
          <div className="md:col-span-2">
            <MapComponent
              setFieldValue={setFieldValue}
              values={values}
              setTouched={setTouched}
            />
            {touched.location && errors.location && (
              <p className="text-red-500 text-xs mt-1">{errors.location}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4 gap-3">
          <Button
            type="button"
            className="rounded-full bg-black text-white px-6 py-2 hover:bg-gray-800"
            onClick={() => setActiveStep(0)}
          >
            {t("Back")}
          </Button>

          <div className="flex gap-3">
            {!isEdit && (
              <Button
                type="button"
                className="rounded-full bg-gray-300 font-bold px-6 py-2 hover:bg-gray-400"
                onClick={() => handleSaveDraft(values)}
                loading={isLoadingSaveDraft}
              >
                {!isLoadingSaveDraft && t("Save Draft")}
              </Button>
            )}
            <Button
              type="submit"
              className="rounded-full bg-black text-white px-6 py-2 hover:bg-gray-800"
              loading={isLoading}
            >
              {!isLoading && (isEdit ? t("Edit Job") : t("Publish Job"))}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobRequirementForm;

// import React from "react";
// import Input from "../../../../components/ui/Input";
// import Button from "../../../../components/ui/Button";
// import Select from "../../../../components/ui/Select";
// import InputDatePicker from "../../../../components/ui/InputDatePicker"; // <-- your custom date picker
// import { useGetSkillsQuery } from "../../../../services/authApiSlice";
// import MapComponent from "./MapComponent";

// const JobRequirementForm = ({
//   values,
//   handleChange,
//   errors,
//   touched,
//   setFieldValue,
//   setActiveStep,
// }) => {
//   const {
//     data: skillData,
//     isLoading: skillisLoading,
//     isError: skillisError,
//   } = useGetSkillsQuery();

//   const skillsOption = [
//     ...(skillData?.data?.map((skill) => ({
//       label: skill?.skill_name,
//       value: skill?.skill_id,
//     })) || []),
//   ];

//   const experienceOptions = [
//     { label: "Select Experience Level", value: "" },
//     { label: "Fresher", value: "Fresher" },
//     { label: "Experience", value: "Experience" },
//   ];
//   return (
//     <section className="rounded-xl px-6 py-6 mt-3 shadow-md bg-white">
//       <div className="w-full space-y-8">
//         {/* Experience Level */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//           <label className="block text-lg font-bold text-gray-700">
//             Experience Level
//           </label>
//           <div className="md:col-span-2 w-80">
//             <Select
//               name="exp_level"
//               value={values.exp_level}
//               onChange={handleChange}
//               options={experienceOptions}
//               error={touched.exp_level && Boolean(errors.exp_level)}
//               helperText={touched.exp_level && errors.exp_level}
//             />
//           </div>
//         </div>

//         {/* Skills */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//           <label className="block text-lg font-bold text-gray-700">
//             Skills Required
//           </label>
//           <div className="md:col-span-2 w-80">
//             <Select
//               name="skills"
//               value={values.skills}
//               onChange={handleChange}
//               options={skillsOption}
//               multiple
//               error={touched.skills && Boolean(errors.skills)}
//               helperText={touched.skills && errors.skills}
//             />
//           </div>
//         </div>

//         {/* Salary Range */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//           <div>
//             <label className="block text-lg font-bold text-gray-700">
//               Salary
//             </label>
//             <p className="text-gray-500 mt-1 text-xs leading-5">
//               Please specify the estimated salary range for the role. *You can
//               leave this blank.
//             </p>
//           </div>
//           <div className="md:col-span-2 w-80">
//             <Input
//               id="salary"
//               name="salary"
//               type="number"
//               min={1}
//               placeholder="Enter salary"
//               value={values.salary}
//               onChange={handleChange}
//               error={touched.salary && Boolean(errors.salary)}
//               helperText={touched.salary && errors.salary}
//             />
//           </div>
//         </div>

//         {/* No. of Vacancy */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//           <label className="block text-lg font-bold text-gray-700">
//             No. of Vacancy
//           </label>
//           <div className="md:col-span-2 w-80">
//             <Input
//               id="vacancy"
//               name="vacancy"
//               type="number"
//               min={1}
//               placeholder="Enter number of vacancy"
//               value={values.vacancy}
//               onChange={handleChange}
//               error={touched.vacancy && Boolean(errors.vacancy)}
//               helperText={touched.vacancy && errors.vacancy}
//             />
//           </div>
//         </div>

//         {/* Date of Job Start */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//           <label className="block text-lg font-bold text-gray-700">
//             Date of Job Start
//           </label>
//           <div className="md:col-span-2 w-80">
//             <InputDatePicker
//               value={values.startdate}
//               onChange={(date) => setFieldValue("startdate", date)}
//               error={touched.startdate && Boolean(errors.startdate)}
//               helperText={touched.startdate && errors.startdate}
//             />
//           </div>
//         </div>

//         {/* Job Time */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//           <label className="block text-lg font-bold text-gray-700">
//             Job Time
//           </label>
//           <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-28 max-w-3xl">
//             <Input
//               id="startTime"
//               name="startTime"
//               type="time"
//               value={values.startTime}
//               onChange={handleChange}
//               error={touched.startTime && Boolean(errors.startTime)}
//               helperText={touched.startTime && errors.startTime}
//             />
//             <Input
//               id="endTime"
//               name="endTime"
//               type="time"
//               value={values.endTime}
//               onChange={handleChange}
//               error={touched.endTime && Boolean(errors.endTime)}
//               helperText={touched.endTime && errors.endTime}
//             />
//           </div>
//         </div>

//         {/* Location */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//           <label className="block text-lg font-bold text-gray-700">
//             Location
//           </label>
//           <div className="md:col-span-2">
//             <MapComponent setFieldValue={setFieldValue} />
//             {touched.location && errors.location && (
//               <p className="text-red-500 text-xs mt-1">{errors.location}</p>
//             )}
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex justify-between pt-4 gap-3">
//           {/* Back Button */}
//           <Button
//             type="button"
//             className="rounded-full bg-black text-white px-6 py-2 hover:bg-gray-800"
//             onClick={() => setActiveStep(0)}
//           >
//             Back
//           </Button>

//           <div className="flex gap-3">
//             {/* Save Draft */}
//             <Button
//               type="button"
//               className="rounded-full bg-gray-300 font-bold px-6 py-2 hover:bg-gray-400"
//               //   onClick={() => setFieldValue?.("status", "draft")}
//             >
//               Save Draft
//             </Button>

//             {/* Publish Job */}
//             <Button
//               type="submit"
//               className="rounded-full bg-black text-white px-6 py-2 hover:bg-gray-800"
//               loading={isLoading}
//             >
//               {!isLoading && "Publish Job"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default JobRequirementForm;
