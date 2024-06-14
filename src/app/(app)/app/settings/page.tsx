"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import "@/resources/styling/components/layouts/dashboardlayout.scss"
import SettingsItemUI from "@/components/settings/SettingsItemUI";

export default function Page() {
    const { setTheme } = useTheme();
    const lang = ["English (US)", "Dutch", "Spanish"];

    return (
        <div className="settings-content">
            <div className="settings-header">
                <h2>Quick Links</h2>
                <p>A quick overview of the most used settings</p>
            </div>
            <div className="settings-menu">
                <SettingsItemUI type="dropdown" itemName="Language" itemDesc="Choose Interface Language - Only English is supported in this version" items={lang} />
            </div>
        </div>
    );
}
