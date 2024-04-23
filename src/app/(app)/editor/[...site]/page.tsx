"use client";

import React, { use, useEffect, useState } from "react";
import EditorHandler from "@/components/pages/editor/EditorHandler";
import EditorContextProvider from "@/components/context/EditorContext";
import {
    DndContext,
    MouseSensor,
    TouchSensor,
    pointerWithin,
    rectIntersection,
    closestCenter,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { usePathname, useRouter } from "next/navigation";
import { SideNav } from "@/components/layouts/Editor";
import { SideNavContextProvider } from "@/components/context/SideNavContext";

const allowedTypesInEditor = ["container", "carousel", "form"]
const allowedTypesInContainer = ["card", "image", "text", "button"]

const customCollisionDetection = ({ droppableContainers, ...args }: any) => {
    // console.log(args.active.data.current, droppableContainers);
    // if (args.active.data.current?.isComponentInEditor) {
    //     droppableContainers = droppableContainers.filter(
    //         (container: any) =>
    //             container.data.current?.isEditorDroppable !== true
    //     );
    // } else {
    //     droppableContainers = droppableContainers.filter(
    //         (container: any) =>
    //             container.data.current?.isEditorDroppable === true ||
    //             container.data.current?.isSideNavDropArea === true
    //     );
    // }

    const active = args.active.data.current;
    // active.type, active.dropArea
    if(allowedTypesInEditor.includes(active.type)) {
        droppableContainers = droppableContainers.filter(
            (container: any) =>
                container.data.current?.dropArea === ("editor" || "sideNav")
        );
        console.log(droppableContainers, "droppableContainers");
    }
    if(allowedTypesInContainer.includes(active.type)) {
        droppableContainers = droppableContainers.filter(
            (container: any) =>
                container.data.current?.dropArea === ("container" || "sideNav")
        );
        // console.log(droppableContainers, "droppableContainers");
    } 
    // return
    

    // first check if the pointer is over an element
    const pointerCollission = pointerWithin({ ...args, droppableContainers });
    // console.log(pointerCollission);
    
    if (pointerCollission.length > 0) {
        return pointerCollission;
    }
    // console.log(droppableContainers, args);
    droppableContainers = droppableContainers.filter(
        (container: any) => !container.data.current?.isSideNavDropArea
    );

    // find the closest element
    const closestCollision = closestCenter({ ...args, droppableContainers });

    // console.log(closestCollision, "closestCollision");
    return closestCollision;
};

export default function EditorPage() {
    const sensors = useSensors(
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 300,
                tolerance: 5,
            },
        }),
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10, // 10px
            },
        })
    );
    return (
        // <EditorLayout>
        //   <EditorSideNav />
        //   <EditorTopNav />
        //   <ScrollArea className="pt-3 rounded-xl border bg-card text-card-foreground shadow p-4 drag-container">
        //     <div className="flex gap-4 flex-col">
        //       <NavbarOne />
        //       <div className="w-full h-[500px] border-dashed border-2 border-slate-300 rounded-md"></div>
        //       <div className="w-full h-[500px] border-dashed border-2 border-slate-300 rounded-md"></div>
        //       <div className="w-full h-[500px] border-dashed border-2 border-slate-300 rounded-md"></div>
        //       <div className="w-full h-[500px] border-dashed border-2 border-slate-300 rounded-md"></div>
        //     </div>
        //   </ScrollArea>
        // </EditorLayout>
        <DndContext
            collisionDetection={customCollisionDetection}
            sensors={sensors}
        >
            <EditorContextProvider>
                <EditorHandler />
            </EditorContextProvider>
        </DndContext>
    );
}
