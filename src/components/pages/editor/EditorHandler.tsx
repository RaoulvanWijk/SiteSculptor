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
        renderComponents,
        handleDragEnd,
    } = useEditor();
    const [sComp, setSComp] = useState<any>(null);
    useEffect(() => {
        setComponents(testUsedComponents);
        setAvailableComponents(testComponents);
    }, [setComponents, setAvailableComponents]);

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
            <Editor.TopNav />
            <div className={cn("drag-container p-4 flex flex-col")}>
                <NavBarSelected />
                <SortableContext
                    strategy={verticalListSortingStrategy}
                    items={componentsInEditor}
                >
                    {renderComponents()}
                </SortableContext>
                <DragOverlayWrapper />
            </div>
        </Editor.Layout>
    );
}
