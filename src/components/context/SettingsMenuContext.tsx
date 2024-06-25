'use client'

import React, { createContext, useState, ReactNode } from "react";

interface SettingsContextType {
    currentSection: string;
    setCurrentSection: (section: string) => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
    children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
    const [currentSection, setCurrentSection] = useState("quick-link");

    return (
        <SettingsContext.Provider value={{ currentSection, setCurrentSection }}>
            {children}
        </SettingsContext.Provider>
    );
};
