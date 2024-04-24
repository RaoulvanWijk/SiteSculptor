import React, { useEffect, useState } from "react";
import Button from "./buttons/Button";
import BreadCrumbs from "./BreadCrumbs";
import "@/resources/styling/components/SideNav/sidenav.scss";
import useSideNav from "@/components/hooks/useSideNav";
import TestDragComponent from "@/components/editor-drag-components/TestDragComponent";
import useEditor from "@/components/hooks/useEditor";
import LoadingButton from "./buttons/LoadingButton";
import {
    CaseSensitive,
    Home,
    Image,
    MousePointerClick,
    PanelBottom,
    PanelTop,
    Plus,
    LayoutDashboard,
} from "lucide-react";
import AddPage from "./modal/AddPage";

export default function SideNav() {
    // get the nav type from the useSideNav hook
    const {
        setCurrentNavName,
        setNavType,
        navType,
        currentNavName,
        page,
        loading,
        page_id,
    } = useSideNav();

    const { availableComponents, setAvailableComponents } = useEditor();

    //#region Navs
    const navs = [
        {
            type: "main",
            content: [
                {
                    text: "",
                    type: "break",
                    key: "break1",
                },
                {
                    text: "Add new page",
                    type: "new-page",
                    icon: <Plus />,
                    key: "new-page",
                },
                {
                    text: "page settings",
                    type: "break",
                    key: "break2",
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
                    text: "Select your component type",
                    type: "break-top",
                    key: "break1",
                },
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
                {
                    text: "Container",
                    type: "page-component",
                    icon: <Home />,
                    key: "container",
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
    //#endregion

    // find the current nav
    const currentNav = navs.find((nav) => nav.type === navType);
    const currentPage = page.find((page) => page.id === page_id);

    useEffect(() => {
        if (page_id) {
            setNavType("page-select");
            if (currentPage) {
                setCurrentNavName([currentPage.title]);
            }
        } else {
            setNavType("main");
        }
        // check if a matching page exists
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
            const components = availableComponents.find(
                (component) =>
                    component.type === currentNavText.toLocaleLowerCase()
            );
            return (
                <TestDragComponent
                    id={components?.id ?? ""}
                    data={{
                        isComponentInEditor: false,
                        isFromSideNav: true,
                        dropArea: "sideNav",
                    }}
                    key={components?.id}
                >
                    {components?.name}
                </TestDragComponent>
            );
        } else {
            if (loading) {
                return <LoadingButton />;
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
    }

    return (
        <div className="sidenav">
            <div className="sidenav-content">
                <h1 className="sidenav-title">Navigator</h1>
                <BreadCrumbs />
                <div className="buttons">{content()}</div>
            </div>
            <Button
                text="Dashboard"
                type="dashboard"
                Icon={<LayoutDashboard />}
                id="dashboard"
            />
            <AddPage />
        </div>
    );
}
