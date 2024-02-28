import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function layout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout children={children} />;
}
