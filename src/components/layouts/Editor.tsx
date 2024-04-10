import React from "react";
import "@/resources/styling/components/layouts/editor-layout.scss";
import { cn } from "@/lib/utils";
import { SideNavContextProvider } from "../context/SideNavContext";
import DefaultButton from "../interactives/Button";
import { MonitorSmartphone, Save, Upload } from "lucide-react";

export function Layout({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <div className={cn("editor-container", className)}>{children}</div>;
}
export function SideNav({ children }: { children: React.ReactNode }) {
    return (
        <div className="sidebar">
            {" "}
            <SideNavContextProvider>{children}</SideNavContextProvider>
        </div>
    );
}
export function TopNav() {
    return (
        <div className="topnav">
            <DefaultButton type="primary">
                Change view <MonitorSmartphone />
            </DefaultButton>
            <div className="right-side">
                <DefaultButton type="secondary">
                    Save <Save />
                </DefaultButton>
                <DefaultButton type="primary">
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
