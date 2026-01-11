// LocationMapModal.jsx
import React, { useState } from "react";
import MapComponent from "../empyoerdashboard/post-job/MapComponent";
import Button from "../../../components/ui/Button";


const LocationMapModal = ({ onClose, onLocationSave, initialValues }) => {
  const [formValues, setFormValues] = useState({
    location: initialValues?.location || "",
    latitude: initialValues?.latitude || 0,
    longitude: initialValues?.longitude || 0,
  });

  const handleSave = () => {
    if (formValues.location) {
      onLocationSave(formValues);
      onClose();
    }
  };

  const setFieldValue = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="p-4 space-y-4">
      {/* <div className="text-lg font-semibold mb-4">Select Location</div> */}

      <MapComponent
        setFieldValue={setFieldValue}
        values={formValues}
        setTouched={() => {}} // Empty function for modal context
      />

      <div className="flex justify-end gap-3 mt-6">
        <Button
          type="button"
          onClick={onClose}
          className="rounded-full bg-gray-300 px-6 py-2 hover:bg-gray-400"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSave}
          className="rounded-full bg-black text-white px-6 py-2 hover:bg-gray-800"
          disabled={!formValues.location}
        >
          Save Location
        </Button>
      </div>
    </div>
  );
};

export default LocationMapModal;
