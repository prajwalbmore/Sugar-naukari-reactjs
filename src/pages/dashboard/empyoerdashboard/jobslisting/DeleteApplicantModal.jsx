import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useDeleteApplicantEmployeeMutation, useDeleteApplicantMutation } from "../../../../services/faqApiSlice";
import { handleSubmit } from "../../../../utils/useHandleSubmit";

const DeleteApplicantModal = ({
  jobs,
  selected,
  onClose,
  refetch,
  isEmployee = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [deleteApplicant] = useDeleteApplicantMutation();
  const [deleteApplicantEmployee] = useDeleteApplicantEmployeeMutation();
  console.log("first", selected);
  const handleDelete = async () => {
    try {
      setLoading(true);
      if (isEmployee) {
        handleSubmit({
          apiCall: deleteApplicantEmployee,
          values: { job_application_id: selected?.id },
        });
      } else {
        handleSubmit({
          apiCall: deleteApplicant,
          values: { job_application_id: selected?.job_application_id },
        });
      }

      await new Promise((res) => setTimeout(res, 1000)); // fake delay for UX
      refetch?.(); // Refresh data after deletion
      onClose(); // Close modal
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="bg-red-100 rounded-full p-3 mb-4">
        <AlertTriangle className="text-red-600 w-6 h-6" />
      </div>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Confirm Deletion
      </h2>
      <p className="text-gray-600 mb-6 text-sm">
        Are you sure you want to delete this application? This action cannot be
        undone.
      </p>

      <div className="flex justify-center gap-3 w-full">
        <button
          onClick={onClose}
          className="w-1/2 border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-100 transition"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="w-1/2 bg-red-600 text-white rounded-lg py-2 hover:bg-red-700 transition disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default DeleteApplicantModal;
