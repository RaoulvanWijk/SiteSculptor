"use client";

import "@/resources/styling/components/dashboard/sidebar.scss";
import DefaultButton from "../interactives/Button";
import { useSidebar } from "../context/SidebarContext";

const SidebarItems = () => {
    const { setCurrentSection } = useSidebar();
    return (
        <div className="sidebaritems">
            <DefaultButton type="toggleLink" onClick={() => setCurrentSection("all")}>Home</DefaultButton>
            <DefaultButton type="toggleLink" onClick={() => setCurrentSection("projects")}>My Projects</DefaultButton>
            <DefaultButton type="toggleLink" onClick={() => setCurrentSection("extensions")}>Extensions</DefaultButton>
        </div>
    );
};
export default SidebarItems;
