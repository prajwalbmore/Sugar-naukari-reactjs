import React, { useState } from "react";

// const experiences = [
//   {
//     id: 1,
//     title: "Product Designer",
//     company: "Twitter",
//     type: "Full-Time",
//     duration: "Jun 2019 – Present (1y 1m)",
//     location: "Manchester, UK",
//     logo: "data:image/png;base64,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",
//   },
//   {
//     id: 2,
//     title: "Growth Marketing Designer",
//     company: "GoDaddy",
//     type: "Full-Time",
//     duration: "Jun 2011 – May 2019 (8y)",
//     location: "Manchester, UK",
//     logo: "data:image/png;base64,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",
//   },
//   {
//     id: 3,
//     title: "UX Researcher",
//     company: "Adobe",
//     type: "Part-Time",
//     duration: "Jan 2010 – Dec 2010 (1y)",
//     location: "San Francisco, USA",
//     logo: "https://via.placeholder.com/50",
//   },
//   {
//     id: 4,
//     title: "UI Developer",
//     company: "Google",
//     type: "Contract",
//     duration: "Mar 2008 – Dec 2009 (1y 9m)",
//     location: "Mountain View, USA",
//     logo: "https://via.placeholder.com/50",
//   },
//   {
//     id: 5,
//     title: "Intern Designer",
//     company: "Facebook",
//     type: "Internship",
//     duration: "Jun 2007 – Aug 2007 (3m)",
//     location: "Menlo Park, USA",
//     logo: "https://via.placeholder.com/50",
//   },
// ];

const Experiences = ({ userData, refetch, user, t }) => {
  const [showAll, setShowAll] = useState(false);
  console.log("userData", userData);

  // Get experiences from work_history API
  const workHistoryExperiences = userData?.data?.work_history?.map((history, index) => ({
    id: `work_${history.id || index}`,
    title: history.title,
    company: history.company_name,
    type: "Work History",
    duration: history.period,
    location: history.location,
    logo: history.company_logo,
    source: "work_history"
  })) || [];

  // Get experiences from user's experience array (calculated from completed jobs)
  const calculatedExperiences = userData?.data?.experience?.map((exp, index) => ({
    id: `exp_${index}`,
    title: exp.role,
    company: exp.company,
    type: "Completed Job",
    duration: `${new Date(exp.startDate).toLocaleDateString()} - ${new Date(exp.endDate).toLocaleDateString()}`,
    location: "Job Location",
    logo: "/assets/company-placeholder.png", // Placeholder logo
    source: "calculated",
    description: exp.description
  })) || [];

  // Combine both sources
  const allExperiences = [...calculatedExperiences, ...workHistoryExperiences];

  const displayedExperiences = showAll ? allExperiences : allExperiences.slice(0, 2);

  return (
    <div className="border border-gray-300 rounded-2xl p-6 shadow-sm space-y-4 bg-white">
      <h3 className="text-lg font-semibold">{t("Experiences")}</h3>
      <div className="space-y-4 transition-all duration-500 ease-in-out overflow-hidden">
        {displayedExperiences.map((exp) => (
          <div
            key={exp.id}
            className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 ease-in-out"
          >
            <img
              src={exp.logo}
              alt={exp.company}
              className="w-12 h-12 rounded-md"
            />
            <div className="flex-1">
              <h4 className="font-bold text-gray-800">{exp.title}</h4>
              <p className="text-sm text-gray-600">
                {exp.company} • {exp.type} • {exp.duration}
              </p>
              <p className="text-sm text-gray-500">{exp.location}</p>
              {exp.description && (
                <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      {allExperiences.length > 2 && (
        <div className="flex justify-center items-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="font-semibold hover:underline transition-colors duration-300 ease-in-out"
          >
            {showAll
              ? "Show less"
              : `Show ${allExperiences.length - 2} more experiences`}
          </button>
        </div>
      )}
    </div>
  );
};

export default Experiences;
