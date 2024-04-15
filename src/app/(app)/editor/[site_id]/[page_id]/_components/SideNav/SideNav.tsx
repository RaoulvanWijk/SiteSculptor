import React, { useEffect } from "react";
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
import { usePathname } from "next/navigation";
import { set } from "zod";

export default function SideNav() {
    // get the nav type from the useSideNav hook
    const { setCurrentNavName, setNavType, navType, currentNavName, page } =
        useSideNav();

    const { availableComponents, setAvailableComponents } = useEditor();

    // template for the navs

    const navs = [
        {
            type: "main",
            content: [
                {
                    text: "Add new page",
                    type: "new-page",
                    icons: <Plus />,
                    key: "new-page",
                },
                {
                    text: "Footer",
                    type: "footer",
                    icon: <PanelBottom />,
                    key: "footer",
                },
                { text: "Navbar", type: "nav", icon: <PanelTop />, key: "nav" },
            ],
        },
        {
            type: "page-select",
            content: [
                {
                    text: "Text",
                    type: "page-component",
                    icon: <CaseSensitive />,
                    key: "text",
                },
                { text: "Image", type: "page-component", icon: <Image /> },
                {
                    text: "Button",
                    type: "page-component",
                    icon: <MousePointerClick />,
                    key: "button",
                },
                {
                    text: "Form",
                    type: "page-component",
                    icon: <Home />,
                    key: "form",
                },
                {
                    text: "List",
                    type: "page-component",
                    icon: <Home />,
                    key: "list",
                },
                {
                    text: "Table",
                    type: "page-component",
                    icon: <Home />,
                    key: "table",
                },
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

    const path = usePathname();
    const page_id = path.split("/")[3];

    const currentPage = page.find((page) => page.id === page_id);

    useEffect(() => {
        if (page_id !== "0") {
            setNavType("page-select");
        }
        // check if a matching page exists
        if (currentPage) {
            setCurrentNavName([currentPage.title]);
        }
    }, [page_id, currentPage]);

    for (let i = 0; i < page.length; i++) {
        navs[0].content.unshift({
            text: page[i].title,
            type: "page-select",
            icon: <Home />,
            key: page[i].id,
        });
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
                    id={button.key ?? button.text}
                    key={button.key}
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
