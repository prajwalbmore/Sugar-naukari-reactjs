import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  DollarSign,
  Calendar,
  Building2,
  Users,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

const ListingJobCard = ({
  job,
  isDetails = true,
  onClick = () => {},
  isEmpyoer = false,
  isEdit = true,
  isOngoing = false,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        return <Clock className="w-4 h-4" />;
      case 'closed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{job?.title || job?.job_role || 'Job Title'}</h3>
            <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(job?.status)}`}>
              {getStatusIcon(job?.status)}
              {job?.status || 'Unknown'}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-1 text-gray-600 text-sm mb-1">
            <Users className="w-4 h-4" />
            <span>{job?.applied || 0} applicants</span>
          </div>
          <div className="text-sm text-gray-500">
            {job?.capacity || 0} positions
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600 truncate">{job?.location || 'N/A'}</span>
        </div>

        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{job?.pay || job?.salary || 'N/A'}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{job?.validTill || 'N/A'}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{job?.time || 'N/A'}</span>
        </div>
      </div>

      {job?.skills && job.skills.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
          <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                +{job.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Posted {job?.duration || 'recently'}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/dashboard/edit-job/${job?.id}`)}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            Edit
          </button>
          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingJobCard;
