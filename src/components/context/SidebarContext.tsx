'use client'
import React, { createContext, useContext, useState, ReactNode } from "react";

type SidebarContextType = {
    currentSection: string;
    setCurrentSection: (section: string) => void;
    resetView: (section: string) => void;
};

const SidebarContext = createContext<SidebarContextType>({
    currentSection: "all",
    setCurrentSection: section => console.warn("no provider"),
    resetView: () => { }
});

type SidebarProviderProps = {
    children: ReactNode;
};

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
    const [currentSection, setCurrentSection] = useState("all");
    const resetView = () => setCurrentSection("all");

    return (
        <SidebarContext.Provider value={{ currentSection, setCurrentSection, resetView }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
