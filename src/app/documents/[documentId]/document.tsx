"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";

import { Room } from "./room";
import { Editor } from "./editor";
import { Navbar } from "./navbar";
import Toolbar from "./toolbar";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { FullscreenLoader } from "@/components/fullscreen-loader";

interface DocumentProps {
    preloadedDocument: Preloaded<typeof api.documents.getById>;
};

export const Document = ({ preloadedDocument }: DocumentProps) => {
    const document = usePreloadedQuery(preloadedDocument);

    // const [isDeleted, setIsDeleted] = useState(false);

    // // This is the function we will pass down to the delete dialog.
    // const handleDelete = () => {
    //     setIsDeleted(true);
    // };

    // // If the component is marked as deleted, render a simple loader.
    // // This MUST be outside of and before the LiveblocksProvider.
    // if (isDeleted) {
    //     return (
    //         <FullscreenLoader label="document deleted, redirecting to homepage..." />
    //     );
    // }

    return (
        <Room>
            <div className="min-h-screen bg-[#FAFBFD]">
                <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
                    {/* <Navbar data={document} /> */}
                    {document && <Navbar data={document} />}
                    <Toolbar />
                </div>
                <div className="pt-[114px] print:pt-0">
                    {document && <Editor initialContent={document.initialContent} />}
                </div>
            </div>
        </Room>
    );
};
