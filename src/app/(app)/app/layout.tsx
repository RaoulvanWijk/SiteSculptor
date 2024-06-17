import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import SettingsLayout from "@/components/layouts/SettingsLayout";
import { SearchProvider } from "@/components/context/SearchContext";
import { SidebarProvider } from "@/components/context/SidebarContext";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <SearchProvider>
            <SidebarProvider>
                <DashboardLayout>
                    {children}
                </DashboardLayout>
            </SidebarProvider>
        </SearchProvider>
    );
}
