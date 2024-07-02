"use client";
//#region imports :2
import React, { useEffect } from "react";
import Editor from "@/components/layouts/Editor";
import { useState } from "react";

import { DragEndEvent, useDroppable, useDndMonitor } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { testComponents, testUsedComponents } from "./testComponents";
import DragOverlayWrapper from "./DragOverlayWrapper";

import useEditor from "@/components/hooks/useEditor";
import { cn } from "@/lib/utils";
import SideNav from "@/app/(app)/editor/[...site]/_components/SideNav/SideNav";
import NavBarSelected from "@/components/editor-drag-components/navbar/NavBarSelected";
import useSideNav from "@/components/hooks/useSideNav";
import FooterSelected from "@/components/editor-drag-components/footer/FooterSelected";
import { Component } from "editor";

//#endregion

export default function EditorHandler() {
    const [sideNavOpen, setSideNavOpen] = useState(true);
    const {
        componentsInEditor,
        availableComponents,
        setComponents,
        setAvailableComponents,
        addComponent,
        removeComponent,
        updateComponent,
        selectedComponent,
        setSelectedComponent,
        RenderComponents,
        handleDragEnd,
        saveHandler,
        publishHandler,
        init,
    } = useEditor();
    const { typesWithComponents, page } = useSideNav();
    const { siteNavbar, siteFooter } = useSideNav();
    const [sComp, setSComp] = useState<any>(null);
    useEffect(() => {
        // setComponents(page?.pageComponents ?? []);
        // make it so that all the components from typesWithComponents are available to be added to the editor by satisfying the Component[] type
        let mergedComponents: Component[] = [];
        typesWithComponents.map((type) => {
            type.components?.map((component) => {
                mergedComponents.push({
                    ...component,
                });
            });
        });
        // setAvailableComponents(mergedComponents);
        if(!page) return;
        init(page?.pageComponents ?? [], mergedComponents, page?.id);
    }, [setComponents, setAvailableComponents, typesWithComponents, page]);

    useDndMonitor({
        onDragStart: (event) => {
            setSComp(event.active.data.current);
        },
        onDragCancel: () => {
            // console.log("drag cancel");
        },
        onDragEnd: (event: DragEndEvent) => {
            // console.log("drag end");
            handleDragEnd(event);
            return;
        },
    });

    const nav_droppable = useDroppable({
        id: "nav-droppable",
        data: {
            isSideNavDropArea: true,
            dropArea: "sideNav",
        },
    });

    return (
        <Editor.Layout className={sideNavOpen ? "" : "sidebar-closed"}>
            <Editor.SideNav>
                <div
                    ref={nav_droppable.setNodeRef}
                    className={
                        nav_droppable.isOver
                            ? "border border-red-500 w-full"
                            : ""
                    }
                >
                    <SideNav />
                </div>
            </Editor.SideNav>
            <Editor.TopNav saveHandler={() => saveHandler(page?.id)} publishHandler={publishHandler} />
            <div className={cn("drag-container p-4 flex flex-col gap-4")}>
                {siteNavbar[0] && (
                    <NavBarSelected stijl={siteNavbar[0].styles} />
                )}
                <SortableContext
                    strategy={verticalListSortingStrategy}
                    items={componentsInEditor}
                >
                    {<RenderComponents />}
                </SortableContext>
                {siteFooter[0] && (
                    <FooterSelected stijl={siteFooter[0].styles} />
                )}
                <DragOverlayWrapper />
            </div>
        </Editor.Layout>
    );
}
