"use client";

import React, { useContext } from "react";
import { SettingsProvider, SettingsContext } from "@/components/context/SettingsMenuContext";
import { useTheme } from "next-themes";
import "@/resources/styling/components/layouts/dashboardlayout.scss";
import SettingsItemUI from "@/components/settings/SettingsItemUI";
import SettingsSidebarItems from "@/components/settings/SettingsSidebarItems";

const SettingsContent: React.FC = () => {
    const settingsContext = useContext(SettingsContext);
    if (!settingsContext) {
        throw new Error("SettingsContent must be used within a SettingsProvider");
    }
    const { currentSection } = settingsContext;
    const { setTheme } = useTheme();

    const lang = ["English (US)", "Dutch", "Spanish"];
    const theme = ["Dark", "Light", "System"];

    const themeSwitch = (theme: string) => {
        setTheme(theme.toLowerCase());
        console.log(theme.toLowerCase());
    };

    return (
        <div className="settings-content">
            <div className="settings-header">
                <h2>Quick Settings</h2>
                <p>A quick overview of the most used settings</p>
            </div>
            {currentSection === "quick-link" && (
                <div className="settings-menu quick-link">
                    <SettingsItemUI type="dropdown" itemName="Language" itemDesc="Choose Interface Language - Only English is supported in this version" items={lang} def={lang[0]} />
                    <SettingsItemUI type="radio" itemName="Theme" itemDesc="Choose Default Theme - Light, Dark or System" items={theme} def={theme[1]} onclick_function={themeSwitch} />
                    <SettingsItemUI type="link" itemName="Account Settings" itemDesc="Go to account settings" linkto="#" placeholder="To Account Settings" />
                    <SettingsItemUI type="link" itemName="Membership Settings" itemDesc="Go to membership settings" linkto="#" placeholder="To Membership Settings" />
                    <SettingsItemUI type="link" itemName="Privacy Settings" itemDesc="Go to privacy settings" linkto="#" placeholder="To Privacy Settings" />
                </div>
            )}
            {currentSection === "account-setting" && (
                <div className="settings-menu account-setting">
                    A
                </div>
            )}
            {currentSection === "member-setting" && (
                <div className="settings-menu member-setting">
                    B
                </div>
            )}
            {currentSection === "privacy-setting" && (
                <div className="settings-menu privacy-setting">
                    C
                </div>
            )}
            {currentSection === "display-setting" && (
                <div className="settings-menu display-setting">
                    D
                </div>
            )}
            {currentSection === "advanced-setting" && (
                <div className="settings-menu advanced-setting">
                    E
                </div>
            )}
        </div>
    );
};

const Page: React.FC = () => {
    return (
        <SettingsContent />
    );
};

export default Page;
