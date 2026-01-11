import { XMarkIcon, LinkIcon } from "@heroicons/react/24/outline";
import { FaWhatsapp, FaTwitter, FaLinkedin } from "react-icons/fa";
import React from "react";

const ShareModal = ({ onClose, isOpen }) => {
  const shareUrl = window.location.href;
  const encodedUrl = encodeURIComponent(shareUrl);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="p-6">
        <div className="flex justify-around items-center gap-10">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-green-600 hover:scale-110 transition"
          >
            <FaWhatsapp className="text-3xl" />
            <span className="text-sm">WhatsApp</span>
          </a>

          {/* Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-sky-500 hover:scale-110 transition"
          >
            <FaTwitter className="text-3xl" />
            <span className="text-sm">Twitter</span>
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-blue-700 hover:scale-110 transition"
          >
            <FaLinkedin className="text-3xl" />
            <span className="text-sm">LinkedIn</span>
          </a>

          {/* Copy URL */}
          <button
            onClick={handleCopy}
            className="flex flex-col items-center text-gray-700 hover:scale-110 transition"
          >
            <LinkIcon className="w-7 h-7" />
            <span className="text-sm">Copy</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
