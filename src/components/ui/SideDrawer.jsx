import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";

const SideDrawer = ({
  isOpen,
  onClose,
  children,
  position = "right",
  width = "w-96",
}) => {
  const drawerPosition =
    position === "right"
      ? "right-0 translate-x-full"
      : "left-0 -translate-x-full";

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 h-full ${width} bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : drawerPosition
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Payment</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 overflow-y-auto">{children}</div>
      </div>
    </>
  );
};

export default SideDrawer;
