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
import TestDragComponent from "@/components/editor-drag-components/TestDragComponent";
import useEditor from "@/components/hooks/useEditor";

export default function SideNav() {
    // get the nav type from the useSideNav hook
    const { navType, currentNavName, page } = useSideNav();

    const { availableComponents, setAvailableComponents } = useEditor();

    // console.log(page, "page");

    // template for the navs

    const navs = [
        {
            type: "main",
            content: [
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

    for (let i = 0; i < page.length; i++) {
        navs[0].content.unshift({
            text: page[i].title,
            type: "page-select",
            icon: <Home />,
        });
    }

    // find the current nav
    const currentNav = navs.find((nav) => nav.type === navType);

    // if there is no current nav, return an error
    if (!currentNav) {
        return <div className="sidenav">Error</div>;
    }

    function content() {
        if (currentNav && currentNav.type === "page-component") {
            const currentNavText = currentNavName[currentNavName.length - 1];
            for (let i = 0; i < availableComponents.length; i++) {
                if (
                    availableComponents[i].type ===
                    currentNavText.toLocaleLowerCase()
                ) {
                    return (
                        <TestDragComponent
                            key={availableComponents[i].id}
                            id={availableComponents[i].id}
                            data={{ isComponentInEditor: false }}
                        >
                            {availableComponents[i].name}
                        </TestDragComponent>
                    );
                }
            }
        } else {
            return currentNav?.content.map((button) => (
                <Button
                    text={button.text}
                    type={button.type}
                    Icon={button.icon}
                    key={button.text}
                />
            ));
        }
    }

    return (
        <div className="sidenav">
            <h1 className="sidenav-title">Navigator</h1>
            <BreadCrumbs />
            <div className="buttons">{content()}</div>
        </div>
    );
}
