import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  MinusSmallIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect, useMemo } from "react";
import CustomCheckbox from "../../components/ui/CustomCheckbox";
import Button from "../../components/ui/Button";
import { useGetSkillsQuery } from "../../services/authApiSlice";
import { useTranslation } from "react-i18next";
const Pill = ({ label, active, onClick, t }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-2 py-1 rounded-full text-xs border ${
      active
        ? "bg-black text-white border-black"
        : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
    }`}
  >
    {t(label)}
  </button>
);

const RatingPill = ({ value, active, onClick, t }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-1 px-1.5 py-1 rounded-full text-xs border ${
      active
        ? "bg-black text-white border-black"
        : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
    }`}
  >
    <span className="text-amber-400">★</span>
    <span>{value}</span>
  </button>
);

const NumberStepper = ({ value, setValue, min = 1, max = 99 }) => {
  const dec = () => setValue((v) => Math.max(min, v - 1));
  const inc = () => setValue((v) => Math.min(max, v + 1));

  return (
    <div className="flex items-center justify-between w-full gap-3 bg-[#F3F3F3] px-4 rounded-lg py-2">
      <button
        type="button"
        onClick={dec}
        className="h-6 w-6 rounded-full border-2 border-black flex items-center justify-center hover:bg-gray-100"
      >
        <MinusSmallIcon className="h-5 w-5" />
      </button>
      <span className="w-6 text-center font-medium">{value}</span>
      <button
        type="button"
        onClick={inc}
        className="h-6 w-6 rounded-full border-2 border-black flex items-center justify-center hover:bg-gray-100"
      >
        <PlusSmallIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

const FiltersSidebar = ({ onFiltersChange, active, setActive }) => {
  const { data: skillData, isLoading, isError } = useGetSkillsQuery();
  const { t } = useTranslation();
  const [skills, setSkills] = useState(new Set());
  const [experience, setExperience] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [radius, setRadius] = useState(0);
  const [vacancy, setVacancy] = useState(1);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dateRange, setDateRange] = useState("");

  const dateOptions = useMemo(
    () => [
      { label: "Tomorrow", value: 1 },
      { label: "Next Week", value: 2 },
      { label: "Next Month", value: 3 },
    ],
    []
  );
  const expOptions = useMemo(() => ["Fresher", "Experienced"], []);
  const ratingOptions = useMemo(() => [5, 4, 3, 2, 1], []);

  const skillsOptions = useMemo(() => {
    if (!skillData?.data) return [];
    return skillData.data.map((skill) => ({
      label: skill.skill_name,
      value: skill.skill_id,
    }));
  }, [skillData]);

  const toggleSkill = (id) => {
    setSkills((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  const clearAll = () => {
    setSkills(new Set());
    setDateRange("");
    setExperience("");
    setMinPrice("");
    setMaxPrice("");
    setRating("");
    setRadius(0);
    setVacancy(1);
    setStartTime("");
    setEndTime("");
  };

  // Apply filters automatically on any change
  useEffect(() => {
    const payload = {
      salary_min: minPrice,
      salary_max: maxPrice,
      experience_level: experience,
      vacancy,
      job_date_filter: dateRange,
      rating,
      skill: skills.size ? [...skills].join(",") : "",
      radius,
      startTime,
      endTime,
    };
    onFiltersChange?.(payload);
  }, [
    minPrice,
    maxPrice,
    experience,
    vacancy,
    dateRange,
    rating,
    radius,
    startTime,
    endTime,
    skills,
  ]);

  return (
    // <section
    //   className={`
    //     bg-white rounded-xl border border-gray-300 p-4 overflow-y-auto
    //     fixed top-0 left-0 h-full z-0 sm:z-0 transform transition-transform duration-300
    //     w-64
    //     ${active ? "translate-x-0" : "-translate-x-full"}
    //     lg:translate-x-0 lg:relative lg:w-[22%]
    //   `}
    // >
    <section
      className={`
    bg-white rounded-xl border border-gray-300 p-4 overflow-y-auto
    fixed top-0 left-0 h-full z-50 lg:z-0
    transform transition-transform duration-300
    w-64
    ${active ? "translate-x-0" : "-translate-x-full"} 
    lg:translate-x-0 lg:relative lg:w-[22%]
  `}
    >
      {/* Header */}
      <div className="flex justify-between bg-[#FFD84D] font-semibold rounded-xl px-4 py-3 top-0 z-10">
        <div className="flex items-center gap-3">
          <AdjustmentsHorizontalIcon className="h-6 w-6" />
          <span>{t("Filters")}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={clearAll}
            className="px-2 text-gray-900 font-medium hover:underline"
          >
            {t("Clear All")}
          </Button>

          {/* Only show close button on sm/md */}
          <button
            type="button"
            onClick={() => setActive(false)}
            className="lg:hidden"
          >
            <XMarkIcon className="h-5 text-dark" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-4">
        <label className="block mb-2 font-medium text-sm">{t("Skills")}</label>
        {isLoading && <p className="text-sm text-gray-500">Loading...</p>}
        {isError && (
          <p className="text-sm text-red-500">Failed to load skills</p>
        )}
        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
          {skillsOptions.map((skill) => (
            <CustomCheckbox
              key={skill.value}
              label={skill.label}
              checked={skills.has(skill.value)}
              onChange={() => toggleSkill(skill.value)}
            />
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div className="mt-4">
        <label className="block mb-2 font-medium text-sm">
          {t("Date Range")}
        </label>
        <div className="flex items-center flex-wrap gap-2">
          {dateOptions.map((opt) => (
            <Pill
              key={opt.value}
              label={opt.label}
              active={dateRange === opt.value}
              onClick={() => setDateRange(opt.value)}
              t={t}
            />
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mt-4">
        <label className="block mb-2 font-medium text-sm">
          {t("Experience")}
        </label>
        <div className="flex items-center gap-2">
          {expOptions.map((opt) => (
            <Pill
              key={opt}
              label={opt}
              active={experience === opt}
              onClick={() => setExperience(opt)}
              t={t}
            />
          ))}
        </div>
      </div>

      {/* Salary Range */}
      <div className="mt-4">
        <label className="block mb-2 font-medium text-sm">
          {t("Salary Range")}
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="CHF 0"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            placeholder="CHF 500"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Ratings */}
      <div className="mt-4">
        <label className="block mb-2 font-medium text-sm">{t("Ratings")}</label>
        <div className="flex flex-wrap gap-2">
          {ratingOptions.map((opt) => (
            <RatingPill
              key={opt}
              value={opt}
              active={rating === opt}
              onClick={() => setRating(opt)}
              t={t}
            />
          ))}
        </div>
      </div>

      {/* Radius */}
      <div className="mt-4">
        <label className="block mb-2 font-medium text-sm">
          {t("Search Job By Radius")}{" "}
          <span className="text-gray-500">
            {t("Selected")} {radius} km
          </span>
        </label>
        <input
          type="range"
          min={0}
          max={100}
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="w-full accent-appcolor"
        />
      </div>

      {/* Vacancy */}
      <div className="mt-4">
        <label className="block mb-2 font-medium text-sm">{t("Vacancy")}</label>
        <NumberStepper value={vacancy} setValue={setVacancy} min={1} max={99} />
      </div>

      {/* Time Schedule */}
      <div className="mt-4">
        <label className="block mb-2 font-medium text-sm">
          {t("Time Schedule")}
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="block text-xs text-gray-600 mb-1">
              {t("Start Time")}
            </span>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <span className="block text-xs text-gray-600 mb-1">
              {t("End Time")}
            </span>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FiltersSidebar;

// import {
//   AdjustmentsHorizontalIcon,
//   MinusSmallIcon,
//   PlusSmallIcon,
//   ClockIcon,
// } from "@heroicons/react/24/outline";
// import React, { useMemo, useState } from "react";
// import CustomCheckbox from "../../components/ui/CustomCheckbox";
// import { useGetSkillsQuery } from "../../services/authApiSlice";

// const Pill = ({ label, active, onClick }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     className={[
//       "px-2 py-1 rounded-full text-xs border",
//       active
//         ? "bg-black text-white border-black"
//         : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200",
//     ].join(" ")}
//   >
//     {label}
//   </button>
// );

// const RatingPill = ({ value, active, onClick }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     className={[
//       "flex items-center gap-1 px-1.5 py-1 rounded-full text-xs border",
//       active
//         ? "bg-black text-white border-black"
//         : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200",
//     ].join(" ")}
//     aria-label={`${value} star${value !== "All" ? "" : "s"}`}
//   >
//     <span className="text-amber-400">★</span>
//     <span>{value}</span>
//   </button>
// );

// const NumberStepper = ({ value, setValue, min = 1, max = 99 }) => {
//   const dec = () => setValue((v) => Math.max(min, v - 1));
//   const inc = () => setValue((v) => Math.min(max, v + 1));
//   return (
//     <div className="flex items-center justify-between w-full gap-3 bg-[#F3F3F3] px-10 rounded-lg py-2">
//       <button
//         type="button"
//         onClick={dec}
//         className="h-6 w-6 rounded-full border-2 border-black flex items-center justify-center hover:bg-gray-100"
//       >
//         <MinusSmallIcon className="h-5 w-5" />
//       </button>
//       <span className="w-6 text-center font-medium">{value}</span>
//       <button
//         type="button"
//         onClick={inc}
//         className="h-6 w-6 rounded-full border-2 border-black flex items-center justify-center hover:bg-gray-100"
//       >
//         <PlusSmallIcon className="h-5 w-5" />
//       </button>
//     </div>
//   );
// };

// const FiltersSidebar = () => {
//   const { data: skillData, isLoading, isError } = useGetSkillsQuery();
//   const [skills, setSkills] = useState({ communication: false });
//   const [dateRange, setDateRange] = useState(""); // "Tomorrow" | "Next Week" | "Next Month"
//   const [experience, setExperience] = useState(""); // "Fresher" | "Experienced"
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [rating, setRating] = useState(""); // "All" | 5 | 4 | 3 | 2 | 1
//   const [radius, setRadius] = useState(0);
//   const [vacancy, setVacancy] = useState(1);
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");

//   const dateOptions = useMemo(
//     () => ["Tomorrow", "Next Week", "Next Month"],
//     []
//   );
//   const expOptions = useMemo(() => ["Fresher", "Experienced"], []);
//   const ratingOptions = useMemo(() => ["All", 5, 4, 3, 2, 1], []);

//   const clearAll = () => {
//     setSkills({ communication: false });
//     setDateRange("");
//     setExperience("");
//     setMinPrice("");
//     setMaxPrice("");
//     setRating("");
//     setRadius(0);
//     setVacancy(1);
//     setStartTime("");
//     setEndTime("");
//   };
//   const skillsOption = skillData?.data?.map((skill) => ({
//     label: skill?.skill_name,
//     value: skill?.skill_id,
//   }));

//   const apply = () => {
//     // hook up to parent or query system
//     const payload = {
//       skills,
//       dateRange,
//       experience,
//       price: { min: minPrice, max: maxPrice },
//       rating,
//       radiusKm: radius,
//       vacancy,
//       time: { startTime, endTime },
//     };
//     // eslint-disable-next-line no-console
//     console.log("Apply Filters:", payload);
//   };

//   return (
//     <section className="h-[125vh] bg-white w-full md:w-[22%] rounded-xl border border-gray-300 p-4">
//       {/* Header */}
//       <div className="flex items-center gap-3 bg-[#FFD84D] font-semibold rounded-xl px-4 py-3">
//         <AdjustmentsHorizontalIcon className="h-6 w-6" />
//         <span>Filters</span>
//       </div>

//       {/* Skills */}
//       <div className="mt-4">
//         <label className="block mb-2 font-medium text-sm">Skills</label>
//         <CustomCheckbox
//           label="Communication"
//           checked={skills.communication}
//           onChange={(e) =>
//             setSkills((s) => ({ ...s, communication: e.target.checked }))
//           }
//         />
//       </div>

//       {/* Date Range */}
//       <div className="mt-4">
//         <label className="block  mb-2 font-medium text-sm">Date Range</label>
//         <div className="flex items-center flex-wrap gap-2">
//           {dateOptions.map((opt) => (
//             <Pill
//               key={opt}
//               label={opt}
//               active={dateRange === opt}
//               onClick={() => setDateRange(opt)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Experience */}
//       <div className="mt-4">
//         <label className="block mb-2 font-medium text-sm">Experience</label>
//         <div className="flex items-center gap-2">
//           {expOptions.map((opt) => (
//             <Pill
//               key={opt}
//               label={opt}
//               active={experience === opt}
//               onClick={() => setExperience(opt)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Price Range */}
//       <div className="mt-4">
//         <label className="block mb-2 font-medium text-sm">Price Range</label>
//         <div className="flex items-center gap-2">
//           <input
//             type="number"
//             inputMode="decimal"
//             placeholder="$0"
//             className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//           />
//           <span className="text-gray-500">-</span>
//           <input
//             type="number"
//             inputMode="decimal"
//             placeholder="$500"
//             className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Ratings */}
//       <div className="mt-4">
//         <label className="block mb-2 font-medium text-sm">Ratings</label>
//         <div className="flex flex-wrap gap-2">
//           {ratingOptions.map((opt) => (
//             <RatingPill
//               key={opt}
//               value={opt}
//               active={rating === opt}
//               onClick={() => setRating(opt)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Radius */}
//       <div className="mt-4">
//         <label className="block mb-2 font-medium text-sm">
//           Search Job By Radius{" "}
//           <span className="text-gray-500">( Selected Range {radius} km )</span>
//         </label>
//         <input
//           type="range"
//           min={0}
//           max={100}
//           value={radius}
//           onChange={(e) => setRadius(Number(e.target.value))}
//           className="w-full accent-appcolor"
//         />
//       </div>

//       {/* Vacancy */}
//       <div className="mt-4">
//         <label className="block mb-2 font-medium text-sm">Vacancy</label>
//         <NumberStepper value={vacancy} setValue={setVacancy} min={1} max={99} />
//       </div>

//       {/* Time Schedule */}
//       <div className="mt-4">
//         <label className="block mb-2 font-medium text-sm">Time Schedule</label>
//         <div className="grid grid-cols-2 gap-3">
//           <div>
//             <span className="block text-xs text-gray-600 mb-1">Start Time</span>
//             <div className="relative">
//               <input
//                 type="time"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
//               />
//             </div>
//           </div>
//           <div>
//             <span className="block text-xs text-gray-600 mb-1">End Time</span>
//             <div className="relative">
//               <input
//                 type="time"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer buttons */}
//       <div className="mt-6 space-y-3">
//         <button
//           type="button"
//           onClick={apply}
//           className="w-full rounded-full bg-black text-white py-3 font-medium hover:opacity-90"
//         >
//           Apply Filters
//         </button>
//         <button
//           type="button"
//           onClick={clearAll}
//           className="w-full rounded-full bg-gray-200 text-gray-900 py-3 font-medium hover:bg-gray-300"
//         >
//           Clear All
//         </button>
//       </div>
//     </section>
//   );
// };

// export default FiltersSidebar;
