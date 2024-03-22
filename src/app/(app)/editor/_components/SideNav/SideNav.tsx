import React from "react";
import Button from "./buttons/Button";
import { Home } from "lucide-react";
import BreadCrumbs from "./BreadCrumbs";
import "@/resources/styling/components/SideNav/sidenav.scss";
import useSideNav from "@/components/hooks/useSideNav";

export default function SideNav() {
    const { navType } = useSideNav();

    const navs = [
        {
            type: "main",
            content: [
                { text: "Home", type: "page-select" },
                { text: "Contact", type: "page-select" },
                { text: "Finance", type: "page-select" },
                { text: "Add new page", type: "page-select" },
                { text: "Footer", type: "footer" },
                { text: "Navbar", type: "nav" },
            ],
        },
        {
            type: "page-select",
            content: [
                { text: "Text", type: "page-component" },
                { text: "Image", type: "page-component" },
                { text: "Button", type: "page-component" },
                { text: "Form", type: "page-component" },
                { text: "List", type: "page-component" },
                { text: "Table", type: "page-component" },
            ],
        },
        {
            type: "page-component",
            content: [],
        },
    ];

    const currentNav = navs.find((nav) => nav.type === navType);

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
                        Icon={<Home />}
                        key={button.text}
                    />
                ))}
            </div>
        </div>
    );
}
