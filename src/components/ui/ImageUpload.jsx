import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const ImageUpload = ({
  label = "Upload Image",
  initialImage = "",
  onChange,
  size = "w-16 h-16",
}) => {
  const [preview, setPreview] = useState(initialImage);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        if (onChange) onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreview("");
    if (onChange) onChange(null);
  };

  return (
    <div className="relative inline-block">
      <img
        src={preview || "https://randomuser.me/api/portraits/men/71.jpg"}
        alt="Profile"
        className={`${size} rounded-full object-cover border`}
      />

      {preview && (
        <button
          type="button"
          onClick={removeImage}
          className="absolute top-0 right-0 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
        >
          <XMarkIcon className="h-3 w-3" />
        </button>
      )}

      <label className="absolute bottom-0 right-0 cursor-pointer">
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          className="hidden"
          onChange={handleFileChange}
        />
        {!preview && (
          <div className="bg-black text-white text-xs px-1 py-1 rounded-full">
            <PencilSquareIcon className="h-4 w-4" />
          </div>
        )}
      </label>
    </div>
  );
};

export default ImageUpload;
