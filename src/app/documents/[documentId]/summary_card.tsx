"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface SummaryCardProps {
    documentId: Id<"documents">;
}

const SummaryCard = ({ documentId }: SummaryCardProps) => {
    const [isZoomed, setIsZoomed] = useState(false);

    // Fetch the summary from Convex using the documentId
    const summaryData = useQuery(api.summarys.getSummaryByDocumentId, { documentId });

    if (summaryData === null || summaryData === "") {
        return null;
    }

    return (
        <>
            {/* Dimmed background when zoomed */}
            {isZoomed && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            )}

            {/* Main component */}
            <div
                className={`relative bg-white p-4 rounded-lg shadow-lg m-3 border border-gray-200 transition-all duration-300 ease-in-out
        ${isZoomed ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 max-w-2xl z-50 overflow-auto" : "w-64 h-80 overflow-y-auto"}`}
            >
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-gray-800">Summary</h2>
                    {/* Zoom button */}
                    <button
                        onClick={() => setIsZoomed(!isZoomed)}
                        className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        aria-label={isZoomed ? "Close" : "Zoom"}
                    >
                        {isZoomed ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                        )}
                    </button>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line break-words">
                    {summaryData}
                </p>
            </div>
        </>
    );
};

export default SummaryCard;