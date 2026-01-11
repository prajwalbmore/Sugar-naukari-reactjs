import {
  Briefcase,
  Clock,
  MapPin,
  Users,
  Calendar,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";
import React from "react";
import { FaBuilding } from "react-icons/fa";

// fallback job data
const fallbackJob = {
  _id: "690f36e2ab1d947ecb799740",
  jobTitle: "Test 1233",
  jobDescription: "skillOptions",
  jobRole: "skillOptions",
  exp_level: "Fresher",
  skills: ["Node.js", "Express"],
  salary: "3",
  vacancy: 9,
  location: "skillOptions",
  startdate: "2025-11-19T18:30:00.000Z",
  status: "active",
  createdBy: {
    fullName: "Akshay Patil",
    email: "akshay@yopmail.com",
    mobile: "9988774455",
  },
  createdAt: "2025-11-08T12:26:10.931Z",
};

export default function JobDetails({ job }) {
  const jobData = job || fallbackJob;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  // Reusable info card UI
  const InfoCard = ({ icon, title, value, color }) => (
    <div className="group bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white/50 hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg ${color}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700">{title}</p>
        <p className="text-lg font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="px-6 lg:px-24 py-10 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-10 border border-white/50">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-2xl flex-shrink-0">
            <FaBuilding className="w-8 h-8" />
          </div>

          {/* Job Title */}
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {jobData.jobTitle}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm bg-gray-100 px-4 py-2 rounded-2xl border border-gray-200">
                <FaBuilding className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-gray-900">
                  {jobData.createdBy.fullName}
                </span>
              </div>

              <div className="text-sm font-bold bg-emerald-50 text-emerald-600 px-4 py-2 rounded-2xl border border-emerald-200">
                ₹{jobData.salary} LPA
              </div>

              <div className="text-xs text-gray-500">
                Posted {formatDate(jobData.createdAt)}
              </div>
            </div>
          </div>

          {/* CTA */}
          <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 text-lg">
            Apply Now <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Side */}
        <div className="space-y-8">
          {/* Quick Info */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Info</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard
                icon={<Clock className="w-6 h-6" />}
                title="Experience"
                value={jobData.exp_level}
                color="bg-orange-500"
              />

              <InfoCard
                icon={<MapPin className="w-6 h-6" />}
                title="Location"
                value={jobData.location}
                color="bg-blue-600"
              />

              <InfoCard
                icon={<Users className="w-6 h-6" />}
                title="Openings"
                value={jobData.vacancy}
                color="bg-purple-600"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200">
            <h3 className="text-lg font-bold mb-4">Contact Recruiter</h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm">
                <Mail className="w-5 h-5 text-gray-500" />
                <span className="font-medium">{jobData.createdBy.email}</span>
              </div>

              <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm">
                <Phone className="w-5 h-5 text-gray-500" />
                <span className="font-medium">{jobData.createdBy.mobile}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-8">
          {/* Description */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">About the Role</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {jobData.jobDescription}
            </p>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Required Skills</h2>

            <div className="flex flex-wrap gap-3">
              {jobData.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="px-6 py-3 bg-gray-100 rounded-2xl border hover:bg-emerald-100 hover:border-emerald-300 font-medium transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-orange-50 rounded-3xl p-6 border border-orange-200">
            <h3 className="text-lg font-bold mb-3">Timeline</h3>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <Calendar className="w-5 h-5" />
                Start: {formatDate(jobData.startdate)}
              </div>

              <div className="w-px h-6 bg-gray-300"></div>

              <span className="text-gray-600 font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
