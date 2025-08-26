// context/StatusMessageContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the types for the status message
export type MessageType = "info" | "success" | "error" | "loading";

export interface StatusMessageState {
    isVisible: boolean;
    message: string;
    type: MessageType;
}

export interface StatusMessageContextType {
    statusMessage: StatusMessageState;
    showStatusMessage: (message: string, type: MessageType) => void;
    hideStatusMessage: () => void;
}

const StatusMessageContext = createContext<StatusMessageContextType | undefined>(
    undefined
);

interface StatusMessageProviderProps {
    children: ReactNode;
}

export const StatusMessageProvider: React.FC<StatusMessageProviderProps> = ({
    children,
}) => {
    const [statusMessage, setStatusMessage] = useState<StatusMessageState>({
        isVisible: false,
        message: "",
        type: "info",
    });

    const showStatusMessage = (message: string, type: MessageType) => {
        setStatusMessage({
            isVisible: true,
            message,
            type,
        });
    };

    const hideStatusMessage = () => {
        setStatusMessage((prev) => ({ ...prev, isVisible: false }));
    };

    return (
        <StatusMessageContext.Provider
            value={{ statusMessage, showStatusMessage, hideStatusMessage }}
        >
            {children}
        </StatusMessageContext.Provider>
    );
};

export const useStatusMessage = () => {
    const context = useContext(StatusMessageContext);
    if (context === undefined) {
        throw new Error(
            "useStatusMessage must be used within a StatusMessageProvider"
        );
    }
    return context;
};
