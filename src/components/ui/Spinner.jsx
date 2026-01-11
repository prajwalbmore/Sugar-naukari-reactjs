import React from "react";

const Spinner = ({ size = 20, color = "emerald-700", className = "" }) => {
  // size in Tailwind units (e.g., 16 = w-16 h-16)
  return (
    <div className={`flex justify-center mt-60 min-h-screen ${className}`}>
      <div
        className={`
          border-4 border-t-transparent rounded-full animate-spin
          w-${size} h-${size} border-${color}
        `}
      ></div>
    </div>
  );
};

export default Spinner;
