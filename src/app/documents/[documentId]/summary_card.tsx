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
                className={` bg-white p-4 rounded-lg shadow-lg m-3 border border-gray-200 transition-all duration-300 ease-in-out
        ${isZoomed ? "fixed flex flex-col items-center justify-center transform max-w-2xl max-h-3/5 z-50 overflow-auto" : "anchored-summarys"}`}
            >
                {/* Close button that appears only when zoomed */}
                {isZoomed && (
                    <button
                        onClick={() => setIsZoomed(false)}
                        className="fixed top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 z-50"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}

                <div className="flex justify-between items-center mb-2">
                    <div className="flex-1"></div>
                    <h2 className="text-lg font-semibold text-gray-800">Summary</h2>
                    {/* Zoom button */}
                    <div className="flex-1 flex justify-end">
                        <button
                            onClick={() => setIsZoomed(!isZoomed)}
                            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                            aria-label={isZoomed ? "Close" : "Zoom"}
                        >
                            {!isZoomed && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                <div className="overflow-y-auto max-h-96">
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line break-words">
                    {summaryData}
                </p>
                </div>
            </div>
        </>
    );
};

export default SummaryCard;