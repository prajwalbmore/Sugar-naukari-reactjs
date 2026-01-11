import {
  BanknotesIcon,
  BellIcon,
  BriefcaseIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import React, { useState, useRef } from "react";

const CustomTargetIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="#FFDE59"
    stroke="currentColor"
    className={className}
  >
    {/* SVG paths as defined earlier */}
    <g strokeWidth="0"></g>
    <g strokeLinecap="round" strokeLinejoin="round"></g>
    <g>
      <path
        d="M18,3V6h3L18,9H15V6ZM13,14a3,3,0,1,0-3,3A3,3,0,0,0,13,14Z"
        fill="#FFDE59"
        strokeWidth="2"
      />
      <path
        d="M15,9l-2.8,2.8M15,6V9h3l3-3H18V3Z"
        fill="none"
        stroke="#FFDE59"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M16.92,13A5.55,5.55,0,0,1,17,14a7,7,0,1,1-7-7,5.55,5.55,0,0,1,1,.08"
        fill="none"
        stroke="#FFDE59"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <circle
        cx="10"
        cy="14"
        r="3"
        fill="none"
        stroke="#FFDE59"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </g>
  </svg>
);

const CustomTargetIcon1 = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="#000000"
    stroke="currentColor"
    className={className}
  >
    {/* Paths same as CustomTargetIcon but black */}
    <g strokeWidth="0"></g>
    <g strokeLinecap="round" strokeLinejoin="round"></g>
    <g>
      <path
        d="M18,3V6h3L18,9H15V6ZM13,14a3,3,0,1,0-3,3A3,3,0,0,0,13,14Z"
        fill="#000000"
        strokeWidth="2"
      />
      <path
        d="M15,9l-2.8,2.8M15,6V9h3l3-3H18V3Z"
        fill="none"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M16.92,13A5.55,5.55,0,0,1,17,14a7,7,0,1,1-7-7,5.55,5.55,0,0,1,1,.08"
        fill="none"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <circle
        cx="10"
        cy="14"
        r="3"
        fill="none"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </g>
  </svg>
);

const CustomChatIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill=""
    stroke="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>{`.cls-1{fill:#FFDE59;}.cls-2{fill:none;stroke:#FFDE59;stroke-miterlimit:10;stroke-width:1.91px;}`}</style>
    </defs>
    <polygon
      className="cls-1"
      points="12 9.14 12.59 10.39 13.91 10.6 12.96 11.57 13.18 12.96 12 12.3 10.82 12.96 11.04 11.57 10.09 10.6 11.41 10.39 12 9.14"
    />
    <polygon
      className="cls-1"
      points="17.73 9.14 18.32 10.39 19.64 10.6 18.68 11.57 18.91 12.96 17.73 12.3 16.55 12.96 16.77 11.57 15.82 10.6 17.14 10.39 17.73 9.14"
    />
    <polygon
      className="cls-1"
      points="6.27 9.14 6.86 10.39 8.18 10.6 7.23 11.57 7.45 12.96 6.27 12.3 5.09 12.96 5.32 11.57 4.36 10.6 5.68 10.39 6.27 9.14"
    />
    <path
      className="cls-2"
      d="M1.5,8.18v5.73a1.91,1.91,0,0,0,1.91,1.91h6.68L12,17.73l1.91-1.91h6.68a1.91,1.91,0,0,0,1.91-1.91V8.18a1.91,1.91,0,0,0-1.91-1.91H3.41A1.91,1.91,0,0,0,1.5,8.18Z"
    />
  </svg>
);

const CustomChatIcon1 = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill=""
    stroke="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>{`.cls-1{fill:#000000;}.cls-2{fill:none;stroke:#000000;stroke-miterlimit:10;stroke-width:1.91px;}`}</style>
    </defs>
    <polygon
      className="cls-1"
      points="12 9.14 12.59 10.39 13.91 10.6 12.96 11.57 13.18 12.96 12 12.3 10.82 12.96 11.04 11.57 10.09 10.6 11.41 10.39 12 9.14"
    />
    <polygon
      className="cls-1"
      points="17.73 9.14 18.32 10.39 19.64 10.6 18.68 11.57 18.91 12.96 17.73 12.3 16.55 12.96 16.77 11.57 15.82 10.6 17.14 10.39 17.73 9.14"
    />
    <polygon
      className="cls-1"
      points="6.27 9.14 6.86 10.39 8.18 10.6 7.23 11.57 7.45 12.96 6.27 12.3 5.09 12.96 5.32 11.57 4.36 10.6 5.68 10.39 6.27 9.14"
    />
    <path
      className="cls-2"
      d="M1.5,8.18v5.73a1.91,1.91,0,0,0,1.91,1.91h6.68L12,17.73l1.91-1.91h6.68a1.91,1.91,0,0,0,1.91-1.91V8.18a1.91,1.91,0,0,0-1.91-1.91H3.41A1.91,1.91,0,0,0,1.5,8.18Z"
    />
  </svg>
);

const SWIPE_THRESHOLD = 50;

const EmployerHomeSM = () => {
  const steps = [
    {
      title: "Post a Job in Seconds",
      description:
        "Fill in job details like role, hours, location, and budget.",
      icon: BriefcaseIcon,
      icon2: BriefcaseIcon,
      selectStep:  "/assets/landingpage/Phones/home/emp1.png"
    },
    {
      title: "Get Matched with Local Talent",
      description:
        "The app finds the best-fit candidates in your area instantly.",
      icon: CustomTargetIcon,
      icon2: CustomTargetIcon1,
      selectStep:  "/assets/landingpage/Phones/home/emp2.png"
    },
    {
      title: "Review Profiles & Hire",
      description:
        "Check ratings, past job performance, and availability before hiring.",
      icon: CheckCircleIcon,
      icon2: CheckCircleIcon,
      selectStep:  "/assets/landingpage/Phones/home/emp3.png"
    },
    {
      title: "Rate & Repeat",
      description:
        "Leave a review, save top workers, and repost or repeat jobs easily.",
      icon: CustomChatIcon,
      icon2: CustomChatIcon1,
      selectStep:  "/assets/landingpage/Phones/home/emp4.png"
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);
  const touchStartX = React.useRef(null);
  const lastSwipeTime = React.useRef(0);

  // Swipe handling for touch devices
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const now = Date.now();

    if (now - lastSwipeTime.current < 300) return; // debounce

    const diff = touchStartX.current - touchEndX;

    if (diff > SWIPE_THRESHOLD) {
      setActiveIndex((prev) => (prev + 1) % steps.length);
      lastSwipeTime.current = now;
    } else if (diff < -SWIPE_THRESHOLD) {
      setActiveIndex((prev) => (prev - 1 + steps.length) % steps.length);
      lastSwipeTime.current = now;
    }
  };

  const activeStep = steps[activeIndex];

  return (
    <section
      className="space-y-10 px-6 py-24 relative overflow-hidden bg-footer block lg:flex lg:items-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container mx-auto flex flex-col lg:flex-row justify-center gap-10">
        {/* Left Side */}
        <div className="flex-1 flex justify-center items-center relative">
          <div className="relative bg-lightYellow h-[430px] w-[480px] rounded-xl overflow-hidden"></div>
          <img
            src={activeStep.selectStep}
            alt={activeStep.title}
            className="object-contain h-[600px] absolute top-0"
          />
        </div>

        {/* Right Side */}
        <div className="flex-1 space-y-6 px-0 lg:px-10 max-w-xl mx-auto lg:mx-0">
          <h2 className="text-4xl">How It Works here.</h2>
          <h2 className="text-4xl">
            For <span className="italic font-bold">Employer</span>
          </h2>
          <p className="text-gray-600 max-w-md">
            With FastAff, daily wage jobs are just a few taps away. No long
            forms. No waiting.
          </p>

          <div className="space-y-4">
            {steps.map((step, index) => {
              const isActive = index === activeIndex;
              const Icon = isActive ? step.icon2 : step.icon;
              return (
                <div
                  key={index}
                  className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-lightYellow shadow-lg scale-105"
                      : "cursor-default"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg transition-colors duration-200 ${
                      isActive ? "bg-appcolor" : "bg-[#FCF6DF]"
                    }`}
                  >
                    <Icon
                      className={`h-8 w-8 transition-colors duration-200 ${
                        isActive ? "text-black" : "text-[#FFDE59]"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployerHomeSM;
