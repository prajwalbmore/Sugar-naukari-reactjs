import React from "react";
import { useTranslation } from "react-i18next";

const Progress = ({ applied = 5, capacity = 10, t }) => {
  const pct = Math.max(0, Math.min(100, (applied / capacity) * 100));
  return (
    <div className="bg-[#EEEEEE] rounded-2xl px-4 py-2">
      <div className="h-9 w-full rounded-xl  flex items-center px-3">
        <span className="text-sm">
          <span className="font-semibold">
            {applied} {t("applied")}
          </span>
          <span className="text-gray-500">
            {" "}
            {t("of")} {capacity} {t("capacity")}
          </span>
        </span>
      </div>
      <div className="mt-2 h-2 w-full rounded-full  bg-[#D6DDEB] overflow-hidden">
        <div className="h-full bg-appcolor" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const MetaRow = ({ label, value, t }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm text-gray-500">{t(label)}</span>
    <span className="text-sm font-medium">{value}</span>
  </div>
);

const Chip = ({ children }) => (
  <span className="inline-block rounded-md bg-indigo-50 text-indigo-700 text-xs px-3 py-1">
    {children}
  </span>
);

const items = [
  "Community engagement to ensure that is supported and actively represented online",
  "Focus on social media content development and publication",
  "Marketing and strategy support",
  "Stay on top of trends on social media platforms, and suggest content ideas to the team",
  "Engage with online communities",
  "You get energy from people and building the ideal work environment",
  "You have a sense for beautiful spaces and office experiences",
  "You are a confident office manager, ready for added responsibilities",
  "You're detail-oriented and creative",
  "You're a growth marketer and know how to run campaigns",
  "You get energy from people and building the ideal work environment",
  "You have a sense for beautiful spaces and office experiences",
];
const JobDescription = ({ isCompanyDetail = false, jobData }) => {
  // console.log("jobData", jobData);
  const {
    description,
    total_vacancy,
    no_of_vacancy,
    job_role,
    job_posted_on,
    start_date,
    salary,
    exp_level,
    jObSkills,
  } = jobData || {};
  const { t } = useTranslation();
  return (
    <div className="p-6 bg-white">
      {/* 2-column responsive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left column: description */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold">{t("Job Description")}</h2>
          <p className="mt-3 text-gray-600 leading-7">{description}</p>

          <h3 className="mt-8 text-xl font-bold">{t("Job Role")}</h3>
          <ul className="mt-4 space-y-3">
            {job_role
              ?.split(".")
              .filter((t) => t.trim() !== "")
              .map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <span className="mt-1  h-4 w-4 rounded-full border border-emerald-400 text-emerald-500 leading-3 text-[10px] flex items-center justify-center">
                    ✓
                  </span>
                  <span>{t}</span>
                </li>
              ))}
          </ul>
        </div>

        {/* Right column: sidebar */}
        <aside className="lg:col-span-1 px-10">
          <h3 className="text-2xl font-bold">{t("About this role")}</h3>
          <div className="mt-4">
            <Progress applied={no_of_vacancy} capacity={total_vacancy} t={t} />
          </div>

          <div className="mt-5 rounded-md border border-gray-100" />

          <div className="mt-4 space-y-1">
            <MetaRow label="Apply Before" value={start_date} t={t} />
            <MetaRow label="Job Posted On" value={job_posted_on} t={t} />
            <MetaRow label="Salary" value={salary} t={t} />
            <MetaRow label="Experience" value={exp_level} t={t} />
          </div>

          <div className="mt-5 rounded-md border border-gray-100" />

          <h4 className="mt-8 text-2xl font-bold">{t("Required Skills")}</h4>
          <div className="mt-3 flex flex-wrap gap-2 font-semibold">
            {jObSkills.map((skill, index) => (
              <Chip key={index}>{skill?.name}</Chip>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default JobDescription;
