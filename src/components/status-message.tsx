"use client";

import React from "react";
import { useStatusMessage } from "@/app/documents/context/status-message-context";
import { X } from 'lucide-react';
// import { XMarkIcon } from "@heroicons/react/24/outline"; // For the close icon

const StatusMessage: React.FC = () => {
  const { statusMessage, hideStatusMessage } = useStatusMessage();
  const { isVisible, message, type } = statusMessage;

  if (!isVisible) {
    return null;
  }

  // Determine styling based on message type
  const typeClasses = {
    info: "bg-blue-500 text-white",
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    loading: "bg-yellow-500 text-gray-900",
  };

  const formatMessageWithBreaks = (text: string) => {
    const html = text.replace(/\n/g, "<br />");
    return { __html: html };
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-900 transition-opacity duration-300 ease-in-out z-40
          ${isVisible ? "opacity-30" : "opacity-0 pointer-events-none"}`}
      ></div>

      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-4 rounded-lg shadow-lg flex items-center justify-between space-x-4 ${typeClasses[type]} max-w-sm w-full transition-all duration-300 ease-in-out transform ${isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
      >
        <p className="font-medium text-sm sm:text-base flex-grow"><span dangerouslySetInnerHTML={formatMessageWithBreaks(message || "")} /></p>
        {type === "loading" && (
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
        )}
        <button
          onClick={hideStatusMessage}
          className="ml-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close message"
        >
          <X className="h-5 w-5 rounded-full bg-red-600" />
        </button>
      </div>
    </>
  );
};

export default StatusMessage;


