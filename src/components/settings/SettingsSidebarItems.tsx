"use client";

import "@/resources/styling/components/dashboard/sidebar.scss";
import DefaultButton from "../interactives/Button";

const SettingsSidebarItems = () => {
    return (
        <div className="sidebaritems">
            <DefaultButton type="toggleLink" className="settings-button">Quick Links</DefaultButton>
            <hr />
            <DefaultButton type="toggleLink" className="settings-button">Account Settings</DefaultButton>
            <DefaultButton type="toggleLink" className="settings-button">Membership Settings</DefaultButton>
            <DefaultButton type="toggleLink" className="settings-button">Privacy Settings</DefaultButton>
            <DefaultButton type="toggleLink" className="settings-button">Display Settings</DefaultButton>
            <hr />
            <DefaultButton type="toggleLink" className="settings-button">Advanced Settings</DefaultButton>
        </div>
    );
};
export default SettingsSidebarItems;
