import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import React from "react";

const Accordion = ({ title, children, isdashboard }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div
      className={`${
        isOpen ? "bg-appcolor" : isdashboard ? "bg-[#F6F6F6]" : "bg-footer"
      } rounded-xl shadow-sm p-2`}
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-left text-lg font-semibold rounded-xl"
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-5 w-5 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Body with smooth transition */}
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
        className="overflow-hidden transition-all duration-500 ease-in-out px-4"
      >
        <div className="pb-2">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
