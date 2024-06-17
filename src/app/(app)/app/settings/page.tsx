"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import "@/resources/styling/components/layouts/dashboardlayout.scss"
import SettingsItemUI from "@/components/settings/SettingsItemUI";

export default function Page() {
    const { setTheme } = useTheme();
    const lang = ["English (US)", "Dutch", "Spanish"];
    const theme = ["Dark", "Light", "System"];

    const themeSwitch = (theme: string) => {
        setTheme(theme.toLowerCase());
        console.log(theme.toLowerCase());
    }

    return (
        <div className="settings-content">
            <div className="settings-header">
                <h2>Quick Settings</h2>
                <p>A quick overview of the most used settings</p>
            </div>
            <div className="settings-menu quick-link">
                <SettingsItemUI type="dropdown" itemName="Language" itemDesc="Choose Interface Language - Only English is supported in this version" items={lang} />
                <SettingsItemUI type="radio" itemName="Theme" itemDesc="Choose Default Theme - Light, Dark or System" items={theme} />
                <SettingsItemUI type="link" itemName="Account Settings" itemDesc="Go to account settings" linkto="#" placeholder="To Account Settings"/>
                <SettingsItemUI type="link" itemName="Membership Settings" itemDesc="Go to membership settings" linkto="#" placeholder="To Membership Settings"/>
                <SettingsItemUI type="link" itemName="Privacy Settings" itemDesc="Go to privacy settings" linkto="#" placeholder="To Privacy Settings"/>
            </div>
            <div className="settings-menu account-setting">
                <SettingsItemUI type="dropdown" itemName="Language" itemDesc="Choose Interface Language - Only English is supported in this version" items={lang} def={lang[0]} />
                <SettingsItemUI type="radio" itemName="Theme" itemDesc="Choose Default Theme - Light, Dark or System" items={theme} def={theme[2]}onclick_function={themeSwitch}/>
                <SettingsItemUI type="link" itemName="Account Settings" itemDesc="Go to account settings" linkto="#" placeholder="To Account Settings"/>
                <SettingsItemUI type="link" itemName="Membership Settings" itemDesc="Go to membership settings" linkto="#" placeholder="To Membership Settings"/>
                <SettingsItemUI type="link" itemName="Privacy Settings" itemDesc="Go to privacy settings" linkto="#" placeholder="To Privacy Settings"/>
            </div>
        </div>
    );
}
