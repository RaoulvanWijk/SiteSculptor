import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import SettingsLayout from "@/components/layouts/SettingsLayout";
import { SearchProvider } from "@/components/context/SearchContext";
import { SidebarProvider } from "@/components/context/SidebarContext";
import { SettingsProvider } from "@/components/context/SettingsMenuContext";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <SearchProvider>
            <SidebarProvider>
                <SettingsProvider>
                        {children}
                </SettingsProvider>
            </SidebarProvider>
        </SearchProvider>
    );
}
