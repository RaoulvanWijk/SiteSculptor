import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { SearchProvider } from "@/components/context/SearchContext";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <SearchProvider>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </SearchProvider>
    );
}
