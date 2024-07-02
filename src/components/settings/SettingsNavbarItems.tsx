"use client";

import "@/resources/styling/components/dashboard/navbar.scss";
import DefaultButton from "../interactives/Button";

const SettingsNavbarItems = () => {
    return (
        <div className="navbar-items">
            <DefaultButton type="toggleLink" >Dashboard</DefaultButton>
            <DefaultButton type="toggleLink" >Explore</DefaultButton>
            <DefaultButton type="toggleLink" >Help</DefaultButton>
        </div>
    );
};
export default SettingsNavbarItems;
