import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetEmployerJobDataQuery, useGetJobByIDQuery } from "../../../../services/jobApiSlice";
import ApplicantsJobDetails from "./ApplicantsJobDetails";
import EditJobModal from "../post-job/EditJobModal";
import { useTranslation } from "react-i18next";
import { pollingInterval } from "../../../../constants/app.constant";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import {
  ArrowLeft,
  Edit3,
  Users,
  FileText,
  BarChart3,
  MapPin,
  DollarSign,
  Calendar,
  Building2,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

const JobDetailsIndex = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('applicants');
  const [isEditModalOpen, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);

  const { state } = useLocation() || {
    state: {
      isOngoing: false,
    },
  };

  const job = state?.row;

  // Fetch complete job data for editing
  const { data: completeJobData } = useGetJobByIDQuery(job?.id, { skip: !job?.id });

  // Fetch data based on active tab
  const { data: jobData, isLoading, refetch } = useGetEmployerJobDataQuery(
    {
      job_id: job?.id,
      tab_name: activeTab === 'details' ? 'job_details' : activeTab === 'applicants' ? 'applicants' : 'job_details',
    },
    { pollingInterval: pollingInterval, skip: !job?.id }
  );

  const tabs = [
    { id: 'applicants', label: 'Applicants', icon: Users },
    { id: 'details', label: 'Job Details', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'draft':
        return <Edit3 className="w-4 h-4" />;
      case 'closed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{job?.job_role || 'Job Details'}</h1>
                <p className="text-sm text-gray-600">{job?.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job?.status)}`}>
                {getStatusIcon(job?.status)}
                {job?.status || 'Unknown'}
              </div>

              <button
                onClick={openEditModal}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                Edit Job
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">
                  {activeTab === 'applicants' ? (jobData?.data?.total_applicants || 0) : (job?.no_of_applications || 0)}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {jobData?.data?.approved_count || 0}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {jobData?.data?.pending_count || 0}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {jobData?.data?.rejected_count || 0}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'applicants' && (
              <ApplicantsJobDetails
                job={job}
                applicants={jobData?.data?.applicants || []}
                isOngoing={state?.isOngoing}
                t={t}
                refetch={refetch}
              />
            )}

            {activeTab === 'details' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                      <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{jobData?.data?.job_role || job?.job_role || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{job?.location || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
                      <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{jobData?.data?.salary || job?.salary || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                      <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{jobData?.data?.exp_level || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{jobData?.data?.start_date || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${getStatusColor(jobData?.data?.status || job?.status)}`}>
                        {getStatusIcon(jobData?.data?.status || job?.status)}
                        {jobData?.data?.status || job?.status || 'Unknown'}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="text-gray-900 whitespace-pre-line">{jobData?.data?.description || 'No description available'}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {jobData?.data?.skills && jobData.data.skills.length > 0 ? (
                      jobData.data.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 italic">No skills specified</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Coming Soon</h3>
                <p className="text-gray-600">Job performance analytics will be available here.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Job Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Edit Job</h2>
                <button
                  onClick={closeEditModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <EditJobModal
                onClose={closeEditModal}
                selected={{ raw: completeJobData?.data }}
                refetch={refetch}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailsIndex;
