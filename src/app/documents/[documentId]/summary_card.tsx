"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useAuth } from '@clerk/clerk-react';

interface SummaryCardProps {
    documentId: Id<"documents">;
}

const SummaryCard = ({ documentId }: SummaryCardProps) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [rating, setRating] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);

    // Fetch the summary and existing feedback from Convex
    // const summaryData = useQuery(api.summarys.getSummaryByDocumentId, { documentId });
    const summaryItem = useQuery(api.summarys.getSummaryAndFeedbackByDocumentId, { documentId });
    const updateFeedback = useMutation(api.summarys.updateFeedbackByClientRequestId);

    const { getToken } = useAuth();

    useEffect(() => {
        // If the modal is closed, reset the message.
        if (!isZoomed) {
            setSubmissionMessage(null);
            setRating(null);
            // We do NOT reset the rating here. We rely on the logic below to handle it.
        } else {
            // When the modal is opened, sync the local rating with the remote data.
            if (summaryItem?.summaryRating !== undefined) {
                setRating(summaryItem.summaryRating);
            } else {
                setRating(null); // Ensure rating is null if no rating exists in Convex
            }
        }
    }, [isZoomed, summaryItem]); //

    if (!summaryItem) {
        return null;
    }

    const summarytext = summaryItem.summary
    const summary_client_request_id = summaryItem.summaryClientRequestId
    const summaryRating = summaryItem.summaryRating; // Existing rating from Convex, if any

    if (summarytext === null || summarytext === "") {
        return null;
    }

    const handleRatingSelect = (star: number) => {
        if (!isSubmitting) {
            setRating(star);
        }
    };

    // Determine if the button should be disabled
    const isButtonDisabled = isSubmitting || rating === null || (summaryRating !== undefined && rating === summaryRating);

    const handleSubmit = async () => {
        if (isButtonDisabled) return;
        // if (!rating || isSubmitting) return;

        setIsSubmitting(true);
        setSubmissionMessage(null);

        const token = await getToken({ template: 'convex' });
        if (!token) {
            throw new Error("user auth token missing");
        }
        // console.log({ "flag": process.env.NEXT_PUBLIC_SKIP_FEEDBACK_FLAG });

        if (process.env.NEXT_PUBLIC_SKIP_FEEDBACK_FLAG == "true") {
            console.log({ "flag_skip": process.env.NEXT_PUBLIC_SKIP_FEEDBACK_FLAG });
            try {
                await updateFeedback({ id: documentId, summary_client_request_id: summary_client_request_id, summary_rating: rating }); setSubmissionMessage("Rating submitted successfully! ✅");

            } catch (error: any) {
                console.error("Submission error:", error);
                setSubmissionMessage("An error occurred during Convex update. Please try again later. 😥");
            } finally {
                setIsSubmitting(false);
            }
        } else {
            try {
                const url = process.env.NEXT_PUBLIC_FASTAPI_FEEDBACK_URL;
                if (!url) {
                    throw new Error("FASTAPI_FEEDBACK_URL is not defined in environment variables.");
                }
                const fastApiResponse = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // Add the JWT to the Authorization header
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({// Replace with actual user ID if available
                        client_request_id: summary_client_request_id,
                        rate: rating,
                        comment: "" // Optional: Add a comment field if needed
                    }),
                });

                if (fastApiResponse.ok) {
                    setSubmissionMessage("Rating submitted successfully! ✅");
                } else {
                    setSubmissionMessage("Failed to submit to FastAPI. Please try again. 😥");
                    throw new Error(`Failed to submit to FastAPI. status: ${fastApiResponse.status}`);
                }

                await updateFeedback({ id: documentId, summary_client_request_id: summary_client_request_id, summary_rating: rating });

            } catch (error: any) {
                console.error("Submission error:", error);
                if (error.message.includes("FastAPI")) {
                    setSubmissionMessage("Failed to submit to FastAPI. Please try again. 😥");
                } else {
                    setSubmissionMessage("An error occurred during Convex update. Please try again later. 😥");
                }
            } finally {
                setIsSubmitting(false);
            }
        }
    };

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
                {isZoomed && (
                    <button
                        onClick={() => setIsZoomed(false)}
                        className="fixed top-2 right-2 z-50 p-1.5 rounded-full bg-red-400 text-white hover:bg-red-500 transition-colors duration-200 shadow-md"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                        {summarytext}
                    </p>
                </div>
                {isZoomed && (
                    <div className="mt-4 border-t pt-4">
                        <h3 className="text-md font-semibold text-gray-700 mb-2">How would you rate this summary?</h3>
                        <div className="flex items-center justify-between">
                            <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                        key={star}
                                        onClick={() => handleRatingSelect(star)}
                                        className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${(rating !== null && star <= rating) ? "text-yellow-400" : "text-gray-300"
                                            }`}
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                                    </svg>
                                ))}
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={isButtonDisabled}
                                className={`px-4 py-2 text-sm rounded-lg transition-colors duration-200 ${isButtonDisabled ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
                                    }`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center">
                                        <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </div>
                                ) : summaryRating !== undefined ? "Update Rating" : "Submit Rating"}
                            </button>
                        </div>
                        {submissionMessage && (
                            <div className="mt-2 text-center">
                                <p className={`text-sm ${submissionMessage.includes("success") ? "text-green-600" : "text-red-600"}`}>
                                    {submissionMessage}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default SummaryCard;