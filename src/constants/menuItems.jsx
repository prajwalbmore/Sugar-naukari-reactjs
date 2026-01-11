// src/constants/menuItems.js
import {
  HomeIcon,
  ChatBubbleLeftIcon,
  BriefcaseIcon,
  DocumentIcon,
  UserIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  BuildingOffice2Icon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { Crown, FileClock } from "lucide-react";
import React from "react";
export const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    end: true,
    icon: HomeIcon,
  },
  {
    name: "Messages",
    path: "/dashboard/messages",
    icon: ChatBubbleLeftIcon,
  },
  {
    name: "Jobs",
    path: "/dashboard/jobs",
    icon: BriefcaseIcon,
  },
  {
    name: "My Applications",
    path: "/dashboard/applications",
    icon: DocumentIcon,
  },
  {
    name: "Personal Information",
    path: "/dashboard/personal-info",
    icon: UserIcon,
  },
  {
    name: "Work History",
    path: "/dashboard/work-history",
    icon: ClockIcon,
  },
  {
    name: "Subscription",
    path: "/dashboard/subscription",
    icon: Crown,
  },
  {
    name: "Applicants",
    path: "/dashboard/applicants",
    icon: UsersIcon,
  },
  {
    name: "Jobs Listing",
    path: "/dashboard/jobs-listing",
    icon: BriefcaseIcon,
  },
  {
    name: "Company Information",
    path: "/dashboard/company-information",
    icon: BuildingOffice2Icon,
  },
  {
    name: "Job History",
    path: "/dashboard/job-history",
    icon: FileClock,
  },
  {
    name: "FAQs",
    path: "/dashboard/faqs",
    icon: QuestionMarkCircleIcon,
  },
  // {
  //   name: "Contact Us",
  //   path: "/dashboard/contact-us",
  //   icon: PhoneIcon,
  // },
];
// Permissions based on roles
export const permissions = {
  employee: [
    "Dashboard", //
    // "Messages", //
    "Jobs",
    "My Applications",
    "Personal Information",
    // "Work History",
    // "FAQs", //
  ],
  employer: [
    "Dashboard", //
    // "Messages", //
    // "Subscription", //===
    "Applicants", //===
    "Jobs Listing", //===
    "Company Information", //===
    // "Job History", //===
    // "FAQs", //
    // "Contact Us", //===
  ],
};
