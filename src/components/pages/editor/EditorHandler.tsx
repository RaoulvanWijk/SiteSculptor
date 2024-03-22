"use client";

import React, { useEffect } from "react";
import Editor from "@/components/layouts/Editor";
import { useState } from "react";

import {
    DndContext,
    DragEndEvent,
    closestCorners,
    useSensors,
    useSensor,
    MouseSensor,
    TouchSensor,
    DragOverlay,
    useDroppable,
    useDndMonitor,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import BaseDragComponent from "@/components/editor-drag-components/BaseDragComponent";
import BaseDropComponent from "@/components/editor-drag-components/BaseDropComponent";

import {
    Component,
    UsedComponent,
    EditorHandlerState,
    EditorHandlerProps,
} from "editor";

import { testComponents, testUsedComponents } from "./testComponents";
import DragOverlayWrapper from "./DragOverlayWrapper";

import useEditor from "@/components/hooks/useEditor";
import { cn } from "@/lib/utils";
import TestDragComponent from "@/components/editor-drag-components/TestDragComponent";
import SideNav from "@/app/(app)/editor/_components/SideNav/SideNav";
import useSideNav from "@/components/hooks/useSideNav";

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
    } = useEditor();

    useEffect(() => {
        setComponents(testUsedComponents);
        setAvailableComponents(testComponents);
    }, [setComponents, setAvailableComponents]);
    // const reorderComponents = (e: DragEndEvent) => {
    //   if (!e.over) return;

    //   setUsingComponents((usingComponents) => {
    //     const oldIdx = usingComponents.findIndex(
    //       (component) => component.id === e.active.id
    //     );
    //     const newIdx = usingComponents.findIndex(
    //       (component) => component.id === e.over!.id.toString()
    //     );
    //     return arrayMove(usingComponents, oldIdx, newIdx);
    //   });
    // };

    const renderComponents = (components: UsedComponent[]) => {
        const len = components.length;
        return (
            <>
                {components.map((component, index) => {
                    return (
                        <BaseDragComponent
                            key={component.id}
                            id={component.id}
                            data={{ isInEditor: true }}
                        >
                            <div className="w-full border-2 h-16">
                                {component.id} - {component.component.name} -{" "}
                                {component.component.type}, index: {index}
                            </div>
                        </BaseDragComponent>
                    );
                })}
            </>
        );
    };

    useDndMonitor({
        onDragStart: (event) => {
            console.log("drag start");
        },
        onDragCancel: () => {
            console.log("drag cancel");
        },
        onDragEnd: (event: DragEndEvent) => {
            console.log("drag end");
            if (
                !event.over ||
                !event.active ||
                !event.over.data.current?.isInEditor
            )
                return;

            console.log("====================================");
            console.log(event.active.data, event.over.data);
            console.log("====================================");

            // Sort the sortable components
            console.log("====================================");
            console.log(event.active.data.current, event.over.data.current);
            console.log("====================================");

            // if the component is being dragged from inside the editor
            if (event.active.data?.current?.isInEditor) {
                // get the old and new indexes of the components
                const oldIdx = componentsInEditor.findIndex(
                    (component) => component.id === event.active.id
                );
                const newIdx = componentsInEditor.findIndex(
                    (component) => component.id === event.over?.id
                );

                // TODO: Add support for dragging components into other components
                // set the new components array with the new indexes
                setComponents((prev) => {
                    let newArr = arrayMove(prev, oldIdx, newIdx);
                    // update all the indexes of the components in the editor
                    newArr = newArr.map((component, index) => {
                        component.index = index;
                        return component;
                    });

                    return [...newArr];
                });
                return;
            }

            // if the component is being dragged from the sidebar
            // get the component from the availableComponents array
            const component = availableComponents.find(
                (c) => c.id === event.active.id
            );

            // if the component is not found, return
            if (!component) return;

            // get the index of the component that the dragged component is being dropped into
            const index = componentsInEditor.findIndex(
                (c) => c.id === event.over?.id
            );
            console.log("====================================");
            console.log(component, index);
            console.log("====================================");
            // add the component to the components array
            addComponent(component, index);

            // console.log('====================================');
            // console.log(oldIdx, newIdx);
            // console.log('====================================');
            // setComponents(arrayMove(componentsInEditor, oldIdx, newIdx));
        },
    });

    const editor_droppable = useDroppable({
        id: "editor_droppable",
        data: {
            isMainDropArea: true,
        },
    });

    const nav_droppable = useDroppable({
        id: "nav-droppable",
        data: {
            isSideNavDropArea: true,
        },
    });

    return (
        <Editor.Layout className={sideNavOpen ? "" : "sidebar-closed"}>
            <Editor.SideNav>
                <SideNav />
            </Editor.SideNav>
            <Editor.TopNav />
            {/* <DndContext sensors={sensors}> */}
            <div
                ref={editor_droppable.setNodeRef}
                className={cn(
                    "drag-container p-4 flex flex-col gap-4",
                    editor_droppable.isOver ? "border border-red-500" : ""
                )}
            >
                <SortableContext
                    strategy={verticalListSortingStrategy}
                    items={componentsInEditor}
                >
                    {renderComponents(componentsInEditor)}
                </SortableContext>
            </div>
            <DragOverlayWrapper />
        </Editor.Layout>
    );
}
