import React from "react";
import Button from "./buttons/Button";
import {
    CaseSensitive,
    DollarSign,
    Home,
    PanelBottom,
    PanelTop,
    Phone,
    Plus,
    Image,
    MousePointerClick,
} from "lucide-react";
import BreadCrumbs from "./BreadCrumbs";
import "@/resources/styling/components/SideNav/sidenav.scss";
import useSideNav from "@/components/hooks/useSideNav";

export default function SideNav() {
    // get the nav type from the useSideNav hook
    const { navType } = useSideNav();

    // template for the navs
    const navs = [
        {
            type: "main",
            content: [
                { text: "Home", type: "page-select", icon: <Home /> },
                { text: "Contact", type: "page-select", icon: <Phone /> },
                { text: "Finance", type: "page-select", icon: <DollarSign /> },
                { text: "Add new page", type: "new-page", icons: <Plus /> },
                { text: "Footer", type: "footer", icon: <PanelBottom /> },
                { text: "Navbar", type: "nav", icon: <PanelTop /> },
            ],
        },
        {
            type: "page-select",
            content: [
                {
                    text: "Text",
                    type: "page-component",
                    icon: <CaseSensitive />,
                },
                { text: "Image", type: "page-component", icon: <Image /> },
                {
                    text: "Button",
                    type: "page-component",
                    icon: <MousePointerClick />,
                },
                { text: "Form", type: "page-component", icon: <Home /> },
                { text: "List", type: "page-component", icon: <Home /> },
                { text: "Table", type: "page-component", icon: <Home /> },
            ],
        },
        {
            type: "page-component",
            content: [],
        },
        {
            type: "footer",
            content: [],
        },
        {
            type: "navbar",
            content: [],
        },
    ];

    // find the current nav
    const currentNav = navs.find((nav) => nav.type === navType);

    // if there is no current nav, return an error
    if (!currentNav) {
        return <div className="sidenav">Error</div>;
    }

    return (
        <div className="sidenav">
            <h1 className="sidenav-title">Navigator</h1>
            <BreadCrumbs />
            <div className="buttons">
                {currentNav.content.map((button) => (
                    <Button
                        text={button.text}
                        type={button.type}
                        Icon={button.icon}
                        key={button.text}
                    />
                ))}
            </div>
        </div>
    );
}
