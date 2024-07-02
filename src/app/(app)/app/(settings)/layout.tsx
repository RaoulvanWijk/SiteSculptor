import React from "react";
import SettingsLayout from "@/components/layouts/SettingsLayout";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <SettingsLayout>
            {children}
        </SettingsLayout>
    );
}
