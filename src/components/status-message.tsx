"use client";

import React from "react";
import { useStatusMessage } from "@/app/documents/context/status-message-context";
import { X } from 'lucide-react';
import { CheckCircle, Info, AlertTriangle, Loader2 } from 'lucide-react';
// import { XMarkIcon } from "@heroicons/react/24/outline"; // For the close icon

const StatusMessage: React.FC = () => {
  const { statusMessage, hideStatusMessage } = useStatusMessage();
  const { isVisible, message, type } = statusMessage;

  if (!isVisible) {
    return null;
  }

  // --- Modern Type-Specific Styling ---
  // Using more subtle background and text colors, often variations of gray or white,
  // with a distinct accent color for the icon.
  const typeStyles = {
    info: {
      bgColor: "bg-white",
      textColor: "text-gray-800",
      borderColor: "border-blue-300",
      icon: <Info className="h-6 w-6 text-blue-500" />,
    },
    success: {
      bgColor: "bg-white",
      textColor: "text-gray-800",
      borderColor: "border-green-300",
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
    },
    error: {
      bgColor: "bg-white",
      textColor: "text-gray-800",
      borderColor: "border-red-300",
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
    },
    loading: {
      bgColor: "bg-white",
      textColor: "text-gray-800",
      borderColor: "border-yellow-300",
      icon: <Loader2 className="h-6 w-6 text-yellow-500 animate-spin" />, // Using Loader2 for consistent icon size
    },
  };

  const currentTypeStyle = typeStyles[type];

  const formatMessageWithBreaks = (text: string) => {
    const html = text.replace(/\n/g, "<br />");
    return { __html: html };
  };

  const handleRefresh = () => {
    window.location.reload();
  };



  return (
    <>
      {/* Background Overlay */}
      <div
        className={`fixed inset-0 bg-gray-900 transition-opacity duration-300 ease-in-out z-40
          ${isVisible ? "opacity-30" : "opacity-0 pointer-events-none"}`}
        aria-hidden="true"
        onClick={type !== "loading" ? hideStatusMessage : undefined} // Allow closing overlay unless loading
      ></div>

      {/* Status Message Container */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-6 rounded-xl shadow-2xl border ${currentTypeStyle.borderColor} ${currentTypeStyle.bgColor} max-w-sm w-full transition-all duration-300 ease-in-out transform
          ${isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
          } flex flex-col items-center text-center`} // Centered content
        role="alert"
        aria-live="assertive"
      >
        {(
          <button
            onClick={hideStatusMessage}
            className="absolute top-2 right-2 p-2 rounded-full text-gray-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
            aria-label="Close message"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <div className="flex items-center justify-center mb-4">
          {currentTypeStyle.icon}
        </div>

        <p className={`font-medium text-base mb-4 ${currentTypeStyle.textColor}`}>
          <span dangerouslySetInnerHTML={formatMessageWithBreaks(message || "")} />
        </p>

        <div className="flex items-center space-x-3 mt-2">
          {/* Refresh Button for success messages */}
          {/* {type === "success" && (
            <button
              onClick={handleRefresh}
              className="px-4 py-2 text-sm rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-semibold shadow-md"
            >
              Refresh Page
            </button>
          )} */}

          {/* Close Button (only if not loading) */}

        </div>
      </div>
    </>
  );
};

export default StatusMessage;


