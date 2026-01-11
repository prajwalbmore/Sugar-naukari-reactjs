// import React from "react";
// import Input from "../../../../components/ui/Input";
// import Button from "../../../../components/ui/Button";
// import Select from "../../../../components/ui/Select";

// const JobRequirementForm = ({
//   values,
//   handleChange,
//   errors,
//   touched,
//   setFieldValue,
// }) => {
//   const experienceOptions = [
//     { label: "Select Experience Level", value: "" },
//     { label: "Entry Level", value: "entry" },
//     { label: "Mid Level", value: "mid" },
//     { label: "Senior Level", value: "senior" },
//     { label: "Lead", value: "lead" },
//   ];

//   const skillsOptions = [
//     { label: "Select Skill", value: "" },
//     { label: "JavaScript", value: "javascript" },
//     { label: "Python", value: "python" },
//     { label: "Java", value: "java" },
//     { label: "C++", value: "cpp" },
//   ];

//   return (
//     <section className="rounded-xl px-6 py-6 mt-3 shadow-md bg-white">
//       <div className="w-full space-y-8">
//         {/* Experience Level */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//           <label
//             htmlFor="exp_level"
//             className="block text-sm font-semibold text-gray-700"
//           >
//             Experience Level
//           </label>
//           <div className="md:col-span-2">
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

//         {/* Skills Required */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//           <label
//             htmlFor="skills"
//             className="block text-sm font-semibold text-gray-700"
//           >
//             Skills Required
//           </label>
//           <div className="md:col-span-2">
//             <Select
//               name="skills"
//               value={values.skills}
//               onChange={handleChange}
//               options={skillsOptions}
//               error={touched.skills && Boolean(errors.skills)}
//               helperText={touched.skills && errors.skills}
//             />
//           </div>
//         </div>

//         {/* Salary Range */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//           <div>
//             <label
//               htmlFor="minAmount"
//               className="block text-sm font-semibold text-gray-700"
//             >
//               Salary
//             </label>
//             <p className="text-gray-500 mt-1 text-xs leading-5">
//               Please specify the estimated salary range for the role. *You can
//               leave this blank.
//             </p>
//           </div>
//           <div className="md:col-span-2">
//             <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200 max-w-xl">
//               {/* Min */}
//               <div className="flex items-center gap-2">
//                 <span className="text-gray-500 text-sm px-2 py-1 rounded-md border border-gray-200">
//                   CHF
//                 </span>
//                 <Input
//                   id="minAmount"
//                   name="minAmount"
//                   placeholder="5,000"
//                   value={values.minAmount}
//                   onChange={handleChange}
//                   error={touched.minAmount && Boolean(errors.minAmount)}
//                   helperText={touched.minAmount && errors.minAmount}
//                   className="w-28"
//                 />
//               </div>

//               <span className="text-gray-500 text-sm">to</span>

//               {/* Max */}
//               <div className="flex items-center gap-2">
//                 <span className="text-gray-500 text-sm px-2 py-1 rounded-md border border-gray-200">
//                   CHF
//                 </span>
//                 <Input
//                   id="maxAmount"
//                   name="maxAmount"
//                   placeholder="10,000"
//                   value={values.maxAmount}
//                   onChange={handleChange}
//                   error={touched.maxAmount && Boolean(errors.maxAmount)}
//                   helperText={touched.maxAmount && errors.maxAmount}
//                   className="w-28"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* No. of Vacancy */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//           <label
//             htmlFor="vacancies"
//             className="block text-sm font-semibold text-gray-700"
//           >
//             No. of Vacancy
//           </label>
//           <div className="md:col-span-2">
//             <Input
//               id="vacancies"
//               name="vacancies"
//               type="number"
//               min={1}
//               placeholder="Enter number of vacancies"
//               value={values.vacancies}
//               onChange={handleChange}
//               error={touched.vacancies && Boolean(errors.vacancies)}
//               helperText={touched.vacancies && errors.vacancies}
//             />
//           </div>
//         </div>

//         {/* Location */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//           <label
//             htmlFor="location"
//             className="block text-sm font-semibold text-gray-700"
//           >
//             Location
//           </label>
//           <div className="md:col-span-2">
//             <Input
//               id="location"
//               name="location"
//               placeholder="Enter Location"
//               value={values.location}
//               onChange={handleChange}
//               error={touched.location && Boolean(errors.location)}
//               helperText={touched.location && errors.location}
//             />
//           </div>
//         </div>

//         {/* Date of Job Start */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//           <label
//             htmlFor="startDate"
//             className="block text-sm font-semibold text-gray-700"
//           >
//             Date of Job Start
//           </label>
//           <div className="md:col-span-2">
//             <Input
//               id="startDate"
//               name="startDate"
//               type="date"
//               value={values.startDate}
//               onChange={handleChange}
//               error={touched.startDate && Boolean(errors.startDate)}
//               helperText={touched.startDate && errors.startDate}
//               className="max-w-xs"
//             />
//           </div>
//         </div>

//         {/* Job Time */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//           <label className="block text-sm font-semibold text-gray-700">
//             Job Time
//           </label>
//           <div className="md:col-span-2">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
//               <Input
//                 id="startTime"
//                 name="startTime"
//                 type="time"
//                 value={values.startTime}
//                 onChange={handleChange}
//                 error={touched.startTime && Boolean(errors.startTime)}
//                 helperText={touched.startTime && errors.startTime}
//               />
//               <Input
//                 id="endTime"
//                 name="endTime"
//                 type="time"
//                 value={values.endTime}
//                 onChange={handleChange}
//                 error={touched.endTime && Boolean(errors.endTime)}
//                 helperText={touched.endTime && errors.endTime}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex justify-end gap-3 pt-4">
//           <Button
//             type="button"
//             className="rounded-full bg-gray-900 text-white px-6 py-2 hover:bg-gray-800"
//             onClick={() => setFieldValue?.("status", "draft")}
//           >
//             Save Draft
//           </Button>
//           <Button
//             type="submit"
//             className="rounded-full bg-black text-white px-6 py-2 hover:bg-gray-800"
//           >
//             Publish Job
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default JobRequirementForm;

// import React from "react";
// import Input from "../../../../components/ui/Input";
// import Button from "../../../../components/ui/Button";
// import Select from "../../../../components/ui/Select";

// const JobRequirementForm = ({
//   values,
//   handleChange,
//   errors,
//   touched,
//   setFieldValue,
// }) => {
//   const experienceOptions = [
//     { label: "Select Experience Level", value: "" },
//     { label: "Entry Level", value: "entry" },
//     { label: "Mid Level", value: "mid" },
//     { label: "Senior Level", value: "senior" },
//     { label: "Lead", value: "lead" },
//   ];

//   const skillsOptions = [
//     { label: "Select Skill", value: "" },
//     { label: "JavaScript", value: "javascript" },
//     { label: "Python", value: "python" },
//     { label: "Java", value: "java" },
//     { label: "C++", value: "cpp" },
//   ];

//   return (
//     <section className=" rounded-xl  px-6 mt-3 space-y-6 py-6 shadow-md">
//       <div className="w-full space-y-6">
//         {/* Experience Level */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//           <label
//             htmlFor="exp_level"
//             className="block text-xl font-bold text-gray-700"
//           >
//             Experience Level
//           </label>
//           <div className="md:col-span-2 w-full">
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

//         {/* Skills Required */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//           <label
//             htmlFor="skills"
//             className="block text-xl font-bold text-gray-700"
//           >
//             Skills Required
//           </label>
//           <div className="md:col-span-2 w-full">
//             <Select
//               name="skills"
//               value={values.skills}
//               onChange={handleChange}
//               options={skillsOptions}
//               error={touched.skills && Boolean(errors.skills)}
//               helperText={touched.skills && errors.skills}
//             />
//           </div>
//         </div>

//         {/* Salary Range */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//           <div>
//             <label
//               htmlFor="minAmount"
//               className="block text-xl font-bold text-gray-700"
//             >
//               Salary
//             </label>
//             <p className="text-gray-500 mt-1 text-sm">
//               Please specify the estimated salary range for the role. *You can
//               leave this blank.
//             </p>
//           </div>
//           <div className="md:col-span-2 flex flex-col space-y-4">
//             <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm max-w-md">
//               {/* Min Amount */}
//               <div className="flex items-center space-x-1">
//                 <span className="text-gray-500">CHF</span>
//                 <Input
//                   id="minAmount"
//                   name="minAmount"
//                   placeholder="0"
//                   value={values.minAmount}
//                   onChange={handleChange}
//                   error={false}
//                   helperText=""
//                   className="w-32"
//                 />
//               </div>
//               <span className="text-gray-500 font-medium">to</span>
//               {/* Max Amount */}
//               <div className="flex items-center space-x-1">
//                 <span className="text-gray-500">CHF</span>
//                 <Input
//                   id="maxAmount"
//                   name="maxAmount"
//                   placeholder="0"
//                   value={values.maxAmount}
//                   onChange={handleChange}
//                   error={false}
//                   helperText=""
//                   className="w-32"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end space-x-4 pt-6">
//           <Button
//             className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700"
//             type="submit"
//           >
//             Save Draft
//           </Button>
//           <Button
//             className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-500"
//             type="submit"
//           >
//             Publish
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default JobRequirementForm;
// import React, { useState } from "react";
// import Input from "../../../../components/ui/Input";
// import Button from "../../../../components/ui/Button";
// import Select from "../../../../components/ui/Select";

// const JobRequirmentForm = ({
//   values,
//   handleChange,
//   errors,
//   touched,
//   setFieldValue,
// }) => {
//   return (
//     <section className=" rounded-xl  px-6 mt-3 space-y-6 py-6 shadow-md">
//       <div className="flex flex-col items-center justify-center ">
//         <div className="w-full px-4 space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//             {/* Job Title */}
//             <div>
//               <label
//                 htmlFor="jobTitle"
//                 className="block text-xl font-bold text-gray-700"
//               >
//                 Experience Level
//               </label>
//             </div>
//             <div className="md:col-span-2 w-80">
//               <Select
//                 name="exp_level"
//                 value={values.exp_level}
//                 onChange={handleChange}
//                 options={[
//                   { label: "Select", value: "" },
//                   {
//                     label: "Sole Proprietorship",
//                     value: "Sole Proprietorship",
//                   },
//                   { label: "Partnership", value: "Partnership" },
//                   { label: "Corporation", value: "Corporation" },
//                   { label: "LLC", value: "LLC" },
//                 ]}
//                 error={touched.exp_level && Boolean(errors.exp_level)}
//                 helperText={touched.exp_level && errors.exp_level}
//               />
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//             {/* Job Title */}
//             <div>
//               <label
//                 htmlFor="jobTitle"
//                 className="block text-xl font-bold text-gray-700"
//               >
//                 Skills Required
//               </label>
//             </div>
//             <div className="md:col-span-2 w-80">
//               <Select
//                 name="skills"
//                 value={values.skills}
//                 onChange={handleChange}
//                 options={[
//                   { label: "Select", value: "" },
//                   {
//                     label: "Sole Proprietorship",
//                     value: "Sole Proprietorship",
//                   },
//                   { label: "Partnership", value: "Partnership" },
//                   { label: "Corporation", value: "Corporation" },
//                   { label: "LLC", value: "LLC" },
//                 ]}
//                 error={touched.skills && Boolean(errors.skills)}
//                 helperText={touched.skills && errors.skills}
//               />
//             </div>
//           </div>

//           {/* /////// */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//             {/* Job Title */}
//             <div>
//               <label
//                 htmlFor="jobTitle"
//                 className="block text-xl font-bold text-gray-700"
//               >
//                 Salary
//               </label>
//               <p className=" text-gray-500 mt-1">
//                 Please specify the estimated salary range for the role. *You can
//                 leave this blank{" "}
//               </p>
//             </div>
//             <div className="md:col-span-2">
//               <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm max-w-md">
//                 {/* Min Amount Input */}
//                 <div className="flex items-center space-x-1">
//                   <span className="text-gray-500">CHF</span>
//                   <Input
//                     id="minAmount"
//                     name="minAmount"
//                     placeholder="0"
//                     value={values.minAmount}
//                     onChange={handleChange}
//                     error={false}
//                     helperText=""
//                     className="w-32"
//                   />
//                 </div>

//                 {/* Separator */}
//                 <span className="text-gray-500 font-medium">to</span>

//                 {/* Max Amount Input */}
//                 <div className="flex items-center space-x-1">
//                   <span className="text-gray-500">CHF</span>
//                   <Input
//                     id="maxAmount"
//                     name="maxAmount"
//                     placeholder="0"
//                     value={values.maxAmount}
//                     onChange={handleChange}
//                     error={false}
//                     helperText=""
//                     className="w-32"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-end pt-10 px-4 ">
//         <Button
//           className="bg-dark text-white px-6 py-2 text rounded-full"
//           type="submit"
//         >
//           Save Draft
//         </Button>
//         <Button
//           className="bg-dark text-white px-6 py-2 text rounded-full"
//           type="submit"
//         >
//           Publish
//         </Button>
//       </div>
//     </section>
//   );
// };

// export default JobRequirmentForm;
