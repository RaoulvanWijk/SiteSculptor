"use client";

import React, { useContext } from "react";
import "@/resources/styling/components/dashboard/sidebar.scss";
import DefaultButton from "../interactives/Button";
import { SettingsContext } from "../context/SettingsMenuContext";

const SettingsSidebarItems: React.FC = () => {
    const settingsContext = useContext(SettingsContext);
    if (!settingsContext) {
        throw new Error("SettingsSidebarItems must be used within a SettingsProvider");
    }
    const { setCurrentSection } = settingsContext;

    return (
        <div className="sidebaritems">
            <DefaultButton type="toggleLink" className="settings-button" onClick={() => setCurrentSection("quick-link")}>Quick Settings</DefaultButton>
            <hr />
            <DefaultButton type="toggleLink" className="settings-button" onClick={() => setCurrentSection("account-setting")}>Account Settings</DefaultButton>
            <DefaultButton type="toggleLink" className="settings-button" onClick={() => setCurrentSection("member-setting")}>Membership Settings</DefaultButton>
            <DefaultButton type="toggleLink" className="settings-button" onClick={() => setCurrentSection("privacy-setting")}>Privacy Settings</DefaultButton>
            <DefaultButton type="toggleLink" className="settings-button" onClick={() => setCurrentSection("display-setting")}>Display Settings</DefaultButton>
            <hr />
            <DefaultButton type="toggleLink" className="settings-button" onClick={() => setCurrentSection("advanced-setting")}>Advanced Settings</DefaultButton>
        </div>
    );
};

export default SettingsSidebarItems;
