import React from "react";
import "@/resources/styling/components/layouts/editor-layout.scss";
import { cn } from "@/lib/utils";
import { SideNavContextProvider } from "../context/SideNavContext";

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
        <div className="sidebar border-x">
            {" "}
            <SideNavContextProvider>{children}</SideNavContextProvider>
        </div>
    );
}
export function TopNav() {
    return <div className="topnav border-y">EditorTopNav</div>;
}

const Editor = {
    Layout: Layout,
    SideNav: SideNav,
    TopNav: TopNav,
};

export default Editor;
