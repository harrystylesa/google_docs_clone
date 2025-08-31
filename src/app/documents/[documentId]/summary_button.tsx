"use client";

import React from "react";
import { useStatusMessage } from "@/app/documents/context/status-message-context";
import { useMutation } from "convex/react";
import { api } from '../../../../convex/_generated/api';
import { Id } from "../../../../convex/_generated/dataModel"; // Import Id type
import { useEditorStore } from '@/store/use-editor-store'
import { useAuth } from '@clerk/nextjs';

interface SummaryButtonProps {
    params: Id<"documents">;
}

const SummaryRequestButton = ({ params }: SummaryButtonProps) => {
    const document_id = params;
    const { editor } = useEditorStore();

    const { showStatusMessage } = useStatusMessage();
    const initSummaryById = useMutation(api.summarys.initSummaryById);
    const updateSummaryById = useMutation(api.summarys.updateSummaryById);

    const { getToken } = useAuth();

    const handleSubmit = async () => {
        if (!editor || !document_id) {
            throw new Error("Editor content or document ID missing.");
        }

        const token = await getToken({ template: 'convex' });
        console.log({token})
        if (!token) {
            throw new Error("user auth token missing");
        }

        const editor_content = editor.getText();
        const client_request_id = crypto.randomUUID(); // Generate unique ID

        showStatusMessage("Generating summary... \n You can close this message now. \n When it's done, I will let you know :)", "loading");

        try {
            // 1. Create a pending request in Convex
            await initSummaryById({
                document_id: document_id, summary_client_request_id: client_request_id,
            });
            
            // set url
            var url: string;
            if (!process.env.NEXT_PUBLIC_SUMMARY_URL) {
                // console.log({process_env: process.env});
                throw new Error("SUMMARY_URL is not defined in environment variables.");
            } else {
                url = process.env.NEXT_PUBLIC_SUMMARY_URL;
            }

            if (process.env.NEXT_PUBLIC_SUMMARY_DIRECT_FLAG == "true" && process.env.NEXT_PUBLIC_SUMMARY_DIRECT_URL) {
                url = process.env.NEXT_PUBLIC_SUMMARY_DIRECT_URL
                console.log({"flag_direct": process.env.NEXT_PUBLIC_SUMMARY_DIRECT_FLAG});
            }

            // 2. Send request to FastAPI
            const response = await fetch(
                url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        client_request_id: client_request_id,
                        content: editor_content
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // 3. Update Convex with response
            if (!data.summary || !data.client_request_id || data.client_request_id !== client_request_id) {
                await updateSummaryById({
                    summary_client_request_id: data.client_request_id,
                    summary_status: "failed",
                    id: document_id,
                    summary: `FastAPI responded with: ${data.message || "unknown error"}.`,
                });
                showStatusMessage(`Generate summary error, please try again later.`, "error");
                throw new Error("Invalid response from FastAPI.");
            }

            await updateSummaryById({
                summary_client_request_id: data.client_request_id,
                summary_status: "completed",
                summary: data.summary,
                id: document_id
            });
            showStatusMessage(
                "Generate summary successful! \nPlease refresh this page to see the summary.",
                "success"
            );
        } catch (error: any) {
            console.error("Error generating summary:", error);
        }
    };

    return (
        <div className="p-0.5 border-b bg-[#F1F4F9] justify-end min-w-[200px] flex-shrink-0">
            <button
                onClick={handleSubmit}
                disabled={!editor || editor.getText().trim() === ""}
                className="px-2 py-1 bg-indigo-600 text-sm text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                AI Full Document Summary
            </button>
        </div>
    );
};
export { SummaryRequestButton };