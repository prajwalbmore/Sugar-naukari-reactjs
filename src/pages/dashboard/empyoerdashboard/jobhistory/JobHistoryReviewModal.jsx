import React, { useState } from "react";
import { handleSubmit } from "../../../../utils/useHandleSubmit";
import { useReviewEmployerJobMutation } from "../../../../services/jobApiSlice";
import { MapPin } from "lucide-react";
import PropTypes from "prop-types";
import Button from "../../../../components/ui/Button";
const Stars = ({ value = 0, outOf = 5, onChange, disabled = false }) => {
  const handleClick = (index) => {
    if (!disabled && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {Array.from({ length: outOf }).map((_, i) => {
          const isFilled = i < value;
          return (
            <span
              key={i}
              className={`text-2xl ${
                disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              } ${isFilled ? "text-amber-400" : "text-gray-300"}`}
              onClick={() => handleClick(i)}
              aria-label={`${i + 1} star`}
            >
              ★
            </span>
          );
        })}
      </div>
    </div>
  );
};

// 📦 Section Component
function Section({ title, help, children, t }) {
  return (
    <section className="section space-y-1">
      <h3 className="title text-lg font-semibold">{t(title)}</h3>
      <p className="help text-xs text-gray-500">{help}</p>
      {children}
    </section>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  help: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
// "employee_given_rating": {
// "following_instructions": 2,
// "punctuality": 3,
// "professionalism_and_behavior": 2,
// "work_quality": 2,
// "independence_and_proactivity": 2,
// "total_rating": 2.2
// }
const JobHistoryReviewModal = ({ jobs, onClose, refetch, t }) => {
  const [ratings, setRatings] = useState({
    instructions: jobs?.employee_given_rating?.following_instructions || 0,
    punctuality: jobs?.employee_given_rating?.punctuality || 0,
    professionalism:
      jobs?.employee_given_rating?.professionalism_and_behavior || 0,
    workQuality: jobs?.employee_given_rating?.work_quality || 0,
    initiative: jobs?.employee_given_rating?.independence_and_proactivity || 0,
  });
  const [reviewJob] = useReviewEmployerJobMutation();
  const job = jobs;
  const ratingSections = [
    {
      key: "instructions",
      title: "Following Instructions",
      help: "Evaluate the student’s ability to understand and follow instructions accurately, ensuring tasks are performed as expected.",
    },
    {
      key: "punctuality",
      title: "Punctuality",
      help: "Assess whether the student arrives on time and consistently adheres to agreed schedules.",
    },
    {
      key: "professionalism",
      title: "Professionalism & Behavior",
      help: "Evaluate the student’s attitude and behavior toward colleagues and the employer, including rule-following, politeness, and teamwork.",
    },
    {
      key: "workQuality",
      title: "Work Quality",
      help: "Assess the precision, efficiency, and care the student puts into their tasks, ensuring the output meets company standards.",
    },
    {
      key: "initiative",
      title: "Independence & Proactivity",
      help: "Evaluate the student’s ability to work autonomously, take initiative, and solve problems without requiring constant supervision.",
    },
  ];
  const handleRatingChange = (key, value) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
  };
  const onSubmit = () => {
    const payload = {
      job_id: jobs?.id,
      employee_id: job.employee_id,
      following_instructions: ratings.instructions,
      punctuality: ratings.punctuality,
      professionalism_and_behavior: ratings.professionalism,
      work_quality: ratings.workQuality,
      independence_and_proactivity: ratings.initiative,
    };
    console.log("Submitted ratings:", payload);
    handleSubmit({
      values: payload,
      apiCall: reviewJob,
      refetch: () => {
        refetch();
        onClose();
      },
    });
  };
  return (
    <section className="space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl px-6 py-5 shadow hover:shadow-lg transition">
        <div className="flex items-center gap-5">
          <img
            src={job.logo}
            alt={job.user}
            className="h-24 w-24 rounded-full object-cover border"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{job.user}</h3>
            <p className="text-gray-600">{job.title}</p>
            {job.location && (
              <p className="flex items-center gap-1 text-gray-500 mt-1">
                <MapPin className="h-4 w-4 text-red-500" />
                {job.location}
              </p>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-3 mt-5 text-sm font-medium">
          <span className="bg-[#56CDAD1A] text-[#56CDAD] px-3 py-1 rounded-full">
            {t("Time Period")}: {job.validTill}
          </span>
          <span className="border border-[#FFB836] text-[#FFB836] px-3 py-1 rounded-full">
            {t("Total Working Hour")}: {job.time}
          </span>
          <span className="border border-black text-black px-3 py-1 rounded-full">
            {t("Total Salary")}: {job.pay}
          </span>
        </div>
      </div>

      <div className="container bg-white rounded-2xl space-y-5 px-5 py-5">
        {ratingSections.map(({ key, title, help }) => (
          <Section key={key} title={title} help={help} t={t}>
            <Stars
              value={ratings[key]}
              onChange={(val) => handleRatingChange(key, val)}
              disabled={job?.is_review_given}
            />
          </Section>
        ))}
      </div>
      {!job?.is_review_given && (
        <Button
          className="bg-dark w-full rounded-lg text-white py-3"
          onClick={onSubmit}
        >
          {t("Submit")}
        </Button>
      )}
    </section>
  );
};

export default JobHistoryReviewModal;
