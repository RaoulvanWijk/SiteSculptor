import React from "react";
import "@/resources/styling/components/layouts/editor-layout.scss";
import { cn } from "@/lib/utils";
import { SideNavContextProvider } from "../context/SideNavContext";
import DefaultButton from "../interactives/Button";
import { MonitorSmartphone, Save, Upload } from "lucide-react";
import useSideNav from "../hooks/useSideNav";

export function Layout({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const { currentNavName } = useSideNav();
    return (
        <div
            className={`editor-container ${
                currentNavName[0] == "Navbar" ? "navbar-open" : ""
            }`}
        >
            {children}
        </div>
    );
}
export function SideNav({ children }: { children: React.ReactNode }) {
    return <div className="sidebar">{children}</div>;
}
export function TopNav({
    saveHandler,
    publishHandler,
}: {
    saveHandler: () => void|Promise<void>;
    publishHandler: () => void|Promise<void>;
}) {
    return (
        <div className="topnav">
            <DefaultButton type="primary">
                Change view <MonitorSmartphone />
            </DefaultButton>
            <div className="right-side">
                <DefaultButton onClick={saveHandler} type="secondary">
                    Save <Save />
                </DefaultButton>
                <DefaultButton onClick={publishHandler} type="primary">
                    Publish <Upload />
                </DefaultButton>
            </div>
        </div>
    );
}

const Editor = {
    Layout: Layout,
    SideNav: SideNav,
    TopNav: TopNav,
};

export default Editor;
